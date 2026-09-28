// Application-wide constants for the IVUS medical imaging system
export const APP_CONSTANTS = {
  // Video configuration
  DURATION: 32, // Fixed 32-second duration (matches the near-future/CoReg pullback length)
  FPS: 30, // Frames per second
  VIDEO_SYNC_DELAY: 50, // Milliseconds
  
  // Initial values
  INITIAL_SCRUBBER_POSITION: 666,
  INITIAL_SEGMENT_WIDTH: 88, // ~2s at the 1403px/32s ILD scale, matching near-future's default 2-second segment
  INITIAL_NEXT_BOOKMARK_ID: 1,
  INITIAL_NEXT_SEGMENT_ID: 1,
  
  // Screen dimensions
  MAIN_SCREEN: {
    WIDTH: 1920,
    HEIGHT: 1080,
    ILD_LEFT_BOUNDARY: 70,
    ILD_RIGHT_BOUNDARY: 1473, // 1543 - 70
    ILD_WIDTH: 1543,
    ILD_HEIGHT: 167,
    ILD_USABLE_WIDTH: 1403, // 1543 - 140 margins
    TRACK_MARGIN: 140, // 70px on each side
  },
  
  TOUCH_SCREEN: {
    WIDTH: 1280,
    HEIGHT: 720,
  },
  
  // Timing intervals (milliseconds)
  INTERVALS: {
    PLAYBACK_UPDATE: 33, // ~30fps for playback updates
    DRAG_UPDATE: 33, // ~30fps during dragging for smoother feedback
    VIDEO_THROTTLE: 16, // 60fps for normal video updates
  },
  
  // Tolerances and thresholds
  TOLERANCES: {
    VIDEO_SYNC: 0.1, // 100ms for video synchronization
    DRAG_SYNC: 0.05, // 50ms during dragging
    BOOKMARK_PROXIMITY: 20, // 20px for bookmark detection
  },
  
  // Segment configuration
  SEGMENT: {
    MIN_WIDTH: 50, // Minimum segment width in pixels
    SIZE_INCREMENT: 10, // Pixels to add/remove when adjusting size
    MM_PER_PIXEL: 130 / 1403, // 130mm vessel length / 1403px usable width
  },
  
  // Diamond indicator positioning offsets
  INDICATOR: {
    BASE_OFFSET_X: 279, // 294px ruler position - 15px offset
    BASE_OFFSET_Y: 53, // 11px ruler top + 42px ruler first point
  },
  
  // Waveform generation parameters
  WAVEFORM: {
    NUM_POINTS: 800, // Number of data points across timeline (increased for smoother X-ray overlay)
    TRACK_HEIGHT: 167,
    CENTER_Y_RATIO: 0.5,
    
    // Offset ranges for lumen and vessel visualization
    LUMEN_MAX_OFFSET: 45,
    LUMEN_MIN_OFFSET: 20,
    VESSEL_MAX_OFFSET: 75,
    VESSEL_MIN_OFFSET: 35,
    
    // Vessel characteristics
    VESSEL_REDUCTION_TREND: 0.25, // 25% reduction from left to right
    VESSEL_BASE_DIAMETER: 22.0,
    LUMEN_VESSEL_RATIO: 0.65, // Lumen is roughly 65% of vessel diameter
    
    // High plaque burden zone (dramatic lumen reduction)
    PLAQUE_ZONE_START: 0.60, // 60% through timeline
    PLAQUE_ZONE_END: 0.65, // 65% through timeline  
    PLAQUE_PENALTY_MAX: 8.0, // Up to 8mm reduction
    
    // Diameter constraints
    VESSEL_MIN_DIAMETER: 15.0,
    VESSEL_MAX_DIAMETER: 30.0,
    LUMEN_MIN_DIAMETER: 6.0, // Allow very small lumen in plaque zone
    LUMEN_MAX_DIAMETER: 15.0,
    VESSEL_LUMEN_MIN_DIFF: 1.5, // Vessel must be at least 1.5mm larger than lumen
    
    // Normalization ranges (based on area calculations)
    LUMEN_AREA_MIN: 113.1, // Based on 12mm diameter
    LUMEN_AREA_MAX: 176.7, // Based on 15mm diameter
    VESSEL_AREA_MIN: 176.7, // Based on 15mm diameter  
    VESSEL_AREA_MAX: 706.9, // Based on 30mm diameter
  },
  
  // Popup window configuration
  POPUP: {
    WINDOW_FEATURES: "width=1920,height=1080,scrollbars=no,resizable=yes,status=no,toolbar=no,menubar=no",
    WINDOW_NAME: "ivusPopup",
  },
  
  // Colors
  COLORS: {
    BACKGROUND: "#000000",
    SCRUBBER: "#FFDD19",
    SCRUBBER_SHADOW: "#A28E18",
    SEGMENT_YELLOW: "#FFDD19",
    SEGMENT_WHITE: "#FFFFFF",
    ILD_BACKGROUND: "rgb(23, 23, 23)", // neutral-900
    VESSEL_STROKE: "rgb(34, 197, 94)", // green
    VESSEL_FILL: "rgba(34, 197, 94, 0.2)",
    LUMEN_STROKE: "rgb(59, 130, 246)", // blue
    LUMEN_FILL: "rgba(59, 130, 246, 0.3)",
  },
};

