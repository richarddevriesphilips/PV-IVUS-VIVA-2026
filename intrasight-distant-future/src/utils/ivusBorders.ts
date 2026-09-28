/**
 * IVUS lumen/vessel borders: resolution, measurements and editing.
 *
 * Border source per frame, in priority order:
 *   1. Session edits made in the analysis screen (commitBorderEdit)
 *   2. Expert keyframes (data/borderKeyframes.ts) - absolute truth, exactly as traced
 *   3. Per-frame annotations (data/ivus-annotations-*.json, from
 *      `npm run annotate-borders`) - only while the keyframes they were
 *      generated from are unchanged around that frame
 *   4. Live shape interpolation between the current keyframes
 *
 * Coordinates are in a 720x720 display space of the (cover-cropped) IVUS
 * frame; consumers scale to their container. Measurements are always taken on
 * the smooth rendered border (see smoothPolygon), not the raw handle polygon.
 * Interpolated and edited borders are kept around the catheter (coverDisc).
 */

import type { Leg } from '../components/constants/appConstants';
import { BORDER_POLYGON_KEYFRAMES_LEFT, BORDER_POLYGON_KEYFRAMES_RIGHT } from '../data/borderKeyframes';
import annotationsLeft from '../data/ivus-annotations-left.json';
import annotationsRight from '../data/ivus-annotations-right.json';
import {
  type BorderPolygons,
  type Point,
  CATHETER_AREA_RADIUS,
  VESSEL_CATHETER_AREA_RADIUS,
  bestAlignment,
  bracketFrames,
  clonePolygons,
  coverDisc,
  interpolateKeyframes,
  keyframeChecksum,
  keyframesToMap,
  polygonAreaPx,
  resamplePolygonByArcLength,
  smoothPolygon,
} from './borderGeometry';

export type { BorderPolygons, Point, PolygonKeyframe } from './borderGeometry';
export { polygonAreaPx };

export interface BorderMeasurements {
  lumenAreaMm2: number;
  vesselAreaMm2: number;
  /** Equivalent circular diameter (2 * sqrt(area / π)) */
  lumenDiameterMm: number;
  vesselDiameterMm: number;
  /** Minimum caliper diameter across the polygon (mm) */
  lumenMinDiameterMm: number;
  /** Maximum caliper diameter across the polygon (mm) */
  lumenMaxDiameterMm: number;
  vesselMinDiameterMm: number;
  vesselMaxDiameterMm: number;
  /** Plaque burden as percentage: (vessel - lumen) / vessel * 100 */
  plaqueBurdenPct: number;
}

export type BorderSource =
  | { kind: 'edit' }
  | { kind: 'keyframe' }
  | { kind: 'annotation'; agreement: number }
  | { kind: 'interpolated' }
  | { kind: 'default' };

/** Natural width/height of the reference IVUS frame image. */
export const REFERENCE_SIZE = 720;

/**
 * Pixels-per-mm calibration in the 720-space.
 * Approximated from the visible 5mm tick marks on the IVUS frames.
 * (30 mm radius FOV → 360 px / 30 mm = 12 px/mm.)
 */
export const PIXELS_PER_MM = 12;

/** Points per border for live interpolation between keyframes. */
const INTERPOLATION_SAMPLES = 32;

/** Shown before any keyframe has been authored for a leg. */
const DEFAULT_BORDERS: BorderPolygons = {
  lumen: Array.from({ length: 16 }, (_, i) => ({ x: 360 + 50 * Math.cos((i / 16) * 2 * Math.PI), y: 360 + 50 * Math.sin((i / 16) * 2 * Math.PI) })),
  vessel: Array.from({ length: 16 }, (_, i) => ({ x: 360 + 60 * Math.cos((i / 16) * 2 * Math.PI), y: 360 + 60 * Math.sin((i / 16) * 2 * Math.PI) })),
};

// ---------------------------------------------------------------------------
// Change notification
// ---------------------------------------------------------------------------

