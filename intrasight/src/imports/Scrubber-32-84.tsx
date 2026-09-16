export default function Scrubber() {
  return (
    <div className="cursor-pointer relative size-full" data-name="Scrubber">
      <div className="absolute bottom-0 left-[-10%] right-[-10%] top-0">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 48 175"
        >
          <g id="Scrubber">
            <path
              d="M25 175H23V0H25V175Z"
              fill="var(--fill-0, #FFDD19)"
              id="Union"
            />
            <g filter="url(#filter0_d_32_94)" id="Ellipse 5">
              <circle cx="24" cy="88" fill="var(--fill-0, #A28E18)" r="20" />
            </g>
            <circle
              cx="24"
              cy="88"
              fill="var(--fill-0, #FFDD19)"
              id="Ellipse 6"
              r="18"
            />
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="48"
              id="filter0_d_32_94"
              width="48"
              x="0"
              y="66"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                result="hardAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              />
              <feOffset dy="2" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
              />
              <feBlend
                in2="BackgroundImageFix"
                mode="normal"
                result="effect1_dropShadow_32_94"
              />
              <feBlend
                in="SourceGraphic"
                in2="effect1_dropShadow_32_94"
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