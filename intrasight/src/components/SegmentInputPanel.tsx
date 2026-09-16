import React from 'react';
import AddSegmentBox from '../imports/AddSegmentBox';
import SegmentInputFieldBoom from '../imports/SegmentInputFieldBoom';
import AddSegmentButton from './AddSegmentButton';
import SegmentEditingBox from './SegmentEditingBox';
import Frame100 from '../imports/Frame100';
import InactiveSegmentInputField from './InactiveSegmentInputField';

// Confirmed Segment Display Component based on Frame100 design
function ConfirmedSegmentDisplay({ 
  label, 
  duration, 
  showEditButton = true 
}: { 
  label: string; 
  duration: number; 
  showEditButton?: boolean;
}) {
  const measurementCm = duration.toFixed(1); // Duration in seconds = length in cm (1:1 ratio)
  
  return (
    <div className="flex gap-3 items-center h-14 relative">
      {/* Main segment field */}
      <div className="bg-[#746826] rounded-[3px] w-[152px] h-14 relative flex-shrink-0">
        <div className="box-border content-stretch flex gap-2.5 items-center justify-start overflow-clip p-[14px] relative w-[152px] h-full">
          <div className="[text-shadow:rgba(0,0,0,0.5)_0px_2px_4px] font-['CentraleSans:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffdd19] text-[24px] text-nowrap">
            <p className="leading-[28px] whitespace-pre">{label}</p>
          </div>
          <div className="absolute h-6 left-[43px] top-4 w-[93px]">
            <div className="absolute h-6 left-[-7px] overflow-clip top-0 w-[51px]">
              <div className="[text-shadow:rgba(0,0,0,0.5)_0px_2px_4px] absolute font-['CentraleSans:Book',_sans-serif] h-6 leading-[0] left-[51px] not-italic text-[24px] text-right text-white top-0 translate-x-[-100%] w-[51px]">
                <p className="leading-[24px]">{measurementCm}</p>
              </div>
            </div>
            <div className="[text-shadow:rgba(0,0,0,0.5)_0px_2px_4px] absolute font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic right-0 text-[24px] text-nowrap text-right text-white top-0">
              <p className="leading-[24px] whitespace-pre">cm</p>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border-2 border-[#ffdd19] border-solid inset-0 pointer-events-none rounded-[3px]" />
      </div>
      
      {/* Edit button - only show when showEditButton is true */}
      {showEditButton && (
        <div className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex gap-2 h-14 items-center justify-center px-[18px] rounded-[4px] flex-shrink-0">
          <div className="relative shrink-0 size-8">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
              <path d="M4 22L10 28L24 14L18 8L4 22ZM24 2L20 6L26 12L30 8L24 2ZM2 24L0 32L8 30L2 24Z" fill="#E8E8E8" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

interface Segment {
  id: string;
  label: 'A' | 'B' | 'C';
  startTime: number;
  endTime: number;
  isConfirmed: boolean;
  isEditing: boolean;
  mlaTime?: number;
}

interface SegmentInputPanelProps {
  segments: Segment[];
  editingSegmentId: string | null;
  selectedElement?: 'scrubber' | string | null; // Selection state
  onConfirmSegment: (segmentId: string) => void;
  onCancelSegment: (segmentId: string) => void;
  onDeleteSegment: (segmentId: string) => void;
  onEditSegment: (segmentId: string) => void;
  onSelectSegment?: (segmentId: string) => void; // New selection handler
  onSegmentLengthChange: (segmentId: string, newLength: number) => void; // New length change handler
  onAddSegment: () => void;
  canAddSegment: boolean;
  nextLabel: 'A' | 'B' | 'C' | null;
  hasXRayData?: boolean; // Whether X-ray data exists at current handle position
}

export default function SegmentInputPanel({
  segments,
  editingSegmentId,
  selectedElement = 'scrubber',
  onConfirmSegment,
  onCancelSegment,
  onDeleteSegment,
  onEditSegment,
  onSelectSegment,
  onSegmentLengthChange,
  onAddSegment,
  canAddSegment,
  nextLabel,
  hasXRayData = true
}: SegmentInputPanelProps) {
  // Check if any segment is in editing mode (being added or edited)
  const hasEditingSegment = editingSegmentId !== null;

  return (
    <div className="flex flex-col gap-4 h-full overflow-hidden">
      {/* If editing, show ONLY the editing segment at the top */}
      {hasEditingSegment ? (
        segments
          .filter(segment => segment.isEditing)
          .map((segment) => (
            <div key={segment.id} className="relative flex-shrink-0">
              <div className="w-[332px] h-[180px]">
                <SegmentEditingBox
                  label={segment.label}
                  startTime={segment.startTime}
                  endTime={segment.endTime}
                  onConfirm={() => onConfirmSegment(segment.id)}
                  onCancel={() => onCancelSegment(segment.id)}
                  onDelete={() => onDeleteSegment(segment.id)}
                  onLengthChange={(newLength) => onSegmentLengthChange(segment.id, newLength)}
                  hasXRayData={hasXRayData}
                />
              </div>
            </div>
          ))
      ) : (
        /* No editing - show all confirmed segments */
        <div className="flex flex-col gap-4">
          {segments.map((segment) => (
            <div key={segment.id} className="relative flex-shrink-0">
              {selectedElement === segment.id ? (
                /* Active segment - yellow styling */
                <div 
                  className="relative cursor-pointer transform hover:scale-[1.02] transition-transform w-[228px] h-14"
                  onClick={() => onEditSegment(segment.id)}
                >
                  <ConfirmedSegmentDisplay 
                    label={segment.label}
                    duration={(segment.endTime - segment.startTime)}
                    showEditButton={true}
                  />
                </div>
              ) : (
                /* Inactive segment - gray styling */
                <div className="w-[228px] h-14">
                  <InactiveSegmentInputField
                    label={segment.label}
                    duration={segment.endTime - segment.startTime}
                    onClick={() => {
                      if (onSelectSegment) {
                        onSelectSegment(segment.id);
                      }
                    }}
                  />
                </div>
              )}
            </div>
          ))}

          {/* Add Segment Button - Authentic Figma Button */}
          {canAddSegment && (
            <div className="w-[228px] h-[40px]">
              <AddSegmentButton onClick={onAddSegment} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}