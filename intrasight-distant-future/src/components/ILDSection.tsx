import React, { useRef, useCallback, useEffect } from 'react';
import { ILDSectionProps } from './types';
import { WaveformUtils } from './utils/waveformUtils';
import { Bookmark } from './Bookmark';
import svgPaths from '../imports/svg-htfrh24qmy';
import { APP_CONSTANTS } from './constants/appConstants';
import type { ConfirmedSegment } from './types';

// Same grayscale longitudinal image used while the ILD is built up during
// recording (see RecordingILD.tsx) - reused here for the "classic" view.
import imgClassicIld from 'figma:asset/a88a842f3a8fb7070c090488a99c78d4f568d185.png';

// Component for confirmed (white) segment display
function ConfirmedSegment({ segment }: { segment: ConfirmedSegment }) {
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

export function ILDSection({
  trackRef,
  waveformData,
  confirmedSegments,
  bookmarks,
  isDragging,
  onTrackClick,
  onEditConfirmedSegment,
  onBookmarkClick,
  onPreviousFrame,
  onNextFrame,
  onStartContinuousFrameStep,
  onStopContinuousFrameStep,
  recordedFraction = 1,
  viewMode = 'graphical',
}: ILDSectionProps) {
  const frameTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Where the actually-recorded portion ends, in the track's own 0-1543 local
  // coordinate space (recordedFraction applies to the 1403px usable width,
  // not the 70px label margins on each side).
  const { ILD_LEFT_BOUNDARY, ILD_USABLE_WIDTH, ILD_WIDTH } = APP_CONSTANTS.MAIN_SCREEN;
  const recordedEdge = ILD_LEFT_BOUNDARY + Math.max(0, Math.min(1, recordedFraction)) * ILD_USABLE_WIDTH;
  const unrecordedPercent = Math.max(0, 100 - (recordedEdge / ILD_WIDTH) * 100);

  const handlePreviousFrameClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Previous frame button clicked');
    onPreviousFrame(); // Single step immediately
  }, [onPreviousFrame]);

  const handleNextFrameClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Next frame button clicked');
    onNextFrame(); // Single step immediately
  }, [onNextFrame]);

  const handlePreviousFrameMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Previous frame mouse down');
    onPreviousFrame(); // Single step immediately
    
    // Start continuous stepping after a delay for smooth scrubber movement
    frameTimeoutRef.current = setTimeout(() => {
      onStartContinuousFrameStep('backward');
    }, 300); // 300ms delay before starting continuous stepping
  }, [onPreviousFrame, onStartContinuousFrameStep]);

  const handleNextFrameMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Next frame mouse down');
    onNextFrame(); // Single step immediately
    
    // Start continuous stepping after a delay for smooth scrubber movement
    frameTimeoutRef.current = setTimeout(() => {
      onStartContinuousFrameStep('forward');
    }, 300); // 300ms delay before starting continuous stepping
  }, [onNextFrame, onStartContinuousFrameStep]);

  const handleFrameMouseUp = useCallback(() => {
    console.log('Frame mouse up');
    if (frameTimeoutRef.current) {
      clearTimeout(frameTimeoutRef.current);
      frameTimeoutRef.current = null;
    }
    onStopContinuousFrameStep();
  }, [onStopContinuousFrameStep]);

  const handleFrameMouseLeave = useCallback(() => {
    console.log('Frame mouse leave');
    if (frameTimeoutRef.current) {
      clearTimeout(frameTimeoutRef.current);
      frameTimeoutRef.current = null;
    }
    onStopContinuousFrameStep();
  }, [onStopContinuousFrameStep]);

  // Global mouse up listener to ensure we stop frame stepping
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      console.log('Global mouse up');
      if (frameTimeoutRef.current) {
        clearTimeout(frameTimeoutRef.current);
        frameTimeoutRef.current = null;
      }
      onStopContinuousFrameStep();
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

  return (
    <div
      ref={trackRef}
      className="absolute h-[167px] left-4 top-[835px] w-[1543px] cursor-pointer z-5"
      onClick={onTrackClick}
    >
      <div className="relative size-full" data-name="ILD">
        {/* ILD Track Background */}
        <div className="absolute bg-neutral-900 left-0 right-0 top-0 bottom-0" />

        {/* Waveform Visualization */}
        <div className="absolute left-0 right-0 top-0 bottom-0 overflow-hidden" style={{ clipPath: `inset(0 ${unrecordedPercent}% 0 0)` }}>
          {viewMode === 'classic' ? (
            <div
              className="absolute inset-0 bg-center bg-no-repeat"
              style={{ backgroundImage: `url('${imgClassicIld}')`, backgroundSize: '100% 100%' }}
            />
          ) : (
          <svg
            width="1543"
            height="167"
            viewBox="0 0 1543 167"
            className="absolute inset-0"
          >
            {/* Vessel Area Waveform with Heatmap (90% stenosis=red, 60%=green) */}
            {waveformData.map((point, index) => {
              if (index >= waveformData.length - 1) return null;
              
              const nextPoint = waveformData[index + 1];
              const avgStenosis = (point.stenosisPercent + nextPoint.stenosisPercent) / 2;
              
              // Calculate heatmap color: 90% stenosis = darkest red, 60% stenosis = brightest green
              const heatmapColor = WaveformUtils.getHeatmapColorFromStenosis(avgStenosis);
              
              // Get segment paths
              const topPath = WaveformUtils.generateSegmentPath(point, nextPoint, "vessel", true);
              const bottomPath = WaveformUtils.generateSegmentPath(point, nextPoint, "vessel", false);
              const topFillPath = WaveformUtils.generateVesselTopFillPath(point, nextPoint);
              const bottomFillPath = WaveformUtils.generateVesselBottomFillPath(point, nextPoint);
              
              return (
                <g key={`vessel-segment-${index}`}>
                  {/* Top section fill (vessel to lumen) */}
                  <path d={topFillPath} fill={heatmapColor} opacity="0.4" />
                  {/* Bottom section fill (lumen to vessel) */}
                  <path d={bottomFillPath} fill={heatmapColor} opacity="0.4" />
                  {/* Vessel strokes */}
                  <path d={topPath} stroke={APP_CONSTANTS.COLORS.VESSEL_STROKE} strokeWidth="2" fill="none" />
                  <path d={bottomPath} stroke={APP_CONSTANTS.COLORS.VESSEL_STROKE} strokeWidth="2" fill="none" />
                </g>
              );
            })}

            {/* Lumen Structure (Blue outline only, no fill) */}
            <path
              d={WaveformUtils.generateWaveformPath(waveformData, "lumen", true)}
              stroke={APP_CONSTANTS.COLORS.LUMEN_STROKE}
              strokeWidth="1.5"
              fill="none"
              opacity="0.6"
              className="lumen-waveform-top"
            />
            <path
              d={WaveformUtils.generateWaveformPath(waveformData, "lumen", false)}
              stroke={APP_CONSTANTS.COLORS.LUMEN_STROKE}
              strokeWidth="1.5"
              fill="none"
              opacity="0.6"
              className="lumen-waveform-bottom"
            />
          </svg>
          )}
        </div>

        {/* Unrecorded portion - the pullback was stopped before reaching here */}
        {unrecordedPercent > 0 && (
          <div
            className="absolute bg-[#0e0e0e] top-0 bottom-0 right-0 pointer-events-none"
            style={{ left: `${100 - unrecordedPercent}%` }}
          />
        )}

        {/* Co-registration markers */}
        <div className="absolute bottom-0 h-[35px] left-[4.537%] overflow-clip right-[4.537%]">
          <div className="absolute bg-neutral-900 h-[35px] left-0 top-0 w-[26px] flex items-center justify-center" />
          <div className="absolute font-['CentraleSans',_sans-serif] font-bold h-[35px] leading-[0] left-[13px] not-italic text-[#ff9f19] text-[22px] text-center top-0 flex items-center justify-center w-[26px]">
            <p className="block leading-[22px]">D</p>
          </div>
          <div className="absolute right-0 top-0">
            <div className="absolute bg-neutral-900 h-[35px] right-0 top-0 w-6 flex items-center justify-center" />
            <div className="absolute font-['CentraleSans',_sans-serif] font-bold h-[35px] leading-[0] right-0 not-italic text-[#ff9f19] text-[22px] text-center top-0 flex items-center justify-center w-6">
              <p className="block leading-[22px]">P</p>
            </div>
          </div>
        </div>

        {/* Navigation Frame Buttons */}
        <button 
          className="absolute bg-[#212121] h-[167px] left-0 overflow-clip right-[95.463%] top-0 hover:bg-[#323232] transition-colors cursor-pointer border-0 outline-none"
          onClick={handlePreviousFrameClick}
          onMouseDown={handlePreviousFrameMouseDown}
          onMouseUp={handleFrameMouseUp}
          onMouseLeave={handleFrameMouseLeave}
          data-name="Previous Frame Button"
        >
          <div className="absolute left-1/2 size-6 translate-x-[-50%] translate-y-[-50%] top-1/2 pointer-events-none">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
              <path d={svgPaths.p37816600} fill="white" fillOpacity="0.8" />
            </svg>
          </div>
        </button>

        <button 
          className="absolute bg-[#212121] h-[167px] left-[95.463%] overflow-clip right-0 top-0 hover:bg-[#323232] transition-colors cursor-pointer border-0 outline-none"
          onClick={handleNextFrameClick}
          onMouseDown={handleNextFrameMouseDown}
          onMouseUp={handleFrameMouseUp}
          onMouseLeave={handleFrameMouseLeave}
          data-name="Next Frame Button"
        >
          <div className="absolute left-1/2 size-6 translate-x-[-50%] translate-y-[-50%] top-1/2 pointer-events-none">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
              <path d={svgPaths.p376b1100} fill="white" fillOpacity="0.8" />
            </svg>
          </div>
        </button>

        {/* Confirmed Segments - Always displayed in white */}
        {confirmedSegments.map((segment) => (
          <div
            key={segment.id}
            className="absolute h-[167px] top-0 z-5 cursor-pointer hover:opacity-90 transition-opacity"
            style={{
              left: `${segment.left}px`,
              width: `${segment.width}px`,
            }}
            onClick={(e) => {
              e.stopPropagation();
              onEditConfirmedSegment(segment.id);
            }}
          >
            <ConfirmedSegment segment={segment} />
          </div>
        ))}

        {/* Dynamic Bookmarks */}
        {bookmarks.map((bookmark, index) => (
          <div
            key={bookmark.id}
            className="absolute size-8 top-[131px]"
            style={{
              left: `${bookmark.position - 11}px`,
            }}
          >
            <Bookmark
              number={index + 1}
              onClick={() => onBookmarkClick(bookmark)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}