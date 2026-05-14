import { useEffect, useRef } from "react";

const BG_IMG = new URL(
  "../../assets/d5945b9699f457d7abe87be3f091febee6b0befc.png",
  import.meta.url
).href;

// Native design resolution
const NW = 1920;
const NH = 1080;

// Waveform regions in native coordinates
const ECG_REGION = { x: 120, y: 130, w: 1440, h: 400 };
const AO_REGION  = { x: 120, y: 655, w: 1440, h: 120 };
const SPO2_REGION = { x: 120, y: 845, w: 1440, h: 50 };

const SWEEP_GAP = 40; // width of the black eraser bar in native px
const SPEED = 1.8;    // native pixels per frame

// Areas to paint over on the background image
const DEMO_MODE_RECT = { x: 640, y: 550, w: 390, h: 85 };

// Cover the entire bottom vitals strip so we redraw it dynamically
const VITALS_STRIP_RECT = { x: 0, y: 1000, w: 1920, h: 80 };

// ECG lead config: 6 leads stacked within ECG_REGION
const ECG_LEADS = [
  { label: "I",   amp: 0.6,  invert: false, color: "#cccccc" },
  { label: "II",  amp: 1.0,  invert: false, color: "#00cc00" },
  { label: "III", amp: 0.45, invert: false, color: "#cccccc" },
  { label: "aVR", amp: 0.55, invert: true,  color: "#cccccc" },
  { label: "aVL", amp: 0.4,  invert: false, color: "#cccccc" },
  { label: "V1",  amp: 0.5,  invert: false, color: "#cccccc" },
];

// --- Waveform generators ---

function ecgCycle(len: number): number[] {
  const d: number[] = [];
  for (let i = 0; i < len; i++) {
    const t = i / len;
    let v = 0;
    // P wave
    if (t > 0.04 && t < 0.12) v = 0.08 * Math.sin(((t - 0.04) / 0.08) * Math.PI);
    // QRS complex
    else if (t > 0.16 && t < 0.22) {
      const q = (t - 0.16) / 0.06;
      if (q < 0.2) v = -0.1;
      else if (q < 0.45) v = 0.9;
      else if (q < 0.65) v = -0.18;
      else v = 0;
    }
    // T wave
    else if (t > 0.28 && t < 0.42)
      v = 0.2 * Math.sin(((t - 0.28) / 0.14) * Math.PI);
    d.push(v);
  }
  return d;
}

function aoCycle(len: number): number[] {
  const d: number[] = [];
  for (let i = 0; i < len; i++) {
    const t = i / len;
    let v: number;
    if (t < 0.06) v = 82 + (t / 0.06) * 42;
    else if (t < 0.14) {
      const s = (t - 0.06) / 0.08;
      v = 124 - s * 14;
      if (s > 0.45 && s < 0.7) v += 6 * Math.sin(((s - 0.45) / 0.25) * Math.PI);
    } else if (t < 0.4) v = 110 - ((t - 0.14) / 0.26) * 28;
    else v = 82;
    d.push(v);
  }
  return d;
}

function spo2Cycle(len: number): number[] {
  const d: number[] = [];
  for (let i = 0; i < len; i++) {
    const t = i / len;
    let v = 0;
    if (t < 0.15) v = Math.sin((t / 0.15) * Math.PI) * 0.7;
    else if (t < 0.35) v = Math.sin(((t - 0.15) / 0.2) * Math.PI) * 0.3;
    d.push(v);
  }
  return d;
}

// Build repeating waveform buffers (large enough to never run out)
function buildBuffer(cycleFn: (len: number) => number[], cycleLen: number, totalLen: number, amp = 1, invert = false): number[] {
  const buf: number[] = [];
  while (buf.length < totalLen) {
    const cycle = cycleFn(cycleLen);
    for (const v of cycle) buf.push((invert ? -v : v) * amp);
  }
  return buf;
}

const BUF_LEN = 20000;
const ecgBuffers = ECG_LEADS.map((l) => buildBuffer(ecgCycle, 160, BUF_LEN, l.amp, l.invert));
const aoBuffer = buildBuffer(aoCycle, 130, BUF_LEN);
const spo2Buffer = buildBuffer(spo2Cycle, 140, BUF_LEN);

function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)); }
function drift(v: number, lo: number, hi: number, mag: number) {
  return clamp(v + (Math.random() - 0.5) * mag, lo, hi);
}

