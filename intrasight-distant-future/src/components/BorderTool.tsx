import React, { useEffect, useMemo, useRef, useState } from 'react';
import { IVUSMeasurementOverlay, type IVUSMeasurementOverlayHandle } from './IVUSMeasurementOverlay';
import {
  deletePolygonKeyframe,
  exportPolygonKeyframes,
  getBorderMeasurements,
  getBorderPolygons,
  getBorderSource,
  getPolygonKeyframeFrames,
  getReviewSuggestions,
  setActiveBorderLeg,
  setEditPropagation,
  setPolygonKeyframe,
  subscribeToBorderEdits,
} from '../utils/ivusBorders';
import type { Leg } from './constants/appConstants';

export const FRAME_COUNTS: Record<Leg, number> = { right: 1052, left: 788 };
const FRAMES_DIR: Record<Leg, string> = {
  right: '/intrasight-distant-future/assets/ivus-frames-right-leg',
  left: '/intrasight-distant-future/assets/ivus-frames',
};

const STAGE_SIZE = 440;

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
  neutral300: '#d4d4d4',
  neutral400: '#a3a3a3',
  neutral500: '#737373',
};

export function framePath(leg: Leg, frame: number): string {
  return `${FRAMES_DIR[leg]}/frame_${String(frame).padStart(4, '0')}.jpg`;
}

/**
 * Standalone dev tool for hand-tracing the lumen (blue) and vessel (green)
 * borders on individual IVUS frames. Open at `#/border-tool`.
 *
 * Reuses the analysis screen's interactive border editor
 * (`IVUSMeasurementOverlay`) and adds frame browsing, a leg switch and
 * keyframe saving/export. Saved keyframes are exact; frames in between show
 * the image-refined per-frame annotations (`npm run annotate-borders`), or
 * live interpolation around keyframes changed since those were generated.
 */
