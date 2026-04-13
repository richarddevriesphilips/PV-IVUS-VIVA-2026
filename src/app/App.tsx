import { useState, useEffect, useCallback } from "react";
import FlexVisionSmartSizeOn from "../imports/FlexVisionSmartSizeOn";

const DESIGN_W = 3840;
const DESIGN_H = 2160;

function useFitScale() {
  const getScale = useCallback(() => {
    const sx = window.innerWidth / DESIGN_W;
    const sy = window.innerHeight / DESIGN_H;
    return Math.min(sx, sy, 1);
  }, []);

  const [scale, setScale] = useState(getScale);

  useEffect(() => {
    const onResize = () => setScale(getScale());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [getScale]);

  return scale;
}

export default function App() {
  const fitScale = useFitScale();
  const [zoom, setZoom] = useState(1);
  const [autoFit, setAutoFit] = useState(true);

  const activeScale = autoFit ? fitScale : zoom;

  const zoomIn = () => {
    setAutoFit(false);
    setZoom((z) => Math.min(z + 0.1, 1));
  };
  const zoomOut = () => {
    setAutoFit(false);
    setZoom((z) => Math.max(z - 0.1, 0.1));
  };
  const fitToScreen = () => setAutoFit(true);

  return (
    <div className="w-screen h-screen overflow-hidden bg-black relative">
      <div
        style={{
          width: DESIGN_W * activeScale,
          height: DESIGN_H * activeScale,
        }}
      >
        <div
          style={{
            transform: `scale(${activeScale})`,
            transformOrigin: "top left",
            width: DESIGN_W,
            height: DESIGN_H,
          }}
        >
          <FlexVisionSmartSizeOn />
        </div>
      </div>

      {/* Zoom controls */}
      <div className="fixed bottom-4 left-4 flex items-center gap-1 bg-[#2a2a2a] rounded-lg shadow-lg border border-[#555] px-1 py-1 z-50">
        <button
          onClick={zoomOut}
          className="w-8 h-8 flex items-center justify-center text-white/80 hover:text-white hover:bg-[#444] rounded text-lg leading-none"
          title="Zoom out"
        >
          −
        </button>
        <button
          onClick={fitToScreen}
          className="px-2 h-8 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#444] rounded text-xs font-mono min-w-[52px]"
          title="Fit to screen"
        >
          {Math.round(activeScale * 100)}%
        </button>
        <button
          onClick={zoomIn}
          className="w-8 h-8 flex items-center justify-center text-white/80 hover:text-white hover:bg-[#444] rounded text-lg leading-none"
          title="Zoom in"
        >
          +
        </button>
      </div>
    </div>
  );
}
