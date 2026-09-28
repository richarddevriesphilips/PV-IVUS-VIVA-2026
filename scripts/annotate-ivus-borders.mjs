#!/usr/bin/env node
/**
 * Per-frame IVUS lumen/vessel annotation, learned from the expert keyframes.
 *
 *   npm run annotate-borders                     # annotate both legs
 *   node scripts/annotate-ivus-borders.mjs right # one leg
 *   ... --validate   5-fold cross-validation vs the expert keyframes
 *   ... --lmode=-40  longitudinal QA image(s) in /tmp (angle in degrees)
 *   ... --set=keyframeBlend=0.5,lambda=2   override PARAMS (for tuning)
 *
 * Expert rules built in:
 *  - The catheter sits inside the lumen, so both borders always enclose the
 *    catheter area (CATHETER_AREA_RADIUS around its centre) and each border
 *    is one radius per angle around it.
 *  - Lumen and vessel conventions (e.g. how much of a gray, speckled region
 *    counts as lumen) are learned from the keyframes.
 *
 * Method (scripts/ivus-border-model.mjs): a small neural network trained on
 * the keyframes of both legs labels every polar sample around the catheter as
 * lumen / vessel wall / outside; a circular dynamic program picks the smooth
 * vessel border, then the lumen inside it, that best fit those labels while
 * being pulled toward the keyframe interpolation. The final border blends that
 * image result with the interpolation (weights chosen by cross-validation).
 * Keyframes stay exact.
 */
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {
  BORDER_POLYGON_KEYFRAMES_LEFT,
  BORDER_POLYGON_KEYFRAMES_RIGHT,
} from '../intrasight-distant-future/src/data/borderKeyframes.ts';
import {
  CATHETER_AREA_RADIUS,
  VESSEL_CATHETER_AREA_RADIUS,
  blendPolygons,
  bracketFrames,
  coverDisc,
  keyframeChecksum,
  keyframesToMap,
  resamplePolygonByArcLength,
  smoothPolygon,
  smoothstep,
} from '../intrasight-distant-future/src/utils/borderGeometry.ts';
import * as model from './ivus-border-model.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const SIZE = 720;
const PX_PER_MM = 12;
const OUTPUT_POINTS = 32;

const LEGS = {
  right: {
    dir: 'public/intrasight-distant-future/assets/ivus-frames-right-leg',
    keyframes: BORDER_POLYGON_KEYFRAMES_RIGHT,
    out: 'intrasight-distant-future/src/data/ivus-annotations-right.json',
  },
  left: {
    dir: 'public/intrasight-distant-future/assets/ivus-frames',
    keyframes: BORDER_POLYGON_KEYFRAMES_LEFT,
    out: 'intrasight-distant-future/src/data/ivus-annotations-left.json',
  },
};

const PARAMS = {
  epochs: 10,
  temporalWindow: 2, // class probabilities are averaged over +-N frames
  lambda: 1, // DP cost per radius step between neighbouring angles
  maxStep: 6, // max radius change between neighbouring angles (samples)
  angularSigma: 1.5, // angle samples
  temporalSigma: 1.5, // frames
  margin: 1, // min gap between vessel and lumen (radius samples)
  keyframePull: 0.6, // DP pull toward the keyframe interpolation
  keyframeBlend: 0.25, // final = interpolation + keyframeBlend * (image result - interpolation)
};
for (const arg of process.argv.filter((a) => a.startsWith('--set='))) {
  for (const kv of arg.slice(6).split(',')) {
    const [k, v] = kv.split('=');
    if (!(k in PARAMS)) throw new Error(`Unknown param ${k}`);
    PARAMS[k] = Number(v);
  }
}

// ---------------------------------------------------------------------------
// Frames (ffmpeg -> 720x720 grayscale, same cover-crop as the app)
// ---------------------------------------------------------------------------

function countFrames(dir) {
  return fs.readdirSync(path.join(ROOT, dir)).filter((f) => /^frame_\d{4}\.jpg$/.test(f)).length;
}

