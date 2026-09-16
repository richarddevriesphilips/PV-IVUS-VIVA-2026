import React, { useState, useRef } from 'react';

interface SegmentEditingHandlesProps {
  segment: {
    id: string;
    label: 'A' | 'B' | 'C';
    startTime: number;
    endTime: number;
    startPosition: number;
    width: number;
  };
  videoDuration: number;
  timelineWidth: number; // 1400px usable width
  timelineStartOffset: number; // 70px offset
  onSegmentUpdate: (segmentId: string, startTime: number, endTime: number) => void;
}

export default function SegmentEditingHandles({
  segment,
  videoDuration,
  timelineWidth,
  timelineStartOffset,
  onSegmentUpdate
}: SegmentEditingHandlesProps) {
  const [isDragging, setIsDragging] = useState<{
    handle: 'start' | 'end' | null;
    initialX: number;
    initialStartTime: number;
    initialEndTime: number;
  }>({ handle: null, initialX: 0, initialStartTime: 0, initialEndTime: 0 });

  // Convert time to position on timeline
  const timeToPosition = (time: number): number => {
    return timelineStartOffset + (time / videoDuration) * timelineWidth;
  };

  // Convert position to time
  const positionToTime = (position: number): number => {
    const relativePosition = position - timelineStartOffset;
    const percentage = Math.max(0, Math.min(1, relativePosition / timelineWidth));
    return percentage * videoDuration;
  };

  const handleMouseDown = (handle: 'start' | 'end', e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging({
      handle,
      initialX: e.clientX,
      initialStartTime: segment.startTime,
      initialEndTime: segment.endTime
    });

    const handleMouseMove = (moveE: MouseEvent) => {
      const deltaX = moveE.clientX - e.clientX;
      
      if (handle === 'start') {
        // Dragging start handle - only change start time
        const newStartPosition = segment.startPosition + deltaX;
        const newStartTime = Math.max(0, positionToTime(newStartPosition));
        
        // Ensure start time doesn't exceed end time (minimum 0.5 second segment)
        const minEndTime = newStartTime + 0.5;
        const adjustedEndTime = Math.max(segment.endTime, minEndTime);
        
        if (newStartTime < adjustedEndTime) {
          onSegmentUpdate(segment.id, newStartTime, adjustedEndTime);
        }
      } else if (handle === 'end') {
        // Dragging end handle - only change end time
        const newEndPosition = segment.startPosition + segment.width + deltaX;
        const newEndTime = Math.min(videoDuration, positionToTime(newEndPosition));
        
        // Ensure end time doesn't go below start time (minimum 0.5 second segment)
        const minStartTime = newEndTime - 0.5;
        const adjustedStartTime = Math.min(segment.startTime, minStartTime);
        
        if (newEndTime > adjustedStartTime) {
          onSegmentUpdate(segment.id, adjustedStartTime, newEndTime);
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging({ handle: null, initialX: 0, initialStartTime: 0, initialEndTime: 0 });
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const startHandlePosition = timeToPosition(segment.startTime);
  const endHandlePosition = timeToPosition(segment.endTime);

  return (
    <>
      {/* Start Handle */}
      <div
        className="absolute top-0 w-3 h-[167px] cursor-ew-resize z-70"
        style={{
          left: `${startHandlePosition - 34}px`, // Handle positioned 22px to the left of segment start
          backgroundColor: isDragging.handle === 'start' ? '#FFDD19' : '#FF6B6B',
          border: '2px solid white',
          borderRadius: '2px',
          opacity: 0.9,
          transform: isDragging.handle === 'start' ? 'scaleX(1.2)' : 'scaleX(1)',
          transition: isDragging.handle === 'start' ? 'none' : 'transform 0.2s ease'
        }}
        onMouseDown={(e) => handleMouseDown('start', e)}
        title={`Drag to adjust segment ${segment.label} start time`}
      >
        {/* Handle indicator */}
        <div className="absolute top-2 left-1/2 w-1 h-4 bg-white rounded-full transform -translate-x-1/2" />
        <div className="absolute bottom-2 left-1/2 w-1 h-4 bg-white rounded-full transform -translate-x-1/2" />
      </div>

      {/* End Handle */}
      <div
        className="absolute top-0 w-3 h-[167px] cursor-ew-resize z-70"
        style={{
          left: `${endHandlePosition + 22}px`, // Handle positioned 22px to the right of segment end
          backgroundColor: isDragging.handle === 'end' ? '#FFDD19' : '#FF6B6B',
          border: '2px solid white',
          borderRadius: '2px',
          opacity: 0.9,
          transform: isDragging.handle === 'end' ? 'scaleX(1.2)' : 'scaleX(1)',
          transition: isDragging.handle === 'end' ? 'none' : 'transform 0.2s ease'
        }}
        onMouseDown={(e) => handleMouseDown('end', e)}
        title={`Drag to adjust segment ${segment.label} end time`}
      >
        {/* Handle indicator */}
        <div className="absolute top-2 left-1/2 w-1 h-4 bg-white rounded-full transform -translate-x-1/2" />
        <div className="absolute bottom-2 left-1/2 w-1 h-4 bg-white rounded-full transform -translate-x-1/2" />
      </div>

      {/* Segment Duration Indicator */}
      <div
        className="absolute top-[-25px] left-1/2 transform -translate-x-1/2 bg-black text-[#FFDD19] px-2 py-1 rounded text-xs font-['CentraleSans:Medium',_sans-serif] pointer-events-none"
        style={{
          left: `${(startHandlePosition + endHandlePosition) / 2}px`,
          zIndex: 80,
          border: '1px solid #FFDD19'
        }}
      >
        {segment.label}: {(segment.endTime - segment.startTime).toFixed(1)}s
      </div>
    </>
  );
}