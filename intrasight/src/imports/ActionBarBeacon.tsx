import React from 'react';
import svgPaths from "./svg-0lrwv3ogt5";

function Icon() {
  return (
    <div className="relative shrink-0 size-6" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p9b98300} fill="var(--fill-0, #E8E8E8)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex gap-2 items-center justify-center px-4 py-2 relative rounded-[2px] shrink-0 w-[214px]" data-name="Button">
      <Icon />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-nowrap">
        <p className="leading-[22px] whitespace-pre">Annotate</p>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-6" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p28d83c80} fill="var(--fill-0, #E8E8E8)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex gap-2 items-center justify-center px-4 py-2 relative rounded-[2px] shrink-0 w-[214px]" data-name="Button">
      <Icon1 />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-nowrap">
        <p className="leading-[22px] whitespace-pre">Save Frame</p>
      </div>
    </div>
  );
}

function LeftButtons() {
  return (
    <div className="absolute content-stretch flex gap-4 items-start justify-start left-0 top-0" data-name="Left buttons">
      <Button />
      <Button1 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-6" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M18 23L12 17L6 23V1H18V23Z" fill="var(--fill-0, #E8E8E8)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function Button2({ 
  onClick, 
  text = "Bookmark" 
}: { 
  onClick?: () => void; 
  text?: string; 
}) {
  return (
    <div 
      className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex gap-2 items-center justify-center px-4 py-2 relative rounded-[2px] shrink-0 w-[214px] cursor-pointer hover:bg-[rgba(89,89,89,0.7)] transition-colors" 
      data-name="Button"
      onClick={onClick}
    >
      <Icon2 />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-nowrap">
        <p className="leading-[22px] whitespace-pre">{text}</p>
      </div>
    </div>
  );
}

function Icon3({ isPlaying = false }: { isPlaying?: boolean }) {
  // Play icon path
  const playPath = svgPaths.p1d906500;
  // Pause icon path - two vertical bars
  const pausePath = "M12 1C5.92 1 1 5.92 1 12C1 18.08 5.92 23 12 23C18.08 23 23 18.08 23 12C23 5.92 18.08 1 12 1ZM9 17H7V7H9V17ZM17 17H15V7H17V17Z";
  
  return (
    <div className="relative shrink-0 size-6" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={isPlaying ? pausePath : playPath} fill="var(--fill-0, #E8E8E8)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function Button3({ 
  onClick, 
  isPlaying = false 
}: { 
  onClick?: () => void; 
  isPlaying?: boolean; 
}) {
  return (
    <div 
      className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex gap-2 items-center justify-center px-4 py-2 relative rounded-[2px] shrink-0 w-[214px] cursor-pointer hover:bg-[rgba(89,89,89,0.7)] transition-colors" 
      data-name="Button"
      onClick={onClick}
    >
      <Icon3 isPlaying={isPlaying} />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-nowrap">
        <p className="leading-[22px] whitespace-pre">{isPlaying ? "Pause" : "Playback"}</p>
      </div>
    </div>
  );
}

function Frame39({ 
  onPlaybackClick, 
  isPlaying 
}: { 
  onPlaybackClick?: () => void;
  isPlaying?: boolean;
}) {
  return (
    <div className="content-stretch flex gap-4 items-start justify-start relative shrink-0">
      <Button3 onClick={onPlaybackClick} isPlaying={isPlaying} />
    </div>
  );
}

function Camera() {
  return (
    <div className="relative shrink-0 size-6" data-name="Camera">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Camera">
          <path d={svgPaths.p264ecd40} fill="var(--fill-0, white)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt({ onClick }: { onClick?: () => void }) {
  return (
    <div 
      className="bg-[#1474a4] box-border content-stretch flex gap-2 items-center justify-center px-4 py-2 relative rounded-[2px] shrink-0 w-[214px] cursor-pointer hover:bg-[#0d5a87] transition-colors" 
      data-name="🟢 Button (IGT)"
      onClick={onClick}
    >
      <Camera />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white">
        <p className="leading-[22px] whitespace-pre">Live</p>
      </div>
    </div>
  );
}

function RightButtons({ 
  onLiveClick, 
  onBookmarkClick, 
  bookmarkText,
  onPlaybackClick,
  isPlaying
}: { 
  onLiveClick?: () => void;
  onBookmarkClick?: () => void;
  bookmarkText?: string;
  onPlaybackClick?: () => void;
  isPlaying?: boolean;
}) {
  return (
    <div className="absolute content-stretch flex gap-4 items-start justify-start right-0 top-0" data-name="Right buttons">
      <Button2 onClick={onBookmarkClick} text={bookmarkText} />
      <Frame39 onPlaybackClick={onPlaybackClick} isPlaying={isPlaying} />
      <ButtonIgt onClick={onLiveClick} />
    </div>
  );
}

export default function ActionBarBeacon({ 
  onLiveClick, 
  onBookmarkClick, 
  bookmarkText = "Bookmark",
  onPlaybackClick,
  isPlaying = false
}: { 
  onLiveClick?: () => void;
  onBookmarkClick?: () => void;
  bookmarkText?: string;
  onPlaybackClick?: () => void;
  isPlaying?: boolean;
}) {
  return (
    <div className="relative size-full" data-name="Action-bar / Beacon">
      <LeftButtons />
      <RightButtons 
        onLiveClick={onLiveClick} 
        onBookmarkClick={onBookmarkClick}
        bookmarkText={bookmarkText}
        onPlaybackClick={onPlaybackClick}
        isPlaying={isPlaying}
      />
    </div>
  );
}