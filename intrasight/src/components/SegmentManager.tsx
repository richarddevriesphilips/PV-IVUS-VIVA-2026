import React, { useState } from 'react';
import IldSegment from '../imports/IldSegment';
import SegmentDefault from '../imports/SegmentDefault-2034-64';
import InactiveSegmentDisplay from './InactiveSegmentDisplay';

interface Segment {
  id: string;
  label: 'A' | 'B' | 'C';
  startTime: number;
  endTime: number;
  startPosition: number; // Pixel position on timeline
  width: number; // Width in pixels
  isConfirmed: boolean;
  isEditing: boolean;
  mlaTime?: number; // MLA (Minimal Lumen Area) time position
}

interface SegmentManagerProps {
  videoDuration: number;
  timelineWidth: number; // Usable timeline width (1400px)
  timelineStartOffset: number; // Start offset (70px)
  currentTime: number;
  onTimeChange: (newTime: number) => void;
  renderInputPanel?: boolean; // Whether to render the input panel
  segments?: Segment[];
  selectedElement?: 'scrubber' | string | null; // Selection state
  onSegmentDragStart?: (segmentId: string, e: React.MouseEvent) => void;
  onSegmentResizeStart?: (segmentId: string, e: React.MouseEvent, handle: 'left' | 'right') => void;
  onSegmentClick?: (segmentId: string) => void;
  onSegmentSelect?: (segmentId: string) => void; // New selection handler
  onSegmentUpdate?: (segmentId: string, startTime: number, endTime: number) => void;
  onMlaUpdate?: (segmentId: string, mlaTime: number) => void;
  onSegmentMove?: (segmentId: string, newStartTime: number) => void;
}

