/**
 * IVUS border data + math.
 *
 * Keyframes are based on manually-traced lumen/vessel boundaries from the
 * annotated frames in `public/assets/ivus-frames/*-annotated.jpg`.
 * Between keyframes we smoothly interpolate every parameter.
 *
 * Coordinate space:
 *   - All ellipse positions / sizes are stored relative to a 720x720 reference image
 *     (matches the natural size of the extracted IVUS frames).
 *   - Consumers scale these to whatever container size they use.
 *   - PIXELS_PER_MM converts pixel measurements (in 720-space) to millimeters.
 *
 * Edited (user-modified) borders are represented as polygons (arrays of points)
 * that replace the interpolated ellipse for a single frame range.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface EllipseShape {
  /** Center X in 720-space */
  cx: number;
  /** Center Y in 720-space */
  cy: number;
  /** Half-width along x-axis (before rotation), in 720-space */
  rx: number;
  /** Half-height along y-axis (before rotation), in 720-space */
  ry: number;
  /** Rotation in degrees around (cx, cy) */
  rot: number;
}

export interface BorderKeyframe {
  frame: number;
  lumen: EllipseShape;
  vessel: EllipseShape;
}

export interface Point {
  x: number;
  y: number;
}

export interface BorderShapes {
  /** Current lumen shape — either an ellipse or an edited polygon (in 720-space) */
  lumen: EllipseShape;
  vessel: EllipseShape;
}

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

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Natural width/height of the reference IVUS frame image. */
export const REFERENCE_SIZE = 720;

/**
 * Pixels-per-mm calibration in the 720-space.
 * Approximated from the visible 5mm tick marks on the IVUS frames.
 * (30 mm radius FOV → 360 px / 30 mm = 12 px/mm.)
 */
export const PIXELS_PER_MM = 12;

/** Number of points used for rendering / editing each border. */
export const POLYGON_SAMPLE_COUNT = 10;

// ---------------------------------------------------------------------------
// Keyframes — extracted by visually tracing the annotated frames
// ---------------------------------------------------------------------------

export const BORDER_KEYFRAMES: BorderKeyframe[] = [
  // Frame 1: Small horizontal ellipse hugging the catheter
  {
    frame: 1,
    lumen:  { cx: 385, cy: 360, rx: 24, ry: 13, rot: 0 },
    vessel: { cx: 385, cy: 360, rx: 29, ry: 17, rot: 0 },
  },
  // Frame 89: Very small ellipse slightly above center
  {
    frame: 89,
    lumen:  { cx: 370, cy: 348, rx: 14, ry: 8,  rot: 5 },
    vessel: { cx: 370, cy: 348, rx: 22, ry: 12, rot: 5 },
  },
  // Frame 194: Elongated horizontal ellipse, slightly tilted
  {
    frame: 194,
    lumen:  { cx: 370, cy: 360, rx: 42, ry: 12, rot: -5 },
    vessel: { cx: 370, cy: 360, rx: 56, ry: 18, rot: -5 },
  },
  // Frame 247: Tilted ellipse, moderate length
  {
    frame: 247,
    lumen:  { cx: 360, cy: 365, rx: 45, ry: 12, rot: -15 },
    vessel: { cx: 360, cy: 365, rx: 56, ry: 18, rot: -15 },
  },
  // Frame 329: Larger, more tilted ellipse
  {
    frame: 329,
    lumen:  { cx: 360, cy: 365, rx: 60, ry: 18, rot: -22 },
    vessel: { cx: 360, cy: 365, rx: 80, ry: 26, rot: -22 },
  },
  // Frame 437: Strongly tilted (~ -60°) diagonal ellipse
  {
    frame: 437,
    lumen:  { cx: 395, cy: 380, rx: 62, ry: 18, rot: -60 },
    vessel: { cx: 395, cy: 380, rx: 78, ry: 28, rot: -60 },
  },
  // Frame 634: Nearly vertical oval (rotated ~ -85°)
  {
    frame: 634,
    lumen:  { cx: 400, cy: 305, rx: 65, ry: 36, rot: -85 },
    vessel: { cx: 400, cy: 305, rx: 75, ry: 44, rot: -85 },
  },
  // Frame 702: Nearly circular
  {
    frame: 702,
    lumen:  { cx: 360, cy: 380, rx: 42, ry: 38, rot: 0 },
    vessel: { cx: 360, cy: 380, rx: 48, ry: 45, rot: 0 },
  },
];

