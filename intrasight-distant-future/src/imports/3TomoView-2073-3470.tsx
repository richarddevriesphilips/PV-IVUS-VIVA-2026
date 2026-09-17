import React, { useEffect, useRef } from "react";
import svgPaths from "./svg-jyq3b47uuf";
import { IVUSMeasurementOverlay } from '../components/IVUSMeasurementOverlay';
import { IVUSFramePlayer } from '../components/IVUSFramePlayer';
import { getBorderMeasurements } from '../utils/ivusBorders';

interface Component3TomoViewProps {
  segmentLeftTime?: number;
  segmentRightTime?: number;
  middleFrameTime?: number; // Independent middle frame time controlled by draggable handle
  scale?: "normal" | "compact"; // Add scale prop for touch screen
}

// Helper function to calculate lumen diameter from frame number
// Calibrated to actual measurements: frame 470 = 10.8mm
function calculateLumenDiameter(frame: number): number {
  const lumenPrimary = Math.sin(frame * 0.08) * 1.2;
  const lumenSecondary = Math.sin(frame * 0.15 + 1.5) * 0.8;
  const lumenTertiary = Math.cos(frame * 0.05 + 2.1) * 0.6;
  const lumenNoise = Math.sin(frame * 0.4) * 0.3;
  const lumenDrift = Math.sin((frame / 780) * Math.PI * 1.5) * 0.9;
  const lumenJitter = ((frame + 1) % 11) * 0.05 - 0.25;

  const lumenCombinedVariation =
    lumenPrimary +
    lumenSecondary +
    lumenTertiary +
    lumenNoise +
    lumenDrift +
    lumenJitter;

  const baseLumenDiameter = 10.8 + lumenCombinedVariation * 1.5;
  return Math.max(7.0, Math.min(14.0, baseLumenDiameter));
}

// Helper function to calculate vessel diameter from frame number
// Calibrated to actual measurements: frame 470 = 18.5mm
function calculateVesselDiameter(frame: number): number {
  const vesselPrimary = Math.sin(frame * 0.12 + 0.8) * 1.0;
  const vesselSecondary = Math.cos(frame * 0.18 + 2.4) * 0.8;
  const vesselTertiary = Math.sin(frame * 0.25 + 1.2) * 0.6;
  const vesselNoise = Math.cos(frame * 0.35 + 3.1) * 0.4;
  const vesselDrift = Math.sin((frame / 780) * Math.PI * 1.8) * 0.7;
  const vesselJitter = ((frame + 3) % 13) * 0.04 - 0.26;
  const vesselBreathing = Math.cos((frame / 780) * Math.PI * 6) * 0.15;

  const vesselCombinedVariation =
    vesselPrimary +
    vesselSecondary +
    vesselTertiary +
    vesselNoise +
    vesselDrift +
    vesselJitter +
    vesselBreathing;

  const baseVesselDiameter = 18.5 + vesselCombinedVariation * 1.8;
  return Math.max(14.0, Math.min(23.0, baseVesselDiameter));
}

function Frame78({
  scale = "normal",
}: {
  scale?: "normal" | "compact";
}) {
  const isCompact = scale === "compact";
  const textSize = isCompact ? "text-[12px]" : "text-[20px]";
  const itemHeight = isCompact ? "h-4" : "h-7";
  const lineHeight = isCompact
    ? "leading-[16px]"
    : "leading-[28px]";
  const topPosition = isCompact ? "top-5" : "top-9";
  const width = isCompact ? "w-[120px]" : "w-[180px]";

  return (
    <div
      className={`absolute box-border content-stretch flex flex-col items-start justify-start leading-[0] left-0 not-italic p-0 ${textSize} text-[rgba(255,255,255,0.8)] text-left ${topPosition} ${width}`}
      style={{ fontFamily: "CentraleSans, sans-serif" }}
    >
      <div className={`${itemHeight} relative shrink-0 w-full`}>
        <p className={`block ${lineHeight}`}>Lumen Diameter</p>
      </div>
      <div className={`${itemHeight} relative shrink-0 w-full`}>
        <p className={`block ${lineHeight}`}>Vessel Diameter</p>
      </div>
      <div className={`${itemHeight} relative shrink-0 w-full`}>
        <p className={`block ${lineHeight}`}>Stenosis</p>
      </div>
    </div>
  );
}

