import React from 'react';

interface DraggableScrubberProps {
  isDragging: boolean;
  isSegmentSelected?: boolean;
  isPlaying?: boolean;
}

export default function DraggableScrubber({ isDragging, isSegmentSelected = false, isPlaying = false }: DraggableScrubberProps) {
  return (
    <div className="cursor-pointer relative size-full" data-name="Scrubber">
      <div className="absolute bottom-0 left-[-10%] right-[-10%] top-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 167">
          <g id="Scrubber">
            {/* Vertical line - color changes based on segment selection */}
            <path d="M25 167H23V0H25V167Z" fill={isSegmentSelected ? "white" : "var(--fill-0, #FFDD19)"} id="Union" />
            
            {/* Circles - hidden when dragging or playing, color changes based on segment selection */}
            {!isDragging && !isPlaying && (
              <>
                <g filter="url(#filter0_d_2030_8517)" id="Ellipse 5">
                  <circle cx="24" cy="84" fill={isSegmentSelected ? "rgba(255,255,255,0.7)" : "var(--fill-0, #A28E18)"} r="20" />
                </g>
                <circle cx="24" cy="84" fill={isSegmentSelected ? "white" : "var(--fill-0, #FFDD19)"} id="Ellipse 6" r="18" />
              </>
            )}
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="48" id="filter0_d_2030_8517" width="48" x="0" y="62">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="2" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_2030_8517" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_2030_8517" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}