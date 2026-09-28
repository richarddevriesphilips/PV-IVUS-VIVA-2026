/**
 * Pure polygon geometry for the IVUS lumen/vessel borders, shared by the app
 * (utils/ivusBorders.ts) and the offline annotation script
 * (scripts/annotate-ivus-borders.mjs), which Node imports directly via type
 * stripping - keep this file import-free and use only erasable TS syntax.
 *
 * All coordinates are in the 720x720 display space of the IVUS frame.
 */

export interface Point {
  x: number;
  y: number;
}

export interface BorderPolygons {
  lumen: Point[];
  vessel: Point[];
}

export type RawPoint = [number, number];

/** Hand-traced expert keyframe in the paste-friendly format the Border Tool exports. Absolute truth at its frame. */
export interface PolygonKeyframe {
  frame: number;
  lumen: RawPoint[];
  vessel: RawPoint[];
}

export function keyframesToMap(list: PolygonKeyframe[]): Map<number, BorderPolygons> {
  const map = new Map<number, BorderPolygons>();
  for (const kf of list) {
    map.set(kf.frame, {
      lumen: kf.lumen.map(([x, y]) => ({ x, y })),
      vessel: kf.vessel.map(([x, y]) => ({ x, y })),
    });
  }
  return map;
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Smoothstep easing — gives a nicer transition than pure linear. */
export function smoothstep(t: number): number {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}

export function clonePolygons(p: BorderPolygons): BorderPolygons {
  return { lumen: p.lumen.map((q) => ({ ...q })), vessel: p.vessel.map((q) => ({ ...q })) };
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

/**
 * Densify a closed polygon along the same Catmull-Rom curve that
 * `pointsToSmoothPath` renders, so shape math (blending, area) operates on
 * the smooth border the user actually sees and edits - not on the straight
 * segments between the sparse handles they placed.
 */
export function smoothPolygon(points: Point[], samplesPerSegment = 12): Point[] {
  const n = points.length;
  if (n < 3) return points.map((p) => ({ ...p }));
  const out: Point[] = [];
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    for (let s = 0; s < samplesPerSegment; s++) {
      const t = s / samplesPerSegment;
      const u = 1 - t;
      out.push({
        x: u * u * u * p1.x + 3 * u * u * t * c1x + 3 * u * t * t * c2x + t * t * t * p2.x,
        y: u * u * u * p1.y + 3 * u * u * t * c1y + 3 * u * t * t * c2y + t * t * t * p2.y,
      });
    }
  }
  return out;
}

/**
 * Resample a closed polygon into `count` points evenly spaced by ARC LENGTH
 * along its boundary (walking the already-ordered points, not ray-casting
 * from a center) - robust for concave/irregular shapes.
 */
export function resamplePolygonByArcLength(points: Point[], count: number): Point[] {
  const n = points.length;
  const segLens: number[] = [];
  let total = 0;
  for (let i = 0; i < n; i++) {
    const a = points[i];
    const b = points[(i + 1) % n];
    const len = Math.hypot(b.x - a.x, b.y - a.y);
    segLens.push(len);
    total += len;
  }
  if (total < 1e-6) return Array.from({ length: count }, () => ({ ...points[0] }));

  const result: Point[] = [];
  let seg = 0;
  let acc = 0;
  for (let k = 0; k < count; k++) {
    const target = (k / count) * total;
    while (seg < n - 1 && acc + segLens[seg] < target) {
      acc += segLens[seg];
      seg++;
    }
    const segT = segLens[seg] < 1e-9 ? 0 : (target - acc) / segLens[seg];
    const a = points[seg];
    const b = points[(seg + 1) % n];
    result.push({ x: lerp(a.x, b.x, segT), y: lerp(a.y, b.y, segT) });
  }
  return result;
}

/** Sum of squared point-to-point distances between two equal-length point sequences. */
function sequenceCost(a: Point[], b: Point[]): number {
  let cost = 0;
  for (let i = 0; i < a.length; i++) {
    const dx = a[i].x - b[i].x;
    const dy = a[i].y - b[i].y;
    cost += dx * dx + dy * dy;
  }
  return cost;
}

/**
 * Find the circular rotation offset (and winding direction) that best aligns
 * `b` to `a`, minimizing total squared distance. Traced polygons have no fixed
 * "point 0" correspondence and no guaranteed tracing direction.
 */
export function bestAlignment(a: Point[], b: Point[]): Point[] {
  const n = a.length;
  const reversed = [...b].reverse();
  let best = b;
  let bestCost = Infinity;
  for (const candidate of [b, reversed]) {
    for (let offset = 0; offset < n; offset++) {
      const rotated = candidate.map((_, i) => candidate[(i + offset) % n]);
      const cost = sequenceCost(a, rotated);
      if (cost < bestCost) {
        bestCost = cost;
        best = rotated;
      }
    }
  }
  return best;
}

/**
 * Blend two closed borders by SHAPE: densify both along their rendered smooth
 * curve, resample to `samples` points by arc length, align, then lerp. The
 * output's point order always follows `pa`, so for a fixed (pa, pb) pair point
 * k corresponds across every t - the annotation script relies on this.
 */
export function blendPolygons(pa: Point[], pb: Point[], t: number, samples: number): Point[] {
  const ra = resamplePolygonByArcLength(smoothPolygon(pa), samples);
  const rb = bestAlignment(ra, resamplePolygonByArcLength(smoothPolygon(pb), samples));
  return ra.map((p, k) => ({ x: lerp(p.x, rb[k].x, t), y: lerp(p.y, rb[k].y, t) }));
}

/** Nearest keyframe frames at or around `frame`: [prev, next] (prev < frame < next; either may be undefined). */
export function bracketFrames(sortedFrames: number[], frame: number): [number | undefined, number | undefined] {
  let prev: number | undefined;
  let next: number | undefined;
  for (const f of sortedFrames) {
    if (f < frame) prev = f;
    else if (f > frame) {
      next = f;
      break;
    }
  }
  return [prev, next];
}

/**
 * Borders at `frame` from sparse keyframes: an exact copy at a keyframe, the
 * nearest keyframe outside the authored range, or a smoothstep shape blend
 * between the two surrounding keyframes.
 */
export function interpolateKeyframes(
  keyframes: Map<number, BorderPolygons>,
  frame: number,
  samples: number,
): BorderPolygons | null {
  if (keyframes.size === 0) return null;
  const exact = keyframes.get(frame);
  if (exact) return clonePolygons(exact);

  const frames = Array.from(keyframes.keys()).sort((a, b) => a - b);
  const [prev, next] = bracketFrames(frames, frame);
  if (prev === undefined) return clonePolygons(keyframes.get(next!)!);
  if (next === undefined) return clonePolygons(keyframes.get(prev)!);

  const a = keyframes.get(prev)!;
  const b = keyframes.get(next)!;
  const t = smoothstep((frame - prev) / (next - prev));
  return {
    lumen: blendPolygons(a.lumen, b.lumen, t, samples),
    vessel: blendPolygons(a.vessel, b.vessel, t, samples),
  };
}

/** Deterministic fingerprint of a keyframe's points, used to detect stale precomputed annotations. */
export function keyframeChecksum(p: BorderPolygons): string {
  let sum = 0;
  p.lumen.forEach((q, i) => { sum += (q.x * 31 + q.y * 17) * (i + 1); });
  p.vessel.forEach((q, i) => { sum += (q.x * 29 + q.y * 13) * (i + 101); });
  return `${p.lumen.length}.${p.vessel.length}.${Math.round(sum * 10)}`;
}

// ---------------------------------------------------------------------------
// Catheter coverage: the imaging catheter always lies inside the lumen
// ---------------------------------------------------------------------------

/** Radius (px) around the catheter centre every lumen must cover: the catheter plus its bright ring. */
export const CATHETER_AREA_RADIUS = 25;
/** The vessel covers a slightly larger disc so it stays outside the lumen there. */
export const VESSEL_CATHETER_AREA_RADIUS = CATHETER_AREA_RADIUS + 3;

export function pointInPolygon(points: Point[], p: Point): boolean {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const a = points[i];
    const b = points[j];
    if ((a.y > p.y) !== (b.y > p.y) && p.x < ((b.x - a.x) * (p.y - a.y)) / (b.y - a.y) + a.x) inside = !inside;
  }
  return inside;
}

