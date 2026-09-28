import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Circle } from "lucide-react";
import { NavigationBar } from "./NavigationBar";
import {
  APP_CONSTANTS,
  Leg,
  RULER_PATH_DATA_LEFT,
  RULER_PATH_DATA_RIGHT,
  INDICATOR_OFFSETS_LEFT,
  INDICATOR_OFFSETS_RIGHT,
  RulerPathPoint,
} from "./constants/appConstants";
import { BookmarkData, ConfirmedSegment } from "./types";
import svgPaths from "../imports/svg-htfrh24qmy";

// NOTE: all colors/sizes below are inline styles rather than Tailwind
// arbitrary-value classNames on purpose - Tailwind's `@source` in
// src/styles/tailwind.css only scans the root `src/**` tree, so a brand-new
// bracket className under intrasight-distant-future/src silently compiles to
// nothing unless that exact string happens to already exist elsewhere under
// root src/** (see BorderTool.tsx/RoadmapTool.tsx for the same gotcha).

export interface DeployAssistPullback {
  leg: Leg;
  label: string;
  segments: ConfirmedSegment[];
  bookmarks: BookmarkData[];
}

interface DeployAssistScreenProps {
  pullbacks: DeployAssistPullback[];
  initialSelectedLeg: Leg;
  onBackToIVUS: () => void;
  onGoLive: () => void;
}

// Total frames in the shared "treatment" fluoro clip (public/frames/treatment).
const TREATMENT_TOTAL_FRAMES = 2258;
const TREATMENT_FPS = 30;

// Same 718x796 video-relative box the live/analysis roadmap overlay uses to
// place the diamond indicator - reusing it (with each leg's OWN static path
// data, not the mutable "active leg" globals) lets flags for both legs be
// positioned along their real catheter path regardless of which leg is
// currently active in the rest of the app.
const ROADMAP_BOX = { width: 718, height: 796 };
const LIVE_XRAY_SIZE = { width: 934, height: 938 };

function interpolateRulerPath(path: RulerPathPoint[], progress: number): { x: number; y: number } {
  let lower = path[0];
  let upper = path[path.length - 1];
  for (let i = 0; i < path.length - 1; i++) {
    if (progress >= path[i].progress && progress <= path[i + 1].progress) {
      lower = path[i];
      upper = path[i + 1];
      break;
    }
  }
  const t = (progress - lower.progress) / (upper.progress - lower.progress) || 0;
  return { x: lower.x + (upper.x - lower.x) * t, y: lower.y + (upper.y - lower.y) * t };
}

function getRulerPosition(leg: Leg, time: number): { x: number; y: number } {
  const path = leg === "right" ? RULER_PATH_DATA_RIGHT : RULER_PATH_DATA_LEFT;
  const offsets = leg === "right" ? INDICATOR_OFFSETS_RIGHT : INDICATOR_OFFSETS_LEFT;
  const progress = Math.min(Math.max(time / APP_CONSTANTS.DURATION, 0), 1);
  const position = interpolateRulerPath(path, progress);
  return { x: offsets.x + position.x, y: offsets.y + position.y };
}

function getFlagFraction(leg: Leg, time: number): { xFrac: number; yFrac: number } {
  const { x, y } = getRulerPosition(leg, time);
  return {
    xFrac: x / ROADMAP_BOX.width,
    yFrac: y / ROADMAP_BOX.height,
  };
}

function segmentTimeBounds(segment: ConfirmedSegment): { leftTime: number; rightTime: number } {
  const { ILD_LEFT_BOUNDARY, ILD_USABLE_WIDTH } = APP_CONSTANTS.MAIN_SCREEN;
  const leftTime = ((segment.left - ILD_LEFT_BOUNDARY) / ILD_USABLE_WIDTH) * APP_CONSTANTS.DURATION;
  const rightTime = ((segment.left + segment.width - ILD_LEFT_BOUNDARY) / ILD_USABLE_WIDTH) * APP_CONSTANTS.DURATION;
  return { leftTime, rightTime };
}

