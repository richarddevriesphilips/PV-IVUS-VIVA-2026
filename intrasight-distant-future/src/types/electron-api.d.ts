// Ambient type declaration for the Electron preload bridge.
// See electron-preload.js for the implementation.

export {};

interface IVUSRedetectProgress {
  frame: number;
  total: number;
  elapsedMs: number;
}

interface IVUSUserKeyframe {
  frame: number;
  kind: 'lumen' | 'vessel';
  polygon: Array<{ x: number; y: number }>;
  addedAt?: string;
}

interface IVUSPromoteResult {
  ok: boolean;
  updated?: Record<string, { lumen: [number, number][]; vessel: [number, number][] }>;
  framesProcessed?: number;
  elapsedMs?: number;
  anchorCount?: number;
  error?: string;
}

declare global {
  interface Window {
    ivusApi?: {
      promoteKeyframeAndRedetect: (payload: {
        frame: number;
        kind: 'lumen' | 'vessel';
        polygon: Array<{ x: number; y: number }>;
      }) => Promise<IVUSPromoteResult>;

      getUserKeyframes: () => Promise<{ ok: boolean; keyframes?: IVUSUserKeyframe[]; error?: string }>;

      onRedetectProgress: (listener: (p: IVUSRedetectProgress) => void) => () => void;
    };
  }
}
