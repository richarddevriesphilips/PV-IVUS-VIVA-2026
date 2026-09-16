import React from "react";
import svgPaths from "./svg-s2qbdj5vpp";

interface IldSegmentProps {
  width?: number;
  onResizeStart?: (e: React.MouseEvent, handle: 'left' | 'right') => void;
  onDragStart?: (e: React.MouseEvent) => void;
  label?: string;
}

function NavigationRight32() {
  return (
    <div
      className="absolute right-[-3px] size-8 top-[84px] z-30"
      data-name="NavigationRight_32"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="NavigationRight_32">
          <path d={svgPaths.p1c279100} fill="var(--fill-0, black)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function SegmentRightSmall({ onResizeStart }: { onResizeStart?: (e: React.MouseEvent, handle: 'left' | 'right') => void }) {
  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onResizeStart) {
      onResizeStart(e, 'right');
    }
  };

  return (
    <div
      className="absolute bottom-[0.455px] right-1 top-px w-8 cursor-ew-resize z-20"
      data-name="Segment_Right Small"
      onMouseDown={handleMouseDown}
    >
      <div
        className="absolute bottom-[-0.192%] left-[6.25%] right-[87.5%] top-0"
        data-name="Union"
      >
        <div className="absolute bottom-0 left-0 right-0 top-0">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 2 177"
          >
            <path
              d="M2 176.885H0V0H2V176.885Z"
              fill="var(--fill-0, #FFDD19)"
              id="Union"
              opacity="0.7"
            />
          </svg>
        </div>
      </div>
      <div
        className="absolute bottom-[33.161%] left-[6.25%] right-[-12.5%] top-[46.447%]"
        data-name="Union"
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 34 36"
        >
          <path
            d={svgPaths.p33d96700}
            fill="var(--fill-0, #FFDD19)"
            id="Union"
          />
        </svg>
      </div>
      <NavigationRight32 />
      <div className="absolute flex h-[12px] items-center justify-center right-7 top-[-1px] w-[10px]">
        <div className="flex-none rotate-[270deg]">
          <div className="h-2.5 relative w-3">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 12 10"
            >
              <path
                d="M6 0L0 6V10H12V6L6 0Z"
                fill="var(--fill-0, #FFDD19)"
                id="Vector 96"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavigationRight33() {
  return (
    <div className="relative size-8" data-name="NavigationRight_32">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="NavigationRight_32">
          <path d={svgPaths.p1c279100} fill="var(--fill-0, black)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function SegmentLeftSmall({ onResizeStart }: { onResizeStart?: (e: React.MouseEvent, handle: 'left' | 'right') => void }) {
  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onResizeStart) {
      onResizeStart(e, 'left');
    }
  };

  return (
    <div
      className="absolute bottom-[1.139px] left-[5px] top-px w-8 cursor-ew-resize z-20"
      data-name="Segment_Left Small"
      onMouseDown={handleMouseDown}
    >
      <div
        className="absolute bottom-[-0.483%] left-[87.5%] right-[6.25%] top-0"
        data-name="Union"
      >
        <div className="absolute bottom-0 left-0 right-0 top-0">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 2 177"
          >
            <path
              d="M2 176.71H0V0H2V176.71Z"
              fill="var(--fill-0, #FFDD19)"
              id="Union"
              opacity="0.7"
            />
          </svg>
        </div>
      </div>
      <div
        className="absolute bottom-[32.98%] left-[-12.5%] right-[6.25%] top-[46.548%]"
        data-name="Union"
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 34 36"
        >
          <path
            d={svgPaths.p485ec00}
            fill="var(--fill-0, #FFDD19)"
            id="Union"
          />
        </svg>
      </div>
      <div className="absolute flex items-center justify-center left-[-5px] size-8 top-[84px] z-30">
        <div className="flex-none rotate-[180deg]">
          <NavigationRight33 />
        </div>
      </div>
      <div className="absolute flex h-[12px] items-center justify-center left-7 top-[-1px] w-[10px]">
        <div className="flex-none rotate-[90deg]">
          <div className="h-2.5 relative w-3">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 12 10"
            >
              <path
                d="M6 0L0 6V10H12V6L6 0Z"
                fill="var(--fill-0, #FFDD19)"
                id="Vector 95"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame93({ label }: { label?: string }) {
  return (
    <div
      className="absolute top-5 translate-x-[-50%] w-24"
      style={{ left: "calc(50% + 0.500001px)" }}
    >
      <div className="box-border content-stretch flex flex-row font-['CentraleSans:Book',_sans-serif] items-start justify-center leading-[0] not-italic p-0 relative text-[#ffdd19] text-[20px] w-24">
        <div className="h-[35px] relative shrink-0 text-center w-[18px]">
          <p className="block leading-[22px]">{label || 'A'}</p>
        </div>
        <div className="relative shrink-0 text-left text-nowrap">
          <p className="block leading-[22px] text-[20px] whitespace-pre">
            &nbsp;
          </p>
        </div>
      </div>
    </div>
  );
}

function Group16({ label }: { label?: string }) {
  return (
    <div className="absolute bottom-[69.101%] contents left-[14.048%] right-[13.4%] top-[4.494%] z-[15]">
      <div className="absolute h-0 left-[33.775px] right-[32.752px] top-[8px] z-[15]">
        <div className="absolute bottom-0 left-0 right-0 top-[-4px]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 92 4"
          >
            <line
              id="Line 131"
              stroke="var(--stroke-0, #FFDD19)"
              strokeWidth="4"
              x2="91.4726"
              y1="2"
              y2="2"
            />
          </svg>
        </div>
      </div>
      <div
        className="absolute bg-[#000000] h-7 rounded-[30px] top-4 translate-x-[-50%] w-[114.632px] z-[15]"
        style={{ left: "calc(50% + 0.511726px)" }}
      >
        <div className="absolute border border-[#ffdd19] border-solid inset-0 pointer-events-none rounded-[30px]" />
      </div>
      <div className="z-[15] relative">
        <Frame93 label={label} />
      </div>
    </div>
  );
}

export default function IldSegment({ 
  width = 152, 
  onResizeStart, 
  onDragStart,
  label 
}: IldSegmentProps) {
  const handleDragStart = (e: React.MouseEvent) => {
    if (onDragStart) {
      onDragStart(e);
    }
  };

  return (
    <div className="relative size-full" data-name="ILD Segment">
      {/* Background */}
      <div 
        className="absolute bg-black/60 rounded-[3px] z-0" 
        style={{
          left: '32px',
          right: '32px',
          top: '7px',
          bottom: '0px'
        }}
      />
      
      {/* Main draggable area - excludes the resize handles */}
      <div 
        className="absolute inset-0 cursor-move z-10"
        style={{ left: '40px', right: '40px' }} // Exclude the handle areas
        onMouseDown={handleDragStart}
        data-name="Draggable Area"
      />
      
      {/* Content */}
      <Group16 label={label} />
      
      {/* Resize handles */}
      <SegmentRightSmall onResizeStart={onResizeStart} />
      <SegmentLeftSmall onResizeStart={onResizeStart} />
    </div>
  );
}