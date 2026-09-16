import React from 'react';
import SegmentEditingBoxMouse from '../imports/SegmentEditingBoxMouse-2033-4586';

interface FunctionalSegmentEditingBoxProps {
  label: string;
  onConfirm: () => void;
  onCancel: () => void;
  onDelete: () => void;
}

export default function FunctionalSegmentEditingBox({ 
  label, 
  onConfirm, 
  onCancel, 
  onDelete 
}: FunctionalSegmentEditingBoxProps) {
  return (
    <div className="relative w-[332px] h-[180px]">
      {/* Base Figma Component */}
      <SegmentEditingBoxMouse />
      
      {/* Dynamic Label Overlay */}
      <div className="absolute left-[17px] top-6 text-[24px] font-['CentraleSans:Bold',_sans-serif] text-[#ffcd05] pointer-events-none">
        {label}
      </div>
      
      {/* Functional Button Overlays - positioned to match the visual buttons */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Confirm Button - bottom left */}
        <button
          className="absolute left-4 bottom-[18px] w-[142px] h-10 bg-transparent pointer-events-auto opacity-0 hover:opacity-10 hover:bg-blue-500 transition-all cursor-pointer"
          onClick={onConfirm}
          title="Confirm Segment"
        />
        
        {/* Cancel Button - bottom right */}
        <button
          className="absolute right-4 bottom-[18px] w-[142px] h-10 bg-transparent pointer-events-auto opacity-0 hover:opacity-10 hover:bg-gray-500 transition-all cursor-pointer"
          onClick={onCancel}
          title="Cancel Segment"
        />
        
        {/* Delete Button - top right */}
        <button
          className="absolute left-[268px] top-[18px] w-12 h-10 bg-transparent pointer-events-auto opacity-0 hover:opacity-10 hover:bg-red-500 transition-all cursor-pointer"
          onClick={onDelete}
          title="Delete Segment"
        />
      </div>
    </div>
  );
}