import { ConfirmedSegment } from '../types';
import { APP_CONSTANTS } from '../constants/appConstants';

export class SegmentUtils {
  /**
   * Calculate segment length in millimeters from pixel width
   */
  static calculateSegmentLength(widthInPixels: number): string {
    return (widthInPixels * APP_CONSTANTS.SEGMENT.MM_PER_PIXEL).toFixed(1);
  }

  /**
   * Calculate initial segment position centered on scrubber
   */
  static calculateInitialSegmentPosition(scrubberPosition: number): {
    left: number;
    position: number;
  } {
    const { ILD_LEFT_BOUNDARY, ILD_RIGHT_BOUNDARY } = APP_CONSTANTS.MAIN_SCREEN;
    const { INITIAL_SEGMENT_WIDTH } = APP_CONSTANTS;
    
    const minSegmentLeft = ILD_LEFT_BOUNDARY;
    const maxSegmentLeft = ILD_RIGHT_BOUNDARY - INITIAL_SEGMENT_WIDTH;
    const desiredSegmentLeft = scrubberPosition - INITIAL_SEGMENT_WIDTH / 2;
    const constrainedSegmentLeft = Math.max(
      minSegmentLeft,
      Math.min(desiredSegmentLeft, maxSegmentLeft)
    );

    return {
      left: constrainedSegmentLeft,
      position: constrainedSegmentLeft + INITIAL_SEGMENT_WIDTH / 2,
    };
  }

  /**
   * Constrain segment resize within boundaries
   */
  static constrainSegmentResize(newLeft: number, newWidth: number): {
    left: number;
    width: number;
  } {
    const { ILD_LEFT_BOUNDARY, ILD_RIGHT_BOUNDARY } = APP_CONSTANTS.MAIN_SCREEN;
    const { MIN_WIDTH } = APP_CONSTANTS.SEGMENT;

    const constrainedLeft = Math.max(ILD_LEFT_BOUNDARY, newLeft);
    const maxWidth = ILD_RIGHT_BOUNDARY - constrainedLeft;
    const constrainedWidth = Math.min(
      Math.max(MIN_WIDTH, newWidth),
      maxWidth
    );
    const finalLeft = Math.min(
      constrainedLeft,
      ILD_RIGHT_BOUNDARY - constrainedWidth
    );

    return {
      left: finalLeft,
      width: constrainedWidth,
    };
  }

  /**
   * Constrain segment movement within boundaries
   */
  static constrainSegmentMovement(newLeft: number, segmentWidth: number): number {
    const { ILD_LEFT_BOUNDARY, ILD_RIGHT_BOUNDARY } = APP_CONSTANTS.MAIN_SCREEN;
    
    return Math.max(
      ILD_LEFT_BOUNDARY,
      Math.min(newLeft, ILD_RIGHT_BOUNDARY - segmentWidth)
    );
  }

  /**
   * Adjust segment size by increment/decrement
   */
  static adjustSegmentSize(
    currentWidth: number,
    segmentLeft: number,
    increase: boolean
  ): number {
    const { SIZE_INCREMENT, MIN_WIDTH } = APP_CONSTANTS.SEGMENT;
    const { ILD_LEFT_BOUNDARY, ILD_USABLE_WIDTH } = APP_CONSTANTS.MAIN_SCREEN;
    
    if (increase) {
      const maxWidth = ILD_USABLE_WIDTH - (segmentLeft - ILD_LEFT_BOUNDARY);
      return Math.min(currentWidth + SIZE_INCREMENT, maxWidth);
    } else {
      return Math.max(currentWidth - SIZE_INCREMENT, MIN_WIDTH);
    }
  }

  /**
   * Create confirmed segment from editing state
   */
  static createConfirmedSegment(
    editingSegmentId: number | null,
    originalSegmentData: ConfirmedSegment | null,
    segmentLeft: number,
    segmentWidth: number,
    segmentType: "lumen" | "stent",
    nextSegmentId: number,
    customLength?: string
  ): {
    segment: ConfirmedSegment;
    newNextId: number;
  } {
    const length = customLength || SegmentUtils.calculateSegmentLength(segmentWidth);
    
    if (editingSegmentId !== null && originalSegmentData) {
      // Editing existing segment - preserve original ID and label
      return {
        segment: {
          id: editingSegmentId,
          left: segmentLeft,
          width: segmentWidth,
          type: segmentType,
          length: length,
          label: originalSegmentData.label,
        },
        newNextId: nextSegmentId, // Don't increment for existing segments
      };
    } else {
      // Creating new segment
      return {
        segment: {
          id: nextSegmentId,
          left: segmentLeft,
          width: segmentWidth,
          type: segmentType,
          length: length,
          label: String.fromCharCode(64 + nextSegmentId), // A, B, C, etc.
        },
        newNextId: nextSegmentId + 1, // Increment for new segments
      };
    }
  }
}