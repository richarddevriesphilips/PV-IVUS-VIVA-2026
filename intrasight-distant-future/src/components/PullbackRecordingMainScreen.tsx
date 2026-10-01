import React, { useState, useRef, useEffect } from 'react';
import svgPaths from '../imports/svg-fsqwxjwt5e';
import imgFootpedal from 'figma:asset/7f8fa0d7ab4274e2f13de8eb818eb7544728f7ea.png';

import { RecordingILD } from './RecordingILD';
import { APP_CONSTANTS } from './constants/appConstants';
import { PositionUtils } from './utils/positionUtils';
import { BookmarkData } from './types';

interface PullbackRecordingMainScreenProps {
  onStartAnalysis: (actualDuration: number) => void;
  bookmarks: BookmarkData[];
  onBookmarkToggle: (position: number, time: number, xrayPosition?: { x: number; y: number }) => void;
  getBookmarkButtonText: (position: number) => string;
  onXRayRecordingStart?: (currentRecordingTime: number) => void;
  onXRayRecordingStop?: (currentRecordingTime: number) => void;
  onXRayDurationChange?: (duration: number) => void;
  isSyncPlaybackEnabled?: boolean;
  xraySrc: string;
  ivusSrc: string;
}

function NavigationBarIgt({ onScreenshotClick }: { onScreenshotClick?: () => void }) {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return { time: `${String(hours).padStart(2, '0')}:${minutes}`, ampm };
  };

  const { time, ampm } = formatTime(currentDateTime);

  return (
    <div
      className="absolute box-border content-stretch flex flex-col items-start justify-start left-0 p-0 top-0 w-[1920px]"
      data-name="🟢 Navigation bar (IGT)"
    >
      <div
        className="box-border content-stretch flex flex-col items-center justify-start p-0 relative shadow-[0px_1px_6px_0px_rgba(0,0,0,0.2)] shrink-0 w-full"
        data-name="Template"
      >
        <div
          className="box-border content-stretch flex flex-row gap-2.5 h-14 items-center justify-start p-0 relative shrink-0 w-full"
          data-name="Top row"
        >
          <div className="basis-0 bg-[#383838] grow h-full min-h-px min-w-px shrink-0" data-name="Background" />
          
          <div
            className="absolute box-border content-stretch flex flex-row gap-12 h-12 items-center justify-start left-2 pl-2 pr-0 py-0 top-1/2 translate-y-[-50%]"
            data-name="Left"
          >
            <div
              className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0"
              data-name="Left"
            >
              <div
                className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-row gap-2 items-center justify-center p-[8px] relative rounded-sm shrink-0 w-10"
                data-name="Button"
              >
                <div className="relative shrink-0 size-6" data-name="DLS_Home_24">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                    <g id="DLS_Home_24">
                      <path d={svgPaths.p2df20600} fill="#D6D6D6" id="path" />
                    </g>
                  </svg>
                </div>
              </div>
              
              <div
                className="box-border content-stretch flex flex-col h-[15px] items-center justify-start px-2 py-0 relative shrink-0"
                data-name="wordmark"
              >
                <div className="h-[15px] relative shrink-0 w-[77px]" data-name="philips-wordmark-2">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77 15">
                    <g id="philips-wordmark-2">
                      <path d="M77 0H0V15H77V0Z" fill="#E8E8E8" id="pixelrounder" opacity="0" />
                      <path d={svgPaths.p25010500} fill="white" id="Shape" />
                    </g>
                  </svg>
                </div>
              </div>
              
              <div
                className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start px-2 py-0 relative shrink-0"
                data-name="solution name"
              >
                <div className="font-['CentraleSans',_sans-serif] leading-[0] not-italic relative shrink-0 text-[20px] text-[rgba(255,255,255,0.8)] text-left text-nowrap">
                  <p className="block leading-[28px] whitespace-pre">IVUS</p>
                </div>
              </div>
            </div>
            
            <div
              className="box-border content-stretch flex flex-row gap-6 h-6 items-center justify-center p-0 relative shrink-0"
              data-name="Patient info"
            >
              <div
                className="box-border content-stretch flex flex-row gap-3 items-center justify-start p-0 relative shrink-0"
                data-name="Patient"
              >
                <div className="relative shrink-0 size-8" data-name="DLS_PatientAcquisition_24">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                    <g id="DLS_PatientAcquisition_24">
                      <path d={svgPaths.p4381100} fill="#41C9FE" id="path" />
                    </g>
                  </svg>
                </div>
                <div
                  className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0"
                  data-name="Text container"
                >
                  <div className="font-['CentraleSans',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#41c9fe] text-[20px] text-left text-nowrap">
                    <p className="block leading-[28px] whitespace-pre">DOE, Jane</p>
                  </div>
                </div>
              </div>
              
              <div
                className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0"
                data-name="Info"
              >
                <div
                  className="box-border content-stretch flex flex-row font-['CentraleSans',_sans-serif] gap-2 items-start justify-start leading-[0] not-italic p-0 relative shrink-0 text-[20px] text-left text-nowrap"
                  data-name="Label"
                >
                  <div className="flex flex-col justify-center relative shrink-0 text-[rgba(214,214,214,0.65)]">
                    <p className="block leading-[28px] text-nowrap whitespace-pre">Patient ID</p>
                  </div>
                  <div className="flex flex-col justify-center relative shrink-0 text-[rgba(255,255,255,0.8)]">
                    <p className="block leading-[28px] text-nowrap whitespace-pre">234567</p>
                  </div>
                </div>
                
                <div
                  className="box-border content-stretch flex flex-row font-['CentraleSans',_sans-serif] gap-2 items-start justify-start leading-[0] not-italic p-0 relative shrink-0 text-[20px] text-left text-nowrap"
                  data-name="Label"
                >
                  <div className="flex flex-col justify-center relative shrink-0 text-[#8c8c8c]">
                    <p className="block leading-[28px] text-nowrap whitespace-pre">DOB</p>
                  </div>
                  <div className="flex flex-col justify-center relative shrink-0 text-[rgba(255,255,255,0.8)]">
                    <p className="block leading-[28px] text-nowrap whitespace-pre">15-Jan-1991 (33 y)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div
            className="absolute box-border content-stretch flex flex-row gap-2 h-12 items-center justify-end p-0 right-4 top-1/2 translate-y-[-50%]"
            data-name="Right"
          >
            <div
              className="box-border content-stretch flex flex-row gap-3 h-12 items-center justify-end p-0 relative shrink-0"
              data-name="Right side"
            >
              <div
                className="box-border content-stretch flex flex-row gap-5 items-center justify-end p-0 relative shrink-0"
                data-name="Date + Time + User"
              >
                <div className="flex flex-col font-['CentraleSans',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#d6d6d6] text-[20px] text-left text-nowrap">
                  <p className="block leading-[28px] whitespace-pre">{formatDate(currentDateTime)}</p>
                </div>
                <div
                  className="box-border content-stretch flex flex-row gap-1 items-center justify-start leading-[0] not-italic p-0 relative shrink-0 text-[#d6d6d6] text-[20px]"
                  data-name="Time"
                >
                  <div className="flex flex-col font-['CentraleSans',_sans-serif] justify-center relative shrink-0 text-left text-nowrap">
                    <p className="block leading-[28px] whitespace-pre">{time}</p>
                  </div>
                  <div className="flex flex-col font-['CentraleSans',_sans-serif] justify-center relative shrink-0 text-center w-10">
                    <p className="block leading-[28px]">{ampm}</p>
                  </div>
                </div>
              </div>
              
              <div
                className="box-border content-stretch flex flex-row gap-1 items-center justify-end p-0 relative shrink-0"
                data-name="Icons"
              >
                <div
                  className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-3 py-2 relative rounded-sm shrink-0 size-10 cursor-pointer hover:bg-[rgba(255,255,255,0.1)] transition-colors"
                  data-name="🟢 Button (IGT)"
                  onClick={onScreenshotClick}
                  title="Send screenshot to X-ray Ref"
                >
                  <div className="relative shrink-0 size-6" data-name="Icon">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                      <g id="Icon">
                        <path d={svgPaths.p32cbff80} fill="#D6D6D6" id="path" />
                      </g>
                    </svg>
                  </div>
                </div>
                
                <div
                  className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-3 py-2 relative rounded-sm shrink-0 size-10"
                  data-name="🟢 Button (IGT)"
                >
                  <div className="relative shrink-0 size-6" data-name="Icon">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                      <g id="Icon">
                        <path d={svgPaths.p3a6c9900} fill="#D6D6D6" id="path" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PullbackRecordingMainScreen({ 
  onStartAnalysis, 
  bookmarks, 
  onBookmarkToggle, 
  getBookmarkButtonText,
  onXRayRecordingStart,
  onXRayRecordingStop,
  onXRayDurationChange,
  isSyncPlaybackEnabled = true,
  xraySrc,
  ivusSrc
}: PullbackRecordingMainScreenProps) {
  const [recordingTime, setRecordingTime] = useState(0);
  const [isRecording, setIsRecording] = useState(true);
  const [isSpacebarPressed, setIsSpacebarPressed] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const xrayVideoRef = useRef<HTMLVideoElement>(null);
  // Keeps the keydown/keyup listeners below from having to re-subscribe on every
  // 100ms recordingTime tick (that churn could drop a keyup and stick the X-ray on).
  const recordingTimeRef = useRef(0);
  useEffect(() => {
    recordingTimeRef.current = recordingTime;
  }, [recordingTime]);
  
  // Current date/time state
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return { time: `${String(hours).padStart(2, '0')}:${minutes}`, ampm };
  };

  const { time, ampm } = formatTime(currentDateTime);

  useEffect(() => {
    if (isRecording) {
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => {
          const next = prev + 0.1;
          // Auto-stop once the fixed pullback duration is reached, matching near-future's behavior.
          if (next >= APP_CONSTANTS.DURATION) {
            handleStopRecording();
            return APP_CONSTANTS.DURATION;
          }
          return next;
        });
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

  // Sync X-ray video with recording time
  useEffect(() => {
    if (xrayVideoRef.current) {
      xrayVideoRef.current.currentTime = recordingTime;
    }
    // Broadcast recording time to parent for syncing Ref X-ray
    window.parent.postMessage({ type: "intrasight-recording-time", time: recordingTime }, "*");
  }, [recordingTime]);

  // Handle spacebar press/release - registered once (not re-subscribed per
  // recordingTime tick) so a keyup can never be dropped mid re-subscription,
  // which was leaving the X-ray video stuck visible/advancing after release.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.code === 'Space' || e.code === 'F13') && !e.repeat) {
        e.preventDefault();
        setIsSpacebarPressed(true);
        window.parent.postMessage({ type: "intrasight-fluoro", on: true }, "*");
        // Notify parent that X-ray recording started at this time
        onXRayRecordingStart?.(recordingTimeRef.current);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'F13') {
        e.preventDefault();
        setIsSpacebarPressed(false);
        window.parent.postMessage({ type: "intrasight-fluoro", on: false }, "*");
        // Notify parent that X-ray recording stopped at this time
        onXRayRecordingStop?.(recordingTimeRef.current);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [onXRayRecordingStart, onXRayRecordingStop]);

  const handleStopRecording = () => {
    // Guard against double-stop (auto-stop firing right before/after a manual click).
    if (!isRecording) return;
    setIsRecording(false);
    const actualDuration = Math.min(recordingTimeRef.current, APP_CONSTANTS.DURATION);
    // Small delay before transitioning to analysis
    setTimeout(() => {
      onStartAnalysis(actualDuration);
    }, 500);
  };

  const handleBookmark = () => {
    // Calculate current position based on recording time
    const currentPosition = PositionUtils.timeToScrubberPosition(recordingTime);
    // For recording screen, calculate the position where the diamond would be on the catheter path
    // Use the same position calculation as the main analysis screen
    const indicatorPosition = PositionUtils.getMainScreenIndicatorPosition(recordingTime);
    // Add the base offsets to convert from ruler-relative to video-relative coordinates
    const videoX = APP_CONSTANTS.INDICATOR.BASE_OFFSET_X + indicatorPosition.x;
    const videoY = APP_CONSTANTS.INDICATOR.BASE_OFFSET_Y + indicatorPosition.y;
    console.log('Recording bookmark created at position:', { x: videoX, y: videoY }, 'at time:', recordingTime);
    onBookmarkToggle(currentPosition, recordingTime, { x: videoX, y: videoY });
  };

  // Get current position for bookmark button text
  const currentPosition = PositionUtils.timeToScrubberPosition(recordingTime);
  const bookmarkButtonText = getBookmarkButtonText(currentPosition);

  return (
    <div 
      className="bg-[#000000] relative overflow-hidden" 
      style={{ width: '1920px', height: '1080px' }}
      data-name="Pullback Recording - Main Screen"
    >
      {/* Navigation Bar - Top */}
      <NavigationBarIgt onScreenshotClick={() => window.parent.postMessage({ type: "intrasight-screenshot", time: recordingTimeRef.current }, "*")} />
      
      {/* Left Half - Tutorial and X-ray Video - Only show when sync playback is enabled */}
      {isSyncPlaybackEnabled && (
        <div 
          className="absolute bg-[#000000] overflow-hidden" 
          style={{ left: '24px', top: '72px', width: '820px', height: '740px' }}
        >
        {/* Tutorial Panel - Default View */}
        <div 
          className={`absolute transition-opacity duration-200 ${
            isSpacebarPressed ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{ left: '0px', top: '0px', width: '820px', height: '740px' }}
        >
          <div 
            className="flex items-center justify-center"
            style={{ width: '820px', height: '740px' }}
          >
            <div className="flex flex-col items-start">
              <div className="mb-6">
                <img
                  src={imgFootpedal}
                  alt="Footpedal"
                  style={{ width: '220px', height: 'auto' }}
                  className="object-contain"
                  onError={(e) => console.error('Image failed to load:', e)}
                />
              </div>
              <div 
                className="font-['CentraleSans:Bold',_sans-serif] text-[#9dd3e3]"
                style={{ fontSize: '24px', lineHeight: '28px', width: '400px', fontWeight: 700 }}
              >
                Begin Fluoro to add X-ray imaging to the pullback
              </div>
            </div>
          </div>
        </div>

        {/* X-ray Video - Hidden by default, shown when spacebar pressed */}
        <div 
          className={`absolute transition-opacity duration-200 ${
            isSpacebarPressed ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{ left: '0px', top: '0px', width: '820px', height: '740px' }}
        >
          <video
            ref={xrayVideoRef}
            className="object-cover"
            style={{ width: '820px', height: '740px' }}
            src={xraySrc}
            onLoadedMetadata={(event) => onXRayDurationChange?.(event.currentTarget.duration)}
            muted
            playsInline
            preload="auto"
          />
        </div>
        </div>
      )}

      {/* IVUS Display - Centered when sync is off, right side when sync is on */}
      <div 
        className="absolute bg-[#000000] overflow-hidden flex items-center justify-center transition-all" 
        style={{ 
          left: isSyncPlaybackEnabled ? '868px' : '50%', 
          transform: isSyncPlaybackEnabled ? 'none' : 'translateX(-50%)',
          top: '72px', 
          width: '1028px', 
          height: '740px' 
        }}
      >
        <video
          key={ivusSrc}
          className="object-cover rounded-full"
          style={{ width: '500px', height: '500px' }}
          src={ivusSrc}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* Bottom Section - Recording ILD spanning full width */}
      <div 
        className="absolute bg-[#000000]"
        style={{ left: '0px', bottom: '0px', width: '1920px', height: '245px' }}
      >
        {/* Recording ILD Track - Full Width */}
        <div 
          className="absolute"
          style={{ left: '25px', top: '4px', width: '1870px', height: '183px' }}
        >
          <RecordingILD 
            recordingTime={recordingTime}
            maxDuration={APP_CONSTANTS.DURATION}
            width={1870}
            height={183}
            screenType="main"
            bookmarks={bookmarks}
          />
        </div>
        
        {/* Recording Complete Message */}
        {!isRecording && (
          <div 
            className="absolute bg-[rgba(26,133,181,0.8)] rounded-[20px] px-6 flex items-center z-30"
            style={{ left: '860px', top: '14px', height: '40px' }}
          >
            <div className="text-white font-['CentraleSans',_sans-serif]" style={{ fontSize: '16px' }}>
              Recording Complete - Starting Analysis...
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons - same absolute left-column layout as the Live screen for consistency */}
      <button
        onClick={handleBookmark}
        className="absolute left-[1460px] top-[1024px] bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-row gap-2 items-center justify-center px-4 py-2 rounded-sm w-[214px] h-10 hover:bg-[rgba(109,109,109,0.65)] transition-colors cursor-pointer"
        data-name="Bookmark Button"
      >
        <div className="relative shrink-0 size-6" data-name="Bookmark">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <g id="Bookmark">
              <path d="M18 23L12 17L6 23V1H18V23Z" fill="#E8E8E8" id="path" />
            </g>
          </svg>
        </div>
        <div className="font-['CentraleSans',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-left text-nowrap">
          <p className="block leading-[22px] whitespace-pre">{bookmarkButtonText}</p>
        </div>
      </button>

      <button
        onClick={handleStopRecording}
        disabled={!isRecording}
        className="absolute left-[1690px] top-[1024px] bg-[#1474a4] box-border content-stretch flex flex-row gap-2 items-center justify-center px-4 py-2 rounded-sm w-[214px] h-10 hover:bg-[#1a85b5] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
        data-name="Stop Button"
      >
        <div className="relative shrink-0 size-6" data-name="RecordStop">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <g id="RecordStop">
              <circle cx="12" cy="12" r="10" fill="white" />
              <rect x="8" y="8" width="8" height="8" fill="#1474a4" />
            </g>
          </svg>
        </div>
        <div className="font-['CentraleSans',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap">
          <p className="block leading-[22px] whitespace-pre">Stop</p>
        </div>
      </button>

    </div>
  );
}