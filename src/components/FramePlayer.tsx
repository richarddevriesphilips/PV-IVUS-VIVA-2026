import { useEffect, useRef, useState } from "react";

interface FramePlayerProps {
  sequence: "postrecord" | "postrecord-left-leg" | "postrecord-right-leg" | "treatment";
  isPlaying: boolean;
  playbackRate?: number;
  className?: string;
  onTimeUpdate?: (frameIndex: number, totalFrames: number) => void;
  seekToFrame?: number;
}

const FRAME_COUNTS = {
  postrecord: 983, // near-future's X-ray Ref sequence (unrelated to distant-future's leg switching)
  "postrecord-left-leg": 788,
  "postrecord-right-leg": 752,
  treatment: 2258,
};

const FPS = 30;

export default function FramePlayer({
  sequence,
  isPlaying,
  playbackRate = 1.0,
  className = "",
  onTimeUpdate,
  seekToFrame,
}: FramePlayerProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const frameIntervalRef = useRef<number | null>(null);
  const totalFrames = FRAME_COUNTS[sequence];

  // Handle seeking to a specific frame
  useEffect(() => {
    if (seekToFrame !== undefined && seekToFrame >= 0 && seekToFrame < totalFrames) {
      setCurrentFrame(seekToFrame);
    }
  }, [seekToFrame, totalFrames]);

  // Handle frame advancement when playing
  useEffect(() => {
    if (isPlaying) {
      const frameDelay = (1000 / FPS) / playbackRate;
      
      frameIntervalRef.current = window.setInterval(() => {
        setCurrentFrame((prev) => {
          const next = prev + 1;
          if (next >= totalFrames) {
            // Loop back to start
            return 0;
          }
          return next;
        });
      }, frameDelay);
    } else {
      if (frameIntervalRef.current !== null) {
        clearInterval(frameIntervalRef.current);
        frameIntervalRef.current = null;
      }
    }

    return () => {
      if (frameIntervalRef.current !== null) {
        clearInterval(frameIntervalRef.current);
        frameIntervalRef.current = null;
      }
    };
  }, [isPlaying, playbackRate, totalFrames]);

  // Notify parent of time updates
  useEffect(() => {
    if (onTimeUpdate) {
      onTimeUpdate(currentFrame, totalFrames);
    }
  }, [currentFrame, totalFrames, onTimeUpdate]);

  const framePath = `/frames/${sequence}/frame_${String(currentFrame + 1).padStart(4, "0")}.jpg`;

  return (
    <img
      src={framePath}
      alt={`Frame ${currentFrame + 1}`}
      className={className}
      style={{ objectFit: "cover" }}
    />
  );
}
