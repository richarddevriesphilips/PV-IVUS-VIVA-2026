import { useEffect, useRef, useState } from "react";

// --- Waveform data generators ---

function generateEcgCycle(length: number): number[] {
  const data: number[] = [];
  for (let i = 0; i < length; i++) {
    const t = i / length;
    let v = 0;
    if (t > 0.05 && t < 0.15) v = 0.1 * Math.sin(((t - 0.05) / 0.1) * Math.PI);
    else if (t > 0.18 && t < 0.22) {
      const qt = (t - 0.18) / 0.04;
      if (qt < 0.25) v = -0.12;
      else if (qt < 0.5) v = 0.85;
      else if (qt < 0.75) v = -0.2;
      else v = 0;
    } else if (t > 0.28 && t < 0.42) {
      v = 0.18 * Math.sin(((t - 0.28) / 0.14) * Math.PI);
    }
    data.push(v);
  }
  return data;
}

function generateEcgLeadVariant(length: number, amp: number, invert: boolean): number[] {
  const base = generateEcgCycle(length);
  return base.map((v) => (invert ? -v : v) * amp);
}

function generateAbpCycle(length: number): number[] {
  const data: number[] = [];
  for (let i = 0; i < length; i++) {
    const t = i / length;
    let v: number;
    if (t < 0.05) v = 84 + (t / 0.05) * 40;
    else if (t < 0.12) {
      const st = (t - 0.05) / 0.07;
      v = 124 - st * 12;
      if (st > 0.5 && st < 0.75) v += 5 * Math.sin(((st - 0.5) / 0.25) * Math.PI);
    } else if (t < 0.35) {
      v = 112 - ((t - 0.12) / 0.23) * 28;
    } else {
      v = 84;
    }
    data.push(v);
  }
  return data;
}

// --- Canvas waveform renderer ---

interface WaveformCanvasProps {
  color: string;
  lineWidth?: number;
  speed?: number;
  getData: () => number[];
  yMin: number;
  yMax: number;
}

function WaveformCanvas({ color, lineWidth = 1.5, speed = 2, getData, yMin, yMax }: WaveformCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bufferRef = useRef<number[]>([]);
  const offsetRef = useRef(0);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.clientWidth * 2;
      canvas.height = canvas.clientHeight * 2;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      while (bufferRef.current.length < w + 400) {
        bufferRef.current.push(...getData());
      }

      const data = bufferRef.current;
      const off = Math.floor(offsetRef.current);

      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth * 2;
      ctx.lineJoin = "round";
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const val = data[off + x] ?? 0;
        const y = h - ((val - yMin) / (yMax - yMin)) * h;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      offsetRef.current += speed;
      if (off > 2000) {
        bufferRef.current = bufferRef.current.slice(off);
        offsetRef.current -= off;
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, [color, lineWidth, speed, getData, yMin, yMax]);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}

// --- ECG lead row ---

function EcgLeadRow({ label, isGreen, getData }: { label: string; isGreen?: boolean; getData: () => number[] }) {
  return (
    <div className="flex items-stretch flex-1 min-h-0 border-b border-[#1a1a1a]">
      <div className="w-[36px] shrink-0 flex items-center justify-end pr-1">
        {isGreen && <span className="w-[5px] h-[5px] rounded-full bg-[#00cc00] mr-1 shrink-0" />}
        <span className={`text-[11px] font-bold ${isGreen ? "text-[#00cc00]" : "text-[#ccc]"}`}>{label}</span>
      </div>
      <div className="flex-1 relative min-w-0">
        <WaveformCanvas color={isGreen ? "#00cc00" : "#cccccc"} lineWidth={1} speed={2} getData={getData} yMin={-0.6} yMax={1.0} />
        <span className="absolute left-1 bottom-0 text-[8px] text-[#666]">1 mV</span>
      </div>
    </div>
  );
}

// --- Main HemoDisplay ---

