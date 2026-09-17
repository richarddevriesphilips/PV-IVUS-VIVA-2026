import React, { useState, useRef, useEffect, useMemo } from "react";
import svgPaths from "../imports/svg-ua1p7zpp47";
import actionBarSvgPaths from "../imports/svg-gf3jd4ebgr";
import updateButtonSvgPaths from "../imports/svg-u6go899s66";
import { TouchScreenILD } from "./TouchScreenILD";
import { MetricsDisplay } from "./MetricsDisplay";
import { VirtualRulerOverlay } from "./VirtualRulerOverlay";
import { NoXRayOverlay } from "./NoXRayOverlay";
import { VideoControlButtons } from "./VideoControlButtons";
import { getIndicatorPosition } from "./utils/indicatorPosition";
import Component3TomoView from "../imports/3TomoView-2073-3470";
import Frame137 from "../imports/Frame137";
import SegmentEditingBoxTouch from "../imports/SegmentEditingBoxTouch-2156-1603";
import { IVUSFramePlayer } from "./IVUSFramePlayer";

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

interface TouchScreenProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onPlayPause: () => void;
  onScrubberChange: (time: number) => void;
  onDragStateChange?: (isDragging: boolean) => void;
  touchLeftVideoRef: React.RefObject<HTMLVideoElement>;
  touchRightVideoRef: React.RefObject<HTMLVideoElement>;
  onVideoMetadataLoaded: (
    e: React.SyntheticEvent<HTMLVideoElement>,
  ) => void;
  onVideoError: (
    e: React.SyntheticEvent<HTMLVideoElement>,
  ) => void;
  isXRayHidden: boolean;
  onXRayToggle: () => void;
  isVirtualRulerVisible?: boolean;
  onVirtualRulerToggle?: () => void;
  bookmarks?: BookmarkData[];
  onBookmarkClick?: (bookmark: BookmarkData) => void;
  onBookmarkToggle?: () => void;
  bookmarkButtonText?: string;
  onAddSegment?: () => void;
  isSegmentActive?: boolean;
  segmentPosition?: number;
  segmentWidth?: number;
  segmentLeft?: number;
  onSegmentMove?: (newLeft: number) => void;
  onSegmentResize?: (newLeft: number, newWidth: number) => void;
  onMiddleFrameDrag?: (newPosition: number) => void;
  middleHandlePosition?: number; // Position of the middle handle within segment
  segmentType?: "lumen" | "stent";
  onSegmentTypeChange?: (type: "lumen" | "stent") => void;
  onSegmentConfirm?: () => void;
  onSegmentCancel?: () => void;
  onSegmentDelete?: () => void;
  segmentLength?: string;
  segmentLabel?: string;
  onSegmentSizeIncrease?: () => void;
  onSegmentSizeDecrease?: () => void;
  confirmedSegments?: ConfirmedSegment[];
  onEditConfirmedSegment?: (segmentId: number) => void;
  // New props for video URLs
  xrayVideoUrl?: string;
  ivusVideoUrl?: string;
  // Scrubber collision update function
  onScrubberPositionUpdate?: (position: number) => void;
  // Frame stepping props
  onPreviousFrame?: () => void;
  onNextFrame?: () => void;
  onStartContinuousFrameStep?: (direction: 'forward' | 'backward') => void;
  onStopContinuousFrameStep?: () => void;
  // Unified diamond system props
  isDiamondDragging?: boolean;
  diamondPositions?: { main: { x: number; y: number }; touch: { x: number; y: number } };
  onDiamondMouseDown?: (e: React.MouseEvent, source: 'main' | 'touch') => void;
  isSegmentHandleDragging?: boolean;
  isSegmentHandlePressed?: boolean;
  diamondTime?: number;
  // Touch screen popover props
  isTouchPopoverVisible?: boolean;
  touchPopoverPosition?: { x: number; y: number };
  onTouchPopoverClose?: () => void;
  onTouchAdjustPosition?: () => void;
  onTouchMoveToNearestFrame?: () => void;
  // Navigation handler
  onGoLive?: () => void;
  // X-ray recording check
  hasXRayAtTime?: (time: number) => boolean;
  // Nearest X-ray frame info (for displaying when current frame has no X-ray)
  nearestXRayInfo?: { nearestTime: number; timeDifference: number; direction: 'ahead' | 'behind' } | null;
  // Segment handle X-ray info (for displaying during handle dragging)
  segmentHandleXRayInfo?: { nearestTime: number; timeDifference: number; direction: 'ahead' | 'behind' } | null;
  segmentHandleTime?: number | null;
  // Sync playback state
  isSyncPlaybackEnabled?: boolean;
  // Segment handle positions for displaying all three handles as diamonds
  segmentHandlePositions?: {
    left: { main: { x: number; y: number }; touch: { x: number; y: number }; time: number };
    middle: { main: { x: number; y: number }; touch: { x: number; y: number }; time: number };
    right: { main: { x: number; y: number }; touch: { x: number; y: number }; time: number };
  } | null;
}

