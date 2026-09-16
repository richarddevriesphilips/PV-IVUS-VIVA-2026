import React from 'react';

interface InactiveSegmentInputFieldProps {
  label: 'A' | 'B' | 'C';
  duration: number; // in seconds
  onClick?: () => void;
}

export default function InactiveSegmentInputField({ 
  label, 
  duration, 
  onClick 
}: InactiveSegmentInputFieldProps) {
  const measurementCm = duration.toFixed(1); // Duration in seconds = length in cm (1:1 ratio)

  return (
    <div 
      className="flex gap-3 items-center h-14 relative cursor-pointer"
      onClick={onClick}
    >
      {/* Main segment field - Gray styling for inactive state */}
      <div className="bg-[rgba(89,89,89,0.55)] rounded-[3px] w-[152px] h-14 relative flex-shrink-0">
        <div className="box-border content-stretch flex gap-2.5 items-center justify-start overflow-clip p-[14px] relative w-[152px] h-full">
          <div className="[text-shadow:rgba(0,0,0,0.5)_0px_2px_4px] font-['CentraleSans:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[rgba(173,173,173,0.87)] text-[24px] text-nowrap">
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
      </div>
      
      {/* Edit button - Gray styling for inactive state */}
      <div className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex gap-2 h-14 items-center justify-center px-[18px] rounded-[4px] flex-shrink-0">
        <div className="relative shrink-0 size-8">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <path d="M4 22L10 28L24 14L18 8L4 22ZM24 2L20 6L26 12L30 8L24 2ZM2 24L0 32L8 30L2 24Z" fill="#E8E8E8" />
          </svg>
        </div>
      </div>
    </div>
  );
}