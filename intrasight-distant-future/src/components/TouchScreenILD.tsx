import { useState, useRef, useEffect, useMemo } from 'react';
import svgPaths from "../imports/svg-jlnhwqk3d4";
import ildSvgPaths from "../imports/svg-buannyhgf";
import imgVector from "figma:asset/df7659d03d16ef91e5dd768b584bad7d277a310c.png";
import imgVector1 from "figma:asset/834560562e4c7a24b0fdc6a9c07343445272fa9f.png";
import { Bookmark } from "./Bookmark";
import SegmentDefaultEditing from "../imports/SegmentDefaultEditing-2129-359";
import { getBorderMeasurements } from "../utils/ivusBorders";
import { APP_CONSTANTS } from "./constants/appConstants";

// TouchScreen Frame Button Component - matches main screen behavior
interface TouchScreenFrameButtonProps {
  direction: 'forward' | 'backward';
  onSingleClick?: () => void;
  onStartContinuous?: (direction: 'forward' | 'backward') => void;
  onStopContinuous?: () => void;
  className: string;
  iconPath: string;
  dataName: string;
}

function TouchScreenFrameButton({
  direction,
  onSingleClick,
  onStartContinuous,
  onStopContinuous,
  className,
  iconPath,
  dataName
}: TouchScreenFrameButtonProps) {
  const frameTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle single clicks (same as main screen)
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`Touch screen ${direction} frame button clicked`);
    onSingleClick?.();
  };

  // Handle mouse down for continuous stepping (same as main screen)
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`Touch screen ${direction} frame mouse down`);
    
    // Immediate single step
    onSingleClick?.();
    
    // Start continuous stepping after a delay for smooth scrubber movement
    frameTimeoutRef.current = setTimeout(() => {
      onStartContinuous?.(direction);
    }, 300); // 300ms delay before starting continuous stepping
  };

  const handleMouseUp = () => {
    console.log(`Touch screen ${direction} frame mouse up`);
    // Clear the timeout if still waiting
    if (frameTimeoutRef.current) {
      clearTimeout(frameTimeoutRef.current);
      frameTimeoutRef.current = null;
    }
    
    // Stop continuous stepping
    onStopContinuous?.();
  };

  const handleMouseLeave = () => {
    console.log(`Touch screen ${direction} frame mouse leave`);
    // Clear the timeout if still waiting
    if (frameTimeoutRef.current) {
      clearTimeout(frameTimeoutRef.current);
      frameTimeoutRef.current = null;
    }
    
    // Stop continuous stepping
    onStopContinuous?.();
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (frameTimeoutRef.current) {
        clearTimeout(frameTimeoutRef.current);
      }
    };
  }, []);

  return (
    <button 
      className={`${className} hover:bg-[#323232] transition-colors cursor-pointer border-0 outline-none`}
      data-name={dataName}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute left-1/2 size-6 translate-x-[-50%] translate-y-[-50%] pointer-events-none" style={{ top: "calc(50% - 0.0540543px)" }}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <path d={iconPath} fill="white" fillOpacity="0.8" />
        </svg>
      </div>
    </button>
  );
}

interface BookmarkData {
  id: number;
  position: number;
  time: number;
}

interface ConfirmedSegment {
  id: number;
  left: number;
  width: number;
  type: "lumen" | "stent";
  length: string;
  label: string;
}

interface TouchScreenILDProps {
  currentTime: number;
  duration: number;
  onScrubberChange: (time: number) => void;
  onDragStateChange?: (isDragging: boolean) => void;
  bookmarks?: BookmarkData[];
  onBookmarkClick?: (bookmark: BookmarkData) => void;
  isSegmentActive?: boolean;
  segmentPosition?: number;
  segmentWidth?: number;
  segmentLeft?: number;
  onSegmentMove?: (newLeft: number) => void;
  onSegmentResize?: (newLeft: number, newWidth: number) => void;
  onMiddleFrameDrag?: (newPosition: number) => void;
  middleHandlePosition?: number; // Add middle handle position prop
  segmentLength?: string;
  segmentLabel?: string;
  confirmedSegments?: ConfirmedSegment[];
  onEditConfirmedSegment?: (segmentId: number) => void;
  onScrubberPositionUpdate?: (position: number) => void;
  // Frame stepping props
  onPreviousFrame?: () => void;
  onNextFrame?: () => void;
  onStartContinuousFrameStep?: (direction: 'forward' | 'backward') => void;
  onStopContinuousFrameStep?: () => void;
}