export function BorderTool() {
  const [leg, setLeg] = useState<Leg>('right');
  const [frame, setFrame] = useState(1);
  const [tick, setTick] = useState(0); // bumps whenever ivusBorders notifies an edit
  const [copied, setCopied] = useState(false);
  const overlayRef = useRef<IVUSMeasurementOverlayHandle>(null);

  useEffect(() => setActiveBorderLeg(leg), [leg]);
  useEffect(() => subscribeToBorderEdits(() => setTick((v) => v + 1)), []);
  useEffect(() => {
    // Authoring exact keyframes: an edit must not leak into neighbouring frames.
    setEditPropagation(false);
    return () => setEditPropagation(true);
  }, []);

  const totalFrames = FRAME_COUNTS[leg];
  const keyframeFrames = useMemo(() => getPolygonKeyframeFrames(), [leg, tick]);
  const isKeyframe = keyframeFrames.includes(frame);
  const measurements = useMemo(() => getBorderMeasurements(frame), [frame, tick, leg]);
  const suggestions = useMemo(() => getReviewSuggestions(8), [leg, tick]);

  const sourceStatus = useMemo(() => {
    const source = getBorderSource(frame);
    switch (source.kind) {
      case 'keyframe':
        return null; // "★ saved keyframe" badge covers this case
      case 'edit':
        return { text: 'edited - Save as keyframe to keep it', color: '#fbbf24' };
      case 'annotation':
        return {
          text: `image-refined annotation (agreement ${source.agreement.toFixed(2)})`,
          color: source.agreement < 0.95 ? '#fbbf24' : COLOR.neutral400,
        };
      case 'interpolated': {
        const before = [...keyframeFrames].reverse().find((f) => f < frame);
        const after = keyframeFrames.find((f) => f > frame);
        return {
          text: before !== undefined && after !== undefined
            ? `live interpolation between frame ${before} and ${after}`
            : 'outside authored range - clamped to nearest keyframe',
          color: COLOR.neutral400,
        };
      }
      default:
        return { text: 'no keyframes yet - showing default shape', color: COLOR.neutral400 };
    }
  }, [frame, tick, leg, keyframeFrames]);

  const loadLeg = (nextLeg: Leg) => {
    overlayRef.current?.commitPendingEdits();
    setLeg(nextLeg);
    setFrame(1);
    setCopied(false);
  };

  const goToFrame = (f: number) => {
    // Commit any in-progress drag on the CURRENT frame first, so navigating
    // away never silently discards an unfinished edit.
    overlayRef.current?.commitPendingEdits();
    setFrame(Math.max(1, Math.min(f, totalFrames)));
  };

  /** Jump straight to the nearest saved keyframe before/after the current frame, if any. */
  const jumpToKeyframe = (direction: 'prev' | 'next') => {
    const target = direction === 'next'
      ? keyframeFrames.find((f) => f > frame)
      : [...keyframeFrames].reverse().find((f) => f < frame);
    if (target !== undefined) goToFrame(target);
  };

  const saveKeyframe = () => {
    overlayRef.current?.commitPendingEdits();
    const polys = getBorderPolygons(frame);
    setPolygonKeyframe(frame, 'lumen', polys.lumen);
    setPolygonKeyframe(frame, 'vessel', polys.vessel);
    setTick((v) => v + 1);
  };

  const removeKeyframe = (f: number) => {
    deletePolygonKeyframe(f);
    setTick((v) => v + 1);
  };

  const exportCode = useMemo(() => exportPolygonKeyframes(), [leg, tick]);

  const copyExport = () => {
    navigator.clipboard.writeText(exportCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="w-screen h-screen text-white flex overflow-hidden" style={{ backgroundColor: COLOR.bg950 }}>
      {/* Left: frame + border editor */}
      <div className="flex-1 flex items-start justify-center p-4 overflow-auto">
        <div className="flex flex-col items-center gap-2">
          {/* Frame nav controls FIRST, so they're always visible even on short windows */}
          <div className="flex items-center gap-3 text-sm" style={{ width: STAGE_SIZE }}>
            <label className="flex items-center gap-2">
              Frame
              <input
                type="number"
                min={1}
                max={totalFrames}
                value={frame}
                onChange={(e) => goToFrame(Number(e.target.value))}
                className="rounded px-2 py-1 w-20"
                style={{ backgroundColor: COLOR.bg800, color: 'white' }}
              />
              / {totalFrames}
            </label>
            {isKeyframe && <span className="font-semibold" style={{ color: COLOR.green400 }}>★ saved keyframe</span>}
            {sourceStatus && <span style={{ color: sourceStatus.color }}>{sourceStatus.text}</span>}
          </div>

          <div className="flex items-center gap-3" style={{ width: STAGE_SIZE }}>
            <button
              onClick={() => goToFrame(frame - 1)}
              className="px-3 py-1.5 rounded text-sm font-semibold"
              style={{ backgroundColor: COLOR.bg700, color: 'white' }}
            >
              ← Prev
            </button>
            <input
              type="range"
              min={1}
              max={totalFrames}
              value={frame}
              onChange={(e) => goToFrame(Number(e.target.value))}
              className="flex-1"
              style={{ height: 6 }}
            />
            <button
              onClick={() => goToFrame(frame + 1)}
              className="px-3 py-1.5 rounded text-sm font-semibold"
              style={{ backgroundColor: COLOR.bg700, color: 'white' }}
            >
              Next →
            </button>
          </div>
          <div className="flex items-center justify-center gap-1.5" style={{ width: STAGE_SIZE }}>
            <button onClick={() => goToFrame(frame - 50)} className="px-2 py-1 rounded text-xs" style={{ backgroundColor: COLOR.bg800, color: 'white' }}>-50</button>
            <button onClick={() => goToFrame(frame - 10)} className="px-2 py-1 rounded text-xs" style={{ backgroundColor: COLOR.bg800, color: 'white' }}>-10</button>
            <button
              onClick={() => jumpToKeyframe('prev')}
              disabled={!keyframeFrames.some((f) => f < frame)}
              className="px-2 py-1 rounded text-xs"
              style={{ backgroundColor: COLOR.bg800, color: 'white', opacity: keyframeFrames.some((f) => f < frame) ? 1 : 0.3 }}
            >
              ← prev keyframe
            </button>
            <button
              onClick={() => jumpToKeyframe('next')}
              disabled={!keyframeFrames.some((f) => f > frame)}
              className="px-2 py-1 rounded text-xs"
              style={{ backgroundColor: COLOR.bg800, color: 'white', opacity: keyframeFrames.some((f) => f > frame) ? 1 : 0.3 }}
            >
              next keyframe →
            </button>
            <button onClick={() => goToFrame(frame + 10)} className="px-2 py-1 rounded text-xs" style={{ backgroundColor: COLOR.bg800, color: 'white' }}>+10</button>
            <button onClick={() => goToFrame(frame + 50)} className="px-2 py-1 rounded text-xs" style={{ backgroundColor: COLOR.bg800, color: 'white' }}>+50</button>
          </div>

          <div className="relative shadow-2xl rounded-full overflow-hidden shrink-0" style={{ width: STAGE_SIZE, height: STAGE_SIZE, backgroundColor: COLOR.black }}>
            <img
              key={`${leg}-${frame}`}
              src={framePath(leg, frame)}
              alt={`Frame ${frame}`}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
            <IVUSMeasurementOverlay ref={overlayRef} frameNumber={frame} containerSize={STAGE_SIZE} interactive />
          </div>

          <p className="text-xs max-w-[560px]" style={{ color: COLOR.neutral400 }}>
            Click the blue (lumen) or green (vessel) border to edit it, drag its points to trace
            the real shape (click the line to add a point, drag a point onto its neighbor to
            remove it), then click "Done". Once both borders look right for this frame, click
            "Save as keyframe" - frames in between saved keyframes are interpolated
            automatically, same as the app will render them live.
          </p>
        </div>
      </div>

      {/* Right: controls */}
      <div className="w-[380px] shrink-0 border-l p-5 flex flex-col gap-5 overflow-y-auto" style={{ backgroundColor: COLOR.bg900, borderColor: COLOR.bg800 }}>
        <div>
          <h1 className="text-lg font-bold">Border Tool</h1>
          <p className="text-xs mt-1" style={{ color: COLOR.neutral400 }}>
            Trace the lumen/vessel borders used for measurements and the ILD waveform shape.
          </p>
          <a href="#/keyframe-grid" className="text-xs underline" style={{ color: COLOR.green400 }}>
            Fix many keyframes on one page: Keyframe Grid →
          </a>
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

        <button
          onClick={saveKeyframe}
          className="py-2 rounded text-sm font-semibold"
          style={{ backgroundColor: COLOR.green, color: 'white' }}
        >
          {isKeyframe ? 'Update keyframe at this frame' : 'Save as keyframe'}
        </button>

        <div>
          <div className="text-xs uppercase mb-2" style={{ color: COLOR.neutral500 }}>
            Keyframes ({keyframeFrames.length})
          </div>
          <div className="flex flex-col gap-1 max-h-56 overflow-y-auto">
            {keyframeFrames.length === 0 && (
              <p className="text-xs" style={{ color: COLOR.neutral500 }}>None saved yet for this leg.</p>
            )}
            {keyframeFrames.map((f) => (
              <div key={f} className="flex items-center gap-2">
                <button
                  onClick={() => goToFrame(f)}
                  className="flex-1 text-left px-2 py-1 rounded text-xs font-mono"
                  style={{ backgroundColor: f === frame ? COLOR.red : COLOR.bg800, color: 'white' }}
                >
                  frame {f}
                </button>
                <button
                  onClick={() => removeKeyframe(f)}
                  className="px-2 py-1 rounded text-xs"
                  style={{ backgroundColor: COLOR.bg800, color: 'white' }}
                  title="Delete keyframe"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs uppercase mb-2" style={{ color: COLOR.neutral500 }}>Current frame measurements</div>
          <div className="text-xs font-mono space-y-1" style={{ color: COLOR.neutral300 }}>
            <div>lumen area {measurements.lumenAreaMm2.toFixed(2)} mm² (min Ø {measurements.lumenMinDiameterMm.toFixed(1)} mm)</div>
            <div>vessel area {measurements.vesselAreaMm2.toFixed(2)} mm² (max Ø {measurements.vesselMaxDiameterMm.toFixed(1)} mm)</div>
            <div>plaque burden {measurements.plaqueBurdenPct.toFixed(0)}%</div>
          </div>
        </div>

        {suggestions.length > 0 && (
          <div>
            <div className="text-xs uppercase mb-2" style={{ color: COLOR.neutral500 }}>
              Suggested frames for another keyframe
            </div>
            <p className="text-xs mb-2" style={{ color: COLOR.neutral500 }}>
              Where image tracking and interpolation disagree most (lowest agreement first).
            </p>
            <div className="flex flex-wrap gap-1">
              {suggestions.map((s) => (
                <button
                  key={s.frame}
                  onClick={() => goToFrame(s.frame)}
                  className="px-2 py-1 rounded text-xs font-mono"
                  style={{ backgroundColor: s.frame === frame ? COLOR.red : COLOR.bg800, color: 'white' }}
                  title={`agreement ${s.agreement.toFixed(2)}`}
                >
                  {s.frame}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={copyExport}
          className="py-2 rounded text-sm font-semibold"
          style={{ backgroundColor: COLOR.blue, color: 'white' }}
        >
          {copied ? 'Copied!' : 'Copy export code'}
        </button>
        <p className="text-xs -mt-3" style={{ color: COLOR.neutral400 }}>
          Paste over `BORDER_POLYGON_KEYFRAMES_{leg.toUpperCase()}` in
          intrasight-distant-future/src/data/borderKeyframes.ts, then run `npm run annotate-borders`
          to regenerate the per-frame annotations.
        </p>

        <pre className="rounded p-3 text-[10px] whitespace-pre-wrap overflow-x-auto" style={{ backgroundColor: COLOR.black, color: COLOR.green400 }}>
          {exportCode || '(no keyframes saved yet)'}
        </pre>
      </div>
    </div>
  );
}
