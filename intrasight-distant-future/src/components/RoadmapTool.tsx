import React, { useMemo, useRef, useState } from 'react';
import {
  APP_CONSTANTS,
  INDICATOR_OFFSETS_LEFT,
  INDICATOR_OFFSETS_RIGHT,
  RULER_PATH_DATA_LEFT,
  RULER_PATH_DATA_RIGHT,
  type Leg,
  type RulerPathPoint,
} from './constants/appConstants';

// Kept local (rather than imported from App.tsx) to avoid a circular import -
// this only needs the X-ray/fluoro source, not the full per-leg asset map.
const LEG_XRAY_SOURCES: Record<Leg, string> = {
  right: '/intrasight-distant-future/assets/videos/fluoro-right-leg.mov',
  left: '/intrasight-distant-future/assets/videos/fluoro-left-leg.mp4',
};

const VIDEO_WIDTH = 718;
const VIDEO_HEIGHT = 796;
const DURATION = APP_CONSTANTS.DURATION;
const NUM_POINTS = RULER_PATH_DATA_RIGHT.length; // 16 fixed checkpoints, evenly spaced by progress

function formatVideoTime(time: number): string {
  const totalSeconds = Math.max(0, Math.floor(time));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

function interpolatePath(points: RulerPathPoint[], progress: number): { x: number; y: number } {
  const clampedProgress = Math.max(0, Math.min(progress, 1));
  if (clampedProgress <= points[0].progress) return points[0];
  if (clampedProgress >= points[points.length - 1].progress) return points[points.length - 1];

  for (let index = 0; index < points.length - 1; index++) {
    const lower = points[index];
    const upper = points[index + 1];
    if (clampedProgress <= upper.progress) {
      const span = upper.progress - lower.progress;
      const t = span === 0 ? 0 : (clampedProgress - lower.progress) / span;
      return {
        x: lower.x + (upper.x - lower.x) * t,
        y: lower.y + (upper.y - lower.y) * t,
      };
    }
  }

  return points[points.length - 1];
}

// Inline hex colors instead of Tailwind color utilities: this file lives under
// intrasight-distant-future/src, which isn't covered by the root app's
// restricted `@source '../**/*.{js,ts,jsx,tsx}'` in src/styles/tailwind.css -
// only utility classes ALREADY used elsewhere in that scanned tree get
// generated, so any new bg-*/text-* color class here silently renders as
// transparent/inherit. Layout classes (flex, gap, rounded, padding, text
// size...) are fine since those are already used throughout the codebase.
const COLOR = {
  bg950: '#0a0a0a',
  bg900: '#171717',
  bg800: '#262626',
  bg700: '#404040',
  blue: '#2563eb',
  green: '#16a34a',
  green400: '#4ade80',
  red: '#dc2626',
  black: '#000000',
  neutral400: '#a3a3a3',
  neutral500: '#737373',
};

/**
 * Standalone dev tool for tracing the catheter roadmap/positioning path over
 * a leg's real fluoro video. Open at `#/roadmap-tool` (a top-level route,
 * independent of the FlexVision canvas, so it renders at true full-screen size).
 *
 * Workflow: pick a leg, scrub/play the video (or jump straight to one of the
 * 16 checkpoints), click on the video where the catheter tip actually is at
 * that moment, then export the resulting path data + offsets and paste them
 * into appConstants.ts (RULER_PATH_DATA_RIGHT / INDICATOR_OFFSETS_RIGHT, or
 * the LEFT equivalents).
 */
export function RoadmapTool() {
  const [leg, setLeg] = useState<Leg>('right');
  const [points, setPoints] = useState<RulerPathPoint[]>(() => [...RULER_PATH_DATA_RIGHT]);
  const [offset, setOffset] = useState(() => ({ ...INDICATOR_OFFSETS_RIGHT }));
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(DURATION);
  const [copied, setCopied] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const loadLeg = (nextLeg: Leg) => {
    setLeg(nextLeg);
    setPoints([...(nextLeg === 'right' ? RULER_PATH_DATA_RIGHT : RULER_PATH_DATA_LEFT)]);
    setOffset({ ...(nextLeg === 'right' ? INDICATOR_OFFSETS_RIGHT : INDICATOR_OFFSETS_LEFT) });
    setSelectedIndex(0);
    setCurrentTime(0);
    setVideoDuration(DURATION);
    setCopied(false);
  };

  const seekTo = (time: number) => {
    const clamped = Math.max(0, Math.min(time, videoDuration));
    setCurrentTime(clamped);
    if (videoRef.current) {
      try {
        videoRef.current.currentTime = clamped;
      } catch {
        // ignore seek errors
      }
    }
  };

  const selectCheckpoint = (index: number) => {
    setSelectedIndex(index);
    seekTo(points[index].progress * videoDuration);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const stagePositionFromEvent = (e: React.MouseEvent) => {
    const stage = stageRef.current;
    if (!stage) return null;
    const rect = stage.getBoundingClientRect();
    const scaleX = VIDEO_WIDTH / rect.width;
    const scaleY = VIDEO_HEIGHT / rect.height;
    const screenX = (e.clientX - rect.left) * scaleX;
    const screenY = (e.clientY - rect.top) * scaleY;
    // Convert from stage pixels back to the video-relative (x, y) stored in the path data.
    return { x: Math.round(screenX - offset.x), y: Math.round(screenY - offset.y) };
  };

  const updatePoint = (index: number, x: number, y: number) => {
    setPoints((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], x, y };
      return next;
    });
  };

  const handleStageClick = (e: React.MouseEvent) => {
    if (draggingIndex !== null) return; // a drag-release click shouldn't also place the point
    const pos = stagePositionFromEvent(e);
    if (!pos) return;
    updatePoint(selectedIndex, pos.x, pos.y);
  };

  const handleDotMouseDown = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedIndex(index);
    setDraggingIndex(index);

    const handleMove = (moveEvent: MouseEvent) => {
      const stage = stageRef.current;
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const scaleX = VIDEO_WIDTH / rect.width;
      const scaleY = VIDEO_HEIGHT / rect.height;
      const x = Math.round((moveEvent.clientX - rect.left) * scaleX - offset.x);
      const y = Math.round((moveEvent.clientY - rect.top) * scaleY - offset.y);
      updatePoint(index, x, y);
    };
    const handleUp = () => {
      setDraggingIndex(null);
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
    };
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleUp);
  };

  const pathD = useMemo(() => {
    return `M ${points.map((p) => `${offset.x + p.x},${offset.y + p.y}`).join(' L ')}`;
  }, [points, offset]);

  const currentProgress = videoDuration > 0 ? Math.min(currentTime / videoDuration, 1) : 0;
  const playhead = interpolatePath(points, currentProgress);
  const playheadX = offset.x + playhead.x;
  const playheadY = offset.y + playhead.y;

  const exportCode = useMemo(() => {
    const constName = leg === 'right' ? 'RULER_PATH_DATA_RIGHT' : 'RULER_PATH_DATA_LEFT';
    const offsetName = leg === 'right' ? 'INDICATOR_OFFSETS_RIGHT' : 'INDICATOR_OFFSETS_LEFT';
    const pointsCode = points
      .map((p) => `  { progress: ${p.progress}, y: ${p.y}, x: ${p.x} },`)
      .join('\n');
    return `export const ${constName}: RulerPathPoint[] = [\n${pointsCode}\n];\n\nexport const ${offsetName} = { x: ${offset.x}, y: ${offset.y} };`;
  }, [points, offset, leg]);

  const copyExport = () => {
    navigator.clipboard.writeText(exportCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="w-screen h-screen text-white flex overflow-hidden" style={{ backgroundColor: COLOR.bg950 }}>
      {/* Left: video + overlay */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-auto">
        <div className="flex flex-col items-center gap-4">
          <div
            ref={stageRef}
            className="relative shadow-2xl"
            style={{ width: VIDEO_WIDTH, height: VIDEO_HEIGHT, cursor: 'crosshair', backgroundColor: COLOR.black }}
            onClick={handleStageClick}
          >
            <video
              key={leg}
              ref={videoRef}
              src={LEG_XRAY_SOURCES[leg]}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              muted
              playsInline
              preload="auto"
              onLoadedMetadata={(e) => {
                const duration = e.currentTarget.duration;
                if (Number.isFinite(duration) && duration > 0) setVideoDuration(duration);
              }}
              onTimeUpdate={(e) => setCurrentTime((e.target as HTMLVideoElement).currentTime)}
              onEnded={() => setIsPlaying(false)}
            />
            <svg
              className="absolute inset-0 pointer-events-none"
              width={VIDEO_WIDTH}
              height={VIDEO_HEIGHT}
              viewBox={`0 0 ${VIDEO_WIDTH} ${VIDEO_HEIGHT}`}
            >
              <path d={pathD} stroke="#FFDD19" strokeWidth={3} fill="none" opacity={0.85} />
              {points.map((p, index) => {
                const x = offset.x + p.x;
                const y = offset.y + p.y;
                const isSelected = index === selectedIndex;
                return (
                  <g key={index}>
                    <circle
                      cx={x}
                      cy={y}
                      r={14}
                      fill="transparent"
                      style={{ cursor: 'move', pointerEvents: 'auto' }}
                      onMouseDown={(e) => handleDotMouseDown(index, e)}
                    />
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? 8 : 6}
                      fill={isSelected ? '#FF3B3B' : '#FFDD19'}
                      stroke="white"
                      strokeWidth={2}
                      style={{ pointerEvents: 'none' }}
                    />
                    <text x={x} y={y - 14} fill="white" fontSize={11} textAnchor="middle" style={{ pointerEvents: 'none' }}>
                      {formatVideoTime(p.progress * videoDuration)}
                    </text>
                  </g>
                );
              })}
              <g style={{ pointerEvents: 'none' }}>
                <circle cx={playheadX} cy={playheadY} r={14} fill={COLOR.bg950} stroke="#38bdf8" strokeWidth={3} />
                <circle cx={playheadX} cy={playheadY} r={4} fill="#38bdf8" />
              </g>
            </svg>
          </div>

          {/* Transport controls */}
          <div className="w-full flex items-center gap-3 rounded px-3 py-2" style={{ width: VIDEO_WIDTH, backgroundColor: COLOR.bg900 }}>
            <button
              onClick={togglePlay}
              className="px-3 py-1.5 rounded text-sm font-semibold"
              style={{ backgroundColor: COLOR.bg700, color: 'white' }}
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <span className="text-xs font-mono" style={{ color: COLOR.neutral400 }}>{formatVideoTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={videoDuration}
              step={0.1}
              value={currentTime}
              onChange={(e) => seekTo(Number(e.target.value))}
              className="flex-1 cursor-pointer"
              aria-label="Scrub X-ray video"
              style={{ accentColor: COLOR.blue }}
            />
            <span className="text-xs font-mono" style={{ color: COLOR.neutral400 }}>
              {formatVideoTime(videoDuration)}
            </span>
          </div>

          <p className="text-xs max-w-[718px]" style={{ color: COLOR.neutral400 }}>
            Click a checkpoint below (or drag its dot) to select it, scrub/play the video to the
            catheter's real position at that time, then click directly on the video where the
            catheter tip is. Repeat for each checkpoint, then copy the export code on the right
            into appConstants.ts.
          </p>
        </div>
      </div>

      {/* Right: controls */}
      <div className="w-[380px] shrink-0 border-l p-5 flex flex-col gap-5 overflow-y-auto" style={{ backgroundColor: COLOR.bg900, borderColor: COLOR.bg800 }}>
        <div>
          <h1 className="text-lg font-bold">Roadmap Tool</h1>
          <p className="text-xs mt-1" style={{ color: COLOR.neutral400 }}>
            Trace the catheter path used to position the diamond indicator / ILD overlay on the
            X-ray for each leg.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase mb-2" style={{ color: COLOR.neutral500 }}>Leg</div>
          <div className="flex gap-2">
            <button
              onClick={() => loadLeg('right')}
              className="flex-1 py-2 rounded text-sm font-semibold"
              style={{ backgroundColor: leg === 'right' ? COLOR.blue : COLOR.bg800, color: 'white' }}
            >
              Right Leg
            </button>
            <button
              onClick={() => loadLeg('left')}
              className="flex-1 py-2 rounded text-sm font-semibold"
              style={{ backgroundColor: leg === 'left' ? COLOR.blue : COLOR.bg800, color: 'white' }}
            >
              Left Leg
            </button>
          </div>
        </div>

        <div>
          <div className="text-xs uppercase mb-2" style={{ color: COLOR.neutral500 }}>Checkpoints (video time)</div>
          <div className="grid grid-cols-4 gap-1.5">
            {points.map((p, index) => (
              <button
                key={index}
                onClick={() => selectCheckpoint(index)}
                className="py-1.5 rounded text-xs font-mono"
                style={{ backgroundColor: index === selectedIndex ? COLOR.red : COLOR.bg800, color: 'white' }}
              >
                {formatVideoTime(p.progress * videoDuration)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs uppercase mb-2" style={{ color: COLOR.neutral500 }}>Selected point ({formatVideoTime(points[selectedIndex].progress * videoDuration)})</div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <label className="flex flex-col gap-1">
              x
              <input
                type="number"
                value={points[selectedIndex].x}
                onChange={(e) => updatePoint(selectedIndex, Number(e.target.value), points[selectedIndex].y)}
                className="rounded px-2 py-1"
                style={{ backgroundColor: COLOR.bg800, color: 'white' }}
              />
            </label>
            <label className="flex flex-col gap-1">
              y
              <input
                type="number"
                value={points[selectedIndex].y}
                onChange={(e) => updatePoint(selectedIndex, points[selectedIndex].x, Number(e.target.value))}
                className="rounded px-2 py-1"
                style={{ backgroundColor: COLOR.bg800, color: 'white' }}
              />
            </label>
          </div>
        </div>

        <div>
          <div className="text-xs uppercase mb-2" style={{ color: COLOR.neutral500 }}>Base offset (shifts the whole path)</div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <label className="flex flex-col gap-1">
              x
              <input
                type="number"
                value={offset.x}
                onChange={(e) => setOffset((o) => ({ ...o, x: Number(e.target.value) }))}
                className="rounded px-2 py-1"
                style={{ backgroundColor: COLOR.bg800, color: 'white' }}
              />
            </label>
            <label className="flex flex-col gap-1">
              y
              <input
                type="number"
                value={offset.y}
                onChange={(e) => setOffset((o) => ({ ...o, y: Number(e.target.value) }))}
                className="rounded px-2 py-1"
                style={{ backgroundColor: COLOR.bg800, color: 'white' }}
              />
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={copyExport}
            className="py-2 rounded text-sm font-semibold"
            style={{ backgroundColor: COLOR.green, color: 'white' }}
          >
            {copied ? 'Copied!' : 'Copy export code'}
          </button>
          <button
            onClick={() => loadLeg(leg)}
            className="py-2 rounded text-sm"
            style={{ backgroundColor: COLOR.bg800, color: 'white' }}
          >
            Reset to saved data
          </button>
        </div>

        <pre className="rounded p-3 text-[10px] whitespace-pre-wrap overflow-x-auto" style={{ backgroundColor: COLOR.black, color: COLOR.green400 }}>
          {exportCode}
        </pre>
      </div>
    </div>
  );
}