function distanceToPolyline(points: Point[], p: Point): number {
  let best = Infinity;
  for (let i = 0; i < points.length; i++) {
    const a = points[i];
    const b = points[(i + 1) % points.length];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const l2 = dx * dx + dy * dy;
    const t = l2 < 1e-9 ? 0 : Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / l2));
    best = Math.min(best, Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy)));
  }
  return best;
}

/** Radius at which the ray from `centre` at `theta` last crosses the closed curve (0 if it misses). */
function outerRadius(curve: Point[], centre: Point, theta: number): number {
  const ux = Math.cos(theta);
  const uy = Math.sin(theta);
  let best = 0;
  for (let k = 0; k < curve.length; k++) {
    const a = curve[k];
    const b = curve[(k + 1) % curve.length];
    const ex = b.x - a.x;
    const ey = b.y - a.y;
    const den = ux * ey - uy * ex;
    if (Math.abs(den) < 1e-12) continue;
    const ax = a.x - centre.x;
    const ay = a.y - centre.y;
    const t = (ax * ey - ay * ex) / den;
    const s = (ax * uy - ay * ux) / den;
    if (t > 0 && s >= 0 && s < 1 && t > best) best = t;
  }
  return best;
}

/** True if the rendered (smooth) border encloses the whole disc. */
export function coversDisc(points: Point[], centre: Point, radius: number): boolean {
  if (points.length < 3) return false;
  const curve = smoothPolygon(points, 8);
  return pointInPolygon(curve, centre) && distanceToPolyline(curve, centre) >= radius - 0.5;
}

