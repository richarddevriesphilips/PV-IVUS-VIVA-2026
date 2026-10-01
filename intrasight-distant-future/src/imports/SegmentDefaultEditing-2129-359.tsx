import svgPaths from "./svg-97t5jm5byb";
import { useState } from "react";

// Grips sit fully outside the segment edges, so they don't count toward its length.
const GRIP_STYLE = { position: "absolute", top: 83, width: 34, height: 36, zIndex: 10, cursor: "ew-resize" } as const;

function SegmentEdge({ side }: { side: "left" | "right" }) {
  const edge = side === "left" ? { left: 0 } : { right: 0 };
  return (
    <div
      data-name={side === "left" ? "Segment_Left Edge" : "Segment_Right Edge"}
      style={{ ...edge, position: "absolute", top: 1, bottom: 0, width: 10, pointerEvents: "none" }}
    >
      <svg
        fill="none"
        preserveAspectRatio="none"
        role="presentation"
        viewBox="0 0 2 199"
        style={{ ...edge, position: "absolute", top: 0, width: 2, height: "100%" }}
      >
        <path d="M2 199H0V0H2V199Z" fill="var(--fill-0, #FFDD19)" opacity="0.7" />
      </svg>
      <svg
        fill="none"
        preserveAspectRatio="none"
        role="presentation"
        viewBox="0 0 12 10"
        style={{
          ...edge,
          position: "absolute",
          top: 0,
          width: 12,
          height: 10,
          transform: `translateX(${side === "left" ? -1 : 1}px) rotate(${side === "left" ? 90 : 270}deg)`,
        }}
      >
        <path d="M6 0L0 6V10H12V6L6 0Z" fill="var(--fill-0, #FFDD19)" />
      </svg>
    </div>
  );
}

function SegmentGrip({ side }: { side: "left" | "right" }) {
  return (
    <>
      <svg
        fill="none"
        preserveAspectRatio="none"
        role="presentation"
        viewBox="0 0 34 36"
        style={{ display: "block", width: "100%", height: "100%" }}
      >
        <path d={side === "left" ? svgPaths.p19da600 : svgPaths.p80e6c00} fill="var(--fill-0, #FFDD19)" />
      </svg>
      <svg
        data-name="NavigationRight_32"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
        style={{
          position: "absolute",
          left: side === "left" ? -1 : 1,
          top: 2,
          width: 32,
          height: 32,
          transform: side === "left" ? "rotate(180deg)" : undefined,
        }}
      >
        <path d={svgPaths.p1c279100} fill="var(--fill-0, black)" />
      </svg>
    </>
  );
}

function ArrowRight16() {
  return (
    <div
      className="absolute h-4 left-5 overflow-clip right-1 translate-y-[-50%]"
      data-name="ArrowRight_16"
      style={{ top: "calc(50% + 16.5px)" }}
    >
      <div
        className="absolute bottom-[31.25%] left-[37.5%] right-[37.5%] top-[31.25%]"
        data-name="path"
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 4 6"
        >
          <path d="M1 0L4 3L1 6H0V0H1Z" fill="var(--fill-0, black)" id="path" />
        </svg>
      </div>
    </div>
  );
}

function ArrowRight17() {
  return (
    <div className="overflow-clip relative size-full" data-name="ArrowRight_16">
      <div
        className="absolute bottom-[31.25%] left-[37.5%] right-[37.5%] top-[31.25%]"
        data-name="path"
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 4 6"
        >
          <path d="M1 0L4 3L1 6H0V0H1Z" fill="var(--fill-0, black)" id="path" />
        </svg>
      </div>
    </div>
  );
}

function Group17() {
  return (
    <div
      className="absolute contents left-0 right-0 translate-y-[-50%]"
      style={{ top: "calc(50% + 16.5px)" }}
    >
      <div
        className="absolute bg-[#ffdd19] h-9 left-0 right-0 rounded-[30px] translate-y-[-50%]"
        style={{ top: "calc(50% + 16.5px)" }}
      />
      <ArrowRight16 />
      <div
        className="absolute flex h-4 items-center justify-center left-1 right-5 translate-y-[-50%]"
        style={{ top: "calc(50% + 16.5px)" }}
      >
        <div className="flex-none rotate-[180deg] size-4">
          <ArrowRight17 />
        </div>
      </div>
    </div>
  );
}

