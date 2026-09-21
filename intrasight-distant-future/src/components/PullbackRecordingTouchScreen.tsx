import React, { useState, useRef, useEffect } from 'react';
import svgPaths from '../imports/svg-mdcql8b6lt';

import { RecordingILD } from './RecordingILD';
import { APP_CONSTANTS } from './constants/appConstants';
import { PositionUtils } from './utils/positionUtils';
import { BookmarkData } from './types';

interface PullbackRecordingTouchScreenProps {
  onStartAnalysis: () => void;
  bookmarks: BookmarkData[];
  onBookmarkToggle: (position: number, time: number, xrayPosition?: { x: number; y: number }) => void;
  getBookmarkButtonText: (position: number) => string;
  onXRayRecordingStart?: (currentRecordingTime: number) => void;
  onXRayRecordingStop?: (currentRecordingTime: number) => void;
}



function Graticules() {
  return (
    <div className="absolute inset-[10.83%_29.38%_33.61%_39.38%]" data-name="Graticules">
      <div className="absolute inset-[-0.25%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 402 402">
          <g id="Graticules">
            <ellipse cx="200.34" cy="200.008" fill="#FF830F" id="Ellipse 35" rx="2.64026" ry="2.64463" />
            <rect
              fill="#FF830F"
              height="6.28926"
              id="Rectangle 68"
              stroke="#802726"
              width="2.32013"
              x="159.576"
              y="196.864"
            />
            <rect
              fill="#FF830F"
              height="6.28926"
              id="Rectangle 69"
              stroke="#802726"
              width="2.32013"
              x="119.972"
              y="196.864"
            />
            <rect
              fill="#FF830F"
              height="6.28926"
              id="Rectangle 73"
              stroke="#802726"
              width="2.32013"
              x="238.784"
              y="196.864"
            />
            <rect
              fill="#FF830F"
              height="6.28052"
              id="Rectangle 78"
              stroke="#802726"
              transform="rotate(-90 197.2 240.839)"
              width="2.32231"
              x="197.2"
              y="240.839"
            />
            <rect
              fill="#FF830F"
              height="6.28052"
              id="Rectangle 83"
              stroke="#802726"
              transform="rotate(-90 197.2 2.82231)"
              width="2.32231"
              x="197.2"
              y="2.82231"
            />
            <rect
              fill="#FF830F"
              height="6.28052"
              id="Rectangle 79"
              stroke="#802726"
              transform="rotate(-90 197.2 281.169)"
              width="2.32233"
              x="197.2"
              y="281.169"
            />
            <rect
              fill="#FF830F"
              height="6.28052"
              id="Rectangle 84"
              stroke="#802726"
              transform="rotate(-90 197.2 42.4917)"
              width="2.32232"
              x="197.2"
              y="42.4917"
            />
            <rect
              fill="#FF830F"
              height="6.28052"
              id="Rectangle 80"
              stroke="#802726"
              transform="rotate(-90 197.2 322.822)"
              width="2.32233"
              x="197.2"
              y="322.822"
            />
            <rect
              fill="#FF830F"
              height="6.28052"
              id="Rectangle 85"
              stroke="#802726"
              transform="rotate(-90 197.2 82.1612)"
              width="2.32231"
              x="197.2"
              y="82.1612"
            />
            <rect
              fill="#FF830F"
              height="6.28052"
              id="Rectangle 81"
              stroke="#802726"
              transform="rotate(-90 197.2 361.169)"
              width="2.32233"
              x="197.2"
              y="361.169"
            />
            <rect
              fill="#FF830F"
              height="6.28052"
              id="Rectangle 86"
              stroke="#802726"
              transform="rotate(-90 197.2 122.492)"
              width="2.32232"
              x="197.2"
              y="122.492"
            />
            <rect
              fill="#FF830F"
              height="6.28052"
              id="Rectangle 82"
              stroke="#802726"
              transform="rotate(-90 197.2 401.5)"
              width="2.32233"
              x="197.2"
              y="401.5"
            />
            <rect
              fill="#FF830F"
              height="6.28052"
              id="Rectangle 87"
              stroke="#802726"
              transform="rotate(-90 197.2 162.161)"
              width="2.32233"
              x="197.2"
              y="162.161"
            />
            <rect
              fill="#FF830F"
              height="6.28926"
              id="Rectangle 74"
              stroke="#802726"
              width="2.32013"
              x="279.048"
              y="196.864"
            />
            <rect
              fill="#FF830F"
              height="6.28926"
              id="Rectangle 75"
              stroke="#802726"
              width="2.32013"
              x="319.312"
              y="196.864"
            />
            <rect
              fill="#FF830F"
              height="6.28926"
              id="Rectangle 76"
              stroke="#802726"
              width="2.32013"
              x="358.916"
              y="196.864"
            />
            <rect
              fill="#FF830F"
              height="6.28926"
              id="Rectangle 77"
              stroke="#802726"
              width="2.32013"
              x="399.18"
              y="196.864"
            />
            <rect
              fill="#FF830F"
              height="6.28926"
              id="Rectangle 70"
              stroke="#802726"
              width="2.32013"
              x="79.7079"
              y="196.864"
            />
            <rect
              fill="#FF830F"
              height="6.28926"
              id="Rectangle 71"
              stroke="#802726"
              width="2.32013"
              x="40.104"
              y="196.864"
            />
            <rect
              fill="#FF830F"
              height="6.28926"
              id="Rectangle 72"
              stroke="#802726"
              width="2.32013"
              x="0.5"
              y="196.864"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

function ActionBarVerticalIgt({ 
  onStop, 
  onBookmark, 
  bookmarkButtonText 
}: { 
  onStop: () => void;
  onBookmark: () => void;
  bookmarkButtonText: string;
}) {
  return (
    <div
      className="absolute bg-neutral-900 box-border content-stretch flex flex-col gap-6 h-[720px] items-center justify-start left-0 px-0 py-5 top-0 w-32"
      data-name="🟢 Action bar vertical (IGT)"
    >
      <div
        className="box-border content-stretch flex flex-col gap-5 items-start justify-start p-0 relative shrink-0"
        data-name="Quiet buttons"
      >
        <div
          className="box-border content-stretch flex flex-row gap-2 h-16 items-center justify-center px-[18px] py-4 relative rounded shrink-0 w-[88px] hover:bg-[rgba(89,89,89,0.55)] transition-colors cursor-pointer"
          data-name="Home"
        >
          <div className="relative shrink-0 size-8" data-name="Icon">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
              <g id="Icon">
                <path d={svgPaths.p1c6ba100} fill="#E8E8E8" id="path" />
              </g>
            </svg>
          </div>
        </div>
        
        <div
          className="box-border content-stretch flex flex-row gap-2 h-16 items-center justify-center px-[18px] py-4 relative rounded shrink-0 w-[88px] hover:bg-[rgba(89,89,89,0.55)] transition-colors cursor-pointer"
          data-name="Snapshot"
        >
          <div className="relative shrink-0 size-8" data-name="Icon">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
              <g id="Icon">
                <path d={svgPaths.pa1c6aa0} fill="#E8E8E8" id="path" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      
      <div
        className="absolute bottom-5 box-border content-stretch flex flex-col gap-5 items-center justify-end left-1/2 p-0 translate-x-[-50%]"
        data-name="Bottom group"
      >
        <button
          onClick={onBookmark}
          className="bg-[#c4c4c4] box-border content-stretch flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 relative rounded shrink-0 w-[88px] hover:bg-[#d4d4d4] transition-colors cursor-pointer"
          data-name="🟢 Button (IGT)"
        >
          <div className="relative shrink-0 size-8" data-name="Bookmark_32">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
              <g id="Bookmark_32">
                <path d="M24 2V30L16 23L8 30V2H24Z" fill="#171717" id="path" />
              </g>
            </svg>
          </div>
          <div
            className="font-['CentraleSans',_sans-serif] leading-[0] min-w-full not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-center text-neutral-900 text-nowrap"
            style={{ width: "min-content" }}
          >
            <p className="block leading-[20px] overflow-inherit">
              {bookmarkButtonText.replace('Bookmark', 'Mark').replace('Remove Bookmark', 'Remove').replace('Mark', 'Bookmark')}
            </p>
          </div>
        </button>
        
        <button
          onClick={onStop}
          className="bg-[#1474a4] box-border content-stretch flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 relative rounded shrink-0 w-[88px] hover:bg-[#1a85b5] transition-colors cursor-pointer"
          data-name="🟢 Button (IGT)"
        >
          <div className="relative shrink-0 size-8" data-name="RecordStop">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
              <g id="RecordStop">
                <path d={svgPaths.p697d600} fill="white" id="path" />
              </g>
            </svg>
          </div>
          <div
            className="font-['CentraleSans',_sans-serif] leading-[0] min-w-full not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#ffffff] text-[14px] text-center text-nowrap"
            style={{ width: "min-content" }}
          >
            <p className="block leading-[20px] overflow-inherit">
              Stop
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}

export function PullbackRecordingTouchScreen({ 
  onStartAnalysis, 
  bookmarks, 
  onBookmarkToggle, 
  getBookmarkButtonText,
  onXRayRecordingStart,
  onXRayRecordingStop
}: PullbackRecordingTouchScreenProps) {
  // Note: This component doesn't handle spacebar - X-ray recording is controlled by main screen
  const [recordingTime, setRecordingTime] = useState(0);
  const [isRecording, setIsRecording] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRecording) {
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 0.1);
      }, 100); // 10x smoother - updates every 100ms instead of 1000ms
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRecording]);

  const handleStopRecording = () => {
    setIsRecording(false);
    // Small delay before transitioning to analysis
    setTimeout(() => {
      onStartAnalysis();
    }, 500);
  };

  const handleBookmark = () => {
    // Calculate current position based on recording time
    const currentPosition = PositionUtils.timeToScrubberPosition(recordingTime);
    // For touch recording screen, calculate the position where the diamond would be on the catheter path
    // Use the same position calculation as the main analysis screen
    const indicatorPosition = PositionUtils.getMainScreenIndicatorPosition(recordingTime);
    // Add the base offsets to convert from ruler-relative to video-relative coordinates
    const videoX = APP_CONSTANTS.INDICATOR.BASE_OFFSET_X + indicatorPosition.x;
    const videoY = APP_CONSTANTS.INDICATOR.BASE_OFFSET_Y + indicatorPosition.y;
    console.log('Touch recording bookmark created at position:', { x: videoX, y: videoY }, 'at time:', recordingTime);
    onBookmarkToggle(currentPosition, recordingTime, { x: videoX, y: videoY });
  };

  // Get current position for bookmark button text
  const currentPosition = PositionUtils.timeToScrubberPosition(recordingTime);
  const bookmarkButtonText = getBookmarkButtonText(currentPosition);

  return (
    <div className="bg-[#000000] relative w-[1280px] h-[720px]" data-name="Pullback Recording - Touch Screen">
      {/* Recording ILD Track with Overlapping Pill */}
      <div className="absolute right-[24px] bottom-[24px]">
        <RecordingILD 
          recordingTime={recordingTime}
          maxDuration={APP_CONSTANTS.DURATION}
          width={1128}
          height={140}
          screenType="touch"
          bookmarks={bookmarks}
        />
      </div>
      
      {/* IVUS Display Area */}
      <div className="absolute left-[492px] top-[80px] w-[400px] h-[400px]" data-name="IVUS Display">
        <video
          className="w-full h-full object-cover rounded-lg"
          src="/intrasight-distant-future/assets/videos/IVUS-recording-export.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
      
      {/* Graticules Overlay */}
      <div className="absolute left-[592px] top-[180px] w-[200px] h-[200px]">
        <Graticules />
      </div>
      
      {/* Recording Complete Message */}
      {!isRecording && (
        <div className="absolute left-[290px] bottom-[180px] bg-[rgba(26,133,181,0.8)] h-[39px] rounded-[20px] px-6 flex items-center">
          <div className="text-white font-['CentraleSans',_sans-serif] text-[16px]">
            Recording Complete - Starting Analysis...
          </div>
        </div>
      )}
      
      {/* Action Bar */}
      <ActionBarVerticalIgt 
        onStop={handleStopRecording}
        onBookmark={handleBookmark}
        bookmarkButtonText={bookmarkButtonText}
      />
    </div>
  );
}