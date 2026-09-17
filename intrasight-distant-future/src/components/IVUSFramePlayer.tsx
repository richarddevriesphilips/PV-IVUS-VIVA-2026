import React, { useEffect, useRef, useState, useCallback } from 'react';

interface IVUSFramePlayerProps {
  currentTime: number; // Current time in seconds
  className?: string;
  onLoadedMetadata?: (e?: any) => void;
  onError?: (e?: any) => void;
}

/**
 * Frame-based IVUS video player for improved performance
 * 
 * This component displays individual IVUS frames instead of using video playback,
 * which reduces video decoding overhead and improves application smoothness.
 */
export function IVUSFramePlayer({
  currentTime,
  className = '',
  onLoadedMetadata,
  onError
}: IVUSFramePlayerProps) {
  const canvasRef = useRef(null as HTMLCanvasElement | null);
  const [framesLoaded, setFramesLoaded] = useState(false);
  const [totalFrames, setTotalFrames] = useState(780); // 26s * 30fps
  const frameCache = useRef(new Map() as Map<number, HTMLImageElement>);
  const loadingQueue = useRef(new Set() as Set<number>);
  
  const FPS = 30;
  const DURATION = 26;
  const PRELOAD_RANGE = 10; // Preload frames ahead and behind

  /**
   * Get frame number from current time
   */
  const getFrameNumber = useCallback((time: number): number => {
    const frame = Math.floor(time * FPS) + 1; // Frames start at 1
    return Math.max(1, Math.min(frame, totalFrames));
  }, [FPS, totalFrames]);

  /**
   * Get frame filename
   */
  const getFramePath = useCallback((frameNumber: number): string => {
    const paddedNumber = frameNumber.toString().padStart(4, '0');
    return `/intrasight-distant-future/assets/ivus-frames/frame_${paddedNumber}.jpg`;
  }, []);

  /**
   * Load a single frame
   */
  const loadFrame = useCallback((frameNumber: number): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      // Check if already cached
      const cached = frameCache.current.get(frameNumber);
      if (cached) {
        resolve(cached);
        return;
      }

      // Check if already loading
      if (loadingQueue.current.has(frameNumber)) {
        // Wait for it to finish loading
        const checkInterval = setInterval(() => {
          const loaded = frameCache.current.get(frameNumber);
          if (loaded) {
            clearInterval(checkInterval);
            resolve(loaded);
          }
        }, 50);
        return;
      }

      loadingQueue.current.add(frameNumber);

      const img = new Image();
      img.onload = () => {
        frameCache.current.set(frameNumber, img);
        loadingQueue.current.delete(frameNumber);
        resolve(img);
      };
      img.onerror = () => {
        loadingQueue.current.delete(frameNumber);
        reject(new Error(`Failed to load frame ${frameNumber}`));
      };
      img.src = getFramePath(frameNumber);
    });
  }, [getFramePath]);

  /**
   * Preload frames around current frame
   */
  const preloadFrames = useCallback(async (currentFrame: number) => {
    const framesToLoad: number[] = [];
    
    // Load current frame first
    framesToLoad.push(currentFrame);
    
    // Then load nearby frames
    for (let i = 1; i <= PRELOAD_RANGE; i++) {
      if (currentFrame + i <= totalFrames) {
        framesToLoad.push(currentFrame + i);
      }
      if (currentFrame - i >= 1) {
        framesToLoad.push(currentFrame - i);
      }
    }

    // Load frames in parallel
    try {
      await Promise.all(framesToLoad.map(frame => loadFrame(frame).catch(() => null)));
    } catch (error) {
      console.error('Error preloading frames:', error);
    }
  }, [loadFrame, totalFrames]);

  /**
   * Draw frame to canvas
   */
  const drawFrame = useCallback(async (frameNumber: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const img = await loadFrame(frameNumber);
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size to match image
      if (canvas.width !== img.width || canvas.height !== img.height) {
        canvas.width = img.width;
        canvas.height = img.height;
      }

      // Draw the image
      ctx.drawImage(img, 0, 0);
    } catch (error) {
      console.error(`Error drawing frame ${frameNumber}:`, error);
      if (onError) onError();
    }
  }, [loadFrame, onError]);

  /**
   * Initialize frame system
   */
  useEffect(() => {
    // Check if frames exist by trying to load first frame
    loadFrame(1)
      .then(() => {
        setFramesLoaded(true);
        if (onLoadedMetadata) onLoadedMetadata();
      })
      .catch((error: any) => {
        console.error('Failed to load IVUS frames. Please run: npm run extract-frames');
        console.error(error);
        if (onError) onError();
      });
  }, [loadFrame, onLoadedMetadata, onError]);

  /**
   * Update displayed frame when currentTime changes
   */
  useEffect(() => {
    if (!framesLoaded) return;

    const frameNumber = getFrameNumber(currentTime);
    drawFrame(frameNumber);
    
    // Preload nearby frames in the background
    preloadFrames(frameNumber);
  }, [currentTime, framesLoaded, getFrameNumber, drawFrame, preloadFrames]);

  /**
   * Clean up frame cache on unmount
   */
  useEffect(() => {
    return () => {
      frameCache.current.clear();
      loadingQueue.current.clear();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }}
    />
  );
}
