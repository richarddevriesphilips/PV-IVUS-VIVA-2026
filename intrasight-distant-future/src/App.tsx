import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { NavigationBar } from "./components/NavigationBar";
import { ILDSection } from "./components/ILDSection";
import { TouchScreen } from "./components/TouchScreen";
import { LoadingScreen } from "./components/LoadingScreen";
import { PullbackRecordingMainScreen } from "./components/PullbackRecordingMainScreen";
import { PullbackRecordingTouchScreen } from "./components/PullbackRecordingTouchScreen";
import { LiveMainScreen } from "./components/LiveMainScreen";
import { LiveTouchScreen } from "./components/LiveTouchScreen";
import { PopupMainScreen } from "./components/PopupMainScreen";
import Vector19 from "./imports/Vector19";
import { MetricsDisplay } from "./components/MetricsDisplay";
import { VirtualRulerOverlay } from "./components/VirtualRulerOverlay";
import { NoXRayOverlay } from "./components/NoXRayOverlay";
import VerticalContainer from "./imports/VerticalContainer";
import SegmentDefaultEditing from "./imports/SegmentDefaultEditing-2129-359";
import SegmentEditingBoxMouse from "./imports/SegmentEditingBoxMouse-2155-2141";
import Component3TomoView from "./imports/3TomoView-2073-3470";
import SegmentButton from "./imports/SegmentButton";
import popoverSvgPaths from "./imports/svg-626nhpiffb";
import { IVUSMeasurementOverlay } from "./components/IVUSMeasurementOverlay";
import { ILDPathOverlay } from "./components/ILDPathOverlay";

// Import utilities and hooks
import { APP_CONSTANTS } from "./components/constants/appConstants";
import { BookmarkData, ConfirmedSegment, ScreenView, VideoRefs } from "./components/types";

type AppPhase = "live" | "recording" | "analysis";

// X-ray recording interval type
interface XRayInterval {
  start: number; // Start time in seconds
  end: number;   // End time in seconds
}
import { WaveformUtils } from "./components/utils/waveformUtils";
import { subscribeToBorderEdits } from "./utils/ivusBorders";
import { PositionUtils } from "./components/utils/positionUtils";
import { useVideoManager } from "./components/hooks/useVideoManager";
import { useBookmarkManager } from "./components/hooks/useBookmarkManager";
import { useSegmentManager } from "./components/hooks/useSegmentManager";

// Import SVG paths and images
import svgPaths from "./imports/svg-htfrh24qmy";
import segmentSvgPaths from "./imports/svg-u67og6v0lz";
import rulerSvgPaths from "./imports/svg-rnfs0zgsud";

// Video sources for different phases
const VIDEO_SOURCES = {
  'IVUS-recording-export.mp4': '/intrasight-distant-future/assets/videos/IVUS-recording-export.mp4',
  'postrecord.mov': '/intrasight-distant-future/assets/videos/postrecord.mov',
  xray: '/intrasight-distant-future/assets/videos/postrecord.mov',
  ivus: '/intrasight-distant-future/assets/videos/IVUS-recording-export.mp4'
};

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

export default function App() {
  // Application phase state
  const [appPhase, setAppPhase] = useState<AppPhase>("live");
  
  // Core application state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(APP_CONSTANTS.DURATION);
  const [scrubberPosition, setScrubberPosition] = useState(() => 
    PositionUtils.timeToScrubberPosition(0) // Initialize based on time 0
  );
  const [videosLoaded, setVideosLoaded] = useState(0);
  const [videosReady, setVideosReady] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isXRayHidden, setIsXRayHidden] = useState(false);
  const [isVirtualRulerVisible, setIsVirtualRulerVisible] = useState(false);
