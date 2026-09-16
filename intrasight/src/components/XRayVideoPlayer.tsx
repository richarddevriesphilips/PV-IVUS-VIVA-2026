import React, { useRef, useEffect } from "react";

interface XRayVideoPlayerProps {
  src: string;
  currentTime: number;
  isPlaying: boolean;
  onTimeUpdate: (time: number) => void;
  brightness?: number;
  zoom?: number;
  className?: string;
}

export function XRayVideoPlayer({
  src,
  currentTime,
  isPlaying,
  onTimeUpdate,
  brightness = 100,
  zoom = 100,
  className = "size-full object-cover"
}: XRayVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(console.error);
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (
      videoRef.current &&
      Math.abs(videoRef.current.currentTime - currentTime) > 0.1
    ) {
      videoRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      onTimeUpdate(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      console.log(`X-ray video loaded: ${src}, duration: ${videoRef.current.duration}s`);
    }
  };

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('X-ray video error:', e);
    // Try MP4 fallback if MOV fails
    if (src.endsWith('.mov') && videoRef.current) {
      const mp4Src = src.replace('.mov', '.mp4');
      videoRef.current.src = mp4Src;
    }
  };

  return (
    <div className="flex items-center justify-center size-full">
      <video
        ref={videoRef}
        src={src}
        className={className}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onError={handleError}
        muted
        playsInline
        preload="metadata"
        loop
        crossOrigin="anonymous"
        style={{
          filter: `brightness(${brightness / 100})`,
          transform: `scale(${zoom / 100})`,
          transformOrigin: "center center",
        }}
      />
    </div>
  );
}