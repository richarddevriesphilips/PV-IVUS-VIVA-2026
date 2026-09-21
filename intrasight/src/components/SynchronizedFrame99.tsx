import React, { useState, useRef } from 'react';
import svgPaths from "../imports/svg-vfrudit9n5";
import nextFrameSvgPaths from "../imports/svg-tyl54w9054";
import imgImage121 from "figma:asset/a88a842f3a8fb7070c090488a99c78d4f568d185.png";
import DraggableScrubber from "./DraggableScrubber";

interface SynchronizedFrame99Props {
  currentTime: number;
  videoDuration: number;
  onTimelineClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  onTimeChange: (newTime: number) => void;
  onScrubberSelect?: () => void; // New prop to handle scrubber selection
  hideMainScrubber?: boolean; // New prop to hide scrubber during segment editing
  isSegmentSelected?: boolean; // New prop to change scrubber color when segment is selected
  isPlaying?: boolean; // New prop to indicate if video is playing
}

function DlsFrameFirst48() {
  return (
    <div className="absolute left-1/2 size-6 translate-x-[-50%] translate-y-[-50%]" data-name="DLS_FrameFirst_48" style={{ top: "calc(50% - 0.087px)" }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="DLS_FrameFirst_48">
          <path d={svgPaths.p37816600} fill="var(--fill-0, white)" fillOpacity="0.8" id="path" />
        </g>
      </svg>
    </div>
  );
}

function PrevFrame() {
  return (
    <div className="absolute bg-[#212121] bottom-[3.23%] left-0 overflow-clip top-[2.82%] w-[70px]" data-name="Prev Frame">
      <DlsFrameFirst48 />
    </div>
  );
}

function DlsFrameLast48() {
  return (
    <div className="absolute left-1/2 size-6 translate-x-[-50%] translate-y-[-50%]" data-name="DLS_FrameLast_48" style={{ top: "calc(50% - 0.087px)" }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="DLS_FrameLast_48">
          <path d={nextFrameSvgPaths.p376b1100} fill="var(--fill-0, white)" fillOpacity="0.8" id="path" />
        </g>
      </svg>
    </div>
  );
}

function NextFrame() {
  return (
    <div className="absolute bg-[#212121] bottom-[3.23%] overflow-clip right-0 top-[2.82%] w-[70px]" data-name="Next Frame">
      <DlsFrameLast48 />
    </div>
  );
}

function MarkerNoReg() {
  return <div className="absolute bottom-1 h-[35px] left-[6.02%] right-[5.83%]" data-name="Marker/NoReg" />;
}

function Ild() {
  return (
    <div className="absolute h-[179px] left-0 top-0 w-[1540px]" data-name="ILD">
      <div className="absolute bg-[#212121] inset-0" />
      <div className="absolute bg-[#050505] bottom-[3.23%] left-0 right-[0.46%] top-[3.23%]" />
      <div className="absolute bg-[48.32%_30.76%] bg-no-repeat bg-size-[101.64%_105.31%] inset-[3.23%_70px]" data-name="image 121" style={{ backgroundImage: `url('${imgImage121}')` }} />
      <PrevFrame />
      <NextFrame />
      <MarkerNoReg />
    </div>
  );
}

function SynchronizedScrubber({ 
  currentTime, 
  videoDuration, 
  onTimeChange,
  onScrubberSelect,
  timelineRef,
  isTimelineDragging,
  isSegmentSelected = false,
  isPlaying = false
}: { 
  currentTime: number; 
  videoDuration: number;
  onTimeChange: (newTime: number) => void;
  onScrubberSelect?: () => void;
  timelineRef: React.RefObject<HTMLDivElement>;
  isTimelineDragging: boolean;
  isSegmentSelected?: boolean;
  isPlaying?: boolean;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const scrubberRef = useRef<HTMLDivElement>(null);
  
  // Calculate scrubber position based on video time
  // The scrubber area starts at 70px (prev button width) and ends at 70px from right (next button width)
  // So the usable width is 1540 - 140 = 1400px
  const usableWidth = 1400;
  const startOffset = 70;
  const scrubberPosition = startOffset + (currentTime / videoDuration) * usableWidth;
  
  // Shared drag calculation function - EXACTLY the same as timeline
  const calculateTimeFromMousePosition = (moveE: MouseEvent) => {
    if (!timelineRef.current) return null;
    
    const rect = timelineRef.current.getBoundingClientRect();
    // rect is in on-screen pixels, which may be scaled down by nested CSS
    // transforms; normalize back to the 1540px design space before applying
    // the hardcoded offsets below so the scrubber tracks the real cursor.
    const scale = rect.width / 1540;
    const mouseX = (moveE.clientX - rect.left) / scale;
    
    // Calculate position within usable area (excluding prev/next buttons)
    const relativeX = mouseX - startOffset;
    const percentage = Math.max(0, Math.min(1, relativeX / usableWidth));
    const newTime = percentage * videoDuration;
    
    return newTime;
  };
  
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    
    // Select scrubber when interacting with it
    if (onScrubberSelect) {
      onScrubberSelect();
    }
    
    const startDragFromScrubber = (moveE: MouseEvent) => {
      const newTime = calculateTimeFromMousePosition(moveE);
      if (newTime !== null) {
        onTimeChange(newTime);
      }
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', startDragFromScrubber);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', startDragFromScrubber);
    document.addEventListener('mouseup', handleMouseUp);
    
    // CRITICAL: Handle the initial position immediately for real-time response
    startDragFromScrubber(e.nativeEvent);
  };
  
  return (
    <div 
      ref={scrubberRef}
      className="absolute h-[167px] top-1.5" 
      data-name="SynchronizedScrubber"
      onMouseDown={handleMouseDown}
      style={{
        left: `${scrubberPosition - 24}px`, // Center the 48px scrubber correctly
        width: '48px', // Exact width to match the SVG viewBox
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: 50, // Higher z-index to ensure it's on top
        // Visual feedback during drag
        transform: isDragging ? 'scale(1.05)' : 'scale(1)', // Subtle scaling
        // No transition during playback - RAF handles smoothness, only transition transform
        transition: 'transform 0.2s ease',
        // GPU acceleration for smoother animation
        willChange: isPlaying ? 'transform' : 'auto'
      }}
    >
      <DraggableScrubber isDragging={isDragging || isTimelineDragging} isSegmentSelected={isSegmentSelected} isPlaying={isPlaying} />
    </div>
  );
}

export default function SynchronizedFrame99({ currentTime, videoDuration, onTimelineClick, onTimeChange, onScrubberSelect, hideMainScrubber = false, isSegmentSelected = false, isPlaying = false }: SynchronizedFrame99Props) {
  const [isDraggingAnywhere, setIsDraggingAnywhere] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // Shared drag calculation function used by both scrubber and timeline
  const calculateTimeFromMousePosition = (moveE: MouseEvent) => {
    if (!timelineRef.current) return null;
    
    const rect = timelineRef.current.getBoundingClientRect();
    // rect is in on-screen pixels, which may be scaled down by nested CSS
    // transforms; normalize back to the 1540px design space before applying
    // the hardcoded offsets below so the scrubber tracks the real cursor.
    const scale = rect.width / 1540;
    const mouseX = (moveE.clientX - rect.left) / scale;
    
    // Calculate position within usable area (excluding prev/next buttons)
    const usableWidth = 1400;
    const startOffset = 70;
    const relativeX = mouseX - startOffset;
    const percentage = Math.max(0, Math.min(1, relativeX / usableWidth));
    const newTime = percentage * videoDuration;
    
    return newTime;
  };
  
  const handleTimelineMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Don't handle if clicking on the scrubber - let scrubber handle its own dragging
    if ((e.target as HTMLElement).closest('[data-name="SynchronizedScrubber"]')) {
      return;
    }
    
    e.preventDefault();
    setIsDraggingAnywhere(true);
    
    const handleMouseMove = (moveE: MouseEvent) => {
      const newTime = calculateTimeFromMousePosition(moveE);
      if (newTime !== null) {
        onTimeChange(newTime);
      }
    };
    
    const handleMouseUp = () => {
      setIsDraggingAnywhere(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Handle the initial click position immediately
    handleMouseMove(e.nativeEvent);
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Don't handle timeline clicks if they're on the scrubber or if we were dragging
    if ((e.target as HTMLElement).closest('[data-name="SynchronizedScrubber"]') || isDraggingAnywhere) {
      return;
    }
    onTimelineClick(e);
  };

  return (
    <div 
      ref={timelineRef}
      className="relative size-full" 
      onClick={handleTimelineClick}
      onMouseDown={handleTimelineMouseDown}
      style={{
        cursor: isDraggingAnywhere ? 'grabbing' : 'pointer'
      }}
    >
      <Ild />
      {!hideMainScrubber && (
        <SynchronizedScrubber 
          currentTime={currentTime} 
          videoDuration={videoDuration} 
          onTimeChange={onTimeChange}
          onScrubberSelect={onScrubberSelect}
          timelineRef={timelineRef}
          isTimelineDragging={isDraggingAnywhere}
          isSegmentSelected={isSegmentSelected}
          isPlaying={isPlaying}
        />
      )}
    </div>
  );
}