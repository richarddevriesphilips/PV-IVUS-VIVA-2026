import { WaveformPoint } from '../types';
import { APP_CONSTANTS } from '../constants/appConstants';
import { getBorderMeasurements } from '../../utils/ivusBorders';

export class WaveformUtils {
  /**
   * Generate waveform data points for the main screen ILD using actual
   * border polygon measurements from ivusBorders.  Every data-point maps
   * to a real frame and reads its lumen/vessel area, diameter, and
   * plaque-burden (stenosis) from the same source the overlay + metrics
   * panel use.
   */
  static generateMainScreenWaveformData(): WaveformPoint[] {
    const { NUM_POINTS } = APP_CONSTANTS.WAVEFORM;
    const { ILD_USABLE_WIDTH } = APP_CONSTANTS.MAIN_SCREEN;

    // --- 1. Collect real measurements for every sample point ----------
    const raw: Array<{
      lumenDia: number;
      vesselDia: number;
      lumenArea: number;
      vesselArea: number;
      stenosis: number;
    }> = [];

    for (let i = 0; i <= NUM_POINTS; i++) {
      const time = (i / NUM_POINTS) * APP_CONSTANTS.DURATION;
      const frameNumber = Math.max(1, Math.floor(time * APP_CONSTANTS.FPS) + 1);
      const m = getBorderMeasurements(frameNumber);
      raw.push({
        lumenDia: m.lumenDiameterMm,
        vesselDia: m.vesselDiameterMm,
        lumenArea: m.lumenAreaMm2,
        vesselArea: m.vesselAreaMm2,
        stenosis: m.plaqueBurdenPct,
      });
    }

    // --- 2. Determine observed diameter ranges for normalization ------
    let lDiaMin = Infinity, lDiaMax = 0;
    let vDiaMin = Infinity, vDiaMax = 0;
    for (const r of raw) {
      if (r.lumenDia < lDiaMin) lDiaMin = r.lumenDia;
      if (r.lumenDia > lDiaMax) lDiaMax = r.lumenDia;
      if (r.vesselDia < vDiaMin) vDiaMin = r.vesselDia;
      if (r.vesselDia > vDiaMax) vDiaMax = r.vesselDia;
    }
    const lDiaRange = lDiaMax - lDiaMin || 1;
    const vDiaRange = vDiaMax - vDiaMin || 1;

    // --- 3. Build WaveformPoint array --------------------------------
    const points: WaveformPoint[] = [];
    for (let i = 0; i <= NUM_POINTS; i++) {
      const r = raw[i];
      const x = (i / NUM_POINTS) * ILD_USABLE_WIDTH;

      points.push({
        x,
        lumen: Math.max(0, Math.min(1, (r.lumenDia - lDiaMin) / lDiaRange)),
        vessel: Math.max(0, Math.min(1, (r.vesselDia - vDiaMin) / vDiaRange)),
        vesselDiameter: r.vesselDia,
        lumenDiameter: r.lumenDia,
        stenosisPercent: r.stenosis,
      });
    }

    return points;
  }

  /**
   * Generate SVG path string for waveform lines
   */
  static generateWaveformPath(
    data: WaveformPoint[],
    type: "lumen" | "vessel",
    isTop: boolean,
  ): string {
    const { TRACK_HEIGHT, LUMEN_MAX_OFFSET, LUMEN_MIN_OFFSET, VESSEL_MAX_OFFSET, VESSEL_MIN_OFFSET } = APP_CONSTANTS.WAVEFORM;
    const { ILD_LEFT_BOUNDARY } = APP_CONSTANTS.MAIN_SCREEN;
    
    const centerY = TRACK_HEIGHT / 2;
    const maxOffset = type === "lumen" ? LUMEN_MAX_OFFSET : VESSEL_MAX_OFFSET;
    const minOffset = type === "lumen" ? LUMEN_MIN_OFFSET : VESSEL_MIN_OFFSET;

    return data
      .map((point, index) => {
        const value = type === "lumen" ? point.lumen : point.vessel;
        const offset = minOffset + value * (maxOffset - minOffset);
        const y = isTop ? centerY - offset : centerY + offset;
        return `${index === 0 ? "M" : "L"} ${ILD_LEFT_BOUNDARY + point.x} ${y}`;
      })
      .join(" ");
  }