export default function SegmentManager({
  videoDuration,
  timelineWidth,
  timelineStartOffset,
  currentTime,
  onTimeChange,
  renderInputPanel = true,
  segments = [],
  selectedElement = 'scrubber',
  onSegmentDragStart,
  onSegmentResizeStart,
  onSegmentClick,
  onSegmentSelect,
  onSegmentUpdate,
  onMlaUpdate,
  onSegmentMove
}: SegmentManagerProps) {
  const [dragState, setDragState] = useState<{
    segmentId: string;
    startPosition: number;
    startWidth: number;
    action: 'move' | 'resize-left' | 'resize-right';
  } | null>(null);

  const [isDraggingSegment, setIsDraggingSegment] = useState<string | null>(null);

  // Handle segment drag start - for moving entire segment
  const handleSegmentDragStart = (segmentId: string, e: React.MouseEvent) => {
    if (onSegmentDragStart) {
      onSegmentDragStart(segmentId, e);
    } else {
      // Default behavior: move the entire segment
      startSegmentMove(segmentId, e);
    }
  };

  // Start segment move operation
  const startSegmentMove = (segmentId: string, e: React.MouseEvent) => {
    console.log('🖱️ Starting segment move for:', segmentId);
    e.preventDefault();
    e.stopPropagation();

    const segment = segments.find(s => s.id === segmentId);
    if (!segment || !onSegmentMove) {
      console.log('❌ Cannot move segment - segment or onSegmentMove not found');
      return;
    }

    setIsDraggingSegment(segmentId);

    const startX = e.clientX;
    const initialStartTime = segment.startTime;

    const handleMouseMove = (moveE: MouseEvent) => {
      const deltaX = moveE.clientX - startX;
      const deltaTime = (deltaX / timelineWidth) * videoDuration;
      const newStartTime = initialStartTime + deltaTime;
      
      onSegmentMove(segmentId, newStartTime);
    };

    const handleMouseUp = () => {
      console.log('🖱️ Segment move ended for:', segmentId);
      setIsDraggingSegment(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Handle segment resize start
  const handleSegmentResizeStart = (segmentId: string, e: React.MouseEvent, handle: 'left' | 'right') => {
    if (onSegmentResizeStart) {
      onSegmentResizeStart(segmentId, e, handle);
    } else {
      // Default resize handling if no external handler provided
      startResize(segmentId, e, handle);
    }
  };

  // Convert position to time
  const positionToTime = (position: number): number => {
    const relativePosition = position - timelineStartOffset;
    const percentage = Math.max(0, Math.min(1, relativePosition / timelineWidth));
    return percentage * videoDuration;
  };

  // Start resize operation
  const startResize = (segmentId: string, e: React.MouseEvent, handle: 'left' | 'right') => {
    e.preventDefault();
    e.stopPropagation();

    const segment = segments.find(s => s.id === segmentId);
    if (!segment || !onSegmentUpdate) return;

    const startX = e.clientX;
    const initialStartTime = segment.startTime;
    const initialEndTime = segment.endTime;

    const handleMouseMove = (moveE: MouseEvent) => {
      const deltaX = moveE.clientX - startX;
      const deltaTime = (deltaX / timelineWidth) * videoDuration;

      if (handle === 'left') {
        // Dragging left handle - adjust start time
        const newStartTime = Math.max(0, initialStartTime + deltaTime);
        const minEndTime = newStartTime + 0.5; // Minimum 0.5 second segment
        const adjustedEndTime = Math.max(initialEndTime, minEndTime);
        
        if (newStartTime < adjustedEndTime) {
          onSegmentUpdate(segmentId, newStartTime, adjustedEndTime);
        }
      } else if (handle === 'right') {
        // Dragging right handle - adjust end time
        const newEndTime = Math.min(videoDuration, initialEndTime + deltaTime);
        const maxStartTime = newEndTime - 0.5; // Minimum 0.5 second segment
        const adjustedStartTime = Math.min(initialStartTime, maxStartTime);
        
        if (newEndTime > adjustedStartTime) {
          onSegmentUpdate(segmentId, adjustedStartTime, newEndTime);
        }
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Convert time to position
  const timeToPosition = (time: number): number => {
    return timelineStartOffset + (time / videoDuration) * timelineWidth;
  };

  // Handle segment click for editing
  const handleSegmentClick = (segmentId: string) => {
    if (onSegmentClick) {
      onSegmentClick(segmentId);
    }
  };

  return (
    <>
      {/* Segments on Timeline */}
      <div className="absolute inset-0">
        {segments.map((segment) => {
          // IldSegment has 32px inset on each side, so extend container when editing
          const isUsingIldSegment = !segment.isConfirmed || segment.isEditing;
          const insetOffset = isUsingIldSegment ? 32 : 0;
          
          return (
            <div
              key={segment.id}
              className="absolute h-[167px] top-1.5"
              style={{
                left: `${segment.startPosition - insetOffset}px`,
                width: `${segment.width + (insetOffset * 2)}px`,
                zIndex: segment.isEditing ? 60 : (isDraggingSegment === segment.id ? 50 : 40),
                opacity: isDraggingSegment === segment.id ? 0.8 : 1,
                transition: isDraggingSegment === segment.id ? 'none' : 'all 0.1s ease'
              }}
              onClick={() => handleSegmentClick(segment.id)}
            >
            {segment.isConfirmed && !segment.isEditing ? (
              // Confirmed segments - show active (yellow) or inactive (white) based on selection
              selectedElement === segment.id ? (
                // Active segment - yellow styling
                <div
                  className="cursor-pointer"
                  onClick={() => handleSegmentClick(segment.id)}
                >
                  <SegmentDefault 
                    label={segment.label}
                    measurement={`${(segment.endTime - segment.startTime).toFixed(1)} cm`}
                  />
                </div>
              ) : (
                // Inactive segment - white styling from Figma
                <InactiveSegmentDisplay
                  label={segment.label}
                  duration={segment.endTime - segment.startTime}
                  onClick={() => {
                    if (onSegmentSelect) {
                      onSegmentSelect(segment.id);
                    }
                  }}
                />
              )
            ) : (
              // Editing or unconfirmed segments use IldSegment (with handles)
              <IldSegment
                width={segment.width}
                label={segment.label}
                onDragStart={(e) => {
                  // Allow segment movement by dragging the background
                  handleSegmentDragStart(segment.id, e);
                }}
                onResizeStart={(e, handle) => {
                  // Only allow resizing if the segment is in editing mode
                  if (segment.isEditing) {
                    handleSegmentResizeStart(segment.id, e, handle);
                  }
                }}
              />
            )}

          </div>
        );
        })}
      </div>


    </>
  );
}