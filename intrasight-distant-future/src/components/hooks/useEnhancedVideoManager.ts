import { useCallback, useRef, useEffect, useMemo } from 'react';
import { VideoRefs } from '../types';
import { APP_CONSTANTS } from '../constants/appConstants';

export function useEnhancedVideoManager(videoRefs: VideoRefs) {
  // Performance tracking
  const lastSeekTime = useRef(0);
  const seekQueue = useRef<number[]>([]);
  const rafId = useRef<number | null>(null);
  const targetVideoTime = useRef(0);
  const isDragMode = useRef(false);
  
  // Buffering state
  const bufferingState = useRef({
    leftVideo: { buffered: 0, ready: false },
    rightVideo: { buffered: 0, ready: false },
    touchLeftVideo: { buffered: 0, ready: false },
    touchRightVideo: { buffered: 0, ready: false }
  });

  const getAllVideoRefs = useCallback(() => {
    return [
      videoRefs.leftVideoRef,
      videoRefs.rightVideoRef,
      videoRefs.touchLeftVideoRef,
      videoRefs.touchRightVideoRef
    ];
  }, [videoRefs]);

  /**
   * Enhanced video buffering management
   */
  const enhanceVideoBuffering = useCallback((video: HTMLVideoElement) => {
    if (!video) return;

    // Set optimal buffering attributes
    video.preload = 'auto';
    video.crossOrigin = 'anonymous';
    
    // Add cache control headers via URL params for better caching
    const url = new URL(video.src);
    url.searchParams.set('cache', 'max-age=3600');
    
    // Force browser to buffer more aggressively
    if ('buffer' in video) {
      (video as any).buffer = 'aggressive';
    }

    // Monitor buffering progress
    const updateBufferState = () => {
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const duration = video.duration || APP_CONSTANTS.DURATION;
        const bufferedPercentage = (bufferedEnd / duration) * 100;
        
        console.log(`Video buffered: ${bufferedPercentage.toFixed(1)}%`);
      }
    };

    video.addEventListener('progress', updateBufferState);
    video.addEventListener('canplaythrough', () => {
      console.log('Video can play through without interruption');
    });

    return () => {
      video.removeEventListener('progress', updateBufferState);
    };
  }, []);

  /**
   * Optimized video seeking with RAF and throttling
   */
  const optimizedSeekToTime = useCallback((targetTime: number, immediate: boolean = false) => {
    const now = performance.now();
    
    // Throttle seeks to prevent overwhelming the video decoder
    if (!immediate && now - lastSeekTime.current < 16) { // ~60fps limit
      targetVideoTime.current = targetTime;
      return;
    }

    lastSeekTime.current = now;
    
    const allVideoRefs = getAllVideoRefs();
    
    // Batch video seeks for better performance
    const seekPromises = allVideoRefs.map(async (ref) => {
      if (!ref.current) return;
      
      try {
        // Check if we're already close to the target time
        const currentTime = ref.current.currentTime;
        const timeDiff = Math.abs(currentTime - targetTime);
        
        // Skip seek if we're already very close (within 0.1 seconds)
        if (timeDiff < 0.1 && !immediate) return;
        
        ref.current.currentTime = targetTime;
        
        // Wait for seek to complete
        return new Promise<void>((resolve) => {
          const handleSeeked = () => {
            ref.current?.removeEventListener('seeked', handleSeeked);
            resolve();
          };
          ref.current?.addEventListener('seeked', handleSeeked);
          
          // Timeout in case seeked event doesn't fire
          setTimeout(resolve, 100);
        });
      } catch (error) {
        console.warn('Video seek error:', error);
      }
    });

    return Promise.all(seekPromises);
  }, [getAllVideoRefs]);

  /**
   * Enhanced drag mode with RAF optimization
   */
  const startDragMode = useCallback(() => {
    isDragMode.current = true;
    
    const updateDragFrame = () => {
      if (!isDragMode.current) return;
      
      // Update to queued target time
      if (targetVideoTime.current !== undefined) {
        optimizedSeekToTime(targetVideoTime.current, false);
      }
      
      rafId.current = requestAnimationFrame(updateDragFrame);
    };
    
    rafId.current = requestAnimationFrame(updateDragFrame);
  }, [optimizedSeekToTime]);

  const stopDragMode = useCallback(() => {
    isDragMode.current = false;
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    
    // Final seek to ensure accuracy
    if (targetVideoTime.current !== undefined) {
      optimizedSeekToTime(targetVideoTime.current, true);
    }
  }, [optimizedSeekToTime]);

  /**
   * Enhanced video time update during drag
   */
  const updateVideoTimesDuringDrag = useCallback((newTime: number) => {
    targetVideoTime.current = newTime;
    
    if (isDragMode.current) {
      // During drag, just update the target - RAF will handle the actual seeking
      return;
    }
    
    // Immediate update for non-drag interactions
    optimizedSeekToTime(newTime, true);
  }, [optimizedSeekToTime]);

  /**
   * Preload and optimize all videos
   */
  const initializeVideoOptimizations = useCallback(() => {
    const allVideoRefs = getAllVideoRefs();
    
    allVideoRefs.forEach((ref) => {
      if (ref.current) {
        enhanceVideoBuffering(ref.current);
        
        // Force initial buffering
        ref.current.load();
        
        // Try to buffer ahead
        setTimeout(() => {
          if (ref.current) {
            ref.current.currentTime = 0.1; // Small seek to trigger buffering
            setTimeout(() => {
              if (ref.current) {
                ref.current.currentTime = 0;
              }
            }, 100);
          }
        }, 500);
      }
    });
  }, [getAllVideoRefs, enhanceVideoBuffering]);

  /**
   * Enhanced play/pause with better synchronization
   */
  const handlePlayPause = useCallback((
    isPlaying: boolean,
    currentTime: number,
    videosLoaded: number
  ): boolean => {
    const allVideoRefs = getAllVideoRefs();
    const allVideosReady = allVideoRefs.every((ref) => ref.current);

    if (allVideosReady) {
      if (isPlaying) {
        // Pause all videos
        allVideoRefs.forEach((ref) => ref.current?.pause());
        return false;
      } else {
        // Sync and play all videos
        return new Promise<boolean>((resolve) => {
          // First, sync all videos to current time
          const syncPromises = allVideoRefs.map((ref) => {
            if (!ref.current) return Promise.resolve();
            
            return new Promise<void>((resolvSync) => {
              const video = ref.current!;
              const handleSeeked = () => {
                video.removeEventListener('seeked', handleSeeked);
                resolvSync();
              };
              
              if (Math.abs(video.currentTime - currentTime) > 0.1) {
                video.addEventListener('seeked', handleSeeked);
                video.currentTime = currentTime;
              } else {
                resolvSync();
              }
            });
          });
          
          Promise.all(syncPromises).then(() => {
            // Small delay for synchronization
            setTimeout(() => {
              allVideoRefs.forEach((ref) => {
                ref.current?.play().catch(console.warn);
              });
              resolve(true);
            }, APP_CONSTANTS.VIDEO_SYNC_DELAY);
          });
        }) as any;
      }
    }
    return isPlaying;
  }, [getAllVideoRefs]);

  /**
   * Video loop handling with better performance
   */
  const handleVideoLoop = useCallback((isPlaying: boolean) => {
    if (!isPlaying || !videoRefs.leftVideoRef.current) {
      return { shouldStop: false, newTime: 0 };
    }

    const video = videoRefs.leftVideoRef.current;
    const currentTime = video.currentTime;
    const duration = video.duration || APP_CONSTANTS.DURATION;

    if (currentTime >= duration) {
      return { shouldStop: true, newTime: duration };
    }

    return { shouldStop: false, newTime: currentTime };
  }, [videoRefs.leftVideoRef]);

  /**
   * Enhanced video synchronization
   */
  const syncVideos = useCallback((isDragging: boolean) => {
    if (isDragging || !videoRefs.leftVideoRef.current) return;

    const masterVideo = videoRefs.leftVideoRef.current;
    const masterTime = masterVideo.currentTime;
    const allVideoRefs = getAllVideoRefs();

    // Only sync if videos have drifted significantly
    allVideoRefs.slice(1).forEach((ref) => {
      if (ref.current) {
        const timeDiff = Math.abs(ref.current.currentTime - masterTime);
        if (timeDiff > 0.2) { // Only sync if drift is > 200ms
          ref.current.currentTime = masterTime;
        }
      }
    });
  }, [videoRefs.leftVideoRef, getAllVideoRefs]);

  /**
   * Reset all videos to start with enhanced performance
   */
  const resetVideosToStart = useCallback(() => {
    optimizedSeekToTime(0, true);
  }, [optimizedSeekToTime]);

  // Initialize optimizations when videos are ready
  useEffect(() => {
    const timer = setTimeout(initializeVideoOptimizations, 1000);
    return () => clearTimeout(timer);
  }, [initializeVideoOptimizations]);

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return {
    // Enhanced methods
    updateVideoTimes: updateVideoTimesDuringDrag,
    startDragUpdateSystem: startDragMode,
    stopDragUpdateSystem: stopDragMode,
    handlePlayPause,
    handleVideoLoop,
    syncVideos,
    resetVideosToStart,
    
    // Utility methods
    initializeVideoOptimizations,
    bufferingState: bufferingState.current,
  };
}