  /**
   * Generate SVG path string for filled areas between waveform lines
   */
  static generateFilledAreaPath(
    data: WaveformPoint[],
    type: "lumen" | "vessel",
  ): string {
    const { TRACK_HEIGHT, LUMEN_MAX_OFFSET, LUMEN_MIN_OFFSET, VESSEL_MAX_OFFSET, VESSEL_MIN_OFFSET } = APP_CONSTANTS.WAVEFORM;
    const { ILD_LEFT_BOUNDARY } = APP_CONSTANTS.MAIN_SCREEN;
    
    const centerY = TRACK_HEIGHT / 2;
    const maxOffset = type === "lumen" ? LUMEN_MAX_OFFSET : VESSEL_MAX_OFFSET;
    const minOffset = type === "lumen" ? LUMEN_MIN_OFFSET : VESSEL_MIN_OFFSET;

    // Top path
    const topPath = data
      .map((point, index) => {
        const value = type === "lumen" ? point.lumen : point.vessel;
        const offset = minOffset + value * (maxOffset - minOffset);
        const y = centerY - offset;
        return `${index === 0 ? "M" : "L"} ${ILD_LEFT_BOUNDARY + point.x} ${y}`;
      })
      .join(" ");

    // Bottom path (reversed)
    const bottomPath = data
      .slice()
      .reverse()
      .map((point) => {
        const value = type === "lumen" ? point.lumen : point.vessel;
        const offset = minOffset + value * (maxOffset - minOffset);
        const y = centerY + offset;
        return `L ${ILD_LEFT_BOUNDARY + point.x} ${y}`;
      })
      .join(" ");

    return `${topPath} ${bottomPath} Z`;
  }

  /**
   * Calculate heatmap color based on stenosis percentage.
   * Uses an aggressive gradient so high-stenosis areas stand out:
   *   ≤45% → bright green
   *   ~62% → yellow
   *   ≥80% → dark red
   * A power curve (t^1.6) pushes the transition toward red faster.
   */
  static getHeatmapColorFromStenosis(stenosisPercent: number): string {
    // Clamp stenosis between 45% and 80%
    const clampedStenosis = Math.max(45, Math.min(80, stenosisPercent));

    // Three-color gradient: Green (45%) → Yellow (62%) → Dark Red (80%)
    let red: number, green: number, blue: number;

    if (clampedStenosis <= 62) {
      // Interpolate from green to yellow (45% → 62%)
      let t = (clampedStenosis - 45) / (62 - 45); // 0 → 1
      t = Math.pow(t, 1.6); // push toward yellow faster
      // Green: rgb(34, 197, 94)
      // Yellow: rgb(234, 179, 8)
      red = Math.round(34 + (234 - 34) * t);
      green = Math.round(197 + (179 - 197) * t);
      blue = Math.round(94 + (8 - 94) * t);
    } else {
      // Interpolate from yellow to dark red (62% → 80%)
      let t = (clampedStenosis - 62) / (80 - 62); // 0 → 1
      t = Math.pow(t, 1.6); // push toward red faster
      // Yellow: rgb(234, 179, 8)
      // Dark Red: rgb(153, 27, 27)
      red = Math.round(234 + (153 - 234) * t);
      green = Math.round(179 + (27 - 179) * t);
      blue = Math.round(8 + (27 - 8) * t);
    }

    return `rgb(${red}, ${green}, ${blue})`;
  }

  /**
   * Generate SVG path for a single segment between two points
   */
  static generateSegmentPath(
    point: WaveformPoint,
    nextPoint: WaveformPoint,
    type: "lumen" | "vessel",
    isTop: boolean
  ): string {
    const { TRACK_HEIGHT, LUMEN_MAX_OFFSET, LUMEN_MIN_OFFSET, VESSEL_MAX_OFFSET, VESSEL_MIN_OFFSET } = APP_CONSTANTS.WAVEFORM;
    const { ILD_LEFT_BOUNDARY } = APP_CONSTANTS.MAIN_SCREEN;
    
    const centerY = TRACK_HEIGHT / 2;
    const maxOffset = type === "lumen" ? LUMEN_MAX_OFFSET : VESSEL_MAX_OFFSET;
    const minOffset = type === "lumen" ? LUMEN_MIN_OFFSET : VESSEL_MIN_OFFSET;
    
    const value1 = type === "lumen" ? point.lumen : point.vessel;
    const offset1 = minOffset + value1 * (maxOffset - minOffset);
    const y1 = isTop ? centerY - offset1 : centerY + offset1;
    const x1 = ILD_LEFT_BOUNDARY + point.x;
    
    const value2 = type === "lumen" ? nextPoint.lumen : nextPoint.vessel;
    const offset2 = minOffset + value2 * (maxOffset - minOffset);
    const y2 = isTop ? centerY - offset2 : centerY + offset2;
    const x2 = ILD_LEFT_BOUNDARY + nextPoint.x;
    
    return `M ${x1} ${y1} L ${x2} ${y2}`;
  }

