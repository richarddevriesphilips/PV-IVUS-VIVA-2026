import rulerSvgPaths from "../imports/svg-rnfs0zgsud";
import { TOUCH_SCREEN_RULER_LABELS } from './constants/touchScreenConstants';

interface VirtualRulerOverlayProps {
  isVisible: boolean;
}

export function VirtualRulerOverlay({ isVisible }: VirtualRulerOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="absolute h-[432px] left-[190px] top-0 w-[200px] pointer-events-none">
      <div className="absolute bottom-[-0.28%] left-[-0.707%] right-[-0.604%] top-[-0.28%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 336 719"
        >
          <g
            filter="url(#filter0_d_1_10572)"
            id="Group 71"
          >
            <path
              d={rulerSvgPaths.p3976ba20}
              id="Vector 18"
              stroke="var(--stroke-0, white)"
            />
            <line
              id="Line 144"
              stroke="var(--stroke-0, white)"
              strokeWidth="3"
              x1="37.8297"
              x2="2.82968"
              y1="7.4903"
              y2="3.4903"
            />
            <circle
              cx="17"
              cy="42"
              fill="var(--fill-0, white)"
              id="Ellipse 57"
              r="5"
            />
            <circle
              cx="19"
              cy="84"
              fill="var(--fill-0, white)"
              id="Ellipse 58"
              r="5"
            />
            <circle
              cx="24"
              cy="125"
              fill="var(--fill-0, white)"
              id="Ellipse 59"
              r="5"
            />
            <circle
              cx="30"
              cy="166"
              fill="var(--fill-0, white)"
              id="Ellipse 60"
              r="5"
            />
            <circle
              cx="40"
              cy="204"
              fill="var(--fill-0, white)"
              id="Ellipse 61"
              r="5"
            />
            <circle
              cx="53"
              cy="246"
              fill="var(--fill-0, white)"
              id="Ellipse 62"
              r="5"
            />
            <circle
              cx="70"
              cy="291"
              fill="var(--fill-0, white)"
              id="Ellipse 63"
              r="5"
            />
            <circle
              cx="93"
              cy="336"
              fill="var(--fill-0, white)"
              id="Ellipse 64"
              r="5"
            />
            <circle
              cx="117"
              cy="379"
              fill="var(--fill-0, white)"
              id="Ellipse 65"
              r="5"
            />
            <circle
              cx="143"
              cy="418"
              fill="var(--fill-0, white)"
              id="Ellipse 66"
              r="5"
            />
            <circle
              cx="178"
              cy="467"
              fill="var(--fill-0, white)"
              id="Ellipse 67"
              r="5"
            />
            <circle
              cx="213"
              cy="506"
              fill="var(--fill-0, white)"
              id="Ellipse 68"
              r="5"
            />
            <circle
              cx="250"
              cy="555"
              fill="var(--fill-0, white)"
              id="Ellipse 69"
              r="5"
            />
            <circle
              cx="275"
              cy="599"
              fill="var(--fill-0, white)"
              id="Ellipse 70"
              r="5"
            />
            <circle
              cx="300"
              cy="650"
              fill="var(--fill-0, white)"
              id="Ellipse 71"
              r="5"
            />
            <circle
              cx="329"
              cy="712"
              fill="var(--fill-0, white)"
              id="Ellipse 72"
              r="5"
            />
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="719"
              id="filter0_d_1_10572"
              width="335.341"
              x="0.659362"
              y="-1.99745e-07"
            >
              <feFlood
                floodOpacity="0"
                result="BackgroundImageFix"
              />
              <feColorMatrix
                in="SourceAlpha"
                result="hardAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="1" />
              <feComposite
                in2="hardAlpha"
                operator="out"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
              />
              <feBlend
                in2="BackgroundImageFix"
                mode="normal"
                result="effect1_dropShadow_1_10572"
              />
              <feBlend
                in="SourceGraphic"
                in2="effect1_dropShadow_1_10572"
                mode="normal"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </div>

      {/* Ruler Labels - Scaled for touch screen */}
      <div className="absolute contents font-['CentraleSans:Book',_sans-serif] leading-[0] left-[18px] not-italic text-[#ffffff] text-[12px] text-left text-nowrap top-0">
        {TOUCH_SCREEN_RULER_LABELS.map((label) => (
          <div
            key={label.number}
            className="absolute"
            style={{ left: `${label.left}px`, top: `${label.top}px` }}
          >
            <p className="block leading-[16px] text-nowrap whitespace-pre">
              {label.number}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}