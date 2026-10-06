import { useEffect, useMemo, useState } from "react";
import { getBorderMeasurements, subscribeToBorderEdits } from "../utils/ivusBorders";

interface MetricsDisplayProps {
  currentTime: number;
  duration: number;
  isCompact?: boolean; // For touch screen smaller version
  vesselOnly?: boolean;
}

export function MetricsDisplay({
  currentTime,
  duration,
  isCompact = false,
  vesselOnly = false,
}: MetricsDisplayProps) {
  void duration; // duration no longer used — kept for backwards-compatible prop signature

  // Re-render when borders are edited so metrics stay in sync.
  const [editTick, setEditTick] = useState(0);
  useEffect(() => subscribeToBorderEdits(() => setEditTick((v: number) => v + 1)), []);

  // Calculate metrics that change with time/frames
  const metrics = useMemo(() => {
    // Calculate frame number (30fps, starting at 1) — same as used by the overlay.
    const frameNumber = Math.max(1, Math.floor(currentTime * 30) + 1);

    // Derive lumen/vessel from the same keyframe-traced borders the overlay draws.
    const m = getBorderMeasurements(frameNumber);

    return {
      frameNumber,
      lumenArea: m.lumenAreaMm2.toFixed(1),
      lumenDiameter: m.lumenDiameterMm.toFixed(1),
      vesselArea: m.vesselAreaMm2.toFixed(1),
      vesselDiameter: m.vesselDiameterMm.toFixed(1),
      plaqueBurden: m.plaqueBurdenPct.toFixed(1),
      lumenMinMax: { min: m.lumenMinDiameterMm.toFixed(1), max: m.lumenMaxDiameterMm.toFixed(1) },
      vesselMinMax: { min: m.vesselMinDiameterMm.toFixed(1), max: m.vesselMaxDiameterMm.toFixed(1) },
    };
  }, [currentTime, editTick]);

  if (isCompact) {
    // Compact version for touch screen
    return (
      <div className=" text-left text-nowrap">
        {/* Frame Number */}
        <div className="absolute top-0 left-0 right-[4.43%] bottom-[93.52%]">
          <p className="font-['CentraleSans',_sans-serif] font-bold not-italic text-[18px] text-[rgba(255,255,255,0.8)] block leading-[24px] text-nowrap whitespace-pre">
            FRAME #{metrics.frameNumber}
          </p>
        </div>

        {/* Lumen Section */}
        <div className="absolute top-[35px] left-0 right-0">
          <div className="font-['CentraleSans',_sans-serif] not-italic text-[#8c8c8c] text-[16px] mb-1">
            <p className="block leading-[22px] text-nowrap whitespace-pre">
              Lumen Area
            </p>
          </div>
          <div className="font-['CentraleSans',_sans-serif] font-bold not-italic text-[#21b9ff] text-[18px] mb-1">
            <p className="block leading-[24px] text-nowrap whitespace-pre">
              {metrics.lumenArea} mm²
            </p>
          </div>
          <div className="font-['CentraleSans',_sans-serif] not-italic text-[#8c8c8c] text-[16px] mb-1">
            <p className="block leading-[22px] text-nowrap whitespace-pre">
              Diameter
            </p>
          </div>
          <div className="font-['CentraleSans',_sans-serif] font-bold not-italic text-[#21b9ff] text-[18px] mb-1">
            <p className="block leading-[24px] text-nowrap whitespace-pre">
              {metrics.lumenDiameter} mm
            </p>
          </div>
          <div className="font-['CentraleSans',_sans-serif] font-bold not-italic text-[#21b9ff] text-[14px]">
            <p className="leading-[18px] text-nowrap whitespace-pre">
              <span>{`min ${metrics.lumenMinMax.min} `}</span>
              <span className="text-[#21b9ff]">|</span>
              <span>{` max ${metrics.lumenMinMax.max}`}</span>
            </p>
          </div>
        </div>

        {/* Vessel Section */}
        <div className="absolute top-[165px] left-0 right-0">
          <div className="font-['CentraleSans',_sans-serif] not-italic text-[#8c8c8c] text-[16px] mb-1">
            <p className="block leading-[22px] text-nowrap whitespace-pre">
              Vessel Area
            </p>
          </div>
          <div className="font-['CentraleSans',_sans-serif] font-bold not-italic text-[#23cc72] text-[18px] mb-1">
            <p className="block leading-[24px] text-nowrap whitespace-pre">
              {metrics.vesselArea} mm²
            </p>
          </div>
          <div className="font-['CentraleSans',_sans-serif] not-italic text-[#8c8c8c] text-[16px] mb-1">
            <p className="block leading-[22px] text-nowrap whitespace-pre">
              Diameter
            </p>
          </div>
          <div className="font-['CentraleSans',_sans-serif] font-bold not-italic text-[#23cc72] text-[18px] mb-1">
            <p className="block leading-[24px] text-nowrap whitespace-pre">
              {metrics.vesselDiameter} mm
            </p>
          </div>
          <div className="font-['CentraleSans',_sans-serif] font-bold not-italic text-[#23cc72] text-[14px]">
            <p className="leading-[18px] text-nowrap whitespace-pre">
              <span>{`min ${metrics.vesselMinMax.min} `}</span>
              <span className="text-[#23cc72]">|</span>
              <span>{` max ${metrics.vesselMinMax.max} `}</span>
            </p>
          </div>
        </div>

        {/* Stenosis */}
        <div className="absolute top-[295px] left-0 right-0">
          <div className="font-['CentraleSans',_sans-serif] not-italic text-[#8c8c8c] text-[16px] mb-1">
            <p className="block leading-[22px] text-nowrap whitespace-pre">
              Stenosis
            </p>
          </div>
          <div className="font-['CentraleSans',_sans-serif] font-bold not-italic text-[#d780ff] text-[18px]">
            <p className="block leading-[24px] text-nowrap whitespace-pre">
              {metrics.plaqueBurden} %
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (vesselOnly) {
    return (
      <div className="leading-[0] relative w-[158px] h-[436px] text-left text-nowrap">
        <div className="absolute bottom-[93.52%] font-['CentraleSans',_sans-serif] font-bold left-0 not-italic right-[4.43%] text-[24px] text-[rgba(255,255,255,0.8)] top-0">
          <p className="block leading-[28px] text-nowrap whitespace-pre">
            FRAME #{metrics.frameNumber}
          </p>
        </div>
        <div className="absolute bottom-[83.336%] font-['CentraleSans',_sans-serif] left-0 not-italic right-[27.215%] text-[#8c8c8c] text-[20px] top-[10.183%]">
          <p className="block leading-[28px] text-nowrap whitespace-pre">
            Vessel Area
          </p>
        </div>
        <div className="absolute bottom-[76.721%] font-['CentraleSans',_sans-serif] font-bold left-0 right-[41.772%] text-[#23cc72] text-[24px] top-[16.799%]">
          <p className="block leading-[28px] text-nowrap whitespace-pre">
            {metrics.vesselArea} mm²
          </p>
        </div>
        <div className="absolute bottom-[69.896%] font-['CentraleSans',_sans-serif] left-0 not-italic right-[43.038%] text-[#8c8c8c] text-[20px] top-[23.623%]">
          <p className="block leading-[28px] text-nowrap whitespace-pre">
            Diameter
          </p>
        </div>
        <div className="absolute bottom-[63.28%] font-['CentraleSans',_sans-serif] font-bold left-0 not-italic right-[47.468%] text-[#23cc72] text-[24px] top-[30.239%]">
          <p className="block leading-[28px] text-nowrap whitespace-pre">
            {metrics.vesselDiameter} mm
          </p>
        </div>
        <div className="absolute bottom-[57.822%] font-['CentraleSans',_sans-serif] font-bold left-0 not-italic right-0 text-[#23cc72] text-[0px] top-[36.623%]">
          <p className="leading-[24px] text-[20px] text-nowrap whitespace-pre">
            <span>{`min ${metrics.vesselMinMax.min} `}</span>
            <span className="text-[#23cc72]">|</span>
            <span>{` max ${metrics.vesselMinMax.max} `}</span>
          </p>
        </div>
      </div>
    );
  }

  // Full version for main screen (matches Frame4 design)
  return (
    <div className="leading-[0] relative w-[158px] h-[436px] text-left text-nowrap">
      {/* Frame Number */}
      <div className="absolute bottom-[93.52%] font-['CentraleSans',_sans-serif] font-bold left-0 not-italic right-[4.43%] text-[24px] text-[rgba(255,255,255,0.8)] top-0">
        <p className="block leading-[28px] text-nowrap whitespace-pre">
          FRAME #{metrics.frameNumber}
        </p>
      </div>

      {/* Lumen Area */}
      <div className="absolute bottom-[83.336%] font-['CentraleSans',_sans-serif] left-0 not-italic right-[27.215%] text-[#8c8c8c] text-[20px] top-[10.183%]">
        <p className="block leading-[28px] text-nowrap whitespace-pre">
          Lumen Area
        </p>
      </div>
      <div className="absolute bottom-[76.721%] font-['CentraleSans',_sans-serif] font-bold left-0 right-[41.772%] text-[#21b9ff] text-[24px] top-[16.799%]">
        <p className="block leading-[28px] text-nowrap whitespace-pre">
          {metrics.lumenArea} mm²
        </p>
      </div>

      {/* Lumen Diameter */}
      <div className="absolute bottom-[69.896%] font-['CentraleSans',_sans-serif] left-0 not-italic right-[43.038%] text-[#8c8c8c] text-[20px] top-[23.623%]">
        <p className="block leading-[28px] text-nowrap whitespace-pre">
          Diameter
        </p>
      </div>
      <div className="absolute bottom-[63.28%] font-['CentraleSans',_sans-serif] font-bold left-0 not-italic right-[47.468%] text-[#21b9ff] text-[24px] top-[30.239%]">
        <p className="block leading-[28px] text-nowrap whitespace-pre">
          {metrics.lumenDiameter} mm
        </p>
      </div>
      <div className="absolute bottom-[57.822%] font-['CentraleSans',_sans-serif] font-bold left-0 not-italic right-0 text-[#21b9ff] text-[0px] top-[36.623%]">
        <p className="leading-[24px] text-[20px] text-nowrap whitespace-pre">
          <span>{`min ${metrics.lumenMinMax.min} `}</span>
          <span className="text-[#21b9ff]">|</span>
          <span>{` max ${metrics.lumenMinMax.max}`}</span>
        </p>
      </div>

      {/* Vessel Area */}
      <div className="absolute bottom-[44.883%] font-['CentraleSans',_sans-serif] left-0 not-italic right-[29.747%] text-[#8c8c8c] text-[20px] top-[48.637%]">
        <p className="block leading-[28px] text-nowrap whitespace-pre">
          Vessel Area
        </p>
      </div>
      <div className="absolute bottom-[38.454%] font-['CentraleSans',_sans-serif] font-bold left-0 right-[41.139%] text-[#23cc72] text-[24px] top-[55.066%]">
        <p className="block leading-[28px] text-nowrap whitespace-pre">
          {metrics.vesselArea} mm²
        </p>
      </div>

      {/* Vessel Diameter */}
      <div className="absolute bottom-[31.442%] font-['CentraleSans',_sans-serif] left-0 not-italic right-[43.038%] text-[#8c8c8c] text-[20px] top-[62.078%]">
        <p className="block leading-[28px] text-nowrap whitespace-pre">
          Diameter
        </p>
      </div>
      <div className="absolute bottom-[25.014%] font-['CentraleSans',_sans-serif] font-bold left-0 not-italic right-[46.835%] text-[#23cc72] text-[24px] top-[68.506%]">
        <p className="block leading-[28px] text-nowrap whitespace-pre">
          {metrics.vesselDiameter} mm
        </p>
      </div>
      <div className="absolute bottom-[19.369%] font-['CentraleSans',_sans-serif] font-bold left-0 not-italic right-0 text-[#23cc72] text-[0px] top-[75.077%]">
        <p className="leading-[24px] text-[20px] text-nowrap whitespace-pre">
          <span>{`min ${metrics.vesselMinMax.min} `}</span>
          <span className="text-[#23cc72]">|</span>
          <span>{` max ${metrics.vesselMinMax.max} `}</span>
        </p>
      </div>

      {/* Stenosis */}
      <div className="absolute bottom-[6.428%] font-['CentraleSans',_sans-serif] left-0 not-italic right-[10.759%] text-[#8c8c8c] text-[20px] top-[87.092%]">
        <p className="block leading-[28px] text-nowrap whitespace-pre">
          Stenosis
        </p>
      </div>
      <div className="absolute bottom-0 font-['CentraleSans',_sans-serif] font-bold left-0 not-italic right-[50.633%] text-[#d780ff] text-[24px] top-[93.52%]">
        <p className="block leading-[28px] text-nowrap whitespace-pre">
          {metrics.plaqueBurden} %
        </p>
      </div>
    </div>
  );
}