  /**
   * Generate filled path for a single segment between two points
   */
  static generateSegmentFillPath(
    point: WaveformPoint,
    nextPoint: WaveformPoint,
    type: "lumen" | "vessel"
  ): string {
    const { TRACK_HEIGHT, LUMEN_MAX_OFFSET, LUMEN_MIN_OFFSET, VESSEL_MAX_OFFSET, VESSEL_MIN_OFFSET } = APP_CONSTANTS.WAVEFORM;
    const { ILD_LEFT_BOUNDARY } = APP_CONSTANTS.MAIN_SCREEN;
    
    const centerY = TRACK_HEIGHT / 2;
    const maxOffset = type === "lumen" ? LUMEN_MAX_OFFSET : VESSEL_MAX_OFFSET;
    const minOffset = type === "lumen" ? LUMEN_MIN_OFFSET : VESSEL_MIN_OFFSET;
    
    const value1 = type === "lumen" ? point.lumen : point.vessel;
    const offset1 = minOffset + value1 * (maxOffset - minOffset);
    const topY1 = centerY - offset1;
    const bottomY1 = centerY + offset1;
    const x1 = ILD_LEFT_BOUNDARY + point.x;
    
    const value2 = type === "lumen" ? nextPoint.lumen : nextPoint.vessel;
    const offset2 = minOffset + value2 * (maxOffset - minOffset);
    const topY2 = centerY - offset2;
    const bottomY2 = centerY + offset2;
    const x2 = ILD_LEFT_BOUNDARY + nextPoint.x;
    
    return `M ${x1} ${topY1} L ${x2} ${topY2} L ${x2} ${bottomY2} L ${x1} ${bottomY1} Z`;
  }

  /**
   * Generate top section fill for vessel (from vessel top to lumen top)
   */
  static generateVesselTopFillPath(
    point: WaveformPoint,
    nextPoint: WaveformPoint
  ): string {
    const { TRACK_HEIGHT, LUMEN_MAX_OFFSET, LUMEN_MIN_OFFSET, VESSEL_MAX_OFFSET, VESSEL_MIN_OFFSET } = APP_CONSTANTS.WAVEFORM;
    const { ILD_LEFT_BOUNDARY } = APP_CONSTANTS.MAIN_SCREEN;
    
    const centerY = TRACK_HEIGHT / 2;
    const x1 = ILD_LEFT_BOUNDARY + point.x;
    const x2 = ILD_LEFT_BOUNDARY + nextPoint.x;
    
    // Vessel top edge
    const vesselOffset1 = VESSEL_MIN_OFFSET + point.vessel * (VESSEL_MAX_OFFSET - VESSEL_MIN_OFFSET);
    const vesselTopY1 = centerY - vesselOffset1;
    const vesselOffset2 = VESSEL_MIN_OFFSET + nextPoint.vessel * (VESSEL_MAX_OFFSET - VESSEL_MIN_OFFSET);
    const vesselTopY2 = centerY - vesselOffset2;
    
    // Lumen top edge
    const lumenOffset1 = LUMEN_MIN_OFFSET + point.lumen * (LUMEN_MAX_OFFSET - LUMEN_MIN_OFFSET);
    const lumenTopY1 = centerY - lumenOffset1;
    const lumenOffset2 = LUMEN_MIN_OFFSET + nextPoint.lumen * (LUMEN_MAX_OFFSET - LUMEN_MIN_OFFSET);
    const lumenTopY2 = centerY - lumenOffset2;
    
    // Create path from vessel top to lumen top
    return `M ${x1} ${vesselTopY1} L ${x2} ${vesselTopY2} L ${x2} ${lumenTopY2} L ${x1} ${lumenTopY1} Z`;
  }

  /**
   * Generate bottom section fill for vessel (from lumen bottom to vessel bottom)
   */
  static generateVesselBottomFillPath(
    point: WaveformPoint,
    nextPoint: WaveformPoint
  ): string {
    const { TRACK_HEIGHT, LUMEN_MAX_OFFSET, LUMEN_MIN_OFFSET, VESSEL_MAX_OFFSET, VESSEL_MIN_OFFSET } = APP_CONSTANTS.WAVEFORM;
    const { ILD_LEFT_BOUNDARY } = APP_CONSTANTS.MAIN_SCREEN;
    
    const centerY = TRACK_HEIGHT / 2;
    const x1 = ILD_LEFT_BOUNDARY + point.x;
    const x2 = ILD_LEFT_BOUNDARY + nextPoint.x;
    
    // Lumen bottom edge
    const lumenOffset1 = LUMEN_MIN_OFFSET + point.lumen * (LUMEN_MAX_OFFSET - LUMEN_MIN_OFFSET);
    const lumenBottomY1 = centerY + lumenOffset1;
    const lumenOffset2 = LUMEN_MIN_OFFSET + nextPoint.lumen * (LUMEN_MAX_OFFSET - LUMEN_MIN_OFFSET);
    const lumenBottomY2 = centerY + lumenOffset2;
    
    // Vessel bottom edge
    const vesselOffset1 = VESSEL_MIN_OFFSET + point.vessel * (VESSEL_MAX_OFFSET - VESSEL_MIN_OFFSET);
    const vesselBottomY1 = centerY + vesselOffset1;
    const vesselOffset2 = VESSEL_MIN_OFFSET + nextPoint.vessel * (VESSEL_MAX_OFFSET - VESSEL_MIN_OFFSET);
    const vesselBottomY2 = centerY + vesselOffset2;
    
    // Create path from lumen bottom to vessel bottom
    return `M ${x1} ${lumenBottomY1} L ${x2} ${lumenBottomY2} L ${x2} ${vesselBottomY2} L ${x1} ${vesselBottomY1} Z`;
  }
}