const editListeners = new Set<() => void>();

function notifyEdits() {
  editListeners.forEach((l) => l());
}

export function subscribeToBorderEdits(listener: () => void): () => void {
  editListeners.add(listener);
  return () => editListeners.delete(listener);
}

// ---------------------------------------------------------------------------
// Active leg
// ---------------------------------------------------------------------------

// Kept independent from appConstants.ts's `setActiveLeg` (roadmap positioning) -
// App.tsx calls both whenever the leg switches. Defaults to the app's first leg.
let activeLeg: Leg = 'right';

export function setActiveBorderLeg(leg: Leg): void {
  activeLeg = leg;
  userEdits.clear(); // session edits don't carry across a leg switch
  notifyEdits();
}

// ---------------------------------------------------------------------------
// Expert keyframes (editable at runtime by the Border Tool)
// ---------------------------------------------------------------------------

const KEYFRAMES: Record<Leg, Map<number, BorderPolygons>> = {
  left: keyframesToMap(BORDER_POLYGON_KEYFRAMES_LEFT),
  right: keyframesToMap(BORDER_POLYGON_KEYFRAMES_RIGHT),
};

const sortedFramesCache: Partial<Record<Leg, number[]>> = {};

function keyframeFrames(leg: Leg): number[] {
  if (!sortedFramesCache[leg]) sortedFramesCache[leg] = Array.from(KEYFRAMES[leg].keys()).sort((a, b) => a - b);
  return sortedFramesCache[leg]!;
}

function keyframesChanged(leg: Leg): void {
  delete sortedFramesCache[leg];
  checksumCache[leg].clear();
  notifyEdits();
}

export function setPolygonKeyframe(frame: number, kind: 'lumen' | 'vessel', polygon: Point[]): void {
  const map = KEYFRAMES[activeLeg];
  const cur = map.get(frame) ?? clonePolygons(resolve(frame).polygons);
  map.set(frame, { ...cur, [kind]: polygon.map((p) => ({ ...p })) });
  const edit = userEdits.get(frame);
  if (edit) {
    delete edit[kind]; // the keyframe now holds it
    if (!edit.lumen && !edit.vessel) userEdits.delete(frame);
  }
  keyframesChanged(activeLeg);
}

/** Save both borders of `frame` as a keyframe, exactly as given. */
export function setKeyframeBorders(frame: number, polygons: BorderPolygons): void {
  KEYFRAMES[activeLeg].set(frame, clonePolygons(polygons));
  userEdits.delete(frame);
  keyframesChanged(activeLeg);
}

export function getKeyframeBorders(frame: number): BorderPolygons | undefined {
  const kf = KEYFRAMES[activeLeg].get(frame);
  return kf && clonePolygons(kf);
}

export function deletePolygonKeyframe(frame: number): void {
  KEYFRAMES[activeLeg].delete(frame);
  keyframesChanged(activeLeg);
}

export function getPolygonKeyframeFrames(): number[] {
  return [...keyframeFrames(activeLeg)];
}

/** Ready-to-paste TS source for every keyframe of the active leg (paste into data/borderKeyframes.ts). */
export function exportPolygonKeyframes(): string {
  const constName = `BORDER_POLYGON_KEYFRAMES_${activeLeg.toUpperCase()}`;
  const fmt = (pts: Point[]) => `[${pts.map((p) => `[${Math.round(p.x)}, ${Math.round(p.y)}]`).join(', ')}]`;
  const body = keyframeFrames(activeLeg)
    .map((frame) => {
      const kf = KEYFRAMES[activeLeg].get(frame)!;
      return `  { frame: ${frame}, lumen: ${fmt(kf.lumen)}, vessel: ${fmt(kf.vessel)} },`;
    })
    .join('\n');
  return `export const ${constName}: PolygonKeyframe[] = [\n${body}\n];`;
}

// ---------------------------------------------------------------------------
// Per-frame annotations (precomputed from the keyframes + frame pixels)
// ---------------------------------------------------------------------------