function ffmpeg(args, bytesPerFrame, onFrame) {
  return new Promise((resolve, reject) => {
    const ff = spawn('ffmpeg', args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let frame = Buffer.allocUnsafe(bytesPerFrame);
    let filled = 0;
    let index = 0;
    let stderr = '';
    ff.stdout.on('data', (chunk) => {
      let offset = 0;
      while (offset < chunk.length) {
        const n = Math.min(bytesPerFrame - filled, chunk.length - offset);
        chunk.copy(frame, filled, offset, offset + n);
        filled += n;
        offset += n;
        if (filled === bytesPerFrame) {
          if (onFrame(++index, frame)) frame = Buffer.allocUnsafe(bytesPerFrame); // kept: don't overwrite
          filled = 0;
        }
      }
    });
    ff.stderr.on('data', (d) => { stderr += d; });
    ff.on('error', reject);
    ff.on('close', (code) => (code === 0 ? resolve(index) : reject(new Error(`ffmpeg exited ${code}: ${stderr}`))));
  });
}

const COVER = `scale=${SIZE}:${SIZE}:force_original_aspect_ratio=increase:flags=area,crop=${SIZE}:${SIZE}`;

/** Grayscale frames of a leg (1-based), optionally only those in `keep`. */
async function decodeFrames(leg, keep) {
  const images = new Map();
  const args = ['-v', 'error', '-start_number', '1', '-i', path.join(ROOT, leg.dir, 'frame_%04d.jpg'),
    '-vf', `${COVER},format=gray`, '-f', 'rawvideo', '-pix_fmt', 'gray', '-'];
  await ffmpeg(args, SIZE * SIZE, (i, buf) => {
    if (keep && !keep.has(i)) return false;
    images.set(i, buf);
    return true;
  });
  return images;
}

/** Catheter centre = centroid of the cyan crosshair drawn inside the catheter. */
async function findCatheterCentre(leg) {
  let rgb = null;
  await ffmpeg(['-v', 'error', '-i', path.join(ROOT, leg.dir, 'frame_0001.jpg'), '-vf', COVER, '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'],
    SIZE * SIZE * 3, (_, buf) => { rgb = buf; return true; });
  let sx = 0;
  let sy = 0;
  let n = 0;
  for (let y = 320; y < 410; y++) for (let x = 320; x < 410; x++) {
    const i = (y * SIZE + x) * 3;
    const [r, g, b] = [rgb[i], rgb[i + 1], rgb[i + 2]];
    if (g > 120 && b > 120 && g - r > 50 && b - r > 50) { sx += x; sy += y; n++; }
  }
  if (n < 10) throw new Error(`No catheter crosshair found in ${leg.dir}`);
  return { x: sx / n, y: sy / n };
}

// ---------------------------------------------------------------------------
// Polar anchors + interpolation
// ---------------------------------------------------------------------------

/** Keyframe border radii per angle around the catheter. */
function polarAnchors(list, centre) {
  const map = new Map();
  const radii = (points) => model.curveToRadii(smoothPolygon(points, 12), centre);
  for (const [frame, p] of keyframesToMap(list)) map.set(frame, { lumen: radii(p.lumen), vessel: radii(p.vessel) });
  return map;
}

function polarInterpolation(anchors, sortedFrames, frame) {
  if (anchors.has(frame)) return anchors.get(frame);
  const [a, b] = bracketFrames(sortedFrames, frame);
  if (a === undefined || b === undefined) return anchors.get(a ?? b);
  const t = smoothstep((frame - a) / (b - a));
  const A = anchors.get(a);
  const B = anchors.get(b);
  return { lumen: A.lumen.map((v, i) => v + (B.lumen[i] - v) * t), vessel: A.vessel.map((v, i) => v + (B.vessel[i] - v) * t) };
}

// ---------------------------------------------------------------------------
// Learned segmentation
// ---------------------------------------------------------------------------

function trainingSet(images, anchorsByLeg, centres, exclude = new Set()) {
  const data = [];
  for (const [legName, anchors] of Object.entries(anchorsByLeg)) {
    for (const [frame, radii] of anchors) {
      if (exclude.has(`${legName}:${frame}`)) continue;
      data.push({ features: model.polarFeatures(images[legName].get(frame), SIZE, centres[legName]), ...model.polarLabels(radii.lumen, radii.vessel) });
    }
  }
  return data;
}

/** Class probabilities per frame, averaged over +-temporalWindow frames. */
function* averagedProbabilities(net, images, frames, centre) {
  const W = PARAMS.temporalWindow;
  const cache = new Map();
  const probsAt = (f) => {
    if (!cache.has(f)) cache.set(f, model.classify(net, model.polarFeatures(images.get(f), SIZE, centre)));
    return cache.get(f);
  };
  for (const f of frames) {
    const window = [];
    for (let d = -W; d <= W; d++) if (images.has(f + d)) window.push(probsAt(f + d));
    const avg = new Float32Array(window[0].length);
    for (const p of window) for (let i = 0; i < p.length; i++) avg[i] += p[i] / window.length;
    for (const key of cache.keys()) if (key < f - W) cache.delete(key);
    yield [f, avg];
  }
}

/** Vessel first (pulled toward the interpolated `prior` radii), then the lumen inside it. */
function segment(probs, prior) {
  const { angles: NA, radii: NR, dr } = model.GRID;
  const costs = model.borderCosts(probs);
  const pulled = (cost, radii) => {
    const out = Float32Array.from(cost);
    for (let i = 0; i < NA; i++) for (let j = 0; j < NR; j++) out[i * NR + j] += PARAMS.keyframePull * Math.abs(j - radii[i] / dr);
    return out;
  };
  const dp = { lambda: PARAMS.lambda, maxStep: PARAMS.maxStep };
  const vj = model.circularDP(pulled(costs.vessel, prior.vessel), { ...dp, minJ: new Int32Array(NA).fill(Math.ceil(VESSEL_CATHETER_AREA_RADIUS / dr)) });
  const vessel = model.smoothRadii(Float64Array.from(vj, (j) => j * dr), PARAMS.angularSigma);
  const lj = model.circularDP(pulled(costs.lumen, prior.lumen), {
    ...dp, minJ: new Int32Array(NA).fill(Math.ceil(CATHETER_AREA_RADIUS / dr)), maxJ: Int32Array.from(vessel, (r) => Math.floor(r / dr) - PARAMS.margin),
  });
  const lumen = model.smoothRadii(Float64Array.from(lj, (j) => j * dr), PARAMS.angularSigma);
  const mix = (radii, image) => image.map((v, i) => radii[i] + (v - radii[i]) * PARAMS.keyframeBlend);
  const agreement = Math.min(model.polarDice(lumen, prior.lumen), model.polarDice(vessel, prior.vessel));
  return { lumen: mix(prior.lumen, lumen), vessel: mix(prior.vessel, vessel), agreement };
}

/** Gaussian smoothing over frames (fixed frames, i.e. keyframes, are kept and still pull their neighbours). */
function smoothOverFrames(series, fixed) {
  const R = Math.ceil(3 * PARAMS.temporalSigma);
  const out = new Map();
  for (const [f, cur] of series) {
    if (fixed.has(f) || !PARAMS.temporalSigma) { out.set(f, cur); continue; }
    const acc = { lumen: new Float64Array(cur.lumen.length), vessel: new Float64Array(cur.vessel.length) };
    let wsum = 0;
    for (let d = -R; d <= R; d++) {
      const s = series.get(f + d);
      if (!s) continue;
      const w = Math.exp(-(d * d) / (2 * PARAMS.temporalSigma ** 2));
      wsum += w;
      for (const kind of ['lumen', 'vessel']) for (let i = 0; i < acc[kind].length; i++) acc[kind][i] += w * s[kind][i];
    }
    const lumen = acc.lumen.map((v) => Math.max(CATHETER_AREA_RADIUS + 1, v / wsum));
    out.set(f, { ...cur, lumen, vessel: acc.vessel.map((v, i) => Math.max(lumen[i] + 2, VESSEL_CATHETER_AREA_RADIUS + 1, v / wsum)) });
  }
  return out;
}

async function loadCommon() {
  const centres = {};
  const anchorsByLeg = {};
  for (const [name, leg] of Object.entries(LEGS)) {
    centres[name] = await findCatheterCentre(leg);
    anchorsByLeg[name] = polarAnchors(leg.keyframes, centres[name]);
  }
  return { centres, anchorsByLeg };
}

// ---------------------------------------------------------------------------
// Metrics
// ---------------------------------------------------------------------------

function rasterize(pts, x0, y0, w, h) {
  const mask = new Uint8Array(w * h);
  const n = pts.length;
  for (let row = 0; row < h; row++) {
    const y = y0 + row + 0.5;
    const xs = [];
    for (let i = 0; i < n; i++) {
      const a = pts[i];
      const b = pts[(i + 1) % n];
      if ((a.y <= y && b.y > y) || (b.y <= y && a.y > y)) xs.push(a.x + ((y - a.y) / (b.y - a.y)) * (b.x - a.x));
    }
    xs.sort((p, q) => p - q);
    for (let i = 0; i + 1 < xs.length; i += 2) {
      const from = Math.max(0, Math.ceil(xs[i] - x0 - 0.5));
      const to = Math.min(w - 1, Math.floor(xs[i + 1] - x0 - 0.5));
      for (let c = from; c <= to; c++) mask[row * w + c] = 1;
    }
  }
  return mask;
}

function dice(a, b) {
  const all = [...a, ...b];
  const x0 = Math.floor(Math.min(...all.map((p) => p.x))) - 1;
  const y0 = Math.floor(Math.min(...all.map((p) => p.y))) - 1;
  const w = Math.ceil(Math.max(...all.map((p) => p.x))) - x0 + 2;
  const h = Math.ceil(Math.max(...all.map((p) => p.y))) - y0 + 2;
  const ma = rasterize(a, x0, y0, w, h);
  const mb = rasterize(b, x0, y0, w, h);
  let inter = 0;
  let sum = 0;
  for (let i = 0; i < ma.length; i++) {
    sum += ma[i] + mb[i];
    inter += ma[i] & mb[i];
  }
  return (2 * inter) / (sum || 1);
}

function pointToSegment(p, a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const l2 = dx * dx + dy * dy;
  const t = l2 < 1e-9 ? 0 : Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / l2));
  return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
}

