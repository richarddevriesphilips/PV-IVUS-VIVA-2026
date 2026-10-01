import { useState, useCallback } from 'react';
import { ConfirmedSegment } from '../types';
import { SegmentUtils } from '../utils/segmentUtils';
import { APP_CONSTANTS } from '../constants/appConstants';

export function useSegmentManager() {
  // Segment editing state
  const [isSegmentActive, setIsSegmentActive] = useState(false);
  const [segmentPosition, setSegmentPosition] = useState(APP_CONSTANTS.INITIAL_SCRUBBER_POSITION);
  const [segmentWidth, setSegmentWidth] = useState(APP_CONSTANTS.INITIAL_SEGMENT_WIDTH);
  const [segmentLeft, setSegmentLeft] = useState(0);
  const [segmentType, setSegmentType] = useState<"lumen" | "stent">("lumen");
  
  // Confirmed segments state
  const [confirmedSegments, setConfirmedSegments] = useState<ConfirmedSegment[]>([]);
  const [nextSegmentId, setNextSegmentId] = useState(APP_CONSTANTS.INITIAL_NEXT_SEGMENT_ID);
  
  // Track if editing existing segment
  const [editingSegmentId, setEditingSegmentId] = useState<number | null>(null);
  const [originalSegmentData, setOriginalSegmentData] = useState<ConfirmedSegment | null>(null);

  // Track the scrubber position for collision detection during resize
  const [scrubberPosition, setScrubberPosition] = useState(APP_CONSTANTS.INITIAL_SCRUBBER_POSITION);

  // Track the middle handle position within the segment (independent from scrubber)
  const [middleHandlePosition, setMiddleHandlePosition] = useState(APP_CONSTANTS.INITIAL_SCRUBBER_POSITION);

  /**
   * Start adding a new segment at the current scrubber position
   */
  const handleAddSegment = useCallback((currentScrubberPosition: number, maxRight?: number) => {
    const { left, position, width } = SegmentUtils.calculateInitialSegmentPosition(currentScrubberPosition, maxRight);
    
    // Store the current scrubber position for collision detection
    setScrubberPosition(currentScrubberPosition);
    
    // Initialize middle handle position to the center of the new segment
    setMiddleHandlePosition(position);
    
    // Reset editing state for new segment
    setEditingSegmentId(null);
    setOriginalSegmentData(null);
    
    setSegmentLeft(left);
    setSegmentPosition(position);
    setSegmentWidth(width);
    setSegmentType("lumen");
    setIsSegmentActive(true);
  }, []);

  /**
   * Handle segment resize from drag handles with scrubber collision detection
   */
  const handleSegmentResize = useCallback((newLeft: number, newWidth: number, maxRight?: number) => {
    const { left, width } = SegmentUtils.constrainSegmentResize(newLeft, newWidth, maxRight);
    
    // Calculate the new segment boundaries
    const newRightEdge = left + width;
    
    // Get current scrubber position during resize
    let currentScrubberPosition = scrubberPosition;
    
    // Check if left handle moved past scrubber - "scoop" scrubber to the right
    if (left > currentScrubberPosition) {
      currentScrubberPosition = left;
      setScrubberPosition(left);
      console.log('Left handle scooped scrubber to the right');
    }
    // Check if right handle moved past scrubber - "scoop" scrubber to the left
    else if (newRightEdge < currentScrubberPosition) {
      currentScrubberPosition = newRightEdge;
      setScrubberPosition(newRightEdge);
      console.log('Right handle scooped scrubber to the left');
    }
    
    setSegmentLeft(left);
    setSegmentWidth(width);
    
    // Keep the segment's visual center position unchanged for display purposes
    setSegmentPosition(left + width / 2);
    
    // Constrain middle handle position within new segment boundaries
    const newRightBoundary = left + width;
    if (middleHandlePosition < left + 25) {
      setMiddleHandlePosition(left + 25); // 25px margin from left edge
    } else if (middleHandlePosition > newRightBoundary - 25) {
      setMiddleHandlePosition(newRightBoundary - 25); // 25px margin from right edge
    }
  }, [scrubberPosition, middleHandlePosition]);

  /**
   * Handle segment movement (dragging the whole segment)
   */
  const handleSegmentMove = useCallback((newLeft: number, maxRight?: number) => {
    const constrainedLeft = SegmentUtils.constrainSegmentMovement(newLeft, segmentWidth, maxRight);
    
    // Calculate the offset of the middle handle relative to the old segment position
    const oldMiddleOffset = middleHandlePosition - segmentLeft;
    
    setSegmentLeft(constrainedLeft);
    setSegmentPosition(constrainedLeft + segmentWidth / 2);
    
    // Move the middle handle along with the segment, maintaining its relative position
    setMiddleHandlePosition(constrainedLeft + oldMiddleOffset);
  }, [segmentWidth, segmentLeft, middleHandlePosition]);

  /**
   * Increase segment size
   */
  const handleSegmentSizeIncrease = useCallback((maxRight?: number) => {
    const newWidth = SegmentUtils.adjustSegmentSize(segmentWidth, segmentLeft, true, maxRight);
    handleSegmentResize(segmentLeft, newWidth, maxRight);
  }, [segmentWidth, segmentLeft, handleSegmentResize]);

  /**
   * Decrease segment size
   */
  const handleSegmentSizeDecrease = useCallback((maxRight?: number) => {
    const newWidth = SegmentUtils.adjustSegmentSize(segmentWidth, segmentLeft, false, maxRight);
    handleSegmentResize(segmentLeft, newWidth, maxRight);
  }, [segmentWidth, segmentLeft, handleSegmentResize]);

  /**
   * Confirm the current segment being edited
   */
  const handleSegmentConfirm = useCallback((customLength?: string) => {
    const { segment, newNextId } = SegmentUtils.createConfirmedSegment(
      editingSegmentId,
      originalSegmentData,
      segmentLeft,
      segmentWidth,
      segmentType,
      nextSegmentId,
      customLength
    );
    
    setConfirmedSegments(prev => [...prev, segment]);
    setNextSegmentId(newNextId);
    setEditingSegmentId(null);
    setOriginalSegmentData(null);
    setIsSegmentActive(false);

    window.parent.postMessage({ type: "intrasight-segment-confirmed", segment: { id: segment.id, label: segment.label } }, "*");
    console.log(`Confirmed segment ${segment.label} with type: ${segmentType}, length: ${segment.length}mm`);
  }, [editingSegmentId, originalSegmentData, segmentLeft, segmentWidth, segmentType, nextSegmentId]);

  /**
   * Cancel segment editing
   */
  const handleSegmentCancel = useCallback(() => {
    // If editing existing segment, restore original
    if (editingSegmentId !== null && originalSegmentData) {
      setConfirmedSegments(prev => [...prev, originalSegmentData]);
    }
    
    setEditingSegmentId(null);
    setOriginalSegmentData(null);
    setIsSegmentActive(false);
  }, [editingSegmentId, originalSegmentData]);

  /**
   * Delete the current segment being edited
   */
  const handleSegmentDelete = useCallback(() => {
    if (editingSegmentId !== null && originalSegmentData) {
      // Deleting an existing confirmed segment - permanently remove it
      // Don't restore the original segment to the confirmed list
      console.log(`Deleted confirmed segment ${originalSegmentData.label} (ID: ${editingSegmentId})`);
    } else {
      // Deleting a new segment that hasn't been confirmed yet - just cancel editing
      console.log("Deleted new segment (not yet confirmed)");
    }
    
    // Clean up editing state
    setEditingSegmentId(null);
    setOriginalSegmentData(null);
    setIsSegmentActive(false);
  }, [editingSegmentId, originalSegmentData]);

  /**
   * Start editing an existing confirmed segment
   */
  const handleEditConfirmedSegment = useCallback((segmentId: number) => {
    const segmentToEdit = confirmedSegments.find(s => s.id === segmentId);
    if (!segmentToEdit) return;

    // Store original segment data for potential restoration
    setOriginalSegmentData(segmentToEdit);

    // Load segment properties into editing state
    setSegmentLeft(segmentToEdit.left);
    setSegmentWidth(segmentToEdit.width);
    setSegmentPosition(segmentToEdit.left + segmentToEdit.width / 2);
    setSegmentType(segmentToEdit.type);

    // Initialize scrubber position to the center of the segment being edited
    const centerPosition = segmentToEdit.left + segmentToEdit.width / 2;
    setScrubberPosition(centerPosition);
    
    // Initialize middle handle position to the center as well
    setMiddleHandlePosition(centerPosition);

    // Track that we're editing existing segment
    setEditingSegmentId(segmentId);

    // Remove segment from confirmed list (temporarily)
    setConfirmedSegments(prev => prev.filter(s => s.id !== segmentId));

    // Enter segment editing mode
    setIsSegmentActive(true);

    console.log(`Editing segment ${segmentToEdit.label} (ID: ${segmentId})`);
  }, [confirmedSegments]);

  /**
   * Update scrubber position from external source (like main scrubber dragging)
   */
  const updateScrubberPosition = useCallback((newPosition: number) => {
    setScrubberPosition(newPosition);
  }, []);

  /**
   * Handle middle frame dragging (independent middle handle movement within segment)
   */
  const handleMiddleFrameDrag = useCallback((newPosition: number) => {
    // Update the middle handle position (not the scrubber)
    setMiddleHandlePosition(newPosition);
    
    console.log(`Middle handle dragged to position: ${newPosition}`);
  }, []);

  /**
   * Load a previously completed pullback's confirmed segments back in (used
   * when Deploy Assist sends the user back to another leg's review screen).
   */
  const restorePullback = useCallback((segments: ConfirmedSegment[]) => {
    setIsSegmentActive(false);
    setEditingSegmentId(null);
    setOriginalSegmentData(null);
    setConfirmedSegments(segments);
    setNextSegmentId(segments.reduce((max, s) => Math.max(max, s.id + 1), APP_CONSTANTS.INITIAL_NEXT_SEGMENT_ID));
  }, []);

  /**
   * Reset all segments to initial state
   */
  const resetSegments = useCallback(() => {
    setIsSegmentActive(false);
    setSegmentPosition(APP_CONSTANTS.INITIAL_SCRUBBER_POSITION);
    setSegmentWidth(APP_CONSTANTS.INITIAL_SEGMENT_WIDTH);
    setSegmentLeft(0);
    setSegmentType("lumen");
    setConfirmedSegments([]);
    setNextSegmentId(APP_CONSTANTS.INITIAL_NEXT_SEGMENT_ID);
    setEditingSegmentId(null);
    setOriginalSegmentData(null);
    setScrubberPosition(APP_CONSTANTS.INITIAL_SCRUBBER_POSITION);
    setMiddleHandlePosition(APP_CONSTANTS.INITIAL_SCRUBBER_POSITION);
  }, []);

  return {
    // State
    isSegmentActive,
    segmentPosition,
    segmentWidth,
    segmentLeft,
    segmentType,
    confirmedSegments,
    nextSegmentId,
    editingSegmentId,
    originalSegmentData,
    scrubberPosition,
    middleHandlePosition,
    
    // Setters
    setSegmentType,
    
    // Handlers
    handleAddSegment,
    handleSegmentResize,
    handleSegmentMove,
    handleSegmentSizeIncrease,
    handleSegmentSizeDecrease,
    handleSegmentConfirm,
    handleSegmentCancel,
    handleSegmentDelete,
    handleEditConfirmedSegment,
    updateScrubberPosition,
    handleMiddleFrameDrag,
    restorePullback,
    resetSegments,
    
    // Utilities
    calculateSegmentLength: SegmentUtils.calculateSegmentLength,
  };
}