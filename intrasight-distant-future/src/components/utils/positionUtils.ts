import { IndicatorPosition } from '../types';
import { APP_CONSTANTS, RULER_PATH_DATA } from '../constants/appConstants';

export class PositionUtils {
  /**
   * Calculate diamond indicator position along the virtual ruler path
   */
  static getMainScreenIndicatorPosition(time: number): IndicatorPosition {
    const progress = Math.min(time / APP_CONSTANTS.DURATION, 1);

    // Find the two points to interpolate between
    let lowerPoint = RULER_PATH_DATA[0];
    let upperPoint = RULER_PATH_DATA[RULER_PATH_DATA.length - 1];

    for (let i = 0; i < RULER_PATH_DATA.length - 1; i++) {
      if (
        progress >= RULER_PATH_DATA[i].progress &&
        progress <= RULER_PATH_DATA[i + 1].progress
      ) {
        lowerPoint = RULER_PATH_DATA[i];
        upperPoint = RULER_PATH_DATA[i + 1];
        break;
      }
    }

    // Linear interpolation between the two points
    const t =
      (progress - lowerPoint.progress) /
        (upperPoint.progress - lowerPoint.progress) || 0;

    return {
      x: lowerPoint.x + (upperPoint.x - lowerPoint.x) * t,
      y: lowerPoint.y + (upperPoint.y - lowerPoint.y) * t,
    };
  }

  /**
   * Convert time to main screen scrubber position
   */
  static timeToScrubberPosition(time: number): number {
    const percentage = time / APP_CONSTANTS.DURATION;
    const { ILD_LEFT_BOUNDARY, ILD_USABLE_WIDTH } = APP_CONSTANTS.MAIN_SCREEN;
    return ILD_LEFT_BOUNDARY + percentage * ILD_USABLE_WIDTH;
  }

  /**
   * Convert scrubber position to time
   */
  static scrubberPositionToTime(position: number): number {
    const { ILD_LEFT_BOUNDARY, ILD_USABLE_WIDTH } = APP_CONSTANTS.MAIN_SCREEN;
    const percentage = (position - ILD_LEFT_BOUNDARY) / ILD_USABLE_WIDTH;
    return Math.min(percentage * APP_CONSTANTS.DURATION, APP_CONSTANTS.DURATION);
  }

  /**
   * Constrain scrubber position within track boundaries
   */
  static constrainScrubberPosition(position: number): number {
    const { ILD_LEFT_BOUNDARY, ILD_USABLE_WIDTH } = APP_CONSTANTS.MAIN_SCREEN;
    return Math.max(
      ILD_LEFT_BOUNDARY,
      Math.min(position, ILD_LEFT_BOUNDARY + ILD_USABLE_WIDTH)
    );
  }

  /**
   * Calculate the actual curved path length along the X-ray between two time points
   * Returns length in millimeters
   */
  static calculateXRayPathLength(startTime: number, endTime: number): number {
    // Sample the path at many points to get accurate curve length
    const numSamples = 100;
    
    // First, calculate the TOTAL path length (entire vessel from 0 to DURATION)
    // This represents the full 130mm vessel
    let totalPathPixels = 0;
    let prevPos = PositionUtils.getMainScreenIndicatorPosition(0);
    
    for (let i = 1; i <= numSamples; i++) {
      const t = (APP_CONSTANTS.DURATION * i) / numSamples;
      const currentPos = PositionUtils.getMainScreenIndicatorPosition(t);
      
      const dx = currentPos.x - prevPos.x;
      const dy = currentPos.y - prevPos.y;
      totalPathPixels += Math.sqrt(dx * dx + dy * dy);
      prevPos = currentPos;
    }
    
    // Now calculate the segment path length in pixels
    let segmentPathPixels = 0;
    prevPos = PositionUtils.getMainScreenIndicatorPosition(startTime);
    
    for (let i = 1; i <= numSamples; i++) {
      const t = startTime + (endTime - startTime) * (i / numSamples);
      const currentPos = PositionUtils.getMainScreenIndicatorPosition(t);
      
      const dx = currentPos.x - prevPos.x;
      const dy = currentPos.y - prevPos.y;
      segmentPathPixels += Math.sqrt(dx * dx + dy * dy);
      prevPos = currentPos;
    }
    
    // Scale: if total path is 130mm, then segment length is proportional
    const vesselLengthMm = 130;
    return (segmentPathPixels / totalPathPixels) * vesselLengthMm;
  }
}