// ---------------------------------------------------------------------------
// Interpolation helpers
// ---------------------------------------------------------------------------

/** Smoothstep easing — gives a nicer transition than pure linear. */
function smoothstep(t: number): number {
  const clamped = Math.max(0, Math.min(1, t));
  return clamped * clamped * (3 - 2 * clamped);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Interpolate rotation taking the shortest angular path (handles -85° -> +5°). */
function lerpAngle(a: number, b: number, t: number): number {
  let diff = b - a;
  while (diff > 180) diff -= 360;
  while (diff < -180) diff += 360;
  return a + diff * t;
}

function lerpEllipse(a: EllipseShape, b: EllipseShape, t: number): EllipseShape {
  return {
    cx:  lerp(a.cx,  b.cx,  t),
    cy:  lerp(a.cy,  b.cy,  t),
    rx:  lerp(a.rx,  b.rx,  t),
    ry:  lerp(a.ry,  b.ry,  t),
    rot: lerpAngle(a.rot, b.rot, t),
  };
}

/**
 * Compute the (ellipse) lumen and vessel shapes for a given frame number,
 * by interpolating between the surrounding keyframes.
 */
export function getInterpolatedShapes(frame: number): BorderShapes {
  const kfs = BORDER_KEYFRAMES;
  if (frame <= kfs[0].frame) {
    return { lumen: { ...kfs[0].lumen }, vessel: { ...kfs[0].vessel } };
  }
  if (frame >= kfs[kfs.length - 1].frame) {
    const last = kfs[kfs.length - 1];
    return { lumen: { ...last.lumen }, vessel: { ...last.vessel } };
  }

  // Find surrounding keyframes
  let i = 0;
  while (i < kfs.length - 1 && kfs[i + 1].frame <= frame) i++;
  const a = kfs[i];
  const b = kfs[i + 1];
  const t = smoothstep((frame - a.frame) / (b.frame - a.frame));

  return {
    lumen:  lerpEllipse(a.lumen,  b.lumen,  t),
    vessel: lerpEllipse(a.vessel, b.vessel, t),
  };
}

// ---------------------------------------------------------------------------
// Geometry helpers
// ---------------------------------------------------------------------------

/** Sample N points along an ellipse perimeter (in 720-space). */
export function sampleEllipse(
  shape: EllipseShape,
  count: number = POLYGON_SAMPLE_COUNT,
): Point[] {
  const points: Point[] = [];
  const rad = (shape.rot * Math.PI) / 180;
  const cosR = Math.cos(rad);
  const sinR = Math.sin(rad);
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const x0 = Math.cos(angle) * shape.rx;
    const y0 = Math.sin(angle) * shape.ry;
    points.push({
      x: shape.cx + x0 * cosR - y0 * sinR,
      y: shape.cy + x0 * sinR + y0 * cosR,
    });
  }
  return points;
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
    // Catmull-Rom -> Bezier conversion (tension 0.5)
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    path += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }
  return path + ' Z';
}

/** Polygon area via shoelace formula (pixels², in 720-space). */
export function polygonAreaPx(points: Point[]): number {
  let sum = 0;
  for (let i = 0; i < points.length; i++) {
    const a = points[i];
    const b = points[(i + 1) % points.length];
    sum += a.x * b.y - b.x * a.y;
  }
  return Math.abs(sum) / 2;
}

