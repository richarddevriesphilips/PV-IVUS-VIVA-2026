import React from "react";
import svgPaths from "../imports/svg-yb9quwk6b9";

interface XRayControlButtonsProps {
  showXRay: boolean;
  showVirtualRuler: boolean;
  onToggleXRay: () => void;
  onToggleVirtualRuler: () => void;
}

function EyeOffOutline() {
  return (
    <div className="relative shrink-0 size-6" data-name="EyeOffOutline">
      <div className="absolute bottom-[-5.833%] left-[-5.625%] right-[-5.625%] top-[-5.417%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 28 28"
        >
          <g
            clipPath="url(#clip0_1_11244)"
            filter="url(#filter0_d_1_11244)"
            id="EyeOffOutline"
          >
            <g filter="url(#filter1_d_1_11244)" id="path">
              <path
                d={svgPaths.p2c140d00}
                fill="var(--fill-0, white)"
                fillOpacity="0.8"
                shapeRendering="crispEdges"
              />
            </g>
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="28"
              id="filter0_d_1_11244"
              width="28"
              x="0"
              y="0"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                result="hardAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="1" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
              />
              <feBlend
                in2="BackgroundImageFix"
                mode="normal"
                result="effect1_dropShadow_1_11244"
              />
              <feBlend
                in="SourceGraphic"
                in2="effect1_dropShadow_1_11244"
                mode="normal"
                result="shape"
              />
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="24.7"
              id="filter1_d_1_11244"
              width="24.7"
              x="2.64999"
              y="2.70001"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                result="hardAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              />
              <feOffset dx="1" dy="1" />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
              />
              <feBlend
                in2="BackgroundImageFix"
                mode="normal"
                result="effect1_dropShadow_1_11244"
              />
              <feBlend
                in="SourceGraphic"
                in2="effect1_dropShadow_1_11244"
                mode="normal"
                result="shape"
              />
            </filter>
            <clipPath id="clip0_1_11244">
              <rect
                fill="white"
                height="24"
                transform="translate(2 2)"
                width="24"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function EyeOnOutline() {
  return (
    <div className="relative shrink-0 size-6" data-name="EyeOnOutline">
      <div className="absolute bottom-[-5.833%] left-[-5.625%] right-[-5.625%] top-[-5.417%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 28 28"
        >
          <g id="EyeOnOutline">
            <path
              d="M12 4.5C7.305 4.5 3.27 7.305 2 12c1.27 4.695 5.305 7.5 10 7.5s8.73-2.805 10-7.5c-1.27-4.695-5.305-7.5-10-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
              fill="white"
              fillOpacity="0.8"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

function HideShowButton({ showXRay, onToggle }: { showXRay: boolean; onToggle: () => void }) {
  return (
    <button
      className="bg-[rgba(89,89,89,0.55)] rounded-sm hover:bg-[rgba(89,89,89,0.75)] transition-colors cursor-pointer"
      data-name="Hide/Show X-Ray Button"
      style={{ pointerEvents: 'auto' }}
      onClick={() => {
        console.log('🔧 DEBUG: Eye icon button clicked');
        console.log('🔧 DEBUG: showXRay prop:', showXRay);
        onToggle();
      }}
      onMouseDown={() => console.log('🔧 DEBUG: Eye icon mouse down')}
      onMouseUp={() => console.log('🔧 DEBUG: Eye icon mouse up')}
      onMouseEnter={() => console.log('🔧 DEBUG: Eye icon mouse enter')}
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-3 py-2 relative">
          {showXRay ? <EyeOnOutline /> : <EyeOffOutline />}
        </div>
      </div>
    </button>
  );
}

function RulerIcon() {
  return (
    <div className="relative shrink-0 size-6" data-name="Icon">
      <div className="absolute bottom-[-2.083%] left-0 right-0 top-[-2.083%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 24 26"
        >
          <g
            clipPath="url(#clip0_1_11383)"
            filter="url(#filter0_d_1_11383)"
            id="Icon"
          >
            <g filter="url(#filter1_d_1_11383)" id="path">
              <path
                d={svgPaths.p3ea86a00}
                fill="var(--fill-0, white)"
                fillOpacity="0.8"
                shapeRendering="crispEdges"
              />
            </g>
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="28"
              id="filter0_d_1_11383"
              width="28"
              x="-2"
              y="-1"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                result="hardAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="1" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
              />
              <feBlend
                in2="BackgroundImageFix"
                mode="normal"
                result="effect1_dropShadow_1_11383"
              />
              <feBlend
                in="SourceGraphic"
                in2="effect1_dropShadow_1_11383"
                mode="normal"
                result="shape"
              />
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="23"
              id="filter1_d_1_11383"
              width="10"
              x="8"
              y="2.5"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                result="hardAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              />
              <feOffset dx="1" dy="1" />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
              />
              <feBlend
                in2="BackgroundImageFix"
                mode="normal"
                result="effect1_dropShadow_1_11383"
              />
              <feBlend
                in="SourceGraphic"
                in2="effect1_dropShadow_1_11383"
                mode="normal"
                result="shape"
              />
            </filter>
            <clipPath id="clip0_1_11383">
              <rect
                fill="white"
                height="24"
                transform="translate(0 1)"
                width="24"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function VirtualRulerButton({ showVirtualRuler, onToggle }: { showVirtualRuler: boolean; onToggle: () => void }) {
  return (
    <button
      className={`bg-[rgba(89,89,89,0.55)] rounded-sm hover:bg-[rgba(89,89,89,0.75)] transition-colors cursor-pointer ${
        showVirtualRuler ? 'ring-2 ring-blue-400' : ''
      }`}
      data-name="Virtual Ruler Button"
      style={{ pointerEvents: 'auto' }}
      onClick={() => {
        console.log('🔧 DEBUG: Virtual ruler button clicked');
        console.log('🔧 DEBUG: showVirtualRuler prop:', showVirtualRuler);
        onToggle();
      }}
      onMouseDown={() => console.log('🔧 DEBUG: Virtual ruler mouse down')}
      onMouseUp={() => console.log('🔧 DEBUG: Virtual ruler mouse up')}
      onMouseEnter={() => console.log('🔧 DEBUG: Virtual ruler mouse enter')}
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-3 py-2 relative">
          <RulerIcon />
        </div>
      </div>
    </button>
  );
}

export default function XRayControlButtons({ 
  showXRay, 
  showVirtualRuler, 
  onToggleXRay, 
  onToggleVirtualRuler 
}: XRayControlButtonsProps) {
  return (
    <div className="absolute bottom-4 left-4 flex gap-2 z-[9999] border-4 border-red-500" data-name="X-Ray Control Buttons" style={{ pointerEvents: 'auto' }}>
      <HideShowButton showXRay={showXRay} onToggle={onToggleXRay} />
      <VirtualRulerButton showVirtualRuler={showVirtualRuler} onToggle={onToggleVirtualRuler} />
    </div>
  );
}