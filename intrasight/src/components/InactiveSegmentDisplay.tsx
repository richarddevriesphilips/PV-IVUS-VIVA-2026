import React from 'react';
import SegmentDefaultWhite from './SegmentDefaultWhite';

interface InactiveSegmentDisplayProps {
  label: 'A' | 'B' | 'C';
  duration: number; // in seconds
  onClick?: () => void;
}

export default function InactiveSegmentDisplay({ 
  label, 
  duration, 
  onClick 
}: InactiveSegmentDisplayProps) {
  const measurement = `${duration.toFixed(1)} cm`;

  return (
    <div 
      className="cursor-pointer"
      onClick={onClick}
    >
      <SegmentDefaultWhite 
        label={label}
        measurement={measurement}
      />
    </div>
  );
}