interface AnnotationFile {
  catheterCentre?: Point;
  anchors: Record<string, string>;
  frames: Record<string, { l: number[]; v: number[]; c: number }>;
}

const ANNOTATIONS: Record<Leg, AnnotationFile> = {
  left: annotationsLeft as unknown as AnnotationFile,
  right: annotationsRight as unknown as AnnotationFile,
};

/** Centre of the imaging catheter in the active leg's frames (720 space). */
export function getCatheterCentre(): Point {
  return ANNOTATIONS[activeLeg].catheterCentre ?? { x: REFERENCE_SIZE / 2, y: REFERENCE_SIZE / 2 };
}

const annotationAnchorFrames: Record<Leg, number[]> = {
  left: Object.keys(ANNOTATIONS.left.anchors).map(Number).sort((a, b) => a - b),
  right: Object.keys(ANNOTATIONS.right.anchors).map(Number).sort((a, b) => a - b),
};

const checksumCache: Record<Leg, Map<number, string>> = { left: new Map(), right: new Map() };

function liveChecksum(leg: Leg, frame: number): string | undefined {
  const cache = checksumCache[leg];
  if (!cache.has(frame)) {
    const kf = KEYFRAMES[leg].get(frame);
    if (!kf) return undefined;
    cache.set(frame, keyframeChecksum(kf));
  }
  return cache.get(frame);
}

/** The precomputed annotation is valid only if its bracketing keyframes are the same, unchanged ones it was generated from. */
function annotationIsCurrent(leg: Leg, frame: number): boolean {
  const [livePrev, liveNext] = bracketFrames(keyframeFrames(leg), frame);
  const [genPrev, genNext] = bracketFrames(annotationAnchorFrames[leg], frame);
  if (livePrev !== genPrev || liveNext !== genNext) return false;
  const anchors = ANNOTATIONS[leg].anchors;
  return [livePrev, liveNext].every((f) => f === undefined || liveChecksum(leg, f) === anchors[f]);
}

const parsedAnnotations: Record<Leg, Map<number, BorderPolygons>> = { left: new Map(), right: new Map() };

function annotationAt(leg: Leg, frame: number): { polygons: BorderPolygons; agreement: number } | null {
  const entry = ANNOTATIONS[leg].frames[frame];
  if (!entry || !annotationIsCurrent(leg, frame)) return null;
  let polygons = parsedAnnotations[leg].get(frame);
  if (!polygons) {
    const unflat = (a: number[]) => Array.from({ length: a.length / 2 }, (_, i) => ({ x: a[2 * i], y: a[2 * i + 1] }));
    polygons = { lumen: unflat(entry.l), vessel: unflat(entry.v) };
    parsedAnnotations[leg].set(frame, polygons);
  }
  return { polygons, agreement: entry.c };
}

/**
 * Frames most worth an extra expert keyframe: per keyframe gap, the frame
 * where image tracking and interpolation disagree most (lowest agreement).
 */
export function getReviewSuggestions(limit = 8): Array<{ frame: number; agreement: number }> {
  const frames = keyframeFrames(activeLeg);
  const worstPerGap = new Map<string, { frame: number; agreement: number }>();
  for (const [key, entry] of Object.entries(ANNOTATIONS[activeLeg].frames)) {
    const frame = Number(key);
    if (KEYFRAMES[activeLeg].has(frame) || !annotationIsCurrent(activeLeg, frame)) continue;
    const gap = bracketFrames(frames, frame).join('-');
    const worst = worstPerGap.get(gap);
    if (!worst || entry.c < worst.agreement) worstPerGap.set(gap, { frame, agreement: entry.c });
  }
  return [...worstPerGap.values()].filter((s) => s.agreement < 0.97).sort((a, b) => a.agreement - b.agreement).slice(0, limit);
}

// ---------------------------------------------------------------------------
// Session edits (analysis screen), propagated to neighbouring frames
// ---------------------------------------------------------------------------