/** Ellipse area in pixels² (in 720-space). */
export function ellipseAreaPx(shape: EllipseShape): number {
  return Math.PI * shape.rx * shape.ry;
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
 * Compute the minimum and maximum "caliper" diameters of a polygon by
 * projecting all vertices onto many directions and measuring the extent
 * (max − min projection) along each.  This gives the narrowest and widest
 * widths of the shape — equivalent to rotating a pair of parallel calipers
 * around the polygon.
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

// ---------------------------------------------------------------------------
// Detected border data (precomputed by scripts/detect-ivus-borders.js)
// ---------------------------------------------------------------------------

import detectedBorderData from '../data/ivus-border-data.json';

type RawBorderData = Record<string, { lumen: [number, number][]; vessel: [number, number][] }>;
const DETECTED: RawBorderData = detectedBorderData as unknown as RawBorderData;

function pointsFromRaw(raw: [number, number][]): Point[] {
  return raw.map(([x, y]) => ({ x, y }));
}

/**
 * Runtime overrides for the bundled detected data. The Electron IPC handler
 * fills this in after a full-cine re-detect so the renderer sees the new
 * polygons without having to reload the page.
 */
const detectedOverrides: Map<number, { lumen?: Point[]; vessel?: Point[] }> = new Map();

/** Returns the polygon for a frame (10 points), or null if missing. Checks runtime overrides first. */
function getDetectedPolygon(frame: number, kind: 'lumen' | 'vessel'): Point[] | null {
  const override = detectedOverrides.get(frame)?.[kind];
  if (override) return override;
  const entry = DETECTED[String(frame)];
  if (!entry) return null;
  return pointsFromRaw(entry[kind]);
}

// ---------------------------------------------------------------------------
// User edit store + propagation
// ---------------------------------------------------------------------------

type EditMap = Map<number, { lumen?: Point[]; vessel?: Point[] }>;
const userEdits: EditMap = new Map();

/** Listeners notified whenever the user edit set changes. */
const editListeners = new Set<() => void>();
let editVersion = 0;

function notifyEdits() {
  editVersion++;
  editListeners.forEach((l) => l());
}

export function subscribeToBorderEdits(listener: () => void): () => void {
  editListeners.add(listener);
  return () => editListeners.delete(listener);
}

/** Monotonic counter that bumps whenever any edit changes. */
export function getBorderEditVersion(): number {
  return editVersion;
}

/** How far an edit propagates (in frames) on each side. */
const PROPAGATION_RADIUS = 25;
/** Gaussian sigma for falloff; ~63% of radius. */
const PROPAGATION_SIGMA = PROPAGATION_RADIUS / 2;

/**
 * Commit a user-edited polygon at `frame`, and propagate the same per-point
 * delta to nearby frames with a Gaussian falloff. This is how the user's
 * adjustment "teaches" the system about the local anatomy.
 */
export function commitBorderEdit(
  frame: number,
  kind: 'lumen' | 'vessel',
  editedPolygon: Point[],
): void {
  // 1) Always store the exact edited polygon at this frame (any point count).
  const cur = userEdits.get(frame) ?? {};
  userEdits.set(frame, { ...cur, [kind]: editedPolygon.map((p) => ({ ...p })) });

  // 2) Geometric propagation to ±25 neighbors (instant feedback) — only when
  //    the user's polygon has the same point count as the bundled baseline,
  //    since the delta is computed per-point.  If the user added/removed
  //    handles, we skip this step; the IPC re-detect below still runs and
  //    will update every frame ~25-40s later.
  const baseline = getDetectedPolygon(frame, kind);
  if (baseline && baseline.length === editedPolygon.length) {
    const delta = editedPolygon.map((p, i) => ({
      x: p.x - baseline[i].x,
      y: p.y - baseline[i].y,
    }));
    for (let df = -PROPAGATION_RADIUS; df <= PROPAGATION_RADIUS; df++) {
      if (df === 0) continue;
      const nf = frame + df;
      if (nf < 1) continue;
      const neighborBase = getDetectedPolygon(nf, kind);
      if (!neighborBase || neighborBase.length !== delta.length) continue;
      const falloff = Math.exp(-(df * df) / (2 * PROPAGATION_SIGMA * PROPAGATION_SIGMA));
      if (falloff < 0.05) continue;
      const newPoly = neighborBase.map((p, i) => ({
        x: p.x + delta[i].x * falloff,
        y: p.y + delta[i].y * falloff,
      }));
      const ncur = userEdits.get(nf) ?? {};
      userEdits.set(nf, { ...ncur, [kind]: newPoly });
    }
  }

  notifyEdits();

  // ----------------------------------------------------------------------
  // TEMPORARY: if running in Electron, promote this edit to a permanent
  // keyframe and re-run full-cine detection so EVERY frame's prior reflects
  // the new anchor.  The geometric propagation above stays on screen as
  // instant feedback; the full result lands ~25-40s later and replaces it.
  // ----------------------------------------------------------------------
  const api = typeof window !== 'undefined' ? window.ivusApi : undefined;
  if (api && typeof api.promoteKeyframeAndRedetect === 'function') {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.log(`[ivusBorders] promoting frame ${frame} (${kind}) to keyframe and re-detecting...`);
    }
    api
      .promoteKeyframeAndRedetect({
        frame,
        kind,
        polygon: editedPolygon.map((p) => ({ x: p.x, y: p.y })),
      })
      .then((res) => {
        if (!res || !res.ok || !res.updated) {
          // eslint-disable-next-line no-console
          console.warn('[ivusBorders] re-detect returned no data:', res?.error);
          return;
        }
        // Replace the bundled detected data for every frame with the new
        // full-cine result, and clear local user-edit overrides for those
        // frames so the new detected data is what gets rendered.
        for (const [frameStr, polys] of Object.entries(res.updated)) {
          const nf = Number(frameStr);
          if (!Number.isFinite(nf)) continue;
          detectedOverrides.set(nf, {
            lumen: polys.lumen.map(([x, y]) => ({ x, y })),
            vessel: polys.vessel.map(([x, y]) => ({ x, y })),
          });
          // Clear user edits for this frame — the new detected data already
          // incorporates the promoted keyframe.
          userEdits.delete(nf);
        }
        if (process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line no-console
          console.log(
            `[ivusBorders] re-detected ${res.framesProcessed} frames in ${res.elapsedMs}ms ` +
              `(now ${res.anchorCount} anchor(s) total)`,
          );
        }
        notifyEdits();
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.warn('[ivusBorders] promoteKeyframeAndRedetect failed:', err);
      });
  }
}

