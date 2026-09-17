import React, { useMemo } from 'react';
import { WaveformPoint } from './types';
import { APP_CONSTANTS, RULER_PATH_DATA } from './constants/appConstants';
import { WaveformUtils } from './utils/waveformUtils';

interface ILDPathOverlayProps {
  waveformData: WaveformPoint[];
  currentTime: number;
}

export function ILDPathOverlay({ waveformData, currentTime }: ILDPathOverlayProps) {
  const pathData = useMemo(() => {
    const { ILD_USABLE_WIDTH } = APP_CONSTANTS.MAIN_SCREEN;
    const { BASE_OFFSET_X, BASE_OFFSET_Y } = APP_CONSTANTS.INDICATOR;
    
    // Generate path coordinates by mapping waveform data to ruler path
    const vesselTopPoints: string[] = [];
    const vesselBottomPoints: string[] = [];
    const lumenTopPoints: string[] = [];
    const lumenBottomPoints: string[] = [];
    const vesselSegments: Array<{ topPath: string; bottomPath: string; color: string; topFillPath: string; bottomFillPath: string }> = [];
    
    waveformData.forEach((point, index) => {
      // Calculate progress along the timeline (0 to 1)
      const progress = point.x / ILD_USABLE_WIDTH;
      
      // Interpolate position along the ruler path
      const rulerPosition = interpolateRulerPath(progress);
      
      // Calculate the vessel and lumen offsets based on actual diameter values
      // Offset is radius (diameter/2), scaled by 5 pixels per mm for maximum visibility
      const vesselOffset = (point.vesselDiameter / 2) * 5.0; // Vessel radius in pixels
      const lumenOffset = (point.lumenDiameter / 2) * 5.0;   // Lumen radius in pixels
      
      // Calculate perpendicular direction (normal) to the path tangent
      // Perpendicular to (tangentX, tangentY) is (-tangentY, tangentX) for 90° CCW rotation
      const normalX = -rulerPosition.tangentY;
      const normalY = rulerPosition.tangentX;
      
      // Apply offsets in perpendicular direction
      const vesselTopX = BASE_OFFSET_X + rulerPosition.x + normalX * vesselOffset;
      const vesselTopY = BASE_OFFSET_Y + rulerPosition.y + normalY * vesselOffset;
      const vesselBottomX = BASE_OFFSET_X + rulerPosition.x - normalX * vesselOffset;
      const vesselBottomY = BASE_OFFSET_Y + rulerPosition.y - normalY * vesselOffset;
      
      const lumenTopX = BASE_OFFSET_X + rulerPosition.x + normalX * lumenOffset;
      const lumenTopY = BASE_OFFSET_Y + rulerPosition.y + normalY * lumenOffset;
      const lumenBottomX = BASE_OFFSET_X + rulerPosition.x - normalX * lumenOffset;
      const lumenBottomY = BASE_OFFSET_Y + rulerPosition.y - normalY * lumenOffset;
      
      vesselTopPoints.push(`${vesselTopX},${vesselTopY}`);
      vesselBottomPoints.push(`${vesselBottomX},${vesselBottomY}`);
      lumenTopPoints.push(`${lumenTopX},${lumenTopY}`);
      lumenBottomPoints.push(`${lumenBottomX},${lumenBottomY}`);
      
      // Create segment with heatmap color (red=narrow, green=wide)
      // vessel value: 0 = narrowest (red), 1 = widest (green)
      if (index < waveformData.length - 1) {
        const nextPoint = waveformData[index + 1];
        const nextProgress = nextPoint.x / ILD_USABLE_WIDTH;
        const nextRulerPosition = interpolateRulerPath(nextProgress);
        const nextVesselOffset = (nextPoint.vesselDiameter / 2) * 5.0; // Next vessel radius in pixels
        const nextLumenOffset = (nextPoint.lumenDiameter / 2) * 5.0;   // Next lumen radius in pixels
        
        // Calculate perpendicular direction for next point
        const nextNormalX = -nextRulerPosition.tangentY;
        const nextNormalY = nextRulerPosition.tangentX;
        
        const nextVesselTopX = BASE_OFFSET_X + nextRulerPosition.x + nextNormalX * nextVesselOffset;
        const nextVesselTopY = BASE_OFFSET_Y + nextRulerPosition.y + nextNormalY * nextVesselOffset;
        const nextVesselBottomX = BASE_OFFSET_X + nextRulerPosition.x - nextNormalX * nextVesselOffset;
        const nextVesselBottomY = BASE_OFFSET_Y + nextRulerPosition.y - nextNormalY * nextVesselOffset;
        const nextLumenTopX = BASE_OFFSET_X + nextRulerPosition.x + nextNormalX * nextLumenOffset;
        const nextLumenTopY = BASE_OFFSET_Y + nextRulerPosition.y + nextNormalY * nextLumenOffset;
        const nextLumenBottomX = BASE_OFFSET_X + nextRulerPosition.x - nextNormalX * nextLumenOffset;
        const nextLumenBottomY = BASE_OFFSET_Y + nextRulerPosition.y - nextNormalY * nextLumenOffset;
        
        // Average stenosis percentage for this segment
        const avgStenosis = (point.stenosisPercent + nextPoint.stenosisPercent) / 2;
        
        // Heatmap: 90% stenosis = darkest red, 60% stenosis = brightest green
        const heatmapColor = WaveformUtils.getHeatmapColorFromStenosis(avgStenosis);
        
        // Create top section fill (vessel to lumen)
        const topFillPath = `M ${vesselTopX},${vesselTopY} L ${nextVesselTopX},${nextVesselTopY} L ${nextLumenTopX},${nextLumenTopY} L ${lumenTopX},${lumenTopY} Z`;
        
        // Bottom section fill
        const bottomFillPath = `M ${lumenBottomX},${lumenBottomY} L ${nextLumenBottomX},${nextLumenBottomY} L ${nextVesselBottomX},${nextVesselBottomY} L ${vesselBottomX},${vesselBottomY} Z`;
        
        // Create smooth stroke paths using current and next points
        const topPath = `M ${vesselTopX},${vesselTopY} L ${nextVesselTopX},${nextVesselTopY}`;
        const bottomPath = `M ${vesselBottomX},${vesselBottomY} L ${nextVesselBottomX},${nextVesselBottomY}`;
        
        vesselSegments.push({
          topPath,
          bottomPath,
          color: heatmapColor,
          topFillPath,
          bottomFillPath
        });
      }
    });
    
    // Create SVG path strings for lumen
    const lumenTopPath = `M ${lumenTopPoints.join(' L ')}`;
    const lumenBottomPath = `M ${lumenBottomPoints.join(' L ')}`;
    
    return {
      vesselSegments,
      lumenTopPath,
      lumenBottomPath
    };
  }, [waveformData]);
  
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 15 }}>
      <svg
        width="820"
        height="740"
        viewBox="0 0 820 740"
        className="absolute inset-0"
        style={{ opacity: 0.8, mixBlendMode: 'normal' }}
        shapeRendering="geometricPrecision"
      >
        {/* Vessel segments with heatmap coloring */}
        {pathData.vesselSegments.map((segment, index) => (
            <g key={`vessel-segment-${index}`}>
              {/* Top section fill (vessel to lumen) */}
              <path
                d={segment.topFillPath}
                fill={segment.color}
                opacity="0.5"
                strokeWidth="0"
              />
              {/* Bottom section fill (lumen to vessel) */}
              <path
                d={segment.bottomFillPath}
                fill={segment.color}
                opacity="0.5"
                strokeWidth="0"
              />
            {/* Top and bottom strokes - always green with smooth joins */}
            <path
              d={segment.topPath}
              stroke={APP_CONSTANTS.COLORS.VESSEL_STROKE}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity="0.9"
            />
            <path
              d={segment.bottomPath}
              stroke={APP_CONSTANTS.COLORS.VESSEL_STROKE}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity="0.9"
            />
          </g>
        ))}
        
        {/* Lumen structure lines (no fill, just outline) with smooth rendering */}
        <path
          d={pathData.lumenTopPath}
          stroke={APP_CONSTANTS.COLORS.LUMEN_STROKE}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.6"
        />
        <path
          d={pathData.lumenBottomPath}
          stroke={APP_CONSTANTS.COLORS.LUMEN_STROKE}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}

