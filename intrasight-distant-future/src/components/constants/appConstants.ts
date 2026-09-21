// Application-wide constants for the IVUS medical imaging system
export const APP_CONSTANTS = {
  // Video configuration
  DURATION: 32, // Fixed 32-second duration (matches the near-future/CoReg pullback length)
  FPS: 30, // Frames per second
  VIDEO_SYNC_DELAY: 50, // Milliseconds
  
  // Initial values
  INITIAL_SCRUBBER_POSITION: 666,
  INITIAL_SEGMENT_WIDTH: 203,
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

// Ruler path data for diamond indicator positioning along virtual ruler
export const RULER_PATH_DATA = [
  { progress: 0, y: -100, x: -10 },
  { progress: 0.0625, y: -38, x: -6 },
  { progress: 0.125, y: -24, x: -6 },
  { progress: 0.1875, y: -19, x: -6 },
  { progress: 0.25, y: 58, x: 5 },
  { progress: 0.3125, y: 97, x: 14 },
  { progress: 0.375, y: 144, x: 25 },
  { progress: 0.4375, y: 176, x: 29 },
  { progress: 0.5, y: 266, x: 63 },
  { progress: 0.5625, y: 346, x: 117 },
  { progress: 0.625, y: 432, x: 182 },
  { progress: 0.6875, y: 475, x: 215 },
  { progress: 0.75, y: 551, x: 260 },
  { progress: 0.8125, y: 629, x: 298 },
  { progress: 0.875, y: 668, x: 309 },
  { progress: 1, y: 710, x: 310 },
];