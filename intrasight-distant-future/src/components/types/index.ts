// Comprehensive type definitions for the IVUS application

export interface BookmarkData {
  id: number;
  position: number;
  time: number;
  xrayPosition?: { x: number; y: number }; // X-ray coordinates where bookmark was placed
}

export interface ConfirmedSegment {
  id: number;
  left: number;
  width: number;
  type: "lumen" | "stent";
  length: string;
  label: string;
}

export type ScreenView = "both" | "main" | "touch";

// Waveform data structure
export interface WaveformPoint {
  x: number;
  lumen: number; // Normalized 0-1 value
  vessel: number; // Normalized 0-1 value
  vesselDiameter: number; // Actual vessel diameter in mm
  lumenDiameter: number; // Actual lumen diameter in mm
  stenosisPercent: number; // Stenosis percentage (0-100)
}

// Video management
export interface VideoRefs {
  leftVideoRef: React.RefObject<HTMLVideoElement>;
  rightVideoRef: React.RefObject<HTMLVideoElement>;
  touchLeftVideoRef: React.RefObject<HTMLVideoElement>;
  touchRightVideoRef: React.RefObject<HTMLVideoElement>;
}

// Positioning calculations
export interface IndicatorPosition {
  x: number;
  y: number;
}

// Application state for popup synchronization
export interface PopupState {
  isPlaying: boolean;
  currentTime: number;
  scrubberPosition: number;
  isXRayHidden: boolean;
  isVirtualRulerVisible: boolean;
  bookmarks: BookmarkData[];
  isDragging: boolean;
  nextBookmarkId: number;
  screenView: ScreenView;
}

// Segment editing state
export interface SegmentEditingState {
  isActive: boolean;
  position: number;
  width: number;
  left: number;
  type: "lumen" | "stent";
  editingId: number | null;
  originalData: ConfirmedSegment | null;
}

// Component prop interfaces
export interface NavigationBarProps {
  // Add specific props as needed
}

export interface MainContentProps {
  isXRayHidden: boolean;
  isSegmentActive: boolean;
  segmentLeft: number;
  segmentWidth: number;
  currentTime: number;
  isVirtualRulerVisible: boolean;
  leftVideoRef: React.RefObject<HTMLVideoElement>;
  rightVideoRef: React.RefObject<HTMLVideoElement>;
  onVideoMetadataLoaded: (e: React.SyntheticEvent<HTMLVideoElement>) => void;
  onVideoError: (e: React.SyntheticEvent<HTMLVideoElement>) => void;
  onXRayToggle: () => void;
  onVirtualRulerToggle: () => void;
}

export interface ILDSectionProps {
  trackRef: React.RefObject<HTMLDivElement>;
  waveformData: WaveformPoint[];
  confirmedSegments: ConfirmedSegment[];
  bookmarks: BookmarkData[];
  isDragging: boolean;
  onTrackClick: (e: React.MouseEvent) => void;
  onEditConfirmedSegment: (segmentId: number) => void;
  onBookmarkClick: (bookmark: BookmarkData) => void;
  onPreviousFrame: () => void;
  onNextFrame: () => void;
  onStartContinuousFrameStep: (direction: 'forward' | 'backward') => void;
  onStopContinuousFrameStep: () => void;
  /** Fraction (0-1) of the pullback that was actually recorded - the waveform
   * beyond this point is masked out since there's no real data for it. */
  recordedFraction?: number;
  /** 'graphical' (default) shows the procedural lumen/vessel waveform;
   * 'classic' shows the recorded grayscale longitudinal image instead,
   * toggled via the "Graphic ILD" side-toolbar button. */
  viewMode?: 'graphical' | 'classic';
}

export interface ActionBarProps {
  bookmarkButtonText: string;
  isPlaying: boolean;
  onBookmarkToggle: () => void;
  onPlayPause: () => void;
}

// Event handler types
export type VideoEventHandler = (e: React.SyntheticEvent<HTMLVideoElement>) => void;
export type SegmentResizeHandler = (newLeft: number, newWidth: number) => void;
export type SegmentMoveHandler = (newLeft: number) => void;
export type SegmentTypeChangeHandler = (type: "lumen" | "stent") => void;