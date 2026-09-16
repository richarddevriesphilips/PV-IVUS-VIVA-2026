import React from "react";

interface ZoomSliderProps {
  value: number;
  onChange: (value: number) => void;
  onClose: () => void;
}

function TrackSegment({ isActive }: { isActive: boolean }) {
  return (
    <div
      className="basis-0 grow h-1 min-h-px min-w-px order-4 relative shrink-0"
      data-name="Track segment"
    >
      <div className="box-border content-stretch flex flex-row h-1 items-center justify-center p-0 relative w-full">
        <div
          className={`basis-0 grow h-1 min-h-px min-w-px shrink-0 ${
            isActive ? "bg-[#1474a4]" : "bg-[#454545]"
          }`}
          data-name="Track"
        />
      </div>
    </div>
  );
}

function Circle() {
  return (
    <div
      className="absolute bg-[rgba(105,105,105,0.35)] left-1/2 rounded-[20px] size-4 top-1/2 translate-x-[-50%] translate-y-[-50%] z-50"
      data-name="Circle"
    />
  );
}

function RightThumb({ position }: { position: number }) {
  return (
    <div
      className="absolute size-10 top-1/2 translate-y-[-50%] cursor-grab active:cursor-grabbing z-50"
      style={{ left: `${position}px` }}
      data-name="Right thumb"
    >
      <Circle />
      <div
        className="absolute bg-[#c4c4c4] left-1/2 rounded-[100px] size-4 top-1/2 translate-x-[-50%] translate-y-[-50%] z-50"
        data-name="thumb"
      >
        <div className="absolute border border-[rgba(0,0,0,0.08)] border-solid inset-[-1px] pointer-events-none rounded-[101px] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.45)]" />
      </div>
    </div>
  );
}

function SliderIgt({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  const handleSliderClick = (
    e: React.MouseEvent<HTMLDivElement>,
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percentage = Math.max(
      0,
      Math.min(
        100,
        ((e.clientX - rect.left) / rect.width) * 100,
      ),
    );
    // Map 0-100% slider position to 10-100% zoom range
    const zoomValue = 10 + (percentage / 100) * 90;
    onChange(zoomValue);
  };

  const handleThumbDrag = (
    e: React.MouseEvent<HTMLDivElement>,
  ) => {
    e.stopPropagation();

    const handleGlobalMouseMove = (globalEvent: MouseEvent) => {
      const sliderElement = document.querySelector(
        '[data-name="Zoom Slider Track"]',
      );
      if (sliderElement) {
        const rect = sliderElement.getBoundingClientRect();
        const percentage = Math.max(
          0,
          Math.min(
            100,
            ((globalEvent.clientX - rect.left) / rect.width) *
              100,
          ),
        );
        // Map 0-100% slider position to 10-100% zoom range
        const zoomValue = 10 + (percentage / 100) * 90;
        onChange(zoomValue);
      }
    };

    const handleGlobalMouseUp = () => {
      document.removeEventListener(
        "mousemove",
        handleGlobalMouseMove,
      );
      document.removeEventListener(
        "mouseup",
        handleGlobalMouseUp,
      );
    };

    document.addEventListener(
      "mousemove",
      handleGlobalMouseMove,
    );
    document.addEventListener("mouseup", handleGlobalMouseUp);
  };

  // Map zoom value (10-100%) to slider position (0-100%)
  const sliderPosition = ((value - 10) / 90) * 100;
  const thumbPosition = (sliderPosition / 100) * 288 - 20; // 328px total width - 40px padding = 288px usable space

  return (
    <div
      className="absolute left-[58px] top-6 w-[328px] cursor-pointer"
      data-name="Zoom Slider Track"
      onClick={handleSliderClick}
    >
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row-reverse items-center justify-start px-0 py-[18px] relative w-[288px]">
          <TrackSegment isActive={sliderPosition >= 100} />
          <TrackSegment isActive={sliderPosition >= 75} />
          <TrackSegment isActive={sliderPosition >= 50} />
          <TrackSegment isActive={sliderPosition >= 25} />
          <div onMouseDown={handleThumbDrag}>
            <RightThumb position={thumbPosition} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ZoomSlider({
  value,
  onChange,
  onClose,
}: ZoomSliderProps) {
  return (
    <div className="bg-[#000000] relative w-[400px] h-[76px]">
      {/* Close area - click outside to close */}
      <div
        className="absolute inset-0 cursor-pointer rounded-[3px]"
        onClick={onClose}
      />

      {/* Slider content */}
      <div onClick={(e) => e.stopPropagation()}>
        <SliderIgt value={value} onChange={onChange} />
        <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-[25px] not-italic text-[#ffffff] text-[16px] text-nowrap text-right top-[33px] translate-x-[-100%]">
          <p className="block leading-[22px] whitespace-pre">
            10%
          </p>
        </div>
        <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-[423px] not-italic text-[#ffffff] text-[16px] text-nowrap text-right top-[33px] translate-x-[-100%]">
          <p className="block leading-[22px] whitespace-pre">
            100%
          </p>
        </div>
      </div>
    </div>
  );
}