function Frame79({
  frameNumber,
  scale = "normal",
}: {
  frameNumber: number;
  scale?: "normal" | "compact";
}) {
  // Lumen diameter derived from the same keyframe-traced borders the overlay draws.
  const lumenDiameter = getBorderMeasurements(frameNumber).lumenDiameterMm;

  const isCompact = scale === "compact";
  const textSize = isCompact ? "text-[12px]" : "text-[20px]";
  const itemHeight = isCompact ? "h-4" : "h-6";
  const lineHeight = isCompact
    ? "leading-[16px]"
    : "leading-[24px]";
  const topPosition = isCompact ? "top-5" : "top-9";
  const width = isCompact ? "w-[46px]" : "w-[69px]";

  return (
    <div
      className={`absolute box-border content-stretch flex flex-row gap-1 items-center justify-start leading-[0] not-italic p-0 right-0 text-[#21b9ff] ${textSize} text-right ${topPosition}`}
    >
      <div
        className={`${itemHeight} relative shrink-0 ${width}`}
        style={{
          fontFamily: "CentraleSans, sans-serif",
          fontWeight: "bold",
        }}
      >
        <p className={`block ${lineHeight}`}>
          {lumenDiameter.toFixed(1)}
        </p>
      </div>
      <div
        className="relative shrink-0 text-nowrap"
        style={{ fontFamily: "CentraleSans, sans-serif" }}
      >
        <p className={`block ${lineHeight} whitespace-pre`}>
          mm
        </p>
      </div>
    </div>
  );
}

function Frame81({
  frameNumber,
  scale = "normal",
}: {
  frameNumber: number;
  scale?: "normal" | "compact";
}) {
  // Vessel diameter derived from the same keyframe-traced borders the overlay draws.
  const vesselDiameter = getBorderMeasurements(frameNumber).vesselDiameterMm;

  const isCompact = scale === "compact";
  const valueTextSize = isCompact
    ? "text-[12px]"
    : "text-[20px]";
  const unitTextSize = isCompact
    ? "text-[12px]"
    : "text-[20px]";
  const itemHeight = isCompact ? "h-4" : "h-6";
  const lineHeight = isCompact
    ? "leading-[16px]"
    : "leading-[24px]";
  const topPosition = isCompact ? "top-8" : "top-16";
  const width = isCompact ? "w-[52px]" : "w-[79px]";

  return (
    <div
      className={`absolute box-border content-stretch flex flex-row items-center justify-start leading-[0] not-italic p-0 right-0 text-[#23cc72] text-right ${topPosition}`}
      style={{
        fontFamily: "CentraleSans, sans-serif",
        fontWeight: "bold",
      }}
    >
      <div
        className={`${itemHeight} relative shrink-0 ${valueTextSize} ${width}`}
      >
        <p className={`block ${lineHeight}`}>
          {vesselDiameter.toFixed(1)}
        </p>
      </div>
      <div className="relative shrink-0 text-[0px] text-nowrap">
        <p
          className={`${lineHeight} text-[#23cc72] ${unitTextSize} whitespace-pre`}
        >
          {" "}
          <span
            style={{
              fontFamily: "CentraleSans, sans-serif",
              fontWeight: "normal",
            }}
          >
            mm
          </span>
        </p>
      </div>
    </div>
  );
}

function Frame82({
  frameNumber,
  scale = "normal",
}: {
  frameNumber: number;
  scale?: "normal" | "compact";
}) {
  // Plaque burden derived from the same keyframe-traced borders the overlay draws.
  const plaqueBurden = getBorderMeasurements(frameNumber).plaqueBurdenPct;

  const isCompact = scale === "compact";
  const textSize = isCompact ? "text-[12px]" : "text-[20px]";
  const itemHeight = isCompact ? "h-4" : "h-6";
  const lineHeight = isCompact
    ? "leading-[16px]"
    : "leading-[24px]";
  const topPosition = isCompact ? "top-12" : "top-[88px]";
  const width = isCompact ? "w-[46px]" : "w-[69px]";

  return (
    <div
      className={`absolute box-border content-stretch flex flex-row gap-1 items-center justify-start leading-[0] not-italic p-0 right-0 text-[#cf66ff] ${textSize} text-right ${topPosition}`}
    >
      <div
        className={`${itemHeight} relative shrink-0 ${width}`}
        style={{
          fontFamily: "CentraleSans, sans-serif",
          fontWeight: "bold",
        }}
      >
        <p className={`block ${lineHeight}`}>
          {plaqueBurden.toFixed(1)}
        </p>
      </div>
      <div
        className="relative shrink-0 text-nowrap"
        style={{ fontFamily: "CentraleSans, sans-serif" }}
      >
        <p className={`block ${lineHeight} whitespace-pre`}>
          %
        </p>
      </div>
    </div>
  );
}