/**
 * Smallest change to a closed border that makes it enclose the disc
 * (centre, radius): vertices outside the disc on the border's outer side are
 * kept, and wherever the border fell short the disc edge is added as arc
 * points. A border beside the disc becomes its union with the disc.
 */
export function coverDisc(points: Point[], centre: Point, radius: number): Point[] {
  if (points.length < 3 || coversDisc(points, centre, radius)) return points;
  const curve = smoothPolygon(points, 8);
  const polar = (p: Point) => ({ theta: Math.atan2(p.y - centre.y, p.x - centre.x), r: Math.hypot(p.x - centre.x, p.y - centre.y) });
  const outer = points.map(polar).filter((v) => v.r >= outerRadius(curve, centre, v.theta) - 2);
  const STEPS = 144;
  const thetaAt = (k: number) => -Math.PI + (2 * Math.PI * k) / STEPS;
  const reach = Array.from({ length: STEPS }, (_, k) => outerRadius(curve, centre, thetaAt(k)));
  const angleGap = (a: number, b: number) => Math.abs(Math.atan2(Math.sin(a - b), Math.cos(a - b)));
  let result = points;
  for (let margin = 1.5; margin <= 13.5; margin += 3) {
    const kept = outer.filter((v) => v.r >= radius + margin);
    const short = reach.map((r) => r < radius + margin);
    const arc: Array<{ theta: number; r: number; arc: true }> = [];
    for (let k = 0; k < STEPS; k++) {
      if (!short[k]) continue;
      const edge = !short[(k + STEPS - 1) % STEPS] || !short[(k + 1) % STEPS];
      if (!edge && k % 12 !== 0) continue; // arc points every 30 deg, plus where the border rejoins
      const theta = thetaAt(k);
      if (kept.some((v) => angleGap(v.theta, theta) < Math.PI / 60)) continue;
      arc.push({ theta, r: radius + margin, arc: true });
    }
    const merged = [...kept, ...arc].sort((a, b) => a.theta - b.theta);
    // An arc point right next to another point only adds a kink: drop it.
    const pos = (v: { theta: number; r: number }) => ({ x: centre.x + v.r * Math.cos(v.theta), y: centre.y + v.r * Math.sin(v.theta) });
    const close = (a: { theta: number; r: number }, b: { theta: number; r: number }) => {
      const p = pos(a);
      const q = pos(b);
      return Math.hypot(p.x - q.x, p.y - q.y) < 4;
    };
    const tidy: typeof merged = [];
    for (const v of merged) {
      const last = tidy[tidy.length - 1];
      if (!last || !close(v, last) || (!('arc' in last) && !('arc' in v))) tidy.push(v);
      else if ('arc' in last && !('arc' in v)) tidy[tidy.length - 1] = v;
    }
    if (tidy.length > 3 && close(tidy[0], tidy[tidy.length - 1]) && 'arc' in tidy[tidy.length - 1]) tidy.pop();
    result = tidy.map(pos);
    if (coversDisc(result, centre, radius)) break;
  }
  return result;
}

// ---------------------------------------------------------------------------
// Editing handles
// ---------------------------------------------------------------------------

/** Minimum number of handles a polygon must keep during editing. */
export const MIN_EDIT_POINTS = 4;
/** Perpendicular-distance threshold (px) for simplifying dense borders into handles. */
const SIMPLIFY_EPSILON = 3.5;
/** Borders with more points than this are generated (dense) and get simplified into handles; sparser ones are hand-placed and kept as-is. */
const HAND_PLACED_MAX_POINTS = 14;

function perpDistanceToLine(p: Point, a: Point, b: Point): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 1e-9) return Math.hypot(p.x - a.x, p.y - a.y);
  return Math.abs((dy * p.x - dx * p.y + b.x * a.y - b.y * a.x) / len);
}

/**
 * Iteratively drop the point that contributes the least curvature (smallest
 * perpendicular distance from the segment through its neighbors), stopping
 * when removing the next point would exceed `epsilon` or we'd fall below
 * `minPts`. Operates on a CLOSED polygon.
 */
export function simplifyClosedPolygon(points: Point[], epsilon: number, minPts: number): Point[] {
  const pts = points.map((p) => ({ ...p }));
  while (pts.length > minPts) {
    let minDev = Infinity;
    let minIdx = -1;
    for (let i = 0; i < pts.length; i++) {
      const prev = pts[(i - 1 + pts.length) % pts.length];
      const next = pts[(i + 1) % pts.length];
      const d = perpDistanceToLine(pts[i], prev, next);
      if (d < minDev) {
        minDev = d;
        minIdx = i;
      }
    }
    if (minDev > epsilon || minIdx < 0) break;
    pts.splice(minIdx, 1);
  }
  return pts;
}

/** Handles to edit a border with: hand-placed borders as-is, dense generated ones simplified. */
export function editableHandles(points: Point[]): Point[] {
  if (points.length <= HAND_PLACED_MAX_POINTS) return points.map((p) => ({ ...p }));
  return simplifyClosedPolygon(points, SIMPLIFY_EPSILON, MIN_EDIT_POINTS);
}
