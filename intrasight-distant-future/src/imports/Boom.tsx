import svgPaths from "./svg-htfrh24qmy";
import imgPostrecord2 from "figma:asset/def008272797f1d64d08fdce7592016d3349005d.png";
import imgSequence011 from "figma:asset/f3e5eadf3e1977cc75088f0b7a1703e4dcc624e0.png";
import imgVector from "figma:asset/9b39ab5937c11e027fe76e41cd618cdbe78210a0.png";
import imgVector1 from "figma:asset/7f10d6534b9c55094469694608d4e321e0d357ca.png";
import imgVector2 from "figma:asset/1011f89c554c3fce9aa82ca825033fcb58117620.png";
import imgVector3 from "figma:asset/c118d0171898b14313024acbd55278d8683d45f9.png";

function Background() {
  return (
    <div
      className="basis-0 bg-[#383838] grow h-full min-h-px min-w-px shrink-0"
      data-name="Background"
    />
  );
}

function DlsHome24() {
  return (
    <div className="relative shrink-0 size-6" data-name="DLS_Home_24">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="DLS_Home_24">
          <path
            d={svgPaths.p2df20600}
            fill="var(--fill-0, #D6D6D6)"
            id="path"
          />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div
      className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-row gap-2 items-center justify-center p-[8px] relative rounded-sm shrink-0 w-10"
      data-name="Button"
    >
      <DlsHome24 />
    </div>
  );
}

function PhilipsWordmark2() {
  return (
    <div
      className="h-[15px] relative shrink-0 w-[77px]"
      data-name="philips-wordmark-2"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 77 15"
      >
        <g id="philips-wordmark-2">
          <path
            d="M77 0H0V15H77V0Z"
            fill="var(--fill-0, #E8E8E8)"
            id="pixelrounder"
            opacity="0"
          />
          <path d={svgPaths.p25010500} fill="var(--fill-0, white)" id="Shape" />
        </g>
      </svg>
    </div>
  );
}

function Wordmark() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-[15px] items-center justify-start px-2 py-0 relative shrink-0"
      data-name="wordmark"
    >
      <PhilipsWordmark2 />
    </div>
  );
}

function SolutionName() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start px-2 py-0 relative shrink-0"
      data-name="solution name"
    >
      <div className="font-['CentraleSans:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[20px] text-[rgba(255,255,255,0.8)] text-left text-nowrap">
        <p className="block leading-[28px] whitespace-pre">IVUS</p>
      </div>
    </div>
  );
}

function Left() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0"
      data-name="Left"
    >
      <Button />
      <Wordmark />
      <SolutionName />
    </div>
  );
}

function DlsPatientAcquisition24() {
  return (
    <div
      className="relative shrink-0 size-8"
      data-name="DLS_PatientAcquisition_24"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="DLS_PatientAcquisition_24">
          <path d={svgPaths.p4381100} fill="var(--fill-0, #41C9FE)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function TextContainer() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0"
      data-name="Text container"
    >
      <div className="font-['CentraleSans:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#41c9fe] text-[20px] text-left text-nowrap">
        <p className="block leading-[28px] whitespace-pre">DOE, Jane</p>
      </div>
    </div>
  );
}

function Patient() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-3 items-center justify-start p-0 relative shrink-0"
      data-name="Patient"
    >
      <DlsPatientAcquisition24 />
      <TextContainer />
    </div>
  );
}

function Label() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['CentraleSans:Book',_sans-serif] gap-2 items-start justify-start leading-[0] not-italic p-0 relative shrink-0 text-[20px] text-left text-nowrap"
      data-name="Label"
    >
      <div className="flex flex-col justify-center relative shrink-0 text-[rgba(214,214,214,0.65)]">
        <p className="block leading-[28px] text-nowrap whitespace-pre">
          Patient ID
        </p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 text-[rgba(255,255,255,0.8)]">
        <p className="block leading-[28px] text-nowrap whitespace-pre">
          234567
        </p>
      </div>
    </div>
  );
}

function Label1() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['CentraleSans:Book',_sans-serif] gap-2 items-start justify-start leading-[0] not-italic p-0 relative shrink-0 text-[20px] text-left text-nowrap"
      data-name="Label"
    >
      <div className="flex flex-col justify-center relative shrink-0 text-[#8c8c8c]">
        <p className="block leading-[28px] text-nowrap whitespace-pre">DOB</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 text-[rgba(255,255,255,0.8)]">
        <p className="block leading-[28px] text-nowrap whitespace-pre">
          15-Jan-1991 (33 y)
        </p>
      </div>
    </div>
  );
}

function Info() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0"
      data-name="Info"
    >
      <Label />
      <Label1 />
    </div>
  );
}

function PatientInfo() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-6 h-6 items-center justify-center p-0 relative shrink-0"
      data-name="Patient info"
    >
      <Patient />
      <Info />
    </div>
  );
}

function Left1() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row gap-12 h-12 items-center justify-start left-2 pl-2 pr-0 py-0 top-1/2 translate-y-[-50%]"
      data-name="Left"
    >
      <Left />
      <PatientInfo />
    </div>
  );
}

function Time() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 items-center justify-start leading-[0] not-italic p-0 relative shrink-0 text-[#d6d6d6] text-[20px]"
      data-name="Time"
    >
      <div className="flex flex-col font-['CentraleSansDS:Book',_sans-serif] justify-center relative shrink-0 text-left text-nowrap">
        <p className="block leading-[28px] whitespace-pre">09:00</p>
      </div>
      <div className="flex flex-col font-['CentraleSans:Book',_sans-serif] justify-center relative shrink-0 text-center w-10">
        <p className="block leading-[28px]">AM</p>
      </div>
    </div>
  );
}

function DateTimeUser() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-5 items-center justify-end p-0 relative shrink-0"
      data-name="Date + Time + User"
    >
      <div className="flex flex-col font-['CentraleSans:Book',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#d6d6d6] text-[20px] text-left text-nowrap">
        <p className="block leading-[28px] whitespace-pre">01-Jul-2024</p>
      </div>
      <Time />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-6" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Icon">
          <path
            d={svgPaths.p32cbff80}
            fill="var(--fill-0, #D6D6D6)"
            id="path"
          />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-3 py-2 relative rounded-sm shrink-0 size-10"
      data-name="🟢 Button (IGT)"
    >
      <Icon />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-6" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Icon">
          <path
            d={svgPaths.p3a6c9900}
            fill="var(--fill-0, #D6D6D6)"
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
      className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-3 py-2 relative rounded-sm shrink-0 size-10"
      data-name="🟢 Button (IGT)"
    >
      <Icon1 />
    </div>
  );
}

function Icons() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 items-center justify-end p-0 relative shrink-0"
      data-name="Icons"
    >
      <ButtonIgt />
      <ButtonIgt1 />
    </div>
  );
}

function RightSide() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-3 h-12 items-center justify-end p-0 relative shrink-0"
      data-name="Right side"
    >
      <DateTimeUser />
      <Icons />
    </div>
  );
}

