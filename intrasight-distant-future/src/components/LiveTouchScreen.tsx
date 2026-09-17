import React from 'react';
import svgPaths from '../imports/svg-w00dqxd84o';

interface LiveTouchScreenProps {
  onStartRecording: () => void;
  isSyncPlaybackEnabled: boolean;
}

function Graticules() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[402px] h-[402px] pointer-events-none">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 402 402">
        <g>
          <ellipse cx="200.34" cy="200.008" fill="#FF830F" rx="2.64026" ry="2.64463" />
          <rect fill="#FF830F" height="6.28926" stroke="#802726" width="2.32013" x="159.576" y="196.864" />
          <rect fill="#FF830F" height="6.28926" stroke="#802726" width="2.32013" x="119.972" y="196.864" />
          <rect fill="#FF830F" height="6.28926" stroke="#802726" width="2.32013" x="238.784" y="196.864" />
          <rect fill="#FF830F" height="6.28052" stroke="#802726" transform="rotate(-90 197.2 240.839)" width="2.32231" x="197.2" y="240.839" />
          <rect fill="#FF830F" height="6.28052" stroke="#802726" transform="rotate(-90 197.2 2.82231)" width="2.32231" x="197.2" y="2.82231" />
          <rect fill="#FF830F" height="6.28052" stroke="#802726" transform="rotate(-90 197.2 281.169)" width="2.32233" x="197.2" y="281.169" />
          <rect fill="#FF830F" height="6.28052" stroke="#802726" transform="rotate(-90 197.2 42.4917)" width="2.32232" x="197.2" y="42.4917" />
          <rect fill="#FF830F" height="6.28052" stroke="#802726" transform="rotate(-90 197.2 322.822)" width="2.32233" x="197.2" y="322.822" />
          <rect fill="#FF830F" height="6.28052" stroke="#802726" transform="rotate(-90 197.2 82.1612)" width="2.32231" x="197.2" y="82.1612" />
          <rect fill="#FF830F" height="6.28052" stroke="#802726" transform="rotate(-90 197.2 361.169)" width="2.32233" x="197.2" y="361.169" />
          <rect fill="#FF830F" height="6.28052" stroke="#802726" transform="rotate(-90 197.2 122.492)" width="2.32232" x="197.2" y="122.492" />
          <rect fill="#FF830F" height="6.28052" stroke="#802726" transform="rotate(-90 197.2 401.5)" width="2.32233" x="197.2" y="401.5" />
          <rect fill="#FF830F" height="6.28052" stroke="#802726" transform="rotate(-90 197.2 162.161)" width="2.32233" x="197.2" y="162.161" />
          <rect fill="#FF830F" height="6.28926" stroke="#802726" width="2.32013" x="279.048" y="196.864" />
          <rect fill="#FF830F" height="6.28926" stroke="#802726" width="2.32013" x="319.312" y="196.864" />
          <rect fill="#FF830F" height="6.28926" stroke="#802726" width="2.32013" x="358.916" y="196.864" />
          <rect fill="#FF830F" height="6.28926" stroke="#802726" width="2.32013" x="399.18" y="196.864" />
          <rect fill="#FF830F" height="6.28926" stroke="#802726" width="2.32013" x="79.7079" y="196.864" />
          <rect fill="#FF830F" height="6.28926" stroke="#802726" width="2.32013" x="40.104" y="196.864" />
          <rect fill="#FF830F" height="6.28926" stroke="#802726" width="2.32013" x="0.5" y="196.864" />
        </g>
      </svg>
    </div>
  );
}