/** Clear all user edits. */
export function clearBorderEdits(): void {
  userEdits.clear();
  notifyEdits();
}

/** Returns true if the given frame currently has any user-edited override. */
export function hasUserEdit(frame: number, kind?: 'lumen' | 'vessel'): boolean {
  const e = userEdits.get(frame);
  if (!e) return false;
  if (!kind) return Boolean(e.lumen || e.vessel);
  return Boolean(e[kind]);
}

// ---------------------------------------------------------------------------
// Top-level shape + measurement APIs — single source of truth for the UI
// ---------------------------------------------------------------------------

/**
 * Return the 10-point polygons to render at a frame. Resolution order:
 *   1. User-edited polygon (if present)
 *   2. Auto-detected polygon (precomputed)
 *   3. Interpolated ellipse fallback (sampled at POLYGON_SAMPLE_COUNT)
 */
export function getBorderPolygons(frame: number): { lumen: Point[]; vessel: Point[] } {
  const resolve = (kind: 'lumen' | 'vessel'): Point[] => {
    const edited = userEdits.get(frame)?.[kind];
    if (edited) return edited;
    const detected = getDetectedPolygon(frame, kind);
    if (detected) return detected;
    const shape = getInterpolatedShapes(frame)[kind];
    return sampleEllipse(shape);
  };
  return { lumen: resolve('lumen'), vessel: resolve('vessel') };
}

/** Lumen/vessel measurements derived from the rendered polygon (incl. edits). */
export function getBorderMeasurements(frame: number): BorderMeasurements {
  const { lumen, vessel } = getBorderPolygons(frame);
  const lumenAreaMm2 = pxAreaToMm2(polygonAreaPx(lumen));
  const vesselAreaMm2 = pxAreaToMm2(polygonAreaPx(vessel));
  const lumenDiameterMm = areaToEquivalentDiameter(lumenAreaMm2);
  const vesselDiameterMm = areaToEquivalentDiameter(vesselAreaMm2);
  const lumenDia = polygonMinMaxDiameters(lumen);
  const vesselDia = polygonMinMaxDiameters(vessel);
  const plaqueBurdenPct =
    vesselAreaMm2 > lumenAreaMm2
      ? ((vesselAreaMm2 - lumenAreaMm2) / vesselAreaMm2) * 100
      : 0;
  return {
    lumenAreaMm2,
    vesselAreaMm2,
    lumenDiameterMm,
    vesselDiameterMm,
    lumenMinDiameterMm: lumenDia.minPx / PIXELS_PER_MM,
    lumenMaxDiameterMm: lumenDia.maxPx / PIXELS_PER_MM,
    vesselMinDiameterMm: vesselDia.minPx / PIXELS_PER_MM,
    vesselMaxDiameterMm: vesselDia.maxPx / PIXELS_PER_MM,
    plaqueBurdenPct,
  };
}
