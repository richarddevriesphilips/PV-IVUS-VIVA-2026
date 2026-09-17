import { TOUCH_SCREEN_RULER_PATH } from '../constants/touchScreenConstants';

// Calculate indicator position along the virtual ruler path
export function getIndicatorPosition(time: number): { x: number; y: number } {
  const progress = Math.min(time / 26, 1); // Normalize to 0-1

  // Find the two points to interpolate between
  let lowerPoint = TOUCH_SCREEN_RULER_PATH[0];
  let upperPoint = TOUCH_SCREEN_RULER_PATH[TOUCH_SCREEN_RULER_PATH.length - 1];

  for (let i = 0; i < TOUCH_SCREEN_RULER_PATH.length - 1; i++) {
    if (
      progress >= TOUCH_SCREEN_RULER_PATH[i].progress &&
      progress <= TOUCH_SCREEN_RULER_PATH[i + 1].progress
    ) {
      lowerPoint = TOUCH_SCREEN_RULER_PATH[i];
      upperPoint = TOUCH_SCREEN_RULER_PATH[i + 1];
      break;
    }
  }

  // Linear interpolation between the two points
  const t =
    (progress - lowerPoint.progress) /
      (upperPoint.progress - lowerPoint.progress) || 0;

  return {
    x: lowerPoint.x + (upperPoint.x - lowerPoint.x) * t,
    y: lowerPoint.y + (upperPoint.y - lowerPoint.y) * t,
  };
}