export function LiveTouchScreen({ onStartRecording, isSyncPlaybackEnabled }: LiveTouchScreenProps) {
  return (
    <div className="bg-[#000000] relative w-[1280px] h-[720px]">
      {/* Left Sidebar - absolute positioning at left: 0 */}
      <div className="absolute left-0 top-0 w-[128px] h-[720px] bg-[#171717]">
        {/* Top 2 buttons - aligned to top */}
        <div className="absolute top-5 left-5 flex flex-col gap-5 w-[88px]">
          {/* Home button */}
          <div className="flex h-16 items-center justify-center px-[18px] py-4 rounded">
            <div className="size-8">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                <path d={svgPaths.p1c6ba100} fill="#E8E8E8" />
              </svg>
            </div>
          </div>
          {/* Snapshot button */}
          <div className="flex h-16 items-center justify-center px-[18px] py-4 rounded">
            <div className="size-8">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                <path d={svgPaths.pa1c6aa0} fill="#E8E8E8" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Bottom 5 buttons - aligned to bottom */}
        <div className="absolute bottom-5 left-5 flex flex-col gap-2 w-[88px]">
          {/* Save Frame */}
          <div className="bg-[#c4c4c4] flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 rounded">
            <div className="size-8">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                <path d={svgPaths.p2b832000} fill="#171717" />
              </svg>
            </div>
            <p className="font-['CentraleSans',_sans-serif] leading-[20px] text-[14px] text-center text-neutral-900 text-nowrap">Save Frame</p>
          </div>
          
          {/* Freeze */}
          <div className="bg-[#c4c4c4] flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 rounded">
            <div className="size-8">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                <path d={svgPaths.p1419d180} fill="#171717" />
              </svg>
            </div>
            <p className="font-['CentraleSans',_sans-serif] leading-[20px] text-[14px] text-center text-neutral-900 text-nowrap">Freeze</p>
          </div>
          
          {/* Ringdown */}
          <div className="bg-[#c4c4c4] flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 rounded">
            <div className="size-8">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                <path d={svgPaths.p48d3000} fill="#171717" />
              </svg>
            </div>
            <p className="font-['CentraleSans',_sans-serif] leading-[20px] text-[14px] text-center text-neutral-900 text-nowrap">Ringdown</p>
          </div>
          
          {/* Record */}
          <button
            onClick={onStartRecording}
            className="bg-[#1474a4] flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 rounded cursor-pointer hover:bg-[#1a85b5] transition-colors"
          >
            <div className="size-8">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                <path d={svgPaths.p13f52000} fill="white" />
              </svg>
            </div>
            <p className="font-['CentraleSans',_sans-serif] leading-[20px] text-[14px] text-center text-white text-nowrap">Record</p>
          </button>
        </div>
      </div>
      
      {/* IVUS video - 400x400px - centered */}
      <div className="absolute left-[440px] top-[160px] w-[400px] h-[400px]">
        <video
          className="w-full h-full object-cover rounded-lg"
          src="./assets/videos/IVUS-recording-export.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <Graticules />
      </div>
      
      {/* LIVE indicator with green dot and catheter name */}
      <div className="absolute right-[136px] top-[24px] flex flex-col gap-1">
        {/* LIVE text with green dot */}
        <div className="flex items-center gap-2">
          <div className="size-4">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <circle cx="8" cy="8" fill="#7FC242" r="8" />
            </svg>
          </div>
          <p className="font-['CentraleSans',_sans-serif] font-bold leading-[28px] text-[#7fc242] text-[20px]">
            LIVE
          </p>
        </div>
        {/* PV 0.35 text */}
        <div className="pl-6">
          <p className="font-['CentraleSans',_sans-serif] leading-[28px] text-[rgba(255,255,255,0.8)] text-[20px] whitespace-nowrap">
            PV 0.35
          </p>
        </div>
      </div>
      
      {/* Right side buttons - stacked vertically */}
      <div className="absolute right-[24px] top-[24px] flex flex-col gap-4 w-[88px]">
        {/* 60 */}
        <div className="bg-[rgba(89,89,89,0.55)] flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 rounded">
          <div className="size-8">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
              <path d={svgPaths.p30e8f500} fill="#E8E8E8" />
            </svg>
          </div>
          <p className="font-['CentraleSans',_sans-serif] leading-[20px] text-[#e8e8e8] text-[14px] text-center text-nowrap">60</p>
        </div>
        
        {/* 2 mm */}
        <div className="bg-[rgba(89,89,89,0.55)] flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 rounded">
          <div className="relative size-8">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
              <path d={svgPaths.p17c13900} fill="#D1D1D1" />
              <path d={svgPaths.p23655800} fill="#C4C4C4" />
            </svg>
          </div>
          <p className="font-['CentraleSans',_sans-serif] leading-[20px] text-[#e8e8e8] text-[14px] text-center text-nowrap">2 mm</p>
        </div>
        
        {/* Adaptive */}
        <div className="bg-[rgba(89,89,89,0.55)] flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 rounded">
          <div className="size-8">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
              <path d={svgPaths.p3907b300} fill="#E8E8E8" />
            </svg>
          </div>
          <p className="font-['CentraleSans',_sans-serif] leading-[20px] text-[#e8e8e8] text-[14px] text-center text-nowrap">Adaptive</p>
        </div>
        
        {/* Revolve */}
        <div className="bg-[rgba(89,89,89,0.55)] flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 rounded">
          <div className="size-8">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
              <path d={svgPaths.p642e380} fill="#E8E8E8" opacity="0.5" />
              <path d={svgPaths.p1b2b1700} fill="#E8E8E8" />
            </svg>
          </div>
          <p className="font-['CentraleSans',_sans-serif] leading-[20px] text-[#e8e8e8] text-[14px] text-center text-nowrap">Revolve</p>
        </div>
      </div>
      
      {/* ChromaFlo button - bottom right */}
      <div className="absolute right-[24px] bottom-[24px] w-[88px]">
        <div className="bg-[rgba(89,89,89,0.55)] flex flex-col gap-0.5 h-16 items-center justify-center pb-1 pt-1.5 px-1 rounded-sm relative">
          <div className="size-8">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
              <path d={svgPaths.p46b8d80} fill="#E8E8E8" />
            </svg>
          </div>
          <p className="font-['CentraleSans',_sans-serif] leading-[20px] text-[#d6d6d6] text-[14px] text-center text-nowrap">ChromaFlo</p>
          <div className="absolute right-[6px] top-[6px] size-2">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
              <circle cx="4" cy="4" fill="#595959" fillOpacity="0.55" r="4" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