function Right() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row gap-2 h-12 items-center justify-end p-0 right-4 top-1/2 translate-y-[-50%]"
      data-name="Right"
    >
      <RightSide />
    </div>
  );
}

function TopRow() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 h-14 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Top row"
    >
      <Background />
      <Left1 />
      <Right />
    </div>
  );
}

function Template() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-center justify-start p-0 relative shadow-[0px_1px_6px_0px_rgba(0,0,0,0.2)] shrink-0 w-full"
      data-name="Template"
    >
      <TopRow />
    </div>
  );
}

function NavigationBarIgt() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col items-start justify-start left-0 p-0 top-0 w-[1920px]"
      data-name="🟢 Navigation bar (IGT)"
    >
      <Template />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-6" data-name="Icon">
      <div className="absolute bottom-0 left-[-4.167%] right-[-4.167%] top-0">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 26 24"
        >
          <g
            clipPath="url(#clip0_1_10615)"
            filter="url(#filter0_d_1_10615)"
            id="Icon"
          >
            <g filter="url(#filter1_d_1_10615)" id="path">
              <path
                d={svgPaths.p3a1b6200}
                fill="var(--fill-0, white)"
                fillOpacity="0.8"
                shapeRendering="crispEdges"
              />
            </g>
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="28"
              id="filter0_d_1_10615"
              width="28"
              x="-1"
              y="-2"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                result="hardAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="1" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
              />
              <feBlend
                in2="BackgroundImageFix"
                mode="normal"
                result="effect1_dropShadow_1_10615"
              />
              <feBlend
                in="SourceGraphic"
                in2="effect1_dropShadow_1_10615"
                mode="normal"
                result="shape"
              />
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="14"
              id="filter1_d_1_10615"
              width="24"
              x="2"
              y="6"
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
                result="effect1_dropShadow_1_10615"
              />
              <feBlend
                in="SourceGraphic"
                in2="effect1_dropShadow_1_10615"
                mode="normal"
                result="shape"
              />
            </filter>
            <clipPath id="clip0_1_10615">
              <rect
                fill="white"
                height="24"
                transform="translate(1)"
                width="24"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function ButtonIgt2() {
  return (
    <button
      className="absolute bg-[rgba(89,89,89,0.55)] box-border content-stretch cursor-pointer flex flex-row gap-2 items-center justify-center left-4 overflow-visible px-4 py-2 rounded-sm top-[765px]"
      data-name="🟢 Button (IGT)"
    >
      <Icon2 />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-left text-nowrap">
        <p className="block leading-[22px] whitespace-pre">Show X-Ray</p>
      </div>
    </button>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-6" data-name="Icon">
      <div className="absolute bottom-[-2.083%] left-0 right-0 top-[-2.083%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 24 26"
        >
          <g
            clipPath="url(#clip0_1_10555)"
            filter="url(#filter0_d_1_10555)"
            id="Icon"
          >
            <g filter="url(#filter1_d_1_10555)" id="path">
              <path
                d={svgPaths.p3ea86a00}
                fill="var(--fill-0, white)"
                fillOpacity="0.8"
                shapeRendering="crispEdges"
              />
            </g>
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="28"
              id="filter0_d_1_10555"
              width="28"
              x="-2"
              y="-1"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                result="hardAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="1" />
              <feComposite in2="hardAlpha" operator="out" />
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
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="23"
              id="filter1_d_1_10555"
              width="10"
              x="8"
              y="2.5"
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
                result="effect1_dropShadow_1_10555"
              />
              <feBlend
                in="SourceGraphic"
                in2="effect1_dropShadow_1_10555"
                mode="normal"
                result="shape"
              />
            </filter>
            <clipPath id="clip0_1_10555">
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
  );
}

function ButtonIgt3() {
  return (
    <div
      className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-row gap-2 items-center justify-center px-3 py-2 relative rounded-sm shrink-0"
      data-name="🟢 Button (IGT)"
    >
      <Icon3 />
    </div>
  );
}

function VirtualRulerButton() {
  return (
    <button
      className="box-border content-stretch flex flex-row items-start justify-start overflow-visible p-0 relative shrink-0"
      data-name="Virtual Ruler Button"
    >
      <ButtonIgt3 />
    </button>
  );
}

function EyeOffOutline() {
  return (
    <div className="relative shrink-0 size-6" data-name="EyeOffOutline">
      <div className="absolute bottom-[-5.833%] left-[-5.625%] right-[-5.625%] top-[-5.417%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 28 28"
        >
          <g
            clipPath="url(#clip0_1_10603)"
            filter="url(#filter0_d_1_10603)"
            id="EyeOffOutline"
          >
            <g filter="url(#filter1_d_1_10603)" id="path">
              <path
                d={svgPaths.p2c140d00}
                fill="var(--fill-0, white)"
                fillOpacity="0.8"
                shapeRendering="crispEdges"
              />
            </g>
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="28"
              id="filter0_d_1_10603"
              width="28"
              x="0"
              y="0"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                result="hardAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="1" />
              <feComposite in2="hardAlpha" operator="out" />
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
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="24.7"
              id="filter1_d_1_10603"
              width="24.7"
              x="2.64999"
              y="2.70001"
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
                result="effect1_dropShadow_1_10603"
              />
              <feBlend
                in="SourceGraphic"
                in2="effect1_dropShadow_1_10603"
                mode="normal"
                result="shape"
              />
            </filter>
            <clipPath id="clip0_1_10603">
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
  );
}

function ButtonIgt4() {
  return (
    <button
      className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-row gap-2 items-center justify-center overflow-visible px-3 py-2 relative rounded-sm shrink-0"
      data-name="🟢 Button (IGT)"
    >
      <EyeOffOutline />
    </button>
  );
}

function HorizontalButtonContainer() {
  return (
    <div
      className="absolute box-border content-stretch cursor-pointer flex flex-row gap-2 items-center justify-start left-2 p-0 top-[678px]"
      data-name="Horizontal Button Container"
    >
      <VirtualRulerButton />
      <ButtonIgt4 />
    </div>
  );
}