export default function HemoDisplay() {
  const [hr, setHr] = useState(80);
  const [aoSys, setAoSys] = useState(124);
  const [aoDia, setAoDia] = useState(84);
  const [aoMean, setAoMean] = useState(99);
  const [spo2, setSpo2] = useState(100);
  const [rrVal, setRrVal] = useState(15);
  const [elapsed, setElapsed] = useState(14 * 60 + 54);

  useEffect(() => {
    const iv = setInterval(() => {
      setHr((v) => Math.min(85, Math.max(75, v + Math.round((Math.random() - 0.5) * 2))));
      setAoSys((v) => Math.min(130, Math.max(118, v + Math.round((Math.random() - 0.5) * 3))));
      setAoDia((v) => Math.min(90, Math.max(78, v + Math.round((Math.random() - 0.5) * 2))));
      setAoMean((v) => Math.min(105, Math.max(93, v + Math.round((Math.random() - 0.5) * 2))));
      setSpo2((v) => Math.min(100, Math.max(98, v + Math.round((Math.random() - 0.5) * 1))));
      setRrVal((v) => Math.min(18, Math.max(13, v + Math.round((Math.random() - 0.5) * 2))));
      setElapsed((v) => v + 2);
    }, 2000);
    return () => clearInterval(iv);
  }, []);

  const fmtTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const ecgII = useRef(() => generateEcgCycle(180)).current;
  const ecgI = useRef(() => generateEcgLeadVariant(180, 0.7, false)).current;
  const ecgIII = useRef(() => generateEcgLeadVariant(180, 0.5, false)).current;
  const ecgAVR = useRef(() => generateEcgLeadVariant(180, 0.6, true)).current;
  const ecgV1 = useRef(() => generateEcgLeadVariant(180, 0.55, false)).current;
  const abpData = useRef(() => generateAbpCycle(140)).current;

  return (
    <div className="w-full h-full bg-black flex flex-col overflow-hidden" style={{ fontFamily: "sans-serif" }}>
      {/* Patient info bar */}
      <div className="flex items-center h-[24px] bg-[#1a1a2a] border-b border-[#333] px-3 shrink-0">
        <div className="flex items-center gap-4 flex-1">
          <span className="text-[#aaa] text-[10px]">🖥 .</span>
          <span className="text-[#888] text-[10px]">PID</span>
          <span className="text-[#888] text-[10px]"><b className="text-[#ccc]">DOB</b> Unknown</span>
          <span className="text-[#888] text-[10px]">Weight</span>
        </div>
      </div>

      {/* Main area */}
      <div className="flex flex-1 min-h-0">
        {/* Left: waveforms */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* AO pressure label */}
          <div className="flex items-center px-3 py-1 shrink-0 h-[32px]">
            <span className="text-[#ffcc00] text-[14px] font-bold">
              <sup className="text-[9px]">1</sup> AO {aoSys}/{aoDia} <span className="text-[#999]">({aoMean})</span>
            </span>
          </div>

          {/* ECG leads */}
          <div className="flex flex-col flex-[1.1] min-h-0">
            <EcgLeadRow label="I" getData={ecgI} />
            <EcgLeadRow label="II" isGreen getData={ecgII} />
            <EcgLeadRow label="III" getData={ecgIII} />
            <EcgLeadRow label="aVR" getData={ecgAVR} />
            <EcgLeadRow label="V1" getData={ecgV1} />
          </div>

          {/* Pressure waveform area */}
          <div className="flex flex-1 min-h-0">
            {/* Y-axis labels */}
            <div className="w-[28px] shrink-0 flex flex-col justify-between py-1 items-end pr-1">
              <span className="text-[10px] text-[#888]">200</span>
              <span className="text-[10px] text-[#888]">100</span>
              <span className="text-[10px] text-[#888]">0</span>
            </div>
            {/* Waveform */}
            <div className="flex-1 relative min-w-0 border-l border-[#222]">
              {/* Dashed grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between py-0 pointer-events-none">
                <div className="border-b border-dashed border-[#333]" />
                <div className="border-b border-dashed border-[#333]" />
                <div className="border-b border-dashed border-[#333]" />
                <div className="border-b border-dashed border-[#333]" />
                <div />
              </div>
              <WaveformCanvas color="#ff2222" lineWidth={1.5} speed={2} getData={abpData} yMin={0} yMax={200} />
              {/* X-axis ticks */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between px-1">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                  <span key={n} className="text-[8px] text-[#666]">{n === 0 ? "0s" : String(n)}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right info panel */}
        <div className="w-[155px] bg-[#0d0d0d] border-l border-[#444] flex flex-col shrink-0">
          <div className="bg-[#1a1a1a] px-2 py-1 border-b border-[#444]">
            <span className="text-[#ccc] text-[11px] font-bold">AIR REST</span>
          </div>
          <div className="px-2 py-2 flex flex-col gap-1 text-[10px]">
            <div className="flex justify-between">
              <span className="text-[#888]">14:43:37</span>
              <span className="text-[#ffcc00]">AO</span>
              <span className="text-[#ccc]">124/84 (99)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#888]" />
              <span className="text-[#ffcc00]">LV</span>
              <span className="text-[#ccc]">156/5/15</span>
            </div>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center h-[22px] bg-[#111] border-t border-[#333] px-3 gap-4 shrink-0">
        <div className="flex items-center gap-1">
          <span className="w-[6px] h-[6px] rounded-full bg-red-600 animate-pulse" />
          <span className="text-[9px] text-[#ccc] tabular-nums">{fmtTime(elapsed)}</span>
        </div>
        <span className="text-[9px] text-[#888]">Vitals Interval: 1:06 (2 min) ▾</span>
        <span className="text-[9px] text-[#ccc] border border-[#555] px-2 py-px rounded-sm">STAT</span>
        <span className="text-[9px] text-[#888] ml-auto">Sweep Speed: 25 mm/s ▾</span>
      </div>

      {/* Bottom vitals strip */}
      <div className="flex items-end h-[40px] bg-black border-t border-[#333] px-2 gap-3 shrink-0">
        {/* HR */}
        <div className="flex items-baseline gap-1">
          <span className="text-[10px] text-[#00cc00] font-bold leading-none">HR<br /><span className="text-[8px]">II</span></span>
          <span className="text-[28px] text-[#00cc00] font-bold leading-none tabular-nums">{hr}</span>
        </div>
        {/* NBP */}
        <div className="flex items-baseline gap-1">
          <div className="flex flex-col">
            <span className="text-[9px] text-[#ff3333] font-bold">NBP</span>
            <span className="text-[11px] text-[#ff3333] tabular-nums">135/89 (105)</span>
          </div>
          <div className="w-[40px] h-[4px] bg-[#ff3333] rounded-full self-center" />
        </div>
        {/* SpO2 */}
        <div className="flex items-baseline gap-1">
          <div className="flex flex-col">
            <span className="text-[9px] text-[#00ccff] font-bold">SpO₂</span>
            <span className="text-[8px] text-[#00ccff]">Pulse<br />88</span>
          </div>
          <span className="text-[28px] text-[#00ccff] font-bold leading-none tabular-nums">{spo2}</span>
        </div>
        {/* RR */}
        <div className="flex items-baseline gap-1">
          <span className="text-[9px] text-[#cccc00] font-bold">RR</span>
          <span className="text-[28px] text-[#cccc00] font-bold leading-none tabular-nums">{rrVal}</span>
        </div>
        {/* Tskin */}
        <div className="flex items-baseline gap-1">
          <span className="text-[9px] text-[#00ccff] font-bold">Tskin<br />°C</span>
          <span className="text-[28px] text-[#00ccff] font-bold leading-none tabular-nums">36.8</span>
        </div>
        {/* etCO2 */}
        <div className="flex items-baseline gap-1">
          <span className="text-[9px] text-[#cccc00] font-bold">etCO₂</span>
          <span className="text-[28px] text-[#cccc00] font-bold leading-none tabular-nums">30</span>
        </div>
      </div>
    </div>
  );
}
