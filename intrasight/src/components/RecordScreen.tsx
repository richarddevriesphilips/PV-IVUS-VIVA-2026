import React, { useRef, useEffect, useState, useCallback, useMemo, memo, startTransition, useTransition } from 'react';
import NavigationBarIgt from '../imports/NavigationBarIgt';
import { useBookmarks } from '../contexts/BookmarkContext';
import NumberedBookmark from './NumberedBookmark';
// Use public assets for Electron app compatibility
const ivusVideo = '/intrasight/assets/videos/IVUS recording-export.mp4';
const xrayVideo = '/intrasight/assets/videos/postrecord.mov';
const tutorialGif = '/intrasight/assets/images/tutorial-guide.gif';
const ildBackgroundImage = '/intrasight/assets/images/a88a842f3a8fb7070c090488a99c78d4f568d185.png';

interface RecordScreenProps {
  onStopRecording: (actualDuration: number) => void;
  maxRecordingTime?: number;
}

// Memoized bookmark indicator component to prevent unnecessary re-renders
const BookmarkIndicator = memo(({ position, number }: { position: number; number: number }) => (
  <div
    style={{
      position: 'absolute',
      top: '155px',
      left: `${position}px`,
      width: '24px',
      height: '24px',
      zIndex: 25,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <NumberedBookmark number={number} />
  </div>
));

// Memoized ILD reveal overlay - isolated to prevent CSS transition resets
const ILDRevealOverlay = memo(({ recordingTime, maxRecordingTime }: { recordingTime: number; maxRecordingTime: number }) => {
  const percentComplete = Math.min((recordingTime / maxRecordingTime) * 100, 100);
  
  return (
    <div 
      className="absolute bg-[#0e0e0e] bottom-0 right-0 top-0 transition-all duration-1000 ease-linear"
      style={{ 
        left: `${percentComplete}%`,
        willChange: 'left', // Optimize animation performance
        transform: 'translateZ(0)' // Force GPU acceleration
      }}
    />
  );
}, (prevProps, nextProps) => {
  // Only re-render if recordingTime actually changed
  return prevProps.recordingTime === nextProps.recordingTime;
});

export default function RecordScreen({ onStopRecording }: RecordScreenProps) {
  const ivusVideoRef = useRef<HTMLVideoElement>(null);
  const xrayVideoRef = useRef<HTMLVideoElement>(null);
  const ildOverlayRef = useRef<HTMLDivElement>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const maxRecordingTime = 32; // 32 seconds max recording time
  const [showXRay, setShowXRay] = useState(false); // State to control X-ray visibility
  
  // Use ref to track recording time for animation (bypass React rendering)
  const recordingTimeRef = useRef(0);
  const recordingStartTimeRef = useRef<number>(Date.now());
  const preciseRecordingTimeRef = useRef(0); // Stores precise elapsed time for bookmarks
  
  // Bookmark functionality and X-ray timing
  const { 
    bookmarks, 
    addBookmark, 
    removeBookmark, 
    hasBookmarkAtTime, 
    getBookmarkAtTime,
    addXRayTimeRange
  } = useBookmarks();

  // Track X-ray press times
  const [xrayStartTime, setXRayStartTime] = useState<number | null>(null);

  // Auto-play both videos when component mounts - they stay in sync
  useEffect(() => {
    const ivusVideo = ivusVideoRef.current;
    const xrayVideo = xrayVideoRef.current;
    
    // Start IVUS video
    if (ivusVideo) {
      const playPromise = ivusVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn('IVUS video autoplay failed:', error);
        });
      }
    }
    
    // Start X-ray video (it will be masked by default)
    if (xrayVideo) {
      const playPromise = xrayVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn('X-ray video autoplay failed:', error);
        });
      }
    }
  }, []);

  // Spacebar event listeners for virtual footpedal (hold to show X-ray)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space' && !event.repeat) {
        event.preventDefault(); // Prevent page scroll
        
        // Use precise time for accurate X-ray timing
        const preciseTime = preciseRecordingTimeRef.current;
        
        // Batch state updates together for better performance
        setShowXRay(true);
        setXRayStartTime(preciseTime);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault(); // Prevent page scroll
        
        const preciseTime = preciseRecordingTimeRef.current;
        
        // Batch state updates together
        setShowXRay(false);
        if (xrayStartTime !== null) {
          // Use setTimeout to defer non-urgent update and prevent blocking
          setTimeout(() => {
            addXRayTimeRange(xrayStartTime, preciseTime);
          }, 0);
          setXRayStartTime(null);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown, { passive: false });
    document.addEventListener('keyup', handleKeyUp, { passive: false });
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [xrayStartTime, addXRayTimeRange]);

  // Use refs to access latest values without causing re-renders
  const xrayStartTimeRef = useRef(xrayStartTime);
  const addXRayTimeRangeRef = useRef(addXRayTimeRange);
  
  // Keep refs updated
  useEffect(() => {
    xrayStartTimeRef.current = xrayStartTime;
  }, [xrayStartTime]);
  
  useEffect(() => {
    addXRayTimeRangeRef.current = addXRayTimeRange;
  }, [addXRayTimeRange]);
  
  // Smooth ILD reveal animation using RAF - bypasses React rendering
  useEffect(() => {
    let rafId: number;
    recordingStartTimeRef.current = Date.now(); // Reset start time
    let animationTarget = 0;
    let currentPosition = 0;
    
    const animate = () => {
      if (ildOverlayRef.current) {
        // Smooth interpolation for sub-second animation
        const elapsed = (Date.now() - recordingStartTimeRef.current) / 1000; // Total elapsed time in seconds
        animationTarget = Math.min(elapsed, maxRecordingTime);
        
        // Store precise time for bookmark positioning
        preciseRecordingTimeRef.current = animationTarget;

        // Keep the X-ray Live/Ref quadrants in the parent app synced to this
        // exact recording position (same source video as the frame sequences).
        window.parent.postMessage({ type: "intrasight-recording-time", time: animationTarget }, "*");

        // Ease towards target for smooth movement
        currentPosition += (animationTarget - currentPosition) * 0.1;
        
        const percentComplete = Math.min((currentPosition / maxRecordingTime) * 100, 100);
        ildOverlayRef.current.style.left = `${percentComplete}%`;
      }
      
      if (recordingTimeRef.current < maxRecordingTime) {
        rafId = requestAnimationFrame(animate);
      }
    };
    
    rafId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [maxRecordingTime]);
  
  // Start recording timer - no changing dependencies to prevent interval reset
  useEffect(() => {
    const timer = setInterval(() => {
      setRecordingTime(prev => {
        const newTime = prev + 1;
        recordingTimeRef.current = newTime; // Update ref for RAF animation
        
        // Auto-stop recording at 32 seconds
        if (newTime >= maxRecordingTime) {
          // If X-ray is still active when recording stops, record the final range
          if (xrayStartTimeRef.current !== null) {
            addXRayTimeRangeRef.current(xrayStartTimeRef.current, prev);
            setXRayStartTime(null);
          }
          onStopRecording(maxRecordingTime);
          return prev; // Don't increment further
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [maxRecordingTime, onStopRecording]);

  const formatTime = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  // Memoize video duration to avoid recalculating on every render
  const [videoDuration, setVideoDuration] = useState(26);
  useEffect(() => {
    if (ivusVideoRef.current?.duration) {
      setVideoDuration(ivusVideoRef.current.duration);
    }
  }, []);
  
  // Cache bookmark count to avoid unnecessary recalculations
  const bookmarkCount = bookmarks.length;
  
  // Memoize bookmark positions to avoid recalculation on every render
  const bookmarkElements = useMemo(() => {
    // Pre-calculate constant to avoid repeated division
    const scaleFactor = 1868.5 / maxRecordingTime;
    
    return bookmarks.map(bookmark => {
      // Bookmarks store recording time (0-32s) during recording phase
      // Position using maxRecordingTime to align with ILD reveal (matches RED line)
      const bookmarkPosition = 1 + bookmark.time * scaleFactor - 35;
      return {
        id: bookmark.id,
        number: bookmark.number,
        position: bookmarkPosition,
        time: bookmark.time
      };
    });
  }, [bookmarkCount, maxRecordingTime, bookmarks]);

  const handleStopRecording = useCallback(() => {
    // Pass the current recording time when manually stopping
    onStopRecording(recordingTimeRef.current);
  }, [onStopRecording]);

  // Memoize whether there's a bookmark at current recording time
  const hasBookmarkAtCurrentTime = useMemo(() => {
    return hasBookmarkAtTime(recordingTime);
  }, [recordingTime, hasBookmarkAtTime]);

  const handleBookmarkToggle = useCallback(() => {
    // Use precise elapsed time for accurate bookmark positioning aligned with ILD reveal
    const preciseTime = preciseRecordingTimeRef.current;
    const existingBookmark = getBookmarkAtTime(preciseTime);
    
    // Use startTransition to mark this as a non-urgent update
    startTransition(() => {
      if (existingBookmark) {
        removeBookmark(existingBookmark.id);
      } else {
        addBookmark(preciseTime, `Bookmark at ${formatTime(Math.floor(preciseTime))}`, maxRecordingTime);
      }
    });
  }, [getBookmarkAtTime, removeBookmark, addBookmark, formatTime, maxRecordingTime]);

  return (
    <div className="bg-black relative w-[1920px] h-[1080px] overflow-hidden">
      {/* CSS Animation for Recording Pulse */}
      <style>{`
        @keyframes recordingPulse {
          0% {
            opacity: 1;
          }
          10% {
            opacity: 0.3;
          }
          40% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
      {/* Top Navigation Bar */}
      <div className="absolute top-0 left-0 w-full h-14 z-100">
        <NavigationBarIgt
          onScreenshotClick={() => {
            window.parent.postMessage({ type: "intrasight-screenshot", time: preciseRecordingTimeRef.current }, "*");
          }}
        />
      </div>

      {/* Main Content Area */}
      <div className="absolute w-full h-full">
        
        {/* X-ray Video - Aligned to match review screen (720x720, top: 90px, left: 16px) */}
        <div 
          className="absolute overflow-hidden"
          style={{
            top: '90px',
            left: '16px',
            width: '720px',
            height: '720px'
          }}
        >
          {/* X-ray Video - Always playing in background */}
          <div className="absolute inset-0 bg-[#111111] flex items-center justify-center">
            <video
              ref={xrayVideoRef}
              className="w-full h-full object-cover"
              muted
              loop
              playsInline
              style={{
                backgroundColor: '#111111',
                willChange: 'auto' // Prevent unnecessary GPU layer promotion
              }}
            >
              <source 
                src={xrayVideo} 
                type="video/mp4"
              />
              <source 
                src={xrayVideo} 
                type="video/quicktime"
              />
              Your browser does not support the video tag.
            </video>
          </div>
          
          {/* Mask overlay - shown when spacebar is NOT pressed */}
          <div 
            className="absolute inset-0 bg-black transition-opacity duration-100"
            style={{
              opacity: showXRay ? 0 : 1,
              pointerEvents: showXRay ? 'none' : 'auto',
              willChange: 'opacity' // Optimize opacity transitions
            }}
          >
            {/* Guide Text */}
            <div className="absolute left-[72px] top-[476px] font-['CentraleSans:Bold',_sans-serif] text-[#9dd3e3] text-[24px] leading-[28px] translate-y-[-100%]">
              Begin Fluoro to add X-ray imaging to the pullback
            </div>
            
            {/* Tutorial Guide GIF */}
            <div className="absolute left-[177px] top-[50px] w-[362px] h-[557px] flex items-center justify-center">
              <img src={tutorialGif} alt="Tutorial Guide" className="max-w-full max-h-full object-contain" />
            </div>
          </div>
        </div>

        {/* IVUS Recording Feed - Aligned to match review screen (720x720, top: 90px, left: 920px) */}
        <div 
          className="absolute overflow-hidden bg-[#0a0a0a]"
          style={{
            top: '90px',
            left: '920px',
            width: '720px',
            height: '720px'
          }}
        >
          {/* IVUS Video Display - centered within 720x720 container */}
          <video
            ref={ivusVideoRef}
            className="w-full h-full object-cover rounded-full"
            muted
            loop
            playsInline
            style={{
              backgroundColor: '#000000',
              willChange: 'auto' // Prevent unnecessary GPU layer promotion
            }}
          >
            <source 
              src={ivusVideo} 
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Bottom Recording Timeline Bar */}
      <div className="absolute bg-[#212121] h-[183px] left-[25px] top-[825px] w-[1870px]">
        {/* Timeline Background with IVUS imagery */}
        <div className="absolute inset-[2.13%_0.5px_2.13%_1px] overflow-clip bg-center bg-cover bg-no-repeat" 
             style={{ backgroundImage: `url(${ildBackgroundImage})` }}>
          
          {/* Dark overlay for unrecorded area - animated via RAF for smooth uninterrupted animation */}
          <div 
            ref={ildOverlayRef}
            className="absolute bg-[#0e0e0e] bottom-0 right-0 top-0"
            style={{ 
              left: '0%',
              willChange: 'left',
              transform: 'translateZ(0)'
            }}
          />
        </div>
        
        {/* Bookmark indicators on timeline - positioned at bottom of ILD */}
        {bookmarkElements.map(bookmark => (
          <BookmarkIndicator
            key={bookmark.id}
            position={bookmark.position}
            number={bookmark.number}
          />
        ))}
      </div>

      {/* Recording Indicator */}
      <div className="absolute bg-[rgba(194,35,31,0.7)] h-10 left-[46px] rounded-[20px] top-[951px] w-[97px]">
        {/* Recording dot */}
        <div className="absolute left-3 top-3 size-4">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <circle 
              cx="8" 
              cy="8" 
              fill="white" 
              r="8"
              style={{
                animation: 'recordingPulse 2s ease-in-out infinite'
              }}
            />
          </svg>
        </div>
        
        {/* Recording timer */}
        <div className="absolute left-[39px] top-[7px] h-[22px] w-[58px]">
          <div className="font-['CentraleSans:Book',_sans-serif] text-[#e8e8e8] text-[20px] leading-[28px]">
            {formatTime(recordingTime)}
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      {/* Bookmark */}
      <div 
        className="absolute bg-[rgba(89,89,89,0.55)] flex gap-2 items-center justify-center left-[1460px] px-4 py-2 rounded-[2px] top-[1024px] w-[214px] cursor-pointer hover:bg-[rgba(89,89,89,0.7)] transition-colors"
        onClick={handleBookmarkToggle}
      >
        <div className="size-6">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <path d="M18 23L12 17L6 23V1H18V23Z" fill="#E8E8E8" />
          </svg>
        </div>
        <div className="font-['CentraleSans:Book',_sans-serif] text-[#e8e8e8] text-[16px] leading-[22px]">
          {hasBookmarkAtCurrentTime ? "Remove Bookmark" : "Bookmark"}
        </div>
      </div>

      {/* Stop Recording Button */}
      <div 
        onClick={handleStopRecording}
        className="absolute bg-[#1474a4] box-border content-stretch flex gap-2 items-center justify-center px-4 py-2 right-4 rounded-[2px] top-[1024px] w-[214px] cursor-pointer hover:bg-[#1068a0] transition-colors shrink-0"
      >
        <div className="size-6">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <path d="M12 1C18.0751 1 23 5.92486 23 12C23 18.0751 18.0751 23 12 23C5.92486 23 1 18.0751 1 12C1 5.92486 5.92486 1 12 1ZM12 2C6.47714 2 2 6.47714 2 12C2 17.5229 6.47714 22 12 22C17.5229 22 22 17.5229 22 12C22 6.47714 17.5229 2 12 2ZM12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6Z" fill="white" />
          </svg>
        </div>
        <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-nowrap">
          <p className="leading-[22px] whitespace-pre text-white">Stop</p>
        </div>
      </div>
    </div>
  );
}