function TargetFrame({ onMiddleFrameDrag, currentLeft, currentWidth, middleHandlePosition, clientXToTrackPosition }: {
  onMiddleFrameDrag?: (newPosition: number) => void;
  currentLeft: number;
  currentWidth: number;
  middleHandlePosition: number;
  clientXToTrackPosition: (clientX: number) => number | null;
}) {
  const handleMiddleFrameMouseDown = (e: React.MouseEvent) => {
    if (!onMiddleFrameDrag) return;
    
    e.preventDefault();
    e.stopPropagation();

    const segmentLeft = currentLeft;
    const segmentRight = currentLeft + currentWidth;

    const handleMouseMove = (e: MouseEvent) => {
      const trackPosition = clientXToTrackPosition(e.clientX);
      if (trackPosition === null) return;
      
      // Constrain within segment boundaries (add small margins)
      const constrainedPosition = Math.max(
        segmentLeft + 25, // 25px margin from left edge  
        Math.min(trackPosition, segmentRight - 25) // 25px margin from right edge
      );
      
      onMiddleFrameDrag(constrainedPosition);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Calculate the relative position of the middle handle within the segment
  const relativePosition = Math.max(25, Math.min(middleHandlePosition - currentLeft, currentWidth - 25));
  
  return (
    <div
      className="absolute bottom-0 top-1 w-10 cursor-ew-resize"
      data-name="Target frame"
      data-resize-handle="middle"
      style={{ left: `${relativePosition - 20}px` }} // Center the 40px wide handle (20px offset)
      onMouseDown={handleMiddleFrameMouseDown}
    >
      <div
        className="absolute bottom-[-1.3%] left-[47.5%] right-[47.5%] top-0"
        data-name="Union"
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 2 196"
        >
          <path
            d="M2 195.507H0V0H2V195.507Z"
            fill="var(--fill-0, #FFDD19)"
            id="Union"
            opacity="0.7"
          />
        </svg>
      </div>
      <Group17 />
    </div>
  );
}

function Group16() {
  return (
    <div className="absolute h-0 left-0 right-0 top-2">
      <div className="absolute bottom-0 left-0 right-0 top-[-4px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 303 4"
        >
          <g id="Group 16">
            <line
              id="Line 131"
              stroke="var(--stroke-0, #FFDD19)"
              strokeWidth="4"
              x1="-3.8147e-05"
              x2="303"
              y1="1.99997"
              y2="1.99997"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

interface SegmentBubbleProps {
  segmentLength: string;
  segmentLabel: string;
}

function SegmentBubble({ segmentLength, segmentLabel }: SegmentBubbleProps) {
  return (
    <div
      className="absolute bg-[#000000] h-7 rounded-[30px] top-3 translate-x-[-50%]"
      data-name="Segment Bubble"
      style={{ left: "calc(50% + 1px)" }}
    >
      <div className="box-border content-stretch flex flex-row gap-2.5 h-7 items-center justify-center overflow-clip p-[8px] relative">
        <div className="flex flex-col font-['CentraleSans',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffdd19] text-[20px] text-center text-nowrap">
          <p className="block leading-[22px] whitespace-pre">{segmentLabel}{segmentLength ? ` ${segmentLength} mm` : ""}</p>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border border-[#ffdd19] border-solid inset-0 pointer-events-none rounded-[30px]"
      />
    </div>
  );
}

interface SegmentDefaultEditingProps {
  segmentLength?: string;
  segmentLabel?: string;
  onResize?: (newLeft: number, newWidth: number) => void;
  onMove?: (newLeft: number) => void;
  onMiddleFrameDrag?: (newPosition: number) => void;
  currentLeft?: number;
  currentWidth?: number;
  middleHandlePosition?: number;
  /** Converts a raw mouse clientX into the ILD track's own coordinate space
   * by measuring the track's live rect on every call - avoids any drift
   * accumulating over a long drag (a cached scale factor would). */
  clientXToTrackPosition: (clientX: number) => number | null;
}

export default function SegmentDefaultEditing({ 
  segmentLength = "126.8",
  segmentLabel = "A",
  onResize,
  onMove,
  onMiddleFrameDrag,
  currentLeft = 0,
  currentWidth = 203,
  middleHandlePosition = 0,
  clientXToTrackPosition
}: SegmentDefaultEditingProps) {
  const [isDragging, setIsDragging] = useState(false);

  // Handle dragging the entire segment to move it
  const handleSegmentMouseDown = (e: React.MouseEvent) => {
    console.log('SegmentDefaultEditing mousedown triggered', { target: e.target });
    
    // Don't trigger if clicking on resize handles
    if ((e.target as HTMLElement).closest('[data-resize-handle]')) {
      console.log('Clicked on resize handle, ignoring drag');
      return;
    }

    console.log('Starting segment drag', { startLeft: currentLeft, clientX: e.clientX });
    
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);

    const startTrackPosition = clientXToTrackPosition(e.clientX);
    const startLeft = currentLeft;

    const handleMouseMove = (e: MouseEvent) => {
      if (startTrackPosition === null) return;
      const trackPosition = clientXToTrackPosition(e.clientX);
      if (trackPosition === null) return;
      const newLeft = startLeft + (trackPosition - startTrackPosition);
      onMove?.(newLeft);
    };

    const handleMouseUp = () => {
      console.log('Segment drag ended');
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Handle left resize handle
  const handleLeftResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const fixedRightEdge = currentLeft + currentWidth;
    const startTrackPosition = clientXToTrackPosition(e.clientX);
    if (startTrackPosition === null) return;
    // Preserve where the outside grip was grabbed so the edge doesn't jump.
    const grabOffset = startTrackPosition - currentLeft;

    const handleMouseMove = (e: MouseEvent) => {
      const trackPosition = clientXToTrackPosition(e.clientX);
      if (trackPosition === null) return;
      const newLeft = trackPosition - grabOffset;
      const newWidth = fixedRightEdge - newLeft;
      
      // Prevent width from going below minimum
      if (newWidth >= 50) {
        onResize?.(newLeft, newWidth);
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Handle right resize handle
  const handleRightResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const fixedLeftEdge = currentLeft;
    const startTrackPosition = clientXToTrackPosition(e.clientX);
    if (startTrackPosition === null) return;
    // Preserve where the outside grip was grabbed so the edge doesn't jump.
    const grabOffset = startTrackPosition - (currentLeft + currentWidth);

    const handleMouseMove = (e: MouseEvent) => {
      const trackPosition = clientXToTrackPosition(e.clientX);
      if (trackPosition === null) return;
      const newWidth = trackPosition - grabOffset - fixedLeftEdge;
      
      // Prevent width from going below minimum
      if (newWidth >= 50) {
        onResize?.(fixedLeftEdge, newWidth);
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div 
      className={`relative size-full cursor-move transition-opacity ${
        isDragging ? 'opacity-80' : 'hover:opacity-90'
      }`} 
      data-name="Segment/Default/Editing"
      onMouseDown={handleSegmentMouseDown}
    >
      <div className="absolute bg-[rgba(0,0,0,0.4)] bottom-0 left-[2px] right-[2px] top-[7px]" />
      <SegmentEdge side="left" />
      <SegmentEdge side="right" />

      <div
        data-resize-handle="right"
        data-name="Segment_Right Grip"
        style={{ ...GRIP_STYLE, left: "100%" }}
        onMouseDown={handleRightResizeMouseDown}
      >
        <SegmentGrip side="right" />
      </div>

      <div
        data-resize-handle="left"
        data-name="Segment_Left Grip"
        style={{ ...GRIP_STYLE, right: "100%" }}
        onMouseDown={handleLeftResizeMouseDown}
      >
        <SegmentGrip side="left" />
      </div>
      
      <TargetFrame 
        onMiddleFrameDrag={onMiddleFrameDrag}
        currentLeft={currentLeft}
        currentWidth={currentWidth}
        middleHandlePosition={middleHandlePosition}
        clientXToTrackPosition={clientXToTrackPosition}
      />
      <Group16 />
      <SegmentBubble segmentLength={segmentLength} segmentLabel={segmentLabel} />
    </div>
  );
}