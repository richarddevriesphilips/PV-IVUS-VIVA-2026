import { useEffect, useState } from 'react';
import IVUSWorkflowApp from './components/IVUSWorkflowApp';

export default function App() {
  const [scale, setScale] = useState(1);
  
  useEffect(() => {
    const calculateScale = () => {
      const maxWidth = 1920;
      const maxHeight = 1080;
      
      // Get viewport dimensions
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Calculate scale to fit viewport while maintaining aspect ratio
      const scaleX = viewportWidth / maxWidth;
      const scaleY = viewportHeight / maxHeight;
      
      // Use the smaller scale to ensure content fits, but never exceed 1
      const newScale = Math.min(scaleX, scaleY, 1);
      
      setScale(newScale);
    };
    
    // Calculate initial scale
    calculateScale();
    
    // Recalculate on window resize
    window.addEventListener('resize', calculateScale);
    
    return () => window.removeEventListener('resize', calculateScale);
  }, []);

  // Send fluoro pedal (spacebar) events to parent window
  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !e.repeat) {
        window.parent.postMessage({ type: "intrasight-fluoro", on: true }, "*");
      }
    };
    const onUp = (e: KeyboardEvent) => {
      if (e.code === "Space") {
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
    <div className="min-h-screen min-w-full bg-gray-500 overflow-hidden flex items-center justify-center">
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