import React, { useState, useEffect, useRef } from 'react';
import svgPaths from "../imports/svg-2fxfgeleiz";
import svgPaths101 from "../imports/svg-7qfhqtbn7d";
import svgPaths102 from "../imports/svg-0inrhltsqc";

interface FunctionalToolbarProps {
  zoom: number;
  onZoomChange: (zoom: number) => void;
  brightness: number;
  onBrightnessChange: (brightness: number) => void;
}

function DiameterIcon() {
  return (
    <div className="absolute left-7 size-8 top-3" data-name="Diameter Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Diameter Icon">
          <path d={svgPaths.p248eff00} id="Vector 47" stroke="var(--stroke-0, white)" strokeOpacity="0.8" strokeWidth="3" />
          <path d={svgPaths.p227bb8f2} id="Ellipse 36" stroke="var(--stroke-0, white)" strokeOpacity="0.8" strokeWidth="2" />
          <path d={svgPaths.p3cc08c00} id="Ellipse 37" stroke="var(--stroke-0, white)" strokeOpacity="0.8" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function DiameterButton() {
  return (
    <div className="bg-neutral-900 h-[76px] overflow-clip relative rounded-[2px] shrink-0 w-[88px]" data-name="SideButton">
      <DiameterIcon />
      <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-[44.5px] not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-12 translate-x-[-50%]">
        <p className="leading-[20px] whitespace-pre">Diameter</p>
      </div>
    </div>
  );
}

function ManualDrawLine() {
  return (
    <div className="absolute left-7 size-8 top-3" data-name="ManualDrawLine">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="ManualDrawLine">
          <path d={svgPaths.paab4180} fill="var(--fill-0, white)" fillOpacity="0.8" id="path" opacity="0.5" />
          <path d={svgPaths.p3f8bdd80} fill="var(--fill-0, white)" fillOpacity="0.8" id="path_2" />
        </g>
      </svg>
    </div>
  );
}

function DrawButton() {
  return (
    <div className="bg-neutral-900 h-[76px] overflow-clip relative rounded-[2px] shrink-0 w-[88px]" data-name="SideButton">
      <ManualDrawLine />
      <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-[44.5px] not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-12 translate-x-[-50%]">
        <p className="leading-[20px] whitespace-pre">Draw</p>
      </div>
    </div>
  );
}

function MeasurementDots() {
  return (
    <div className="absolute left-7 size-8 top-3" data-name="MeasurementDots">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="MeasurementDots">
          <path d={svgPaths.p7044580} fill="var(--fill-0, white)" fillOpacity="0.8" id="path" />
        </g>
      </svg>
    </div>
  );
}

function DotsButton() {
  return (
    <div className="bg-neutral-900 h-[76px] overflow-clip relative rounded-[2px] shrink-0 w-[88px]" data-name="SideButton">
      <MeasurementDots />
      <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-11 not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-12 translate-x-[-50%]">
        <p className="leading-[20px] whitespace-pre">Dots</p>
      </div>
    </div>
  );
}

function AutoBorder() {
  return (
    <div className="absolute left-7 size-8 top-3" data-name="AutoBorder">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="AutoBorder">
          <path d={svgPaths.p2ca05000} fill="var(--fill-0, white)" fillOpacity="0.8" id="path" />
        </g>
      </svg>
    </div>
  );
}

function AutoBordersButton() {
  return (
    <div className="bg-neutral-900 h-[76px] overflow-clip relative rounded-[2px] shrink-0 w-[88px]" data-name="SideButton">
      <AutoBorder />
      <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-11 not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-12 translate-x-[-50%]">
        <p className="leading-[20px] whitespace-pre">Auto Borders</p>
      </div>
    </div>
  );
}

function DlsRotateContinuous48() {
  return (
    <div className="absolute left-7 size-8 top-3" data-name="DLS_RotateContinuous_48">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="DLS_RotateContinuous_48">
          <path d={svgPaths.p132b1b80} fill="var(--fill-0, white)" fillOpacity="0.8" id="path" />
        </g>
      </svg>
    </div>
  );
}

function RapidRevButton() {
  return (
    <div className="bg-neutral-900 h-[76px] overflow-clip relative rounded-[2px] shrink-0 w-[88px]" data-name="SideButton">
      <DlsRotateContinuous48 />
      <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-[44.5px] not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-12 translate-x-[-50%]">
        <p className="leading-[20px] whitespace-pre">Rapid Rev.</p>
      </div>
    </div>
  );
}

function DlsCropCircle48() {
  return (
    <div className="absolute left-7 size-8 top-3" data-name="DLS_CropCircle_48">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="DLS_CropCircle_48">
          <path d={svgPaths.p1969f180} fill="var(--fill-0, white)" fillOpacity="0.8" id="path" />
        </g>
      </svg>
    </div>
  );
}

function BordersButton() {
  return (
    <div className="bg-neutral-900 h-[73px] overflow-clip relative rounded-[2px] shrink-0 w-[88px]" data-name="SideButton">
      <DlsCropCircle48 />
      <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-11 not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-12 translate-x-[-50%]">
        <p className="leading-[20px] whitespace-pre">Borders</p>
      </div>
      <div className="absolute left-[76px] size-2 top-[3px]" data-name="Toggle on">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <circle cx="4" cy="4" fill="var(--fill-0, #45DE85)" id="Toggle on" r="4" />
        </svg>
      </div>
    </div>
  );
}

function FieldOfViewIcon() {
  return (
    <div className="absolute left-7 size-8 top-3" data-name="FieldOfViewIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="FieldOfViewIcon">
          <path d={svgPaths102.p17c13900} fill="var(--fill-0, #E8E8E8)" id="Union" />
          <path d={svgPaths102.p23655800} fill="var(--fill-0, #ADADAD)" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function ZoomSliderIgt({ zoom, onZoomChange }: { zoom: number, onZoomChange: (zoom: number) => void }) {
  const segments = 4;
  const filledSegments = Math.ceil((zoom / 100) * segments);
  
  return (
    <div className="absolute box-border content-stretch flex isolate items-center justify-start left-[33px] px-0 py-[18px] top-[18px] w-[328px]" data-name="🟢 Slider (IGT)">
      {Array.from({ length: segments }, (_, index) => {
        const isLastFilled = index === filledSegments - 1;
        const isFilled = index < filledSegments;
        const segmentValue = ((index + 1) / segments) * 100;
        
        return (
          <div 
            key={index}
            className={`basis-0 content-stretch flex grow h-1 items-center justify-center min-h-px min-w-px relative shrink-0 cursor-pointer`}
            style={{ zIndex: segments - index }}
            onClick={() => onZoomChange(segmentValue)}
            data-name="Track segment"
          >
            <div className={`basis-0 ${isFilled ? 'bg-[#1474a4]' : 'bg-[#454545]'} grow h-1 min-h-px min-w-px shrink-0`} data-name="Track" />
            
            {/* Show thumb on the last filled segment */}
            {isLastFilled && (
              <div className="absolute right-[-20px] size-10 top-1/2 translate-y-[-50%]" data-name="Right thumb">
                <div className="absolute bg-[rgba(105,105,105,0.35)] left-1/2 rounded-[20px] size-4 top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Circle" />
                <div className="absolute bg-[#c4c4c4] left-1/2 rounded-[100px] size-4 top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="thumb">
                  <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.08)] border-solid inset-[-1px] pointer-events-none rounded-[101px] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.45)]" />
                </div>
              </div>
            )}
          </div>
        );
      })}
      
      {/* Invisible overlay for fine-grained control */}
      <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={zoom}
        onChange={(e) => onZoomChange(parseInt(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        style={{ margin: 0 }}
      />
    </div>
  );
}

function ZoomButton({ 
  zoom, 
  onZoomChange, 
  showSlider, 
  onToggleSlider 
}: { 
  zoom: number;
  onZoomChange: (zoom: number) => void;
  showSlider: boolean;
  onToggleSlider: () => void;
}) {
  const handleClick = () => {
    onToggleSlider();
  };

  return (
    <div 
      className="bg-neutral-900 h-[76px] overflow-clip relative rounded-[2px] shrink-0 w-[88px] cursor-pointer hover:bg-neutral-800 transition-colors" 
      data-name="ZoomButton"
      onClick={handleClick}
      title={`Zoom: ${zoom}% (click to expand slider)`}
      data-slider-container
    >
      <FieldOfViewIcon />
      <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-11 not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-12 translate-x-[-50%]">
        <p className="leading-[20px] whitespace-pre">{zoom}</p>
      </div>
      <div className="absolute h-3.5 left-[9px] top-[31px] w-[7px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 14">
          <path d="M0 7L7 0V14L0 7Z" fill="var(--fill-0, white)" fillOpacity="0.8" id="Vector 55" />
        </svg>
      </div>
      
      {/* Frame102 Style Zoom Slider */}
      {showSlider && (
        <div className="absolute right-[96px] top-0 w-[402px] h-[76px] z-50" onClick={(e) => e.stopPropagation()}>
          {/* Dark background overlay */}
          <div className="absolute bg-[rgba(23,23,23,0.8)] h-[76px] left-0 top-0 w-[402px]" />
          
          {/* Slider component */}
          <ZoomSliderIgt zoom={zoom} onZoomChange={onZoomChange} />
        </div>
      )}
    </div>
  );
}

function ContrastBrightness32() {
  return (
    <div className="absolute left-7 size-8 top-3" data-name="ContrastBrightness_32">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="ContrastBrightness_32">
          <path d={svgPaths.p3349c100} fill="var(--fill-0, white)" fillOpacity="0.8" id="path" />
        </g>
      </svg>
    </div>
  );
}

function BrightnessSliderIgt({ brightness, onBrightnessChange }: { brightness: number, onBrightnessChange: (brightness: number) => void }) {
  const segments = 4;
  const filledSegments = Math.ceil((brightness / 100) * segments);
  
  return (
    <div className="absolute box-border content-stretch flex isolate items-center justify-start left-[33px] px-0 py-[18px] top-[18px] w-[328px]" data-name="🟢 Slider (IGT)">
      {Array.from({ length: segments }, (_, index) => {
        const isLastFilled = index === filledSegments - 1;
        const isFilled = index < filledSegments;
        const segmentValue = ((index + 1) / segments) * 100;
        
        return (
          <div 
            key={index}
            className={`basis-0 content-stretch flex grow h-1 items-center justify-center min-h-px min-w-px relative shrink-0 cursor-pointer`}
            style={{ zIndex: segments - index }}
            onClick={() => onBrightnessChange(segmentValue)}
            data-name="Track segment"
          >
            <div className={`basis-0 ${isFilled ? 'bg-[#1474a4]' : 'bg-[#454545]'} grow h-1 min-h-px min-w-px shrink-0`} data-name="Track" />
            
            {/* Show thumb on the last filled segment */}
            {isLastFilled && (
              <div className="absolute right-[-20px] size-10 top-1/2 translate-y-[-50%]" data-name="Right thumb">
                <div className="absolute bg-[rgba(105,105,105,0.35)] left-1/2 rounded-[20px] size-4 top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Circle" />
                <div className="absolute bg-[#c4c4c4] left-1/2 rounded-[100px] size-4 top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="thumb">
                  <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.08)] border-solid inset-[-1px] pointer-events-none rounded-[101px] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.45)]" />
                </div>
              </div>
            )}
          </div>
        );
      })}
      
      {/* Invisible overlay for fine-grained control */}
      <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={brightness}
        onChange={(e) => onBrightnessChange(parseInt(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        style={{ margin: 0 }}
      />
    </div>
  );
}

function BrightnessButton({ 
  brightness, 
  onBrightnessChange, 
  showSlider, 
  onToggleSlider 
}: { 
  brightness: number;
  onBrightnessChange: (brightness: number) => void;
  showSlider: boolean;
  onToggleSlider: () => void;
}) {
  const handleClick = () => {
    onToggleSlider();
  };

  return (
    <div 
      className="bg-neutral-900 h-[76px] overflow-clip relative rounded-[2px] shrink-0 w-[88px] cursor-pointer hover:bg-neutral-800 transition-colors" 
      data-name="BrightnessButton"
      onClick={handleClick}
      title={`Brightness: ${brightness}% (click to expand slider)`}
      data-slider-container
    >
      <ContrastBrightness32 />
      <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-11 not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-12 translate-x-[-50%]">
        <p className="leading-[20px] whitespace-pre">{brightness}</p>
      </div>
      <div className="absolute h-3.5 left-[9px] top-[31px] w-[7px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 14">
          <path d="M0 7L7 0V14L0 7Z" fill="var(--fill-0, white)" fillOpacity="0.8" id="Vector 55" />
        </svg>
      </div>
      
      {/* Frame101 Style Brightness Slider */}
      {showSlider && (
        <div className="absolute right-[96px] top-0 w-[402px] h-[76px] z-50" onClick={(e) => e.stopPropagation()}>
          {/* Dark background overlay */}
          <div className="absolute bg-[rgba(23,23,23,0.8)] h-[76px] left-0 top-0 w-[402px]" />
          
          {/* Slider component */}
          <BrightnessSliderIgt brightness={brightness} onBrightnessChange={onBrightnessChange} />
        </div>
      )}
    </div>
  );
}

function RevolveCenter32() {
  return (
    <div className="absolute left-7 size-8 top-3" data-name="RevolveCenter_32">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="RevolveCenter_32">
          <path d={svgPaths.p642e380} fill="var(--fill-0, #8C8C8C)" id="path" />
          <path d={svgPaths.p1b2b1700} fill="var(--fill-0, white)" fillOpacity="0.8" id="path_2" />
        </g>
      </svg>
    </div>
  );
}

function RevolveButton() {
  return (
    <div className="bg-neutral-900 h-[76px] overflow-clip relative rounded-[2px] shrink-0 w-[88px]" data-name="SideButton">
      <RevolveCenter32 />
      <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-[44.5px] not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-12 translate-x-[-50%]">
        <p className="leading-[20px] whitespace-pre">Revolve</p>
      </div>
    </div>
  );
}

function RotateIldHorizontal() {
  return (
    <div className="absolute left-7 size-8 top-3" data-name="RotateILDHorizontal">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="RotateILDHorizontal">
          <path d={svgPaths.p25d07070} fill="var(--fill-0, #8C8C8C)" id="path" />
          <path d={svgPaths.p5a9e00} fill="var(--fill-0, white)" fillOpacity="0.8" id="path_2" />
        </g>
      </svg>
    </div>
  );
}

function RotateIldButton() {
  return (
    <div className="bg-neutral-900 h-[76px] overflow-clip relative rounded-[2px] shrink-0 w-[88px]" data-name="SideButton">
      <RotateIldHorizontal />
      <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-[44.5px] not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-12 translate-x-[-50%]">
        <p className="leading-[20px] whitespace-pre">Rotate ILD</p>
      </div>
    </div>
  );
}

export default function FunctionalToolbar({ zoom, onZoomChange, brightness, onBrightnessChange }: FunctionalToolbarProps) {
  const [showBrightnessSlider, setShowBrightnessSlider] = useState(false);
  const [showZoomSlider, setShowZoomSlider] = useState(false);
  const toolbarRef = useRef<HTMLDivElement>(null);

  const handleToggleBrightnessSlider = () => {
    setShowBrightnessSlider(!showBrightnessSlider);
    if (showZoomSlider) setShowZoomSlider(false); // Close zoom slider if open
  };

  const handleToggleZoomSlider = () => {
    setShowZoomSlider(!showZoomSlider);
    if (showBrightnessSlider) setShowBrightnessSlider(false); // Close brightness slider if open
  };

  // Close sliders when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if ((showBrightnessSlider || showZoomSlider) && toolbarRef.current && !toolbarRef.current.contains(event.target as Node)) {
        setShowBrightnessSlider(false);
        setShowZoomSlider(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showBrightnessSlider, showZoomSlider]);

  return (
    <div ref={toolbarRef} className="content-stretch flex flex-col gap-0.5 items-start justify-start relative size-full">
      <DiameterButton />
      <DrawButton />
      <DotsButton />
      <AutoBordersButton />
      <RapidRevButton />
      <BordersButton />
      <ZoomButton 
        zoom={zoom} 
        onZoomChange={onZoomChange}
        showSlider={showZoomSlider}
        onToggleSlider={handleToggleZoomSlider}
      />
      <BrightnessButton 
        brightness={brightness} 
        onBrightnessChange={onBrightnessChange}
        showSlider={showBrightnessSlider}
        onToggleSlider={handleToggleBrightnessSlider}
      />
      <RevolveButton />
      <RotateIldButton />
    </div>
  );
}