function Flag({ xFrac, yFrac, color, label }: { xFrac: number; yFrac: number; color: string; label: string | number }) {
  return (
    <div
      style={{
        position: "absolute",
        left: `${xFrac * 100}%`,
        top: `${yFrac * 100}%`,
        transform: "translate(-50%, -100%)",
        width: 24,
        height: 24,
        pointerEvents: "none",
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M18 23L12 17L6 23V1H18V23Z" fill={color} />
      </svg>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 2,
          transform: "translateX(-50%)",
          fontFamily: "CentraleSans, sans-serif",
          fontWeight: 700,
          fontSize: 11,
          lineHeight: "14px",
          color: "#000000",
        }}
      >
        {label}
      </div>
    </div>
  );
}

function SegmentOverlay({ leg, segment }: { leg: Leg; segment: ConfirmedSegment }) {
  const { leftTime, rightTime } = segmentTimeBounds(segment);
  const centerTime = (leftTime + rightTime) / 2;
  const pathPoints = Array.from({ length: 51 }, (_, index) => {
    const time = leftTime + (rightTime - leftTime) * (index / 50);
    const position = getRulerPosition(leg, time);
    return {
      x: (position.x / ROADMAP_BOX.width) * LIVE_XRAY_SIZE.width,
      y: (position.y / ROADMAP_BOX.height) * LIVE_XRAY_SIZE.height,
    };
  });

  let pathD = `M ${pathPoints[0].x} ${pathPoints[0].y}`;
  for (let index = 1; index < pathPoints.length - 1; index++) {
    const current = pathPoints[index];
    const next = pathPoints[index + 1];
    pathD += ` Q ${current.x} ${current.y}, ${(current.x + next.x) / 2} ${(current.y + next.y) / 2}`;
  }
  const lastPoint = pathPoints[pathPoints.length - 1];
  const secondLast = pathPoints[pathPoints.length - 2];
  pathD += ` Q ${secondLast.x} ${secondLast.y}, ${lastPoint.x} ${lastPoint.y}`;

  const leftPosition = getRulerPosition(leg, leftTime);
  const rightPosition = getRulerPosition(leg, rightTime);
  const centerX = ((leftPosition.x + rightPosition.x) / 2 / ROADMAP_BOX.width) * LIVE_XRAY_SIZE.width;
  const centerY = ((leftPosition.y + rightPosition.y) / 2 / ROADMAP_BOX.height) * LIVE_XRAY_SIZE.height;
  const timeDelta = (rightTime - leftTime) * 0.05;
  const beforePosition = getRulerPosition(leg, centerTime - timeDelta);
  const afterPosition = getRulerPosition(leg, centerTime + timeDelta);
  const dx = ((afterPosition.x - beforePosition.x) / ROADMAP_BOX.width) * LIVE_XRAY_SIZE.width;
  const dy = ((afterPosition.y - beforePosition.y) / ROADMAP_BOX.height) * LIVE_XRAY_SIZE.height;
  const rotationAngle = Math.atan2(dy, dx) * (180 / Math.PI);

  return (
    <>
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${LIVE_XRAY_SIZE.width} ${LIVE_XRAY_SIZE.height}`}
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 60, pointerEvents: "none" }}
      >
        <path
          d={pathD}
          stroke="rgba(255, 255, 255, 0.25)"
          strokeWidth="36"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <div
        style={{
          position: "absolute",
          left: `${(centerX / LIVE_XRAY_SIZE.width) * 100}%`,
          top: `${(centerY / LIVE_XRAY_SIZE.height) * 100}%`,
          transform: `translate(-50%, -50%) rotate(${rotationAngle}deg)`,
          zIndex: 63,
          pointerEvents: "none",
          backgroundColor: "#000000",
          border: "1px solid #FFFFFF",
          borderRadius: 15,
          padding: "0 10px",
          height: 23,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          whiteSpace: "nowrap",
          color: "#FFFFFF",
          fontFamily: "CentraleSans, sans-serif",
          fontSize: 14,
          fontWeight: 700,
          lineHeight: "20px",
        }}
      >
        {segment.label} {segment.length} mm
      </div>
    </>
  );
}

function PullbackCard({
  pullback,
  checked,
  onToggle,
}: {
  pullback: DeployAssistPullback;
  checked: boolean;
  onToggle: () => void;
}) {
  const thumbnailSrc = `/frames/postrecord-${pullback.leg}-leg/frame_0001.jpg`;
  const hasAnnotations = pullback.segments.length > 0 || pullback.bookmarks.length > 0;

  return (
    <div
      style={{
        position: "relative",
        width: 229,
        height: 309,
        backgroundColor: "#000000",
        overflow: "hidden",
        borderRadius: 2,
        flexShrink: 0,
      }}
    >
      <img
        src={thumbnailSrc}
        alt={pullback.label}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
      <button
        onClick={onToggle}
        aria-label={`Toggle ${pullback.label}`}
        style={{
          position: "absolute",
          left: 8,
          top: 8,
          width: 20,
          height: 20,
          borderRadius: 2,
          border: checked ? "none" : "1px solid #8c8c8c",
          backgroundColor: checked ? "#696969" : "#212121",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          padding: 0,
        }}
      >
        {checked && (
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M2 8.5L6 12.5L14 3.5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
      <div
        style={{
          position: "absolute",
          left: 8,
          bottom: 8,
          right: 8,
          backgroundColor: "rgba(30,36,42,0.84)",
          borderRadius: 8,
          padding: "6px 10px",
          color: "#FFFFFF",
          fontFamily: "CentraleSans, sans-serif",
          fontWeight: 500,
          fontSize: 10,
          lineHeight: "14px",
        }}
      >
        {pullback.label}
        {hasAnnotations
          ? ` \u00b7 ${pullback.segments.length} segment${pullback.segments.length === 1 ? "" : "s"}, ${pullback.bookmarks.length} bookmark${pullback.bookmarks.length === 1 ? "" : "s"}`
          : " \u00b7 No annotations yet"}
      </div>
    </div>
  );
}

function ActionBarButton({ label, icon, onClick, primary }: { label: string; icon: React.ReactNode; onClick?: () => void; primary?: boolean }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 214,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        borderRadius: 2,
        border: "none",
        backgroundColor: primary ? "#1474a4" : "rgba(89,89,89,0.55)",
        color: primary ? "#FFFFFF" : "#e8e8e8",
        fontFamily: "CentraleSans, sans-serif",
        fontSize: 16,
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <span style={{ width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {icon}
      </span>
      {label}
    </button>
  );
}

export function DeployAssistScreen({ pullbacks, initialSelectedLeg, onBackToIVUS, onGoLive }: DeployAssistScreenProps) {
  const [checkedLegs, setCheckedLegs] = useState<Set<Leg>>(() => new Set([initialSelectedLeg]));
  const [isSpacebarPressed, setIsSpacebarPressed] = useState(false);
  const [frame, setFrame] = useState(0);
  const frameIntervalRef = useRef<number | null>(null);

  // Live X-Ray only plays the treatment footage while spacebar is held down -
  // releasing it just pauses on whatever frame is currently showing.
  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !e.repeat) {
        e.preventDefault();
        setIsSpacebarPressed(true);
      }
    };
    const onUp = (e: KeyboardEvent) => {
      if (e.code === "Space") setIsSpacebarPressed(false);
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, []);

  useEffect(() => {
    if (isSpacebarPressed) {
      frameIntervalRef.current = window.setInterval(() => {
        setFrame((prev) => (prev + 1) % TREATMENT_TOTAL_FRAMES);
      }, 1000 / TREATMENT_FPS);
    }
    return () => {
      if (frameIntervalRef.current !== null) {
        clearInterval(frameIntervalRef.current);
        frameIntervalRef.current = null;
      }
    };
  }, [isSpacebarPressed]);

  const toggleLeg = (leg: Leg) => {
    setCheckedLegs((prev) => {
      const next = new Set(prev);
      if (next.has(leg)) next.delete(leg);
      else next.add(leg);
      return next;
    });
  };

  const framePath = `/frames/treatment/frame_${String(frame + 1).padStart(4, "0")}.jpg`;

  return (
    <div style={{ position: "relative", width: 1920, height: 1080, backgroundColor: "#000000", overflow: "hidden" }}>
      <NavigationBar />

      <div style={{ position: "absolute", left: 23, top: 101, width: 500 }}>
        <p style={{ margin: 0, fontFamily: "CentraleSans, sans-serif", fontWeight: 700, fontSize: 32, lineHeight: "36px", color: "rgba(255,255,255,0.8)" }}>
          Deploy Assist
        </p>
        <p style={{ margin: "12px 0 0", fontFamily: "CentraleSans, sans-serif", fontWeight: 400, fontSize: 16, lineHeight: "22px", color: "rgba(255,255,255,0.8)" }}>
          Select pullbacks to show on live X-ray
        </p>
      </div>

      {/* Left panel: created pullbacks */}
      <div
        style={{
          position: "absolute",
          left: 23,
          top: 199,
          width: 908,
          height: 781,
          backgroundColor: "#171717",
          borderRadius: 2,
          overflow: "auto",
          padding: 24,
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
          {pullbacks.map((pb) => (
            <PullbackCard key={pb.leg} pullback={pb} checked={checkedLegs.has(pb.leg)} onToggle={() => toggleLeg(pb.leg)} />
          ))}
          {pullbacks.length === 0 && (
            <p style={{ color: "#8c8c8c", fontFamily: "CentraleSans, sans-serif", fontSize: 16 }}>No pullbacks recorded yet.</p>
          )}
        </div>
      </div>

      {/* Right panel: Live X-Ray (treatment footage, gated by spacebar) */}
      <div
        style={{
          position: "absolute",
          left: 962,
          top: 68,
          width: 934,
          height: 938,
          backgroundColor: "#000000",
          overflow: "hidden",
          borderRadius: 2,
        }}
      >
        <img
          src={framePath}
          alt="Live X-Ray"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            left: 13,
            top: 18,
            backgroundColor: "rgba(0,0,0,0.5)",
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
            height: 44,
            boxSizing: "border-box",
          }}
        >
          <p style={{ margin: 0, fontFamily: "CentraleSans, sans-serif", fontSize: 20, color: "#FFFFFF" }}>Live X-Ray</p>
        </div>
        {pullbacks
          .filter((pb) => checkedLegs.has(pb.leg))
          .map((pb) => (
            <div key={pb.leg}>
              {pb.segments.map((segment) => {
                return <SegmentOverlay key={`seg-${pb.leg}-${segment.id}`} leg={pb.leg} segment={segment} />;
              })}
              {pb.bookmarks.map((bookmark) => {
                const { xFrac, yFrac } = getFlagFraction(pb.leg, bookmark.time);
                return <Flag key={`bm-${pb.leg}-${bookmark.id}`} xFrac={xFrac} yFrac={yFrac} color="#FF9F19" label={bookmark.id} />;
              })}
            </div>
          ))}
      </div>

      {/* Bottom action bar */}
      <div style={{ position: "absolute", left: 16, top: 1024, width: 1888, height: 40, display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 16 }}>
          <ActionBarButton
            label="Annotate"
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d={svgPaths.p2de5ed80} fill="#E8E8E8" /></svg>}
          />
          <ActionBarButton
            label="Save Frame"
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d={svgPaths.p28d83c80} fill="#E8E8E8" /></svg>}
          />
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <ActionBarButton label="Back to IVUS" icon={<ArrowLeft size={24} />} onClick={onBackToIVUS} />
          <ActionBarButton label="Live" icon={<Circle size={16} fill="currentColor" />} onClick={onGoLive} primary />
        </div>
      </div>
    </div>
  );
}