function TomoMetrics({
  frameNumber,
  scale = "normal",
}: {
  frameNumber: number;
  scale?: "normal" | "compact";
}) {
  const isCompact = scale === "compact";
  const topPosition = isCompact ? "top-[270px]" : "top-[382px]";
  const height = isCompact ? "h-[70px]" : "h-[120px]";
  const titleSize = isCompact ? "text-[14px]" : "text-[24px]";
  const titleLeading = isCompact
    ? "leading-[16px]"
    : "leading-[28px]";
  const horizontalPadding = isCompact
    ? "left-2 right-2"
    : "left-4 right-4";

  return (
    <div
      className={`absolute ${horizontalPadding} ${topPosition} ${height}`}
      data-name="Tomo-Metrics"
    >
      <div
        className={`absolute leading-[0] left-0 not-italic ${titleSize} text-[rgba(255,255,255,0.8)] text-left text-nowrap top-0`}
        style={{
          fontFamily: "CentraleSans, sans-serif",
          fontWeight: "bold",
        }}
      >
        <p className={`block ${titleLeading} whitespace-pre`}>
          #{frameNumber} DISTAL
        </p>
      </div>
      <Frame78 scale={scale} />
      <Frame79 frameNumber={frameNumber} scale={scale} />
      <Frame81 frameNumber={frameNumber} scale={scale} />
      <Frame82 frameNumber={frameNumber} scale={scale} />
    </div>
  );
}

function SegmentTomoViewDefault() {
  return (
    <div
      className="absolute bottom-[41.5%] left-[41.5%] right-[41.5%] top-[41.75%]"
      data-name="Segment Tomo view/Default"
    ></div>
  );
}

function SegmentTomoViewDefault1() {
  return <div />;
}

