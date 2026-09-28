import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FRAME_COUNTS, framePath } from './BorderTool';
import {
  deletePolygonKeyframe,
  exportPolygonKeyframes,
  getBorderPolygons,
  getCatheterCentre,
  getPolygonKeyframeFrames,
  pointsToSmoothPath,
  polygonAreaPx,
  pxAreaToMm2,
  setActiveBorderLeg,
  setEditPropagation,
  setKeyframeBorders,
  type BorderPolygons,
  type Point,
} from '../utils/ivusBorders';
import {
  CATHETER_AREA_RADIUS,
  MIN_EDIT_POINTS,
  VESSEL_CATHETER_AREA_RADIUS,
  clonePolygons,
  coverDisc,
  editableHandles,
  smoothPolygon,
} from '../utils/borderGeometry';
import type { Leg } from './constants/appConstants';

/** 720-space pixels shown on each side of the catheter in a tile. */
const VIEW_HALF = 225;

// Inline hex colors: Tailwind color utilities aren't generated for this folder (see BorderTool.tsx).
const COLOR = {
  bg950: '#0a0a0a',
  bg900: '#171717',
  bg800: '#262626',
  bg700: '#404040',
  blue: '#2563eb',
  green: '#16a34a',
  green400: '#4ade80',
  amber: '#fbbf24',
  neutral300: '#d4d4d4',
  neutral400: '#a3a3a3',
  neutral500: '#737373',
  lumen: '#21b9ff',
  vessel: '#23cc72',
};

type Kind = 'lumen' | 'vessel';
type EditMode = 'both' | Kind;
type TileStatus = 'keyframe' | 'edited' | 'kept';

/** Existing keyframes plus frames filling the largest gaps, `count` in total. */
function pickFrames(keyframes: number[], total: number, count: number): number[] {
  const picked = new Set([1, total, ...keyframes]);
  while (picked.size < count) {
    const sorted = [...picked].sort((a, b) => a - b);
    let widest = 0;
    let at = 0;
    for (let i = 0; i + 1 < sorted.length; i++) {
      if (sorted[i + 1] - sorted[i] > widest) {
        widest = sorted[i + 1] - sorted[i];
        at = i;
      }
    }
    if (widest < 2) break;
    picked.add(Math.round((sorted[at] + sorted[at + 1]) / 2));
  }
  return [...picked].sort((a, b) => a - b);
}

/** Index to insert a point on the polygon edge nearest `p`, and the point on that edge. */
function nearestEdge(p: Point, polygon: Point[]): { index: number; point: Point } {
  let best = { index: 1, point: polygon[0], dist: Infinity };
  for (let i = 0; i < polygon.length; i++) {
    const a = polygon[i];
    const b = polygon[(i + 1) % polygon.length];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const l2 = dx * dx + dy * dy;
    const t = l2 < 1e-9 ? 0 : Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / l2));
    const q = { x: a.x + t * dx, y: a.y + t * dy };
    const dist = Math.hypot(p.x - q.x, p.y - q.y);
    if (dist < best.dist) best = { index: i + 1, point: q, dist };
  }
  return best;
}

const areaMm2 = (points: Point[]) => pxAreaToMm2(polygonAreaPx(smoothPolygon(points, 6)));

interface TileProps {
  leg: Leg;
  frame: number;
  size: number;
  centre: Point;
  polygons: BorderPolygons;
  status: TileStatus | null;
  editMode: EditMode;
  onCommit: (frame: number, polygons: BorderPolygons) => void;
  onKeep: (frame: number) => void;
  onReset: (frame: number) => void;
}

