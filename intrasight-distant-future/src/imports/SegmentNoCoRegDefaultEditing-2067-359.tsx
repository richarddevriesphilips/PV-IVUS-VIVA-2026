import svgPaths from "./svg-4w0zr9s5b9";
import { useState } from "react";

function NavigationRight32() {
  return (
    <div
      className="absolute right-[-3px] size-8 top-1/2 -translate-y-1/2"
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

function SegmentRightSmall({ onResize, currentLeft, currentWidth }: { 
  onResize?: (newLeft: number, newWidth: number) => void;
  currentLeft: number;
  currentWidth: number;
}) {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);

    const startX = e.clientX;
    const startWidth = currentWidth;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const newWidth = Math.max(50, startWidth + deltaX); // Minimum width of 50px
      onResize?.(currentLeft, newWidth);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      className={`absolute top-0 bottom-0 right-0 w-8 cursor-ew-resize transition-opacity hover:opacity-80 ${isDragging ? 'opacity-60' : ''}`}
      data-name="Segment_Right Small"
      onMouseDown={handleMouseDown}
    >
      <div
        className="absolute top-0 bottom-0 left-[6.25%] right-[87.5%]"
        data-name="Union"
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          role="presentation"
          viewBox="0 0 2 154"
        >
          <path
            d="M2 153.841H0V0H2V153.841Z"
            fill="var(--fill-0, #FFDD19)"
            id="Union"
            opacity="0.7"
          />
        </svg>
      </div>
      <div
        className="absolute h-[36.002px] right-[-4px] top-1/2 -translate-y-1/2 w-[34px]"
        data-name="Union"
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          role="presentation"
          viewBox="0 0 34 36"
        >
          <path
            d={svgPaths.p80e6c00}
            fill="var(--fill-0, #FFDD19)"
            id="Union"
          />
        </svg>
      </div>
      <NavigationRight32 />
      <div className="absolute flex h-[12px] items-center justify-center right-7 top-0 w-[10px]">
        <div className="flex-none rotate-[270deg]">
          <div className="h-2.5 relative w-3">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              role="presentation"
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

function SegmentLeftSmall({ onResize, currentLeft, currentWidth }: { 
  onResize?: (newLeft: number, newWidth: number) => void;
  currentLeft: number;
  currentWidth: number;
}) {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);

    const startX = e.clientX;
    const startLeft = currentLeft;
    const startWidth = currentWidth;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const newLeft = startLeft + deltaX;
      const newWidth = Math.max(50, startWidth - deltaX); // Minimum width of 50px
      
      // Only update if the new width is valid
      if (newWidth >= 50) {
        onResize?.(newLeft, newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      className={`absolute top-0 bottom-0 left-0 w-8 cursor-ew-resize transition-opacity hover:opacity-80 ${isDragging ? 'opacity-60' : ''}`}
      data-name="Segment_Left Small"
      onMouseDown={handleMouseDown}
    >
      <div
        className="absolute top-0 bottom-0 left-[87.5%] right-[6.25%]"
        data-name="Union"
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          role="presentation"
          viewBox="0 0 2 154"
        >
          <path
            d="M2 153.599H0V0H2V153.599Z"
            fill="var(--fill-0, #FFDD19)"
            id="Union"
            opacity="0.7"
          />
        </svg>
      </div>
      <div
        className="absolute h-[36.003px] left-[-4px] top-1/2 -translate-y-1/2 w-[34px]"
        data-name="Union"
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          role="presentation"
          viewBox="0 0 34 36"
        >
          <path
            d={svgPaths.pda55400}
            fill="var(--fill-0, #FFDD19)"
            id="Union"
          />
        </svg>
      </div>
      <div className="absolute flex items-center justify-center left-[-5px] size-8 top-1/2 -translate-y-1/2">
        <div className="flex-none rotate-[180deg]">
          <NavigationRight33 />
        </div>
      </div>
      <div className="absolute flex h-[12px] items-center justify-center left-7 top-0 w-[10px]">
        <div className="flex-none rotate-[90deg]">
          <div className="h-2.5 relative w-3">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              role="presentation"
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

function ArrowRight16() {
  return (
    <div
      className="absolute h-4 left-5 overflow-clip right-1 top-1/2 -translate-y-1/2"
      data-name="ArrowRight_16"
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
      className="absolute contents left-0 right-0 top-1/2 -translate-y-1/2"
    >
      <div
        className="absolute bg-[#ffdd19] h-9 left-0 right-0 rounded-[30px] top-1/2 -translate-y-1/2"
      />
      <ArrowRight16 />
      <div
        className="absolute flex h-4 items-center justify-center left-1 right-5 top-1/2 -translate-y-1/2"
      >
        <div className="flex-none rotate-[180deg] size-4">
          <ArrowRight17 />
        </div>
      </div>
    </div>
  );
}

function TargetFrame({ currentWidth }: { currentWidth: number }) {
  // Position the target frame in the center of the segment
  const centerPosition = Math.max(8, (currentWidth / 2) - 20); // 20px = half of 40px width (left-8 + w-10)
  
  return (
    <div
      className="absolute top-0 bottom-0 w-10"
      data-name="Target frame"
      style={{ left: `${centerPosition}px` }}
    >
      <div
        className="absolute top-0 bottom-0 left-[47.5%] right-[47.5%]"
        data-name="Union"
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 2 150"
        >
          <path
            d="M2 149.922H0V0H2V149.922Z"
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

function Group16({ currentWidth, onMove, currentLeft }: { 
  currentWidth: number; 
  onMove?: (newLeft: number) => void;
  currentLeft: number;
}) {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!onMove) return;
    
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);

    const startX = e.clientX;
    const startLeft = currentLeft;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const newLeft = startLeft + deltaX;
      
      // Constrain within ILD boundaries
      // Main screen boundaries: 70px to 1473px (1543 - 70)
      // Touch screen boundaries: 44px to 1060px (1104 - 44)
      const minLeft = 70; // Main screen left boundary
      const maxLeft = 1473 - currentWidth; // Main screen right boundary minus segment width
      const constrainedLeft = Math.max(minLeft, Math.min(newLeft, maxLeft));
      
      onMove(constrainedLeft);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div 
      className={`absolute top-0 bottom-0 left-7 right-7 cursor-move transition-opacity ${
        isDragging ? 'opacity-80' : 'hover:opacity-90'
      }`}
      onMouseDown={handleMouseDown}
    >
      {/* Main horizontal line spanning full width */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#FFDD19]" />
      
      {/* Vertical lines at each end for full height coverage */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FFDD19]" />
      <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#FFDD19]" />
    </div>
  );
}

function SegmentBubble({ currentWidth }: { currentWidth: number }) {
  return (
    <div
      className="absolute bg-[#000000] h-7 rounded-[30px] top-3 translate-x-[-50%] w-[132px]"
      data-name="Segment Bubble"
      style={{ left: `${currentWidth / 2}px` }}
    >
      <div className="box-border content-stretch flex flex-row gap-2.5 h-7 items-center justify-center overflow-clip p-[8px] relative w-[132px]">
        <div className="flex flex-col font-['CentraleSans',_sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#ffdd19] text-[20px] text-center text-nowrap">
          <p className="block leading-[22px] whitespace-pre">A</p>
        </div>
      </div>
      <div className="absolute border border-[#ffdd19] border-solid inset-0 pointer-events-none rounded-[30px]" />
    </div>
  );
}

interface SegmentNoCoRegDefaultEditingProps {
  onResize?: (newLeft: number, newWidth: number) => void;
  onMove?: (newLeft: number) => void;
  currentLeft?: number;
  currentWidth?: number;
}

export default function SegmentNoCoRegDefaultEditing({ 
  onResize, 
  onMove,
  currentLeft = 0, 
  currentWidth = 203 
}: SegmentNoCoRegDefaultEditingProps) {
  return (
    <div
      className="relative size-full"
      data-name="SegmentNoCoReg/Default/Editing"
    >
      <div className="absolute bg-[rgba(0,0,0,0.4)] bottom-0 left-[30px] right-[30px] top-0" />
      <SegmentRightSmall onResize={onResize} currentLeft={currentLeft} currentWidth={currentWidth} />
      <SegmentLeftSmall onResize={onResize} currentLeft={currentLeft} currentWidth={currentWidth} />
      <TargetFrame currentWidth={currentWidth} />
      <Group16 
        currentWidth={currentWidth} 
        onMove={onMove}
        currentLeft={currentLeft}
      />
      <SegmentBubble currentWidth={currentWidth} />
    </div>
  );
}