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
  const scale = useFitScale();

  return (
    <div className="w-screen h-screen overflow-hidden bg-black">
      <div
        style={{
          width: DESIGN_W * scale,
          height: DESIGN_H * scale,
        }}
      >
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: DESIGN_W,
            height: DESIGN_H,
          }}
        >
          <FlexVisionSmartSizeOn />
        </div>
      </div>
    </div>
  );
}