const Tile = memo(function Tile({ leg, frame, size, centre, polygons, status, editMode, onCommit, onKeep, onReset }: TileProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [draft, setDraft] = useState<BorderPolygons | null>(null);
  const [drag, setDrag] = useState<{ kind: Kind; index: number } | null>(null);
  const [hover, setHover] = useState(false);

  const handles = useMemo(
    () => draft ?? { lumen: editableHandles(polygons.lumen), vessel: editableHandles(polygons.vessel) },
    [draft, polygons],
  );
  const shown = draft ?? polygons;
  const unit = (2 * VIEW_HALF) / size; // svg units per screen pixel

  const toLocal = (e: { clientX: number; clientY: number }): Point => {
    const svg = svgRef.current!;
    const m = svg.getScreenCTM()!.inverse();
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m);
    return { x: p.x, y: p.y };
  };

  const commit = (next: BorderPolygons) => {
    setDraft(null);
    // The catheter always lies inside the lumen: keep both borders around it.
    onCommit(frame, {
      lumen: coverDisc(next.lumen, centre, CATHETER_AREA_RADIUS),
      vessel: coverDisc(next.vessel, centre, VESSEL_CATHETER_AREA_RADIUS),
    });
  };

  const startDrag = (kind: Kind, index: number) => (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    svgRef.current?.setPointerCapture(e.pointerId);
    setDraft(clonePolygons(handles));
    setDrag({ kind, index });
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag || !draft) return;
    const p = toLocal(e);
    setDraft({ ...draft, [drag.kind]: draft[drag.kind].map((q, i) => (i === drag.index ? p : q)) });
  };

  const onPointerUp = () => {
    if (!drag || !draft) return;
    setDrag(null);
    commit(draft);
  };

  const insertPoint = (kind: Kind) => (e: React.MouseEvent) => {
    const next = clonePolygons(handles);
    const { index, point } = nearestEdge(toLocal(e), next[kind]);
    next[kind].splice(index, 0, point);
    commit(next);
  };

  const removePoint = (kind: Kind, index: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (handles[kind].length <= MIN_EDIT_POINTS) return;
    const next = clonePolygons(handles);
    next[kind].splice(index, 1);
    commit(next);
  };

  const editable: Kind[] = editMode === 'both' ? ['vessel', 'lumen'] : [editMode];
  const showHandles = hover || drag !== null;
  const outline = status === 'edited' ? COLOR.amber : status === 'kept' ? COLOR.green : status === 'keyframe' ? COLOR.bg700 : 'transparent';

  return (
    <div className="flex flex-col gap-1" style={{ width: size }}>
      <svg
        ref={svgRef}
        width={size}
        height={size}
        viewBox={`${centre.x - VIEW_HALF} ${centre.y - VIEW_HALF} ${2 * VIEW_HALF} ${2 * VIEW_HALF}`}
        className="rounded select-none"
        style={{ backgroundColor: '#000', outline: `2px solid ${outline}`, touchAction: 'none' }}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        onContextMenu={(e) => e.preventDefault()}
      >
        <image href={framePath(leg, frame)} x={0} y={0} width={720} height={720} preserveAspectRatio="xMidYMid slice" />
        <circle cx={centre.x} cy={centre.y} r={CATHETER_AREA_RADIUS} fill="none" stroke="#ffffff" strokeOpacity={0.35} strokeWidth={unit} strokeDasharray={`${3 * unit} ${3 * unit}`} />
        {(['vessel', 'lumen'] as Kind[]).map((kind) => (
          <g key={kind}>
            <path d={pointsToSmoothPath(shown[kind])} fill="none" stroke={kind === 'lumen' ? COLOR.lumen : COLOR.vessel} strokeWidth={2 * unit} />
            {editable.includes(kind) && (
              <path
                d={pointsToSmoothPath(handles[kind])}
                fill="none"
                stroke="transparent"
                strokeWidth={10 * unit}
                style={{ cursor: 'copy' }}
                onDoubleClick={insertPoint(kind)}
              />
            )}
          </g>
        ))}
        {showHandles && editable.map((kind) => handles[kind].map((p, i) => (
          <circle
            key={`${kind}-${i}`}
            cx={p.x}
            cy={p.y}
            r={4.5 * unit}
            fill="#ffffff"
            stroke={kind === 'lumen' ? COLOR.lumen : COLOR.vessel}
            strokeWidth={2 * unit}
            style={{ cursor: 'grab' }}
            onPointerDown={startDrag(kind, i)}
            onContextMenu={removePoint(kind, i)}
          />
        )))}
      </svg>
      <div className="flex items-center gap-1 text-[11px] font-mono" style={{ color: COLOR.neutral300 }}>
        <span className="font-semibold" style={{ color: 'white' }}>{frame}</span>
        {status === 'keyframe' && <span style={{ color: COLOR.neutral400 }}>★</span>}
        {status === 'edited' && <span style={{ color: COLOR.amber }}>edited</span>}
        {status === 'kept' && <span style={{ color: COLOR.green400 }}>kept</span>}
        <span className="ml-auto" style={{ color: COLOR.lumen }}>L {areaMm2(shown.lumen).toFixed(1)}</span>
        <span style={{ color: COLOR.vessel }}>V {areaMm2(shown.vessel).toFixed(1)}</span>
      </div>
      <div className="flex gap-1">
        <button
          onClick={() => onKeep(frame)}
          disabled={status !== null}
          className="flex-1 rounded py-0.5 text-[11px]"
          style={{ backgroundColor: COLOR.bg800, color: 'white', opacity: status !== null ? 0.35 : 1 }}
          title="Borders are right: save this frame as a keyframe as shown"
        >
          ✓ Keep
        </button>
        <button
          onClick={() => onReset(frame)}
          disabled={status === null || status === 'keyframe'}
          className="flex-1 rounded py-0.5 text-[11px]"
          style={{ backgroundColor: COLOR.bg800, color: 'white', opacity: status === null || status === 'keyframe' ? 0.35 : 1 }}
          title="Undo your changes to this frame"
        >
          Reset
        </button>
      </div>
    </div>
  );
});

