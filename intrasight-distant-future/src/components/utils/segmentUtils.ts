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
  static calculateInitialSegmentPosition(scrubberPosition: number, maxRight?: number): {
    left: number;
    position: number;
    width: number;
  } {
    const { ILD_LEFT_BOUNDARY, ILD_RIGHT_BOUNDARY } = APP_CONSTANTS.MAIN_SCREEN;
    const { INITIAL_SEGMENT_WIDTH } = APP_CONSTANTS;
    const rightBoundary = maxRight ?? ILD_RIGHT_BOUNDARY;
    const width = Math.min(INITIAL_SEGMENT_WIDTH, Math.max(0, rightBoundary - ILD_LEFT_BOUNDARY));

    const minSegmentLeft = ILD_LEFT_BOUNDARY;
    const maxSegmentLeft = rightBoundary - width;
    const desiredSegmentLeft = scrubberPosition - width / 2;
    const constrainedSegmentLeft = Math.max(
      minSegmentLeft,
      Math.min(desiredSegmentLeft, maxSegmentLeft)
    );

    return {
      left: constrainedSegmentLeft,
      position: constrainedSegmentLeft + width / 2,
      width,
    };
  }

  /**
   * Constrain segment resize within boundaries
   */
  static constrainSegmentResize(newLeft: number, newWidth: number, maxRight?: number): {
    left: number;
    width: number;
  } {
    const { ILD_LEFT_BOUNDARY, ILD_RIGHT_BOUNDARY } = APP_CONSTANTS.MAIN_SCREEN;
    const { MIN_WIDTH } = APP_CONSTANTS.SEGMENT;
    const rightBoundary = maxRight ?? ILD_RIGHT_BOUNDARY;

    // Clamp each edge on its own so hitting one limit never moves the other edge.
    const constrainedLeft = Math.max(ILD_LEFT_BOUNDARY, newLeft);
    const constrainedRight = Math.min(rightBoundary, newLeft + newWidth);
    const minWidth = Math.min(MIN_WIDTH, rightBoundary - ILD_LEFT_BOUNDARY);
    const constrainedWidth = Math.max(minWidth, constrainedRight - constrainedLeft);
    const finalLeft = Math.min(
      constrainedLeft,
      rightBoundary - constrainedWidth
    );

    return {
      left: finalLeft,
      width: constrainedWidth,
    };
  }

  /**
   * Constrain segment movement within boundaries
   */
  static constrainSegmentMovement(newLeft: number, segmentWidth: number, maxRight?: number): number {
    const { ILD_LEFT_BOUNDARY, ILD_RIGHT_BOUNDARY } = APP_CONSTANTS.MAIN_SCREEN;
    const rightBoundary = maxRight ?? ILD_RIGHT_BOUNDARY;

    return Math.max(
      ILD_LEFT_BOUNDARY,
      Math.min(newLeft, rightBoundary - segmentWidth)
    );
  }

  /**
   * Adjust segment size by increment/decrement
   */
  static adjustSegmentSize(
    currentWidth: number,
    segmentLeft: number,
    increase: boolean,
    maxRight?: number
  ): number {
    const { SIZE_INCREMENT, MIN_WIDTH } = APP_CONSTANTS.SEGMENT;
    const { ILD_RIGHT_BOUNDARY } = APP_CONSTANTS.MAIN_SCREEN;
    const rightBoundary = maxRight ?? ILD_RIGHT_BOUNDARY;

    if (increase) {
      const maxWidth = rightBoundary - segmentLeft;
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