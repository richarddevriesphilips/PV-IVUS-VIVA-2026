import { useEffect, useRef, useState } from 'react';
import IVUSWorkflowApp from './components/IVUSWorkflowApp';

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Fit to the container this app is mounted in, not the browser window -
  // it's rendered directly inside a FlexVision quadrant, not a standalone page.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const maxWidth = 1920;
    const maxHeight = 1080;

    const calculateScale = () => {
      // clientWidth/clientHeight are layout-space (unaffected by the CSS
      // transform this container is itself rendered through), matching the
      // coordinate space the scaled child below is sized in. Using
      // getBoundingClientRect() (screen-space) here would double-apply any
      // ancestor scale.
      const { clientWidth, clientHeight } = container;
      setScale(Math.min(clientWidth / maxWidth, clientHeight / maxHeight));
    };

    calculateScale();

    const resizeObserver = new ResizeObserver(calculateScale);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  // Send fluoro pedal (spacebar) events to parent window
  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      if ((e.code === "Space" || e.code === "F13") && !e.repeat) {
        window.parent.postMessage({ type: "intrasight-fluoro", on: true }, "*");
      }
    };
    const onUp = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "F13") {
        window.parent.postMessage({ type: "intrasight-fluoro", on: false }, "*");
      }
    };
    document.addEventListener("keydown", onDown, true);
    document.addEventListener("keyup", onUp, true);
    window.addEventListener("keydown", onDown, true);
    window.addEventListener("keyup", onUp, true);
    return () => {
      document.removeEventListener("keydown", onDown, true);
      document.removeEventListener("keyup", onUp, true);
      window.removeEventListener("keydown", onDown, true);
      window.removeEventListener("keyup", onUp, true);
    };
  }, []);
  
  return (
    <div ref={containerRef} className="w-full h-full bg-black overflow-hidden flex items-start justify-start">
      <div 
        style={{ 
          width: `${1920 * scale}px`,
          height: `${1080 * scale}px`,
        }}
      >
        <div 
          className="w-[1920px] h-[1080px] shadow-2xl"
          style={{ 
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            pointerEvents: 'auto'
          }}
        >
          <IVUSWorkflowApp />
        </div>
      </div>
    </div>
  );
}