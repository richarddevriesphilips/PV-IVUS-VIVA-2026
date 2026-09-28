/**
 * Learned polar lumen/vessel segmentation for IVUS frames.
 *
 * The imaging catheter always sits inside the lumen, so both borders enclose
 * the catheter centre and are star-shaped around it: each border is one radius
 * per angle. A small neural network, trained on the expert keyframes, labels
 * every polar sample (angle, radius) as lumen / vessel wall / outside from
 * local intensity + speckle texture and what lies inward/outward along the ray
 * (e.g. bright tissue crossed on the way out from the catheter). A circular
 * dynamic program then picks, per border, the smooth closed radius curve that
 * best separates those labels - optionally pulled toward a prior shape.
 */
import { CATHETER_AREA_RADIUS } from '../intrasight-distant-future/src/utils/borderGeometry.ts';

export const GRID = { angles: 128, radii: 128, dr: 2 }; // sample j is at radius j * dr px (720 space)
const HALO_END = 38; // bright ring-down halo around the catheter ends here
const MAX_RADIUS = 250;
const CROP_HALF = 290;
const NF = 26;

// ---------------------------------------------------------------------------
// Features
// ---------------------------------------------------------------------------

function boxPass(src, dst, w, h, r, horizontal) {
  const inv = 1 / (2 * r + 1);
  const [n, len, step] = horizontal ? [h, w, 1] : [w, h, w];
  for (let line = 0; line < n; line++) {
    const base = horizontal ? line * w : line;
    let acc = 0;
    for (let k = -r; k <= r; k++) acc += src[base + Math.min(len - 1, Math.max(0, k)) * step];
    for (let t = 0; t < len; t++) {
      dst[base + t * step] = acc * inv;
      acc += src[base + Math.min(len - 1, t + r + 1) * step] - src[base + Math.max(0, t - r) * step];
    }
  }
}

/** Two box passes per axis (~Gaussian, sigma ~ sqrt(((2r+1)^2 - 1) / 6)). */
function smooth(src, w, h, r) {
  const a = new Float32Array(w * h);
  const b = new Float32Array(w * h);
  boxPass(src, a, w, h, r, true);
  boxPass(a, b, w, h, r, false);
  boxPass(b, a, w, h, r, true);
  boxPass(a, b, w, h, r, false);
  return b;
}

/**
 * Per-sample feature vectors on the polar grid around `center`
 * (Float32Array, angles x radii x NF, sample-major).
 */
