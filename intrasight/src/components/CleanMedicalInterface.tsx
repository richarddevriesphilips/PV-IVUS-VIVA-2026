import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import NavigationBarIgt from "../imports/NavigationBarIgt";
import ActionBarBeacon from "../imports/ActionBarBeacon";
import SynchronizedFrame99 from "./SynchronizedFrame99";
import SegmentManager from "./SegmentManager";
import SegmentInputPanel from "./SegmentInputPanel";
import VirtualRuler from "../imports/VirtualRuler-2024-217";
import FunctionalToolbar from "./FunctionalToolbar";
import NumberedBookmark from "./NumberedBookmark";
import { useBookmarks } from "../contexts/BookmarkContext";
import { calculateSegmentPath, generateSegmentPathPoints, pointsToSVGPath } from "../utils/xrayPositionMapping";
// Use public assets for Electron app compatibility
const ivusVideo = '/intrasight/assets/videos/IVUS recording-export.mp4';
const xrayVideo = '/intrasight/assets/videos/postrecord.mov';

export default function CleanMedicalInterface({ onGoToLive, recordingDuration }: { onGoToLive?: () => void; recordingDuration: number }) {
  
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [brightness, setBrightness] = useState(100); // Changed range: 0-100%
  const [videoDuration, setVideoDuration] = useState(recordingDuration); // Use actual recording duration
  const [isDragging, setIsDragging] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  const timelineDuration = 32;
  
  // New state for missing features
  const [showXRay, setShowXRay] = useState(true);
  const [showVirtualRuler, setShowVirtualRuler] = useState(false); // Hidden by default
  const [showXRayBookmarks, setShowXRayBookmarks] = useState(true); // Show bookmarks on X-ray by default
  
  // Bookmark context menu and editing states
  const [bookmarkContextMenu, setBookmarkContextMenu] = useState<{ x: number; y: number; bookmarkId: string } | null>(null);
  const [timelineBookmarkMenu, setTimelineBookmarkMenu] = useState<{ x: number; y: number; bookmarkId: string } | null>(null);
  const [hiddenBookmarks, setHiddenBookmarks] = useState<Set<string>>(new Set());
  const [editingBookmark, setEditingBookmark] = useState<string | null>(null);
  const [isDraggingBookmark, setIsDraggingBookmark] = useState(false);
  const [draggedBookmarkPosition, setDraggedBookmarkPosition] = useState<{ x: number; y: number } | null>(null);
  const [updatedBookmarkPositions, setUpdatedBookmarkPositions] = useState<Map<string, { x: number; y: number }>>(new Map());
  
  // Use the new bookmark hook and X-ray timing
  const { 
    bookmarks, 
    addBookmark, 
    removeBookmark, 
    hasBookmarkAtTime, 
    getBookmarkAtTime,
    isXRayActiveAtTime,
    ensureBookmarkPositions
  } = useBookmarks();
  
  // Check if X-ray was recorded for current time
  // Note: videoDuration now equals the actual recording time, so no conversion needed
  const hasXRayForCurrentTime = isXRayActiveAtTime(currentTime);
  
  // Calculate bookmark positions on mount (for bookmarks created during recording)
  useEffect(() => {
    ensureBookmarkPositions(videoDuration);
  }, [ensureBookmarkPositions, videoDuration]);
  
  // Segment management state
  const [segments, setSegments] = useState<Array<{
    id: string;
    label: 'A' | 'B' | 'C';
    startTime: number;
    endTime: number;
    startPosition: number;
    width: number;
    isConfirmed: boolean;
    isEditing: boolean;
    mlaTime?: number; // MLA (Minimal Lumen Area) time position
  }>>([]);
  const [editingSegmentId, setEditingSegmentId] = useState<string | null>(null);
  
  // Selection state - tracks what is currently selected (scrubber or specific segment)
  const [selectedElement, setSelectedElement] = useState<'scrubber' | string | null>('scrubber');
  
  // Handle time change from scrubber drag - real-time updates
  const handleTimeChange = useCallback((newTime: number) => {
    const clampedTime = Math.max(0, Math.min(videoDuration, newTime));
    setCurrentTime(clampedTime);
    
    // Real-time video seeking during drag
    if (xrayVideoRef.current) {
      xrayVideoRef.current.currentTime = clampedTime;
    }
    if (ivusVideoRef.current) {
      ivusVideoRef.current.currentTime = clampedTime;
    }
  }, [videoDuration]);
  
  // Handle scrubber selection - sets scrubber as active element
  const handleScrubberSelect = useCallback(() => {
    setSelectedElement('scrubber');
  }, []);
  
  // Video refs for synchronized playback
  const xrayVideoRef = useRef<HTMLVideoElement>(null);
  const ivusVideoRef = useRef<HTMLVideoElement>(null);
  const distalVideoRef = useRef<HTMLVideoElement>(null);
  const proximalVideoRef = useRef<HTMLVideoElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // Segment management functions
  const getNextLabel = (): 'A' | 'B' | 'C' | null => {
    const usedLabels = new Set(segments.map(s => s.label));
    if (!usedLabels.has('A')) return 'A';
    if (!usedLabels.has('B')) return 'B';
    if (!usedLabels.has('C')) return 'C';
    return null;
  };
  
  const timeToPosition = (time: number): number => {
    return 70 + (time / timelineDuration) * 1400; // 70px offset, 1400px usable width
  };
  
  const addSegment = () => {
    const nextLabel = getNextLabel();
    if (!nextLabel || segments.length >= 3) return;

    const segmentDuration = 2; // Default 2-second segment
    let startTime = Math.max(0, currentTime - segmentDuration / 2);
    let endTime = Math.min(videoDuration, startTime + segmentDuration);
    
    // Snap to nearest bookmarks
    if (bookmarks.length > 0) {
      // Find nearest bookmark to the left of or at startTime
      const leftBookmarks = bookmarks.filter(b => b.time <= startTime);
      if (leftBookmarks.length > 0) {
        // Find the closest one
        const nearestLeft = leftBookmarks.reduce((closest, bookmark) => 
          Math.abs(bookmark.time - startTime) < Math.abs(closest.time - startTime) ? bookmark : closest
        );
        startTime = nearestLeft.time;
      }
      
      // Find nearest bookmark to the right of or at endTime
      const rightBookmarks = bookmarks.filter(b => b.time >= endTime);
      if (rightBookmarks.length > 0) {
        // Find the closest one
        const nearestRight = rightBookmarks.reduce((closest, bookmark) => 
          Math.abs(bookmark.time - endTime) < Math.abs(closest.time - endTime) ? bookmark : closest
        );
        endTime = nearestRight.time;
      }
      
      // If no bookmarks found in expected directions, try finding nearest bookmarks on both sides
      if (leftBookmarks.length === 0 && rightBookmarks.length === 0) {
        // Find the two nearest bookmarks around currentTime
        const sortedBookmarks = [...bookmarks].sort((a, b) => a.time - b.time);
        
        // Find bookmarks before and after currentTime
        let leftBookmark = null;
        let rightBookmark = null;
        
        for (let i = 0; i < sortedBookmarks.length; i++) {
          if (sortedBookmarks[i].time <= currentTime) {
            leftBookmark = sortedBookmarks[i];
          }
          if (sortedBookmarks[i].time >= currentTime && rightBookmark === null) {
            rightBookmark = sortedBookmarks[i];
          }
        }
        
        if (leftBookmark) startTime = leftBookmark.time;
        if (rightBookmark) endTime = rightBookmark.time;
      }
      
      // Ensure valid segment (startTime < endTime)
      if (startTime >= endTime) {
        // Fallback to default behavior if snapping results in invalid segment
        startTime = Math.max(0, currentTime - segmentDuration / 2);
        endTime = Math.min(videoDuration, startTime + segmentDuration);
      }
    }
    
    const startPosition = timeToPosition(startTime);
    const width = ((endTime - startTime) / timelineDuration) * 1400;

    const newSegment = {
      id: `segment-${Date.now()}`,
      label: nextLabel,
      startTime,
      endTime,
      startPosition,
      width,
      isConfirmed: false,
      isEditing: true,
      mlaTime: startTime + (endTime - startTime) / 2 // Initialize MLA to segment center
    };

    setSegments(prev => [...prev, newSegment]);
    setEditingSegmentId(newSegment.id);
    setSelectedElement(newSegment.id); // Select the new segment to show dual frame view
  };
  
  const confirmSegment = (segmentId: string) => {
    setSegments(prev => prev.map(segment =>
      segment.id === segmentId
        ? { ...segment, isConfirmed: true, isEditing: false }
        : segment
    ));
    setEditingSegmentId(null);
    window.parent.postMessage({ type: "intrasight-segment-confirmed", segment: { id: segmentId } }, "*");
  };
  
  const cancelSegment = (segmentId: string) => {
    setSegments(prev => prev.filter(segment => segment.id !== segmentId || segment.isConfirmed));
    setEditingSegmentId(null);
  };
  
  const deleteSegment = (segmentId: string) => {
    setSegments(prev => prev.filter(segment => segment.id !== segmentId));
    setEditingSegmentId(null);
  };

  const handleSegmentLengthChange = (segmentId: string, newLength: number) => {
    setSegments(prev => prev.map(segment => {
      if (segment.id === segmentId) {
        // Update the segment's endTime based on the new length
        // Assuming 1 second = 1 cm for IVUS pullback
        const newEndTime = Math.min(videoDuration, segment.startTime + newLength);
        
        // Recalculate width and position to match the new length
        const startPosition = timeToPosition(segment.startTime);
        const width = ((newEndTime - segment.startTime) / timelineDuration) * 1400;
        
        return { 
          ...segment, 
          endTime: newEndTime,
          startPosition,
          width
        };
      }
      return segment;
    }));
  };
  
  const editSegment = (segmentId: string) => {
    setSegments(prev => prev.map(segment =>
      segment.id === segmentId
        ? { ...segment, isEditing: true }
        : segment
    ));
    setEditingSegmentId(segmentId);
    setSelectedElement(segmentId); // Select the segment being edited
  };
  
  // Handle segment selection - for clicking on confirmed segments
  const handleSegmentSelect = (segmentId: string) => {
    setSelectedElement(segmentId);
  };

  // Update segment times and recalculate positions
  const updateSegment = (segmentId: string, startTime: number, endTime: number) => {
    setSegments(prev => {
      const updated = prev.map(segment => {
        if (segment.id === segmentId) {
          const clampedStartTime = Math.max(0, Math.min(videoDuration, startTime));
          const clampedEndTime = Math.max(clampedStartTime, Math.min(videoDuration, endTime));

          const startPosition = timeToPosition(clampedStartTime);
          const width = ((clampedEndTime - clampedStartTime) / timelineDuration) * 1400;
          // Keep MLA within new segment bounds
          const currentMlaTime = segment.mlaTime || (clampedStartTime + clampedEndTime) / 2;
          const mlaTime = Math.max(clampedStartTime, Math.min(clampedEndTime, currentMlaTime));
          
          // Determine which handle was moved and seek video to that position
          if (segment.startTime !== clampedStartTime) {
            // Left handle moved - seek to start time
            if (xrayVideoRef.current) xrayVideoRef.current.currentTime = clampedStartTime;
            if (ivusVideoRef.current) ivusVideoRef.current.currentTime = clampedStartTime;
            setCurrentTime(clampedStartTime);
          } else if (segment.endTime !== clampedEndTime) {
            // Right handle moved - seek to end time
            if (xrayVideoRef.current) xrayVideoRef.current.currentTime = clampedEndTime;
            if (ivusVideoRef.current) ivusVideoRef.current.currentTime = clampedEndTime;
            setCurrentTime(clampedEndTime);
          }
          
          return {
            ...segment,
            startTime: clampedStartTime,
            endTime: clampedEndTime,
            startPosition,
            width,
            mlaTime
          };
        }
        return segment;
      });
      return updated;
    });
  };

  // Update MLA position within a segment
  const updateSegmentMLA = (segmentId: string, mlaTime: number) => {
    setSegments(prev => prev.map(segment => {
      if (segment.id === segmentId) {
        // Ensure MLA stays within segment bounds
        const clampedMlaTime = Math.max(segment.startTime, Math.min(segment.endTime, mlaTime));
        return {
          ...segment,
          mlaTime: clampedMlaTime
        };
      }
      return segment;
    }));
  };

  // Move entire segment to new position on timeline
  const moveSegment = (segmentId: string, newStartTime: number) => {
    const segment = segments.find(s => s.id === segmentId);
    if (!segment) return;

    const segmentDuration = segment.endTime - segment.startTime;
    const clampedStartTime = Math.max(0, Math.min(videoDuration - segmentDuration, newStartTime));
    const newEndTime = clampedStartTime + segmentDuration;

    // Update segment position
    setSegments(prev => prev.map(s => {
      if (s.id === segmentId) {
        const startPosition = timeToPosition(clampedStartTime);
        const width = ((newEndTime - clampedStartTime) / timelineDuration) * 1400;
        
        // Adjust MLA time to maintain relative position within segment
        const mlaRelativePosition = s.mlaTime ? (s.mlaTime - s.startTime) / segmentDuration : 0.5;
        const newMlaTime = clampedStartTime + (mlaRelativePosition * segmentDuration);
        
        return {
          ...s,
          startTime: clampedStartTime,
          endTime: newEndTime,
          startPosition,
          width,
          mlaTime: newMlaTime
        };
      }
      return s;
    }));
  };
  
  // Synchronized play/pause
  const togglePlayback = useCallback(() => {
    if (isPlaying) {
      xrayVideoRef.current?.pause();
      ivusVideoRef.current?.pause();
      setIsPlaying(false);
    } else {
      // Ensure videos are ready before playing
      const xrayVideo = xrayVideoRef.current;
      const ivusVideo = ivusVideoRef.current;
      
      if (xrayVideo && ivusVideo) {
        // Sync videos before playing
        if (Math.abs(xrayVideo.currentTime - ivusVideo.currentTime) > 0.1) {
          ivusVideo.currentTime = xrayVideo.currentTime;
        }
        
        // Play both videos
        Promise.all([
          xrayVideo.play().catch(e => console.error('X-ray play error:', e)),
          ivusVideo.play().catch(e => console.error('IVUS play error:', e))
        ]).then(() => {
          setIsPlaying(true);
        });
      }
    }
  }, [isPlaying]);
  
  // Synchronized time update
  const handleTimeUpdate = (video: HTMLVideoElement) => {
    if (isDragging) return; // Don't update during scrubber drag
    
    const time = video.currentTime;
    
    // During playback, use requestAnimationFrame for smooth updates
    // Only use timeupdate for synchronization between videos
    if (!isPlaying) {
      setCurrentTime(time);
    }
    
    // Keep videos tightly synchronized
    if (isPlaying) {
      const otherVideo = video === xrayVideoRef.current ? ivusVideoRef.current : xrayVideoRef.current;
      if (otherVideo && Math.abs(otherVideo.currentTime - time) > 0.05) {
        // Tighter sync threshold during playback (0.05s instead of 0.1s)
        otherVideo.currentTime = time;
      }
    }
  };
  
  // Timeline click to seek - adapted for Frame99 layout
  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current) return;
    
    const rect = timelineRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    
    // Frame99 has prev button (70px) on left, next button (70px) on right
    // Usable timeline area is between these buttons
    const prevButtonWidth = 70;
    const nextButtonWidth = 70;
    const usableClickX = clickX - prevButtonWidth;
    const usableWidth = rect.width - prevButtonWidth - nextButtonWidth;
    
    // Calculate percentage within usable area
    const percentage = Math.max(0, Math.min(1, usableClickX / usableWidth));
    const newTime = Math.min(videoDuration, percentage * timelineDuration);
    
    // Seek both videos
    if (xrayVideoRef.current) xrayVideoRef.current.currentTime = newTime;
    if (ivusVideoRef.current) ivusVideoRef.current.currentTime = newTime;
    
    setCurrentTime(newTime);
    
    // Select scrubber when timeline is clicked
    setSelectedElement('scrubber');
  };
  
  // Format time display
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Bookmark functionality
  const handleBookmarkToggle = useCallback(() => {
    // No time conversion needed - videoDuration equals recordingDuration
    const existingBookmark = getBookmarkAtTime(currentTime);
    if (existingBookmark) {
      removeBookmark(existingBookmark.id);
    } else {
      addBookmark(currentTime, `Bookmark at ${formatTime(currentTime)}`, videoDuration);
    }
  }, [currentTime, getBookmarkAtTime, removeBookmark, addBookmark, videoDuration, formatTime]);
  
  // Toggle functions for new features
  const toggleXRayVisibility = useCallback(() => {
    setShowXRay(prev => !prev);
  }, []);
  
  const toggleVirtualRuler = useCallback(() => {
    setShowVirtualRuler(prev => !prev);
  }, []);
  
  const toggleXRayBookmarks = useCallback(() => {
    setShowXRayBookmarks(prev => !prev);
  }, []);
  
  // Handle bookmark dragging
  useEffect(() => {
    if (!isDraggingBookmark || !editingBookmark) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const xrayContainer = document.querySelector('[style*="width: 720px"][style*="height: 720px"]');
      if (xrayContainer) {
        const rect = xrayContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setDraggedBookmarkPosition({ x, y });
      }
    };
    
    const handleMouseUp = (e: MouseEvent) => {
      // Remove dragging class
      document.body.classList.remove('dragging-bookmark');
      setIsDraggingBookmark(false);
      
      // Show confirm/cancel menu at mouse position after dragging
      // Use setTimeout to ensure state updates happen first
      setTimeout(() => {
        setBookmarkContextMenu({
          x: e.clientX,
          y: e.clientY,
          bookmarkId: editingBookmark
        });
      }, 10);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.classList.remove('dragging-bookmark');
    };
  }, [isDraggingBookmark, editingBookmark]);
  
  // Close context menu on click outside
  useEffect(() => {
    if (!bookmarkContextMenu) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Don't close if clicking inside the menu
      if (!target.closest('[data-bookmark-menu]')) {
        setBookmarkContextMenu(null);
      }
    };
    
    // Delay adding the listener to avoid immediate closure
    const timeoutId = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 100);
    
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [bookmarkContextMenu]);
  
  // Close timeline bookmark menu on click outside
  useEffect(() => {
    if (!timelineBookmarkMenu) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-timeline-bookmark-menu]')) {
        setTimelineBookmarkMenu(null);
      }
    };
    
    const timeoutId = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 100);
    
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [timelineBookmarkMenu]);
  
  // Smooth animation loop during playback
  useEffect(() => {
    let rafId: number | null = null;
    
    if (isPlaying && !isDragging) {
      const updateTime = () => {
        const video = xrayVideoRef.current;
        const ivusVid = ivusVideoRef.current;
        if (video && !video.paused && !video.ended) {
          const currentVideoTime = video.currentTime;
          
          // Loop back to start if we've reached the end of the recorded duration
          if (currentVideoTime >= videoDuration) {
            video.currentTime = 0;
            if (ivusVid) ivusVid.currentTime = 0;
            setCurrentTime(0);
          } else {
            setCurrentTime(currentVideoTime);
          }
          
          rafId = requestAnimationFrame(updateTime);
        }
      };
      
      // Start the animation loop
      rafId = requestAnimationFrame(updateTime);
    }
    
    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [isPlaying, isDragging, videoDuration]);

  useEffect(() => {
    // Set up video event listeners
    const xrayVideo = xrayVideoRef.current;
    const ivusVideo = ivusVideoRef.current;
    
    if (xrayVideo) {
      const handleXrayTimeUpdate = () => handleTimeUpdate(xrayVideo);
      const handleXrayLoadedMetadata = () => {
        console.log('X-Ray video loaded:', xrayVideo.duration);
        // Don't override videoDuration - use actual recording duration instead
      };
      const handleXrayCanPlay = () => {
        console.log('X-Ray video can play');
      };
      const handleXrayError = (e: any) => {
        console.error('X-Ray video error:', e);
      };
      const handleXrayEnded = () => {
        setIsPlaying(false);
      };
      const handleXrayPause = () => {
        // Only update if we're tracking playing state
        if (isPlaying) setIsPlaying(false);
      };
      
      xrayVideo.addEventListener('timeupdate', handleXrayTimeUpdate);
      xrayVideo.addEventListener('loadedmetadata', handleXrayLoadedMetadata);
      xrayVideo.addEventListener('canplay', handleXrayCanPlay);
      xrayVideo.addEventListener('error', handleXrayError);
      xrayVideo.addEventListener('ended', handleXrayEnded);
      xrayVideo.addEventListener('pause', handleXrayPause);
      
      return () => {
        xrayVideo.removeEventListener('timeupdate', handleXrayTimeUpdate);
        xrayVideo.removeEventListener('loadedmetadata', handleXrayLoadedMetadata);
        xrayVideo.removeEventListener('canplay', handleXrayCanPlay);
        xrayVideo.removeEventListener('error', handleXrayError);
        xrayVideo.removeEventListener('ended', handleXrayEnded);
        xrayVideo.removeEventListener('pause', handleXrayPause);
      };
    }
    
    if (ivusVideo) {
      const handleIvusTimeUpdate = () => handleTimeUpdate(ivusVideo);
      const handleIvusCanPlay = () => {
        console.log('IVUS video can play');
      };
      const handleIvusError = (e: any) => {
        console.error('IVUS video error:', e);
      };
      
      ivusVideo.addEventListener('timeupdate', handleIvusTimeUpdate);
      ivusVideo.addEventListener('canplay', handleIvusCanPlay);
      ivusVideo.addEventListener('error', handleIvusError);
      
      return () => {
        ivusVideo.removeEventListener('timeupdate', handleIvusTimeUpdate);
        ivusVideo.removeEventListener('canplay', handleIvusCanPlay);
        ivusVideo.removeEventListener('error', handleIvusError);
      };
    }
  }, [isPlaying]);

  // Update dual frame videos when segment changes
  useEffect(() => {
    const isSegmentSelected = selectedElement !== 'scrubber' && selectedElement !== null;
    const selectedSegment = isSegmentSelected ? segments.find(s => s.id === selectedElement) : null;
    
    if (selectedSegment && distalVideoRef.current && proximalVideoRef.current) {
      const distalVideo = distalVideoRef.current;
      const proximalVideo = proximalVideoRef.current;
      
      // Pause videos to keep them on a single frame
      distalVideo.pause();
      proximalVideo.pause();
      
      // Update distal video to segment start time
      if (distalVideo.readyState >= 2) { // HAVE_CURRENT_DATA or better
        distalVideo.currentTime = selectedSegment.startTime;
      } else {
        // Wait for video to be ready
        const handleDistalCanPlay = () => {
          distalVideo.currentTime = selectedSegment.startTime;
          distalVideo.removeEventListener('canplay', handleDistalCanPlay);
        };
        distalVideo.addEventListener('canplay', handleDistalCanPlay);
      }
      
      // Update proximal video to segment end time
      if (proximalVideo.readyState >= 2) { // HAVE_CURRENT_DATA or better
        proximalVideo.currentTime = selectedSegment.endTime;
      } else {
        // Wait for video to be ready
        const handleProximalCanPlay = () => {
          proximalVideo.currentTime = selectedSegment.endTime;
          proximalVideo.removeEventListener('canplay', handleProximalCanPlay);
        };
        proximalVideo.addEventListener('canplay', handleProximalCanPlay);
      }
    }
  }, [selectedElement, segments]);
  
  return (
    <div 
      style={{
        position: 'relative',
        backgroundColor: '#050505',
        height: '1080px',
        width: '1920px',
        overflow: 'hidden',
        pointerEvents: 'auto',
        fontFamily: 'var(--font-centrale-sans)',
        userSelect: 'none' // Prevent text selection for cleaner UX
      }}
    >
      {/* Top Navigation Bar */}
      <div
        style={{
          position: 'absolute',
          top: '0px',
          left: '0px',
          width: '1920px',
          height: '56px', // Standard navigation bar height
          zIndex: 100
        }}
      >
        <NavigationBarIgt />
      </div>

      {/* Frame Number - 32px from top bar, positioned based on X-ray visibility - Hide when segment is selected */}
      {selectedElement === 'scrubber' && (
        <div
          style={{
            position: 'absolute',
            top: '88px', // 56px nav bar + 32px margin
            left: showXRay ? '760px' : '16px', // 24px margin from X-ray (736px + 24px) when shown, 16px from left when hidden
            color: '#E8E8E8',
            fontSize: '20px',
            fontFamily: "'Centrale Sans Book'",
            lineHeight: '28px',
            zIndex: 50,
            transition: 'left 0.3s ease' // Smooth transition when X-ray toggles
          }}
        >
          FRAME #{Math.round(currentTime * 30)} {/* Assuming 30fps */}
        </div>
      )}

      {/* Pullback Name and Timestamp - 32px from top bar, 32px margin from right toolbar - Hide when segment is selected */}
      {selectedElement === 'scrubber' && (
        <div
          style={{
            position: 'absolute',
            top: '88px', // 56px nav bar + 32px margin
            right: '136px', // 16px (toolbar margin) + 88px (toolbar width) + 32px (gap) = 136px
            zIndex: 50,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '0px'
          }}
        >
          {/* Pullback Name with Edit Icon */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#8C8C8C',
              fontSize: '20px',
              fontFamily: "'Centrale Sans Book'",
              lineHeight: '28px',
              whiteSpace: 'nowrap'
            }}
          >
            <span>IVUS: Untitled</span>
            <svg width="24" height="24" viewBox="0 0 22 22" fill="none" style={{ display: 'block', cursor: 'pointer' }}>
              <path d="M3 15L7 19L18.5 7.5L14.5 3.5L3 15ZM18 0L15.5 2.5L19.5 6.5L22 4L18 0ZM2 16L0 22L6 20L2 16Z" fill="#8C8C8C"/>
            </svg>
          </div>
          
          {/* Timestamp */}
          <div
            style={{
              color: '#8C8C8C',
              fontSize: '20px',
              fontFamily: "'Centrale Sans Book'",
              lineHeight: '28px',
              whiteSpace: 'nowrap',
              textAlign: 'right'
            }}
          >
            22 10 2024 10:49 AM
          </div>
        </div>
      )}

      {/* X-Ray video area - 720x720 */}
      <div
        style={{
          position: 'absolute',
          top: '90px', // Below navigation bar
          left: '16px', // 16px margin from left
          width: '720px', // Correct X-ray video size
          height: '720px',
          backgroundColor: showXRay ? '#111111' : 'transparent',
          border: 'none',
          overflow: 'hidden',
          opacity: 1, // Always fully visible
          transition: 'opacity 0.3s ease'
        }}
      >
        {showXRay && (
          /* X-Ray Video Player - Always keep in DOM for smooth playback */
          <video
            ref={xrayVideoRef}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              backgroundColor: '#000000',
              // Hide video if no X-ray recorded, but keep element in DOM
              opacity: hasXRayForCurrentTime ? 1 : 0
            }}
            muted
            loop
            playsInline
            preload="metadata"
            crossOrigin="anonymous"
            onError={(e) => {
              console.error('X-Ray video error:', e);
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
        )}
        
        {showXRay && !hasXRayForCurrentTime && (
          /* No X-ray recorded message */
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#2a2a2a',
              zIndex: 5
            }}
          >
            <div
              style={{
                backgroundColor: 'rgba(128, 128, 128, 0.8)',
                padding: '12px 24px',
                borderRadius: '4px',
                color: 'white',
                fontSize: '16px',
                fontFamily: 'var(--font-centrale-sans)',
                textAlign: 'center'
              }}
            >
              No X-Ray recorded for this frame
            </div>
          </div>
        )}
        
        {/* Bookmark indicators on X-ray - show all bookmarks when X-ray is visible and has data */}
        {showXRay && hasXRayForCurrentTime && showXRayBookmarks && bookmarks.map(bookmark => {
          // bookmark.time is in recording time (0-32s), check directly
          if (!isXRayActiveAtTime(bookmark.time) || !bookmark.position) return null;
          if (hiddenBookmarks.has(bookmark.id)) return null; // Skip hidden bookmarks
          
          const { x, y } = bookmark.position;
          const isEditing = editingBookmark === bookmark.id;
          // Use updated position if confirmed, otherwise use dragged position if editing, otherwise original
          const updatedPos = updatedBookmarkPositions.get(bookmark.id);
          const displayX = updatedPos ? updatedPos.x : (isEditing && draggedBookmarkPosition ? draggedBookmarkPosition.x : x);
          const displayY = updatedPos ? updatedPos.y : (isEditing && draggedBookmarkPosition ? draggedBookmarkPosition.y : y);
          
          // Convert bookmark time from recording time (0-32s) to analysis video time (0-26s)
          const handleBookmarkClick = (e: React.MouseEvent) => {
            if (isEditing) return; // Don't navigate when editing
            e.stopPropagation();
            // No time conversion needed - bookmark.time is already in correct scale
            setCurrentTime(bookmark.time);
            if (xrayVideoRef.current) {
              xrayVideoRef.current.currentTime = bookmark.time;
            }
          };
          
          const handleContextMenu = (e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            // Add small offset so menu appears next to cursor, not directly under it
            setBookmarkContextMenu({ x: e.clientX + 2, y: e.clientY + 2, bookmarkId: bookmark.id });
          };
          
          const handleMouseDown = (e: React.MouseEvent) => {
            if (isEditing) {
              e.preventDefault();
              e.stopPropagation();
              setIsDraggingBookmark(true);
              setBookmarkContextMenu(null); // Hide menu while dragging
              document.body.classList.add('dragging-bookmark');
            }
          };
          
          return (
            <div
              key={bookmark.id}
              onClick={handleBookmarkClick}
              onContextMenu={handleContextMenu}
              onMouseDown={handleMouseDown}
              style={{
                position: 'absolute',
                left: `${displayX}px`,
                top: `${displayY}px`,
                zIndex: 35,
                cursor: isEditing ? 'grab' : 'pointer',
                transform: 'translate(-50%, -50%)',
                animation: isEditing && !isDraggingBookmark ? 'jiggle 0.6s ease-in-out infinite' : 'none'
              }}
            >
              <NumberedBookmark 
                number={bookmark.number}
                className="scale-125"
              />
            </div>
          );
        })}
        
        {/* Segment indicators on X-ray - show segments when X-ray is visible */}
        {showXRay && hasXRayForCurrentTime && segments.map(segment => {
          // Check if X-ray was active during segment time - no conversion needed
          if (!isXRayActiveAtTime(segment.startTime) || !isXRayActiveAtTime(segment.endTime)) return null;
          
          const segmentPath = calculateSegmentPath(segment.startTime, segment.endTime, videoDuration);
          const pathPoints = generateSegmentPathPoints(segment.startTime, segment.endTime, videoDuration, 30);
          // Shift segment path 20px to the left
          const shiftedPathPoints = pathPoints.map(p => ({ x: p.x - 20, y: p.y }));
          const svgPathString = pointsToSVGPath(shiftedPathPoints);
          const segmentLengthCm = (segment.endTime - segment.startTime).toFixed(2);
          
          return (
            <React.Fragment key={segment.id}>
              {/* SVG path line following catheter route */}
              <svg
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 33,
                  pointerEvents: 'none',
                  overflow: 'visible'
                }}
              >
                <path
                  d={svgPathString}
                  stroke="rgba(255, 255, 255, 0.25)"
                  strokeWidth="40"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              
              {/* Label box at the center of the path, rotated to match direction */}
              <div
                style={{
                  position: 'absolute',
                  left: `${segmentPath.midPos.x - 20}px`, // Shifted 20px left to match path
                  top: `${segmentPath.midPos.y}px`,
                  zIndex: 34,
                  pointerEvents: 'none',
                  transform: `translate(-50%, -50%) rotate(${segmentPath.angle}deg)`
                }}
              >
                <div
                  style={{
                    backgroundColor: '#000',
                    color: 'white',
                    border: '2px solid #FFF',
                    minWidth: '70px',
                    height: '20px',
                    borderRadius: '10px', // Half of height for pill shape
                    fontSize: '12px',
                    fontWeight: 'bold',
                    fontFamily: 'var(--font-centrale-sans)',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingLeft: '8px',
                    paddingRight: '8px',
                    boxSizing: 'border-box'
                  }}
                >
                  {segment.label} {segmentLengthCm} cm
                </div>
              </div>
            </React.Fragment>
          );
        })}
        
        {/* Virtual Ruler Component - positioned 200px right and 100px up from original */}
        {showVirtualRuler && showXRay && (
          <div
            style={{
              position: 'absolute',
              top: '0px', // 100px up from original 100px position
              left: '300px', // 200px right from original 100px position
              width: '400px',
              height: '200px',
              pointerEvents: 'none',
              zIndex: 10
            }}
          >
            <VirtualRuler />
          </div>
        )}
        
        {/* X-Ray Control Buttons - Bottom Left Overlay - Only show when X-ray data exists for current frame */}
        {hasXRayForCurrentTime && (
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              zIndex: 30,
              display: 'flex',
              gap: '8px'
            }}
          >
            {/* Virtual Ruler Button - Only show when X-ray is visible */}
            {showXRay && (
            <div onClick={toggleVirtualRuler} style={{ cursor: 'pointer' }}>
              <div className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex gap-2 items-center justify-center px-3 py-2 relative rounded-[2px] shrink-0">
                <div className="relative shrink-0 size-6">
                  <div className="absolute bottom-[-2.08%] left-0 right-0 top-[-2.08%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 26">
                      <g clipPath="url(#clip0_ruler)" filter="url(#filter0_d_ruler)">
                        <g filter="url(#filter1_d_ruler)">
                          <path d="M8 2.5V23.5H16V2.5H8ZM9 7.5H11V8.5H9V7.5ZM9 12.5H11V13.5H9V12.5ZM9 17.5H11V18.5H9V17.5ZM12.5 21H9V20H12.5V21ZM12.5 16H9V15H12.5V16ZM12.5 11H9V10H12.5V11ZM12.5 6H9V5H12.5V6Z" fill={showVirtualRuler ? "white" : "rgba(255,255,255,0.4)"} fillOpacity="0.8" shapeRendering="crispEdges" />
                        </g>
                      </g>
                      <defs>
                        <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="28" id="filter0_d_ruler" width="28" x="-2" y="-1">
                          <feFlood floodOpacity="0" result="BackgroundImageFix" />
                          <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                          <feOffset />
                          <feGaussianBlur stdDeviation="1" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
                          <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_ruler" />
                          <feBlend in="SourceGraphic" in2="effect1_dropShadow_ruler" mode="normal" result="shape" />
                        </filter>
                        <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="23" id="filter1_d_ruler" width="10" x="8" y="2.5">
                          <feFlood floodOpacity="0" result="BackgroundImageFix" />
                          <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                          <feOffset dx="1" dy="1" />
                          <feGaussianBlur stdDeviation="0.5" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
                          <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_ruler" />
                          <feBlend in="SourceGraphic" in2="effect1_dropShadow_ruler" mode="normal" result="shape" />
                        </filter>
                        <clipPath id="clip0_ruler">
                          <rect fill="white" height="24" transform="translate(0 1)" width="24" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* X-Ray Toggle Button - Shows current X-ray state and allows toggle */}
          <div onClick={toggleXRayVisibility} style={{ cursor: 'pointer' }}>
            <div className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex gap-2 items-center justify-center px-3 py-2 relative rounded-[2px] shrink-0">
              <div className="relative shrink-0 size-6">
                <div className="absolute inset-[-5.42%_-5.62%_-5.83%_-5.63%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
                    <g clipPath="url(#clip0_eye)" filter="url(#filter0_d_eye)">
                      <g filter="url(#filter1_d_eye)">
                        <path d="M14 19.5C9.09999 19.5 5.54999 15.95 4.29999 14.5C5.04999 13.65 6.59999 12.05 8.74999 10.9L7.99999 10.15C4.84999 11.95 2.99999 14.5 2.99999 14.5C2.99999 14.5 7.29999 20.5 14 20.5C15.35 20.5 16.6 20.25 17.7 19.9L16.9 19.1C16 19.35 15.05 19.5 14 19.5ZM17.8 15.75C17.95 15.35 18 14.95 18 14.5C18 12.3 16.2 10.5 14 10.5C13.55 10.5 13.15 10.55 12.75 10.7L13.6 11.55C13.75 11.55 13.85 11.5 14 11.5C15.65 11.5 17 12.85 17 14.5C17 14.65 17 14.75 16.95 14.9L17.8 15.75ZM14 9.50001C18.9 9.50001 22.45 13.05 23.7 14.5C23.05 15.25 21.7 16.65 19.85 17.75L20.6 18.5C23.4 16.75 25 14.5 25 14.5C25 14.5 20.7 8.50001 14 8.50001C12.95 8.50001 11.9 8.65001 10.95 8.90001L11.8 9.75001C12.5 9.60001 13.25 9.50001 14 9.50001ZM10.45 12.65C10.15 13.2 9.99999 13.85 9.99999 14.5C9.99999 16.7 11.8 18.5 14 18.5C14.65 18.5 15.3 18.35 15.85 18.05L15.1 17.3C14.75 17.4 14.4 17.5 14 17.5C12.35 17.5 11 16.15 11 14.5C11 14.1 11.1 13.75 11.2 13.4L10.45 12.65ZM3.34999 2.70001L2.64999 3.40001L24.65 25.4L25.35 24.7L3.34999 2.70001Z" fill="white" fillOpacity="0.8" shapeRendering="crispEdges" />
                      </g>
                    </g>
                    <defs>
                      <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="28" id="filter0_d_eye" width="28" x="0" y="0">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                        <feOffset />
                        <feGaussianBlur stdDeviation="1" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
                        <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_eye" />
                        <feBlend in="SourceGraphic" in2="effect1_dropShadow_eye" mode="normal" result="shape" />
                      </filter>
                      <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="24.7" id="filter1_d_eye" width="24.7" x="2.64999" y="2.70001">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                        <feOffset dx="1" dy="1" />
                        <feGaussianBlur stdDeviation="0.5" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
                        <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_eye" />
                        <feBlend in="SourceGraphic" in2="effect1_dropShadow_eye" mode="normal" result="shape" />
                      </filter>
                      <clipPath id="clip0_eye">
                        <rect fill="white" height="24" transform="translate(2 2)" width="24" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bookmark Toggle Button - Shows/hides bookmarks on X-ray overlay */}
          <div onClick={toggleXRayBookmarks} style={{ cursor: 'pointer' }}>
            <div className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex gap-2 items-center justify-center px-3 py-2 relative rounded-[2px] shrink-0">
              <div className="relative shrink-0 size-6">
                <div className="absolute inset-[-5.42%_-5.62%_-5.83%_-5.63%]">
                  {showXRayBookmarks ? (
                    // Bookmarks visible - show icon with line through it (from Figma)
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                      <g filter="url(#filter0_d_bookmark_hide)" transform="translate(2.5, 0)">
                        <path d="M14.5 22L8.5 16L2.5 22V5.5L14.5 16V22Z" fill="white" fillOpacity="0.8" shapeRendering="crispEdges"/>
                        <path d="M14.5 11.5V0H2.5V1.5L14.5 12V11.5Z" fill="white" fillOpacity="0.8" shapeRendering="crispEdges"/>
                        <path d="M0 2L16.5 16.5V15L0 0.5V2Z" fill="white" fillOpacity="0.8" shapeRendering="crispEdges"/>
                      </g>
                      <defs>
                        <filter id="filter0_d_bookmark_hide" x="0" y="0" width="18.5" height="24" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                          <feOffset dx="1" dy="1"/>
                          <feGaussianBlur stdDeviation="0.5"/>
                          <feComposite in2="hardAlpha" operator="out"/>
                          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/>
                          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_bookmark_hide"/>
                          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_bookmark_hide" result="shape"/>
                        </filter>
                      </defs>
                    </svg>
                  ) : (
                    // Bookmarks hidden - show clean bookmark icon
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
                      <g clipPath="url(#clip0_bookmark_show)" filter="url(#filter0_d_bookmark_show)">
                        <g filter="url(#filter1_d_bookmark_show)">
                          <path d="M18 23L12 17L6 23V1H18V23Z" fill="white" fillOpacity="0.8" shapeRendering="crispEdges" />
                        </g>
                      </g>
                      <defs>
                        <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="28" id="filter0_d_bookmark_show" width="28" x="0" y="0">
                          <feFlood floodOpacity="0" result="BackgroundImageFix" />
                          <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                          <feOffset />
                          <feGaussianBlur stdDeviation="1" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
                          <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_bookmark_show" />
                          <feBlend in="SourceGraphic" in2="effect1_dropShadow_bookmark_show" mode="normal" result="shape" />
                        </filter>
                        <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="25" id="filter1_d_bookmark_show" width="16" x="5" y="0">
                          <feFlood floodOpacity="0" result="BackgroundImageFix" />
                          <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                          <feOffset dx="1" dy="1" />
                          <feGaussianBlur stdDeviation="0.5" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
                          <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_bookmark_show" />
                          <feBlend in="SourceGraphic" in2="effect1_dropShadow_bookmark_show" mode="normal" result="shape" />
                        </filter>
                        <clipPath id="clip0_bookmark_show">
                          <rect fill="white" height="24" transform="translate(2 2)" width="24" />
                        </clipPath>
                      </defs>
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
          </div>
        )}
      </div>

      {/* IVUS video area - Single or Dual frames based on segment selection */}
      {(() => {
        // Determine if a segment is selected or being edited
        const isSegmentSelected = selectedElement !== 'scrubber' && selectedElement !== null;
        const selectedSegment = isSegmentSelected ? segments.find(s => s.id === selectedElement) : null;
        
        if (isSegmentSelected && selectedSegment) {
          // Dual IVUS frames mode - show Distal and Proximal frames
          const distalTime = selectedSegment.startTime;
          const proximalTime = selectedSegment.endTime;
          const distalFrameNumber = Math.round(distalTime * 30); // Assuming 30fps
          const proximalFrameNumber = Math.round(proximalTime * 30);
          
          return (
            <div
              style={{
                position: 'absolute',
                top: '90px',
                left: showXRay ? '790px' : '470px',
                width: '1040px',
                height: '720px',
                display: 'flex',
                gap: '40px',
                transition: 'left 0.3s ease'
              }}
            >
              {/* Distal Frame */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}>
                <div
                  style={{
                    position: 'relative',
                    width: '500px',
                    height: '500px',
                    backgroundColor: '#0a0a0a',
                    border: 'none',
                    overflow: 'hidden',
                    borderRadius: '50%'
                  }}
                >
                  <video
                    ref={distalVideoRef}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      backgroundColor: '#000000',
                      transform: `scale(${zoom / 100})`,
                      filter: `brightness(${brightness / 100})`,
                      transformOrigin: 'center center'
                    }}
                    muted
                    playsInline
                    preload="auto"
                    crossOrigin="anonymous"
                    onLoadedMetadata={(e) => {
                      const video = e.currentTarget;
                      video.pause();
                      video.currentTime = distalTime;
                    }}
                  >
                    <source 
                      src={ivusVideo} 
                      type="video/mp4"
                    />
                  </video>
                </div>
                <div
                  style={{
                    color: '#E8E8E8',
                    fontSize: '20px',
                    fontFamily: "'Centrale Sans Book'",
                    lineHeight: '28px',
                    textAlign: 'left',
                    width: '100%'
                  }}
                >
                  Distal (#{distalFrameNumber})
                </div>
                <button
                  style={{
                    backgroundColor: 'rgba(89, 89, 89, 0.55)',
                    color: 'white',
                    fontSize: '14px',
                    fontFamily: "'Centrale Sans Medium'",
                    padding: '8px 24px',
                    borderRadius: '2px',
                    border: 'none',
                    cursor: 'pointer',
                    minWidth: '120px',
                    alignSelf: 'center',
                    width: '100%'
                  }}
                  onClick={() => {
                    // Exit segment editing/viewing mode completely
                    setSegments(prev => prev.map(segment =>
                      segment.id === selectedSegment?.id
                        ? { ...segment, isEditing: false, isConfirmed: true }
                        : segment
                    ));
                    setEditingSegmentId(null);
                    setSelectedElement('scrubber');
                    
                    // Seek to distal frame position
                    setCurrentTime(distalTime);
                    if (ivusVideoRef.current) ivusVideoRef.current.currentTime = distalTime;
                    if (xrayVideoRef.current) xrayVideoRef.current.currentTime = distalTime;
                  }}
                >
                  View Frame
                </button>
              </div>

              {/* Proximal Frame */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}>
                <div
                  style={{
                    position: 'relative',
                    width: '500px',
                    height: '500px',
                    backgroundColor: '#0a0a0a',
                    border: 'none',
                    overflow: 'hidden',
                    borderRadius: '50%'
                  }}
                >
                  <video
                    ref={proximalVideoRef}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      backgroundColor: '#000000',
                      transform: `scale(${zoom / 100})`,
                      filter: `brightness(${brightness / 100})`,
                      transformOrigin: 'center center'
                    }}
                    muted
                    playsInline
                    preload="auto"
                    crossOrigin="anonymous"
                    onLoadedMetadata={(e) => {
                      const video = e.currentTarget;
                      video.pause();
                      video.currentTime = proximalTime;
                    }}
                  >
                    <source 
                      src={ivusVideo} 
                      type="video/mp4"
                    />
                  </video>
                </div>
                <div
                  style={{
                    color: '#E8E8E8',
                    fontSize: '20px',
                    fontFamily: "'Centrale Sans Book'",
                    lineHeight: '28px',
                    textAlign: 'left',
                    width: '100%'
                  }}
                >
                  Proximal (#{proximalFrameNumber})
                </div>
                <button
                  style={{
                    backgroundColor: 'rgba(89, 89, 89, 0.55)',
                    color: 'white',
                    fontSize: '14px',
                    fontFamily: "'Centrale Sans Medium'",
                    padding: '8px 24px',
                    borderRadius: '2px',
                    border: 'none',
                    cursor: 'pointer',
                    minWidth: '120px',
                    alignSelf: 'center',
                    width: '100%'
                  }}
                  onClick={() => {
                    // Exit segment editing/viewing mode completely
                    setSegments(prev => prev.map(segment =>
                      segment.id === selectedSegment?.id
                        ? { ...segment, isEditing: false, isConfirmed: true }
                        : segment
                    ));
                    setEditingSegmentId(null);
                    setSelectedElement('scrubber');
                    
                    // Seek to proximal frame position
                    setCurrentTime(proximalTime);
                    if (ivusVideoRef.current) ivusVideoRef.current.currentTime = proximalTime;
                    if (xrayVideoRef.current) xrayVideoRef.current.currentTime = proximalTime;
                  }}
                >
                  View Frame
                </button>
              </div>
            </div>
          );
        } else {
          // Single IVUS frame mode - original behavior
          return (
            <div
              style={{
                position: 'absolute',
                top: '90px',
                left: showXRay ? '920px' : '600px',
                width: '720px',
                height: '720px',
                backgroundColor: '#0a0a0a',
                border: 'none',
                overflow: 'hidden',
                borderRadius: '50%',
                transition: 'left 0.3s ease'
              }}
            >
              <video
                ref={ivusVideoRef}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  backgroundColor: '#000000',
                  transform: `scale(${zoom / 100})`,
                  filter: `brightness(${brightness / 100})`,
                  transformOrigin: 'center center'
                }}
                muted
                loop
                playsInline
                preload="metadata"
                crossOrigin="anonymous"
                onError={(e) => {
                  console.error('IVUS video error:', e);
                }}
              >
                <source 
                  src={ivusVideo} 
                  type="video/mp4"
                />
              </video>
            </div>
          );
        }
      })()}

      {/* Right Toolbar - Show when scrubber is active */}
      {selectedElement === 'scrubber' && (
        <div
          style={{
            position: 'absolute',
            top: '90px',
            right: '16px', // 16px margin from right edge
            width: '88px', // Actual toolbar button width
            height: '720px',
            zIndex: 20,
            pointerEvents: 'auto'
          }}
        >
          {!editingSegmentId && (
          <FunctionalToolbar
            zoom={zoom}
            onZoomChange={setZoom}
            brightness={brightness}
            onBrightnessChange={setBrightness}
          />
        )}
        </div>
      )}

      {/* Segment Input Panel - positioned to the right of the timeline */}
      <div
        style={{
          position: 'absolute',
          top: '830px', // Same top as timeline
          right: '16px', // 16px margin from right edge
          width: '332px', // Width to accommodate editing boxes
          height: '184px', // Increased to accommodate full SegmentEditingBox with border
          zIndex: 30,
          pointerEvents: 'auto'
        }}
      >
        <SegmentInputPanel
          segments={segments}
          editingSegmentId={editingSegmentId}
          selectedElement={selectedElement}
          onConfirmSegment={confirmSegment}
          onCancelSegment={cancelSegment}
          onDeleteSegment={deleteSegment}
          onEditSegment={editSegment}
          onSelectSegment={handleSegmentSelect}
          onSegmentLengthChange={handleSegmentLengthChange}
          onAddSegment={addSegment}
          canAddSegment={segments.length < 3}
          nextLabel={getNextLabel()}
          hasXRayData={hasXRayForCurrentTime}
        />
      </div>

      {/* Professional Timeline with Integrated Segment Management */}
      <div
        style={{
          position: 'absolute',
          top: '830px', // Below videos (90 + 720 + 20)
          left: '16px', // Aligned to left
          width: '1540px', // Specified timeline width
          height: '179px', // Frame99 height
        }}
        ref={timelineRef}
      >
        {/* Base Timeline */}
        <SynchronizedFrame99 
          currentTime={currentTime}
          videoDuration={timelineDuration}
          onTimelineClick={handleTimelineClick}
          onTimeChange={handleTimeChange}
          onScrubberSelect={handleScrubberSelect}
          hideMainScrubber={!!editingSegmentId} // Hide main scrubber when editing a segment
          isSegmentSelected={selectedElement !== 'scrubber'} // White scrubber when not selected
          isPlaying={isPlaying} // Pass playing state to show yellow line only
        />

        {/* Unrecorded overlay (match recording screen: show only recorded fraction across 32s timeline) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${70 + (Math.max(0, Math.min(videoDuration, timelineDuration)) / timelineDuration) * 1400}px`,
            right: '70px',
            backgroundColor: '#0e0e0e',
            zIndex: 5,
            pointerEvents: 'auto'
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        />
        
        {/* Segment Manager Overlay */}
        <SegmentManager
          videoDuration={timelineDuration}
          timelineWidth={1400} // Usable timeline width (excluding prev/next buttons)
          timelineStartOffset={70} // Prev button width
          currentTime={currentTime}
          onTimeChange={handleTimeChange}
          renderInputPanel={false} // Don't render input panel here
          segments={segments}
          selectedElement={selectedElement} // Pass selection state
          onSegmentClick={editSegment}
          onSegmentSelect={handleSegmentSelect} // Add segment selection handler
          onSegmentUpdate={updateSegment} // New function to handle segment updates
          onMlaUpdate={updateSegmentMLA} // New function to handle MLA updates
          onSegmentMove={moveSegment} // New function to handle segment movement
        />
        
        {/* Current time display overlay */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '85px', // After prev button
            color: '#FFDD19',
            fontSize: '14px',
            fontWeight: 'bold',
            fontFamily: 'var(--font-centrale-sans)',
            textShadow: '0 1px 3px rgba(0,0,0,0.8)',
            zIndex: 20,
            pointerEvents: 'none' // Allow clicks to pass through to timeline
          }}
        >
          {formatTime(currentTime)} / {formatTime(videoDuration)}
        </div>
        
        {/* Bookmark indicators on timeline - positioned at bottom of ILD */}
        {bookmarks.map(bookmark => {
          // Bookmarks store time in the same scale as videoDuration - no conversion needed
          // Only show bookmarks that fall within the video duration
          if (bookmark.time > videoDuration) return null;
          
          const bookmarkPosition = 70 + (bookmark.time / timelineDuration) * 1400 - 10;
          
          const handleTimelineBookmarkContextMenu = (e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            // Add small offset so menu appears next to cursor, not directly under it
            setTimelineBookmarkMenu({ x: e.clientX + 2, y: e.clientY + 2, bookmarkId: bookmark.id });
          };
          
          return (
            <div
              key={bookmark.id}
              onContextMenu={handleTimelineBookmarkContextMenu}
              style={{
                position: 'absolute',
                top: '155px', // Position at bottom of ILD (179px height - 24px bookmark height)
                left: `${bookmarkPosition}px`,
                width: '24px',
                height: '24px',
                zIndex: 25,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={(e) => {
                e.stopPropagation();
                // Seek to bookmark time
                if (xrayVideoRef.current) xrayVideoRef.current.currentTime = bookmark.time;
                if (ivusVideoRef.current) ivusVideoRef.current.currentTime = bookmark.time;
                setCurrentTime(bookmark.time);
              }}
            >
              <NumberedBookmark 
                number={bookmark.number}
                onClick={() => {
                  // Seek to bookmark time
                  if (xrayVideoRef.current) xrayVideoRef.current.currentTime = bookmark.time;
                  if (ivusVideoRef.current) ivusVideoRef.current.currentTime = bookmark.time;
                  setCurrentTime(bookmark.time);
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Bottom Action Bar */}
      <div className="absolute bottom-4 left-4 right-4 h-10 z-50">
        <ActionBarBeacon 
          onLiveClick={onGoToLive}
          onBookmarkClick={handleBookmarkToggle}
          bookmarkText={hasBookmarkAtTime(currentTime) ? "Remove Bookmark" : "Bookmark"}
          onPlaybackClick={togglePlayback}
          isPlaying={isPlaying}
        />
      </div>
      
      {/* Bookmark Context Menu */}
      {bookmarkContextMenu && !isDraggingBookmark && (
        <div
          data-bookmark-menu
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'fixed',
            left: `${bookmarkContextMenu.x}px`,
            top: `${bookmarkContextMenu.y}px`,
            zIndex: 100,
            backgroundColor: '#2a2a2a',
            borderRadius: '4px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
            minWidth: '200px',
            overflow: 'hidden'
          }}
        >
          {editingBookmark === bookmarkContextMenu.bookmarkId ? (
            /* Confirm/Cancel menu during position editing */
            <>
              <div
                onClick={() => {
                  // Confirm position change - save new position
                  if (draggedBookmarkPosition && bookmarkContextMenu.bookmarkId) {
                    setUpdatedBookmarkPositions(prev => {
                      const updated = new Map(prev);
                      updated.set(bookmarkContextMenu.bookmarkId, draggedBookmarkPosition);
                      return updated;
                    });
                    console.log('Confirmed new position for bookmark:', bookmarkContextMenu.bookmarkId, draggedBookmarkPosition);
                  }
                  setEditingBookmark(null);
                  setDraggedBookmarkPosition(null);
                  setBookmarkContextMenu(null);
                }}
                style={{
                  padding: '12px 16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  borderBottom: '1px solid #444',
                  color: 'white',
                  fontSize: '14px',
                  fontFamily: 'var(--font-centrale-sans)',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3a3a3a'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <span style={{ fontSize: '18px' }}>✓</span>
                <span>Confirm</span>
              </div>
              <div
                onClick={() => {
                  // Cancel - reset dragged position (will revert to last confirmed or original)
                  setEditingBookmark(null);
                  setDraggedBookmarkPosition(null);
                  setBookmarkContextMenu(null);
                }}
                style={{
                  padding: '12px 16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: 'white',
                  fontSize: '14px',
                  fontFamily: 'var(--font-centrale-sans)',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3a3a3a'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <span style={{ fontSize: '18px' }}>✕</span>
                <span>Cancel</span>
              </div>
            </>
          ) : (
            /* Initial menu with Correct Position and Hide */
            <>
              <div
                onClick={() => {
                  // Start correct position mode
                  setEditingBookmark(bookmarkContextMenu.bookmarkId);
                  const bookmark = bookmarks.find(b => b.id === bookmarkContextMenu.bookmarkId);
                  if (bookmark?.position) {
                    // Use updated position if exists, otherwise original
                    const currentPos = updatedBookmarkPositions.get(bookmarkContextMenu.bookmarkId) || bookmark.position;
                    setDraggedBookmarkPosition(currentPos);
                  }
                  setBookmarkContextMenu(null);
                }}
                style={{
                  padding: '12px 16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  borderBottom: '1px solid #444',
                  color: 'white',
                  fontSize: '14px',
                  fontFamily: 'var(--font-centrale-sans)',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3a3a3a'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M13 3L13 10L16 10L12 16L8 10L11 10L11 3L13 3Z" fill="white" fillOpacity="0.7"/>
                  <path d="M10 13L3 13L3 11L10 11L10 8L16 12L10 16L10 13Z" fill="white" fillOpacity="0.7"/>
                  <path d="M14 11L21 11L21 13L14 13L14 16L8 12L14 8L14 11Z" fill="white" fillOpacity="0.7"/>
                  <path d="M11 21L11 14L8 14L12 8L16 14L13 14L13 21L11 21Z" fill="white" fillOpacity="0.7"/>
                </svg>
                <span>Correct position</span>
              </div>
              <div
                onClick={() => {
                  // Hide this bookmark
                  setHiddenBookmarks(prev => new Set([...prev, bookmarkContextMenu.bookmarkId]));
                  setBookmarkContextMenu(null);
                }}
                style={{
                  padding: '12px 16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: 'white',
                  fontSize: '14px',
                  fontFamily: 'var(--font-centrale-sans)',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3a3a3a'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 6C8 6 4.5 9 3 12C4.5 15 8 18 12 18C16 18 19.5 15 21 12C19.5 9 16 6 12 6Z" fill="white" fillOpacity="0.8"/>
                  <circle cx="12" cy="12" r="3" fill="#2a2a2a"/>
                  <line x1="3" y1="3" x2="21" y2="21" stroke="white" strokeWidth="2" strokeOpacity="0.8"/>
                </svg>
                <span>Hide</span>
              </div>
            </>
          )}
        </div>
      )}
      
      {/* Timeline Bookmark Context Menu */}
      {timelineBookmarkMenu && (
        <div
          data-timeline-bookmark-menu
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'fixed',
            left: `${timelineBookmarkMenu.x}px`,
            top: `${timelineBookmarkMenu.y}px`,
            zIndex: 100,
            backgroundColor: '#2a2a2a',
            borderRadius: '4px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
            minWidth: '200px',
            overflow: 'hidden'
          }}
        >
          {(() => {
            const bookmark = bookmarks.find(b => b.id === timelineBookmarkMenu.bookmarkId);
            if (!bookmark) return null;
            
            const isHidden = hiddenBookmarks.has(timelineBookmarkMenu.bookmarkId);
            const hasXRay = isXRayActiveAtTime(bookmark.time);
            
            // Only show "Show on X-ray" if bookmark is hidden
            if (!isHidden) return null;
            
            return (
              <div
                onClick={() => {
                  if (hasXRay) {
                    // Unhide the bookmark
                    setHiddenBookmarks(prev => {
                      const updated = new Set(prev);
                      updated.delete(timelineBookmarkMenu.bookmarkId);
                      return updated;
                    });
                  }
                  setTimelineBookmarkMenu(null);
                }}
                style={{
                  padding: '12px 16px',
                  cursor: hasXRay ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: hasXRay ? 'white' : '#666',
                  fontSize: '14px',
                  fontFamily: 'var(--font-centrale-sans)',
                  fontStyle: hasXRay ? 'normal' : 'italic',
                  transition: 'background-color 0.2s',
                  opacity: hasXRay ? 1 : 0.6
                }}
                onMouseEnter={(e) => {
                  if (hasXRay) e.currentTarget.style.backgroundColor = '#3a3a3a';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 6C8 6 4.5 9 3 12C4.5 15 8 18 12 18C16 18 19.5 15 21 12C19.5 9 16 6 12 6Z" fill={hasXRay ? "white" : "#666"} fillOpacity="0.8"/>
                  <circle cx="12" cy="12" r="3" fill="#2a2a2a"/>
                </svg>
                <span>{hasXRay ? 'Show on X-ray' : 'Bookmark at a position without X-ray Imaging'}</span>
              </div>
            );
          })()}
        </div>
      )}
      
      {/* CSS for jiggle animation */}
      <style>{`
        @keyframes jiggle {
          0%, 100% { transform: translate(-50%, -50%) rotate(0deg) scale(1); }
          25% { transform: translate(-50%, -50%) rotate(-5deg) scale(1.05); }
          50% { transform: translate(-50%, -50%) rotate(5deg) scale(1.1); }
          75% { transform: translate(-50%, -50%) rotate(-5deg) scale(1.05); }
        }
        
        .editing-bookmark {
          cursor: grab !important;
        }
        
        .editing-bookmark:active,
        body.dragging-bookmark * {
          cursor: grabbing !important;
        }
      `}</style>
    </div>
  );
}
