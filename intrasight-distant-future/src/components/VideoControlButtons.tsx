import buttonSvgPaths from "../imports/svg-fkuk8ivrac";
import { BUTTON_SVG_FILTERS } from './constants/touchScreenConstants';

interface VideoControlButtonsProps {
  onVirtualRulerToggle?: () => void;
  onXRayToggle: () => void;
}

export function VideoControlButtons({ onVirtualRulerToggle, onXRayToggle }: VideoControlButtonsProps) {
  return (
    <div className="z-10">
      <div className="box-border content-stretch cursor-pointer flex flex-row gap-2 items-center justify-start p-0 relative">
        {/* Virtual Ruler Button */}
        <button
          onClick={onVirtualRulerToggle}
          className="box-border content-stretch flex flex-row items-start justify-start overflow-visible p-0 relative shrink-0"
        >
          <div className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-row gap-2 items-center justify-center px-4 py-2 relative rounded-sm shrink-0">
            <div className="relative shrink-0 size-6">
              <div className="absolute bottom-[-2.083%] left-0 right-0 top-[-2.083%]">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 24 26"
                >
                  <g
                    clipPath={`url(#${BUTTON_SVG_FILTERS.rulerButton.clipPath})`}
                    filter={`url(#${BUTTON_SVG_FILTERS.rulerButton.filter0})`}
                  >
                    <g filter={`url(#${BUTTON_SVG_FILTERS.rulerButton.filter1})`}>
                      <path
                        d={buttonSvgPaths.p3ea86a00}
                        fill="white"
                        fillOpacity="0.8"
                        shapeRendering="crispEdges"
                      />
                    </g>
                  </g>
                  <defs>
                    <filter
                      id={BUTTON_SVG_FILTERS.rulerButton.filter0}
                      colorInterpolationFilters="sRGB"
                      filterUnits="userSpaceOnUse"
                      height="28"
                      width="28"
                      x="-2"
                      y="-1"
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
                        result="effect1_dropShadow_1_10555"
                      />
                      <feBlend
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1_10555"
                        mode="normal"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id={BUTTON_SVG_FILTERS.rulerButton.filter1}
                      colorInterpolationFilters="sRGB"
                      filterUnits="userSpaceOnUse"
                      height="23"
                      width="10"
                      x="8"
                      y="2.5"
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
                      <feOffset dx="1" dy="1" />
                      <feGaussianBlur stdDeviation="0.5" />
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
                        result="effect1_dropShadow_1_10555"
                      />
                      <feBlend
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1_10555"
                        mode="normal"
                        result="shape"
                      />
                    </filter>
                    <clipPath id={BUTTON_SVG_FILTERS.rulerButton.clipPath}>
                      <rect
                        fill="white"
                        height="24"
                        transform="translate(0 1)"
                        width="24"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </button>

        {/* Eye Off Button */}
        <button
          onClick={onXRayToggle}
          className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-row gap-2 items-center justify-center overflow-visible px-4 py-2 relative rounded-sm shrink-0"
        >
          <div className="relative shrink-0 size-6">
            <div className="absolute bottom-[-5.833%] left-[-5.625%] right-[-5.625%] top-[-5.417%]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 28 28"
              >
                <g
                  clipPath={`url(#${BUTTON_SVG_FILTERS.eyeButton.clipPath})`}
                  filter={`url(#${BUTTON_SVG_FILTERS.eyeButton.filter0})`}
                >
                  <g filter={`url(#${BUTTON_SVG_FILTERS.eyeButton.filter1})`}>
                    <path
                      d={buttonSvgPaths.p2c140d00}
                      fill="white"
                      fillOpacity="0.8"
                      shapeRendering="crispEdges"
                    />
                  </g>
                </g>
                <defs>
                  <filter
                    id={BUTTON_SVG_FILTERS.eyeButton.filter0}
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                    height="28"
                    width="28"
                    x="0"
                    y="0"
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
                      result="effect1_dropShadow_1_10603"
                    />
                    <feBlend
                      in="SourceGraphic"
                      in2="effect1_dropShadow_1_10603"
                      mode="normal"
                      result="shape"
                    />
                  </filter>
                  <filter
                    id={BUTTON_SVG_FILTERS.eyeButton.filter1}
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                    height="24.7"
                    width="24.7"
                    x="2.64999"
                    y="2.70001"
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
                    <feOffset dx="1" dy="1" />
                    <feGaussianBlur stdDeviation="0.5" />
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
                      result="effect1_dropShadow_1_10603"
                    />
                    <feBlend
                      in="SourceGraphic"
                      in2="effect1_dropShadow_1_10603"
                      mode="normal"
                      result="shape"
                    />
                  </filter>
                  <clipPath id={BUTTON_SVG_FILTERS.eyeButton.clipPath}>
                    <rect
                      fill="white"
                      height="24"
                      transform="translate(2 2)"
                      width="24"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}