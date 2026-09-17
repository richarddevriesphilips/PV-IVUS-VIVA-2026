import { useRef, useCallback } from 'react';
import { VideoRefs } from '../types';
import { APP_CONSTANTS } from '../constants/appConstants';

export function useVideoManager(videoRefs: VideoRefs) {
  const lastVideoUpdateTime = useRef<number>(0);
  const dragUpdateInterval = useRef<NodeJS.Timeout | null>(null);
  const targetVideoTime = useRef<number>(0);

  const getAllVideoRefs = useCallback(() => [
    videoRefs.leftVideoRef,
    videoRefs.rightVideoRef,
    videoRefs.touchLeftVideoRef,
    videoRefs.touchRightVideoRef,
  ], [videoRefs]);

  /**
   * Start the drag update system for smooth video scrubbing
   */
  const startDragUpdateSystem = useCallback(() => {
    if (dragUpdateInterval.current) {
      clearInterval(dragUpdateInterval.current);
    }

    dragUpdateInterval.current = setInterval(() => {
      const allVideoRefs = getAllVideoRefs();
      const targetTime = targetVideoTime.current;

      allVideoRefs.forEach((ref) => {
        if (ref.current) {
          try {
            const currentVideoTime = ref.current.currentTime;
            const timeDiff = Math.abs(currentVideoTime - targetTime);

            if (timeDiff > APP_CONSTANTS.TOLERANCES.DRAG_SYNC) {
              ref.current.currentTime = targetTime;
            }
          } catch (error) {
            // Ignore seek operation errors
          }
        }
      });
    }, APP_CONSTANTS.INTERVALS.DRAG_UPDATE);
  }, [getAllVideoRefs]);

  /**
   * Stop the drag update system
   */
  const stopDragUpdateSystem = useCallback(() => {
    if (dragUpdateInterval.current) {
      clearInterval(dragUpdateInterval.current);
      dragUpdateInterval.current = null;
    }
  }, []);

  /**
   * Update video times with throttling for smooth playback
   */
  const updateVideoTimes = useCallback((
    newTime: number,
    duringDrag: boolean = false
  ) => {
    if (duringDrag) {
      targetVideoTime.current = newTime;
      // Also immediately update videos for responsive feedback during drag
      const allVideoRefs = getAllVideoRefs();
      allVideoRefs.forEach((ref) => {
        if (ref.current) {
          try {
            ref.current.currentTime = newTime;
          } catch (error) {
            // Ignore seek operation errors
          }
        }
      });
      return;
    }

    const now = performance.now();
    if (now - lastVideoUpdateTime.current < APP_CONSTANTS.INTERVALS.VIDEO_THROTTLE) {
      return;
    }

    lastVideoUpdateTime.current = now;

    const allVideoRefs = getAllVideoRefs();
    allVideoRefs.forEach((ref) => {
      if (ref.current) {
        try {
          ref.current.currentTime = newTime;
        } catch (error) {
          // Ignore seek operation errors
        }
      }
    });
  }, [getAllVideoRefs]);

  /**
   * Handle play/pause for all videos
   * Only controls videos that are currently rendered (have a ref.current)
   */
  const handlePlayPause = useCallback((
    isPlaying: boolean,
    currentTime: number,
    videosLoaded: number
  ): boolean => {
    const allVideoRefs = getAllVideoRefs();
    // Get only the videos that are currently rendered
    const availableVideos = allVideoRefs.filter((ref) => ref.current);

    // Need at least one video to be available
    if (availableVideos.length === 0) {
      return isPlaying;
    }

    if (isPlaying) {
      // Pause all available videos
      availableVideos.forEach((ref) => ref.current?.pause());
      return false;
    } else {
      // Sync all available videos to current time before playing
      availableVideos.forEach((ref) => {
        if (ref.current) {
          ref.current.currentTime = currentTime;
        }
      });

      setTimeout(() => {
        availableVideos.forEach((ref) => ref.current?.play());
      }, APP_CONSTANTS.VIDEO_SYNC_DELAY);
      return true;
    }
  }, [getAllVideoRefs]);

  /**
   * Reset all videos to start position
   */
  const resetVideosToStart = useCallback(() => {
    const allVideoRefs = getAllVideoRefs();
    allVideoRefs.forEach((ref) => {
      if (ref.current) {
        ref.current.currentTime = 0;
      }
    });
  }, [getAllVideoRefs]);

  /**
   * Handle video looping at end
   * 
   * When playback is active and videos reach the end (26 seconds), this function:
   * 1. Resets all video currentTime to 0
   * 2. Explicitly calls play() on all videos to ensure continuous playback
   *    (some browsers pause videos when seeking, even during active playback)
   * 3. Returns newTime: 0 to update the UI state (scrubber position, ILD indicator)
   * 4. Returns shouldStop: false to keep the playback state active
   * 
   * This creates a seamless, continuous loop where the IVUS and X-ray recordings
   * play from start to end, then immediately restart from the beginning, with
   * the scrubber moving smoothly along the ILD track throughout.
   */
  const handleVideoLoop = useCallback((isPlaying: boolean) => {
    const allVideoRefs = getAllVideoRefs();
    
    // Use IVUS video (right) for time tracking, not X-ray (left)
    // X-ray video may show nearest frame, not actual scrubber position
    // Prefer main screen (right), but fall back to touch screen if main is not rendered
    const primaryVideoRef = videoRefs.rightVideoRef.current ? videoRefs.rightVideoRef : videoRefs.touchRightVideoRef;
    
    if (!primaryVideoRef.current) {
      return { shouldStop: false, newTime: 0 };
    }

    let current = primaryVideoRef.current.currentTime;

    if (current >= APP_CONSTANTS.DURATION) {
      if (isPlaying) {
        // Loop back to beginning and ensure videos continue playing
        current = 0;
        allVideoRefs.forEach((ref) => {
          if (ref.current) {
            ref.current.currentTime = 0;
            // Ensure video continues playing after seeking (some browsers pause on seek)
            ref.current.play().catch(() => {
              // Ignore play errors (e.g., user interaction required)
            });
          }
        });
        return { shouldStop: false, newTime: 0 };
      } else {
        // Stop at end when not playing
        current = APP_CONSTANTS.DURATION;
        allVideoRefs.forEach((ref) => ref.current?.pause());
        return { shouldStop: true, newTime: APP_CONSTANTS.DURATION };
      }
    }

    return { shouldStop: false, newTime: current };
  }, [getAllVideoRefs, videoRefs.rightVideoRef, videoRefs.touchRightVideoRef]);

  /**
   * Synchronize all videos to the primary video (main left or touch left)
   */
  const syncVideos = useCallback((isDragging: boolean) => {
    if (isDragging) return;

    // Use the first available video ref as primary for syncing
    const primaryVideoRef = videoRefs.leftVideoRef.current ? videoRefs.leftVideoRef : videoRefs.touchLeftVideoRef;
    
    if (!primaryVideoRef.current) return;

    const current = primaryVideoRef.current.currentTime;
    const allVideoRefs = getAllVideoRefs();
    
    allVideoRefs.forEach((ref) => {
      if (ref.current && ref !== primaryVideoRef) {
        const timeDiff = Math.abs(ref.current.currentTime - current);
        if (timeDiff > APP_CONSTANTS.TOLERANCES.VIDEO_SYNC) {
          ref.current.currentTime = current;
        }
      }
    });
  }, [getAllVideoRefs, videoRefs.leftVideoRef, videoRefs.touchLeftVideoRef]);

  return {
    startDragUpdateSystem,
    stopDragUpdateSystem,
    updateVideoTimes,
    handlePlayPause,
    resetVideosToStart,
    handleVideoLoop,
    syncVideos,
  };
}