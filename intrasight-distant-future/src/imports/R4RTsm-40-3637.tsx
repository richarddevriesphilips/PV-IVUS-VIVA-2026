import svgPaths from "./svg-n4hfbr2zcw";
import imgVector from "figma:asset/df7659d03d16ef91e5dd768b584bad7d277a310c.png";
import imgVector1 from "figma:asset/834560562e4c7a24b0fdc6a9c07343445272fa9f.png";
import imgPostrecord2 from "figma:asset/def008272797f1d64d08fdce7592016d3349005d.png";
import imgSequence011 from "figma:asset/f3e5eadf3e1977cc75088f0b7a1703e4dcc624e0.png";

function Scrubber() {
  return (
    <div
      className="absolute h-[140px] left-[984px] top-[554px] w-10"
      data-name="Scrubber"
    >
      <div className="absolute bottom-0 left-[-10%] right-[-10%] top-0">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 48 140"
        >
          <g id="Scrubber">
            <path
              d="M25 140H23V0H25V140Z"
              fill="var(--fill-0, #FFDD19)"
              id="Union"
            />
            <g filter="url(#filter0_d_1_13431)" id="Ellipse 5">
              <circle cx="24" cy="70" fill="var(--fill-0, #A28E18)" r="20" />
            </g>
            <circle
              cx="24"
              cy="70"
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
              id="filter0_d_1_13431"
              width="48"
              x="0"
              y="48"
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
                result="effect1_dropShadow_1_13431"
              />
              <feBlend
                in="SourceGraphic"
                in2="effect1_dropShadow_1_13431"
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

function Measurement() {
  return (
    <div className="relative shrink-0 size-8" data-name="Measurement">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="Measurement">
          <path
            d={svgPaths.p2938bf00}
            fill="var(--fill-0, #E8E8E8)"
            id="path"
          />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt1() {
  return (
    <div
      className="bg-[#696969] box-border content-stretch flex flex-row gap-3 items-center justify-center px-5 py-4 relative rounded shrink-0 w-[214px]"
      data-name="🟢 Button (IGT)"
    >
      <Measurement />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[20px] text-center text-nowrap">
        <p className="block leading-[28px] whitespace-pre">Add Segment</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row gap-4 items-center justify-start left-[152px] p-0 top-[470px]"
      data-name="Container"
    >
      <ButtonIgt1 />
    </div>
  );
}

function DlsFrameFirst48() {
  return (
    <div
      className="absolute left-1/2 size-6 translate-x-[-50%] translate-y-[-50%]"
      data-name="DLS_FrameFirst_48"
      style={{ top: "calc(50% - 0.054px)" }}
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="DLS_FrameFirst_48">
          <path
            d={svgPaths.p37816600}
            fill="var(--fill-0, white)"
            fillOpacity="0.8"
            id="path"
          />
        </g>
      </svg>
    </div>
  );
}

function PrevFrame() {
  return (
    <div
      className="absolute bg-[#212121] bottom-[2.703%] left-0 overflow-clip right-[94.203%] top-[2.703%]"
      data-name="Prev Frame"
    >
      <DlsFrameFirst48 />
    </div>
  );
}

function Group26() {
  return (
    <div className="absolute contents right-0 top-[5px]">
      <div className="absolute bg-[#000000] h-[26px] right-0 top-[5px] w-6" />
      <div className="absolute font-['CentraleSans:Bold',_sans-serif] h-[30px] leading-[0] not-italic right-[16.5px] text-[#ff9f19] text-[22px] text-center top-[5px] translate-x-[50%] w-[19px]">
        <p className="block leading-[22px]">P</p>
      </div>
    </div>
  );
}

function MarkerNoCoReg() {
  return (
    <div
      className="absolute bottom-1 h-[26px] left-[5.888%] overflow-clip right-[5.707%]"
      data-name="Marker/NoCoReg"
    >
      <div className="absolute bg-[#050505] h-[27px] left-0 top-1 w-[26px]" />
      <div className="absolute font-['CentraleSans:Bold',_sans-serif] h-[30px] leading-[0] left-[14.5px] not-italic text-[#ff9f19] text-[22px] text-center top-[5px] translate-x-[-50%] w-[19px]">
        <p className="block leading-[22px]">D</p>
      </div>
      <Group26 />
    </div>
  );
}

function Clippath1() {
  return (
    <div
      className="absolute bottom-[62.632%] contents left-[5.707%] right-[5.435%] top-[13.026%]"
      data-name="clippath-1"
    >
      <div
        className="absolute bottom-[62.632%] left-[5.707%] right-[5.435%] top-[13.026%]"
        data-name="Vector"
      >
        <img
          className="block max-w-none size-full"
          height="35.539"
          src={imgVector}
          width="981"
        />
      </div>
    </div>
  );
}

function Group() {
  return (
    <div
      className="absolute bottom-[61.306%] contents left-[5.707%] right-[5.341%] top-[11.225%]"
      data-name="Group"
    >
      <div
        className="absolute bottom-[61.306%] left-[5.707%] right-[5.341%] top-[11.225%]"
        data-name="Vector"
      >
        <img
          className="block max-w-none size-full"
          height="40.105"
          src={imgVector1}
          width="982.038"
        />
      </div>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div
      className="absolute bottom-[62.632%] contents left-[5.707%] right-[5.435%] top-[13.026%]"
      data-name="Clip path group"
    >
      <Clippath1 />
      <Group />
    </div>
  );
}

function Group1() {
  return (
    <div
      className="absolute bottom-[62.632%] contents left-[5.707%] right-[5.435%] top-[13.026%]"
      data-name="Group"
    >
      <ClipPathGroup />
    </div>
  );
}

function ClipPathGroup1() {
  return (
    <div
      className="absolute bottom-[62.632%] contents left-[5.707%] right-[5.435%] top-[13.026%]"
      data-name="Clip path group"
    >
      <Group1 />
    </div>
  );
}

function Group2() {
  return (
    <div
      className="absolute bottom-[81.507%] left-[74.683%] right-[5.539%] top-[13.014%]"
      data-name="Group"
    >
      <div className="absolute bottom-[-12.482%] left-[-0.024%] right-[-0.336%] top-[-8.509%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 221 10"
        >
          <g id="Group">
            <path
              d={svgPaths.p2b317340}
              id="Vector"
              stroke="var(--stroke-0, #23CC72)"
              strokeMiterlimit="10"
              strokeWidth="2"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

function ClipPathGroup2() {
  return (
    <div
      className="absolute bottom-[81.507%] contents left-[74.683%] right-[5.539%] top-[13.014%]"
      data-name="Clip path group"
    >
      <Group2 />
    </div>
  );
}

function Clippath2() {
  return (
    <div
      className="absolute bottom-[17.567%] contents left-[5.707%] right-[5.435%] top-[58.091%]"
      data-name="clippath-1"
    >
      <div className="absolute bottom-[17.567%] flex items-center justify-center left-[5.707%] right-[5.435%] top-[58.091%]">
        <div className="flex-none h-[35.539px] scale-y-[-100%] w-[981px]">
          <div className="relative size-full" data-name="Vector">
            <img
              className="block max-w-none size-full"
              height="35.539"
              loading="lazy"
              src={imgVector}
              width="981"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Group3() {
  return (
    <div
      className="absolute bottom-[15.791%] contents left-[5.707%] right-[5.341%] top-[56.74%]"
      data-name="Group"
    >
      <div className="absolute bottom-[15.791%] flex items-center justify-center left-[5.707%] right-[5.341%] top-[56.74%]">
        <div className="flex-none h-[40.105px] scale-y-[-100%] w-[982.038px]">
          <div className="relative size-full" data-name="Vector">
            <img
              className="block max-w-none size-full"
              height="40.105"
              loading="lazy"
              src={imgVector1}
              width="982.038"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup3() {
  return (
    <div
      className="absolute bottom-[17.567%] contents left-[5.707%] right-[5.435%] top-[58.091%]"
      data-name="Clip path group"
    >
      <Clippath2 />
      <Group3 />
    </div>
  );
}

function Group4() {
  return (
    <div
      className="absolute bottom-[17.567%] contents left-[5.707%] right-[5.435%] top-[58.091%]"
      data-name="Group"
    >
      <ClipPathGroup3 />
    </div>
  );
}

function ClipPathGroup4() {
  return (
    <div
      className="absolute bottom-[17.567%] contents left-[5.707%] right-[5.435%] top-[58.091%]"
      data-name="Clip path group"
    >
      <Group4 />
    </div>
  );
}

function DlsFrameLast48() {
  return (
    <div
      className="absolute left-1/2 size-6 translate-x-[-50%] translate-y-[-50%]"
      data-name="DLS_FrameLast_48"
      style={{ top: "calc(50% - 0.054px)" }}
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="DLS_FrameLast_48">
          <path
            d={svgPaths.p376b1100}
            fill="var(--fill-0, white)"
            fillOpacity="0.8"
            id="path"
          />
        </g>
      </svg>
    </div>
  );
}

function NextFrame() {
  return (
    <div
      className="absolute bg-[#212121] bottom-[2.703%] left-[94.293%] overflow-clip right-[-0.091%] top-[2.703%]"
      data-name="Next Frame"
    >
      <DlsFrameLast48 />
    </div>
  );
}

function Ild() {
  return (
    <div className="absolute h-[146px] left-0 top-0 w-[1104px]" data-name="ILD">
      <div className="absolute bg-[#212121] bottom-0 left-0 right-[-0.091%] top-0" />
      <div className="absolute bg-neutral-900 bottom-[2.74%] left-0 right-[-0.091%] top-[2.74%]" />
      <PrevFrame />
      <MarkerNoCoReg />
      <ClipPathGroup1 />
      <ClipPathGroup2 />
      <div
        className="absolute bottom-[71.922%] left-[5.707%] right-[25.272%] top-[18.488%]"
        data-name="Vector"
      >
        <div
          className="absolute bottom-[-7.143%] left-0 right-[-0.012%] top-[-7.115%]"
          style={
            { "--stroke-0": "rgba(35, 204, 114, 1)" } as React.CSSProperties
          }
        >
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            role="presentation"
            viewBox="0 0 763 16"
          >
            <path
              d={svgPaths.p1e3cb100}
              id="Vector"
              stroke="var(--stroke-0, #23CC72)"
              strokeMiterlimit="10"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[63.018%] left-[5.707%] right-[5.616%] top-[21.228%]">
        <div
          className="absolute bottom-[-4.35%] left-[-0.061%] right-0 top-[-4.349%]"
          style={
            { "--stroke-0": "rgba(65, 201, 254, 1)" } as React.CSSProperties
          }
        >
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            role="presentation"
            viewBox="0 0 980 25"
          >
            <path
              d={svgPaths.p366e5510}
              id="Vector 20"
              stroke="var(--stroke-0, #41C9FE)"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
      <ClipPathGroup4 />
      <div className="absolute bottom-[17.808%] flex items-center justify-center left-[5.707%] right-[5.616%] top-[67.123%]">
        <div className="flex-none h-[22px] scale-y-[-100%] w-[979px]">
          <div className="relative size-full" data-name="Vector">
            <div
              className="absolute bottom-[-4.545%] left-0 right-[-0.074%] top-[-3.116%]"
              style={
                { "--stroke-0": "rgba(35, 204, 114, 1)" } as React.CSSProperties
              }
            >
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                role="presentation"
                viewBox="0 0 980 24"
              >
                <path
                  d={svgPaths.p19262a00}
                  id="Vector"
                  stroke="var(--stroke-0, #23CC72)"
                  strokeMiterlimit="10"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[24.658%] flex items-center justify-center left-[5.707%] right-[5.616%] top-[58.904%]">
        <div className="flex-none h-6 scale-y-[-100%] w-[979px]">
          <div className="relative size-full">
            <div
              className="absolute bottom-[-4.169%] left-[-0.063%] right-0 top-[-4.168%]"
              style={
                { "--stroke-0": "rgba(65, 201, 254, 1)" } as React.CSSProperties
              }
            >
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                role="presentation"
                viewBox="0 0 980 26"
              >
                <path
                  d={svgPaths.p2eafe180}
                  id="Vector 21"
                  stroke="var(--stroke-0, #41C9FE)"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <NextFrame />
    </div>
  );
}

function Scrubber1() {
  return (
    <div
      className="absolute h-[138px] left-[1022px] top-1 w-10"
      data-name="Scrubber"
    >
      <div className="absolute bottom-0 left-[-10%] right-[-10%] top-0">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 48 138"
        >
          <g id="Scrubber">
            <path
              d="M25 138H23V0H25V138Z"
              fill="var(--fill-0, #FFDD19)"
              id="Union"
            />
            <g filter="url(#filter0_d_1_13393)" id="Ellipse 5">
              <circle cx="24" cy="69" fill="var(--fill-0, #A28E18)" r="20" />
            </g>
            <circle
              cx="24"
              cy="69"
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
              id="filter0_d_1_13393"
              width="48"
              x="0"
              y="47"
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
                result="effect1_dropShadow_1_13393"
              />
              <feBlend
                in="SourceGraphic"
                in2="effect1_dropShadow_1_13393"
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

function Frame1() {
  return (
    <div className="absolute h-[146px] left-[152px] top-[550px] w-[1104px]">
      <Ild />
      <Scrubber1 />
    </div>
  );
}

function Controls() {
  return (
    <div className="relative size-6" data-name="Controls">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Controls">
          <path
            d={svgPaths.p1833f00}
            fill="var(--fill-0, white)"
            fillOpacity="0.8"
            id="path"
          />
        </g>
      </svg>
    </div>
  );
}

function ArrowLeft() {
  return (
    <div className="absolute left-2 size-6 top-5" data-name="ArrowLeft">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="ArrowLeft">
          <path
            clipRule="evenodd"
            d="M14 17L9 12L14 7H15V17H14Z"
            fill="var(--fill-0, #E8E8E8)"
            fillRule="evenodd"
            id="path"
          />
        </g>
      </svg>
    </div>
  );
}

function SideButton() {
  return (
    <div
      className="bg-neutral-900 h-16 overflow-clip relative rounded-sm shrink-0 w-[212px]"
      data-name="SideButton"
    >
      <div className="absolute flex h-[24px] items-center justify-center left-[35px] top-5 w-[24px]">
        <div className="flex-none rotate-[90deg]">
          <Controls />
        </div>
      </div>
      <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-[70px] not-italic text-[20px] text-[rgba(255,255,255,0.8)] text-left text-nowrap top-[18px]">
        <p className="block leading-[28px] whitespace-pre">Adjust Image</p>
      </div>
      <ArrowLeft />
    </div>
  );
}

function AdjustImageSlideBar() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row gap-px h-16 items-start justify-end left-[668px] overflow-clip pb-2.5 pt-0 px-0 top-[470px] w-[588px]"
      data-name="Adjust Image slide bar"
    >
      <SideButton />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-8" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="Icon">
          <path
            d={svgPaths.p1c6ba100}
            fill="var(--fill-0, #E8E8E8)"
            id="path"
          />
        </g>
      </svg>
    </div>
  );
}

function Home() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 h-16 items-center justify-center px-[18px] py-4 relative rounded shrink-0 w-[88px]"
      data-name="Home"
    >
      <Icon />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-8" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="Icon">
          <path d={svgPaths.pa1c6aa0} fill="var(--fill-0, #E8E8E8)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function Snapshot() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 h-16 items-center justify-center px-[18px] py-4 relative rounded shrink-0 w-[88px]"
      data-name="Snapshot"
    >
      <Icon1 />
    </div>
  );
}

function QuietButtons() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-5 items-start justify-start p-0 relative shrink-0"
      data-name="Quiet buttons"
    >
      <Home />
      <Snapshot />
    </div>
  );
}

function ActionBarVerticalIgt() {
  return (
    <div
      className="absolute bg-neutral-900 box-border content-stretch flex flex-col gap-6 h-[720px] items-center justify-start left-0 px-0 py-5 top-0 w-32"
      data-name="🟢 Action bar vertical (IGT)"
    >
      <QuietButtons />
    </div>
  );
}

function DlsMoviecontrolPlayCircle48() {
  return (
    <div
      className="relative shrink-0 size-8"
      data-name="DLS_MoviecontrolPlay_Circle_48"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="DLS_MoviecontrolPlay_Circle_48">
          <path d={svgPaths.pe127e00} fill="var(--fill-0, #171717)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt2() {
  return (
    <div
      className="bg-[#c4c4c4] relative rounded shrink-0 w-full"
      data-name="🟢 Button (IGT)"
    >
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 relative w-full">
          <DlsMoviecontrolPlayCircle48 />
          <div
            className="font-['CentraleSans:Book',_sans-serif] leading-[0] min-w-full not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-center text-neutral-900 text-nowrap"
            style={{ width: "min-content" }}
          >
            <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[20px] overflow-inherit">
              Playback
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Camera() {
  return (
    <div className="relative shrink-0 size-8" data-name="Camera">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="Camera">
          <path d={svgPaths.p2bda4100} fill="var(--fill-0, white)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt3() {
  return (
    <div
      className="bg-[#1474a4] relative rounded shrink-0 w-full"
      data-name="🟢 Button (IGT)"
    >
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 relative w-full">
          <Camera />
          <div
            className="font-['CentraleSans:Book',_sans-serif] leading-[0] min-w-full not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#ffffff] text-[14px] text-center text-nowrap"
            style={{ width: "min-content" }}
          >
            <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[20px] overflow-inherit">
              Live
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame64() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-2 items-start justify-start left-5 p-0 top-[564px] w-[88px]">
      <ButtonIgt2 />
      <ButtonIgt3 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-8" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="Icon">
          <path
            d={svgPaths.p2b832000}
            fill="var(--fill-0, #171717)"
            id="path"
          />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt5() {
  return (
    <div
      className="bg-[#c4c4c4] relative rounded shrink-0 w-full"
      data-name="🟢 Button (IGT)"
    >
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 relative w-full">
          <Icon3 />
          <div
            className="font-['CentraleSans:Book',_sans-serif] leading-[0] min-w-full not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-center text-neutral-900 text-nowrap"
            style={{ width: "min-content" }}
          >
            <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[20px] overflow-inherit">
              Save Frame
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TextBubbleAnnotation() {
  return (
    <div className="relative shrink-0 size-8" data-name="TextBubbleAnnotation">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="TextBubbleAnnotation">
          <path
            d={svgPaths.p27261b00}
            fill="var(--fill-0, #171717)"
            id="path"
          />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt6() {
  return (
    <div
      className="bg-[#c4c4c4] relative rounded shrink-0 w-full"
      data-name="🟢 Button (IGT)"
    >
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 relative w-full">
          <TextBubbleAnnotation />
          <div
            className="font-['CentraleSans:Book',_sans-serif] leading-[0] min-w-full not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-center text-neutral-900 text-nowrap"
            style={{ width: "min-content" }}
          >
            <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[20px] overflow-inherit">
              Annotate
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DlsBookmark48() {
  return (
    <div className="relative shrink-0 size-8" data-name="DLS_Bookmark_48">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="DLS_Bookmark_48">
          <path d={svgPaths.p4c62300} fill="var(--fill-0, #171717)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt7() {
  return (
    <div
      className="bg-[#c4c4c4] relative rounded shrink-0 w-full"
      data-name="🟢 Button (IGT)"
    >
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 relative w-full">
          <DlsBookmark48 />
          <div
            className="font-['CentraleSans:Book',_sans-serif] leading-[0] min-w-full not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-center text-neutral-900 text-nowrap"
            style={{ width: "min-content" }}
          >
            <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[20px] overflow-inherit">
              Bookmark
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame65() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-2 items-start justify-start left-5 p-0 top-[204px] w-[88px]">
      <ButtonIgt5 />
      <ButtonIgt6 />
      <ButtonIgt7 />
    </div>
  );
}

function ActionBarTsm() {
  return (
    <div
      className="absolute h-[720px] left-0 top-1/2 translate-y-[-50%] w-32"
      data-name="Action-bar / TSM"
    >
      <ActionBarVerticalIgt />
      <Frame64 />
      <Frame65 />
    </div>
  );
}

function DiameterIcon() {
  return (
    <div className="absolute left-7 size-8 top-3" data-name="Diameter Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="Diameter Icon">
          <path
            d={svgPaths.p248eff00}
            id="Vector 47"
            stroke="var(--stroke-0, white)"
            strokeOpacity="0.8"
            strokeWidth="3"
          />
          <path
            d={svgPaths.p227bb8f2}
            id="Ellipse 36"
            stroke="var(--stroke-0, white)"
            strokeOpacity="0.8"
            strokeWidth="2"
          />
          <path
            d={svgPaths.p3cc08c00}
            id="Ellipse 37"
            stroke="var(--stroke-0, white)"
            strokeOpacity="0.8"
            strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  );
}

function SideButton1() {
  return (
    <div
      className="bg-neutral-900 h-[76px] overflow-clip relative rounded-sm shrink-0 w-[88px]"
      data-name="SideButton"
    >
      <DiameterIcon />
      <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-[44.5px] not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-12 translate-x-[-50%]">
        <p className="block leading-[20px] whitespace-pre">Diameter</p>
      </div>
    </div>
  );
}

function ManualDrawLine() {
  return (
    <div className="absolute left-7 size-8 top-3" data-name="ManualDrawLine">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="ManualDrawLine">
          <path
            d={svgPaths.paab4180}
            fill="var(--fill-0, white)"
            fillOpacity="0.8"
            id="path"
            opacity="0.5"
          />
          <path
            d={svgPaths.p3f8bdd80}
            fill="var(--fill-0, white)"
            fillOpacity="0.8"
            id="path_2"
          />
        </g>
      </svg>
    </div>
  );
}

function SideButton2() {
  return (
    <div
      className="bg-neutral-900 h-[76px] overflow-clip relative rounded-sm shrink-0 w-[88px]"
      data-name="SideButton"
    >
      <ManualDrawLine />
      <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-[44.5px] not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-12 translate-x-[-50%]">
        <p className="block leading-[20px] whitespace-pre">Draw</p>
      </div>
    </div>
  );
}

function MeasurementDots() {
  return (
    <div className="absolute left-7 size-8 top-3" data-name="MeasurementDots">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="MeasurementDots">
          <path
            d={svgPaths.p7044580}
            fill="var(--fill-0, white)"
            fillOpacity="0.8"
            id="path"
          />
        </g>
      </svg>
    </div>
  );
}

function SideButton3() {
  return (
    <div
      className="bg-neutral-900 h-[76px] overflow-clip relative rounded-sm shrink-0 w-[88px]"
      data-name="SideButton"
    >
      <MeasurementDots />
      <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-11 not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-12 translate-x-[-50%]">
        <p className="block leading-[20px] whitespace-pre">Dots</p>
      </div>
    </div>
  );
}

function DlsRotateContinuous48() {
  return (
    <div
      className="absolute left-7 size-8 top-3"
      data-name="DLS_RotateContinuous_48"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="DLS_RotateContinuous_48">
          <path
            d={svgPaths.p132b1b80}
            fill="var(--fill-0, white)"
            fillOpacity="0.8"
            id="path"
          />
        </g>
      </svg>
    </div>
  );
}

function SideButton4() {
  return (
    <div
      className="bg-neutral-900 h-[76px] overflow-clip relative rounded-sm shrink-0 w-[88px]"
      data-name="SideButton"
    >
      <DlsRotateContinuous48 />
      <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-[44.5px] not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-12 translate-x-[-50%]">
        <p className="block leading-[20px] whitespace-pre">Rapid Rev.</p>
      </div>
    </div>
  );
}

function ToolsToolbar() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-px h-[440px] items-start justify-start left-[1168px] overflow-clip p-0 top-6 w-[88px]"
      data-name="Tools Toolbar"
    >
      <SideButton1 />
      <SideButton2 />
      <SideButton3 />
      <SideButton4 />
    </div>
  );
}

export default function R4RTsm() {
  return (
    <div className="bg-[#000000] relative size-full" data-name="[r4r]TSM">
      <Scrubber />
      <Container />
      <Frame1 />
      <AdjustImageSlideBar />
      <ActionBarTsm />
      <ToolsToolbar />
      <div
        className="[background-size:100%_116.8%] absolute bg-[0%_0.41%] bg-no-repeat h-[432px] left-[155px] top-6 w-[455px]"
        data-name="postrecord 2"
        style={{ backgroundImage: `url('${imgPostrecord2}')` }}
      />
      <div
        className="absolute bg-center bg-cover bg-no-repeat left-[677px] size-[424px] top-8"
        data-name="Sequence 01 1"
        style={{ backgroundImage: `url('${imgSequence011}')` }}
      />
      <div className="absolute flex h-[29.605px] items-center justify-center left-[488px] top-[434px] w-[29.902px]">
        <div className="flex-none rotate-[60deg]">
          <div className="h-[22.194px] relative w-[21.38px]">
            <div
              className="absolute bottom-[-11.264%] left-[-2.339%] right-[-11.693%] top-[-2.892%]"
              style={
                {
                  "--fill-0": "rgba(255, 221, 25, 1)",
                  "--stroke-0": "rgba(0, 0, 0, 1)",
                } as React.CSSProperties
              }
            >
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                role="presentation"
                viewBox="0 0 25 26"
              >
                <g filter="url(#filter0_d_1_13423)" id="Vector 19">
                  <path d={svgPaths.p420a580} fill="var(--fill-0, #FFDD19)" />
                  <path d={svgPaths.p420a580} stroke="var(--stroke-0, black)" />
                </g>
                <defs>
                  <filter
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                    height="25.3359"
                    id="filter0_d_1_13423"
                    width="24.3797"
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
                      result="effect1_dropShadow_1_13423"
                    />
                    <feBlend
                      in="SourceGraphic"
                      in2="effect1_dropShadow_1_13423"
                      mode="normal"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}