function meanContourDistance(a, b) {
  const one = (from, to) => from.reduce((s, p) => {
    let m = Infinity;
    for (let i = 0; i < to.length; i++) m = Math.min(m, pointToSegment(p, to[i], to[(i + 1) % to.length]));
    return s + m;
  }, 0) / from.length;
  return (one(a, b) + one(b, a)) / 2;
}

const compare = (candidate, truth) => ({ dice: dice(candidate, truth), errMm: meanContourDistance(candidate, truth) / PX_PER_MM });
const mean = (xs) => xs.reduce((s, x) => s + x, 0) / (xs.length || 1);

// ---------------------------------------------------------------------------
// Commands
// ---------------------------------------------------------------------------

async function validate(legName) {
  const leg = LEGS[legName];
  const { centres, anchorsByLeg } = await loadCommon();
  const anchors = anchorsByLeg[legName];
  const frames = [...anchors.keys()].sort((a, b) => a - b);
  if (frames.length < 5) { console.log(`[${legName}] fewer than 5 keyframes - nothing to validate against`); return; }
  const T = Math.ceil(3 * PARAMS.temporalSigma);
  const reach = T + PARAMS.temporalWindow;
  const images = {};
  for (const [name, other] of Object.entries(LEGS)) {
    const keep = new Set(anchorsByLeg[name].keys());
    if (name === legName) for (const K of frames) for (let d = -reach; d <= reach; d++) keep.add(K + d);
    images[name] = await decodeFrames(other, keep);
  }
  const truth = keyframesToMap(leg.keyframes);
  const FOLDS = 5;
  const cases = [];
  for (let k = 0; k < FOLDS; k++) {
    const heldOut = frames.filter((_, i) => i % FOLDS === k);
    const net = model.trainClassifier(trainingSet(images, anchorsByLeg, centres, new Set(heldOut.map((K) => `${legName}:${K}`))), { epochs: PARAMS.epochs });
    for (const K of heldOut) {
      const window = [];
      for (let d = -T; d <= T; d++) if (images[legName].has(K + d)) window.push(K + d);
      cases.push({ K, probs: new Map(averagedProbabilities(net, images[legName], window, centres[legName])) });
    }
    console.log(`  fold ${k + 1}/${FOLDS} done`);
  }
  const rows = [];
  for (const { K, probs } of cases) {
    const rest = new Map(anchors);
    rest.delete(K);
    const restFrames = frames.filter((f) => f !== K);
    const series = new Map();
    for (const [f, p] of probs) series.set(f, rest.has(f) ? rest.get(f) : segment(p, polarInterpolation(rest, restFrames, f)));
    const final = smoothOverFrames(series, new Set([...rest.keys()])).get(K);
    const interp = polarInterpolation(rest, restFrames, K);
    const [a, b] = bracketFrames(restFrames, K);
    const shape = a === undefined || b === undefined ? truth.get(a ?? b)
      : { lumen: blendPolygons(truth.get(a).lumen, truth.get(b).lumen, smoothstep((K - a) / (b - a)), 96), vessel: blendPolygons(truth.get(a).vessel, truth.get(b).vessel, smoothstep((K - a) / (b - a)), 96) };
    const row = { frame: K };
    for (const kind of ['lumen', 'vessel']) {
      const t = smoothPolygon(truth.get(K)[kind], 12);
      row[kind] = {
        shape: compare(smoothPolygon(shape[kind], 4), t),
        polar: compare(model.radiiToPoints(interp[kind], centres[legName]), t),
        annotated: compare(model.radiiToPoints(final[kind], centres[legName]), t),
      };
    }
    rows.push(row);
  }
  console.log(`[${legName}] 5-fold cross-validation on ${rows.length} expert keyframes:`);
  for (const kind of ['lumen', 'vessel']) {
    const m = (which, metric) => mean(rows.map((r) => r[kind][which][metric]));
    const better = rows.filter((r) => r[kind].annotated.errMm < r[kind].shape.errMm - 0.005).length;
    const worse = rows.filter((r) => r[kind].annotated.errMm > r[kind].shape.errMm + 0.005).length;
    console.log(`  ${kind.padEnd(6)} Dice / mean border error: shape interpolation ${m('shape', 'dice').toFixed(3)} / ${m('shape', 'errMm').toFixed(3)} mm | polar interpolation ${m('polar', 'dice').toFixed(3)} / ${m('polar', 'errMm').toFixed(3)} mm | annotation ${m('annotated', 'dice').toFixed(3)} / ${m('annotated', 'errMm').toFixed(3)} mm (better on ${better}, worse on ${worse} vs shape interpolation)`);
  }
}