// Component for confirmed (white) segment display on touch screen
function TouchScreenConfirmedSegment({ segment }: { segment: ConfirmedSegment }) {
  return (
    <div className="relative size-full">
      <div className="absolute bg-gradient-to-b bottom-0 from-[#ffffff1a] left-0 right-0 to-[#ffffff00] top-[3.35%]" />
      <div className="absolute h-0 left-0 right-0 top-2">
        <div className="absolute bottom-0 left-0 right-0 top-[-4px]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 359 4"
          >
            <line
              stroke="white"
              strokeWidth="4"
              x2="100%"
              y1="2"
              y2="2"
            />
          </svg>
        </div>
      </div>
      <div className="absolute flex h-[12px] items-center justify-center left-0 top-0 w-[10px]">
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
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>
      {/* Segment bubble with white styling */}
      <div
        className="absolute bg-[#000000] h-7 rounded-[30px] top-3 translate-x-[-50%]"
        style={{ left: "calc(50% + 0.5px)" }}
      >
        <div className="box-border content-stretch flex flex-row gap-2.5 h-7 items-center justify-center overflow-clip p-[8px] relative">
          <div className="flex flex-col font-['CentraleSans',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[20px] text-center text-nowrap">
            <p className="block leading-[22px] whitespace-pre">
              {segment.label}{segment.length ? ` ${segment.length} mm` : ""}
            </p>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute border border-[#ffffff] border-solid inset-0 pointer-events-none rounded-[30px]"
        />
      </div>
      <div className="absolute flex h-[12px] items-center justify-center right-0 top-0 w-[10px]">
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
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TouchScreenILD({ currentTime, duration, onScrubberChange, onDragStateChange, bookmarks = [], onBookmarkClick, isSegmentActive = false, segmentPosition = 0, segmentWidth = 203, segmentLeft = 0, onSegmentMove, onSegmentResize, onMiddleFrameDrag, middleHandlePosition = 0, segmentLength = "0.0", segmentLabel = "A", confirmedSegments = [], onEditConfirmedSegment, onScrubberPositionUpdate, onPreviousFrame, onNextFrame, onStartContinuousFrameStep, onStopContinuousFrameStep }: TouchScreenILDProps) {
  const [localScrubberPosition, setLocalScrubberPosition] = useState(44); // Starting position from Figma (left-11)
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const frameTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate metrics that change with time/frames — derived from the same
  // keyframe-traced borders that the IVUS overlay draws so the numbers stay
  // in sync with the on-screen shapes.
  const measurements = useMemo(() => {
    const frameNumber = Math.max(1, Math.floor(currentTime * 30) + 1);
    const m = getBorderMeasurements(frameNumber);

    // Normalize to 0-1 over the observed range of the keyframe set so the
    // existing waveform/visualizations behave roughly the same.
    const LUMEN_MIN = 1.0;
    const LUMEN_MAX = 30.0;
    const VESSEL_MIN = 2.0;
    const VESSEL_MAX = 45.0;

    return {
      lumenArea: m.lumenAreaMm2,
      vesselArea: m.vesselAreaMm2,
      lumenNormalized: Math.max(0, Math.min(1, (m.lumenAreaMm2 - LUMEN_MIN) / (LUMEN_MAX - LUMEN_MIN))),
      vesselNormalized: Math.max(0, Math.min(1, (m.vesselAreaMm2 - VESSEL_MIN) / (VESSEL_MAX - VESSEL_MIN))),
    };
  }, [currentTime]);
  void measurements; // currently used only as scaffolding for future visualizations
  void duration;

  // Generate waveform data from actual border polygon measurements.
  const waveformData = useMemo(() => {
    const numPoints = 400;
    const trackWidth = 952; // Usable width (1016 - 64)
    const DURATION = APP_CONSTANTS.DURATION;
    const FPS = 30;

    // 1. Collect real measurements
    const raw: Array<{ lDia: number; vDia: number }> = [];
    for (let i = 0; i <= numPoints; i++) {
      const time = (i / numPoints) * DURATION;
      const frame = Math.max(1, Math.floor(time * FPS) + 1);
      const m = getBorderMeasurements(frame);
      raw.push({ lDia: m.lumenDiameterMm, vDia: m.vesselDiameterMm });
    }

    // 2. Observed diameter ranges for normalization
    let lMin = Infinity, lMax = 0, vMin = Infinity, vMax = 0;
    for (const r of raw) {
      if (r.lDia < lMin) lMin = r.lDia;
      if (r.lDia > lMax) lMax = r.lDia;
      if (r.vDia < vMin) vMin = r.vDia;
      if (r.vDia > vMax) vMax = r.vDia;
    }
    const lRange = lMax - lMin || 1;
    const vRange = vMax - vMin || 1;

    // 3. Build normalized points
    const points: Array<{ x: number; lumen: number; vessel: number }> = [];
    for (let i = 0; i <= numPoints; i++) {
      const r = raw[i];
      points.push({
        x: (i / numPoints) * trackWidth,
        lumen: Math.max(0, Math.min(1, (r.lDia - lMin) / lRange)),
        vessel: Math.max(0, Math.min(1, (r.vDia - vMin) / vRange)),
      });
    }
    return points;
  }, []);

  // Update scrubber position based on video progress
  useEffect(() => {
    if (duration > 0 && !isDragging) {
      const percentage = currentTime / APP_CONSTANTS.DURATION;
      const startPosition = 44; // Starting position from Figma
      const endPosition = 1021; // End position from Figma design
      const usableWidth = endPosition - startPosition; // 977px usable width
      const newPosition = startPosition + percentage * usableWidth;
      setLocalScrubberPosition(newPosition);
    }
  }, [currentTime, duration, isDragging]);

  // Global mouse up listener to ensure we stop frame stepping (same as main screen)
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      console.log('Touch screen global mouse up');
      if (frameTimeoutRef.current) {
        clearTimeout(frameTimeoutRef.current);
        frameTimeoutRef.current = null;
      }
      onStopContinuousFrameStep?.();
    };

    // Add global mouse up listener when component mounts
    document.addEventListener('mouseup', handleGlobalMouseUp);
    
    // Cleanup on unmount
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      if (frameTimeoutRef.current) {
        clearTimeout(frameTimeoutRef.current);
      }
    };
  }, [onStopContinuousFrameStep]);

  const handleScrubberDrag = (e: MouseEvent) => {
    if (!trackRef.current) return;
    
    const rect = trackRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const startPosition = 44; // Starting position from Figma
    const endPosition = 1021; // End position from Figma design
    const usableWidth = endPosition - startPosition; // 977px usable width
    
    // Constrain to track bounds
    const newPosition = Math.max(startPosition, Math.min(mouseX - 20, endPosition)); // mouseX - 20 to center on cursor
    
    // Always update position immediately for smooth visual feedback
    setLocalScrubberPosition(newPosition);
    
    // Convert touch screen position to main screen position for collision detection
    const mainScreenPosition = convertTouchScreenToMainScreen(newPosition);
    
    // Update segment manager's scrubber position for collision detection
    if (isSegmentActive && onScrubberPositionUpdate) {
      onScrubberPositionUpdate(mainScreenPosition);
    }
    
    // Calculate time based on position and update immediately
    const percentage = (newPosition - startPosition) / usableWidth;
    const newTime = Math.min(percentage * 26, 26);
    
    // Call parent immediately for maximum responsiveness during dragging
    onScrubberChange(newTime);
  };

  const handleScrubberMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    onDragStateChange?.(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      handleScrubberDrag(e);
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      onDragStateChange?.(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleTrackClick = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    
    const rect = trackRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const startPosition = 44; // Starting position from Figma
    const endPosition = 1021; // End position from Figma design
    const usableWidth = endPosition - startPosition; // 977px usable width
    
    // Calculate new position
    const newPosition = Math.max(startPosition, Math.min(mouseX - 20, endPosition));
    setLocalScrubberPosition(newPosition);
    
    // Convert touch screen position to main screen position for collision detection
    const mainScreenPosition = convertTouchScreenToMainScreen(newPosition);
    
    // Update segment manager's scrubber position for collision detection
    if (isSegmentActive && onScrubberPositionUpdate) {
      onScrubberPositionUpdate(mainScreenPosition);
    }
    
    // Calculate time based on position and call immediately for click-to-seek
    const percentage = (newPosition - startPosition) / usableWidth;
    const newTime = Math.min(percentage * 26, 26);
    onScrubberChange(newTime);
  };

  // Convert main screen bookmark position to touch screen position
  const convertBookmarkPosition = (mainScreenPosition: number) => {
    // Main screen: starts at 70px, width 1543px, usable width 1403px (1543-140)
    // Touch screen: starts at 44px, width 1104px, usable width 1016px (1104-88)
    const mainScreenOffset = 70;
    const touchScreenOffset = 44;
    const mainScreenUsableWidth = 1403;
    const touchScreenUsableWidth = 1016;
    
    // Calculate percentage position on main screen
    const percentage = (mainScreenPosition - mainScreenOffset) / mainScreenUsableWidth;
    
    // Apply to touch screen dimensions
    return touchScreenOffset + (percentage * touchScreenUsableWidth);
  };

  // Convert main screen segment position to touch screen position
  const convertMainScreenToTouchScreen = (mainScreenPosition: number) => {
    // Same conversion logic as bookmarks
    const mainScreenOffset = 70;
    const touchScreenOffset = 44;
    const mainScreenUsableWidth = 1403;
    const touchScreenUsableWidth = 1016;
    
    // Calculate percentage position on main screen
    const percentage = (mainScreenPosition - mainScreenOffset) / mainScreenUsableWidth;
    
    // Apply to touch screen dimensions
    return touchScreenOffset + (percentage * touchScreenUsableWidth);
  };

  // Convert main screen segment width to touch screen width
  const convertMainScreenWidthToTouchScreen = (mainScreenWidth: number) => {
    const mainScreenUsableWidth = 1403;
    const touchScreenUsableWidth = 1016;
    
    // Calculate width as percentage of usable width
    const widthPercentage = mainScreenWidth / mainScreenUsableWidth;
    
    // Apply to touch screen dimensions
    return widthPercentage * touchScreenUsableWidth;
  };

  // Calculate touch screen segment properties
  const touchScreenSegmentLeft = convertMainScreenToTouchScreen(segmentLeft);
  const touchScreenSegmentWidth = convertMainScreenWidthToTouchScreen(segmentWidth);
  const touchScreenMiddleHandlePosition = convertMainScreenToTouchScreen(middleHandlePosition);

  // Convert touch screen movement back to main screen
  const convertTouchScreenToMainScreen = (touchScreenPosition: number) => {
    const mainScreenOffset = 70;
    const touchScreenOffset = 44;
    const mainScreenUsableWidth = 1403;
    const touchScreenUsableWidth = 1016;
    
    // Calculate percentage position on touch screen
    const percentage = (touchScreenPosition - touchScreenOffset) / touchScreenUsableWidth;
    
    // Apply to main screen dimensions
    return mainScreenOffset + (percentage * mainScreenUsableWidth);
  };

  // Handle segment movement from touch screen
  const handleTouchScreenSegmentMove = (newTouchScreenLeft: number) => {
    if (onSegmentMove) {
      const newMainScreenLeft = convertTouchScreenToMainScreen(newTouchScreenLeft);
      onSegmentMove(newMainScreenLeft);
    }
  };

  // Handle segment resize from touch screen
  const handleTouchScreenSegmentResize = (newTouchScreenLeft: number, newTouchScreenWidth: number) => {
    if (onSegmentResize) {
      // Convert touch screen coordinates back to main screen coordinates
      const newMainScreenLeft = convertTouchScreenToMainScreen(newTouchScreenLeft);
      
      // Convert width back to main screen proportions
      const mainScreenUsableWidth = 1403;
      const touchScreenUsableWidth = 1016;
      const newMainScreenWidth = (newTouchScreenWidth / touchScreenUsableWidth) * mainScreenUsableWidth;
      
      onSegmentResize(newMainScreenLeft, newMainScreenWidth);
    }
  };

  // Handle middle frame drag from touch screen
  const handleTouchScreenMiddleFrameDrag = (newTouchScreenPosition: number) => {
    if (onMiddleFrameDrag) {
      // Convert touch screen position back to main screen position
      const newMainScreenPosition = convertTouchScreenToMainScreen(newTouchScreenPosition);
      console.log('TouchScreenILD middle drag:', {
        touchScreenPosition: newTouchScreenPosition,
        convertedMainPosition: newMainScreenPosition
      });
      onMiddleFrameDrag(newMainScreenPosition);
    }
  };

  // Generate waveform path strings
  const generateWaveformPath = (data: typeof waveformData, type: 'lumen' | 'vessel', isTop: boolean) => {
    const trackHeight = 142;
    const centerY = trackHeight / 2;
    const maxOffset = type === 'lumen' ? 30 : 50; // Lumen inner, vessel outer - reduced for 16px margins
    const minOffset = type === 'lumen' ? 16 : 32;
    
    const pathData = data.map((point, index) => {
      const value = type === 'lumen' ? point.lumen : point.vessel;
      const offset = minOffset + (value * (maxOffset - minOffset));
      const y = isTop ? centerY - offset : centerY + offset;
      
      // Ensure the waveform spans the full width by adding the 64px offset to center it properly
      return `${index === 0 ? 'M' : 'L'} ${32 + point.x} ${y}`;
    }).join(' ');
    
    return pathData;
  };

  // Create filled areas between waveform lines
  const generateFilledAreaPath = (data: typeof waveformData, type: 'lumen' | 'vessel') => {
    const trackHeight = 142;
    const centerY = trackHeight / 2;
    const maxOffset = type === 'lumen' ? 30 : 50; // Lumen inner, vessel outer - reduced for 16px margins  
    const minOffset = type === 'lumen' ? 16 : 32;
    
    // Top path
    const topPath = data.map((point, index) => {
      const value = type === 'lumen' ? point.lumen : point.vessel;
      const offset = minOffset + (value * (maxOffset - minOffset));
      const y = centerY - offset;
      // Ensure the filled area spans the full width with proper centering
      return `${index === 0 ? 'M' : 'L'} ${32 + point.x} ${y}`;
    }).join(' ');
    
    // Bottom path (reversed)
    const bottomPath = data.slice().reverse().map((point) => {
      const value = type === 'lumen' ? point.lumen : point.vessel;
      const offset = minOffset + (value * (maxOffset - minOffset));
      const y = centerY + offset;
      return `L ${32 + point.x} ${y}`;
    }).join(' ');
    
    return `${topPath} ${bottomPath} Z`;
  };

  return (
    <div className="relative size-full">
      {/* ILD Track - Clean without background or waveforms */}
      <div 
        ref={trackRef}
        className="absolute h-[146px] left-0 top-0 w-[1104px] cursor-pointer"
        data-name="ILD"
        onClick={handleTrackClick}
      >
        <div className="absolute bg-neutral-900 bottom-[2.74%] left-0 right-[-0.091%] top-[2.74%]" />
        
        {/* Previous Frame Button */}
        <TouchScreenFrameButton
          direction="backward"
          onSingleClick={onPreviousFrame}
          onStartContinuous={onStartContinuousFrameStep}
          onStopContinuous={onStopContinuousFrameStep}
          className="absolute bg-[#212121] bottom-[2.703%] left-0 overflow-clip right-[94.203%] top-[2.703%]"
          iconPath={svgPaths.p37816600}
          dataName="Prev Frame"
        />

        {/* Next Frame Button */}
        <TouchScreenFrameButton
          direction="forward"
          onSingleClick={onNextFrame}
          onStartContinuous={onStartContinuousFrameStep}
          onStopContinuous={onStopContinuousFrameStep}
          className="absolute bg-[#212121] bottom-[2.703%] left-[94.293%] overflow-clip right-[-0.091%] top-[2.703%]"
          iconPath={svgPaths.p376b1100}
          dataName="Next Frame"
        />

        {/* Waveform Visualization - Inside the track area */}
        <div className="absolute left-16 right-16 top-1 bottom-1 overflow-hidden">
          <svg 
            width="1016" 
            height="142" 
            viewBox="0 0 1016 142" 
            className="absolute inset-0"
          >
            {/* Vessel Area Waveform (Green - Outer) */}
            <path
              d={generateFilledAreaPath(waveformData, 'vessel')}
              fill="rgba(34, 197, 94, 0.2)"
              className="vessel-area-fill"
            />
            <path
              d={generateWaveformPath(waveformData, 'vessel', true)}
              stroke="rgb(34, 197, 94)"
              strokeWidth="2"
              fill="none"
              className="vessel-waveform-top"
            />
            <path
              d={generateWaveformPath(waveformData, 'vessel', false)}
              stroke="rgb(34, 197, 94)"
              strokeWidth="2"
              fill="none"
              className="vessel-waveform-bottom"
            />
            
            {/* Lumen Area Waveform (Blue - Inner) */}
            <path
              d={generateFilledAreaPath(waveformData, 'lumen')}
              fill="rgba(59, 130, 246, 0.3)"
              className="lumen-area-fill"
            />
            <path
              d={generateWaveformPath(waveformData, 'lumen', true)}
              stroke="rgb(59, 130, 246)"
              strokeWidth="2"
              fill="none"
              className="lumen-waveform-top"
            />
            <path
              d={generateWaveformPath(waveformData, 'lumen', false)}
              stroke="rgb(59, 130, 246)"
              strokeWidth="2"
              fill="none"
              className="lumen-waveform-bottom"
            />
          </svg>
        </div>

        {/* Confirmed Segments - Always displayed in white */}
        {confirmedSegments.map((segment) => {
          const touchScreenLeft = convertMainScreenToTouchScreen(segment.left);
          const touchScreenWidth = convertMainScreenWidthToTouchScreen(segment.width);
          
          return (
            <div
              key={segment.id}
              className="absolute h-[146px] top-0 z-5 cursor-pointer hover:opacity-90 transition-opacity"
              style={{
                left: `${Math.max(44, Math.min(touchScreenLeft, 1060 - touchScreenWidth))}px`,
                width: `${Math.max(35, touchScreenWidth)}px`,
              }}
              onClick={(e) => {
                e.stopPropagation(); // Prevent track click
                onEditConfirmedSegment?.(segment.id);
              }}
            >
              <TouchScreenConfirmedSegment segment={segment} />
            </div>
          );
        })}

        {/* Co-registration markers */}
        <div className="absolute bottom-1 h-[26px] left-[5.888%] overflow-clip right-[5.707%]" data-name="Marker/NoCoReg">
          <div className="absolute bg-[#050505] h-[27px] left-0 top-1 w-[26px]" />
          <div className="absolute font-['CentraleSans',_sans-serif] font-bold h-[30px] leading-[0] left-[14.5px] not-italic text-[#ff9f19] text-[22px] text-center top-[5px] translate-x-[-50%] w-[19px]">
            <p className="block leading-[22px]">D</p>
          </div>
          <div className="absolute contents right-0 top-[5px]">
            <div className="absolute bg-[#000000] h-[26px] right-0 top-[5px] w-6" />
            <div className="absolute font-['CentraleSans',_sans-serif] font-bold h-[30px] leading-[0] right-[16.5px] not-italic text-[#ff9f19] text-[22px] text-center top-[5px] translate-x-[50%] w-[19px]">
              <p className="block leading-[22px]">P</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scrubber - Hidden when segment is active */}
      {!isSegmentActive && (
        <div 
          className="absolute cursor-pointer h-[138px] top-1 w-10 z-10"
          data-name="Scrubber"
          style={{ left: `${localScrubberPosition}px` }}
          onMouseDown={handleScrubberMouseDown}
        >
          <div className="absolute bottom-0 left-[-10%] right-[-10%] top-0">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 138">
              <path d="M25 138H23V0H25V138Z" fill="#FFDD19" />
              <g filter="url(#filter0_d_1_13393)">
                <circle cx="24" cy="69" fill="#A28E18" r="20" />
              </g>
              <circle cx="24" cy="69" fill="#FFDD19" r="18" />
              <defs>
                <filter
                  colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse"
                  height="48"
                  id="filter0_d_1_13393"
                  width="48"
                  x="0"
                  y="47"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    result="hardAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  />
                  <feOffset dy="2" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
                  />
                  <feBlend
                    in2="BackgroundImageFix"
                    mode="normal"
                    result="effect1_dropShadow_1_13393"
                  />
                  <feBlend
                    in="SourceGraphic"
                    in2="effect1_dropShadow_1_13393"
                    mode="normal"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      )}
      
      {/* Touch Screen Segment - Shown when segment is active */}
      {isSegmentActive && (
        <div
          className="absolute h-[146px] top-0 z-10"
          style={{ 
            left: `${Math.max(44, Math.min(touchScreenSegmentLeft, 1060 - touchScreenSegmentWidth))}px`, // Constrain within touch screen ILD boundaries
            width: `${Math.max(35, touchScreenSegmentWidth)}px` // Minimum width of 35px for touch screen
          }}
        >
          <SegmentDefaultEditing 
            segmentLength={segmentLength}
            segmentLabel={segmentLabel}
            onMove={handleTouchScreenSegmentMove}
            onResize={handleTouchScreenSegmentResize}
            onMiddleFrameDrag={handleTouchScreenMiddleFrameDrag}
            currentLeft={touchScreenSegmentLeft}
            currentWidth={touchScreenSegmentWidth}
            middleHandlePosition={touchScreenMiddleHandlePosition}
          />
        </div>
      )}
      
      {/* Dynamic Bookmarks */}
      {bookmarks.map((bookmark, index) => {
        const touchScreenPosition = convertBookmarkPosition(bookmark.position);
        return (
          <div key={bookmark.id} className="absolute size-8 top-[118px]" style={{ left: `${touchScreenPosition - 11}px` }}>
            <Bookmark 
              number={index + 1} 
              onClick={() => onBookmarkClick?.(bookmark)}
            />
          </div>
        );
      })}
    </div>
  );
}