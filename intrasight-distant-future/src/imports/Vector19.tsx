import svgPaths from "./svg-gipzwshh66";

interface Vector19Props {
  isWhite?: boolean;
}

export default function Vector19({ isWhite = false }: Vector19Props) {
  const fillColor = isWhite ? "rgba(255, 255, 255, 1)" : "rgba(255, 221, 25, 1)";
  
  return (
    <div className="relative size-full">
      <div
        className="absolute bottom-[-10.204%] left-[-2.119%] right-[-10.593%] top-[-2.62%]"
        style={
          {
            "--fill-0": fillColor,
            "--stroke-0": "rgba(0, 0, 0, 1)",
          } as React.CSSProperties
        }
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          role="presentation"
          viewBox="0 0 28 28"
        >
          <g filter="url(#filter0_d_1_10598)" id="Vector 19">
            <path d={svgPaths.p2c1cd3c0} fill="var(--fill-0, #FFDD19)" />
            <path d={svgPaths.p2c1cd3c0} stroke="var(--stroke-0, black)" />
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="27.6419"
              id="filter0_d_1_10598"
              width="26.6011"
              x="0.5"
              y="0.358108"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                result="hardAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              />
              <feOffset dx="1" dy="1" />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
              />
              <feBlend
                in2="BackgroundImageFix"
                mode="normal"
                result="effect1_dropShadow_1_10598"
              />
              <feBlend
                in="SourceGraphic"
                in2="effect1_dropShadow_1_10598"
                mode="normal"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}