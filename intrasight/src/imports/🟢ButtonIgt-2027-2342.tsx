import React from 'react';
import svgPaths from "./svg-s91tsp7kdu";

function EyeOffOutline() {
  return (
    <div className="relative shrink-0 size-6" data-name="EyeOffOutline">
      <div className="absolute inset-[-5.42%_-5.62%_-5.83%_-5.63%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <g clipPath="url(#clip0_2004_9527)" filter="url(#filter0_d_2004_9527)" id="EyeOffOutline">
            <g filter="url(#filter1_d_2004_9527)" id="path">
              <path d={svgPaths.p2c140d00} fill="var(--fill-0, white)" fillOpacity="0.8" shapeRendering="crispEdges" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="28" id="filter0_d_2004_9527" width="28" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="1" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_2004_9527" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_2004_9527" mode="normal" result="shape" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="24.7" id="filter1_d_2004_9527" width="24.7" x="2.64999" y="2.70001">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="1" dy="1" />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_2004_9527" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_2004_9527" mode="normal" result="shape" />
            </filter>
            <clipPath id="clip0_2004_9527">
              <rect fill="white" height="24" transform="translate(2 2)" width="24" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}

interface ButtonIgtProps {
  onClick?: () => void;
  showXRay?: boolean;
}

export default function ButtonIgt({ onClick, showXRay = true }: ButtonIgtProps) {
  return (
    <div 
      className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex gap-2 items-center justify-center px-4 py-2 relative rounded-[2px] shrink-0 w-[214px] cursor-pointer hover:bg-[rgba(89,89,89,0.75)] transition-colors" 
      data-name="🟢 Button (IGT)"
      onClick={() => {
        console.log('🔧 DEBUG: ButtonIgt clicked');
        onClick?.();
      }}
    >
      <EyeOffOutline />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-nowrap">
        <p className="leading-[22px] whitespace-pre">{showXRay ? 'Hide X-Ray' : 'Show X-Ray'}</p>
      </div>
    </div>
  );
}