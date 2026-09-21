import React from 'react';
import imgImage121 from "figma:asset/a88a842f3a8fb7070c090488a99c78d4f568d185.png";
import { BookmarkData } from './types';
import { APP_CONSTANTS } from './constants/appConstants';
import { PositionUtils } from './utils/positionUtils';

interface RecordingILDProps {
  recordingTime: number;
  maxDuration?: number;
  width?: number;
  height?: number;
  screenType?: 'main' | 'touch';
  bookmarks?: BookmarkData[];
}

function Frame40({ revealPercentage }: { revealPercentage: number }) {
  return (
    <div className="absolute inset-0 overflow-clip">
      <div
        className="absolute bg-center bg-cover bg-no-repeat inset-0 transition-all duration-75 ease-linear"
        data-name="image 121"
        style={{ 
          backgroundImage: `url('${imgImage121}')`,
          clipPath: `inset(0 ${100 - revealPercentage}% 0 0)`
        }}
      />
      <div 
        className="absolute bg-[#0e0e0e] inset-0 transition-all duration-75 ease-linear"
        style={{
          clipPath: `inset(0 0 0 ${revealPercentage}%)`
        }}
      />
    </div>
  );
}

function LightRecordingIndicator() {
  return (
    <div className="absolute left-3 size-4 top-3 animate-pulse" data-name="Light Recording indicator">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Light Recording indicator">
          <circle cx="8" cy="8" fill="white" id="Ellipse 38" r="8" />
        </g>
      </svg>
    </div>
  );
}

function LightRecordingTimer({ recordingTime }: { recordingTime: number }) {
  const minutes = Math.floor(recordingTime / 60);
  const seconds = Math.floor(recordingTime % 60);
  const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="absolute h-[22px] left-[39px] top-[7px] w-[58px]" data-name="Light recording timer">
      <div className="absolute bottom-[-27.27%] font-['CentraleSans',_sans-serif] leading-[0] left-0 not-italic right-[-19.36%] text-[#e8e8e8] text-[20px] text-left top-0">
        <p className="block leading-[28px]">{timeString}</p>
      </div>
    </div>
  );
}



export function RecordingILD({ 
  recordingTime, 
  maxDuration = APP_CONSTANTS.DURATION, 
  width = 1128, 
  height = 140,
  screenType = 'touch',
  bookmarks = []
}: RecordingILDProps) {
  // Calculate reveal percentage based on recording time
  const revealPercentage = Math.min((recordingTime / maxDuration) * 100, 100);
  
  // For main screen: span full width with minimal borders
  // For touch screen: keep original behavior
  const isMainScreen = screenType === 'main';
  
  const containerWidth = width;
  const containerHeight = height;
  
  // Main screen spans full width, touch screen has margins
  const trackPadding = isMainScreen ? 4 : 70;
  const innerTrackWidth = width - (trackPadding * 2);
  const innerTrackHeight = height - 8;
  const innerTrackLeft = trackPadding;
  const innerTrackTop = 4;

  // Convert main screen bookmark positions to recording ILD coordinates
  const convertBookmarkPosition = (bookmarkPosition: number) => {
    // Convert from main screen ILD coordinates to recording ILD coordinates
    const { ILD_LEFT_BOUNDARY, ILD_USABLE_WIDTH } = APP_CONSTANTS.MAIN_SCREEN;
    
    // Calculate percentage position within the main screen ILD
    const percentage = Math.max(0, Math.min(1, (bookmarkPosition - ILD_LEFT_BOUNDARY) / ILD_USABLE_WIDTH));
    
    // Convert to recording ILD position
    return innerTrackLeft + (percentage * innerTrackWidth);
  };
  
  return (
    <div 
      className="relative bg-[#212121]"
      style={{ width: `${containerWidth}px`, height: `${containerHeight}px` }}
      data-name="Recording ILD with Overlapping Pill"
    >
      {/* Inner ILD Track Container with border */}
      <div 
        className="absolute bg-[#0e0e0e] border-2 border-[#212121]" 
        style={{
          width: `${innerTrackWidth}px`,
          height: `${innerTrackHeight}px`,
          left: `${innerTrackLeft}px`,
          top: `${innerTrackTop}px`
        }}
      >
        <Frame40 revealPercentage={revealPercentage} />
      </div>
      
      {/* Bookmarks - styled like analysis screen bookmarks */}
      {bookmarks.map((bookmark, index) => {
        const bookmarkX = convertBookmarkPosition(bookmark.position);
        
        // Only show bookmarks that are within the current recording timeline
        if (bookmark.time <= recordingTime) {
          return (
            <div
              key={bookmark.id}
              className="absolute size-8 z-20 pointer-events-none"
              style={{
                left: `${bookmarkX - 16}px`, // Center the bookmark (32px width / 2)
                top: `${innerTrackTop + innerTrackHeight - 36}px`, // Position at bottom of track like analysis screen
              }}
              data-name={`Bookmark ${bookmark.id}`}
            >
              {/* Use same bookmark styling as analysis screen */}
              <div className="absolute left-1 size-6 top-[-1px]">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 24 24"
                >
                  <g>
                    <path
                      d="M18 23L12 17L6 23V1H18V23Z"
                      fill="#FF9F19"
                    />
                  </g>
                </svg>
              </div>
              <div className="absolute font-['CentraleSans',_sans-serif] font-bold leading-[0] left-4 not-italic text-[#000000] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">
                <p className="block leading-[18px] whitespace-pre">{index + 1}</p>
              </div>
            </div>
          );
        }
        return null;
      })}

      {/* Recording Pill - positioned to match Figma */}
      <div
        className="absolute bg-[rgba(194,35,31,0.7)] h-[39px] rounded-[20px] w-[97px] z-30"
        style={{
          left: `${innerTrackLeft + 8}px`,
          top: `${containerHeight - 49}px` // Position near bottom with 10px margin
        }}
        data-name="Recording Pill"
      >
        <LightRecordingIndicator />
        <LightRecordingTimer recordingTime={recordingTime} />
      </div>
    </div>
  );
}