// Helper function to calculate heatmap color based on vessel size
// narrow (0) = red, wide (1) = green
function getHeatmapColor(vesselValue: number): string {
  // Clamp value between 0 and 1
  vesselValue = Math.max(0, Math.min(1, vesselValue));
  
  // Interpolate from red (narrow) to green (wide)
  // Red: rgb(220, 38, 38) - equivalent to red-600
  // Green: rgb(34, 197, 94) - equivalent to green-500
  const red = Math.round(220 - (220 - 34) * vesselValue);
  const green = Math.round(38 + (197 - 38) * vesselValue);
  const blue = Math.round(38 + (94 - 38) * vesselValue);
  
  return `rgb(${red}, ${green}, ${blue})`;
}

// Helper function to interpolate position along the ruler path
function interpolateRulerPath(progress: number): { x: number; y: number; tangentX: number; tangentY: number } {
  // Clamp progress to valid range
  progress = Math.max(0, Math.min(1, progress));
  
  // Find the two points to interpolate between
  let startPoint = RULER_PATH_DATA[0];
  let endPoint = RULER_PATH_DATA[RULER_PATH_DATA.length - 1];
  
  for (let i = 0; i < RULER_PATH_DATA.length - 1; i++) {
    if (progress >= RULER_PATH_DATA[i].progress && progress <= RULER_PATH_DATA[i + 1].progress) {
      startPoint = RULER_PATH_DATA[i];
      endPoint = RULER_PATH_DATA[i + 1];
      break;
    }
  }
  
  // Linear interpolation between the two points
  const localProgress = (progress - startPoint.progress) / (endPoint.progress - startPoint.progress);
  const x = startPoint.x + (endPoint.x - startPoint.x) * localProgress;
  const y = startPoint.y + (endPoint.y - startPoint.y) * localProgress;
  
  // Calculate tangent (direction along the path)
  const dx = endPoint.x - startPoint.x;
  const dy = endPoint.y - startPoint.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  const tangentX = length > 0 ? dx / length : 0;
  const tangentY = length > 0 ? dy / length : 1;
  
  return { x, y, tangentX, tangentY };
}