export type Leg = "left" | "right";

export interface RulerPathPoint {
  progress: number;
  x: number;
  y: number;
}

// Ruler path data for diamond indicator positioning along virtual ruler.
// This traces the catheter's on-screen position (video-relative pixels) for
// the LEFT leg's fluoro recording - traced/verified against the real video
// using the Roadmap Tool (#/roadmap-tool).
export const RULER_PATH_DATA_LEFT: RulerPathPoint[] = [
  { progress: 0, y: -100, x: -10 },
  { progress: 0.0625, y: -40, x: -32 },
  { progress: 0.125, y: -26, x: -28 },
  { progress: 0.1875, y: -13, x: -22 },
  { progress: 0.25, y: 61, x: -7 },
  { progress: 0.3125, y: 134, x: 7 },
  { progress: 0.375, y: 162, x: 14 },
  { progress: 0.4375, y: 246, x: 43 },
  { progress: 0.5, y: 362, x: 112 },
  { progress: 0.5625, y: 426, x: 158 },
  { progress: 0.625, y: 495, x: 208 },
  { progress: 0.6875, y: 601, x: 272 },
  { progress: 0.75, y: 692, x: 321 },
  { progress: 0.8125, y: 705, x: 329 },
  { progress: 0.875, y: 723, x: 342 },
  { progress: 1, y: 748, x: 356 },
];

// RIGHT leg's catheter path - traced against the real Right Leg fluoro
// recording using the Roadmap Tool (#/roadmap-tool).
export const RULER_PATH_DATA_RIGHT: RulerPathPoint[] = [
  { progress: 0, y: -100, x: -10 },
  { progress: 0.0625, y: -38, x: -6 },
  { progress: 0.125, y: -36, x: -4 },
  { progress: 0.1875, y: -48, x: -5 },
  { progress: 0.25, y: -10, x: -3 },
  { progress: 0.3125, y: 52, x: -10 },
  { progress: 0.375, y: 118, x: -21 },
  { progress: 0.4375, y: 166, x: -30 },
  { progress: 0.5, y: 233, x: -36 },
  { progress: 0.5625, y: 286, x: -47 },
  { progress: 0.625, y: 352, x: -63 },
  { progress: 0.6875, y: 416, x: -73 },
  { progress: 0.75, y: 495, x: -98 },
  { progress: 0.8125, y: 543, x: -108 },
  { progress: 0.875, y: 572, x: -118 },
  { progress: 1, y: 636, x: -135 },
];

// Diamond indicator base offsets, per leg (video framing differs per recording).
export const INDICATOR_OFFSETS_LEFT = { x: 279, y: 53 };
export const INDICATOR_OFFSETS_RIGHT = { x: 279, y: 53 };

// Mutable "active" path array. PositionUtils/ILDPathOverlay import this same
// array reference and index into it directly, so mutating its CONTENTS (never
// reassigning the binding) is what makes `setActiveLeg` take effect everywhere
// without threading a `leg` prop through every consumer.
export const RULER_PATH_DATA: RulerPathPoint[] = [...RULER_PATH_DATA_RIGHT];

export function setActiveLeg(leg: Leg): void {
  const source = leg === "right" ? RULER_PATH_DATA_RIGHT : RULER_PATH_DATA_LEFT;
  RULER_PATH_DATA.length = 0;
  RULER_PATH_DATA.push(...source);

  const offsets = leg === "right" ? INDICATOR_OFFSETS_RIGHT : INDICATOR_OFFSETS_LEFT;
  APP_CONSTANTS.INDICATOR.BASE_OFFSET_X = offsets.x;
  APP_CONSTANTS.INDICATOR.BASE_OFFSET_Y = offsets.y;
}