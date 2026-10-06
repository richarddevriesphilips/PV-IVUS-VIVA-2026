import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import {
  commitBorderEdit,
  getBorderPolygons,
  pointsToSmoothPath,
  subscribeToBorderEdits,
  type Point,
  REFERENCE_SIZE,
} from '../utils/ivusBorders';
import { MIN_EDIT_POINTS, editableHandles } from '../utils/borderGeometry';

// ---------------------------------------------------------------------------
// Editing tunables (all in 720-space pixels)
// ---------------------------------------------------------------------------

/** If a dragged dot ends up closer than this to a neighbor, the dot is deleted. */
const MERGE_DELETE_DISTANCE = 16;

// ---------------------------------------------------------------------------
// Polygon-edit geometry helpers
// ---------------------------------------------------------------------------

/** Project `p` onto segment a-b, clamped to [0,1].  Returns the projection and the perpendicular distance. */
function projectOntoSegment(p: Point, a: Point, b: Point): { proj: Point; dist: number } {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const lensq = dx * dx + dy * dy;
  let t = lensq < 1e-9 ? 0 : ((p.x - a.x) * dx + (p.y - a.y) * dy) / lensq;
  t = Math.max(0, Math.min(1, t));
  const proj = { x: a.x + dx * t, y: a.y + dy * t };
  return { proj, dist: Math.hypot(p.x - proj.x, p.y - proj.y) };
}

/**
 * Find the edge of `polygon` closest to `p` and return the insertion index
 * (so that splice(index, 0, newPoint) places the new point between
 * polygon[index-1] and polygon[index] along the edge).
 */
function findInsertion(p: Point, polygon: Point[]): { insertAt: number; proj: Point } {
  let bestI = 0;
  let bestDist = Infinity;
  let bestProj: Point = polygon[0];
  for (let i = 0; i < polygon.length; i++) {
    const a = polygon[i];
    const b = polygon[(i + 1) % polygon.length];
    const { proj, dist } = projectOntoSegment(p, a, b);
    if (dist < bestDist) {
      bestDist = dist;
      bestI = i;
      bestProj = proj;
    }
  }
  // Insert AFTER polygon[bestI], i.e. at index bestI+1.
  return { insertAt: bestI + 1, proj: bestProj };
}

interface IVUSMeasurementOverlayProps {
  /** Current frame number (1-based). Drives interpolation across keyframes. */
  frameNumber?: number;
  /** Pixel size of the rendered container (square). */
  containerSize?: number;
  /**
   * If true, the borders are clickable and editable. A "Done" button is
   * shown while editing.
   */
  interactive?: boolean;
  /** Also draw/edit the lumen (blue) border. */
  showLumen?: boolean;
  /**
   * Optional legacy props — accepted for backwards compatibility but no
   * longer used (the overlay now derives shape from keyframes).
   */
  lumenDiameter?: number;
  vesselDiameter?: number;
}

type EditTarget = 'lumen' | 'vessel' | null;

/** Imperative handle for callers that need to force-commit an in-progress edit (e.g. before reading getBorderPolygons or navigating away). */
export interface IVUSMeasurementOverlayHandle {
  commitPendingEdits: () => void;
}

/**
 * Renders the lumen (blue) and vessel (green) boundaries on top of an
 * IVUS frame, using keyframe-traced ellipses from `ivusBorders.ts`.
 *
 * When `interactive` is true, the user can:
 *   - Click on either border to enter edit mode for that border.
 *   - Drag the control points to reshape it.
 *   - Click the "Done" button to confirm and exit edit mode.
 */