let sharedNet = null; // the model learns from every leg's keyframes, so one training serves all legs

async function annotate(legName) {
  const leg = LEGS[legName];
  const started = Date.now();
  const { centres, anchorsByLeg } = await loadCommon();
  const centre = centres[legName];
  const exact = anchorsByLeg[legName];
  if (!exact.size) throw new Error(`[${legName}] needs at least one keyframe in borderKeyframes.ts`);
  const exactFrames = [...exact.keys()].sort((a, b) => a - b);
  const total = countFrames(leg.dir);

  const images = await decodeFrames(leg);
  if (!sharedNet) {
    const trainImages = { [legName]: images };
    for (const [name, other] of Object.entries(LEGS)) if (name !== legName) trainImages[name] = await decodeFrames(other, new Set(anchorsByLeg[name].keys()));
    sharedNet = model.trainClassifier(trainingSet(trainImages, anchorsByLeg, centres), { epochs: PARAMS.epochs });
  }
  const net = sharedNet;

  const series = new Map(exact);
  const agreement = new Map();
  const frames = Array.from({ length: total }, (_, i) => i + 1);
  for (const [f, probs] of averagedProbabilities(net, images, frames, centre)) {
    if (exact.has(f)) continue;
    const out = segment(probs, polarInterpolation(exact, exactFrames, f));
    series.set(f, out);
    agreement.set(f, out.agreement);
  }
  const smoothed = smoothOverFrames(series, new Set(exactFrames));

  const result = {};
  const toFlat = (radii, cover) => coverDisc(resamplePolygonByArcLength(model.radiiToPoints(radii, centre), OUTPUT_POINTS), centre, cover)
    .flatMap((p) => [Math.round(p.x), Math.round(p.y)]);
  for (const f of frames) {
    if (exact.has(f)) continue;
    const r = smoothed.get(f);
    result[f] = { l: toFlat(r.lumen, CATHETER_AREA_RADIUS), v: toFlat(r.vessel, VESSEL_CATHETER_AREA_RADIUS), c: Math.round(agreement.get(f) * 100) / 100 };
  }
  const keyframes = keyframesToMap(leg.keyframes);
  const anchorsOut = {};
  for (const f of exactFrames) anchorsOut[f] = keyframeChecksum(keyframes.get(f));
  fs.writeFileSync(path.join(ROOT, leg.out), JSON.stringify({
    version: 3,
    leg: legName,
    generatedAt: new Date().toISOString(),
    method: 'See scripts/annotate-ivus-borders.mjs. c = Dice agreement between the image model and the keyframe interpolation; low c = worth an expert keyframe.',
    catheterCentre: { x: Math.round(centre.x * 10) / 10, y: Math.round(centre.y * 10) / 10 },
    params: PARAMS,
    anchors: anchorsOut,
    frames: result,
  }));
  const kb = (fs.statSync(path.join(ROOT, leg.out)).size / 1024).toFixed(0);
  console.log(`[${legName}] annotated ${Object.keys(result).length} frames (+${exact.size} expert keyframes) in ${((Date.now() - started) / 1000).toFixed(0)}s -> ${leg.out} (${kb} KB)`);

  const WINDOW = 60;
  const worst = new Map();
  for (const [f, c] of agreement) {
    const [a] = bracketFrames(exactFrames, f);
    const key = `${a ?? 0}:${Math.floor((f - (a ?? 0)) / WINDOW)}`;
    if (!worst.has(key) || c < worst.get(key).c) worst.set(key, { f, c });
  }
  const suggest = [...worst.values()].sort((x, y) => x.c - y.c).slice(0, 8);
  console.log(`[${legName}] frames most worth an extra expert keyframe: ${suggest.map((s) => `${s.f} (${s.c.toFixed(2)})`).join(', ')}`);
}

