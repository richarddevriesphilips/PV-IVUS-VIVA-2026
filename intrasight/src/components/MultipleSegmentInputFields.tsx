import React from "react";
import svgPaths from "../imports/svg-8ozzownxne";

interface Segment {
  id: string;
  position: number;
  time: number;
  label: string;
  width: number;
}

interface MultipleSegmentInputFieldsProps {
  segments: Segment[];
  onEditClick: (segmentId: string) => void;
  onAddSegmentClick: () => void;
}

// Individual segment input field component
function SegmentInputField({ label, top, onEditClick }: { label: string; top: number; onEditClick: () => void }) {
  return (
    <>
      {/* Segment Input Field */}
      <div 
        className="absolute bg-[rgba(89,89,89,0.5)] left-0 rounded-[3px] w-[152px] h-14"
        style={{ top: `${top}px` }}
      >
        <div className="flex flex-row items-center overflow-clip relative size-full">
          <div className="box-border content-stretch flex flex-row items-center justify-between p-[14px] relative w-[152px]">
            <div className="[text-shadow:rgba(0,0,0,0.5)_0px_2px_4px] font-['CentraleSans:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[24px] text-[rgba(173,173,173,0.87)] text-left text-nowrap">
              <p className="block leading-[28px] whitespace-pre">{label}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Button */}
      <button
        onClick={onEditClick}
        className="absolute bg-[rgba(89,89,89,0.55)] h-14 left-[167px] rounded cursor-pointer hover:bg-[rgba(89,89,89,0.75)] transition-colors"
        style={{ top: `${top}px` }}
      >
        <div className="flex flex-row items-center justify-center relative size-full">
          <div className="box-border content-stretch flex flex-row gap-2 h-14 items-center justify-center px-4 py-4 relative">
            <div className="relative shrink-0 size-8">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 32 32"
              >
                <g id="Edit">
                  <path
                    d="M5.33333 21.3333L10.6667 26.6667L26 11.3333L20.6667 6L5.33333 21.3333ZM25.3333 1.33333L22 4.66667L27.3333 10L30.6667 6.66667L25.3333 1.33333ZM4 22.6667L1.33333 30.6667L9.33333 28L4 22.6667Z"
                    fill="var(--fill-0, #E8E8E8)"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </button>
    </>
  );
}

export default function MultipleSegmentInputFields({ 
  segments, 
  onEditClick, 
  onAddSegmentClick 
}: MultipleSegmentInputFieldsProps) {
  // Maximum of 3 segments allowed
  const maxSegments = 3;
  const canAddMoreSegments = segments.length < maxSegments;
  
  // Calculate container height: 56px per segment + (56px for add button if allowed) + 8px spacing
  const containerHeight = segments.length * 64 + (canAddMoreSegments ? 56 : 0);
  const addButtonTop = segments.length * 64;

  return (
    <div 
      className="relative w-[228px]" 
      style={{ height: `${containerHeight}px` }}
      data-name="Multiple Segment Input Fields"
    >
      {/* Render all segment input fields */}
      {segments.map((segment, index) => (
        <SegmentInputField
          key={segment.id}
          label={segment.label}
          top={index * 64}
          onEditClick={() => onEditClick(segment.id)}
        />
      ))}

      {/* Add Segment Button - Only show if under the limit */}
      {canAddMoreSegments && (
        <button
          onClick={onAddSegmentClick}
          className="absolute bg-[#696969] h-10 left-0 rounded-sm w-[228px] cursor-pointer hover:bg-[#757575] transition-colors"
          style={{ top: `${addButtonTop}px` }}
        >
          <div className="flex flex-row items-center justify-center relative size-full">
            <div className="box-border content-stretch flex flex-row gap-2 h-10 items-center justify-center px-4 py-2 relative w-[228px]">
              <div className="relative shrink-0 size-6">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 24 24"
                >
                  <g>
                    <path
                      d={svgPaths.p2a409f80}
                      fill="#E8E8E8"
                    />
                  </g>
                </svg>
              </div>
              <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-left text-nowrap">
                <p className="block leading-[22px] whitespace-pre">Add Segment</p>
              </div>
            </div>
          </div>
        </button>
      )}
    </div>
  );
}