export function polarFeatures(img, size, center) {
  const { angles: NA, radii: NR, dr } = GRID;
  const x0 = Math.round(center.x) - CROP_HALF;
  const y0 = Math.round(center.y) - CROP_HALF;
  const W = 2 * CROP_HALF;
  const I = new Float32Array(W * W);
  const I2 = new Float32Array(W * W);
  for (let y = 0; y < W; y++) {
    const sy = Math.min(size - 1, Math.max(0, y0 + y));
    for (let x = 0; x < W; x++) {
      const v = img[sy * size + Math.min(size - 1, Math.max(0, x0 + x))];
      I[y * W + x] = v;
      I2[y * W + x] = v * v;
    }
  }
  const mA = smooth(I, W, W, 2);
  const mB = smooth(I, W, W, 4);
  const mC = smooth(I, W, W, 8);
  const mD = smooth(I, W, W, 16);
  const mE = smooth(I, W, W, 32);
  const qA = smooth(I2, W, W, 2);
  const qB = smooth(I2, W, W, 4);
  const sA = mA.map((m, i) => Math.sqrt(Math.max(0, qA[i] - m * m)));
  const sB = mB.map((m, i) => Math.sqrt(Math.max(0, qB[i] - m * m)));
  const bases = [I, mA, mB, mC, mD, sA, sB, mE];
  const P = bases.map(() => new Float32Array(NA * NR));
  for (let i = 0; i < NA; i++) {
    const t = (2 * Math.PI * i) / NA;
    const ux = Math.cos(t);
    const uy = Math.sin(t);
    for (let j = 0; j < NR; j++) {
      const x = Math.min(W - 1.001, Math.max(0, center.x - x0 + ux * j * dr));
      const y = Math.min(W - 1.001, Math.max(0, center.y - y0 + uy * j * dr));
      const xi = x | 0;
      const yi = y | 0;
      const fx = x - xi;
      const fy = y - yi;
      const k = yi * W + xi;
      for (let b = 0; b < bases.length; b++) {
        const s = bases[b];
        P[b][i * NR + j] = (s[k] * (1 - fx) + s[k + 1] * fx) * (1 - fy) + (s[k + W] * (1 - fx) + s[k + W + 1] * fx) * fy;
      }
    }
  }
  const [pI, pA, pB, pC, pD, psA, psB, pE] = P;
  const at = (arr, i, j) => arr[i * NR + Math.min(NR - 1, Math.max(0, j))];
  const jHalo = Math.round(HALO_END / dr);
  const out = new Float32Array(NA * NR * NF);
  for (let i = 0; i < NA; i++) {
    let runMax = 0;
    let runMin = 255;
    let runSum = 0;
    let runTex = 0;
    let runDark = 0;
    let runN = 0;
    let lastBright = -1;
    for (let j = 0; j < NR; j++) {
      const b = at(pB, i, j);
      if (j >= jHalo) {
        runMax = Math.max(runMax, b);
        runMin = Math.min(runMin, b);
        runSum += b;
        runTex += at(psA, i, j);
        if (b < 100) runDark++;
        if (b > 175) lastBright = j;
        runN++;
      }
      let aheadMax = 0;
      let aheadMin = 255;
      for (let k = j; k <= j + 20; k += 2) {
        const v = at(pB, i, k);
        if (v > aheadMax) aheadMax = v;
        if (v < aheadMin) aheadMin = v;
      }
      let ang = 0;
      for (let d = -3; d <= 3; d++) ang += at(pC, (i + d + NA) % NA, j);
      let wide = 0;
      for (let d = -10; d <= 10; d += 2) wide += at(pD, (i + d + NA) % NA, j);
      const o = (i * NR + j) * NF;
      out[o] = (j * dr) / 128;
      out[o + 1] = at(pI, i, j) / 255;
      out[o + 2] = at(pA, i, j) / 255;
      out[o + 3] = b / 255;
      out[o + 4] = at(pC, i, j) / 255;
      out[o + 5] = at(pD, i, j) / 255;
      out[o + 6] = at(psA, i, j) / 64;
      out[o + 7] = at(psB, i, j) / 64;
      out[o + 8] = (runN ? runMax : b) / 255;
      out[o + 9] = (runN ? runSum / runN : b) / 255;
      out[o + 10] = (runN ? runMin : b) / 255;
      out[o + 11] = at(pB, i, j + 3) / 255;
      out[o + 12] = at(pB, i, j + 6) / 255;
      out[o + 13] = at(pC, i, j + 12) / 255;
      out[o + 14] = at(pB, i, j - 3) / 255;
      out[o + 15] = at(pB, i, j - 6) / 255;
      out[o + 16] = aheadMax / 255;
      out[o + 17] = aheadMin / 255;
      out[o + 18] = ang / 7 / 255;
      out[o + 19] = at(psB, i, j + 4) / 64;
      out[o + 20] = (at(pA, i, j + 2) - at(pA, i, j - 2)) / 64;
      out[o + 21] = (runN ? runTex / runN : at(psA, i, j)) / 64;
      out[o + 22] = runN ? runDark / runN : 0;
      out[o + 23] = Math.min(1, (lastBright < 0 ? Math.max(0, j - jHalo) : j - lastBright) / 32);
      out[o + 24] = at(pE, i, j) / 255;
      out[o + 25] = wide / 11 / 255;
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// Polar geometry
// ---------------------------------------------------------------------------

/** Outermost radius where the ray at `theta` from `center` crosses the closed curve. */
function rayRadius(curve, center, theta) {
  const ux = Math.cos(theta);
  const uy = Math.sin(theta);
  let best = 0;
  for (let k = 0; k < curve.length; k++) {
    const a = curve[k];
    const b = curve[(k + 1) % curve.length];
    const ax = a.x - center.x;
    const ay = a.y - center.y;
    const ex = b.x - a.x;
    const ey = b.y - a.y;
    const den = ux * ey - uy * ex;
    if (Math.abs(den) < 1e-12) continue;
    const t = (ax * ey - ay * ex) / den;
    const s = (ax * uy - ay * ux) / den;
    if (t > 0 && s >= 0 && s < 1 && t > best) best = t;
  }
  return best;
}

/** Radius per grid angle of a closed (dense) curve around `center`. */
export function curveToRadii(curve, center) {
  return Float64Array.from({ length: GRID.angles }, (_, i) => rayRadius(curve, center, (2 * Math.PI * i) / GRID.angles));
}

export function radiiToPoints(radii, center) {
  return Array.from(radii, (r, i) => {
    const t = (2 * Math.PI * i) / radii.length;
    return { x: center.x + r * Math.cos(t), y: center.y + r * Math.sin(t) };
  });
}

/** Labels (0 lumen, 1 wall, 2 outside, 255 ignore) and weights for one annotated frame. */
export function polarLabels(lumenRadii, vesselRadii) {
  const { angles: NA, radii: NR, dr } = GRID;
  const labels = new Uint8Array(NA * NR);
  const weights = new Float32Array(NA * NR);
  for (let i = 0; i < NA; i++) {
    const rl = Math.max(lumenRadii[i], CATHETER_AREA_RADIUS);
    const rv = Math.max(vesselRadii[i], rl);
    for (let j = 0; j < NR; j++) {
      const r = j * dr;
      const k = i * NR + j;
      if (r < CATHETER_AREA_RADIUS || r > MAX_RADIUS) { labels[k] = 255; continue; }
      labels[k] = r < rl ? 0 : r < rv ? 1 : 2;
      const near = Math.min(Math.abs(r - rl), Math.abs(r - rv));
      weights[k] = near < 3 ? 0.3 : 1;
    }
  }
  return { labels, weights };
}

// ---------------------------------------------------------------------------
// Classifier: small MLP (NF -> 32 -> 16 -> 3), tanh, softmax, Adam
// ---------------------------------------------------------------------------

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const LAYERS = [NF, 40, 20, 3];

/**
 * Train on [{ features, labels, weights }] (one entry per annotated frame).
 * Returns a model usable by `classify`.
 */
export function trainClassifier(frames, { epochs = 8, lr = 3e-3, batch = 256, seed = 7 } = {}) {
  const rand = rng(seed);
  const idx = [];
  for (let f = 0; f < frames.length; f++) {
    const { labels } = frames[f];
    for (let k = 0; k < labels.length; k++) if (labels[k] !== 255) idx.push(f, k);
  }
  const n = idx.length / 2;
  // feature standardisation
  const mean = new Float64Array(NF);
  const sq = new Float64Array(NF);
  for (let s = 0; s < n; s++) {
    const x = frames[idx[2 * s]].features;
    const o = idx[2 * s + 1] * NF;
    for (let d = 0; d < NF; d++) { mean[d] += x[o + d]; sq[d] += x[o + d] * x[o + d]; }
  }
  const std = new Float64Array(NF);
  for (let d = 0; d < NF; d++) {
    mean[d] /= n;
    std[d] = Math.sqrt(Math.max(1e-8, sq[d] / n - mean[d] * mean[d]));
  }
  const W = [];
  const B = [];
  for (let l = 0; l + 1 < LAYERS.length; l++) {
    const [fin, fout] = [LAYERS[l], LAYERS[l + 1]];
    const scale = Math.sqrt(2 / (fin + fout));
    W.push(Float64Array.from({ length: fin * fout }, () => (rand() * 2 - 1) * scale * Math.sqrt(3)));
    B.push(new Float64Array(fout));
  }
  const params = [...W, ...B];
  const m1 = params.map((p) => new Float64Array(p.length));
  const m2 = params.map((p) => new Float64Array(p.length));
  const grads = params.map((p) => new Float64Array(p.length));
  const acts = LAYERS.map((d) => new Float64Array(d));
  const deltas = LAYERS.map((d) => new Float64Array(d));
  let step = 0;
  const order = Uint32Array.from({ length: n }, (_, i) => i);
  for (let epoch = 0; epoch < epochs; epoch++) {
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    let loss = 0;
    for (let startIdx = 0; startIdx < n; startIdx += batch) {
      grads.forEach((g) => g.fill(0));
      let wsum = 0;
      const end = Math.min(n, startIdx + batch);
      for (let q = startIdx; q < end; q++) {
        const s = order[q];
        const fr = frames[idx[2 * s]];
        const k = idx[2 * s + 1];
        const o = k * NF;
        for (let d = 0; d < NF; d++) acts[0][d] = (fr.features[o + d] - mean[d]) / std[d];
        forward(W, B, acts);
        const out = acts[LAYERS.length - 1];
        const y = fr.labels[k];
        const w = fr.weights[k];
        wsum += w;
        loss -= w * Math.log(Math.max(1e-9, out[y]));
        const L = LAYERS.length - 1;
        for (let c = 0; c < 3; c++) deltas[L][c] = w * (out[c] - (c === y ? 1 : 0));
        for (let l = L - 1; l >= 0; l--) {
          const [fin, fout] = [LAYERS[l], LAYERS[l + 1]];
          const Wl = W[l];
          const gW = grads[l];
          const gB = grads[W.length + l];
          const a = acts[l];
          const dNext = deltas[l + 1];
          for (let o2 = 0; o2 < fout; o2++) {
            gB[o2] += dNext[o2];
            const row = o2 * fin;
            for (let i2 = 0; i2 < fin; i2++) gW[row + i2] += dNext[o2] * a[i2];
          }
          if (l > 0) {
            const d = deltas[l];
            for (let i2 = 0; i2 < fin; i2++) {
              let s2 = 0;
              for (let o2 = 0; o2 < fout; o2++) s2 += Wl[o2 * fin + i2] * dNext[o2];
              d[i2] = s2 * (1 - a[i2] * a[i2]); // tanh'
            }
          }
        }
      }
      step++;
      const b1 = 0.9;
      const b2 = 0.999;
      const c1 = 1 - b1 ** step;
      const c2 = 1 - b2 ** step;
      for (let p = 0; p < params.length; p++) {
        const P = params[p];
        const G = grads[p];
        const M1 = m1[p];
        const M2 = m2[p];
        for (let e = 0; e < P.length; e++) {
          const g = G[e] / wsum;
          M1[e] = b1 * M1[e] + (1 - b1) * g;
          M2[e] = b2 * M2[e] + (1 - b2) * g * g;
          P[e] -= (lr * (M1[e] / c1)) / (Math.sqrt(M2[e] / c2) + 1e-8);
        }
      }
    }
    if (process.env.IVUS_DEBUG) console.log(`  epoch ${epoch + 1}: loss ${(loss / n).toFixed(4)}`);
  }
  return { W, B, mean, std };
}

function forward(W, B, acts) {
  for (let l = 0; l < W.length; l++) {
    const [fin, fout] = [LAYERS[l], LAYERS[l + 1]];
    const a = acts[l];
    const z = acts[l + 1];
    const Wl = W[l];
    const Bl = B[l];
    for (let o = 0; o < fout; o++) {
      let s = Bl[o];
      const row = o * fin;
      for (let i = 0; i < fin; i++) s += Wl[row + i] * a[i];
      z[o] = s;
    }
    if (l + 1 < W.length) for (let o = 0; o < fout; o++) z[o] = Math.tanh(z[o]);
    else {
      let mx = -Infinity;
      for (let o = 0; o < fout; o++) mx = Math.max(mx, z[o]);
      let sum = 0;
      for (let o = 0; o < fout; o++) { z[o] = Math.exp(z[o] - mx); sum += z[o]; }
      for (let o = 0; o < fout; o++) z[o] /= sum;
    }
  }
}

/** Class probabilities per polar sample: Float32Array(angles x radii x 3). */
export function classify(model, features) {
  const n = features.length / NF;
  const out = new Float32Array(n * 3);
  const acts = LAYERS.map((d) => new Float64Array(d));
  for (let k = 0; k < n; k++) {
    for (let d = 0; d < NF; d++) acts[0][d] = (features[k * NF + d] - model.mean[d]) / model.std[d];
    forward(model.W, model.B, acts);
    const p = acts[LAYERS.length - 1];
    out[3 * k] = p[0];
    out[3 * k + 1] = p[1];
    out[3 * k + 2] = p[2];
  }
  return out;
}

// ---------------------------------------------------------------------------
// Border costs + circular dynamic programming
// ---------------------------------------------------------------------------

/**
 * Cost of placing each border at radius sample j, per angle
 * ({ lumen, vessel }: Float32Array angles x radii): the negative log-likelihood
 * of "inside" labels before j and "outside" labels from j on.
 */
export function borderCosts(probs) {
  const { angles: NA, radii: NR, dr } = GRID;
  const j0 = Math.ceil(CATHETER_AREA_RADIUS / dr);
  const j1 = Math.floor(MAX_RADIUS / dr);
  const lumen = new Float32Array(NA * NR).fill(Infinity);
  const vessel = new Float32Array(NA * NR).fill(Infinity);
  const eps = 1e-4;
  for (let i = 0; i < NA; i++) {
    for (const [cost, insideOf] of [
      [lumen, (k) => probs[3 * k]],
      [vessel, (k) => probs[3 * k] + probs[3 * k + 1]],
    ]) {
      let before = 0;
      let after = 0;
      for (let j = j0; j <= j1; j++) after -= Math.log(Math.max(eps, 1 - insideOf(i * NR + j)));
      let best = Infinity;
      for (let j = j0; j <= j1; j++) {
        cost[i * NR + j] = before + after;
        best = Math.min(best, before + after);
        const p = insideOf(i * NR + j);
        before -= Math.log(Math.max(eps, p));
        after += Math.log(Math.max(eps, 1 - p));
      }
      for (let j = j0; j <= j1; j++) cost[i * NR + j] -= best;
    }
  }
  return { lumen, vessel };
}

/**
 * Smooth closed radius curve minimising sum(cost) + lambda * sum(|dj|) over
 * angles, with |dj| <= maxStep and minJ[i] <= j <= maxJ[i]. Returns
 * radius-sample indices per angle.
 */
export function circularDP(cost, { lambda, maxStep, minJ, maxJ }) {
  const { angles: NA, radii: NR } = GRID;
  const laps = 3;
  const L = NA * laps;
  let prev = new Float64Array(NR);
  let cur = new Float64Array(NR);
  const back = new Int16Array(L * NR);
  const allowed = (i, j) => j >= minJ[i] && (!maxJ || j <= Math.max(minJ[i], maxJ[i]));
  for (let j = 0; j < NR; j++) prev[j] = allowed(0, j) ? cost[j] : Infinity;
  for (let s = 1; s < L; s++) {
    const i = s % NA;
    for (let j = 0; j < NR; j++) {
      const c = allowed(i, j) ? cost[i * NR + j] : Infinity;
      if (c === Infinity) { cur[j] = Infinity; back[s * NR + j] = j; continue; }
      let best = Infinity;
      let arg = j;
      const lo = Math.max(0, j - maxStep);
      const hi = Math.min(NR - 1, j + maxStep);
      for (let q = lo; q <= hi; q++) {
        const v = prev[q] + lambda * Math.abs(q - j);
        if (v < best) { best = v; arg = q; }
      }
      cur[j] = best + c;
      back[s * NR + j] = arg;
    }
    [prev, cur] = [cur, prev];
  }
  let j = 0;
  for (let q = 1; q < NR; q++) if (prev[q] < prev[j]) j = q;
  const path = new Int32Array(L);
  for (let s = L - 1; s >= 0; s--) {
    path[s] = j;
    j = back[s * NR + j];
  }
  return path.slice(NA, 2 * NA);
}

/** Circular Gaussian smoothing of a radius curve (sigma in angle samples). */
export function smoothRadii(radii, sigma) {
  const n = radii.length;
  const R = Math.ceil(3 * sigma);
  return Float64Array.from(radii, (_, i) => {
    let s = 0;
    let w = 0;
    for (let d = -R; d <= R; d++) {
      const g = Math.exp(-(d * d) / (2 * sigma * sigma));
      s += g * radii[(i + d + n) % n];
      w += g;
    }
    return s / w;
  });
}

/** Dice overlap of two star-shaped borders given as radii at the same angles. */
export function polarDice(a, b) {
  let inter = 0;
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    inter += Math.min(a[i], b[i]) ** 2;
    sum += a[i] ** 2 + b[i] ** 2;
  }
  return sum > 0 ? (2 * inter) / sum : 1;
}
