/**
 * Position mapping for X-ray video bookmarks
 * Maps frames/time to x,y coordinates along the catheter path
 * Coordinates extracted from VirtualRuler component
 */

export interface XRayPosition {
  x: number;
  y: number;
  frame: number; // Frame index for reference
  time?: number; // Actual time in seconds (optional, for accurate interpolation)
}

/**
 * Array of positions along the catheter path in the X-ray video
 * These coordinates correspond to the dots shown in the virtual ruler
 * and represent the path the catheter travels through the vessel
 */

export const xrayPositionPath: XRayPosition[] = [
   { x: 296, y: 3, frame: 0, time: 3.46 },
   { x: 307, y: 68, frame: 1, time: 6.29 },
   { x: 329, y: 152, frame: 2, time: 9.10 },
   { x: 370, y: 268, frame: 3, time: 12.47 },
   { x: 421, y: 339, frame: 4, time: 14.57 },
   { x: 463, y: 406, frame: 5, time: 16.09 },
   { x: 510, y: 473, frame: 6, time: 17.71 },
   { x: 576, y: 585, frame: 7, time: 19.86 },
   { x: 619, y: 680, frame: 8, time: 22.23 },
   { x: 637, y: 728, frame: 9, time: 22.90 },
 ];
 
/**
 * Calculate the position for a bookmark based on video time
 * Uses linear interpolation between known path points
 * 
 * @param time - Current time in the video (seconds)
 * @param videoDuration - Total duration of the video (seconds)
 * @returns Object with x and y coordinates
 */
export function calculateBookmarkPosition(
  time: number,
  videoDuration: number
): { x: number; y: number } {
  // Check if time-based interpolation is available
  const hasTimeData = xrayPositionPath.length > 0 && xrayPositionPath[0].time !== undefined;
  
  if (hasTimeData) {
    // Time-based interpolation for accurate positioning
    // Find the two nearest points based on actual time values
    let lowerIndex = 0;
    let upperIndex = xrayPositionPath.length - 1;
    
    for (let i = 0; i < xrayPositionPath.length; i++) {
      const pointTime = xrayPositionPath[i].time!;
      if (pointTime <= time) {
        lowerIndex = i;
      }
      if (pointTime >= time && i < upperIndex) {
        upperIndex = i;
        break;
      }
    }
    
    // If we're before the first point or after the last, clamp
    if (time <= xrayPositionPath[0].time!) {
      return { x: xrayPositionPath[0].x, y: xrayPositionPath[0].y };
    }
    if (time >= xrayPositionPath[xrayPositionPath.length - 1].time!) {
      const last = xrayPositionPath[xrayPositionPath.length - 1];
      return { x: last.x, y: last.y };
    }
    
    // If we're exactly on a point, return it
    if (lowerIndex === upperIndex) {
      return {
        x: xrayPositionPath[lowerIndex].x,
        y: xrayPositionPath[lowerIndex].y
      };
    }
    
    // Linear interpolation based on time
    const lowerPoint = xrayPositionPath[lowerIndex];
    const upperPoint = xrayPositionPath[upperIndex];
    const timeFraction = (time - lowerPoint.time!) / (upperPoint.time! - lowerPoint.time!);
    
    return {
      x: lowerPoint.x + (upperPoint.x - lowerPoint.x) * timeFraction,
      y: lowerPoint.y + (upperPoint.y - lowerPoint.y) * timeFraction
    };
  } else {
    // Fall back to frame-based interpolation (assumes even distribution)
    const totalFrames = xrayPositionPath.length - 1;
    const framePosition = (time / videoDuration) * totalFrames;
    
    // Find the two nearest path points
    const lowerIndex = Math.floor(framePosition);
    const upperIndex = Math.min(Math.ceil(framePosition), totalFrames);
    
    // If we're exactly on a frame, return that position
    if (lowerIndex === upperIndex) {
      return {
        x: xrayPositionPath[lowerIndex].x,
        y: xrayPositionPath[lowerIndex].y
      };
    }
    
    // Linear interpolation between two points
    const lowerPoint = xrayPositionPath[lowerIndex];
    const upperPoint = xrayPositionPath[upperIndex];
    const fraction = framePosition - lowerIndex;
    
    return {
      x: lowerPoint.x + (upperPoint.x - lowerPoint.x) * fraction,
      y: lowerPoint.y + (upperPoint.y - lowerPoint.y) * fraction
    };
  }
}

/**
 * Get the nearest path point for a given time
 * Useful for snapping bookmarks to specific positions
 * 
 * @param time - Current time in the video (seconds)
 * @param videoDuration - Total duration of the video (seconds)
 * @returns The nearest XRayPosition
 */
export function getNearestPathPoint(
  time: number,
  videoDuration: number
): XRayPosition {
  const totalFrames = xrayPositionPath.length - 1;
  const framePosition = (time / videoDuration) * totalFrames;
  const nearestIndex = Math.round(framePosition);
  
  return xrayPositionPath[Math.min(nearestIndex, totalFrames)];
}

/**
 * Calculate segment visualization data for X-ray overlay
 * Returns start position, end position, midpoint, and rotation angle
 * 
 * @param startTime - Segment start time in seconds
 * @param endTime - Segment end time in seconds
 * @param videoDuration - Total duration of the video (seconds)
 * @returns Object with segment positions and angle
 */
export function calculateSegmentPath(
  startTime: number,
  endTime: number,
  videoDuration: number
): {
  startPos: { x: number; y: number };
  endPos: { x: number; y: number };
  midPos: { x: number; y: number };
  angle: number;
  length: number;
} {
  const startPos = calculateBookmarkPosition(startTime, videoDuration);
  const endPos = calculateBookmarkPosition(endTime, videoDuration);
  
  // Calculate midpoint
  const midPos = {
    x: (startPos.x + endPos.x) / 2,
    y: (startPos.y + endPos.y) / 2
  };
  
  // Calculate angle for rotation (in degrees)
  const deltaX = endPos.x - startPos.x;
  const deltaY = endPos.y - startPos.y;
  const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  
  // Calculate visual length (pixel distance)
  const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  
  return { startPos, endPos, midPos, angle, length };
}

/**
 * Generate SVG path points along the catheter path for segment visualization
 * Samples points between start and end times to create a smooth path
 * 
 * @param startTime - Segment start time in seconds
 * @param endTime - Segment end time in seconds
 * @param videoDuration - Total duration of the video (seconds)
 * @param numPoints - Number of points to sample (default: 20)
 * @returns Array of {x, y} coordinates along the path
 */
export function generateSegmentPathPoints(
  startTime: number,
  endTime: number,
  videoDuration: number,
  numPoints: number = 20
): Array<{ x: number; y: number }> {
  const points: Array<{ x: number; y: number }> = [];
  
  for (let i = 0; i <= numPoints; i++) {
    const t = startTime + (endTime - startTime) * (i / numPoints);
    const pos = calculateBookmarkPosition(t, videoDuration);
    points.push(pos);
  }
  
  return points;
}

/**
 * Convert array of points to SVG path string
 * 
 * @param points - Array of {x, y} coordinates
 * @returns SVG path string
 */
export function pointsToSVGPath(points: Array<{ x: number; y: number }>): string {
  if (points.length === 0) return '';
  
  let path = `M ${points[0].x} ${points[0].y}`;
  
  for (let i = 1; i < points.length; i++) {
    path += ` L ${points[i].x} ${points[i].y}`;
  }
  
  return path;
}
