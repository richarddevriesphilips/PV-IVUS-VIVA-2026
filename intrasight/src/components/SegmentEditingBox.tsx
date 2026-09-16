import React, { useState, useEffect, useCallback } from 'react';
import svgPaths from "../imports/svg-62m06a90jg";

interface SegmentEditingBoxProps {
  label: string;
  startTime: number;
  endTime: number;
  onConfirm: () => void;
  onCancel: () => void;
  onDelete: () => void;
  onLengthChange: (newLength: number) => void;
  hasXRayData?: boolean;
}

// Standard Figma button components
function CheckmarkStandAlone() {
  return (
    <div className="relative shrink-0 size-6" data-name="CheckmarkStandAlone">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="CheckmarkStandAlone">
          <path d={svgPaths.p20660480} fill="var(--fill-0, white)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function CloseCrossCircle() {
  return (
    <div className="relative shrink-0 size-6" data-name="CloseCrossCircle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="CloseCrossCircle">
          <path d={svgPaths.p39ef700} fill="var(--fill-0, #E8E8E8)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function DeleteTrash() {
  return (
    <div className="relative shrink-0 size-6" data-name="DeleteTrash">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="DeleteTrash">
          <path d={svgPaths.p119c42c0} fill="var(--fill-0, #E8E8E8)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function StandardConfirmButton({ onClick }: { onClick: () => void }) {
  return (
    <div 
      className="bg-[#1474a4] box-border content-stretch flex gap-2 h-10 items-center justify-center px-4 py-2 rounded-[2px] cursor-pointer hover:bg-[#1565a0] transition-colors flex-1" 
      data-name="🟢 Button (IGT)"
      onClick={onClick}
    >
      <CheckmarkStandAlone />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white">
        <p className="leading-[22px] whitespace-pre">Confirm</p>
      </div>
    </div>
  );
}

function StandardCancelButton({ onClick }: { onClick: () => void }) {
  return (
    <div 
      className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex gap-2 h-10 items-center justify-center px-4 py-2 rounded-[2px] cursor-pointer hover:bg-[rgba(89,89,89,0.7)] transition-colors flex-1" 
      data-name="🟢 Button (IGT)"
      onClick={onClick}
    >
      <CloseCrossCircle />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-nowrap">
        <p className="leading-[22px] whitespace-pre">Cancel</p>
      </div>
    </div>
  );
}

function StandardDeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <div 
      className="w-full bg-[rgba(89,89,89,0.55)] box-border content-stretch flex gap-2 h-10 items-center justify-center px-4 py-2 rounded-[2px] cursor-pointer hover:bg-[rgba(89,89,89,0.7)] transition-colors" 
      data-name="🟢 Button (IGT)"
      onClick={onClick}
    >
      <DeleteTrash />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-nowrap">
        <p className="leading-[22px] whitespace-pre">Delete Segment</p>
      </div>
    </div>
  );
}


export default function SegmentEditingBox({ 
  label, 
  startTime, 
  endTime, 
  onConfirm, 
  onCancel, 
  onDelete, 
  onLengthChange,
  hasXRayData = true // Default to true to maintain existing behavior
}: SegmentEditingBoxProps) {
  // Calculate segment length in cm (assuming 1 second = 1 cm for IVUS pullback)
  const calculateLength = useCallback((start: number, end: number) => {
    return Math.abs(end - start);
  }, []);

  const [length, setLength] = useState(() => calculateLength(startTime, endTime));
  const [inputValue, setInputValue] = useState(() => calculateLength(startTime, endTime).toFixed(1));

  // Update length when segment times change
  useEffect(() => {
    const newLength = calculateLength(startTime, endTime);
    setLength(newLength);
    setInputValue(newLength.toFixed(1));
  }, [startTime, endTime, calculateLength]);

  // Handle input field changes
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    
    // Parse the value and update immediately if valid
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue) && numericValue > 0) {
      setLength(numericValue);
      onLengthChange(numericValue);
    } else if (value === '' || value === '0' || value === '0.') {
      // Handle empty or partial input gracefully - don't update length yet
      // but allow the user to continue typing
    }
  }, [onLengthChange]);

  // Handle plus/minus button clicks
  const handleIncrement = useCallback(() => {
    const newLength = Math.round((length + 0.1) * 10) / 10; // Round to 1 decimal place
    setLength(newLength);
    setInputValue(newLength.toFixed(1));
    onLengthChange(newLength);
  }, [length, onLengthChange]);

  const handleDecrement = useCallback(() => {
    const newLength = Math.max(0.1, Math.round((length - 0.1) * 10) / 10); // Minimum 0.1cm
    setLength(newLength);
    setInputValue(newLength.toFixed(1));
    onLengthChange(newLength);
  }, [length, onLengthChange]);
  return (
    <div className="flex items-start justify-start relative">
      <div className="bg-[rgba(255,255,255,0.2)] h-[180px] relative rounded-[8px] shrink-0 w-[332px] border-2 border-[#ffcd05] border-solid box-border">
        <div className="h-full w-full flex flex-col justify-between p-4 overflow-hidden box-border">
          
          {/* Top Row: Label and Input Field */}
          <div className="flex items-center gap-4">
            {/* Segment Label */}
            <div className="[text-shadow:rgba(0,0,0,0.5)_0px_2px_4px] font-['CentraleSans:Bold',_sans-serif] text-[#ffcd05] text-[24px] flex-shrink-0">
              {label}
            </div>
            
            {/* Input Field Container with -, cm, + inside - Only show when X-ray data exists */}
            {hasXRayData ? (
            <div className="flex-1 bg-neutral-900 h-12 rounded-[8px] flex items-center px-4 relative min-w-0">
              {/* Minus Button - 16px from left edge */}
              <div 
                className="cursor-pointer w-6 h-6 flex items-center justify-center bg-transparent hover:bg-[rgba(255,255,255,0.1)] rounded transition-colors flex-shrink-0"
                onClick={handleDecrement}
              >
                <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1H15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              
              {/* Centered input and cm group */}
              <div className="flex-1 flex items-center justify-center">
                <div className="flex items-center">
                  <input 
                    type="text" 
                    value={inputValue}
                    onChange={handleInputChange}
                    className="bg-transparent border-none outline-none text-right font-['CentraleSans:Book',_sans-serif] text-[24px] text-white [text-shadow:rgba(0,0,0,0.5)_0px_2px_4px] placeholder-gray-400 w-12"
                    placeholder="0.0"
                  />
                  <span className="font-['CentraleSans:Book',_sans-serif] text-[20px] text-[#787878] ml-1">
                    cm
                  </span>
                </div>
              </div>
              
              {/* Plus Button - 16px from right edge */}
              <div 
                className="cursor-pointer w-6 h-6 flex items-center justify-center bg-transparent hover:bg-[rgba(255,255,255,0.1)] rounded transition-colors flex-shrink-0"
                onClick={handleIncrement}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 2V10M2 6H10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
            ) : (
              /* Placeholder when no X-ray data - show message */
              <div className="flex-1 bg-neutral-900 h-12 rounded-[8px] flex items-center justify-center px-4 relative min-w-0">
                <span className="font-['CentraleSans:Book',_sans-serif] text-[14px] text-[#787878] text-center">
                  Length measurement not available outside X-Ray area
                </span>
              </div>
            )}
          </div>
          
          {/* Delete Button */}
          <div className="w-full">
            <StandardDeleteButton onClick={onDelete} />
          </div>
          
          {/* Bottom Row: Confirm and Cancel Buttons */}
          <div className="flex gap-4">
            <StandardConfirmButton onClick={onConfirm} />
            <StandardCancelButton onClick={onCancel} />
          </div>
        </div>
      </div>
    </div>
  );
}