export function TouchScreen({
  isPlaying,
  currentTime,
  duration,
  onPlayPause,
  onScrubberChange,
  onDragStateChange,
  touchLeftVideoRef,
  touchRightVideoRef,
  onVideoMetadataLoaded,
  onVideoError,
  isXRayHidden,
  onXRayToggle,
  isVirtualRulerVisible = false,
  onVirtualRulerToggle,
  bookmarks = [],
  onBookmarkClick,
  onBookmarkToggle,
  bookmarkButtonText = "Bookmark",
  onAddSegment,
  isSegmentActive = false,
  segmentPosition = 0,
  segmentWidth = 203,
  segmentLeft = 0,
  onSegmentMove,
  onSegmentResize,
  onMiddleFrameDrag,
  middleHandlePosition = 0,
  segmentType = "lumen",
  onSegmentTypeChange,
  onSegmentConfirm,
  onSegmentCancel,
  onSegmentDelete,
  segmentLength = "0.0",
  segmentLabel = "A",
  onSegmentSizeIncrease,
  onSegmentSizeDecrease,
  confirmedSegments = [],
  onEditConfirmedSegment,
  xrayVideoUrl = "/intrasight-distant-future/assets/videos/postrecord.mov",
  ivusVideoUrl = "/intrasight-distant-future/assets/videos/IVUS-recording-export.mp4",
  onScrubberPositionUpdate,
  onPreviousFrame,
  onNextFrame,
  onStartContinuousFrameStep,
  onStopContinuousFrameStep,
  isDiamondDragging = false,
  diamondPositions = { main: { x: 0, y: 0 }, touch: { x: 0, y: 0 } },
  onDiamondMouseDown,
  isSegmentHandleDragging = false,
  isSegmentHandlePressed = false,
  diamondTime = 0,
  isTouchPopoverVisible = false,
  touchPopoverPosition = { x: 0, y: 0 },
  onTouchPopoverClose,
  onTouchAdjustPosition,
  onTouchMoveToNearestFrame,
  onGoLive,
  hasXRayAtTime = () => true, // Default to always having X-ray (for backwards compatibility)
  nearestXRayInfo = null,
  segmentHandleXRayInfo = null,
  segmentHandleTime = null,
  isSyncPlaybackEnabled = true, // Default to enabled
  segmentHandlePositions = null,
}: TouchScreenProps) {
  const indicatorPosition = getIndicatorPosition(currentTime);

  // Use the unified diamond position system
  const touchDiamondPosition = diamondPositions.touch;

  // Simplified touch screen diamond handler using unified system
  const handleTouchDiamondMouseDown = (e: React.MouseEvent) => {
    if (isSegmentActive) return; // Disable during segment editing
    onDiamondMouseDown?.(e, 'touch');
  };

  // Component for Updated Segment Buttons (Touch Screen version) - Multi-segment support
  const TouchScreenUpdatedSegmentButtons = ({ 
    segments, 
    onEdit, 
    onAddSegment 
  }: { 
    segments: ConfirmedSegment[]; 
    onEdit: (segmentId: number) => void; 
    onAddSegment: () => void; 
  }) => {
    return (
      <div className="box-border content-stretch flex flex-row gap-3 items-start justify-start p-0 relative size-full" data-name="Updated segment buttons">
        {/* Render all segments */}
        {segments.map((segment, index) => (
          <div
            key={segment.id}
            className="h-16 overflow-clip relative rounded-[3px] shrink-0 w-[228px]"
            data-name="Segment input field/Touch"
          >
            {/* Segment Info Display */}
            <div
              className="absolute bg-[rgba(89,89,89,0.5)] h-16 left-0 rounded-[3px] top-0 w-[152px]"
              data-name="Segment input field/Boom"
            >
              <div className="h-16 leading-[0] not-italic overflow-clip relative text-[24px] text-nowrap w-[152px]">
                {/* Length Display */}
                <div className="absolute box-border content-stretch flex flex-row font-['CentraleSans',_sans-serif] gap-1.5 items-center justify-start left-[42px] p-0 text-[#ffffff] text-right top-5">
                  <div className="[text-shadow:rgba(0,0,0,0.5)_0px_2px_4px] relative shrink-0">
                    <p className="block leading-[24px] text-nowrap whitespace-pre">{segment.length}</p>
                  </div>
                  <div className="[text-shadow:rgba(0,0,0,0.5)_0px_2px_4px] relative shrink-0">
                    <p className="block leading-[24px] text-nowrap whitespace-pre">mm</p>
                  </div>
                </div>
                {/* Label Display */}
                <div className="[text-shadow:rgba(0,0,0,0.5)_0px_2px_4px] absolute font-['CentraleSans',_sans-serif] font-bold left-3.5 text-[rgba(173,173,173,0.87)] text-left top-[18px]">
                  <p className="block leading-[28px] text-nowrap whitespace-pre">{segment.label}</p>
                </div>
              </div>
            </div>
            
            {/* Edit Button */}
            <button
              onClick={() => onEdit(segment.id)}
              className="absolute bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-row gap-2 items-center justify-center left-[156px] px-[18px] py-4 rounded top-0 hover:bg-[rgba(99,99,99,0.65)] transition-colors"
              data-name="Edit Button"
            >
              <div className="relative shrink-0 size-8" data-name="Icon">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 32 32"
                >
                  <g id="Icon">
                    <path
                      d={updateButtonSvgPaths.p21a57f00}
                      fill="var(--fill-0, #E8E8E8)"
                      id="path"
                    />
                  </g>
                </svg>
              </div>
            </button>
          </div>
        ))}
        
        {/* Add Segment Button */}
        <button
          onClick={onAddSegment}
          className="bg-[#696969] box-border content-stretch flex flex-row gap-3 h-16 items-center justify-center px-5 py-4 relative rounded shrink-0 w-[207px] hover:bg-[#757575] transition-colors"
          data-name="Add Segment Button"
        >
          <div className="relative shrink-0 size-8" data-name="Measurement">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 32 32"
            >
              <g id="Measurement">
                <path
                  d={updateButtonSvgPaths.p2938bf00}
                  fill="var(--fill-0, #E8E8E8)"
                  id="path"
                />
              </g>
            </svg>
          </div>
          <div className="font-['CentraleSans',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[20px] text-center text-nowrap">
            <p className="block leading-[28px] whitespace-pre">Add Segment</p>
          </div>
        </button>
      </div>
    );
  };

  return (
    <div
      className="bg-[#000000] relative w-[1280px] h-[720px] overflow-hidden"
      data-name="Touch Screen"
    >
      {/* Conditional rendering based on segment editing mode */}
      {!isSegmentActive ? (
        /* Normal mode: Full-size X-ray and single IVUS */
        <>
          {/* Left Video Panel - Wrapped with overflow hidden - Only show when sync playback is enabled */}
          {!isXRayHidden && isSyncPlaybackEnabled && (
            <div className="absolute h-[455px] left-[152px] top-6 w-[455px] overflow-hidden">
              <video
                ref={touchLeftVideoRef}
                className="absolute h-[480px] left-0 top-0 w-[455px] object-cover"
                src={xrayVideoUrl}
                data-name="postrecord 2"
                onLoadedMetadata={onVideoMetadataLoaded}
                onError={onVideoError}
                preload="auto"
                muted
                playsInline
              />
              
              {/* Show overlay when no X-ray was recorded at current time or when dragging segment handle */}
              {(() => {
                // When dragging segment handle, show info for handle position
                if (isSegmentHandleDragging && segmentHandleTime !== null && segmentHandleTime !== undefined) {
                  const handleHasXRay = hasXRayAtTime && hasXRayAtTime(segmentHandleTime);
                  return !handleHasXRay && segmentHandleXRayInfo ? (
                    <NoXRayOverlay 
                      timeDifference={segmentHandleXRayInfo.timeDifference}
                      direction={segmentHandleXRayInfo.direction}
                    />
                  ) : null;
                }
                // Otherwise show info for current scrubber position
                return !hasXRayAtTime(currentTime) && nearestXRayInfo ? (
                  <NoXRayOverlay 
                    timeDifference={nearestXRayInfo.timeDifference}
                    direction={nearestXRayInfo.direction}
                  />
                ) : null;
              })()}
              
              {/* Virtual Ruler Overlay - Only show when X-ray is available */}
              {hasXRayAtTime(currentTime) && (
                <VirtualRulerOverlay
                  isVisible={isVirtualRulerVisible}
                />
              )}

              {/* X-ray Bookmarks on Touch Screen - Only show when X-ray is available */}
              {hasXRayAtTime(currentTime) && bookmarks?.map((bookmark) => (
                bookmark.xrayPosition && (
                  <div
                    key={`touch-xray-bookmark-${bookmark.id}`}
                    className="absolute z-40 w-6 h-6 cursor-pointer"
                    style={{
                      // Scale bookmark position from main screen to touch screen coordinates
                      left: `${(bookmark.xrayPosition.x * (455 / 718)) - 12}px`, // Scale and center the 24px bookmark
                      top: `${(bookmark.xrayPosition.y * (480 / 796)) - 12}px`,
                    }}
                    onClick={() => onBookmarkClick?.(bookmark)}
                    title={`Bookmark ${bookmark.id} - ${bookmark.time.toFixed(1)}s`}
                  >
                    {/* Use same bookmark icon as ILD track - scaled for touch screen */}
                    <div className="absolute left-0.5 size-5 top-[-1px]" data-name="Bookmark">
                      <svg
                        className="block size-full"
                        fill="none"
                        preserveAspectRatio="none"
                        viewBox="0 0 24 24"
                      >
                        <g id="Bookmark">
                          <path
                            d="M18 23L12 17L6 23V1H18V23Z"
                            fill="#FF9F19"
                            id="path"
                          />
                        </g>
                      </svg>
                    </div>
                    <div className="absolute font-['CentraleSans',_sans-serif] font-bold leading-[0] left-3 not-italic text-[#000000] text-[10px] text-center text-nowrap top-0 translate-x-[-50%]">
                      <p className="block leading-[14px] whitespace-pre">{bookmark.id}</p>
                    </div>
                  </div>
                )
              ))}

              {/* Diamond-shaped scrubber indicator - Only show when not in segment editing mode */}
              {!isSegmentActive && hasXRayAtTime(currentTime) && (
                <div
                  className="absolute flex h-[29.605px] items-center justify-center w-[29.902px] cursor-pointer z-50"
                  style={{
                    left: `${touchDiamondPosition.x}px`,
                    top: `${touchDiamondPosition.y}px`,
                  }}
                  onMouseDown={handleTouchDiamondMouseDown}
                >
                  <div className="flex-none rotate-[60deg]">
                    <div className="h-[22.194px] relative w-[21.38px]">
                      <div className="absolute bottom-[-11.264%] left-[-2.339%] right-[-11.693%] top-[-2.892%]">
                        <svg
                          className="block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox="0 0 25 26"
                        >
                          <g filter="url(#filter0_d_1_13423)">
                            <path
                              d={svgPaths.p420a580}
                              fill="#FFDD19"
                            />
                            <path
                              d={svgPaths.p420a580}
                              stroke="black"
                            />
                          </g>
                          <defs>
                            <filter
                              id="filter0_d_1_13423"
                              colorInterpolationFilters="sRGB"
                              filterUnits="userSpaceOnUse"
                              height="25.3359"
                              width="24.3797"
                              x="0.5"
                              y="0.358108"
                            >
                              <feFlood
                                floodOpacity="0"
                                result="BackgroundImageFix"
                              />
                              <feColorMatrix
                                in="SourceAlpha"
                                result="hardAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              />
                              <feOffset dx="1" dy="1" />
                              <feGaussianBlur stdDeviation="0.5" />
                              <feComposite
                                in2="hardAlpha"
                                operator="out"
                              />
                              <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
                              />
                              <feBlend
                                in2="BackgroundImageFix"
                                mode="normal"
                                result="effect1_dropShadow_1_13423"
                              />
                              <feBlend
                                in="SourceGraphic"
                                in2="effect1_dropShadow_1_13423"
                                mode="normal"
                                result="shape"
                              />
                            </filter>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Video Control Buttons - Hidden when no X-ray recorded or sync disabled */}
          {!isXRayHidden && isSyncPlaybackEnabled && hasXRayAtTime(currentTime) && (
            <div className="absolute top-[444px] left-[152px] z-10">
              <VideoControlButtons
                onVirtualRulerToggle={onVirtualRulerToggle}
                onXRayToggle={onXRayToggle}
              />
            </div>
          )}

          {/* Metrics Display - Positioned between X-ray and IVUS images - Only show when sync enabled */}
          {!isXRayHidden && isSyncPlaybackEnabled && (
            <div className="absolute left-[638px] top-[60px] w-[158px] h-[350px]">
              <MetricsDisplay
                currentTime={currentTime}
                duration={duration}
                isCompact={true}
              />
            </div>
          )}

          {/* Right Video Panel - Centered when X-Ray is hidden or sync is disabled */}
          <div
            className={`absolute h-[432px] top-6 w-[455px] overflow-hidden transition-all ${
              (isXRayHidden || !isSyncPlaybackEnabled) ? "left-[412px]" : "left-[825px]"
            }`}
          >
            <IVUSFramePlayer
              currentTime={currentTime}
              className="absolute h-[432px] left-0 top-0 w-[455px] rounded-full"
              onLoadedMetadata={onVideoMetadataLoaded}
              onError={onVideoError}
            />

            {/* IVUS Measurement Overlay */}
          </div>
        </>
      ) : (
        /* Segment editing mode: Smaller X-ray and 3-TOMO view */
        <>
          {/* Smaller X-ray Video Panel - Left side - Only show when sync enabled */}
          {!isXRayHidden && isSyncPlaybackEnabled && (
            <div className="absolute h-[280px] left-[152px] top-6 w-[300px] overflow-hidden">
              <video
                ref={touchLeftVideoRef}
                className="absolute h-[280px] left-0 top-0 w-[300px] object-cover"
                src={xrayVideoUrl}
                data-name="postrecord 2"
                onLoadedMetadata={onVideoMetadataLoaded}
                onError={onVideoError}
                preload="auto"
                muted
                playsInline
              />
              
              {/* Show overlay when no X-ray was recorded at current time or when dragging segment handle */}
              {(() => {
                // When dragging segment handle, show info for handle position
                if (isSegmentHandleDragging && segmentHandleTime !== null && segmentHandleTime !== undefined) {
                  const handleHasXRay = hasXRayAtTime(segmentHandleTime);
                  return !handleHasXRay && segmentHandleXRayInfo ? (
                    <NoXRayOverlay 
                      timeDifference={segmentHandleXRayInfo.timeDifference}
                      direction={segmentHandleXRayInfo.direction}
                    />
                  ) : null;
                }
                // Otherwise show info for current scrubber position
                return !hasXRayAtTime(currentTime) && nearestXRayInfo ? (
                  <NoXRayOverlay 
                    timeDifference={nearestXRayInfo.timeDifference}
                    direction={nearestXRayInfo.direction}
                  />
                ) : null;
              })()}
              
              {/* Virtual Ruler Overlay in Segment Mode - Only show when X-ray is available */}
              {hasXRayAtTime(currentTime) && (
                <VirtualRulerOverlay
                  isVisible={isVirtualRulerVisible}
                />
              )}

              {/* Segment Handle Diamonds in Segment Mode - Show all three handles when segment is active */}
              {isSegmentActive && segmentHandlePositions && (
                <>
                  {/* Left Handle Diamond */}
                  {hasXRayAtTime(segmentHandlePositions.left.time) && (
                    <div
                      className="absolute flex h-[29.605px] items-center justify-center w-[29.902px] z-50"
                      style={{
                        left: `${segmentHandlePositions.left.touch.x}px`,
                        top: `${segmentHandlePositions.left.touch.y}px`,
                      }}
                    >
                      <div className="flex-none rotate-[60deg]">
                        <div className="h-[22.194px] relative w-[21.38px]">
                          <div className="absolute bottom-[-11.264%] left-[-2.339%] right-[-11.693%] top-[-2.892%]">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 26">
                              <g filter="url(#filter0_d_left)">
                                <path d={svgPaths.p420a580} fill={isSegmentHandlePressed ? "#FFFFFF" : "#FFDD19"} />
                                <path d={svgPaths.p420a580} stroke="black" />
                              </g>
                              <defs>
                                <filter id="filter0_d_left" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="25.3359" width="24.3797" x="0.5" y="0.358108">
                                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                  <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                  <feOffset dx="1" dy="1" />
                                  <feGaussianBlur stdDeviation="0.5" />
                                  <feComposite in2="hardAlpha" operator="out" />
                                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
                                  <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_left" />
                                  <feBlend in="SourceGraphic" in2="effect1_dropShadow_left" mode="normal" result="shape" />
                                </filter>
                              </defs>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Middle Handle Diamond */}
                  {hasXRayAtTime(segmentHandlePositions.middle.time) && (
                    <div
                      className="absolute flex h-[29.605px] items-center justify-center w-[29.902px] z-50"
                      style={{
                        left: `${segmentHandlePositions.middle.touch.x}px`,
                        top: `${segmentHandlePositions.middle.touch.y}px`,
                      }}
                    >
                      <div className="flex-none rotate-[60deg]">
                        <div className="h-[22.194px] relative w-[21.38px]">
                          <div className="absolute bottom-[-11.264%] left-[-2.339%] right-[-11.693%] top-[-2.892%]">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 26">
                              <g filter="url(#filter0_d_middle)">
                                <path d={svgPaths.p420a580} fill={isSegmentHandlePressed ? "#FFFFFF" : "#FFDD19"} />
                                <path d={svgPaths.p420a580} stroke="black" />
                              </g>
                              <defs>
                                <filter id="filter0_d_middle" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="25.3359" width="24.3797" x="0.5" y="0.358108">
                                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                  <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                  <feOffset dx="1" dy="1" />
                                  <feGaussianBlur stdDeviation="0.5" />
                                  <feComposite in2="hardAlpha" operator="out" />
                                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
                                  <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_middle" />
                                  <feBlend in="SourceGraphic" in2="effect1_dropShadow_middle" mode="normal" result="shape" />
                                </filter>
                              </defs>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Right Handle Diamond */}
                  {hasXRayAtTime(segmentHandlePositions.right.time) && (
                    <div
                      className="absolute flex h-[29.605px] items-center justify-center w-[29.902px] z-50"
                      style={{
                        left: `${segmentHandlePositions.right.touch.x}px`,
                        top: `${segmentHandlePositions.right.touch.y}px`,
                      }}
                    >
                      <div className="flex-none rotate-[60deg]">
                        <div className="h-[22.194px] relative w-[21.38px]">
                          <div className="absolute bottom-[-11.264%] left-[-2.339%] right-[-11.693%] top-[-2.892%]">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 26">
                              <g filter="url(#filter0_d_right)">
                                <path d={svgPaths.p420a580} fill={isSegmentHandlePressed ? "#FFFFFF" : "#FFDD19"} />
                                <path d={svgPaths.p420a580} stroke="black" />
                              </g>
                              <defs>
                                <filter id="filter0_d_right" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="25.3359" width="24.3797" x="0.5" y="0.358108">
                                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                  <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                  <feOffset dx="1" dy="1" />
                                  <feGaussianBlur stdDeviation="0.5" />
                                  <feComposite in2="hardAlpha" operator="out" />
                                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
                                  <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_right" />
                                  <feBlend in="SourceGraphic" in2="effect1_dropShadow_right" mode="normal" result="shape" />
                                </filter>
                              </defs>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* X-ray Bookmarks on Touch Screen in Segment Mode - Only show when X-ray is available */}
              {hasXRayAtTime && hasXRayAtTime(currentTime) && bookmarks?.map((bookmark) => (
                bookmark.xrayPosition && (
                  <div
                    key={`touch-xray-bookmark-segment-${bookmark.id}`}
                    className="absolute z-40 w-5 h-5 cursor-pointer"
                    style={{
                      // Scale bookmark position from main screen to smaller touch screen coordinates
                      left: `${(bookmark.xrayPosition.x * (300 / 718)) - 10}px`, // Scale and center the 20px bookmark
                      top: `${(bookmark.xrayPosition.y * (280 / 796)) - 10}px`,
                    }}
                    onClick={() => onBookmarkClick?.(bookmark)}
                    title={`Bookmark ${bookmark.id} - ${bookmark.time.toFixed(1)}s`}
                  >
                    {/* Use same bookmark icon as ILD track - even smaller for segment mode */}
                    <div className="absolute left-0.5 size-4 top-[-1px]" data-name="Bookmark">
                      <svg
                        className="block size-full"
                        fill="none"
                        preserveAspectRatio="none"
                        viewBox="0 0 24 24"
                      >
                        <g id="Bookmark">
                          <path
                            d="M18 23L12 17L6 23V1H18V23Z"
                            fill="#FF9F19"
                            id="path"
                          />
                        </g>
                      </svg>
                    </div>
                    <div className="absolute font-['CentraleSans',_sans-serif] font-bold leading-[0] left-2.5 not-italic text-[#000000] text-[8px] text-center text-nowrap top-0 translate-x-[-50%]">
                      <p className="block leading-[12px] whitespace-pre">{bookmark.id}</p>
                    </div>
                  </div>
                )
              ))}

              {/* Diamond-shaped scrubber indicator - Hidden when no X-ray recorded (only shows in normal mode with conditional) */}
            </div>
          )}

          {/* Video Control Buttons - Repositioned for smaller X-ray, hidden when no X-ray recorded or sync disabled */}
          {!isXRayHidden && isSyncPlaybackEnabled && hasXRayAtTime(currentTime) && (
            <div className="absolute top-[296px] left-[152px] z-10">
              <VideoControlButtons
                onVirtualRulerToggle={onVirtualRulerToggle}
                onXRayToggle={onXRayToggle}
              />
            </div>
          )}

          {/* 3-TOMO View - Right side with three IVUS videos */}
          <div className="absolute left-[468px] top-6 w-[700px] h-[300px]">
            <Component3TomoView
              segmentLeftTime={
                // Calculate segment left time based on touch screen ILD
                // Touch screen track width is different from main screen
                ((segmentLeft - 70) / 1403) * 26 // Assuming same ratio as main screen
              }
              segmentRightTime={
                // Calculate segment right time
                ((segmentLeft + segmentWidth - 70) / 1403) * 26
              }
              middleFrameTime={
                // Use middle handle position converted to touch screen coordinates for middle frame time
                ((middleHandlePosition - 70) / 1403) * 26
              }
              scale="compact"
            />
          </div>
        </>
      )}

      {/* Touch Screen Popover */}
      {isTouchPopoverVisible && !isSegmentActive && (
        <div
          className="absolute box-border content-stretch flex flex-row h-24 items-start justify-start p-0 shadow-[0px_1px_6px_0px_rgba(0,0,0,0.45)] w-[260px] z-50"
          style={{
            left: `${Math.max(16, Math.min(touchPopoverPosition.x - 260 - 16, 1280 - 260 - 16))}px`, // Position to the left of diamond, keep within screen bounds
            top: `${Math.max(100, touchPopoverPosition.y - 48)}px`, // Position centered vertically on diamond (half of popover height)
          }}
          data-touch-popover="true"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Main Container */}
          <div className="basis-0 bg-[#212121] box-border content-stretch flex flex-col grow items-center justify-start min-h-px min-w-px p-0 relative rounded-sm shrink-0">
            <div aria-hidden="true" className="absolute border border-[#595959] border-solid inset-0 pointer-events-none rounded-sm" />
            
            {/* Content */}
            <div className="relative shrink-0 w-full">
              <div className="relative size-full">
                <div className="box-border content-stretch flex flex-row items-start justify-start p-[16px] relative w-full">
                  <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
                    <div className="flex flex-row items-center justify-center relative size-full">
                      <div className="[flex-flow:wrap] box-border content-center flex gap-2 items-center justify-center px-2 py-1 relative w-full">
                        
                        {/* Adjust Position Button */}
                        <button
                          onClick={onTouchAdjustPosition}
                          className="bg-[rgba(89,89,89,0.55)] hover:bg-[rgba(89,89,89,0.75)] box-border content-stretch flex flex-row gap-2 items-center justify-center px-4 py-2 relative rounded-sm shrink-0 w-[228px] transition-colors cursor-pointer"
                        >
                          <div className="relative shrink-0 size-6">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                              <g>
                                <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" fill="#E8E8E8" />
                              </g>
                            </svg>
                          </div>
                          <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-left text-nowrap">
                            <p className="block leading-[22px] whitespace-pre">Adjust position</p>
                          </div>
                        </button>
                        
                        {/* Move to Nearest Frame Button */}
                        <button
                          onClick={onTouchMoveToNearestFrame}
                          className="bg-[rgba(89,89,89,0.55)] hover:bg-[rgba(89,89,89,0.75)] box-border content-stretch flex flex-row gap-2 items-center justify-center px-4 py-2 relative rounded-sm shrink-0 w-[228px] transition-colors cursor-pointer"
                        >
                          <div className="relative shrink-0 size-6">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                              <g>
                                <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" fill="#E8E8E8" />
                              </g>
                            </svg>
                          </div>
                          <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-left text-nowrap">
                            <p className="block leading-[22px] whitespace-pre">Move to nearest frame</p>
                          </div>
                        </button>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Arrow pointing right toward diamond */}
          <div className="absolute box-border content-stretch flex flex-col items-start justify-center px-0 py-4 right-[-10px] translate-y-[-50%]" style={{ top: "calc(50% - 0.5px)" }}>
            <div className="flex h-[16px] items-center justify-center relative shrink-0 w-[10px]">
              <div className="flex-none rotate-[270deg]">
                <div className="h-2.5 relative w-4">
                  <div className="absolute bottom-0 left-[-5%] right-[-5%] top-[-10%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 11">
                      <g>
                        <path d="M0.2 0L9 11L17.8 0H0.2Z" fill="#212121" />
                        <path d="M0.5 0.5L9 10.2L17.5 0.5" stroke="#595959" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Show X-Ray Button - Appears when X-Ray is hidden and sync is enabled */}
      {isXRayHidden && isSyncPlaybackEnabled && (
        <button
          onClick={onXRayToggle}
          className="absolute bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-row gap-2 items-center justify-center left-[152px] px-4 py-2 rounded-sm top-[400px] z-20"
        >
          <div className="relative shrink-0 size-6">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 24 24"
            >
              <path
                d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                fill="white"
                fillOpacity="0.8"
              />
            </svg>
          </div>
          <div className="font-['CentraleSans',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-left text-nowrap">
            <p className="block leading-[22px] whitespace-pre">
              Show X-Ray
            </p>
          </div>
        </button>
      )}

      {/* Control Buttons Section - Conditional rendering based on confirmed segments */}
      {!isSegmentActive ? (
        <div className="absolute h-16 left-[152px] bottom-[180px] w-[1104px]">
          {confirmedSegments.length === 0 ? (
            /* No confirmed segments - Show basic Add Segment button */
            <Frame137
              onAddSegment={onAddSegment}
              isSegmentActive={isSegmentActive}
              segmentType={segmentType}
              onSegmentTypeChange={onSegmentTypeChange}
              onSegmentConfirm={onSegmentConfirm}
              onSegmentCancel={onSegmentCancel}
              onSegmentDelete={onSegmentDelete}
            />
          ) : (
            /* Show confirmed segment info with edit and add segment buttons */
            <TouchScreenUpdatedSegmentButtons
              segments={confirmedSegments}
              onEdit={(segmentId) => onEditConfirmedSegment?.(segmentId)}
              onAddSegment={() => onAddSegment?.()}
            />
          )}
        </div>
      ) : (
        /* Segment Editing Box with Numerical Input */
        <div className="absolute h-16 left-[152px] bottom-[180px] w-[1104px]">
          <SegmentEditingBoxTouch
            segmentType={segmentType}
            segmentLength={segmentLength}
            segmentLabel={segmentLabel}
            onSegmentTypeChange={onSegmentTypeChange}
            onConfirm={onSegmentConfirm}
            onCancel={onSegmentCancel}
            onDelete={onSegmentDelete}
            onSizeIncrease={onSegmentSizeIncrease}
            onSizeDecrease={onSegmentSizeDecrease}
          />
        </div>
      )}

      {/* Touch Screen ILD Section with padding */}
      <div className="absolute h-[180px] left-[152px] bottom-0 w-[1104px] py-4">
        <TouchScreenILD
          currentTime={currentTime}
          duration={duration}
          onScrubberChange={onScrubberChange}
          onDragStateChange={onDragStateChange}
          bookmarks={bookmarks}
          onBookmarkClick={onBookmarkClick}
          isSegmentActive={isSegmentActive}
          segmentPosition={segmentPosition}
          segmentWidth={segmentWidth}
          segmentLeft={segmentLeft}
          onSegmentMove={onSegmentMove}
          onSegmentResize={onSegmentResize}
          onMiddleFrameDrag={onMiddleFrameDrag}
          middleHandlePosition={middleHandlePosition}
          segmentLength={segmentLength}
          segmentLabel={segmentLabel}
          confirmedSegments={confirmedSegments}
          onEditConfirmedSegment={onEditConfirmedSegment}
          onScrubberPositionUpdate={onScrubberPositionUpdate}
          onPreviousFrame={onPreviousFrame}
          onNextFrame={onNextFrame}
          onStartContinuousFrameStep={onStartContinuousFrameStep}
          onStopContinuousFrameStep={onStopContinuousFrameStep}
        />
      </div>

      {/* Touch Screen Action Bar - Vertical Left Sidebar */}
      <div className="absolute h-[720px] left-0 top-0 w-32">
        {/* Background */}
        <div className="absolute bg-neutral-900 box-border content-stretch flex flex-col gap-6 h-[720px] items-center justify-start left-0 px-0 py-4 top-0 w-32">
          {/* Top Navigation Buttons */}
          <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0">
            {/* Home Button */}
            <div className="box-border content-stretch flex flex-row gap-2 h-16 items-center justify-center px-4 py-4 relative rounded shrink-0 w-[88px] hover:bg-[rgba(89,89,89,0.55)] transition-colors cursor-pointer">
              <div className="relative shrink-0 size-8">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 32 32"
                >
                  <path
                    d={actionBarSvgPaths.p1c6ba100}
                    fill="#E8E8E8"
                  />
                </svg>
              </div>
            </div>

            {/* Snapshot Button */}
            <div className="box-border content-stretch flex flex-row gap-2 h-16 items-center justify-center px-4 py-4 relative rounded shrink-0 w-[88px] hover:bg-[rgba(89,89,89,0.55)] transition-colors cursor-pointer">
              <div className="relative shrink-0 size-8">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 32 32"
                >
                  <path
                    d={actionBarSvgPaths.pa1c6aa0}
                    fill="#E8E8E8"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Middle Action Buttons */}
          <div className="absolute box-border content-stretch flex flex-col gap-2 items-start justify-start left-4 p-0 top-[204px] w-[88px]">
            {/* Save Frame Button */}
            <div className="bg-[#c4c4c4] relative rounded shrink-0 w-full">
              <div className="flex flex-col items-center justify-center relative size-full">
                <div className="box-border content-stretch flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 relative w-full">
                  <div className="relative shrink-0 size-8">
                    <svg
                      className="block size-full"
                      fill="none"
                      preserveAspectRatio="none"
                      viewBox="0 0 32 32"
                    >
                      <path
                        d={actionBarSvgPaths.p2b832000}
                        fill="#171717"
                      />
                    </svg>
                  </div>
                  <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] min-w-full not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-center text-neutral-900 text-nowrap" style={{ width: "min-content" }}>
                    <p className="[text-overflow:inherit] [text-wrap-mode:inherit] [white-space-collapse:inherit] block leading-[20px] overflow-inherit">
                      Save Frame
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Annotate Button */}
            <div className="bg-[#c4c4c4] relative rounded shrink-0 w-full">
              <div className="flex flex-col items-center justify-center relative size-full">
                <div className="box-border content-stretch flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 relative w-full">
                  <div className="relative shrink-0 size-8">
                    <svg
                      className="block size-full"
                      fill="none"
                      preserveAspectRatio="none"
                      viewBox="0 0 32 32"
                    >
                      <path
                        d={actionBarSvgPaths.p27261b00}
                        fill="#171717"
                      />
                    </svg>
                  </div>
                  <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] min-w-full not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-center text-neutral-900 text-nowrap" style={{ width: "min-content" }}>
                    <p className="[text-overflow:inherit] [text-wrap-mode:inherit] [white-space-collapse:inherit] block leading-[20px] overflow-inherit">
                      Annotate
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Buttons */}
          <div className="absolute box-border content-stretch flex flex-col gap-2 items-start justify-start left-4 p-0 top-[504px] w-[88px]">
            {/* Bookmark Button */}
            <button
              onClick={onBookmarkToggle}
              className="bg-[rgba(89,89,89,0.55)] relative rounded shrink-0 w-full hover:bg-[rgba(89,89,89,0.75)] transition-colors"
            >
              <div className="flex flex-col items-center justify-center relative size-full">
                <div className="box-border content-stretch flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 relative w-full">
                  <div className="relative shrink-0 size-8">
                    <svg
                      className="block size-full"
                      fill="none"
                      preserveAspectRatio="none"
                      viewBox="0 0 32 32"
                    >
                      <path
                        d={actionBarSvgPaths.p4c62300}
                        fill="#E8E8E8"
                      />
                    </svg>
                  </div>
                  <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] min-w-full not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-center text-[#e8e8e8] text-nowrap" style={{ width: "min-content" }}>
                    <p className="[text-overflow:inherit] [text-wrap-mode:inherit] [white-space-collapse:inherit] block leading-[20px] overflow-inherit">
                      {bookmarkButtonText}
                    </p>
                  </div>
                </div>
              </div>
            </button>

            {/* Playback Button */}
            <button
              onClick={onPlayPause}
              className="bg-[rgba(89,89,89,0.55)] relative rounded shrink-0 w-full hover:bg-[rgba(89,89,89,0.75)] transition-colors"
            >
              <div className="flex flex-col items-center justify-center relative size-full">
                <div className="box-border content-stretch flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 relative w-full">
                  <div className="relative shrink-0 size-8">
                    <svg
                      className="block size-full"
                      fill="none"
                      preserveAspectRatio="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d={isPlaying 
                          ? "M12 1C5.92 1 1 5.92 1 12C1 18.08 5.92 23 12 23C18.08 23 23 18.08 23 12C23 5.92 18.08 1 12 1ZM11 18H8V6H11V18ZM16 18H13V6H16V18Z" 
                          : "M12 1C5.92 1 1 5.92 1 12C1 18.08 5.92 23 12 23C18.08 23 23 18.08 23 12C23 5.92 18.08 1 12 1ZM8 19V5L20 12L8 19Z"}
                        fill="#E8E8E8"
                      />
                    </svg>
                  </div>
                  <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] min-w-full not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-center text-[#e8e8e8] text-nowrap" style={{ width: "min-content" }}>
                    <p className="[text-overflow:inherit] [text-wrap-mode:inherit] [white-space-collapse:inherit] block leading-[20px] overflow-inherit">
                      {isPlaying ? "Pause" : "Playback"}
                    </p>
                  </div>
                </div>
              </div>
            </button>

            {/* Live Button */}
            <button
              onClick={onGoLive}
              className="bg-[#1474a4] relative rounded shrink-0 w-full hover:bg-[#1a85b5] transition-colors"
            >
              <div className="flex flex-col items-center justify-center relative size-full">
                <div className="box-border content-stretch flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 relative w-full">
                  <div className="relative shrink-0 size-8">
                    <svg
                      className="block size-full"
                      fill="none"
                      preserveAspectRatio="none"
                      viewBox="0 0 32 32"
                    >
                      <path
                        d={actionBarSvgPaths.p2bda4100}
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] min-w-full not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-center text-white text-nowrap" style={{ width: "min-content" }}>
                    <p className="[text-overflow:inherit] [text-wrap-mode:inherit] [white-space-collapse:inherit] block leading-[20px] overflow-inherit">
                      Live
                    </p>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}