export default function HemoDisplay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);
  const sweepRef = useRef(0);
  const offsetRef = useRef(0);
  const vitalsRef = useRef({
    hr: 80, sys: 132, dia: 74, mean: 93, spo2: 100, pulse: 88, etco2: 30,
  });

  // Realistic vitals update timer
  useEffect(() => {
    const iv = setInterval(() => {
      const v = vitalsRef.current;
      v.hr    = Math.round(drift(v.hr, 72, 88, 3));
      v.sys   = Math.round(drift(v.sys, 118, 142, 4));
      v.dia   = Math.round(drift(v.dia, 68, 82, 3));
      v.mean  = Math.round((v.sys + 2 * v.dia) / 3);
      v.spo2  = Math.round(drift(v.spo2, 97, 100, 1));
      v.pulse = Math.round(drift(v.pulse, 74, 92, 3));
      v.etco2 = Math.round(drift(v.etco2, 26, 35, 2));
    }, 1500);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas to native resolution
    canvas.width = NW;
    canvas.height = NH;

    // Pre-fill all waveform regions and overlay areas with black
    ctx.fillStyle = "#000";
    ctx.fillRect(ECG_REGION.x, ECG_REGION.y, ECG_REGION.w, ECG_REGION.h);
    ctx.fillRect(AO_REGION.x, AO_REGION.y, AO_REGION.w, AO_REGION.h);
    ctx.fillRect(SPO2_REGION.x, SPO2_REGION.y, SPO2_REGION.w, SPO2_REGION.h);
    ctx.fillRect(DEMO_MODE_RECT.x, DEMO_MODE_RECT.y, DEMO_MODE_RECT.w, DEMO_MODE_RECT.h);
    ctx.fillRect(VITALS_STRIP_RECT.x, VITALS_STRIP_RECT.y, VITALS_STRIP_RECT.w, VITALS_STRIP_RECT.h);

    const draw = () => {
      const sweep = sweepRef.current;
      const off = Math.floor(offsetRef.current);
      const gapStart = sweep;
      const gapEnd = sweep + SWEEP_GAP;

      // --- Draw the sweep gap (black eraser) for each region ---
      ctx.fillStyle = "#000";
      for (const r of [ECG_REGION, AO_REGION, SPO2_REGION]) {
        // Clear a slightly wider area ahead of the sweep
        const clearStart = r.x + gapStart;
        const clearW = SWEEP_GAP + SPEED + 2;
        ctx.fillRect(clearStart, r.y, clearW, r.h);
        // Handle wrap-around
        if (gapEnd > r.w) {
          ctx.fillRect(r.x, r.y, (gapEnd - r.w) + SPEED + 2, r.h);
        }
      }

      // --- Draw fresh column(s) of waveform just behind the sweep ---
      const cols = Math.ceil(SPEED) + 1;

      // ECG leads
      const leadH = ECG_REGION.h / ECG_LEADS.length;
      for (let li = 0; li < ECG_LEADS.length; li++) {
        const buf = ecgBuffers[li];
        const yCenter = ECG_REGION.y + leadH * li + leadH / 2;
        ctx.strokeStyle = ECG_LEADS[li].color;
        ctx.lineWidth = 1.5;
        ctx.lineJoin = "round";
        ctx.beginPath();
        let started = false;
        let prevWx = -1;
        for (let c = -1; c <= cols; c++) {
          const sx = sweep + c;
          const wx = ((sx % ECG_REGION.w) + ECG_REGION.w) % ECG_REGION.w;
          const bufIdx = (off + Math.floor(sx)) % buf.length;
          const val = buf[bufIdx < 0 ? buf.length + bufIdx : bufIdx] || 0;
          const py = yCenter - val * (leadH * 0.4);
          const px = ECG_REGION.x + wx;
          // Detect wrap-around: if wx jumps backward significantly, start new path
          if (prevWx !== -1 && Math.abs(wx - prevWx) > ECG_REGION.w / 2) {
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(px, py);
          } else if (!started) {
            ctx.moveTo(px, py);
            started = true;
          } else {
            ctx.lineTo(px, py);
          }
          prevWx = wx;
        }
        ctx.stroke();
      }

      // AO pressure wave
      {
        ctx.strokeStyle = "#ff2222";
        ctx.lineWidth = 2;
        ctx.beginPath();
        let started = false;
        let prevWx = -1;
        for (let c = -1; c <= cols; c++) {
          const sx = sweep + c;
          const wx = ((sx % AO_REGION.w) + AO_REGION.w) % AO_REGION.w;
          const bufIdx = (off + Math.floor(sx)) % aoBuffer.length;
          const val = aoBuffer[bufIdx < 0 ? aoBuffer.length + bufIdx : bufIdx] || 82;
          // Map 0-200 to region bottom-top
          const frac = val / 200;
          const py = AO_REGION.y + AO_REGION.h - frac * AO_REGION.h;
          const px = AO_REGION.x + wx;
          // Detect wrap-around: if wx jumps backward significantly, start new path
          if (prevWx !== -1 && Math.abs(wx - prevWx) > AO_REGION.w / 2) {
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(px, py);
          } else if (!started) {
            ctx.moveTo(px, py);
            started = true;
          } else {
            ctx.lineTo(px, py);
          }
          prevWx = wx;
        }
        ctx.stroke();
      }

      // SpO2 pleth wave
      {
        ctx.strokeStyle = "#3cd7f9";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        let started = false;
        let prevWx = -1;
        for (let c = -1; c <= cols; c++) {
          const sx = sweep + c;
          const wx = ((sx % SPO2_REGION.w) + SPO2_REGION.w) % SPO2_REGION.w;
          const bufIdx = (off + Math.floor(sx)) % spo2Buffer.length;
          const val = spo2Buffer[bufIdx < 0 ? spo2Buffer.length + bufIdx : bufIdx] || 0;
          const py = SPO2_REGION.y + SPO2_REGION.h / 2 - val * (SPO2_REGION.h * 0.45);
          const px = SPO2_REGION.x + wx;
          // Detect wrap-around: if wx jumps backward significantly, start new path
          if (prevWx !== -1 && Math.abs(wx - prevWx) > SPO2_REGION.w / 2) {
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(px, py);
          } else if (!started) {
            ctx.moveTo(px, py);
            started = true;
          } else {
            ctx.lineTo(px, py);
          }
          prevWx = wx;
        }
        ctx.stroke();
      }

      // --- Paint over DEMO MODE every frame ---
      ctx.fillStyle = "#000";
      ctx.fillRect(DEMO_MODE_RECT.x, DEMO_MODE_RECT.y, DEMO_MODE_RECT.w, DEMO_MODE_RECT.h);

      // --- Paint over and redraw bottom vitals strip ---
      ctx.fillStyle = "#000";
      ctx.fillRect(VITALS_STRIP_RECT.x, VITALS_STRIP_RECT.y, VITALS_STRIP_RECT.w, VITALS_STRIP_RECT.h);
      // Separator line at top of vitals strip
      ctx.fillStyle = "#333";
      ctx.fillRect(0, 1000, 1920, 1);

      const v = vitalsRef.current;
      const baseY = 1010; // top of label text
      const numY = 1022;  // top of large numbers

      // HR
      ctx.fillStyle = "#00cc00";
      ctx.font = "bold 20px sans-serif";
      ctx.textBaseline = "top";
      ctx.fillText("HR", 10, baseY);
      ctx.font = "14px sans-serif";
      ctx.fillText("II", 10, baseY + 48);
      ctx.font = "bold 56px sans-serif";
      ctx.fillText(String(v.hr), 50, numY);

      // NBP
      ctx.fillStyle = "#ff3333";
      ctx.font = "bold 20px sans-serif";
      ctx.fillText("NBP", 145, baseY);
      ctx.font = "bold 28px sans-serif";
      ctx.fillText(`${v.sys}/${v.dia} (${v.mean})`, 145, numY + 12);
      // Red bar indicator
      ctx.fillRect(295, numY + 22, 40, 5);

      // SpO2
      ctx.fillStyle = "#3cd7f9";
      ctx.font = "bold 20px sans-serif";
      ctx.fillText("SpO\u2082", 360, baseY);
      ctx.font = "bold 56px sans-serif";
      ctx.fillText(String(v.spo2), 430, numY);

      // Pulse
      ctx.fillStyle = "#3cd7f9";
      ctx.font = "bold 18px sans-serif";
      ctx.fillText("Pulse", 530, baseY);
      ctx.font = "bold 48px sans-serif";
      ctx.fillText(String(v.pulse), 600, numY);

      // RR
      ctx.fillStyle = "#d5cfc4";
      ctx.font = "bold 20px sans-serif";
      ctx.fillText("RR", 700, baseY);

      // etCO2
      ctx.fillStyle = "#cccc00";
      ctx.font = "bold 20px sans-serif";
      ctx.fillText("etCO\u2082", 780, baseY);
      ctx.font = "bold 60px sans-serif";
      ctx.fillText(String(v.etco2), 860, numY - 4);

      // Temp
      ctx.fillStyle = "#d5cfc4";
      ctx.font = "bold 20px sans-serif";
      ctx.fillText("Temp", 980, baseY);

      // Advance sweep
      sweepRef.current += SPEED;
      offsetRef.current += SPEED;
      if (sweepRef.current >= ECG_REGION.w) {
        sweepRef.current -= ECG_REGION.w;
      }
      if (offsetRef.current > BUF_LEN - 5000) {
        offsetRef.current = offsetRef.current % 3000;
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      {/* Background image with all static chrome */}
      <img
        src={BG_IMG}
        alt=""
        className="absolute inset-0 w-full h-full object-fill pointer-events-none"
        draggable={false}
      />
      {/* Canvas overlay for animated waveforms */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ imageRendering: "auto" }}
      />
    </div>
  );
}