const [screenView, setScreenView] = useState<ScreenView>("main");
  const [popupWindow, setPopupWindow] = useState<Window | null>(null);
  const [isSyncPlaybackEnabled, setIsSyncPlaybackEnabled] = useState(true);
  const [isControlPanelVisible, setIsControlPanelVisible] = useState(false);
  const [manuallyHidden, setManuallyHidden] = useState(false);

  // Fit the fixed 1920x1080 main screen exactly to the FlexVision quadrant
  // it's embedded in (no padding/scrollbars - just the scaled window).
  const mainScreenContainerRef = useRef<HTMLDivElement>(null);
  const [mainScreenScale, setMainScreenScale] = useState(1);

  useEffect(() => {
    const container = mainScreenContainerRef.current;
    if (!container) return;

    const calculateScale = () => {
      const { clientWidth, clientHeight } = container;
      setMainScreenScale(Math.min(clientWidth / 1920, clientHeight / 1080));
    };

    calculateScale();

    const resizeObserver = new ResizeObserver(calculateScale);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);
  
  // Popover state
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });
  
  // Touch screen popover state
  const [isTouchPopoverVisible, setIsTouchPopoverVisible] = useState(false);
  const [touchPopoverPosition, setTouchPopoverPosition] = useState({ x: 0, y: 0 });
  
  // Unified diamond scrubber state
  const [diamondPosition, setDiamondPosition] = useState({ x: 0, y: 0 }); // Main screen coordinates
  const [diamondTime, setDiamondTime] = useState(0);
  const [isDiamondDragging, setIsDiamondDragging] = useState(false);
  const [diamondOffset, setDiamondOffset] = useState({ x: 0, y: 0 }); // Offset from the normal path
  const [dragSource, setDragSource] = useState<'main' | 'touch' | null>(null); // Track which screen initiated drag
  const [shouldMaintainDraggedPosition, setShouldMaintainDraggedPosition] = useState(false); // Keep position during popover
  const [isSegmentHandleDragging, setIsSegmentHandleDragging] = useState(false); // Track when segment handles are being dragged
  const [segmentHandleTime, setSegmentHandleTime] = useState<number | null>(null); // Track the time of dragged segment handle
  
  // Mouse press state for visual feedback
  const [isScrubberPressed, setIsScrubberPressed] = useState(false); // Track when scrubber is pressed down
  const [isDiamondPressed, setIsDiamondPressed] = useState(false); // Track when diamond is pressed down
  const [isSegmentHandlePressed, setIsSegmentHandlePressed] = useState(false); // Track when segment handle is pressed down
  
  // Frame stepping state
  const frameStepIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // X-ray recording intervals state
  const [xrayIntervals, setXrayIntervals] = useState<XRayInterval[]>([]);
  const xrayRecordingStartTimeRef = useRef<number | null>(null);

  // Video refs
  const leftVideoRef = useRef<HTMLVideoElement>(null);
  const rightVideoRef = useRef<HTMLVideoElement>(null);
  const touchLeftVideoRef = useRef<HTMLVideoElement>(null);
  const touchRightVideoRef = useRef<HTMLVideoElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Broadcast spacebar (fluoro pedal) to parent in all phases
  // Use capture phase so this fires before any component handlers
  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !e.repeat) {
        window.parent.postMessage({ type: "intrasight-fluoro", on: true }, "*");
      }
    };
    const onUp = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        window.parent.postMessage({ type: "intrasight-fluoro", on: false }, "*");
      }
    };
    document.addEventListener("keydown", onDown, true);
    document.addEventListener("keyup", onUp, true);
    window.addEventListener("keydown", onDown, true);
    window.addEventListener("keyup", onUp, true);
    return () => {
      document.removeEventListener("keydown", onDown, true);
      document.removeEventListener("keyup", onUp, true);
      window.removeEventListener("keydown", onDown, true);
      window.removeEventListener("keyup", onUp, true);
    };
  }, []);

  // Preloading video refs (used during loading screen)
  const preloadLeftVideoRef = useRef<HTMLVideoElement>(null);
  const preloadRightVideoRef = useRef<HTMLVideoElement>(null);
  const preloadTouchLeftVideoRef = useRef<HTMLVideoElement>(null);
  const preloadTouchRightVideoRef = useRef<HTMLVideoElement>(null);

  // Initialize managers and hooks
  const videoRefs: VideoRefs = { leftVideoRef, rightVideoRef, touchLeftVideoRef, touchRightVideoRef };
  const videoManager = useVideoManager(videoRefs);
  const bookmarkManager = useBookmarkManager();
  const segmentManager = useSegmentManager();

  // Computed values
  // Re-generate waveform data when borders are edited so the ILD stays in sync.
  const [waveformEditTick, setWaveformEditTick] = useState(0);
  useEffect(() => subscribeToBorderEdits(() => setWaveformEditTick((v: number) => v + 1)), []);
  const mainScreenWaveformData = useMemo(() => WaveformUtils.generateMainScreenWaveformData(), [waveformEditTick]);
  const mainScreenIndicatorPosition = PositionUtils.getMainScreenIndicatorPosition(currentTime);
  const bookmarkButtonText = bookmarkManager.getBookmarkButtonText(scrubberPosition);
  
  // Calculate diamond positions for both screens
  // Diamond position on the main screen (video-relative coords). The touch-screen scaled
  // variant was removed as dead code once touch-screen rendering was dropped.
  const diamondPositions = useMemo(() => {
    if (isDiamondDragging || shouldMaintainDraggedPosition || isSegmentHandleDragging) {
      // diamondPosition contains main screen video coordinates relative to video bounds (0-718, 0-796)
      return {
        main: {
          x: diamondPosition.x - 14, // Center the 28px diamond
          y: diamondPosition.y - 14
        }
      };
    } else {
      // Follow main timeline with any applied offset
      const basePosition = PositionUtils.getMainScreenIndicatorPosition(currentTime);
      return {
        main: {
          x: APP_CONSTANTS.INDICATOR.BASE_OFFSET_X + basePosition.x + diamondOffset.x,
          y: APP_CONSTANTS.INDICATOR.BASE_OFFSET_Y + basePosition.y + diamondOffset.y
        }
      };
    }
  }, [diamondPosition, isDiamondDragging, shouldMaintainDraggedPosition, isSegmentHandleDragging, currentTime, diamondOffset]);
  
  // Calculate positions for all three segment handles when segment is active
  const segmentHandlePositions = useMemo(() => {
    if (!segmentManager.isSegmentActive) {
      return null;
    }

    // Calculate times for each handle
    const { ILD_LEFT_BOUNDARY, ILD_USABLE_WIDTH } = APP_CONSTANTS.MAIN_SCREEN;
    
    const leftHandlePosition = segmentManager.segmentLeft;
    const leftHandlePercentage = (leftHandlePosition - ILD_LEFT_BOUNDARY) / ILD_USABLE_WIDTH;
    const leftHandleTime = Math.max(0, Math.min(leftHandlePercentage * APP_CONSTANTS.DURATION, APP_CONSTANTS.DURATION));
    
    const middleHandlePosition = segmentManager.middleHandlePosition;
    const middleHandlePercentage = (middleHandlePosition - ILD_LEFT_BOUNDARY) / ILD_USABLE_WIDTH;
    const middleHandleTime = Math.max(0, Math.min(middleHandlePercentage * APP_CONSTANTS.DURATION, APP_CONSTANTS.DURATION));
    
    const rightHandlePosition = segmentManager.segmentLeft + segmentManager.segmentWidth;
    const rightHandlePercentage = (rightHandlePosition - ILD_LEFT_BOUNDARY) / ILD_USABLE_WIDTH;
    const rightHandleTime = Math.max(0, Math.min(rightHandlePercentage * APP_CONSTANTS.DURATION, APP_CONSTANTS.DURATION));

    // Calculate x-ray positions for each handle
    const calculateHandleXRayPosition = (time: number) => {
      const indicatorPos = PositionUtils.getMainScreenIndicatorPosition(time);
      return {
        x: APP_CONSTANTS.INDICATOR.BASE_OFFSET_X + indicatorPos.x,
        y: APP_CONSTANTS.INDICATOR.BASE_OFFSET_Y + indicatorPos.y
      };
    };

    const leftPos = calculateHandleXRayPosition(leftHandleTime);
    const middlePos = calculateHandleXRayPosition(middleHandleTime);
    const rightPos = calculateHandleXRayPosition(rightHandleTime);

    return {
      left: { main: { x: leftPos.x, y: leftPos.y }, time: leftHandleTime },
      middle: { main: { x: middlePos.x, y: middlePos.y }, time: middleHandleTime },
      right: { main: { x: rightPos.x, y: rightPos.y }, time: rightHandleTime }
    };
  }, [segmentManager.isSegmentActive, segmentManager.segmentLeft, segmentManager.segmentWidth, segmentManager.middleHandlePosition]);
  
  // Calculate the label for the segment being edited (A, B, C, etc.)
  const currentSegmentLabel = useMemo(() => {
    if (segmentManager.editingSegmentId !== null && segmentManager.originalSegmentData) {
      // Editing existing segment - use its original label
      return segmentManager.originalSegmentData.label;
    } else {
      // Creating new segment - use next available label based on confirmed segments count
      const nextLabelNumber = segmentManager.confirmedSegments.length + 1;
      return String.fromCharCode(64 + nextLabelNumber);
    }
  }, [segmentManager.editingSegmentId, segmentManager.originalSegmentData, segmentManager.confirmedSegments.length]);

  // Calculate loading progress
  const loadingProgress = (videosLoaded / 4) * 100;

  // Popup window management
  const handlePopOutMainScreen = () => {
    if (popupWindow && !popupWindow.closed) {
      // If popup already exists, focus it
      popupWindow.focus();
      return;
    }

    // Create new popup window
    const popup = window.open('', 'mainScreenPopup', 
      'width=1920,height=1080,scrollbars=no,resizable=yes,toolbar=no,menubar=no,location=no,status=no'
    );

    if (popup) {
      setPopupWindow(popup);
      
      // Change main window to show only touch screen
      setScreenView("touch");
      
      // Handle popup close
      const checkClosed = setInterval(() => {
        if (popup.closed) {
          setPopupWindow(null);
          setScreenView("main"); // Return to main screen when popup closes
          clearInterval(checkClosed);
        }
      }, 1000);
    }
  };

  const handleClosePopup = () => {
    if (popupWindow && !popupWindow.closed) {
      popupWindow.close();
    }
    setPopupWindow(null);
    setScreenView("main");
  };

  // Handle transition from live to recording phase
  const handleStartRecording = () => {
    setAppPhase("recording");
    window.parent.postMessage({ type: "intrasight-phase", phase: "recording" }, "*");
  };

  // Handle transition from recording to analysis phase
  const handleStartAnalysis = () => {
    setAppPhase("analysis");
    window.parent.postMessage({ type: "intrasight-phase", phase: "analysis" }, "*");
  };

  // Handle transition back to live mode
  const handleGoLive = () => {
    // Stop any playing videos
    if (isPlaying) {
      videoManager.handlePlayPause(true, currentTime, videosLoaded);
      setIsPlaying(false);
    }
    
    // Reset video positions
    videoManager.resetVideosToStart();
    setCurrentTime(0);
    setScrubberPosition(PositionUtils.timeToScrubberPosition(0));
    
    // Reset diamond state
    setDiamondPosition({ x: 0, y: 0 });
    setDiamondTime(0);
    setIsDiamondDragging(false);
    setDiamondOffset({ x: 0, y: 0 });
    setShouldMaintainDraggedPosition(false);
    
    // Close any popovers
    setIsPopoverVisible(false);
    setIsTouchPopoverVisible(false);
    
    // Close popup window if open
    if (popupWindow && !popupWindow.closed) {
      popupWindow.close();
    }
    setPopupWindow(null);
    // Keep current screen view preference when transitioning to live
    
    // Clear any frame stepping intervals
    if (frameStepIntervalRef.current) {
      clearInterval(frameStepIntervalRef.current);
      frameStepIntervalRef.current = null;
    }
    
    // Reset X-ray recording intervals
    setXrayIntervals([]);
    xrayRecordingStartTimeRef.current = null;
    
    // Reset bookmarks and segments
    bookmarkManager.resetBookmarks();
    segmentManager.resetSegments();
    
    // Transition to live phase
    setAppPhase("live");
    window.parent.postMessage({ type: "intrasight-phase", phase: "live" }, "*");
  };

  // Handle X-ray recording start (spacebar pressed)
  const handleXRayRecordingStart = useCallback((currentRecordingTime: number) => {
    xrayRecordingStartTimeRef.current = currentRecordingTime;
    console.log(`X-ray recording started at ${currentRecordingTime.toFixed(2)}s`);
  }, []);

  // Handle X-ray recording stop (spacebar released)
  const handleXRayRecordingStop = useCallback((currentRecordingTime: number) => {
    if (xrayRecordingStartTimeRef.current !== null) {
      const newInterval: XRayInterval = {
        start: xrayRecordingStartTimeRef.current,
        end: currentRecordingTime
      };
      setXrayIntervals(prev => [...prev, newInterval]);
      console.log(`X-ray recording stopped at ${currentRecordingTime.toFixed(2)}s`, newInterval);
      xrayRecordingStartTimeRef.current = null;
    }
  }, []);

  // Check if current time has X-ray recorded
  const hasXRayAtTime = useCallback((time: number): boolean => {
    return xrayIntervals.some(interval => time >= interval.start && time <= interval.end);
  }, [xrayIntervals]);

  // Find the nearest X-ray frame and calculate time difference (for overlay display)
  const getNearestXRayFrame = useCallback((time: number): { nearestTime: number; timeDifference: number; direction: 'ahead' | 'behind' } | null => {
    if (xrayIntervals.length === 0) return null;
    
    // Check if current time has X-ray data
    const hasXRay = xrayIntervals.some(interval => 
      time >= interval.start && time <= interval.end
    );
    
    if (hasXRay) {
      return null; // Current frame has X-ray, no need for nearest
    }
    
    // Find nearest X-ray frame
    let nearestTime = xrayIntervals[0].start;
    let minDistance = Math.abs(time - nearestTime);
    
    xrayIntervals.forEach(interval => {
      // Check start of interval
      const distanceToStart = Math.abs(time - interval.start);
      if (distanceToStart < minDistance) {
        minDistance = distanceToStart;
        nearestTime = interval.start;
      }
      
      // Check end of interval
      const distanceToEnd = Math.abs(time - interval.end);
      if (distanceToEnd < minDistance) {
        minDistance = distanceToEnd;
        nearestTime = interval.end;
      }
    });
    
    const timeDifference = Math.abs(time - nearestTime);
    const direction = time > nearestTime ? 'behind' : 'ahead';
    
    return { nearestTime, timeDifference, direction };
  }, [xrayIntervals]);

  // Calculate nearest X-ray frame info when current frame has no X-ray (for overlay)
  const nearestXRayInfo = useMemo(() => {
    return getNearestXRayFrame(currentTime);
  }, [currentTime, getNearestXRayFrame]);

  // Calculate nearest X-ray info for segment handle during dragging
  const segmentHandleXRayInfo = useMemo(() => {
    if (segmentHandleTime === null) return null;
    return getNearestXRayFrame(segmentHandleTime);
  }, [segmentHandleTime, getNearestXRayFrame]);

  // Calculate segment length with X-ray availability check
  const calculateSegmentLengthWithXRayCheck = useCallback((left: number, width: number): string => {
    // Calculate times for left and right handles
    const { ILD_LEFT_BOUNDARY, ILD_USABLE_WIDTH } = APP_CONSTANTS.MAIN_SCREEN;
    const rightEdge = left + width;
    
    const leftPercentage = (left - ILD_LEFT_BOUNDARY) / ILD_USABLE_WIDTH;
    const rightPercentage = (rightEdge - ILD_LEFT_BOUNDARY) / ILD_USABLE_WIDTH;
    
    const leftTime = Math.max(0, Math.min(leftPercentage * APP_CONSTANTS.DURATION, APP_CONSTANTS.DURATION));
    const rightTime = Math.max(0, Math.min(rightPercentage * APP_CONSTANTS.DURATION, APP_CONSTANTS.DURATION));
    
    // Check if both handles are in X-ray areas
    const leftHasXRay = hasXRayAtTime(leftTime);
    const rightHasXRay = hasXRayAtTime(rightTime);
    
    if (!leftHasXRay || !rightHasXRay) {
      return "";
    }
    
    // Both handles are in X-ray areas, calculate length based on actual curved X-ray path
    const pathLengthMm = PositionUtils.calculateXRayPathLength(leftTime, rightTime);
    return pathLengthMm.toFixed(1);
  }, [hasXRayAtTime]);

  // Event handlers
  const handlePlayPause = () => {
    const newPlayingState = videoManager.handlePlayPause(isPlaying, currentTime, videosLoaded);
    setIsPlaying(newPlayingState);
  };

  const calculateScrubberPositionFromPointer = useCallback((clientX: number) => {
    if (!trackRef.current) return null;

    const rect = trackRef.current.getBoundingClientRect();
    const scale = rect.width / 1543;
    const mouseX = (clientX - rect.left) / scale;

    return PositionUtils.constrainScrubberPosition(mouseX);
  }, []);

  const updateTimelineFromScrubberPosition = (position: number) => {
    const newTime = PositionUtils.scrubberPositionToTime(position);

    setScrubberPosition(position);
    setCurrentTime(newTime);
    updateVideoTimesWithXRayLogic(newTime);

    return newTime;
  };

  const handleScrubberMouseDown = (e: React.MouseEvent) => {
    if (segmentManager.isSegmentActive) return; // Disable during segment editing
    
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setIsScrubberPressed(true); // Track mouse press for visual feedback
    videoManager.startDragUpdateSystem();

    const handleMouseMove = (e: MouseEvent) => {
      const constrainedPosition = calculateScrubberPositionFromPointer(e.clientX);
      if (constrainedPosition === null) return;

      updateTimelineFromScrubberPosition(constrainedPosition);
    };

    const handleMouseUp = (e: MouseEvent) => {
      setIsDragging(false);
      setIsScrubberPressed(false); // Clear pressed state
      videoManager.stopDragUpdateSystem();
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    handleMouseMove(e.nativeEvent);
  };

  const handleMainTrackClick = (e: React.MouseEvent) => {
    if (!trackRef.current || segmentManager.isSegmentActive) return; // Disable during segment editing
    
    // Prevent event bubbling to avoid conflicts
    e.stopPropagation();

    const constrainedPosition = calculateScrubberPositionFromPointer(e.clientX);
    if (constrainedPosition === null) return;
    const newTime = updateTimelineFromScrubberPosition(constrainedPosition);
    
    // Update diamond time to follow main timeline if not being dragged independently
    if (!isDiamondDragging) {
      setDiamondTime(newTime);
    }
  };

  const handleTouchScreenScrubber = (time: number) => {
    const clampedTime = Math.min(time, APP_CONSTANTS.DURATION);
    setCurrentTime(clampedTime);
    const newMainScreenPosition = PositionUtils.timeToScrubberPosition(clampedTime);
    setScrubberPosition(newMainScreenPosition);
    
    // Update segment manager's scrubber position for collision detection
    if (segmentManager.isSegmentActive) {
      segmentManager.updateScrubberPosition(newMainScreenPosition);
    }
    
    // Update diamond time to follow main timeline if not being dragged independently
    if (!isDiamondDragging) {
      setDiamondTime(clampedTime);
    }
    
    updateVideoTimesWithXRayLogic(clampedTime);
  };

  const handleTouchScreenDragState = (dragState: boolean) => {
    setIsDragging(dragState);
    if (dragState) {
      videoManager.startDragUpdateSystem();
    } else {
      videoManager.stopDragUpdateSystem();
    }
  };

  // Handle middle frame dragging within segment
  const handleMiddleFrameDrag = (newPosition: number) => {
    console.log('Middle handle drag - received position:', newPosition);
    
    // Update the segment manager's middle handle position (not scrubber)
    segmentManager.handleMiddleFrameDrag(newPosition);
    
    // Calculate the time corresponding to the handle position
    // newPosition is already in main screen coordinates (TouchScreenILD converts it)
    const { ILD_LEFT_BOUNDARY, ILD_USABLE_WIDTH } = APP_CONSTANTS.MAIN_SCREEN;
    const percentage = (newPosition - ILD_LEFT_BOUNDARY) / ILD_USABLE_WIDTH;
    const handleTime = Math.max(0, Math.min(percentage * APP_CONSTANTS.DURATION, APP_CONSTANTS.DURATION));
    
    console.log('Middle handle drag - calculated time:', handleTime, 'from position:', newPosition);
    
    // Set segment handle dragging state and calculate diamond position
    setIsSegmentHandleDragging(true);
    setSegmentHandleTime(handleTime); // Track handle time for overlay display
    const indicatorPos = PositionUtils.getMainScreenIndicatorPosition(handleTime);
    setDiamondPosition({
      x: APP_CONSTANTS.INDICATOR.BASE_OFFSET_X + indicatorPos.x,
      y: APP_CONSTANTS.INDICATOR.BASE_OFFSET_Y + indicatorPos.y
    });
    setDiamondTime(handleTime);
    
    // Update X-ray video to show the frame at the handle position (with nearest frame logic)
    // Don't update currentTime state or scrubber - only the video itself
    updateVideoTimesWithXRayLogic(handleTime);
    
    // Don't update scrubber position or global currentTime - they should remain inactive during segment editing
  };

  // Handle segment resize (left/right handles) with video frame updates
  const handleSegmentResize = (newLeft: number, newWidth: number, isStart?: boolean) => {
    // Track pressed state on first call
    if (isStart) {
      setIsSegmentHandlePressed(true);
    }
    
    // Determine which handle was moved by comparing to previous values
    const oldLeft = segmentManager.segmentLeft;
    const oldRight = segmentManager.segmentLeft + segmentManager.segmentWidth;
    const newRight = newLeft + newWidth;
    
    // Update the segment manager
    segmentManager.handleSegmentResize(newLeft, newWidth);
    
    // Determine which handle was dragged and show that position
    let handlePosition: number;
    if (Math.abs(newLeft - oldLeft) > 0.1) {
      // Left handle was moved
      handlePosition = newLeft;
    } else if (Math.abs(newRight - oldRight) > 0.1) {
      // Right handle was moved
      handlePosition = newRight;
    } else {
      // Default to center if we can't determine (shouldn't happen)
      handlePosition = newLeft + (newWidth / 2);
    }
    
    // Calculate the time corresponding to the handle position
    const { ILD_LEFT_BOUNDARY, ILD_USABLE_WIDTH } = APP_CONSTANTS.MAIN_SCREEN;
    const percentage = (handlePosition - ILD_LEFT_BOUNDARY) / ILD_USABLE_WIDTH;
    const handleTime = Math.max(0, Math.min(percentage * APP_CONSTANTS.DURATION, APP_CONSTANTS.DURATION));
    
    // Set segment handle dragging state and calculate diamond position
    setIsSegmentHandleDragging(true);
    setSegmentHandleTime(handleTime); // Track handle time for overlay display
    const indicatorPos = PositionUtils.getMainScreenIndicatorPosition(handleTime);
    setDiamondPosition({
      x: APP_CONSTANTS.INDICATOR.BASE_OFFSET_X + indicatorPos.x,
      y: APP_CONSTANTS.INDICATOR.BASE_OFFSET_Y + indicatorPos.y
    });
    setDiamondTime(handleTime);
    
    // Update X-ray video to show the frame at the dragged handle position (with nearest frame logic)
    updateVideoTimesWithXRayLogic(handleTime, isSegmentHandlePressed);
  };

  // Handle segment movement with video frame updates
  const handleSegmentMove = (newLeft: number) => {
    // Update segment position via segment manager
    segmentManager.handleSegmentMove(newLeft);
  };

  // Unified diamond scrubber handlers that work for both screens
  const handleDiamondMouseDown = (e: React.MouseEvent, source: 'main' | 'touch' = 'main') => {
    if (segmentManager.isSegmentActive) return; // Disable during segment editing
    
    e.preventDefault();
    e.stopPropagation();
    setIsDiamondDragging(true);
    setIsDiamondPressed(true); // Track mouse press for visual feedback
    setDragSource(source);

    // Get the appropriate video element based on drag source
    const videoElement = source === 'main' 
      ? leftVideoRef.current
      : touchLeftVideoRef.current;
      
    if (!videoElement) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!videoElement) return;
      const rect = videoElement.getBoundingClientRect();
      
      // Calculate mouse position relative to video bounds
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      // Constrain to video bounds
      const constrainedX = Math.max(0, Math.min(mouseX, rect.width));
      const constrainedY = Math.max(0, Math.min(mouseY, rect.height));
      
      if (source === 'main') {
        // Main screen drag - update position directly in video coordinates
        setDiamondPosition({ x: constrainedX, y: constrainedY });
        
        // Calculate corresponding time for this diamond position
        const percentage = constrainedX / rect.width;
        const newDiamondTime = Math.min(percentage * APP_CONSTANTS.DURATION, APP_CONSTANTS.DURATION);
        setDiamondTime(newDiamondTime);
      } else {
        // Touch screen drag - scale up to main screen coordinates
        // constrainedX/Y are relative to the touch screen video element bounds (0 to video width/height)
        const mainScreenVideoWidth = 718;
        const touchScreenVideoWidth = segmentManager.isSegmentActive ? 300 : 455;
        const scaleX = mainScreenVideoWidth / touchScreenVideoWidth;
        
        const mainScreenVideoHeight = 796;
        const touchScreenVideoHeight = segmentManager.isSegmentActive ? 280 : 480;
        const scaleY = mainScreenVideoHeight / touchScreenVideoHeight;
        
        // Scale the touch screen video-relative coordinates to main screen video-relative coordinates
        const mainScreenX = constrainedX * scaleX;
        const mainScreenY = constrainedY * scaleY;
        setDiamondPosition({ x: mainScreenX, y: mainScreenY });
        
        // Calculate corresponding time for this diamond position (use touch screen coordinates)
        const percentage = constrainedX / rect.width;
        const newDiamondTime = Math.min(percentage * APP_CONSTANTS.DURATION, APP_CONSTANTS.DURATION);
        setDiamondTime(newDiamondTime);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      setIsDiamondDragging(false);
      setIsDiamondPressed(false); // Clear pressed state
      setDragSource(null);
      setShouldMaintainDraggedPosition(true); // Keep diamond in dragged position during popover
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      
      // Show popovers on both screens
      showDiamondPopovers(e, videoElement, source);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Function to show popovers on both screens simultaneously
  const showDiamondPopovers = (e: MouseEvent, videoElement: HTMLElement, source: 'main' | 'touch') => {
    const rect = videoElement.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const constrainedX = Math.max(0, Math.min(mouseX, rect.width));
    const constrainedY = Math.max(0, Math.min(mouseY, rect.height));

    if (source === 'main') {
      // Show main screen popover
      const mainScreenElement = document.querySelector('.bg-\\[\\#000000\\].relative.w-\\[1920px\\].h-\\[1080px\\]');
      if (mainScreenElement) {
        const mainScreenRect = mainScreenElement.getBoundingClientRect();
        const absoluteX = (rect.left - mainScreenRect.left) + constrainedX;
        const absoluteY = (rect.top - mainScreenRect.top) + constrainedY;
        
        setPopoverPosition({ x: absoluteX, y: absoluteY });
        setIsPopoverVisible(true);
      }

      // Show touch screen popover (scale position)
      const touchScreenElement = document.querySelector('.bg-\\[\\#000000\\].relative.w-\\[1280px\\].h-\\[720px\\]');
      if (touchScreenElement) {
        const touchScreenRect = touchScreenElement.getBoundingClientRect();
        // Scale main screen coordinates to touch screen
        const touchVideoWidth = segmentManager.isSegmentActive ? 300 : 455;
        const touchVideoHeight = segmentManager.isSegmentActive ? 280 : 480;
        const scaleX = touchVideoWidth / 718;
        const scaleY = touchVideoHeight / 796;
        
        const touchX = constrainedX * scaleX;
        const touchY = constrainedY * scaleY;
        
        // Position relative to touch screen (considering video position)
        const touchVideoOffsetX = segmentManager.isSegmentActive ? 152 : 152;
        const touchVideoOffsetY = 24;
        
        setTouchPopoverPosition({ 
          x: touchVideoOffsetX + touchX, 
          y: touchVideoOffsetY + touchY 
        });
        setIsTouchPopoverVisible(true);
      }
    } else {
      // Touch screen initiated - show both popovers
      const touchScreenElement = document.querySelector('.bg-\\[\\#000000\\].relative.w-\\[1280px\\].h-\\[720px\\]');
      if (touchScreenElement) {
        const touchScreenRect = touchScreenElement.getBoundingClientRect();
        const absoluteX = (rect.left - touchScreenRect.left) + constrainedX;
        const absoluteY = (rect.top - touchScreenRect.top) + constrainedY;
        
        setTouchPopoverPosition({ x: absoluteX, y: absoluteY });
        setIsTouchPopoverVisible(true);
      }

      // Show main screen popover (scale up position)
      const mainScreenElement = document.querySelector('.bg-\\[\\#000000\\].relative.w-\\[1920px\\].h-\\[1080px\\]');
      if (mainScreenElement) {
        const mainScreenRect = mainScreenElement.getBoundingClientRect();
        // Scale touch screen coordinates to main screen
        const mainVideoWidth = 718;
        const mainVideoHeight = 796;
        const touchVideoWidth = segmentManager.isSegmentActive ? 300 : 455;
        const touchVideoHeight = segmentManager.isSegmentActive ? 280 : 480;
        const scaleX = mainVideoWidth / touchVideoWidth;
        const scaleY = mainVideoHeight / touchVideoHeight;
        
        const mainX = constrainedX * scaleX;
        const mainY = constrainedY * scaleY;
        
        // Position relative to main screen (considering video position)
        const mainVideoOffsetX = isXRayHidden ? 548 : 84;
        const mainVideoOffsetY = 72;
        
        setPopoverPosition({ 
          x: mainVideoOffsetX + mainX, 
          y: mainVideoOffsetY + mainY 
        });
        setIsPopoverVisible(true);
      }
    }
  };

  // Popover handlers - Close both popovers simultaneously
  const handlePopoverClose = () => {
    setIsPopoverVisible(false);
    setIsTouchPopoverVisible(false);
    setShouldMaintainDraggedPosition(false); // Allow diamond to follow timeline again
  };

  const handleAdjustPosition = () => {
    // Calculate the offset needed to make the diamond's current position correspond to the current timeline
    const currentIndicatorPos = PositionUtils.getMainScreenIndicatorPosition(currentTime);
    const baseX = APP_CONSTANTS.INDICATOR.BASE_OFFSET_X + currentIndicatorPos.x;
    const baseY = APP_CONSTANTS.INDICATOR.BASE_OFFSET_Y + currentIndicatorPos.y;
    
    // Calculate the offset from where the diamond should be normally to where it currently is
    const newOffsetX = (diamondPosition.x - 14) - baseX; // -14 to account for centering
    const newOffsetY = (diamondPosition.y - 14) - baseY; // -14 to account for centering
    
    // Update the diamond offset so it follows this new path
    setDiamondOffset({ x: newOffsetX, y: newOffsetY });
    
    // Reset diamond dragging state so it follows the main timeline again
    setIsDiamondDragging(false);
    setShouldMaintainDraggedPosition(false);
    
    // Close both popovers
    setIsPopoverVisible(false);
    setIsTouchPopoverVisible(false);
  };

  const handleMoveToNearestFrame = () => {
    // Find the nearest position on the diamond's normal path (without offset)
    // The diamond's current position is in diamondPosition, we need to find the closest point on the normal timeline path
    
    // Get the current diamond position (accounting for centering offset)
    const currentDiamondX = diamondPosition.x;
    const currentDiamondY = diamondPosition.y;
    
    // Find the nearest time by searching through the timeline
    // We'll sample the timeline at regular intervals to find the closest path point
    let nearestTime = 0;
    let minDistance = Infinity;
    
    // Sample every 0.1 seconds to find the nearest path point
    for (let testTime = 0; testTime <= APP_CONSTANTS.DURATION; testTime += 0.1) {
      const testPosition = PositionUtils.getMainScreenIndicatorPosition(testTime);
      const testX = APP_CONSTANTS.INDICATOR.BASE_OFFSET_X + testPosition.x;
      const testY = APP_CONSTANTS.INDICATOR.BASE_OFFSET_Y + testPosition.y;
      
      // Calculate distance from current diamond position to this path point
      const distance = Math.sqrt(
        Math.pow(currentDiamondX - testX, 2) + 
        Math.pow(currentDiamondY - testY, 2)
      );
      
      if (distance < minDistance) {
        minDistance = distance;
        nearestTime = testTime;
      }
    }
    
    // Snap to the nearest frame time
    setCurrentTime(nearestTime);
    updateVideoTimesWithXRayLogic(nearestTime);
    
    // Update ILD scrubber position
    const newScrubberPosition = PositionUtils.timeToScrubberPosition(nearestTime);
    setScrubberPosition(newScrubberPosition);
    
    // Update diamond to follow the main timeline at this position (reset independent dragging)
    setIsDiamondDragging(false);
    setDiamondTime(nearestTime);
    setShouldMaintainDraggedPosition(false);
    
    // Reset any diamond offset so it follows the normal path
    setDiamondOffset({ x: 0, y: 0 });
    
    // Close both popovers
    setIsPopoverVisible(false);
    setIsTouchPopoverVisible(false);
  };

  // Touch screen popover handlers - Also close both popovers
  const handleTouchPopoverClose = () => {
    setIsPopoverVisible(false);
    setIsTouchPopoverVisible(false);
    setShouldMaintainDraggedPosition(false); // Allow diamond to follow timeline again
  };

  const handleTouchAdjustPosition = () => {
    // Same logic as main screen - calculate offset and apply it
    const currentIndicatorPos = PositionUtils.getMainScreenIndicatorPosition(currentTime);
    const baseX = APP_CONSTANTS.INDICATOR.BASE_OFFSET_X + currentIndicatorPos.x;
    const baseY = APP_CONSTANTS.INDICATOR.BASE_OFFSET_Y + currentIndicatorPos.y;
    
    // Calculate the offset from where the diamond should be normally to where it currently is
    const newOffsetX = (diamondPosition.x - 14) - baseX; // -14 to account for centering
    const newOffsetY = (diamondPosition.y - 14) - baseY; // -14 to account for centering
    
    // Update the diamond offset so it follows this new path
    setDiamondOffset({ x: newOffsetX, y: newOffsetY });
    
    // Reset diamond dragging state so it follows the main timeline again
    setIsDiamondDragging(false);
    setShouldMaintainDraggedPosition(false);
    
    // Close both popovers
    setIsPopoverVisible(false);
    setIsTouchPopoverVisible(false);
  };

  const handleTouchMoveToNearestFrame = () => {
    // Same logic as main screen - find nearest timeline position
    const currentDiamondX = diamondPosition.x;
    const currentDiamondY = diamondPosition.y;
    
    let nearestTime = 0;
    let minDistance = Infinity;
    
    // Sample every 0.1 seconds to find the nearest path point
    for (let testTime = 0; testTime <= APP_CONSTANTS.DURATION; testTime += 0.1) {
      const testPosition = PositionUtils.getMainScreenIndicatorPosition(testTime);
      const testX = APP_CONSTANTS.INDICATOR.BASE_OFFSET_X + testPosition.x;
      const testY = APP_CONSTANTS.INDICATOR.BASE_OFFSET_Y + testPosition.y;
      
      // Calculate distance from current diamond position to this path point
      const distance = Math.sqrt(
        Math.pow(currentDiamondX - testX, 2) + 
        Math.pow(currentDiamondY - testY, 2)
      );
      
      if (distance < minDistance) {
        minDistance = distance;
        nearestTime = testTime;
      }
    }
    
    // Snap to the nearest frame time
    setCurrentTime(nearestTime);
    updateVideoTimesWithXRayLogic(nearestTime);
    
    // Update ILD scrubber position
    const newScrubberPosition = PositionUtils.timeToScrubberPosition(nearestTime);
    setScrubberPosition(newScrubberPosition);
    
    // Update diamond to follow the main timeline at this position (reset independent dragging)
    setIsDiamondDragging(false);
    setDiamondTime(nearestTime);
    setShouldMaintainDraggedPosition(false);
    
    // Reset any diamond offset so it follows the normal path
    setDiamondOffset({ x: 0, y: 0 });
    
    // Close both popovers
    setIsPopoverVisible(false);
    setIsTouchPopoverVisible(false);
  };

  // Bookmark handlers
  const handleBookmarkToggle = () => {
    // Get the exact current diamond position from the calculated diamondPositions
    // The diamondPositions already account for both dragged and timeline-following positions
    // and include all necessary coordinate transformations and centering adjustments
    let currentDiamondX: number;
    let currentDiamondY: number;
    
    if (isDiamondDragging || shouldMaintainDraggedPosition) {
      // Use the dragged position coordinates (already in video coordinates)
      currentDiamondX = diamondPosition.x;
      currentDiamondY = diamondPosition.y;
    } else {
      // Calculate the current position on the catheter path based on timeline
      const basePosition = PositionUtils.getMainScreenIndicatorPosition(currentTime);
      // Add the base offsets to convert from ruler-relative to video-relative coordinates
      currentDiamondX = APP_CONSTANTS.INDICATOR.BASE_OFFSET_X + basePosition.x + diamondOffset.x;
      currentDiamondY = APP_CONSTANTS.INDICATOR.BASE_OFFSET_Y + basePosition.y + diamondOffset.y;
    }
    
    console.log('Bookmark created at diamond position:', { x: currentDiamondX, y: currentDiamondY }, 'at time:', currentTime);
    
    // Pass the X-ray position where the diamond currently is
    bookmarkManager.handleBookmarkToggle(
      scrubberPosition, 
      currentTime, 
      { x: currentDiamondX, y: currentDiamondY }
    );
  };

  const handleBookmarkClick = (bookmark: BookmarkData) => {
    bookmarkManager.handleBookmarkClick(
      bookmark,
      setScrubberPosition,
      setCurrentTime,
      updateVideoTimesWithXRayLogic
    );
  };

  // Wrapper for editing confirmed segment - navigates to middle frame
  const handleEditConfirmedSegment = (segmentId: number) => {
    // Find the segment being edited
    const segmentToEdit = segmentManager.confirmedSegments.find(s => s.id === segmentId);
    if (!segmentToEdit) return;

    // Calculate the middle frame position of the segment
    const { ILD_LEFT_BOUNDARY, ILD_USABLE_WIDTH } = APP_CONSTANTS.MAIN_SCREEN;
    const segmentCenter = segmentToEdit.left + (segmentToEdit.width / 2);
    const percentage = (segmentCenter - ILD_LEFT_BOUNDARY) / ILD_USABLE_WIDTH;
    const middleFrameTime = Math.max(0, Math.min(percentage * APP_CONSTANTS.DURATION, APP_CONSTANTS.DURATION));

    // Update current time and video position to the middle frame
    setCurrentTime(middleFrameTime);
    updateVideoTimesWithXRayLogic(middleFrameTime);
    setScrubberPosition(segmentCenter);

    // Update diamond time to follow main timeline
    if (!isDiamondDragging) {
      setDiamondTime(middleFrameTime);
    }

    // Now call the original segment edit handler
    segmentManager.handleEditConfirmedSegment(segmentId);
  };

  // Frame stepping functionality
  const stepFrame = useCallback((direction: 'forward' | 'backward') => {
    if (segmentManager.isSegmentActive) return; // Disable during segment editing
    
    const stepTime = 0.1; // 0.1 second steps for practical medical navigation
    const currentTimeValue = currentTime;
    
    let newTime: number;
    if (direction === 'forward') {
      newTime = Math.min(currentTimeValue + stepTime, APP_CONSTANTS.DURATION);
    } else {
      newTime = Math.max(currentTimeValue - stepTime, 0);
    }
    
    console.log(`Frame step ${direction}: ${currentTimeValue.toFixed(2)}s -> ${newTime.toFixed(2)}s`);
    
    setCurrentTime(newTime);
    updateVideoTimesWithXRayLogic(newTime);
    
    const newPosition = PositionUtils.timeToScrubberPosition(newTime);
    setScrubberPosition(newPosition);
    
    // Update diamond time to follow main timeline if not being dragged independently
    if (!isDiamondDragging) {
      setDiamondTime(newTime);
    }
  }, [currentTime, segmentManager.isSegmentActive, videoManager]);

  const handleNextFrame = useCallback(() => {
    console.log('Next frame clicked');
    stepFrame('forward');
  }, [stepFrame]);

  const handlePreviousFrame = useCallback(() => {
    console.log('Previous frame clicked');
    stepFrame('backward');
  }, [stepFrame]);

  const startContinuousFrameStep = useCallback((direction: 'forward' | 'backward') => {
    if (frameStepIntervalRef.current) return; // Prevent multiple intervals
    if (segmentManager.isSegmentActive) return; // Disable during segment editing
    
    console.log(`Starting continuous frame step: ${direction}`);
    frameStepIntervalRef.current = setInterval(() => {
      // Use smaller steps for continuous movement to create smooth scrubber motion
      const stepTime = 0.02; // 0.02 second steps for smooth continuous movement
      
      setCurrentTime(prevTime => {
        let newTime: number;
        if (direction === 'forward') {
          newTime = Math.min(prevTime + stepTime, APP_CONSTANTS.DURATION);
        } else {
          newTime = Math.max(prevTime - stepTime, 0);
        }
        
        // Update videos and scrubber position
        updateVideoTimesWithXRayLogic(newTime);
        const newPosition = PositionUtils.timeToScrubberPosition(newTime);
        setScrubberPosition(newPosition);
        
        // Update diamond time to follow main timeline if not being dragged independently
        if (!isDiamondDragging) {
          setDiamondTime(newTime);
        }
        
        return newTime;
      });
    }, 50); // 20 steps per second = 50ms interval (0.02s steps every 50ms for smooth movement)
  }, [segmentManager.isSegmentActive, videoManager]);

  const stopContinuousFrameStep = useCallback(() => {
    if (frameStepIntervalRef.current) {
      console.log('Stopping continuous frame step');
      clearInterval(frameStepIntervalRef.current);
      frameStepIntervalRef.current = null;
    }
  }, []);

  // Helper to get X-ray time for a given playback time
  const getXRayTimeForPlaybackTime = useCallback((playbackTime: number): number => {
    // Check if current time has X-ray data
    const hasXRay = xrayIntervals.some(interval => 
      playbackTime >= interval.start && playbackTime <= interval.end
    );
    
    if (hasXRay) {
      return playbackTime; // Use actual time if X-ray exists
    }
    
    // Find nearest X-ray frame
    if (xrayIntervals.length === 0) {
      return playbackTime; // No X-ray data at all, just use playback time
    }
    
    let nearestTime = xrayIntervals[0].start;
    let minDistance = Math.abs(playbackTime - nearestTime);
    
    xrayIntervals.forEach(interval => {
      // Check start of interval
      const distanceToStart = Math.abs(playbackTime - interval.start);
      if (distanceToStart < minDistance) {
        minDistance = distanceToStart;
        nearestTime = interval.start;
      }
      
      // Check end of interval
      const distanceToEnd = Math.abs(playbackTime - interval.end);
      if (distanceToEnd < minDistance) {
        minDistance = distanceToEnd;
        nearestTime = interval.end;
      }
      
      // If within interval, find closest point
      if (playbackTime >= interval.start && playbackTime <= interval.end) {
        nearestTime = playbackTime;
        minDistance = 0;
      }
    });
    
    return nearestTime;
  }, [xrayIntervals]);
  
  // Custom video update function that handles X-ray videos specially
  const updateVideoTimesWithXRayLogic = useCallback((newTime: number) => {
    // Calculate the X-ray time on-the-fly
    const xrayTime = getXRayTimeForPlaybackTime(newTime);
    
    // Update IVUS videos (always follow scrubber)
    if (rightVideoRef.current) {
      try {
        rightVideoRef.current.currentTime = newTime;
      } catch (error) {
        // Ignore seek errors
      }
    }
    if (touchRightVideoRef.current) {
      try {
        touchRightVideoRef.current.currentTime = newTime;
      } catch (error) {
        // Ignore seek errors
      }
    }
    
    // Update X-ray videos (show nearest frame when no X-ray at current position)
    if (leftVideoRef.current) {
      try {
        leftVideoRef.current.currentTime = xrayTime;
      } catch (error) {
        // Ignore seek errors
      }
    }
    if (touchLeftVideoRef.current) {
      try {
        touchLeftVideoRef.current.currentTime = xrayTime;
      } catch (error) {
        // Ignore seek errors
      }
    }
  }, [getXRayTimeForPlaybackTime]);

  // Video lifecycle effects
  useEffect(() => {
    const updateTime = () => {
      // Use IVUS video (right) for time tracking since X-ray video may be showing nearest frame
      const activeVideoRef = rightVideoRef.current ? rightVideoRef : touchRightVideoRef;
      
      if (activeVideoRef.current && videosReady && !isDragging) {
        const { shouldStop, newTime } = videoManager.handleVideoLoop(isPlaying);
        
        if (shouldStop) {
          setIsPlaying(false);
        }
        
        setCurrentTime(newTime);
        // Use custom video update that handles X-ray separately
        updateVideoTimesWithXRayLogic(newTime);
        
        const newPosition = PositionUtils.timeToScrubberPosition(newTime);
        setScrubberPosition(newPosition);
        
        // Update diamond time to follow main timeline if not being dragged independently
        if (!isDiamondDragging) {
          setDiamondTime(newTime);
        }
      }
    };

    const interval = setInterval(updateTime, APP_CONSTANTS.INTERVALS.PLAYBACK_UPDATE);
    return () => clearInterval(interval);
  }, [videosReady, isPlaying, isDragging, videoManager, isDiamondDragging, updateVideoTimesWithXRayLogic]);

  // Reset segment handle dragging state when segment becomes inactive
  useEffect(() => {
    if (!segmentManager.isSegmentActive && isSegmentHandleDragging) {
      setIsSegmentHandleDragging(false);
      setSegmentHandleTime(null);
    }
  }, [segmentManager.isSegmentActive, isSegmentHandleDragging]);

  useEffect(() => {
    if (videosLoaded === 4 && !videosReady) {
      // Small delay to ensure all videos are fully ready
      setTimeout(() => {
        videoManager.resetVideosToStart();
        setCurrentTime(0);
        const initialPosition = PositionUtils.timeToScrubberPosition(0);
        setScrubberPosition(initialPosition);
        
        // Initialize diamond state
        setDiamondPosition({ x: 0, y: 0 }); // Will be calculated by diamondIndicatorPosition
        setDiamondTime(0);
        setIsDiamondDragging(false);
        setDiamondOffset({ x: 0, y: 0 }); // No offset initially
        setShouldMaintainDraggedPosition(false);
        
        setVideosReady(true);
      }, 500);
    }
  }, [videosLoaded, videosReady, videoManager]);

  useEffect(() => () => videoManager.stopDragUpdateSystem(), [videoManager]);

  // Cleanup frame step interval on unmount
  useEffect(() => {
    return () => {
      if (frameStepIntervalRef.current) {
        clearInterval(frameStepIntervalRef.current);
      }
    };
  }, []);

  // Click outside handler for popovers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isPopoverVisible) {
        // Check if click is outside the main screen popover area
        const popoverElement = document.querySelector('[data-popover="true"]');
        if (popoverElement && !popoverElement.contains(event.target as Node)) {
          setIsPopoverVisible(false);
          setShouldMaintainDraggedPosition(false);
        }
      }
      
      if (isTouchPopoverVisible) {
        // Check if click is outside the touch screen popover area
        const touchPopoverElement = document.querySelector('[data-touch-popover="true"]');
        if (touchPopoverElement && !touchPopoverElement.contains(event.target as Node)) {
          setIsTouchPopoverVisible(false);
          setShouldMaintainDraggedPosition(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopoverVisible, isTouchPopoverVisible]);

  // Control panel auto-hide based on mouse position (right side)
  useEffect(() => {
    let hideTimeout: NodeJS.Timeout;
    
    const handleMouseMove = (event: MouseEvent) => {
      const windowWidth = window.innerWidth;
      const mouseX = event.clientX;
      const distanceFromRight = windowWidth - mouseX;
      
      // Clear existing timeout
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
      
      // Show panel when mouse is within 100px of right edge (only if not manually hidden)
      if (distanceFromRight < 100 && !manuallyHidden) {
        console.log('Mouse near right edge, showing panel');
        setIsControlPanelVisible(true);
        
        // Auto-hide after 2 seconds of no mouse movement near right edge
        hideTimeout = setTimeout(() => {
          console.log('Auto-hiding panel after timeout');
          setIsControlPanelVisible(false);
        }, 2000);
      } else if (distanceFromRight >= 100) {
        // Reset manual hide state when mouse moves away from right edge
        console.log('Mouse moved away, resetting manual hide');
        setManuallyHidden(false);
        setIsControlPanelVisible(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
  }, [manuallyHidden]);

  const handleVideoMetadataLoaded = () => {
    console.log('Video metadata loaded, count:', videosLoaded + 1);
    setVideosLoaded((prev) => prev + 1);
    setDuration(APP_CONSTANTS.DURATION);
  };

  const handlePreloadVideoError = (error: any) => {
    console.error('Video preload error:', error);
    // Still increment count to prevent infinite loading
    setVideosLoaded((prev) => prev + 1);
  };

  // Render main screen component for use in both normal view and popup
  const renderMainScreen = () => (
    <div className="bg-[#000000] relative w-[1920px] h-[1080px] overflow-hidden">
      <NavigationBar />

      {/* Main Content Area */}
      <div className={`absolute flex flex-row gap-6 h-[742px] items-start p-0 top-[72px] w-[1784px] transition-all ${
        (isXRayHidden || !isSyncPlaybackEnabled) ? "justify-center left-[68px]" : "justify-center left-4"
      }`}>
        {/* Left Video Panel - Only show when sync playback is enabled */}
        {!isXRayHidden && isSyncPlaybackEnabled && (
          <div className="bg-[#000000] h-[724px] absolute left-0 shrink-0 w-[700px] overflow-hidden">
            <div className="absolute h-[796px] left-0 top-0 w-[718px] overflow-hidden">
              <video
                ref={leftVideoRef}
                className="absolute h-[796px] left-0 top-0 w-[718px] object-cover"
                src={VIDEO_SOURCES.xray}
                preload="auto"
                muted
                playsInline
              />
              
              {/* Show overlay when no X-ray was recorded at current time or when dragging segment handle */}
              {(() => {
                // When dragging segment handle, show info for handle position
                if (isSegmentHandleDragging && segmentHandleTime !== null) {
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
              
              {/* ILD Path Overlay - Show ILD waveform on X-ray following the ruler path */}
              {hasXRayAtTime(currentTime) && (
                <ILDPathOverlay 
                  waveformData={mainScreenWaveformData}
                  currentTime={currentTime}
                />
              )}
              
              {/* Virtual Ruler Overlay - Only show when X-ray is available */}
              {isVirtualRulerVisible && hasXRayAtTime(currentTime) && (
                <div className="absolute h-[715px] left-[294px] top-[11px] w-[331px] pointer-events-none">
                  <div className="absolute bottom-[-0.28%] left-[-0.707%] right-[-0.604%] top-[-0.28%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 336 719">
                      <g
                        filter="url(#filter0_d_1_10572)"
                        id="Group 71"
                      >
                        <path
                          d={rulerSvgPaths.p3976ba20}
                          id="Vector 18"
                          stroke="white"
                        />
                        <line
                          id="Line 144"
                          stroke="white"
                          strokeWidth="3"
                          x1="37.8297"
                          x2="2.82968"
                          y1="7.4903"
                          y2="3.4903"
                        />
                        <circle
                          cx="17"
                          cy="42"
                          fill="white"
                          id="Ellipse 57"
                          r="5"
                        />
                        <circle
                          cx="19"
                          cy="84"
                          fill="white"
                          id="Ellipse 58"
                          r="5"
                        />
                        <circle
                          cx="24"
                          cy="125"
                          fill="white"
                          id="Ellipse 59"
                          r="5"
                        />
                        <circle
                          cx="30"
                          cy="166"
                          fill="white"
                          id="Ellipse 60"
                          r="5"
                        />
                        <circle
                          cx="40"
                          cy="204"
                          fill="white"
                          id="Ellipse 61"
                          r="5"
                        />
                        <circle
                          cx="53"
                          cy="246"
                          fill="white"
                          id="Ellipse 62"
                          r="5"
                        />
                        <circle
                          cx="70"
                          cy="291"
                          fill="white"
                          id="Ellipse 63"
                          r="5"
                        />
                        <circle
                          cx="93"
                          cy="336"
                          fill="white"
                          id="Ellipse 64"
                          r="5"
                        />
                        <circle
                          cx="117"
                          cy="379"
                          fill="white"
                          id="Ellipse 65"
                          r="5"
                        />
                        <circle
                          cx="143"
                          cy="418"
                          fill="white"
                          id="Ellipse 66"
                          r="5"
                        />
                        <circle
                          cx="178"
                          cy="467"
                          fill="white"
                          id="Ellipse 67"
                          r="5"
                        />
                        <circle
                          cx="213"
                          cy="506"
                          fill="white"
                          id="Ellipse 68"
                          r="5"
                        />
                        <circle
                          cx="250"
                          cy="555"
                          fill="white"
                          id="Ellipse 69"
                          r="5"
                        />
                        <circle
                          cx="275"
                          cy="599"
                          fill="white"
                          id="Ellipse 70"
                          r="5"
                        />
                        <circle
                          cx="300"
                          cy="650"
                          fill="white"
                          id="Ellipse 71"
                          r="5"
                        />
                        <circle
                          cx="329"
                          cy="712"
                          fill="white"
                          id="Ellipse 72"
                          r="5"
                        />
                      </g>
                      <defs>
                        <filter
                          colorInterpolationFilters="sRGB"
                          filterUnits="userSpaceOnUse"
                          height="719"
                          id="filter0_d_1_10572"
                          width="335.341"
                          x="0.659362"
                          y="-1.99745e-07"
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
                          <feOffset />
                          <feGaussianBlur stdDeviation="1" />
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
                            result="effect1_dropShadow_1_10572"
                          />
                          <feBlend
                            in="SourceGraphic"
                            in2="effect1_dropShadow_1_10572"
                            mode="normal"
                            result="shape"
                          />
                        </filter>
                      </defs>
                    </svg>
                  </div>
                </div>
              )}
              
              {/* X-ray Bookmarks - Only show when X-ray is available */}
              {hasXRayAtTime(currentTime) && bookmarkManager.bookmarks.map((bookmark) => {
                if (!bookmark.xrayPosition) return null;
                
                // Actual position on catheter
                const actualX = bookmark.xrayPosition.x;
                const actualY = bookmark.xrayPosition.y;
                
                // Offset position to the right side
                const offsetX = actualX + 60;
                const offsetY = actualY - 20;
                
                return (
                  <React.Fragment key={`xray-bookmark-${bookmark.id}`}>
                    {/* Connecting line from actual position to offset bookmark */}
                    <svg
                      className="absolute pointer-events-none"
                      style={{
                        left: 0,
                        top: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 39,
                      }}
                    >
                      <line
                        x1={actualX}
                        y1={actualY}
                        x2={offsetX}
                        y2={offsetY + 16}
                        stroke="#FF9F19"
                        strokeWidth="2"
                      />
                    </svg>
                    
                    {/* Small dot at actual position */}
                    <div
                      className="absolute pointer-events-none"
                      style={{
                        left: `${actualX - 4}px`,
                        top: `${actualY - 4}px`,
                        width: '8px',
                        height: '8px',
                        backgroundColor: '#FF9F19',
                        borderRadius: '50%',
                        zIndex: 40,
                      }}
                    />
                    
                    {/* Offset bookmark icon */}
                    <div
                      className="absolute z-40 w-8 h-8 cursor-pointer"
                      style={{
                        left: `${offsetX - 16}px`,
                        top: `${offsetY - 16}px`,
                      }}
                      onClick={() => handleBookmarkClick(bookmark)}
                      title={`Bookmark ${bookmark.id} - ${bookmark.time.toFixed(1)}s`}
                    >
                      {/* Use same bookmark icon as ILD track */}
                      <div className="absolute left-1 size-6 top-[-1px]" data-name="Bookmark">
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
                      <div className="absolute font-['CentraleSans',_sans-serif] font-bold leading-[0] left-4 not-italic text-[#000000] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">
                        <p className="block leading-[18px] whitespace-pre">{bookmark.id}</p>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}

              {/* Diamond Indicator - Only show when not in segment editing mode */}
              {!segmentManager.isSegmentActive && hasXRayAtTime(currentTime) && (
                <div
                  className="absolute z-50 w-7 h-7 rotate-45 overflow-hidden cursor-pointer"
                  style={{
                    left: `${diamondPositions.main.x - 15}px`,
                    top: `${diamondPositions.main.y}px`,
                  }}
                  onMouseDown={(e) => handleDiamondMouseDown(e, 'main')}
                >
                  <Vector19 isWhite={isDiamondPressed} />
                </div>
              )}
            </div>

            {/* Confirmed Segments - Show all confirmed segments on x-ray */}
            {segmentManager.confirmedSegments.map((segment: ConfirmedSegment) => {
              const { ILD_LEFT_BOUNDARY, ILD_USABLE_WIDTH } = APP_CONSTANTS.MAIN_SCREEN;
              const leftHandleTime = (segment.left - ILD_LEFT_BOUNDARY) / ILD_USABLE_WIDTH * APP_CONSTANTS.DURATION;
              const rightHandleTime = (segment.left + segment.width - ILD_LEFT_BOUNDARY) / ILD_USABLE_WIDTH * APP_CONSTANTS.DURATION;
              
              if (!hasXRayAtTime(leftHandleTime) || !hasXRayAtTime(rightHandleTime)) {
                return null;
              }

              const leftPos = PositionUtils.getMainScreenIndicatorPosition(leftHandleTime);
              const rightPos = PositionUtils.getMainScreenIndicatorPosition(rightHandleTime);
              const leftX = APP_CONSTANTS.INDICATOR.BASE_OFFSET_X + leftPos.x;
              const leftY = APP_CONSTANTS.INDICATOR.BASE_OFFSET_Y + leftPos.y;
              const rightX = APP_CONSTANTS.INDICATOR.BASE_OFFSET_X + rightPos.x;
              const rightY = APP_CONSTANTS.INDICATOR.BASE_OFFSET_Y + rightPos.y;
              
              const centerX = (leftX + rightX) / 2;
              const centerY = (leftY + rightY) / 2;
              const centerTime = (leftHandleTime + rightHandleTime) / 2;
              const timeDelta = (rightHandleTime - leftHandleTime) * 0.05;
              const beforePos = PositionUtils.getMainScreenIndicatorPosition(centerTime - timeDelta);
              const afterPos = PositionUtils.getMainScreenIndicatorPosition(centerTime + timeDelta);
              const dx = afterPos.x - beforePos.x;
              const dy = afterPos.y - beforePos.y;
              const rotationAngle = Math.atan2(dy, dx) * (180 / Math.PI);
              
              const pathPoints = [];
              const numPoints = 50;
              for (let i = 0; i <= numPoints; i++) {
                const t = leftHandleTime + (rightHandleTime - leftHandleTime) * (i / numPoints);
                const pos = PositionUtils.getMainScreenIndicatorPosition(t);
                pathPoints.push({
                  x: APP_CONSTANTS.INDICATOR.BASE_OFFSET_X + pos.x,
                  y: APP_CONSTANTS.INDICATOR.BASE_OFFSET_Y + pos.y
                });
              }
              
              let pathD = `M ${pathPoints[0].x} ${pathPoints[0].y}`;
              for (let i = 1; i < pathPoints.length - 1; i++) {
                const current = pathPoints[i];
                const next = pathPoints[i + 1];
                const controlX = current.x;
                const controlY = current.y;
                const endX = (current.x + next.x) / 2;
                const endY = (current.y + next.y) / 2;
                pathD += ` Q ${controlX} ${controlY}, ${endX} ${endY}`;
              }
              const lastPoint = pathPoints[pathPoints.length - 1];
              const secondLast = pathPoints[pathPoints.length - 2];
              pathD += ` Q ${secondLast.x} ${secondLast.y}, ${lastPoint.x} ${lastPoint.y}`;
              
              return (
                <React.Fragment key={`confirmed-segment-${segment.id}`}>
                  <svg
                    className="absolute pointer-events-none"
                    style={{
                      left: 0,
                      top: 0,
                      width: '100%',
                      height: '100%',
                      zIndex: 60,
                    }}
                  >
                    <path
                      d={pathD}
                      stroke="rgba(255, 255, 255, 0.25)"
                      strokeWidth="36"
                      strokeLinecap="round"
                      strokeLinejoin="miter"
                      strokeMiterlimit="1"
                      fill="none"
                    />
                  </svg>
                  
                  <div
                    className="absolute z-[63] pointer-events-none"
                    style={{
                      left: `${centerX}px`,
                      top: `${centerY}px`,
                      transform: `translate(-50%, -50%) rotate(${rotationAngle}deg)`,
                      backgroundColor: '#000000',
                      border: '1px solid #FFFFFF',
                      borderRadius: '15px',
                      padding: '0 10px',
                      height: '23px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <span style={{
                      color: '#FFFFFF',
                      fontFamily: 'CentraleSans, sans-serif',
                      fontSize: '14px',
                      fontWeight: '700',
                      lineHeight: '20px',
                    }}>
                      {segment.label} {segment.length} mm
                    </span>
                  </div>
                </React.Fragment>
              );
            })}

            {/* Segment Capsule Shape - Show when segment is active - Outside overflow container */}
            {segmentManager.isSegmentActive && segmentHandlePositions && 
             hasXRayAtTime(segmentHandlePositions.left.time) && 
             hasXRayAtTime(segmentHandlePositions.right.time) && (
              <>
                {(() => {
                  const leftX = segmentHandlePositions.left.main.x;
                  const leftY = segmentHandlePositions.left.main.y;
                  const rightX = segmentHandlePositions.right.main.x;
                  const rightY = segmentHandlePositions.right.main.y;
                  const middleX = segmentHandlePositions.middle.main.x;
                  const middleY = segmentHandlePositions.middle.main.y;
                  const leftHandleTime = segmentHandlePositions.left.time;
                  const rightHandleTime = segmentHandlePositions.right.time;
                  
                  const centerX = (leftX + rightX) / 2;
                  const centerY = (leftY + rightY) / 2;
                  
                  // Calculate segment length
                  const segmentLength = calculateSegmentLengthWithXRayCheck(
                    segmentManager.segmentLeft,
                    segmentManager.segmentWidth
                  );
                  
                  // Calculate rotation angle at center point to align with catheter
                  // Sample points slightly before and after center to get tangent direction
                  const centerTime = (leftHandleTime + rightHandleTime) / 2;
                  const timeDelta = (rightHandleTime - leftHandleTime) * 0.05; // 5% offset
                  const beforePos = PositionUtils.getMainScreenIndicatorPosition(centerTime - timeDelta);
                  const afterPos = PositionUtils.getMainScreenIndicatorPosition(centerTime + timeDelta);
                  const dx = afterPos.x - beforePos.x;
                  const dy = afterPos.y - beforePos.y;
                  const rotationAngle = Math.atan2(dy, dx) * (180 / Math.PI);
                  
                  // Generate curved path following catheter with smooth bezier curves
                  const pathPoints = [];
                  const numPoints = 50; // Increased for smoother curves
                  for (let i = 0; i <= numPoints; i++) {
                    const t = leftHandleTime + (rightHandleTime - leftHandleTime) * (i / numPoints);
                    const pos = PositionUtils.getMainScreenIndicatorPosition(t);
                    pathPoints.push({
                      x: APP_CONSTANTS.INDICATOR.BASE_OFFSET_X + pos.x,
                      y: APP_CONSTANTS.INDICATOR.BASE_OFFSET_Y + pos.y
                    });
                  }
                  
                  // Create smooth SVG path using quadratic bezier curves
                  let pathD = `M ${pathPoints[0].x} ${pathPoints[0].y}`;
                  
                  for (let i = 1; i < pathPoints.length - 1; i++) {
                    const current = pathPoints[i];
                    const next = pathPoints[i + 1];
                    const controlX = current.x;
                    const controlY = current.y;
                    const endX = (current.x + next.x) / 2;
                    const endY = (current.y + next.y) / 2;
                    pathD += ` Q ${controlX} ${controlY}, ${endX} ${endY}`;
                  }
                  
                  // Add final segment
                  const lastPoint = pathPoints[pathPoints.length - 1];
                  const secondLast = pathPoints[pathPoints.length - 2];
                  pathD += ` Q ${secondLast.x} ${secondLast.y}, ${lastPoint.x} ${lastPoint.y}`;
                  
                  return (
                    <>
                      {/* Semi-transparent white curved path following catheter */}
                      <svg
                        className="absolute pointer-events-none"
                        style={{
                          left: 0,
                          top: 0,
                          width: '100%',
                          height: '100%',
                          zIndex: 60,
                        }}
                      >
                        <path
                          d={pathD}
                          stroke="rgba(255, 255, 255, 0.25)"
                          strokeWidth="36"
                          strokeLinecap="round"
                          strokeLinejoin="miter"
                          strokeMiterlimit="1"
                          fill="none"
                        />
                      </svg>
                      
                      {/* White arrow marker at middle position */}
                      {hasXRayAtTime(segmentHandlePositions.middle.time) && (
                        <div
                          className="absolute pointer-events-none"
                          style={{
                            left: `${middleX + 5}px`,
                            top: `${middleY - 18}px`,
                            transform: `translate(-50%, -100%)`,
                            zIndex: 66,
                          }}
                        >
                          <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M-0.000815034 8.52325L7.4201 12.6379L11.2653 11.5358L7.95896 0.000228763L4.11379 1.10233L-0.000815034 8.52325Z" fill="white"/>
                          </svg>
                        </div>
                      )}
                      
                      {/* Black label pill on top - rotated to align with catheter */}
                      <div
                        className="absolute z-[63] pointer-events-none"
                        style={{
                          left: `${centerX}px`,
                          top: `${centerY}px`,
                          transform: `translate(-50%, -50%) rotate(${rotationAngle}deg)`,
                          backgroundColor: '#000000',
                          border: '1px solid #FFFFFF',
                          borderRadius: '15px',
                          padding: '0 10px',
                          height: '23px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        <span style={{
                          color: '#FFFFFF',
                          fontFamily: 'CentraleSans, sans-serif',
                          fontSize: '14px',
                          fontWeight: '700',
                          lineHeight: '20px',
                        }}>
                          {segmentLength ? `${currentSegmentLabel} ${segmentLength} mm` : currentSegmentLabel}
                        </span>
                      </div>
                    </>
                  );
                })()}
              </>
            )}

            {/* Tool Buttons - Hidden when no X-ray recorded */}
            {hasXRayAtTime(currentTime) && (
              <div className="absolute flex flex-row gap-2 items-center left-2 top-[678px] z-10">
                <button
                  onClick={() => setIsVirtualRulerVisible(!isVirtualRulerVisible)}
                  className="bg-[rgba(89,89,89,0.55)] px-4 py-2 rounded-sm"
                >
                  <div className="relative shrink-0 size-6">
                    <svg className="block size-full" fill="none" viewBox="0 0 24 26">
                      <path d={svgPaths.p3ea86a00} fill="white" fillOpacity="0.8" />
                    </svg>
                  </div>
                </button>
                <button
                  onClick={() => setIsXRayHidden(!isXRayHidden)}
                  className="bg-[rgba(89,89,89,0.55)] px-4 py-2 rounded-sm"
                >
                  <div className="relative shrink-0 size-6">
                    <svg className="block size-full" fill="none" viewBox="0 0 28 28">
                      <path d={svgPaths.p2c140d00} fill="white" fillOpacity="0.8" />
                    </svg>
                  </div>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Right Video Panel - Centered when X-ray is hidden or sync is disabled */}
        <div className={`h-[742px] absolute top-0 shrink-0 w-[824px] transition-all ${
          (isXRayHidden || !isSyncPlaybackEnabled) ? "left-[548px]" : "left-[976px]"
        }`}>
          {!segmentManager.isSegmentActive ? (
            <div className="absolute left-[77px] size-[664.617px] top-[30px]">
              <video
                ref={rightVideoRef}
                className="absolute left-0 size-[664.617px] top-0 object-cover rounded-full"
                src={VIDEO_SOURCES.ivus}
                preload="auto"
                muted
                playsInline
              />
              
              {/* Measurement Overlay — interactive: click a border to edit it */}
              <div className="absolute inset-0 flex items-center justify-center" style={{ transform: 'translate(6px, 6px)' }}>
                <IVUSMeasurementOverlay
                  containerSize={664.617}
                  frameNumber={Math.floor(currentTime * 30) + 1}
                  interactive
                />
              </div>
            </div>
          ) : (
            <div className="absolute left-[-284px] top-[120px] w-[900px] h-[500px]">
              <Component3TomoView
                segmentLeftTime={((segmentManager.segmentLeft - APP_CONSTANTS.MAIN_SCREEN.ILD_LEFT_BOUNDARY) / APP_CONSTANTS.MAIN_SCREEN.ILD_USABLE_WIDTH) * APP_CONSTANTS.DURATION}
                segmentRightTime={((segmentManager.segmentLeft + segmentManager.segmentWidth - APP_CONSTANTS.MAIN_SCREEN.ILD_LEFT_BOUNDARY) / APP_CONSTANTS.MAIN_SCREEN.ILD_USABLE_WIDTH) * APP_CONSTANTS.DURATION}
                middleFrameTime={((segmentManager.middleHandlePosition - APP_CONSTANTS.MAIN_SCREEN.ILD_LEFT_BOUNDARY) / APP_CONSTANTS.MAIN_SCREEN.ILD_USABLE_WIDTH) * APP_CONSTANTS.DURATION}
              />
            </div>
          )}
        </div>
      </div>

      {/* Show X-Ray Button - Only show when sync playback is enabled */}
      {isXRayHidden && isSyncPlaybackEnabled && (
        <button
          onClick={() => setIsXRayHidden(false)}
          className="absolute bg-[rgba(89,89,89,0.55)] px-4 py-2 rounded-sm text-white left-4 top-[765px] z-20"
        >
          Show X-Ray
        </button>
      )}

      {/* ILD Section */}
      <ILDSection
        trackRef={trackRef}
        waveformData={mainScreenWaveformData}
        confirmedSegments={segmentManager.confirmedSegments}
        bookmarks={bookmarkManager.bookmarks}
        isDragging={isDragging}
        onTrackClick={handleMainTrackClick}
        onEditConfirmedSegment={handleEditConfirmedSegment}
        onBookmarkClick={handleBookmarkClick}
        onPreviousFrame={handlePreviousFrame}
        onNextFrame={handleNextFrame}
        onStartContinuousFrameStep={startContinuousFrameStep}
        onStopContinuousFrameStep={stopContinuousFrameStep}
      />

      {/* Segment Controls */}
      {!segmentManager.isSegmentActive && segmentManager.confirmedSegments.length === 0 && (
        <div className="absolute left-[1563px] top-[825px]">
          <button
            onClick={() => segmentManager.handleAddSegment(scrubberPosition)}
            className="bg-[#696969] box-border content-stretch flex flex-row gap-2 h-10 items-center justify-center px-4 py-2 relative rounded-sm shrink-0 w-[227px]"
          >
            <div className="relative shrink-0 size-6">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 24 24"
              >
                <path d={segmentSvgPaths.p2a409f80} fill="#E8E8E8" />
              </svg>
            </div>
            <div className="font-['CentraleSans',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-left text-nowrap">
              <p className="block leading-[22px] whitespace-pre">Add Segment</p>
            </div>
          </button>
        </div>
      )}

      {!segmentManager.isSegmentActive && segmentManager.confirmedSegments.length > 0 && (
        <div className="absolute left-[1563px] top-[835px] w-[227px]" style={{ height: `${68 + (segmentManager.confirmedSegments.length * 68)}px` }}>
          <SegmentButton 
            segments={segmentManager.confirmedSegments.map(segment => ({
              id: segment.id,
              label: segment.label,
              length: segment.length
            }))}
            onEdit={(segmentId) => handleEditConfirmedSegment(segmentId)}
            onAddSegment={() => segmentManager.handleAddSegment(scrubberPosition)}
            onSegmentClick={(segmentId) => handleEditConfirmedSegment(segmentId)}
          />
        </div>
      )}

      {/* Scrubber */}
      {!segmentManager.isSegmentActive && (
        <div
          className="absolute cursor-pointer h-[167px] top-[835px] w-12 z-20"
          style={{ left: `${scrubberPosition - 24}px` }}
          onMouseDown={handleScrubberMouseDown}
        >
          <div className="absolute bottom-0 left-[-10%] right-[-10%] top-0 pointer-events-auto">
            <svg className="block size-full" fill="none" viewBox="0 0 48 167">
              <path d="M25 167H23V0H25V167Z" fill={isScrubberPressed ? "#FFFFFF" : "#FFDD19"} />
              <circle cx="24" cy="84" fill={isScrubberPressed ? "#999999" : "#A28E18"} r="20" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))" />
              <circle cx="24" cy="84" fill={isScrubberPressed ? "#FFFFFF" : "#FFDD19"} r="18" />
            </svg>
          </div>
        </div>
      )}

      {/* Segment Overlay */}
      {segmentManager.isSegmentActive && (
        <div
          className="absolute h-[167px] top-[835px] z-10"
          style={{
            left: `${segmentManager.segmentLeft}px`,
            width: `${segmentManager.segmentWidth}px`,
          }}
        >
          <SegmentDefaultEditing
            segmentLength={calculateSegmentLengthWithXRayCheck(segmentManager.segmentLeft, segmentManager.segmentWidth)}
            segmentLabel={currentSegmentLabel}
            onResize={handleSegmentResize}
            onMove={handleSegmentMove}
            onMiddleFrameDrag={handleMiddleFrameDrag}
            currentLeft={segmentManager.segmentLeft}
            currentWidth={segmentManager.segmentWidth}
            middleHandlePosition={segmentManager.middleHandlePosition}
          />
        </div>
      )}

      {/* Segment Editing Panel */}
      {segmentManager.isSegmentActive && (
        <div className="absolute left-[1563px] top-[835px] w-[332px] h-[167px]">
          <SegmentEditingBoxMouse
            segmentType={segmentManager.segmentType}
            segmentLength={calculateSegmentLengthWithXRayCheck(segmentManager.segmentLeft, segmentManager.segmentWidth)}
            segmentLabel={currentSegmentLabel}
            onSegmentTypeChange={segmentManager.setSegmentType}
            onConfirm={() => segmentManager.handleSegmentConfirm(calculateSegmentLengthWithXRayCheck(segmentManager.segmentLeft, segmentManager.segmentWidth))}
            onCancel={segmentManager.handleSegmentCancel}
            onDelete={segmentManager.handleSegmentDelete}
            onSizeIncrease={segmentManager.handleSegmentSizeIncrease}
            onSizeDecrease={segmentManager.handleSegmentSizeDecrease}
          />
        </div>
      )}

      {/* Action Bar */}
      <div className="absolute h-10 left-4 top-[1024px] w-[1888px] flex justify-between">
        <div className="flex gap-4">
          <button className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-row gap-2 items-center justify-center px-4 py-2 rounded-sm text-[#e8e8e8] w-[214px]">
            <div className="relative shrink-0 size-6">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                <path d={svgPaths.p2de5ed80} fill="#E8E8E8" />
              </svg>
            </div>
            <div className="font-['CentraleSans',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-left text-nowrap">
              <p className="block leading-[22px] whitespace-pre">Annotate</p>
            </div>
          </button>
          <button className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-row gap-2 items-center justify-center px-4 py-2 rounded-sm text-[#e8e8e8] w-[214px]">
            <div className="relative shrink-0 size-6">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                <path d={svgPaths.p28d83c80} fill="#E8E8E8" />
              </svg>
            </div>
            <div className="font-['CentraleSans',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-left text-nowrap">
              <p className="block leading-[22px] whitespace-pre">Save Frame</p>
            </div>
          </button>
        </div>
        <div className="flex gap-4">
          <button onClick={handleBookmarkToggle} className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-row gap-2 items-center justify-center px-4 py-2 rounded-sm text-[#e8e8e8] w-[214px]">
            <div className="relative shrink-0 size-6">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                <g id="Bookmark">
                  <path d="M18 23L12 17L6 23V1H18V23Z" fill="#E8E8E8" id="path" />
                </g>
              </svg>
            </div>
            <div className="font-['CentraleSans',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-left text-nowrap">
              <p className="block leading-[22px] whitespace-pre">{bookmarkButtonText}</p>
            </div>
          </button>
          <button onClick={handlePlayPause} className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-row gap-2 items-center justify-center px-4 py-2 rounded-sm text-[#e8e8e8] w-[214px]">
            <div className="relative shrink-0 size-6">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                <path d={isPlaying 
                  ? "M12 1C5.92 1 1 5.92 1 12C1 18.08 5.92 23 12 23C18.08 23 23 18.08 23 12C23 5.92 18.08 1 12 1ZM11 18H8V6H11V18ZM16 18H13V6H16V18Z" 
                  : "M12 1C5.92 1 1 5.92 1 12C1 18.08 5.92 23 12 23C18.08 23 23 18.08 23 12C23 5.92 18.08 1 12 1ZM8 19V5L20 12L8 19Z"} 
                  fill="#E8E8E8" />
              </svg>
            </div>
            <div className="font-['CentraleSans',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-left text-nowrap">
              <p className="block leading-[22px] whitespace-pre">{isPlaying ? "Pause" : "Playback"}</p>
            </div>
          </button>
          <button 
            onClick={handleGoLive}
            className="bg-[#1474a4] box-border content-stretch flex flex-row gap-2 items-center justify-center px-4 py-2 rounded-sm text-white w-[214px] hover:bg-[#1a85b5] transition-colors cursor-pointer"
          >
            <div className="relative shrink-0 size-6">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="8" fill="white" />
              </svg>
            </div>
            <div className="font-['CentraleSans',_sans-serif] leading-[0] not-italic relative shrink-0 text-white text-[16px] text-left text-nowrap">
              <p className="block leading-[22px] whitespace-pre">Live</p>
            </div>
          </button>
        </div>
      </div>

      {/* Metrics Display */}
      {!isXRayHidden && !segmentManager.isSegmentActive && (
        <div className="absolute left-[875px] top-[105px] w-[158px] h-[436px]">
          <MetricsDisplay currentTime={currentTime} duration={duration} isCompact={false} />
        </div>
      )}

      {/* Metrics Display - Centered when X-ray is hidden */}
      {isXRayHidden && !segmentManager.isSegmentActive && (
        <div className="absolute left-[447px] top-[105px] w-[158px] h-[436px]">
          <MetricsDisplay currentTime={currentTime} duration={duration} isCompact={false} />
        </div>
      )}

      {/* Right Side Panel */}
      {!segmentManager.isSegmentActive && (
        <div className="absolute left-[1816px] top-[72px] w-[88px] h-[901px]">
          <VerticalContainer />
        </div>
      )}

      {/* Diamond Scrubber Popover */}
      {isPopoverVisible && !segmentManager.isSegmentActive && (
        <div
          className="absolute box-border content-stretch flex flex-row h-24 items-start justify-start p-0 shadow-[0px_1px_6px_0px_rgba(0,0,0,0.45)] w-[260px] z-50"
          style={{
            left: `${Math.max(16, Math.min(popoverPosition.x - 260 - 16, 1920 - 260 - 16))}px`, // Position to the left of diamond, keep within screen bounds
            top: `${Math.max(100, popoverPosition.y - 48)}px`, // Position centered vertically on diamond (half of popover height)
          }}
          data-popover="true"
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
                          onClick={handleAdjustPosition}
                          className="bg-[rgba(89,89,89,0.55)] hover:bg-[rgba(89,89,89,0.75)] box-border content-stretch flex flex-row gap-2 items-center justify-center px-4 py-2 relative rounded-sm shrink-0 w-[228px] transition-colors cursor-pointer"
                        >
                          <div className="relative shrink-0 size-6">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                              <g>
                                <path d={popoverSvgPaths.p315d7b80} fill="#E8E8E8" />
                              </g>
                            </svg>
                          </div>
                          <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-left text-nowrap">
                            <p className="block leading-[22px] whitespace-pre">Adjust position</p>
                          </div>
                        </button>
                        
                        {/* Move to Nearest Frame Button */}
                        <button
                          onClick={handleMoveToNearestFrame}
                          className="bg-[rgba(89,89,89,0.55)] hover:bg-[rgba(89,89,89,0.75)] box-border content-stretch flex flex-row gap-2 items-center justify-center px-4 py-2 relative rounded-sm shrink-0 w-[228px] transition-colors cursor-pointer"
                        >
                          <div className="relative shrink-0 size-6">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                              <g>
                                <path d={popoverSvgPaths.p17a0bb00} fill="#E8E8E8" />
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
                        <path d={popoverSvgPaths.p2e7ecf80} fill="#595959" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Update popup window content when state changes
  useEffect(() => {
    if (popupWindow && !popupWindow.closed && popupWindow.document.getElementById('popup-main-screen')) {
      // This would be where we render the main screen content in the popup
      // For now, we'll just update the title to show current time
      popupWindow.document.title = `IVUS Analysis - Main Screen (${currentTime.toFixed(1)}s)`;
    }
  }, [popupWindow, currentTime, isPlaying, isXRayHidden, segmentManager.isSegmentActive]);

  // Show live screen first
  if (appPhase === "live") {
    return (
      <div ref={mainScreenContainerRef} className="w-full h-full overflow-hidden bg-black flex items-start justify-start">
        <div style={{ width: 1920 * mainScreenScale, height: 1080 * mainScreenScale }}>
          <div style={{ transform: `scale(${mainScreenScale})`, transformOrigin: "top left", width: 1920, height: 1080 }}>
            <LiveMainScreen 
              onStartRecording={handleStartRecording}
              isSyncPlaybackEnabled={isSyncPlaybackEnabled}
              onToggleSyncPlayback={() => setIsSyncPlaybackEnabled((enabled) => !enabled)}
            />
          </div>
        </div>
      </div>
    );
  }

  // Show recording screen second
  if (appPhase === "recording") {
    return (
      <div ref={mainScreenContainerRef} className="w-full h-full overflow-hidden bg-black flex items-start justify-start">
        <div style={{ width: 1920 * mainScreenScale, height: 1080 * mainScreenScale }}>
          <div style={{ transform: `scale(${mainScreenScale})`, transformOrigin: "top left", width: 1920, height: 1080 }}>
            <PullbackRecordingMainScreen 
              onStartAnalysis={handleStartAnalysis}
              bookmarks={bookmarkManager.bookmarks}
              onBookmarkToggle={(position, time, xrayPosition) => 
                bookmarkManager.handleBookmarkToggle(position, time, xrayPosition)
              }
              getBookmarkButtonText={bookmarkManager.getBookmarkButtonText}
              onXRayRecordingStart={handleXRayRecordingStart}
              onXRayRecordingStop={handleXRayRecordingStop}
              isSyncPlaybackEnabled={isSyncPlaybackEnabled}
            />
          </div>
        </div>
      </div>
    );
  }

  // Show loading screen until all videos are ready
  if (!videosReady) {
    return (
      <div>
        {/* Off-screen preloading videos - Use original URLs directly */}
        <div className="absolute -left-[9999px] -top-[9999px] opacity-0 pointer-events-none">
          <video
            ref={preloadLeftVideoRef}
            src={VIDEO_SOURCES.xray}
            className="w-full h-full"
            onLoadedMetadata={handleVideoMetadataLoaded}
            onError={handlePreloadVideoError}
            preload="auto"
            muted
            playsInline
          />
          <video
            ref={preloadRightVideoRef}
            src={VIDEO_SOURCES.ivus}
            className="w-full h-full"
            onLoadedMetadata={handleVideoMetadataLoaded}
            onError={handlePreloadVideoError}
            preload="auto"
            muted
            playsInline
          />
          <video
            ref={preloadTouchLeftVideoRef}
            src={VIDEO_SOURCES.xray}
            className="w-full h-full"
            onLoadedMetadata={handleVideoMetadataLoaded}
            onError={handlePreloadVideoError}
            preload="auto"
            muted
            playsInline
          />
          <video
            ref={preloadTouchRightVideoRef}
            src={VIDEO_SOURCES.ivus}
            className="w-full h-full"
            onLoadedMetadata={handleVideoMetadataLoaded}
            onError={handlePreloadVideoError}
            preload="auto"
            muted
            playsInline
          />
        </div>
        
        {/* Loading Screen */}
        <LoadingScreen 
          progress={loadingProgress}
          loadedVideos={videosLoaded}
          totalVideos={4}
        />
      </div>
    );
  }

  return (
    <div ref={mainScreenContainerRef} className="w-full h-full overflow-hidden bg-black flex items-start justify-start">
      {/* Main Screen - Only show if not popped out */}
      {(!popupWindow || popupWindow.closed) && (
        <div style={{ width: 1920 * mainScreenScale, height: 1080 * mainScreenScale }}>
          <div style={{ transform: `scale(${mainScreenScale})`, transformOrigin: "top left", width: 1920, height: 1080 }}>
            {renderMainScreen()}
          </div>
        </div>
      )}

      {/* Popup Main Screen - Render main screen in popup window */}
      {popupWindow && !popupWindow.closed && (
        <PopupMainScreen 
          popupWindow={popupWindow} 
          onClose={handleClosePopup}
        >
          {renderMainScreen()}
        </PopupMainScreen>
      )}
    </div>
  );
}