function SegmentTomoView({
  videoTime,
  frameNumber,
  scale = "normal",
}: {
  videoTime: number;
  frameNumber: number;
  scale?: "normal" | "compact";
}) {
  const isCompact = scale === "compact";
  const containerSize = isCompact
    ? "size-[260px]"
    : "size-[382px]";
  const videoSize = isCompact
    ? "w-[240px] h-[240px]"
    : "w-[350px] h-[350px]";
  const leftPosition = isCompact ? "left-2" : "left-4";

  const lumenDiameter = calculateLumenDiameter(frameNumber);
  const vesselDiameter = calculateVesselDiameter(frameNumber);
  const actualVideoSize = isCompact ? 240 : 350;

  return (
    <div
      className={`absolute ${leftPosition} ${containerSize} top-0 flex items-center justify-center`}
      data-name="Segment Tomo view"
    >
      <div className="absolute flex inset-0 items-center justify-center">
        <IVUSFramePlayer
          currentTime={videoTime}
          className={`${videoSize} rounded-full`}
        />
        
        {/* Measurement Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transform: 'translate(16px, 16px)' }}>
          <IVUSMeasurementOverlay
            lumenDiameter={lumenDiameter}
            vesselDiameter={vesselDiameter}
            containerSize={actualVideoSize}
            frameNumber={frameNumber}
          />
        </div>
      </div>
      <SegmentTomoViewDefault />
      <div className="absolute bottom-[30.363%] flex items-center justify-center left-[30.522%] right-[29.772%] top-[30.113%]"></div>
      <TomoMetrics frameNumber={frameNumber} scale={scale} />
    </div>
  );
}

function SegmentTomoView1({
  videoTime,
  frameNumber,
  scale = "normal",
}: {
  videoTime: number;
  frameNumber: number;
  scale?: "normal" | "compact";
}) {
  const isCompact = scale === "compact";
  const containerSize = isCompact
    ? "size-[260px]"
    : "size-[382px]";
  const videoSize = isCompact
    ? "w-[240px] h-[240px]"
    : "w-[350px] h-[350px]";
  const leftPosition = isCompact
    ? "left-[264px]"
    : "left-[416px]";

  const lumenDiameter = calculateLumenDiameter(frameNumber);
  const vesselDiameter = calculateVesselDiameter(frameNumber);
  const actualVideoSize = isCompact ? 240 : 350;

  return (
    <div
      className={`absolute ${leftPosition} ${containerSize} top-0`}
      data-name="Segment Tomo view"
    >
      <div className="absolute flex inset-0 items-center justify-center">
        <IVUSFramePlayer
          currentTime={videoTime}
          className={`${videoSize} rounded-full`}
        />
        
        {/* Measurement Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transform: 'translate(16px, 16px)' }}>
          <IVUSMeasurementOverlay
            lumenDiameter={lumenDiameter}
            vesselDiameter={vesselDiameter}
            containerSize={actualVideoSize}
            frameNumber={frameNumber}
          />
        </div>
      </div>
      <div className="absolute bottom-[40.045%] flex items-center justify-center left-[39.747%] right-[39.674%] top-[39.199%]">
        <div
          className={`flex-none ${isCompact ? "h-[38px] w-[39px]" : "h-[67px] w-[68px]"} rotate-[75deg]`}
        >
          <SegmentTomoViewDefault2 />
        </div>
      </div>
      <div className="absolute bottom-[29.619%] flex items-center justify-center left-[29.869%] right-[29.119%] top-[29.369%]">
        <div
          className={`flex-none ${isCompact ? "h-[66px] w-[67px]" : "h-[115px] w-[117px]"} rotate-[45deg]`}
        >
          <SegmentTomoViewDefault3 />
        </div>
      </div>
      <TomoMetrics1 frameNumber={frameNumber} scale={scale} />
    </div>
  );
}

function SegmentTomoView2({
  videoTime,
  frameNumber,
  scale = "normal",
}: {
  videoTime: number;
  frameNumber: number;
  scale?: "normal" | "compact";
}) {
  const isCompact = scale === "compact";
  const containerSize = isCompact
    ? "size-[260px]"
    : "size-[382px]";
  const videoSize = isCompact
    ? "w-[240px] h-[240px]"
    : "w-[350px] h-[350px]";
  const leftPosition = isCompact
    ? "left-[528px]"
    : "left-[816px]";

  const lumenDiameter = calculateLumenDiameter(frameNumber);
  const vesselDiameter = calculateVesselDiameter(frameNumber);
  const actualVideoSize = isCompact ? 240 : 350;

  return (
    <div
      className={`absolute ${leftPosition} ${containerSize} top-0 flex items-center justify-center`}
      data-name="Segment Tomo view"
    >
      <IVUSFramePlayer
        currentTime={videoTime}
        className={`${videoSize} rounded-full`}
      />
      
      {/* Measurement Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transform: 'translate(16px, 16px)' }}>
        <IVUSMeasurementOverlay
          lumenDiameter={lumenDiameter}
          vesselDiameter={vesselDiameter}
          containerSize={actualVideoSize}
          frameNumber={frameNumber}
        />
      </div>
      
      <SegmentTomoViewDefault4 />
      <div className="absolute bottom-[30.363%] flex items-center justify-center left-[30.522%] right-[29.772%] top-[30.113%]">
        <div
          className={`flex-none ${isCompact ? "h-[66px] w-[67px]" : "h-[115px] w-[117px]"} rotate-[330deg]`}
        >
          <SegmentTomoViewDefault5 />
        </div>
      </div>
      <TomoMetrics2 frameNumber={frameNumber} scale={scale} />
    </div>
  );
}

function Frame80({
  scale = "normal",
}: {
  scale?: "normal" | "compact";
}) {
  const isCompact = scale === "compact";
  const textSize = isCompact ? "text-[12px]" : "text-[20px]";
  const itemHeight = isCompact ? "h-4" : "h-7";
  const lineHeight = isCompact
    ? "leading-[16px]"
    : "leading-[28px]";
  const topPosition = isCompact ? "top-5" : "top-9";
  const width = isCompact ? "w-[120px]" : "w-[180px]";

  return (
    <div
      className={`absolute box-border content-stretch flex flex-col items-start justify-start leading-[0] left-0 not-italic p-0 ${textSize} text-[rgba(255,255,255,0.8)] text-left ${topPosition} ${width}`}
      style={{ fontFamily: "CentraleSans, sans-serif" }}
    >
      <div className={`${itemHeight} relative shrink-0 w-full`}>
        <p className={`block ${lineHeight}`}>Lumen Diameter</p>
      </div>
      <div className={`${itemHeight} relative shrink-0 w-full`}>
        <p className={`block ${lineHeight}`}>Vessel Diameter</p>
      </div>
      <div className={`${itemHeight} relative shrink-0 w-full`}>
        <p className={`block ${lineHeight}`}>Stenosis</p>
      </div>
    </div>
  );
}

function Frame83({
  frameNumber,
  scale = "normal",
}: {
  frameNumber: number;
  scale?: "normal" | "compact";
}) {
  // Lumen diameter derived from the same keyframe-traced borders the overlay draws.
  const lumenDiameter = getBorderMeasurements(frameNumber).lumenDiameterMm;

  const isCompact = scale === "compact";
  const textSize = isCompact ? "text-[12px]" : "text-[20px]";
  const itemHeight = isCompact ? "h-4" : "h-6";
  const lineHeight = isCompact
    ? "leading-[16px]"
    : "leading-[24px]";
  const topPosition = isCompact ? "top-5" : "top-9";
  const width = isCompact ? "w-[46px]" : "w-[69px]";

  return (
    <div
      className={`absolute box-border content-stretch flex flex-row gap-1 items-center justify-start leading-[0] not-italic p-0 right-0 text-[#21b9ff] ${textSize} text-right ${topPosition}`}
    >
      <div
        className={`${itemHeight} relative shrink-0 ${width}`}
        style={{
          fontFamily: "CentraleSans, sans-serif",
          fontWeight: "bold",
        }}
      >
        <p className={`block ${lineHeight}`}>
          {lumenDiameter.toFixed(1)}
        </p>
      </div>
      <div
        className="relative shrink-0 text-nowrap"
        style={{ fontFamily: "CentraleSans, sans-serif" }}
      >
        <p className={`block ${lineHeight} whitespace-pre`}>
          mm
        </p>
      </div>
    </div>
  );
}

function Frame84({
  frameNumber,
  scale = "normal",
}: {
  frameNumber: number;
  scale?: "normal" | "compact";
}) {
  // Vessel diameter derived from the same keyframe-traced borders the overlay draws.
  const vesselDiameter = getBorderMeasurements(frameNumber).vesselDiameterMm;

  const isCompact = scale === "compact";
  const valueTextSize = isCompact
    ? "text-[12px]"
    : "text-[20px]";
  const unitTextSize = isCompact
    ? "text-[12px]"
    : "text-[20px]";
  const itemHeight = isCompact ? "h-4" : "h-6";
  const lineHeight = isCompact
    ? "leading-[16px]"
    : "leading-[24px]";
  const topPosition = isCompact ? "top-8" : "top-16";
  const width = isCompact ? "w-[52px]" : "w-[79px]";

  return (
    <div
      className={`absolute box-border content-stretch flex flex-row items-center justify-start leading-[0] not-italic p-0 right-0 text-[#23cc72] text-right ${topPosition}`}
      style={{
        fontFamily: "CentraleSans, sans-serif",
        fontWeight: "bold",
      }}
    >
      <div
        className={`${itemHeight} relative shrink-0 ${valueTextSize} ${width}`}
      >
        <p className={`block ${lineHeight}`}>
          {vesselDiameter.toFixed(1)}
        </p>
      </div>
      <div className="relative shrink-0 text-[0px] text-nowrap">
        <p
          className={`${lineHeight} text-[#23cc72] ${unitTextSize} whitespace-pre`}
        >
          {" "}
          <span
            style={{
              fontFamily: "CentraleSans, sans-serif",
              fontWeight: "normal",
            }}
          >
            mm
          </span>
        </p>
      </div>
    </div>
  );
}

function Frame85({
  frameNumber,
  scale = "normal",
}: {
  frameNumber: number;
  scale?: "normal" | "compact";
}) {
  // Calculate dynamic plaque burden based on frame number
  const calculatePlaqueBurden = (frame: number) => {
    // Calculate lumen diameter using same method as Frame83
    const lumenPrimary = Math.sin(frame * 0.08) * 0.6;
    const lumenSecondary = Math.sin(frame * 0.15 + 1.5) * 0.4;
    const lumenTertiary = Math.cos(frame * 0.05 + 2.1) * 0.3;
    const lumenNoise = Math.sin(frame * 0.4) * 0.2;
    const lumenDrift =
      Math.sin((frame / 780) * Math.PI * 1.5) * 0.4;
    const lumenJitter = ((frame + 1) % 11) * 0.03 - 0.15;

    const lumenCombinedVariation =
      lumenPrimary +
      lumenSecondary +
      lumenTertiary +
      lumenNoise +
      lumenDrift +
      lumenJitter;
    const baseLumenDiameter = 5.0 + lumenCombinedVariation * 2;
    const lumenDiameter = Math.max(
      3.0,
      Math.min(7.0, baseLumenDiameter),
    );

    // Calculate vessel diameter using same method as Frame84
    const vesselPrimary = Math.sin(frame * 0.12 + 0.8) * 0.5;
    const vesselSecondary = Math.cos(frame * 0.18 + 2.4) * 0.4;
    const vesselTertiary = Math.sin(frame * 0.25 + 1.2) * 0.3;
    const vesselNoise = Math.cos(frame * 0.35 + 3.1) * 0.2;
    const vesselDrift =
      Math.sin((frame / 780) * Math.PI * 1.8) * 0.3;
    const vesselJitter = ((frame + 3) % 13) * 0.025 - 0.16;
    const vesselBreathing =
      Math.cos((frame / 780) * Math.PI * 6) * 0.08;

    const vesselCombinedVariation =
      vesselPrimary +
      vesselSecondary +
      vesselTertiary +
      vesselNoise +
      vesselDrift +
      vesselJitter +
      vesselBreathing;
    const baseVesselDiameter =
      6.0 + vesselCombinedVariation * 2;
    const vesselDiameter = Math.max(
      4.0,
      Math.min(8.0, baseVesselDiameter),
    );

    // Convert diameters to areas (π * (d/2)²)
    const lumenArea = Math.PI * Math.pow(lumenDiameter / 2, 2);
    const vesselArea =
      Math.PI * Math.pow(vesselDiameter / 2, 2);

    // Calculate plaque burden: (Vessel Area - Lumen Area) / Vessel Area * 100
    const plaqueBurden =
      ((vesselArea - lumenArea) / vesselArea) * 100;

    // Ensure plaque burden is within realistic medical range (20-80%)
    return Math.max(20, Math.min(80, plaqueBurden));
  };

  const plaqueBurden = calculatePlaqueBurden(frameNumber);

  const isCompact = scale === "compact";
  const textSize = isCompact ? "text-[12px]" : "text-[20px]";
  const itemHeight = isCompact ? "h-4" : "h-6";
  const lineHeight = isCompact
    ? "leading-[16px]"
    : "leading-[24px]";
  const topPosition = isCompact ? "top-12" : "top-[88px]";
  const width = isCompact ? "w-[46px]" : "w-[69px]";

  return (
    <div
      className={`absolute box-border content-stretch flex flex-row gap-1 items-center justify-start leading-[0] not-italic p-0 right-0 text-[#cf66ff] ${textSize} text-right ${topPosition}`}
    >
      <div
        className={`${itemHeight} relative shrink-0 ${width}`}
        style={{
          fontFamily: "CentraleSans, sans-serif",
          fontWeight: "bold",
        }}
      >
        <p className={`block ${lineHeight}`}>
          {plaqueBurden.toFixed(1)}
        </p>
      </div>
      <div
        className="relative shrink-0 text-nowrap"
        style={{ fontFamily: "CentraleSans, sans-serif" }}
      >
        <p className={`block ${lineHeight} whitespace-pre`}>
          %
        </p>
      </div>
    </div>
  );
}

function TomoMetrics1({
  frameNumber,
  scale = "normal",
}: {
  frameNumber: number;
  scale?: "normal" | "compact";
}) {
  const isCompact = scale === "compact";
  const topPosition = isCompact ? "top-[270px]" : "top-[382px]";
  const height = isCompact ? "h-[70px]" : "h-[120px]";
  const titleSize = isCompact ? "text-[14px]" : "text-[24px]";
  const titleLeading = isCompact
    ? "leading-[16px]"
    : "leading-[28px]";
  const horizontalPadding = isCompact
    ? "left-2 right-2"
    : "left-4 right-4";

  return (
    <div
      className={`absolute ${horizontalPadding} ${topPosition} ${height}`}
      data-name="Tomo-Metrics"
    >
      <div
        className={`absolute leading-[0] left-0 not-italic ${titleSize} text-[rgba(255,255,255,0.8)] text-left text-nowrap top-0`}
        style={{
          fontFamily: "CentraleSans, sans-serif",
          fontWeight: "bold",
        }}
      >
        <p className={`block ${titleLeading} whitespace-pre`}>
          #{frameNumber} FRAME
        </p>
      </div>
      <Frame80 scale={scale} />
      <Frame83 frameNumber={frameNumber} scale={scale} />
      <Frame84 frameNumber={frameNumber} scale={scale} />
      <Frame85 frameNumber={frameNumber} scale={scale} />
    </div>
  );
}

function TomoMetrics2({
  frameNumber,
  scale = "normal",
}: {
  frameNumber: number;
  scale?: "normal" | "compact";
}) {
  const isCompact = scale === "compact";
  const topPosition = isCompact ? "top-[270px]" : "top-[382px]";
  const height = isCompact ? "h-[70px]" : "h-[120px]";
  const titleSize = isCompact ? "text-[14px]" : "text-[24px]";
  const titleLeading = isCompact
    ? "leading-[16px]"
    : "leading-[28px]";
  const horizontalPadding = isCompact
    ? "left-2 right-2"
    : "left-4 right-4";

  return (
    <div
      className={`absolute ${horizontalPadding} ${topPosition} ${height}`}
      data-name="Tomo-Metrics"
    >
      <div
        className={`absolute leading-[0] left-0 not-italic ${titleSize} text-[rgba(255,255,255,0.8)] text-left text-nowrap top-0`}
        style={{
          fontFamily: "CentraleSans, sans-serif",
          fontWeight: "bold",
        }}
      >
        <p className={`block ${titleLeading} whitespace-pre`}>
          #{frameNumber} PROXIMAL
        </p>
      </div>
      <Frame80 scale={scale} />
      <Frame83 frameNumber={frameNumber} scale={scale} />
      <Frame84 frameNumber={frameNumber} scale={scale} />
      <Frame85 frameNumber={frameNumber} scale={scale} />
    </div>
  );
}

export default function Component3TomoView({
  segmentLeftTime = 0,
  segmentRightTime = 0,
  middleFrameTime = 0,
  scale = "normal",
}: Component3TomoViewProps) {
  // Convert time to frame numbers for metrics display (assuming 30 FPS)
  const leftFrameNumber = Math.round(segmentLeftTime * 30);
  const middleFrameNumber = Math.round(middleFrameTime * 30);
  const rightFrameNumber = Math.round(segmentRightTime * 30);

  const isCompact = scale === "compact";
  const containerHeight = isCompact ? "h-[300px]" : "h-[502px]";
  const containerWidth = isCompact ? "w-[788px]" : "w-[1198px]";

  return (
    <div
      className={`relative ${containerWidth} ${containerHeight}`}
      data-name="3 Tomo view"
    >
      {/* Left View - Distal */}
      <SegmentTomoView
        videoTime={segmentLeftTime}
        frameNumber={leftFrameNumber}
        scale={scale}
      />

      {/* Middle View - Middle */}
      <SegmentTomoView1
        videoTime={middleFrameTime}
        frameNumber={middleFrameNumber}
        scale={scale}
      />

      {/* Right View - Proximal */}
      <SegmentTomoView2
        videoTime={segmentRightTime}
        frameNumber={rightFrameNumber}
        scale={scale}
      />
    </div>
  );
}