const userEdits = new Map<number, Partial<BorderPolygons>>();

/** How far an edit propagates (in frames) on each side. */
const PROPAGATION_RADIUS = 25;
const PROPAGATION_SIGMA = PROPAGATION_RADIUS / 2;
const PROPAGATION_SAMPLES = 32;

let propagateEdits = true;

/** The Border Tool authors exact keyframes, so it turns neighbour propagation off. */
export function setEditPropagation(enabled: boolean): void {
  propagateEdits = enabled;
}

/**
 * Commit a user-edited border at `frame` and carry the same shape correction
 * to nearby frames with a Gaussian falloff. Borders are compared as aligned
 * arc-length resamplings, so the edit may use any number of points.
 */
export function commitBorderEdit(frame: number, kind: 'lumen' | 'vessel', editedPolygon: Point[]): void {
  // The catheter always lies inside the lumen, so an edit can't leave it outside.
  const covered = coverDisc(editedPolygon, getCatheterCentre(), kind === 'lumen' ? CATHETER_AREA_RADIUS : VESSEL_CATHETER_AREA_RADIUS);
  if (propagateEdits) propagateEdit(frame, kind, covered);
  userEdits.set(frame, { ...userEdits.get(frame), [kind]: covered.map((p) => ({ ...p })) });
  notifyEdits();
}

function propagateEdit(frame: number, kind: 'lumen' | 'vessel', editedPolygon: Point[]): void {
  const resample = (pts: Point[]) => resamplePolygonByArcLength(smoothPolygon(pts), PROPAGATION_SAMPLES);
  const before = resample(getBorderPolygons(frame)[kind]);
  const after = bestAlignment(before, resample(editedPolygon));
  const delta = before.map((p, i) => ({ x: after[i].x - p.x, y: after[i].y - p.y }));

  for (let df = -PROPAGATION_RADIUS; df <= PROPAGATION_RADIUS; df++) {
    const nf = frame + df;
    if (df === 0 || nf < 1 || KEYFRAMES[activeLeg].has(nf)) continue; // keyframes stay exactly as traced
    const falloff = Math.exp(-(df * df) / (2 * PROPAGATION_SIGMA * PROPAGATION_SIGMA));
    if (falloff < 0.05) continue;
    const neighbor = bestAlignment(before, resample(getBorderPolygons(nf)[kind]));
    const moved = neighbor.map((p, i) => ({ x: p.x + delta[i].x * falloff, y: p.y + delta[i].y * falloff }));
    userEdits.set(nf, { ...userEdits.get(nf), [kind]: moved });
  }
}

// ---------------------------------------------------------------------------
// Resolution + measurements — single source of truth for the UI
// ---------------------------------------------------------------------------

function resolve(frame: number): { polygons: BorderPolygons; source: BorderSource } {
  const keyframe = KEYFRAMES[activeLeg].get(frame);
  let base: { polygons: BorderPolygons; source: BorderSource };
  if (keyframe) base = { polygons: clonePolygons(keyframe), source: { kind: 'keyframe' } };
  else {
    const annotated = annotationAt(activeLeg, frame);
    if (annotated) base = { polygons: clonePolygons(annotated.polygons), source: { kind: 'annotation', agreement: annotated.agreement } };
    else {
      const interpolated = interpolateKeyframes(KEYFRAMES[activeLeg], frame, INTERPOLATION_SAMPLES);
      const centre = getCatheterCentre();
      base = interpolated
        ? {
          polygons: {
            lumen: coverDisc(interpolated.lumen, centre, CATHETER_AREA_RADIUS),
            vessel: coverDisc(interpolated.vessel, centre, VESSEL_CATHETER_AREA_RADIUS),
          },
          source: { kind: 'interpolated' },
        }
        : { polygons: clonePolygons(DEFAULT_BORDERS), source: { kind: 'default' } };
    }
  }
  const edit = userEdits.get(frame);
  if (!edit) return base;
  return {
    polygons: { lumen: edit.lumen ?? base.polygons.lumen, vessel: edit.vessel ?? base.polygons.vessel },
    source: { kind: 'edit' },
  };
}