/**
 * Dev tool: review and fix the lumen (blue) and vessel (green) borders of
 * many frames on one page - every keyframe plus frames filling the largest
 * gaps. Open at `#/keyframe-grid`. Frames you change or keep become
 * keyframes; export them all at once.
 */
export function KeyframeGrid() {
  const [leg, setLeg] = useState<Leg>('right');
  const [count, setCount] = useState(75);
  const [size, setSize] = useState(260);
  const [editMode, setEditMode] = useState<EditMode>('both');
  const [frames, setFrames] = useState<number[]>([]);
  const [tiles, setTiles] = useState<Map<number, BorderPolygons>>(new Map());
  const [status, setStatus] = useState<Map<number, TileStatus>>(new Map());
  const [centre, setCentre] = useState<Point>({ x: 360, y: 360 });
  const [copied, setCopied] = useState(false);
  const legRef = useRef(leg);
  const tilesRef = useRef(tiles);
  tilesRef.current = tiles;
  // Per leg: this session's changes, and each tile's borders before any of them (for Reset).
  const session = useRef<Record<Leg, { changes: Map<number, TileStatus>; originals: Map<number, { polygons: BorderPolygons; wasKeyframe: boolean }> }>>({
    left: { changes: new Map(), originals: new Map() },
    right: { changes: new Map(), originals: new Map() },
  });

  useEffect(() => {
    setEditPropagation(false);
    return () => setEditPropagation(true);
  }, []);

  useEffect(() => {
    legRef.current = leg;
    setActiveBorderLeg(leg);
    const keyframes = new Set(getPolygonKeyframeFrames());
    const picked = pickFrames([...keyframes], FRAME_COUNTS[leg], count);
    const { changes, originals } = session.current[leg];
    const loaded = new Map<number, BorderPolygons>();
    const nextStatus = new Map<number, TileStatus>();
    for (const f of picked) {
      loaded.set(f, clonePolygons(getBorderPolygons(f)));
      if (!originals.has(f)) originals.set(f, { polygons: clonePolygons(loaded.get(f)!), wasKeyframe: keyframes.has(f) });
      const s = changes.get(f) ?? (keyframes.has(f) ? 'keyframe' : undefined);
      if (s) nextStatus.set(f, s);
    }
    setCentre(getCatheterCentre());
    setFrames(picked);
    setTiles(loaded);
    setStatus(nextStatus);
    setCopied(false);
  }, [leg, count]);

  const changed = useMemo(() => [...status.values()].filter((s) => s !== 'keyframe').length, [status]);

  useEffect(() => {
    if (!changed || copied) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [changed, copied]);

  const setTile = useCallback((frame: number, polygons: BorderPolygons, next: TileStatus | null, change: TileStatus | null) => {
    const { changes } = session.current[legRef.current];
    if (change) changes.set(frame, change);
    else changes.delete(frame);
    setTiles((prev) => new Map(prev).set(frame, polygons));
    setStatus((prev) => {
      const out = new Map(prev);
      if (next) out.set(frame, next);
      else out.delete(frame);
      return out;
    });
    setCopied(false);
  }, []);

  const onCommit = useCallback((frame: number, polygons: BorderPolygons) => {
    setKeyframeBorders(frame, polygons);
    setTile(frame, polygons, 'edited', 'edited');
  }, [setTile]);

  const onKeep = useCallback((frame: number) => {
    const cur = tilesRef.current.get(frame)!;
    const centre = getCatheterCentre();
    const kept = {
      lumen: coverDisc(editableHandles(cur.lumen), centre, CATHETER_AREA_RADIUS),
      vessel: coverDisc(editableHandles(cur.vessel), centre, VESSEL_CATHETER_AREA_RADIUS),
    };
    setKeyframeBorders(frame, kept);
    setTile(frame, kept, 'kept', 'kept');
  }, [setTile]);

  const onReset = useCallback((frame: number) => {
    const original = session.current[legRef.current].originals.get(frame)!;
    if (original.wasKeyframe) setKeyframeBorders(frame, original.polygons);
    else deletePolygonKeyframe(frame);
    setTile(frame, clonePolygons(original.polygons), original.wasKeyframe ? 'keyframe' : null, null);
  }, [setTile]);

  const copyExport = () => {
    navigator.clipboard.writeText(exportPolygonKeyframes()).then(() => setCopied(true));
  };

  const pill = (active: boolean): React.CSSProperties => ({ backgroundColor: active ? COLOR.blue : COLOR.bg800, color: 'white' });

  return (
    <div className="w-screen h-screen overflow-y-auto text-white" style={{ backgroundColor: COLOR.bg950 }}>
      <div className="sticky top-0 z-10 flex flex-wrap items-center gap-4 px-5 py-3 border-b" style={{ backgroundColor: COLOR.bg900, borderColor: COLOR.bg800 }}>
        <div>
          <h1 className="text-lg font-bold">Keyframe Grid</h1>
          <a href="#/border-tool" className="text-xs underline" style={{ color: COLOR.neutral400 }}>← single-frame Border Tool</a>
        </div>
        <div className="flex gap-1">
          <button onClick={() => setLeg('right')} className="px-3 py-1.5 rounded text-sm font-semibold" style={pill(leg === 'right')}>Right Leg</button>
          <button onClick={() => setLeg('left')} className="px-3 py-1.5 rounded text-sm font-semibold" style={pill(leg === 'left')}>Left Leg</button>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <span style={{ color: COLOR.neutral400 }}>Edit</span>
          {(['both', 'lumen', 'vessel'] as EditMode[]).map((m) => (
            <button key={m} onClick={() => setEditMode(m)} className="px-2 py-1 rounded" style={pill(editMode === m)}>
              {m === 'both' ? 'both' : m === 'lumen' ? 'lumen (blue)' : 'vessel (green)'}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-xs" style={{ color: COLOR.neutral400 }}>
          Frames
          <input
            type="number"
            min={10}
            max={200}
            value={count}
            onChange={(e) => setCount(Math.max(10, Math.min(200, Number(e.target.value) || 75)))}
            className="w-16 rounded px-2 py-1"
            style={{ backgroundColor: COLOR.bg800, color: 'white' }}
          />
        </label>
        <label className="flex items-center gap-2 text-xs" style={{ color: COLOR.neutral400 }}>
          Tile size
          <input type="range" min={180} max={420} value={size} onChange={(e) => setSize(Number(e.target.value))} />
        </label>
        <div className="ml-auto flex items-center gap-3">
          <span className="text-xs" style={{ color: changed ? COLOR.amber : COLOR.neutral400 }}>
            {changed} frame{changed === 1 ? '' : 's'} changed
          </span>
          <button onClick={copyExport} className="px-4 py-2 rounded text-sm font-semibold" style={{ backgroundColor: COLOR.green, color: 'white' }}>
            {copied ? 'Copied!' : 'Copy export code'}
          </button>
        </div>
        <p className="w-full text-xs" style={{ color: COLOR.neutral400 }}>
          Hover a frame and drag its points to fix the lumen (blue) and vessel (green). Double-click a line to add a point,
          right-click a point to remove it. Borders always stay around the catheter (dashed circle). Frames you change or
          mark "Keep" become keyframes; ★ = existing keyframe. When done, click Copy export code, paste it over
          BORDER_POLYGON_KEYFRAMES_{leg.toUpperCase()} in intrasight-distant-future/src/data/borderKeyframes.ts and
          run `npm run annotate-borders`.
        </p>
      </div>
      <div className="flex flex-wrap gap-4 p-5">
        {frames.map((f) => tiles.has(f) && (
          <Tile
            key={`${leg}-${f}`}
            leg={leg}
            frame={f}
            size={size}
            centre={centre}
            polygons={tiles.get(f)!}
            status={status.get(f) ?? null}
            editMode={editMode}
            onCommit={onCommit}
            onKeep={onKeep}
            onReset={onReset}
          />
        ))}
      </div>
    </div>
  );
}