function Bookmark() {
  return (
    <div className="absolute left-1 size-6 top-[-1px]" data-name="Bookmark">
      <div className="absolute bottom-[-4.167%] left-0 right-0 top-0">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 24 25"
        >
          <g
            clipPath="url(#clip0_1_10600)"
            filter="url(#filter0_d_1_10600)"
            id="Bookmark"
          >
            <g filter="url(#filter1_d_1_10600)" id="path">
              <path
                d="M18 23L12 17L6 23V1H18V23Z"
                fill="var(--fill-0, #FF9F19)"
              />
            </g>
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="26"
              id="filter0_d_1_10600"
              width="26"
              x="0"
              y="0"
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
                result="effect1_dropShadow_1_10600"
              />
              <feBlend
                in="SourceGraphic"
                in2="effect1_dropShadow_1_10600"
                mode="normal"
                result="shape"
              />
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="24"
              id="filter1_d_1_10600"
              width="14"
              x="6"
              y="1"
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
                result="effect1_dropShadow_1_10600"
              />
              <feBlend
                in="SourceGraphic"
                in2="effect1_dropShadow_1_10600"
                mode="normal"
                result="shape"
              />
            </filter>
            <clipPath id="clip0_1_10600">
              <rect fill="white" height="24" width="24" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Bookmark1() {
  return (
    <div
      className="relative shadow-[1px_1px_1px_0px_#000000] size-8"
      data-name="Bookmark"
    >
      <Bookmark />
      <div className="absolute h-2.5 left-2.5 top-[22px] w-3">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 12 10"
        >
          <path
            d="M6 0L0 6V10H12V6L6 0Z"
            fill="var(--fill-0, #FF9F19)"
            id="Vector 92"
          />
        </svg>
      </div>
      <div className="absolute font-['CentraleSans:Bold',_sans-serif] leading-[0] left-4 not-italic text-[#000000] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">
        <p className="block leading-[18px] whitespace-pre">1</p>
      </div>
    </div>
  );
}

function Bookmark2() {
  return (
    <div className="absolute left-1 size-6 top-[-1px]" data-name="Bookmark">
      <div className="absolute bottom-[-4.167%] left-0 right-0 top-0">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 24 25"
        >
          <g
            clipPath="url(#clip0_1_10600)"
            filter="url(#filter0_d_1_10600)"
            id="Bookmark"
          >
            <g filter="url(#filter1_d_1_10600)" id="path">
              <path
                d="M18 23L12 17L6 23V1H18V23Z"
                fill="var(--fill-0, #FF9F19)"
              />
            </g>
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="26"
              id="filter0_d_1_10600"
              width="26"
              x="0"
              y="0"
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
                result="effect1_dropShadow_1_10600"
              />
              <feBlend
                in="SourceGraphic"
                in2="effect1_dropShadow_1_10600"
                mode="normal"
                result="shape"
              />
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="24"
              id="filter1_d_1_10600"
              width="14"
              x="6"
              y="1"
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
                result="effect1_dropShadow_1_10600"
              />
              <feBlend
                in="SourceGraphic"
                in2="effect1_dropShadow_1_10600"
                mode="normal"
                result="shape"
              />
            </filter>
            <clipPath id="clip0_1_10600">
              <rect fill="white" height="24" width="24" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Bookmark3() {
  return (
    <div
      className="relative shadow-[1px_1px_1px_0px_#000000] size-8"
      data-name="Bookmark"
    >
      <Bookmark2 />
      <div className="absolute font-['CentraleSans:Bold',_sans-serif] leading-[0] left-[16.5px] not-italic text-[#000000] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">
        <p className="block leading-[18px] whitespace-pre">2</p>
      </div>
    </div>
  );
}

function Bookmark4() {
  return (
    <div className="relative size-8" data-name="Bookmark">
      <div className="absolute bottom-[-9.375%] left-0 right-0 top-0">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 32 35"
        >
          <g filter="url(#filter0_d_1_10641)" id="Bookmark">
            <path
              d="M16 23L10 29V33H22V29L16 23Z"
              fill="var(--fill-0, #FF9F19)"
              id="Vector 92"
            />
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="35"
              id="filter0_d_1_10641"
              width="34"
              x="0"
              y="0"
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
                result="effect1_dropShadow_1_10641"
              />
              <feBlend
                in="SourceGraphic"
                in2="effect1_dropShadow_1_10641"
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

function MeasurementContainer() {
  return (
    <div
      className="absolute contents left-[288.808px] top-[194.2px]"
      data-name="Measurement Container"
    >
      <div className="absolute flex h-[71.409px] items-center justify-center left-[305.509px] top-[198.917px] w-[38.464px]">
        <div className="flex-none rotate-[73.182deg]">
          <div
            className="bg-[#000000] h-[19.419px] relative rounded-[13px] w-[68.747px]"
            data-name="Measurement Background"
          >
            <div className="absolute border border-[#ffffff] border-solid inset-0 pointer-events-none rounded-[13px]" />
          </div>
        </div>
      </div>
      <div className="absolute flex h-[13.109px] items-center justify-center left-[324.184px] top-[226.437px] translate-x-[-50%] w-[19.585px]">
        <div className="flex-none rotate-[72.297deg]">
          <div className="font-['CentraleSans:Bold',_sans-serif] leading-[0] not-italic relative text-[#ffffff] text-[12px] text-center text-nowrap">
            <p className="block leading-[18px] whitespace-pre">A</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LeftImageContainer() {
  return (
    <div
      className="absolute h-[796px] left-1/2 top-0 translate-x-[-50%] w-[718px]"
      data-name="Left Image Container"
    >
      <div
        className="absolute bg-center bg-cover bg-no-repeat h-[796px] left-0 top-0 w-[718px]"
        data-name="postrecord 2"
        style={{ backgroundImage: `url('${imgPostrecord2}')` }}
      />
      <HorizontalButtonContainer />
      <div className="absolute flex h-[32.683px] items-center justify-center left-[340.327px] top-[355.03px] w-[33.014px]">
        <div className="flex-none rotate-[60deg]">
          <div className="h-[24.5px] relative w-[23.601px]">
            <div className="absolute bottom-[-10.204%] left-[-2.119%] right-[-10.593%] top-[-2.62%]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 28 28"
              >
                <g filter="url(#filter0_d_1_10598)" id="Vector 19">
                  <path d={svgPaths.p2c1cd3c0} fill="var(--fill-0, #FFDD19)" />
                  <path
                    d={svgPaths.p2c1cd3c0}
                    stroke="var(--stroke-0, black)"
                  />
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
        </div>
      </div>
      <div className="absolute flex h-[44.856px] items-center justify-center left-[393px] top-[394px] w-[44.856px]">
        <div className="flex-none rotate-[52.61deg]">
          <Bookmark1 />
        </div>
      </div>
      <div className="absolute flex h-[43.713px] items-center justify-center left-[442px] top-[453px] w-[43.713px]">
        <div className="flex-none rotate-[60deg]">
          <Bookmark3 />
        </div>
      </div>
      <div className="absolute flex h-[43.713px] items-center justify-center left-[481px] top-[515px] w-[43.713px]">
        <div className="flex-none rotate-[60deg]">
          <Bookmark4 />
        </div>
      </div>
      <div className="absolute h-[181.5px] left-[295px] top-[139px] w-[60px]">
        <div className="absolute bottom-[-10.469%] left-[-31.671%] right-[-31.669%] top-[-10.47%]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 98 220"
          >
            <path
              d={svgPaths.p1ea4ea00}
              id="Vector 22"
              stroke="var(--stroke-0, white)"
              strokeLinecap="round"
              strokeOpacity="0.25"
              strokeWidth="38"
            />
          </svg>
        </div>
      </div>
      <MeasurementContainer />
    </div>
  );
}

function LeftPanel() {
  return (
    <div
      className="bg-[#000000] h-[724px] overflow-clip relative shrink-0 w-[936px]"
      data-name="Left Panel"
    >
      <LeftImageContainer />
    </div>
  );
}

function Component2() {
  return (
    <div
      className="absolute left-[82.965px] size-[664.617px] top-[36.817px]"
      data-name="Component 2"
    >
      <div className="absolute bottom-[49.422%] left-[49.175%] right-[49.505%] top-[49.256%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 9 9"
        >
          <ellipse
            cx="4.38692"
            cy="4.39415"
            fill="var(--fill-0, #FF830F)"
            id="Ellipse 35"
            rx="4.38692"
            ry="4.39415"
          />
        </svg>
      </div>
      <div className="absolute bg-[#ff830f] bottom-[49.422%] left-[39.769%] right-[59.901%] top-[49.091%]">
        <div className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none" />
      </div>
      <div className="absolute bg-[#ff830f] bottom-[49.422%] left-[29.868%] right-[69.802%] top-[49.091%]">
        <div className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none" />
      </div>
      <div className="absolute bg-[#ff830f] bottom-[49.422%] left-[59.571%] right-[40.099%] top-[49.091%]">
        <div className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none" />
      </div>
      <div className="absolute bottom-[40.165%] flex items-center justify-center left-[49.175%] right-[49.34%] top-[59.504%]">
        <div className="flex-none h-[9.871px] rotate-[270deg] w-[2.197px]">
          <div className="bg-[#ff830f] relative size-full">
            <div className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-[99.669%] flex items-center justify-center left-[49.175%] right-[49.34%] top-0">
        <div className="flex-none h-[9.871px] rotate-[270deg] w-[2.197px]">
          <div className="bg-[#ff830f] relative size-full">
            <div className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-[30.083%] flex items-center justify-center left-[49.175%] right-[49.34%] top-[69.587%]">
        <div className="flex-none h-[9.871px] rotate-[270deg] w-[2.197px]">
          <div className="bg-[#ff830f] relative size-full">
            <div className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-[89.752%] flex items-center justify-center left-[49.175%] right-[49.34%] top-[9.917%]">
        <div className="flex-none h-[9.871px] rotate-[270deg] w-[2.197px]">
          <div className="bg-[#ff830f] relative size-full">
            <div className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-[19.669%] flex items-center justify-center left-[49.175%] right-[49.34%] top-[80%]">
        <div className="flex-none h-[9.871px] rotate-[270deg] w-[2.197px]">
          <div className="bg-[#ff830f] relative size-full">
            <div className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-[79.835%] flex items-center justify-center left-[49.175%] right-[49.34%] top-[19.835%]">
        <div className="flex-none h-[9.871px] rotate-[270deg] w-[2.197px]">
          <div className="bg-[#ff830f] relative size-full">
            <div className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-[10.083%] flex items-center justify-center left-[49.175%] right-[49.34%] top-[89.587%]">
        <div className="flex-none h-[9.871px] rotate-[270deg] w-[2.197px]">
          <div className="bg-[#ff830f] relative size-full">
            <div className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-[69.752%] flex items-center justify-center left-[49.175%] right-[49.34%] top-[29.917%]">
        <div className="flex-none h-[9.871px] rotate-[270deg] w-[2.197px]">
          <div className="bg-[#ff830f] relative size-full">
            <div className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 flex items-center justify-center left-[49.175%] right-[49.34%] top-[99.669%]">
        <div className="flex-none h-[9.871px] rotate-[270deg] w-[2.197px]">
          <div className="bg-[#ff830f] relative size-full">
            <div className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-[59.835%] flex items-center justify-center left-[49.175%] right-[49.34%] top-[39.835%]">
        <div className="flex-none h-[9.871px] rotate-[270deg] w-[2.197px]">
          <div className="bg-[#ff830f] relative size-full">
            <div className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none" />
          </div>
        </div>
      </div>
      <div className="absolute bg-[#ff830f] bottom-[49.422%] left-[69.637%] right-[30.033%] top-[49.091%]">
        <div className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none" />
      </div>
      <div className="absolute bg-[#ff830f] bottom-[49.422%] left-[79.703%] right-[19.967%] top-[49.091%]">
        <div className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none" />
      </div>
      <div className="absolute bg-[#ff830f] bottom-[49.422%] left-[89.604%] right-[10.066%] top-[49.091%]">
        <div className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none" />
      </div>
      <div className="absolute bg-[#ff830f] bottom-[49.422%] left-[99.67%] right-0 top-[49.091%]">
        <div className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none" />
      </div>
      <div className="absolute bottom-[49.464%] font-['CentraleSans:Book',_sans-serif] leading-[0] left-[92.739%] not-italic right-[3.499%] text-[#ff9f19] text-[10px] text-left text-nowrap top-[48.43%]">
        <p className="block leading-[14px] whitespace-pre">1 mm</p>
      </div>
      <div className="absolute bg-[#ff830f] bottom-[49.422%] left-[19.802%] right-[79.868%] top-[49.091%]">
        <div className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none" />
      </div>
      <div className="absolute bg-[#ff830f] bottom-[49.422%] left-[9.901%] right-[89.769%] top-[49.091%]">
        <div className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none" />
      </div>
      <div className="absolute bg-[#ff830f] bottom-[49.422%] left-0 right-[99.67%] top-[49.091%]">
        <div className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none" />
      </div>
    </div>
  );
}

function RightImageContainer() {
  return (
    <div
      className="absolute contents left-[77px] top-[30px]"
      data-name="Right Image Container"
    >
      <div
        className="absolute bg-center bg-cover bg-no-repeat left-[77px] size-[664.617px] top-[30px]"
        data-name="Sequence 01 1"
        style={{ backgroundImage: `url('${imgSequence011}')` }}
      />
      <Component2 />
    </div>
  );
}

function RightPanel() {
  return (
    <div
      className="h-[742px] relative shrink-0 w-[824px]"
      data-name="Right Panel"
    >
      <RightImageContainer />
    </div>
  );
}

function HorizontalContainer() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row gap-6 h-[742px] items-start justify-center left-4 p-0 top-[87px] w-[1784px]"
      data-name="Horizontal Container"
    >
      <LeftPanel />
      <RightPanel />
    </div>
  );
}

function Clippath1() {
  return (
    <div
      className="absolute bottom-[66.48%] contents left-[4.537%] right-[4.537%] top-[7.821%]"
      data-name="clippath-1"
    >
      <div
        className="absolute bottom-[66.48%] left-[4.537%] right-[4.537%] top-[7.821%]"
        data-name="Vector"
      >
        <img
          className="block max-w-none size-full"
          height="45.999996185302734"
          loading="lazy"
          src={imgVector}
          width="1403"
        />
      </div>
    </div>
  );
}

function Group() {
  return (
    <div
      className="absolute bottom-[67.737%] contents left-[4.537%] right-[4.413%] top-[7.263%]"
      data-name="Group"
    >
      <div
        className="absolute bottom-[67.737%] left-[4.537%] right-[4.413%] top-[7.263%]"
        data-name="Vector"
      >
        <img
          className="block max-w-none size-full"
          height="44.75"
          loading="lazy"
          src={imgVector1}
          width="1404.893310546875"
        />
      </div>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div
      className="absolute bottom-[66.48%] contents left-[4.537%] right-[4.537%] top-[7.821%]"
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
      className="absolute bottom-[66.48%] contents left-[4.537%] right-[4.537%] top-[7.821%]"
      data-name="Group"
    >
      <ClipPathGroup />
    </div>
  );
}

function ClipPathGroup1() {
  return (
    <div
      className="absolute bottom-[66.48%] contents left-[4.537%] right-[4.537%] top-[7.821%]"
      data-name="Clip path group"
    >
      <Group1 />
    </div>
  );
}

function Group2() {
  return (
    <div
      className="absolute bottom-[86.592%] left-[83.765%] right-[4.537%] top-[8.38%]"
      data-name="Group"
    >
      <div className="absolute bottom-[-11.111%] left-[-0.025%] right-[-0.372%] top-[-8.239%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 183 11"
        >
          <g id="Group">
            <path
              d={svgPaths.p360fd480}
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
      className="absolute bottom-[86.592%] contents left-[83.765%] right-[4.537%] top-[8.38%]"
      data-name="Clip path group"
    >
      <Group2 />
    </div>
  );
}

function Clippath2() {
  return (
    <div
      className="absolute bottom-[18.715%] contents left-[4.537%] right-[4.342%] top-[59.131%]"
      data-name="clippath-1"
    >
      <div className="absolute bottom-[18.715%] flex items-center justify-center left-[4.537%] right-[4.342%] top-[59.131%]">
        <div className="flex-none h-[39.656px] scale-y-[-100%] w-[1405.99px]">
          <div className="relative size-full" data-name="Vector">
            <img
              className="block max-w-none size-full"
              height="39.65568923950195"
              loading="lazy"
              src={imgVector2}
              width="1405.9915771484375"
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
      className="absolute bottom-[17.318%] contents left-[4.537%] right-[4.436%] top-[58.101%]"
      data-name="Group"
    >
      <div className="absolute bottom-[17.318%] flex items-center justify-center left-[4.537%] right-[4.436%] top-[58.101%]">
        <div className="flex-none h-11 scale-y-[-100%] w-[1404.55px]">
          <div className="relative size-full" data-name="Vector">
            <img
              className="block max-w-none size-full"
              height="44"
              loading="lazy"
              src={imgVector3}
              width="1404.5511474609375"
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
      className="absolute bottom-[18.715%] contents left-[4.537%] right-[4.342%] top-[59.131%]"
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
      className="absolute bottom-[18.715%] contents left-[4.537%] right-[4.342%] top-[59.131%]"
      data-name="Group"
    >
      <ClipPathGroup3 />
    </div>
  );
}

function ClipPathGroup4() {
  return (
    <div
      className="absolute bottom-[18.715%] contents left-[4.537%] right-[4.342%] top-[59.131%]"
      data-name="Clip path group"
    >
      <Group4 />
    </div>
  );
}

function Group26() {
  return (
    <div className="absolute contents right-0 top-[5px]">
      <div className="absolute bg-neutral-900 h-[26px] right-0 top-[5px] w-6" />
      <div className="absolute font-['CentraleSans:Bold',_sans-serif] h-[30px] leading-[0] not-italic right-[16.5px] text-[#ff9f19] text-[22px] text-center top-[5px] translate-x-[50%] w-[19px]">
        <p className="block leading-[22px]">P</p>
      </div>
    </div>
  );
}

function CoregMarker() {
  return (
    <div
      className="absolute bottom-[3px] h-[35px] left-[4.537%] overflow-clip right-[4.537%]"
      data-name="Coreg Marker"
    >
      <div className="absolute bg-neutral-900 h-[27px] left-0 top-1 w-[26px]" />
      <div className="absolute font-['CentraleSans:Bold',_sans-serif] h-[30px] leading-[0] left-[14.5px] not-italic text-[#ff9f19] text-[22px] text-center top-[5px] translate-x-[-50%] w-[19px]">
        <p className="block leading-[22px]">D</p>
      </div>
      <Group26 />
    </div>
  );
}

function CoRegistrationLine() {
  return (
    <div
      className="absolute h-[174px] left-[5.833%] right-[5.926%] top-[25px]"
      data-name="Co-registration Line"
    />
  );
}

function Bookmark5() {
  return (
    <div className="absolute left-1 size-6 top-[-1px]" data-name="Bookmark">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Bookmark">
          <path
            d="M18 23L12 17L6 23V1H18V23Z"
            fill="var(--fill-0, #FF9F19)"
            id="path"
          />
        </g>
      </svg>
    </div>
  );
}

function Bookmark6() {
  return (
    <div
      className="absolute left-[774px] size-8 top-[147px]"
      data-name="Bookmark"
    >
      <Bookmark5 />
      <div className="absolute h-2.5 left-2.5 top-[22px] w-3">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 12 10"
        >
          <path
            d="M6 0L0 6V10H12V6L6 0Z"
            fill="var(--fill-0, #FF9F19)"
            id="Vector 92"
          />
        </svg>
      </div>
      <div className="absolute font-['CentraleSans:Bold',_sans-serif] leading-[0] left-4 not-italic text-[#000000] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">
        <p className="block leading-[18px] whitespace-pre">1</p>
      </div>
    </div>
  );
}

function Bookmark7() {
  return (
    <div className="absolute left-1 size-6 top-[-1px]" data-name="Bookmark">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Bookmark">
          <path
            d="M18 23L12 17L6 23V1H18V23Z"
            fill="var(--fill-0, #FF9F19)"
            id="path"
          />
        </g>
      </svg>
    </div>
  );
}

function Bookmark8() {
  return (
    <div
      className="absolute left-[870px] size-8 top-[147px]"
      data-name="Bookmark"
    >
      <Bookmark7 />
      <div className="absolute font-['CentraleSans:Bold',_sans-serif] leading-[0] left-[16.5px] not-italic text-[#000000] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">
        <p className="block leading-[18px] whitespace-pre">2</p>
      </div>
    </div>
  );
}

function Bookmark9() {
  return (
    <div
      className="absolute left-[988px] size-8 top-[147px]"
      data-name="Bookmark"
    >
      <div className="absolute bottom-[-3.125%] left-0 right-0 top-0">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 32 33"
        >
          <g id="Bookmark">
            <path
              d="M16 23L10 29V33H22V29L16 23Z"
              fill="var(--fill-0, #FF9F19)"
              id="Vector 92"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Ild() {
  return (
    <div
      className="absolute h-[179px] left-4 top-[829px] w-[1543px]"
      data-name="ILD"
    >
      <div
        className="absolute bg-[#212121] inset-0"
        data-name="Background Rounded Rectangle"
      />
      <div className="absolute bottom-[3.352%] left-[4.537%] right-[4.537%] top-[3.352%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 1403 167"
        >
          <path
            d="M0 0H1403V167H0V0Z"
            fill="var(--fill-0, #171717)"
            id="Rectangle 144"
          />
        </svg>
      </div>
      <ClipPathGroup1 />
      <ClipPathGroup2 />
      <div
        className="absolute bottom-[77.095%] left-[4.537%] right-[18.341%] top-[10.056%]"
        data-name="Vector"
      >
        <div className="absolute bottom-[-4.348%] left-0 right-0 top-[-4.348%]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 1190 25"
          >
            <path
              d={svgPaths.p16a31d00}
              id="Vector"
              stroke="var(--stroke-0, #23CC72)"
              strokeMiterlimit="10"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
      <div className="absolute h-[31px] left-[4.537%] right-[4.342%] top-[29px]">
        <div className="absolute bottom-[-3.227%] left-[-0.041%] right-0 top-[-3.227%]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 1407 33"
          >
            <path
              d={svgPaths.p33173e00}
              id="Vector 20"
              stroke="var(--stroke-0, #41C9FE)"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
      <ClipPathGroup4 />
      <div className="absolute bottom-[17.877%] flex items-center justify-center left-[4.537%] right-[4.342%] top-[68.715%]">
        <div className="flex-none h-6 scale-y-[-100%] w-[1406px]">
          <div className="relative size-full" data-name="Vector">
            <div className="absolute bottom-[-4.167%] left-0 right-[-0.045%] top-[-3.243%]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 1407 26"
              >
                <path
                  d={svgPaths.p108e7200}
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
      <div className="absolute flex h-[31px] items-center justify-center left-[4.537%] right-[4.537%] top-[103px]">
        <div className="flex-none h-[31px] scale-y-[-100%] w-[1403px]">
          <div className="relative size-full">
            <div className="absolute bottom-[-3.228%] left-[-0.046%] right-0 top-[-3.227%]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 1404 33"
              >
                <path
                  d={svgPaths.p207768c0}
                  id="Vector 21"
                  stroke="var(--stroke-0, #41C9FE)"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <CoregMarker />
      <div className="absolute flex h-[12.496px] items-center justify-center right-[275.761px] top-1.5 w-[13.682px]">
        <div className="flex-none rotate-[218.66deg]">
          <div className="h-[5.518px] relative w-[13.113px]">
            <div className="absolute bottom-[-16.706%] left-[-2.958%] right-[-2.958%] top-[-16.706%]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 15 8"
              >
                <path
                  d="M1 1L14.1129 6.51751"
                  id="Line 218"
                  stroke="var(--stroke-0, #23CC72)"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[63.415%] right-[233px] top-[5.028%] w-[47px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 47 57"
        >
          <path
            d={svgPaths.p12da6a00}
            fill="var(--fill-0, #171717)"
            id="Vector 3"
          />
        </svg>
      </div>
      <div className="absolute flex h-[13.246px] items-center justify-center right-[233.332px] top-[6px] w-[14.184px]">
        <div className="flex-none rotate-[220.601deg]">
          <div className="h-[5.42px] relative w-[14.051px]">
            <div className="absolute bottom-[-17.215%] left-[-2.561%] right-[-2.561%] top-[-17.215%]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 16 8"
              >
                <path
                  d="M1 1L15.051 6.4198"
                  id="Line 219"
                  stroke="var(--stroke-0, #23CC72)"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <CoRegistrationLine />
      <Bookmark6 />
      <Bookmark8 />
      <Bookmark9 />
    </div>
  );
}

function DlsFrameFirst48() {
  return (
    <div
      className="absolute left-1/2 size-6 translate-x-[-50%] translate-y-[-50%]"
      data-name="DLS_FrameFirst_48"
      style={{ top: "calc(50% - 0.364754px)" }}
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
      className="absolute bg-[#212121] bottom-[7.15%] left-4 overflow-clip top-[77.227%] w-[70px]"
      data-name="Prev Frame"
    >
      <DlsFrameFirst48 />
    </div>
  );
}

function DlsFrameLast48() {
  return (
    <div
      className="absolute left-1/2 size-6 translate-x-[-50%] translate-y-[-50%]"
      data-name="DLS_FrameLast_48"
      style={{ top: "calc(50% - 0.364754px)" }}
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
      className="absolute bg-[#212121] bottom-[7.15%] overflow-clip right-[361px] top-[77.227%] w-[70px]"
      data-name="Next Frame"
    >
      <DlsFrameLast48 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-6" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Icon">
          <path d={svgPaths.p9b98300} fill="var(--fill-0, #E8E8E8)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div
      className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-row gap-2 items-center justify-center px-4 py-2 relative rounded-sm shrink-0 w-[214px]"
      data-name="Button"
    >
      <Icon4 />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-left text-nowrap">
        <p className="block leading-[22px] whitespace-pre">Annotate</p>
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-6" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Icon">
          <path
            d={svgPaths.p28d83c80}
            fill="var(--fill-0, #E8E8E8)"
            id="path"
          />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div
      className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-row gap-2 items-center justify-center px-4 py-2 relative rounded-sm shrink-0 w-[214px]"
      data-name="Button"
    >
      <Icon5 />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-left text-nowrap">
        <p className="block leading-[22px] whitespace-pre">Save Frame</p>
      </div>
    </div>
  );
}

function LeftButtons() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row gap-4 items-start justify-start left-0 p-0 top-0"
      data-name="Left buttons"
    >
      <Button1 />
      <Button2 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-6" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Icon">
          <path
            d="M18 23L12 17L6 23V1H18V23Z"
            fill="var(--fill-0, #E8E8E8)"
            id="path"
          />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div
      className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-row gap-2 items-center justify-center px-4 py-2 relative rounded-sm shrink-0 w-[214px]"
      data-name="Button"
    >
      <Icon6 />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-left text-nowrap">
        <p className="block leading-[22px] whitespace-pre">Bookmark</p>
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-6" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Icon">
          <path
            d={svgPaths.p1d906500}
            fill="var(--fill-0, #E8E8E8)"
            id="path"
          />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div
      className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-row gap-2 items-center justify-center px-4 py-2 relative rounded-sm shrink-0 w-[214px]"
      data-name="Button"
    >
      <Icon7 />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-left text-nowrap">
        <p className="block leading-[22px] whitespace-pre">Playback</p>
      </div>
    </div>
  );
}

function Frame39() {
  return (
    <div className="box-border content-stretch flex flex-row gap-4 items-start justify-start p-0 relative shrink-0">
      <Button4 />
    </div>
  );
}

function Camera() {
  return (
    <div className="relative shrink-0 size-6" data-name="Camera">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Camera">
          <path d={svgPaths.p264ecd40} fill="var(--fill-0, white)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt5() {
  return (
    <div
      className="bg-[#1474a4] box-border content-stretch flex flex-row gap-2 items-center justify-center px-4 py-2 relative rounded-sm shrink-0 w-[214px]"
      data-name="🟢 Button (IGT)"
    >
      <Camera />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap">
        <p className="block leading-[22px] whitespace-pre">Live</p>
      </div>
    </div>
  );
}

function RightButtons() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row gap-4 items-start justify-start p-0 right-0 top-0"
      data-name="Right buttons"
    >
      <Button3 />
      <Frame39 />
      <ButtonIgt5 />
    </div>
  );
}

function ActionBarBeacon() {
  return (
    <div
      className="absolute h-10 left-4 top-[1024px] w-[1888px]"
      data-name="Action-bar / Beacon"
    >
      <LeftButtons />
      <RightButtons />
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

function SideButton() {
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

function SideButton1() {
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

function SideButton2() {
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

function AutoBorder() {
  return (
    <div className="absolute left-7 size-8 top-3" data-name="AutoBorder">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="AutoBorder">
          <path
            d={svgPaths.p2ca05000}
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
      <AutoBorder />
      <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-11 not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-12 translate-x-[-50%]">
        <p className="block leading-[20px] whitespace-pre">Auto Borders</p>
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

function FieldOfViewIcon() {
  return (
    <div className="absolute left-7 size-8 top-3" data-name="FieldOfViewIcon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="FieldOfViewIcon">
          <path
            d={svgPaths.p17c13900}
            fill="var(--fill-0, #D1D1D1)"
            id="Union"
          />
          <path
            d={svgPaths.p23655800}
            fill="var(--fill-0, #C4C4C4)"
            id="Subtract"
          />
        </g>
      </svg>
    </div>
  );
}

function SideButton5() {
  return (
    <div
      className="bg-neutral-900 h-[76px] overflow-clip relative rounded-sm shrink-0 w-[88px]"
      data-name="SideButton"
    >
      <FieldOfViewIcon />
      <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-11 not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-12 translate-x-[-50%]">
        <p className="block leading-[20px] whitespace-pre">50</p>
      </div>
      <div className="absolute h-3.5 left-[9px] top-[31px] w-[7px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 7 14"
        >
          <path
            d="M0 7L7 0V14L0 7Z"
            fill="var(--fill-0, white)"
            fillOpacity="0.8"
            id="Vector 55"
          />
        </svg>
      </div>
    </div>
  );
}

function ContrastBrightness32() {
  return (
    <div
      className="absolute left-7 size-8 top-3"
      data-name="ContrastBrightness_32"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="ContrastBrightness_32">
          <path
            d={svgPaths.p3349c100}
            fill="var(--fill-0, white)"
            fillOpacity="0.8"
            id="path"
          />
        </g>
      </svg>
    </div>
  );
}

function SideButton6() {
  return (
    <div
      className="bg-neutral-900 h-[76px] overflow-clip relative rounded-sm shrink-0 w-[88px]"
      data-name="SideButton"
    >
      <ContrastBrightness32 />
      <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-11 not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-12 translate-x-[-50%]">
        <p className="block leading-[20px] whitespace-pre">50</p>
      </div>
      <div className="absolute h-3.5 left-[9px] top-[31px] w-[7px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 7 14"
        >
          <path
            d="M0 7L7 0V14L0 7Z"
            fill="var(--fill-0, white)"
            fillOpacity="0.8"
            id="Vector 55"
          />
        </svg>
      </div>
    </div>
  );
}

function RevolveCenter32() {
  return (
    <div className="absolute left-7 size-8 top-3" data-name="RevolveCenter_32">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="RevolveCenter_32">
          <path d={svgPaths.p642e380} fill="var(--fill-0, #8C8C8C)" id="path" />
          <path
            d={svgPaths.p1b2b1700}
            fill="var(--fill-0, white)"
            fillOpacity="0.8"
            id="path_2"
          />
        </g>
      </svg>
    </div>
  );
}

function SideButton7() {
  return (
    <div
      className="bg-neutral-900 h-[76px] overflow-clip relative rounded-sm shrink-0 w-[88px]"
      data-name="SideButton"
    >
      <RevolveCenter32 />
      <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-[44.5px] not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-12 translate-x-[-50%]">
        <p className="block leading-[20px] whitespace-pre">Revolve</p>
      </div>
    </div>
  );
}

function RotateIldHorizontal() {
  return (
    <div
      className="absolute left-7 size-8 top-3"
      data-name="RotateILDHorizontal"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="RotateILDHorizontal">
          <path
            d={svgPaths.p25d07070}
            fill="var(--fill-0, #8C8C8C)"
            id="path"
          />
          <path
            d={svgPaths.p5a9e00}
            fill="var(--fill-0, white)"
            fillOpacity="0.8"
            id="path_2"
          />
        </g>
      </svg>
    </div>
  );
}

function SideButton8() {
  return (
    <div
      className="bg-neutral-900 h-[76px] overflow-clip relative rounded-sm shrink-0 w-[88px]"
      data-name="SideButton"
    >
      <RotateIldHorizontal />
      <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-[44.5px] not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-12 translate-x-[-50%]">
        <p className="block leading-[20px] whitespace-pre">Rotate ILD</p>
      </div>
    </div>
  );
}

function GraphicIldIcon() {
  return (
    <div className="absolute left-7 size-8 top-3" data-name="Graphic ILD Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="Graphic ILD Icon">
          <path
            clipRule="evenodd"
            d={svgPaths.p1bc4b180}
            fill="var(--fill-0, #8C8C8C)"
            fillRule="evenodd"
            id="Vector 1 (Stroke)"
          />
          <path
            clipRule="evenodd"
            d={svgPaths.p22762b00}
            fill="var(--fill-0, white)"
            fillOpacity="0.8"
            fillRule="evenodd"
            id="Vector 3 (Stroke)"
          />
          <path
            clipRule="evenodd"
            d={svgPaths.p21d14a00}
            fill="var(--fill-0, #8C8C8C)"
            fillRule="evenodd"
            id="Vector 2 (Stroke)"
          />
          <path
            clipRule="evenodd"
            d={svgPaths.p1e3e7b80}
            fill="var(--fill-0, white)"
            fillOpacity="0.8"
            fillRule="evenodd"
            id="Vector 4 (Stroke)"
          />
        </g>
      </svg>
    </div>
  );
}

function SideButton9() {
  return (
    <div
      className="bg-neutral-900 h-[73px] overflow-clip relative rounded-sm shrink-0 w-[88px]"
      data-name="SideButton"
    >
      <GraphicIldIcon />
      <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-11 not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-12 translate-x-[-50%]">
        <p className="block leading-[20px] whitespace-pre">Graphic ILD</p>
      </div>
      <div
        className="absolute left-[76px] size-2 top-[3px]"
        data-name="Toggle on"
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 8 8"
        >
          <circle
            cx="4"
            cy="4"
            fill="var(--fill-0, #45DE85)"
            id="Toggle on"
            r="4"
          />
        </svg>
      </div>
    </div>
  );
}

function VerticalContainer() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-4 h-[901px] items-start justify-start left-[1816px] overflow-clip p-0 top-[72px] w-[88px]"
      data-name="Vertical Container"
    >
      <SideButton />
      <SideButton1 />
      <SideButton2 />
      <SideButton3 />
      <SideButton4 />
      <SideButton5 />
      <SideButton6 />
      <SideButton7 />
      <SideButton8 />
      <SideButton9 />
    </div>
  );
}

function Measurement() {
  return (
    <div className="relative shrink-0 size-6" data-name="Measurement">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Measurement">
          <path
            d={svgPaths.p2a409f80}
            fill="var(--fill-0, #E8E8E8)"
            id="path"
          />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div
      className="bg-[#696969] box-border content-stretch flex flex-row gap-2 h-10 items-center justify-center px-4 py-2 relative rounded-sm shrink-0 w-[227px]"
      data-name="Button"
    >
      <Measurement />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-left text-nowrap">
        <p className="block leading-[22px] whitespace-pre">Add Segment</p>
      </div>
    </div>
  );
}

function SegmentAdding() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row items-start justify-start left-[1575px] p-0 top-[897px]"
      data-name="Segment adding"
    >
      <Button5 />
    </div>
  );
}

function SegmentBubble() {
  return (
    <div
      className="absolute bg-[#000000] h-7 rounded-[30px] top-3 translate-x-[-50%]"
      data-name="Segment Bubble"
      style={{ left: "calc(50% + 1px)" }}
    >
      <div className="box-border content-stretch flex flex-row gap-2.5 h-7 items-center justify-center overflow-clip p-[8px] relative">
        <div className="flex flex-col font-['CentraleSans:Book',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[20px] text-center text-nowrap">
          <p className="block leading-[22px] whitespace-pre">A</p>
        </div>
      </div>
      <div className="absolute border border-[#ffffff] border-solid inset-0 pointer-events-none rounded-[30px]" />
    </div>
  );
}

function SegmentDefault() {
  return (
    <div
      className="absolute h-[173px] left-[275px] top-[829px] w-[209px]"
      data-name="Segment/Default"
    >
      <div className="absolute bg-gradient-to-b bottom-0 from-[#ffffff1a] left-0 right-0 to-[#ffffff00] top-[3.349%]" />
      <div className="absolute h-0 left-0 right-0 top-[8px]">
        <div className="absolute bottom-0 left-0 right-0 top-[-4px]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 209 4"
          >
            <line
              id="Line 131"
              stroke="var(--stroke-0, white)"
              strokeWidth="4"
              x2="209"
              y1="2"
              y2="2"
            />
          </svg>
        </div>
      </div>
      <div className="absolute flex h-[12px] items-center justify-center left-0 top-0 w-[10px]">
        <div className="flex-none rotate-[90deg]">
          <div className="h-2.5 relative w-3">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 12 10"
            >
              <path
                d="M6 0L0 6V10H12V6L6 0Z"
                fill="var(--fill-0, white)"
                id="Vector 94"
              />
            </svg>
          </div>
        </div>
      </div>
      <SegmentBubble />
      <div className="absolute flex h-[12px] items-center justify-center right-0 top-0 w-[10px]">
        <div className="flex-none rotate-[270deg]">
          <div className="h-2.5 relative w-3">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 12 10"
            >
              <path
                d="M6 0L0 6V10H12V6L6 0Z"
                fill="var(--fill-0, white)"
                id="Vector 95"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame67() {
  return (
    <div className="absolute box-border content-stretch flex flex-row gap-2.5 items-start justify-end left-[92px] p-[10px] top-4">
      <div className="[text-shadow:rgba(0,0,0,0.5)_0px_2px_4px] absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-[-4px] not-italic text-[#ffffff] text-[24px] text-nowrap text-right top-0 translate-x-[-100%]">
        <p className="block leading-[24px] whitespace-pre">&nbsp;</p>
      </div>
    </div>
  );
}

function SegmentInputFieldBoom() {
  return (
    <div
      className="absolute bg-[rgba(89,89,89,0.5)] box-border content-stretch flex flex-row items-center justify-between left-0 overflow-clip p-[14px] rounded-[3px] top-0 w-[152px]"
      data-name="Segment input field/Boom"
    >
      <div className="[text-shadow:rgba(0,0,0,0.5)_0px_2px_4px] font-['CentraleSans:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[24px] text-[rgba(173,173,173,0.87)] text-left text-nowrap">
        <p className="block leading-[28px] whitespace-pre">A</p>
      </div>
      <Frame67 />
    </div>
  );
}

function Edit() {
  return (
    <div className="relative shrink-0 size-8" data-name="Edit">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="Edit">
          <path
            d={svgPaths.p21a57f00}
            fill="var(--fill-0, #E8E8E8)"
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
      className="absolute bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-row gap-2 h-14 items-center justify-center left-40 px-[18px] py-4 rounded top-0"
      data-name="🟢 Button (IGT)"
    >
      <Edit />
    </div>
  );
}

function SegmentInputFieldBoom1() {
  return (
    <div
      className="absolute h-14 left-[1575px] overflow-clip top-[829px] w-[228px]"
      data-name="Segment input field/Boom"
    >
      <SegmentInputFieldBoom />
      <ButtonIgt6 />
    </div>
  );
}

function Scrubber() {
  return (
    <div
      className="absolute cursor-pointer h-[167px] left-[666px] top-[835px] w-10"
      data-name="Scrubber"
    >
      <div className="absolute bottom-0 left-[-10%] right-[-10%] top-0">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 48 167"
        >
          <g id="Scrubber">
            <path
              d="M25 167H23V0H25V167Z"
              fill="var(--fill-0, #FFDD19)"
              id="Union"
            />
            <g filter="url(#filter0_d_1_10630)" id="Ellipse 5">
              <circle cx="24" cy="84" fill="var(--fill-0, #A28E18)" r="20" />
            </g>
            <circle
              cx="24"
              cy="84"
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
              id="filter0_d_1_10630"
              width="48"
              x="0"
              y="62"
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
                result="effect1_dropShadow_1_10630"
              />
              <feBlend
                in="SourceGraphic"
                in2="effect1_dropShadow_1_10630"
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

export default function Boom() {
  return (
    <div className="bg-[#000000] relative size-full" data-name="Boom">
      <NavigationBarIgt />
      <ButtonIgt2 />
      <HorizontalContainer />
      <Ild />
      <PrevFrame />
      <NextFrame />
      <ActionBarBeacon />
      <VerticalContainer />
      <SegmentAdding />
      <SegmentDefault />
      <SegmentInputFieldBoom1 />
      <Scrubber />
    </div>
  );
}