/** Lumen/vessel borders to render at a frame (see the file header for the source priority). */
export function getBorderPolygons(frame: number): BorderPolygons {
  return resolve(frame).polygons;
}

/** Where the borders at `frame` come from (for tooling/QA). */
export function getBorderSource(frame: number): BorderSource {
  return resolve(frame).source;
}

/** Build a smooth closed SVG path through a set of points using cubic Bézier. */
export function pointsToSmoothPath(points: Point[]): string {
  if (points.length === 0) return '';
  let path = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
  for (let i = 0; i < points.length; i++) {
    const p0 = points[(i - 1 + points.length) % points.length];
    const p1 = points[i];
    const p2 = points[(i + 1) % points.length];
    const p3 = points[(i + 2) % points.length];
    // Catmull-Rom -> Bezier conversion (tension 0.5); keep in sync with borderGeometry.smoothPolygon
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    path += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }
  return path + ' Z';
}

/** Convert pixel area (720-space) to mm². */
export function pxAreaToMm2(areaPx: number): number {
  return areaPx / (PIXELS_PER_MM * PIXELS_PER_MM);
}

/** Equivalent circular diameter (mm) from area (mm²). */
export function areaToEquivalentDiameter(areaMm2: number): number {
  return 2 * Math.sqrt(areaMm2 / Math.PI);
}

/**
 * Minimum and maximum "caliper" diameters of a polygon: project all vertices
 * onto many directions and measure the extent along each (like rotating a
 * pair of parallel calipers around the shape).
 */
export function polygonMinMaxDiameters(points: Point[]): { minPx: number; maxPx: number } {
  if (points.length < 2) return { minPx: 0, maxPx: 0 };
  const N_ANGLES = 36; // every 5°
  let minW = Infinity;
  let maxW = 0;
  for (let i = 0; i < N_ANGLES; i++) {
    const theta = (i / N_ANGLES) * Math.PI;
    const dx = Math.cos(theta);
    const dy = Math.sin(theta);
    let lo = Infinity;
    let hi = -Infinity;
    for (const p of points) {
      const proj = p.x * dx + p.y * dy;
      if (proj < lo) lo = proj;
      if (proj > hi) hi = proj;
    }
    const w = hi - lo;
    if (w < minW) minW = w;
    if (w > maxW) maxW = w;
  }
  return { minPx: minW, maxPx: maxW };
}

/** Lumen/vessel measurements of the borders as rendered (smooth curve), incl. edits. */
export function getBorderMeasurements(frame: number): BorderMeasurements {
  const polys = getBorderPolygons(frame);
  const lumen = smoothPolygon(polys.lumen, 6);
  const vessel = smoothPolygon(polys.vessel, 6);
  const lumenAreaMm2 = pxAreaToMm2(polygonAreaPx(lumen));
  const vesselAreaMm2 = pxAreaToMm2(polygonAreaPx(vessel));
  const lumenDia = polygonMinMaxDiameters(lumen);
  const vesselDia = polygonMinMaxDiameters(vessel);
  return {
    lumenAreaMm2,
    vesselAreaMm2,
    lumenDiameterMm: areaToEquivalentDiameter(lumenAreaMm2),
    vesselDiameterMm: areaToEquivalentDiameter(vesselAreaMm2),
    lumenMinDiameterMm: lumenDia.minPx / PIXELS_PER_MM,
    lumenMaxDiameterMm: lumenDia.maxPx / PIXELS_PER_MM,
    vesselMinDiameterMm: vesselDia.minPx / PIXELS_PER_MM,
    vesselMaxDiameterMm: vesselDia.maxPx / PIXELS_PER_MM,
    plaqueBurdenPct: vesselAreaMm2 > lumenAreaMm2 ? ((vesselAreaMm2 - lumenAreaMm2) / vesselAreaMm2) * 100 : 0,
  };
}