/** Longitudinal (L-mode) QA image through the catheter at `angleDeg`: frames left->right, borders overlaid. */
async function renderLmode(legName, angleDeg) {
  const leg = LEGS[legName];
  const centre = await findCatheterCentre(leg);
  const keyframes = keyframesToMap(leg.keyframes);
  const data = JSON.parse(fs.readFileSync(path.join(ROOT, leg.out), 'utf8')).frames;
  const images = await decodeFrames(leg);
  const total = images.size;
  const R = 200;
  const H = 2 * R + 1;
  const ux = Math.cos((angleDeg * Math.PI) / 180);
  const uy = Math.sin((angleDeg * Math.PI) / 180);
  const rgb = Buffer.alloc(total * H * 3);
  const put = (f, r, c) => {
    const row = Math.round(R - r);
    if (row >= 0 && row < H) rgb.set(c, (row * total + (f - 1)) * 3);
  };
  const sample = (img, x, y) => img[Math.min(SIZE - 1, Math.max(0, Math.round(y))) * SIZE + Math.min(SIZE - 1, Math.max(0, Math.round(x)))];
  const unflat = (arr) => Array.from({ length: arr.length / 2 }, (_, i) => ({ x: arr[2 * i], y: arr[2 * i + 1] }));
  for (const [f, img] of images) {
    for (let r = -R; r <= R; r++) {
      const v = sample(img, centre.x + ux * r, centre.y + uy * r);
      put(f, r, [v, v, v]);
    }
    const polys = keyframes.has(f) ? keyframes.get(f) : { lumen: unflat(data[f].l), vessel: unflat(data[f].v) };
    for (const [kind, color] of [['vessel', [35, 204, 114]], ['lumen', [33, 185, 255]]]) {
      const pts = resamplePolygonByArcLength(smoothPolygon(polys[kind]), 256);
      for (let i = 0; i < pts.length; i++) {
        const p = { x: pts[i].x - centre.x, y: pts[i].y - centre.y };
        const q = { x: pts[(i + 1) % pts.length].x - centre.x, y: pts[(i + 1) % pts.length].y - centre.y };
        const sp = -p.x * uy + p.y * ux;
        const sq = -q.x * uy + q.y * ux;
        if ((sp <= 0 && sq > 0) || (sp > 0 && sq <= 0)) {
          const t = sp / (sp - sq);
          put(f, (p.x + t * (q.x - p.x)) * ux + (p.y + t * (q.y - p.y)) * uy, color);
        }
      }
    }
    if (keyframes.has(f)) for (let r = R - 6; r <= R; r++) put(f, r, [255, 60, 60]);
  }
  const file = `/tmp/lmode-${legName}-${angleDeg}.png`;
  fs.writeFileSync(`${file}.raw`, rgb);
  await ffmpeg(['-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', `${total}x${H}`, '-i', `${file}.raw`, file], 1, () => false);
  fs.unlinkSync(`${file}.raw`);
  console.log(`[${legName}] L-mode @${angleDeg}° -> ${file}`);
}

const which = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : 'all';
const lmode = process.argv.find((a) => a.startsWith('--lmode='));
for (const legName of which === 'all' ? Object.keys(LEGS) : [which]) {
  if (!LEGS[legName]) throw new Error(`Unknown leg "${legName}" (use right, left or all)`);
  if (lmode) for (const angle of lmode.slice(8).split(',').map(Number)) await renderLmode(legName, angle);
  else if (process.argv.includes('--validate')) await validate(legName);
  else await annotate(legName);
}