export const IVUSMeasurementOverlay = forwardRef<IVUSMeasurementOverlayHandle, IVUSMeasurementOverlayProps>(function IVUSMeasurementOverlay({
  frameNumber = 0,
  containerSize = 350,
  interactive = false,
  showLumen = true,
}, ref) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [editing, setEditing] = useState<EditTarget>(null);
  // In-progress polygon while the user is dragging. When null, we render
  // whatever `getBorderPolygons(frameNumber)` returns (detected + propagated
  // user edits). Committed edits live in the global store, not here.
  const [editLumen, setEditLumen] = useState<Point[] | null>(null);
  const [editVessel, setEditVessel] = useState<Point[] | null>(null);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  // Re-render whenever an edit elsewhere bumps the edit store (e.g. propagation
  // touched this frame). We use a small version counter so React knows to
  // re-pull from getBorderPolygons.
  // The tick value is included in the storePolys memo deps below so a commit
  // (which fires notifyEdits) actually causes us to re-pull from getBorderPolygons.
  const [editTick, setEditTick] = useState(0);
  useEffect(() => {
    const unsub = subscribeToBorderEdits(() => setEditTick((v) => v + 1));
    return unsub;
  }, []);

  // When the user scrubs to a different frame, abandon any in-progress edit
  // and exit edit mode. (The previously committed edit is preserved in the
  // global store.)
  const lastFrameRef = useRef(frameNumber);
  useEffect(() => {
    if (lastFrameRef.current !== frameNumber) {
      lastFrameRef.current = frameNumber;
      setEditing(null);
      setEditLumen(null);
      setEditVessel(null);
      setDraggingIndex(null);
    }
  }, [frameNumber]);

  // Resolve the polygons to render: live edit > committed/detected.
  const storePolys = useMemo(
    () => getBorderPolygons(frameNumber),
    [frameNumber, editTick],
  );
  const lumenPoints: Point[] = editLumen ?? storePolys.lumen;
  const vesselPoints: Point[] = editVessel ?? storePolys.vessel;

  const lumenPath = useMemo(() => pointsToSmoothPath(lumenPoints), [lumenPoints]);
  const vesselPath = useMemo(() => pointsToSmoothPath(vesselPoints), [vesselPoints]);

  // ------------------------------------------------------------------
  // Interaction handlers
  // ------------------------------------------------------------------

  const enterEdit = (target: EditTarget) => {
    if (!interactive || target === null) return;
    // Seed the in-progress polygon from whatever's currently being rendered.
    // Users can add handles by clicking on the line, or delete by dragging onto a neighbor.
    if (target === 'lumen' && !editLumen) {
      setEditLumen(editableHandles(storePolys.lumen));
    }
    if (target === 'vessel' && !editVessel) {
      setEditVessel(editableHandles(storePolys.vessel));
    }
    setEditing(target);
  };

  /** Insert a new edit handle on the polygon edge nearest `clickPt`. */
  const insertEditPoint = (clickPt: Point, kind: 'lumen' | 'vessel') => {
    const setter = kind === 'lumen' ? setEditLumen : setEditVessel;
    setter((prev) => {
      if (!prev || prev.length === 0) return prev;
      const { insertAt, proj } = findInsertion(clickPt, prev);
      const next = prev.slice();
      next.splice(insertAt, 0, proj);
      return next;
    });
  };

  const commitAndExit = () => {
    if (editing === 'lumen' && editLumen) {
      commitBorderEdit(frameNumber, 'lumen', editLumen);
    } else if (editing === 'vessel' && editVessel) {
      commitBorderEdit(frameNumber, 'vessel', editVessel);
    }
    setEditing(null);
    setEditLumen(null);
    setEditVessel(null);
    setDraggingIndex(null);
  };

  useImperativeHandle(ref, () => ({
    commitPendingEdits: commitAndExit,
  }));

  const toLocalCoords = useCallback((clientX: number, clientY: number): Point | null => {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    // SVG viewBox is REFERENCE_SIZE x REFERENCE_SIZE, displayed at containerSize.
    const scale = REFERENCE_SIZE / rect.width;
    return {
      x: (clientX - rect.left) * scale,
      y: (clientY - rect.top) * scale,
    };
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      if (draggingIndex === null || editing === null) return;
      const pt = toLocalCoords(e.clientX, e.clientY);
      if (!pt) return;
      const setter = editing === 'lumen' ? setEditLumen : setEditVessel;
      setter((prev) => {
        if (!prev) return prev;
        const next = prev.slice();
        next[draggingIndex] = pt;
        return next;
      });
    },
    [draggingIndex, editing, toLocalCoords],
  );

  const handlePointerUp = useCallback(() => {
    // If a handle was being dragged and was dropped onto (or very close to)
    // one of its immediate neighbors, delete the dragged handle (down to MIN_EDIT_POINTS).
    if (draggingIndex !== null && editing !== null) {
      const polygon = editing === 'lumen' ? editLumen : editVessel;
      const setter = editing === 'lumen' ? setEditLumen : setEditVessel;
      if (polygon && polygon.length > MIN_EDIT_POINTS) {
        const i = draggingIndex;
        const cur = polygon[i];
        const prev = polygon[(i - 1 + polygon.length) % polygon.length];
        const nxt = polygon[(i + 1) % polygon.length];
        const dPrev = Math.hypot(cur.x - prev.x, cur.y - prev.y);
        const dNext = Math.hypot(cur.x - nxt.x, cur.y - nxt.y);
        if (Math.min(dPrev, dNext) < MERGE_DELETE_DISTANCE) {
          setter((p) => (p ? p.filter((_, k) => k !== i) : p));
        }
      }
    }
    setDraggingIndex(null);
  }, [draggingIndex, editing, editLumen, editVessel]);

  // ------------------------------------------------------------------
  // Rendering
  // ------------------------------------------------------------------

  // Determine which points are shown as draggable dots
  const editPoints = editing === 'lumen'
    ? lumenPoints
    : editing === 'vessel'
      ? vesselPoints
      : null;
  const editColor = editing === 'lumen' ? '#21b9ff' : '#23cc72';

  // Done button position (in 720-space, top-right of the SVG)
  const doneBtn = { x: REFERENCE_SIZE - 110, y: 24, w: 90, h: 36 };

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0"
      width={containerSize}
      height={containerSize}
      viewBox={`0 0 ${REFERENCE_SIZE} ${REFERENCE_SIZE}`}
      style={{
        zIndex: 10,
        // Keep the SVG itself non-interactive; specific children opt-in below.
        pointerEvents: interactive ? 'auto' : 'none',
      }}
      onPointerMove={interactive ? handlePointerMove : undefined}
      onPointerUp={interactive ? handlePointerUp : undefined}
      onPointerLeave={interactive ? handlePointerUp : undefined}
    >
      {/* ===== Vessel boundary (green) ===== */}
      {/* Thicker invisible hit area for easier clicking when interactive */}
      {interactive && editing !== 'vessel' && (
        <path
          d={vesselPath}
          fill="none"
          stroke="transparent"
          strokeWidth={20}
          style={{ cursor: 'pointer', pointerEvents: 'stroke' }}
          onPointerDown={(e) => {
            e.stopPropagation();
            enterEdit('vessel');
          }}
        />
      )}
      <path
        d={vesselPath}
        fill="none"
        stroke="#23cc72"
        strokeWidth={editing === 'vessel' ? 5 : 4}
        strokeOpacity={editing === 'lumen' ? 0.45 : 0.9}
        style={{ pointerEvents: 'none' }}
      />

      {/* ===== Lumen boundary (blue) ===== */}
      {showLumen && interactive && editing !== 'lumen' && (
        <path
          d={lumenPath}
          fill="none"
          stroke="transparent"
          strokeWidth={20}
          style={{ cursor: 'pointer', pointerEvents: 'stroke' }}
          onPointerDown={(e) => {
            e.stopPropagation();
            enterEdit('lumen');
          }}
        />
      )}
      {showLumen && (
        <path
          d={lumenPath}
          fill="none"
          stroke="#21b9ff"
          strokeWidth={editing === 'lumen' ? 5 : 4}
          strokeOpacity={editing === 'vessel' ? 0.45 : 0.9}
          style={{ pointerEvents: 'none' }}
        />
      )}

      {/* ===== Click-to-insert hit area (only while editing this border) =====
          Rendered BEFORE the handle dots so the dots' larger hit areas win
          when the user clicks near an existing handle. */}
      {editing === 'lumen' && editLumen && (
        <path
          d={lumenPath}
          fill="none"
          stroke="transparent"
          strokeWidth={20}
          style={{ cursor: 'copy', pointerEvents: 'stroke' }}
          onPointerDown={(e) => {
            e.stopPropagation();
            const pt = toLocalCoords(e.clientX, e.clientY);
            if (pt) insertEditPoint(pt, 'lumen');
          }}
        />
      )}
      {editing === 'vessel' && editVessel && (
        <path
          d={vesselPath}
          fill="none"
          stroke="transparent"
          strokeWidth={20}
          style={{ cursor: 'copy', pointerEvents: 'stroke' }}
          onPointerDown={(e) => {
            e.stopPropagation();
            const pt = toLocalCoords(e.clientX, e.clientY);
            if (pt) insertEditPoint(pt, 'vessel');
          }}
        />
      )}

      {/* ===== Edit handles ===== */}
      {editPoints && editPoints.map((p, i) => (
        <g key={i}>
          {/* Large invisible hit area */}
          <circle
            cx={p.x}
            cy={p.y}
            r={20}
            fill="transparent"
            style={{ cursor: 'grab', pointerEvents: 'auto' }}
            onPointerDown={(e) => {
              e.stopPropagation();
              (e.target as Element).setPointerCapture?.(e.pointerId);
              setDraggingIndex(i);
            }}
          />
          {/* Visible dot */}
          <circle
            cx={p.x}
            cy={p.y}
            r={draggingIndex === i ? 10 : 8}
            fill="#ffffff"
            stroke={editColor}
            strokeWidth={3}
            style={{ pointerEvents: 'none' }}
          />
        </g>
      ))}

      {/* ===== Done button ===== */}
      {editing !== null && (
        <g
          style={{ cursor: 'pointer', pointerEvents: 'auto' }}
          onPointerDown={(e) => {
            e.stopPropagation();
            commitAndExit();
          }}
        >
          <rect
            x={doneBtn.x}
            y={doneBtn.y}
            width={doneBtn.w}
            height={doneBtn.h}
            rx={6}
            fill={editColor}
            opacity={0.95}
          />
          <text
            x={doneBtn.x + doneBtn.w / 2}
            y={doneBtn.y + doneBtn.h / 2 + 6}
            textAnchor="middle"
            fontSize={18}
            fontWeight={700}
            fill="#0b1b2a"
            style={{ fontFamily: 'CentraleSans, sans-serif', userSelect: 'none' }}
          >
            Done
          </text>
        </g>
      )}
    </svg>
  );
});

