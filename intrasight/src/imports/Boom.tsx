import svgPaths from "./svg-8ozzownxne";
import imgPostrecord2 from "figma:asset/def008272797f1d64d08fdce7592016d3349005d.png";
import imgSequence011 from "figma:asset/f3e5eadf3e1977cc75088f0b7a1703e4dcc624e0.png";
import imgImage121 from "figma:asset/a88a842f3a8fb7070c090488a99c78d4f568d185.png";

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
      className="bg-[rgba(255,255,255,0)] relative rounded-sm shrink-0 w-10"
      data-name="Button"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center p-[8px] relative w-10">
          <DlsHome24 />
        </div>
      </div>
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
    <div className="h-[15px] relative shrink-0" data-name="wordmark">
      <div className="flex flex-col items-center relative size-full">
        <div className="box-border content-stretch flex flex-col h-[15px] items-center justify-start px-2 py-0 relative">
          <PhilipsWordmark2 />
        </div>
      </div>
    </div>
  );
}

function SolutionName() {
  return (
    <div className="relative shrink-0" data-name="solution name">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start px-2 py-0 relative">
          <div className="font-['CentraleSans:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[20px] text-[rgba(255,255,255,0.8)] text-left text-nowrap">
            <p className="block leading-[28px] whitespace-pre">IVUS</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Left() {
  return (
    <div className="relative shrink-0" data-name="Left">
      <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative">
        <Button />
        <Wordmark />
        <SolutionName />
      </div>
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
    <div className="relative shrink-0" data-name="Text container">
      <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative">
        <div className="font-['CentraleSans:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#41c9fe] text-[20px] text-left text-nowrap">
          <p className="block leading-[28px] whitespace-pre">DOE, Jane</p>
        </div>
      </div>
    </div>
  );
}

function Patient() {
  return (
    <div className="relative shrink-0" data-name="Patient">
      <div className="box-border content-stretch flex flex-row gap-3 items-center justify-start p-0 relative">
        <DlsPatientAcquisition24 />
        <TextContainer />
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="relative shrink-0" data-name="Label">
      <div className="box-border content-stretch flex flex-row font-['CentraleSans:Book',_sans-serif] gap-2 items-start justify-start leading-[0] not-italic p-0 relative text-[20px] text-left text-nowrap">
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
    </div>
  );
}

function Label1() {
  return (
    <div className="relative shrink-0" data-name="Label">
      <div className="box-border content-stretch flex flex-row font-['CentraleSans:Book',_sans-serif] gap-2 items-start justify-start leading-[0] not-italic p-0 relative text-[20px] text-left text-nowrap">
        <div className="flex flex-col justify-center relative shrink-0 text-[#8c8c8c]">
          <p className="block leading-[28px] text-nowrap whitespace-pre">DOB</p>
        </div>
        <div className="flex flex-col justify-center relative shrink-0 text-[rgba(255,255,255,0.8)]">
          <p className="block leading-[28px] text-nowrap whitespace-pre">
            15-Jan-1991 (33 y)
          </p>
        </div>
      </div>
    </div>
  );
}

function Info() {
  return (
    <div className="relative shrink-0" data-name="Info">
      <div className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative">
        <Label />
        <Label1 />
      </div>
    </div>
  );
}

function PatientInfo() {
  return (
    <div className="h-6 relative shrink-0" data-name="Patient info">
      <div className="box-border content-stretch flex flex-row gap-6 h-6 items-center justify-center p-0 relative">
        <Patient />
        <Info />
      </div>
    </div>
  );
}

function Left1() {
  return (
    <div
      className="absolute h-12 left-2 top-1/2 translate-y-[-50%]"
      data-name="Left"
    >
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-12 h-12 items-center justify-start pl-2 pr-0 py-0 relative">
          <Left />
          <PatientInfo />
        </div>
      </div>
    </div>
  );
}

function Time() {
  return (
    <div className="relative shrink-0" data-name="Time">
      <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start leading-[0] not-italic p-0 relative text-[#d6d6d6] text-[20px]">
        <div className="flex flex-col font-['CentraleSansDS:Book',_sans-serif] justify-center relative shrink-0 text-left text-nowrap">
          <p className="block leading-[28px] whitespace-pre">09:00</p>
        </div>
        <div className="flex flex-col font-['CentraleSans:Book',_sans-serif] justify-center relative shrink-0 text-center w-10">
          <p className="block leading-[28px]">AM</p>
        </div>
      </div>
    </div>
  );
}

function DateTimeUser() {
  return (
    <div className="relative shrink-0" data-name="Date + Time + User">
      <div className="box-border content-stretch flex flex-row gap-5 items-center justify-end p-0 relative">
        <div className="flex flex-col font-['CentraleSans:Book',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#d6d6d6] text-[20px] text-left text-nowrap">
          <p className="block leading-[28px] whitespace-pre">01-Jul-2024</p>
        </div>
        <Time />
      </div>
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
      className="relative rounded-sm shrink-0 size-10"
      data-name="🟢 Button (IGT)"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-3 py-2 relative size-10">
          <Icon />
        </div>
      </div>
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
      className="relative rounded-sm shrink-0 size-10"
      data-name="🟢 Button (IGT)"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-3 py-2 relative size-10">
          <Icon1 />
        </div>
      </div>
    </div>
  );
}

function Icons() {
  return (
    <div className="relative shrink-0" data-name="Icons">
      <div className="box-border content-stretch flex flex-row gap-1 items-center justify-end p-0 relative">
        <ButtonIgt />
        <ButtonIgt1 />
      </div>
    </div>
  );
}

function RightSide() {
  return (
    <div className="h-12 relative shrink-0" data-name="Right side">
      <div className="box-border content-stretch flex flex-row gap-3 h-12 items-center justify-end p-0 relative">
        <DateTimeUser />
        <Icons />
      </div>
    </div>
  );
}

function Right() {
  return (
    <div
      className="absolute h-12 right-4 top-1/2 translate-y-[-50%]"
      data-name="Right"
    >
      <div className="box-border content-stretch flex flex-row gap-2 h-12 items-center justify-end p-0 relative">
        <RightSide />
      </div>
    </div>
  );
}

function TopRow() {
  return (
    <div className="h-14 relative shrink-0 w-full" data-name="Top row">
      <div className="box-border content-stretch flex flex-row gap-2.5 h-14 items-center justify-start p-0 relative w-full">
        <Background />
        <Left1 />
        <Right />
      </div>
    </div>
  );
}

function Template() {
  return (
    <div
      className="relative shadow-[0px_1px_6px_0px_rgba(0,0,0,0.2)] shrink-0 w-full"
      data-name="Template"
    >
      <div className="box-border content-stretch flex flex-col items-center justify-start p-0 relative w-full">
        <TopRow />
      </div>
    </div>
  );
}

function NavigationBarIgt() {
  return (
    <div
      className="absolute left-0 top-0 w-[1920px]"
      data-name="🟢 Navigation bar (IGT)"
    >
      <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative w-[1920px]">
        <Template />
      </div>
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
            clipPath="url(#clip0_1_11327)"
            filter="url(#filter0_d_1_11327)"
            id="Icon"
          >
            <g filter="url(#filter1_d_1_11327)" id="path">
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
              id="filter0_d_1_11327"
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
                result="effect1_dropShadow_1_11327"
              />
              <feBlend
                in="SourceGraphic"
                in2="effect1_dropShadow_1_11327"
                mode="normal"
                result="shape"
              />
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="14"
              id="filter1_d_1_11327"
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
                result="effect1_dropShadow_1_11327"
              />
              <feBlend
                in="SourceGraphic"
                in2="effect1_dropShadow_1_11327"
                mode="normal"
                result="shape"
              />
            </filter>
            <clipPath id="clip0_1_11327">
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
      className="absolute bg-[rgba(89,89,89,0.55)] cursor-pointer left-4 rounded-sm top-[765px]"
      data-name="🟢 Button (IGT)"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-4 py-2 relative">
          <Icon2 />
          <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-left text-nowrap">
            <p className="block leading-[22px] whitespace-pre">Show X-Ray</p>
          </div>
        </div>
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
            clipPath="url(#clip0_1_11383)"
            filter="url(#filter0_d_1_11383)"
            id="Icon"
          >
            <g filter="url(#filter1_d_1_11383)" id="path">
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
              id="filter0_d_1_11383"
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
                result="effect1_dropShadow_1_11383"
              />
              <feBlend
                in="SourceGraphic"
                in2="effect1_dropShadow_1_11383"
                mode="normal"
                result="shape"
              />
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="23"
              id="filter1_d_1_11383"
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
                result="effect1_dropShadow_1_11383"
              />
              <feBlend
                in="SourceGraphic"
                in2="effect1_dropShadow_1_11383"
                mode="normal"
                result="shape"
              />
            </filter>
            <clipPath id="clip0_1_11383">
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
      className="bg-[rgba(89,89,89,0.55)] relative rounded-sm shrink-0"
      data-name="🟢 Button (IGT)"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-3 py-2 relative">
          <Icon3 />
        </div>
      </div>
    </div>
  );
}

function VirtualRulerButton() {
  return (
    <button className="relative shrink-0" data-name="Virtual Ruler Button">
      <div className="box-border content-stretch flex flex-row items-start justify-start p-0 relative">
        <ButtonIgt3 />
      </div>
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
            clipPath="url(#clip0_1_11244)"
            filter="url(#filter0_d_1_11244)"
            id="EyeOffOutline"
          >
            <g filter="url(#filter1_d_1_11244)" id="path">
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
              id="filter0_d_1_11244"
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
                result="effect1_dropShadow_1_11244"
              />
              <feBlend
                in="SourceGraphic"
                in2="effect1_dropShadow_1_11244"
                mode="normal"
                result="shape"
              />
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="24.7"
              id="filter1_d_1_11244"
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
                result="effect1_dropShadow_1_11244"
              />
              <feBlend
                in="SourceGraphic"
                in2="effect1_dropShadow_1_11244"
                mode="normal"
                result="shape"
              />
            </filter>
            <clipPath id="clip0_1_11244">
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
      className="bg-[rgba(89,89,89,0.55)] relative rounded-sm shrink-0"
      data-name="🟢 Button (IGT)"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-3 py-2 relative">
          <EyeOffOutline />
        </div>
      </div>
    </button>
  );
}

function Frame89() {
  return (
    <div className="absolute left-2 top-[678px]">
      <div className="box-border content-stretch cursor-pointer flex flex-row gap-2 items-center justify-start p-0 relative">
        <VirtualRulerButton />
        <ButtonIgt4 />
      </div>
    </div>
  );
}

function Frame91() {
  return (
    <div className="absolute h-[796px] left-1/2 top-0 translate-x-[-50%] w-[718px]">
      <div
        className="absolute bg-center bg-cover bg-no-repeat h-[796px] left-0 top-0 w-[718px]"
        data-name="postrecord 2"
        style={{ backgroundImage: `url('${imgPostrecord2}')` }}
      />
      <Frame89 />
    </div>
  );
}

function Frame88() {
  return (
    <div className="bg-[#000000] h-[724px] overflow-clip relative shrink-0 w-[936px]">
      <Frame91 />
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

function Group62() {
  return (
    <div
      className="absolute contents top-[30px] translate-x-[-50%]"
      style={{ left: "calc(50% + 0.291107px)" }}
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

function Frame84() {
  return (
    <div className="h-[742px] relative shrink-0 w-[824px]">
      <Group62 />
    </div>
  );
}

function Frame86() {
  return (
    <div className="absolute h-[742px] left-4 top-[87px] w-[1784px]">
      <div className="box-border content-stretch flex flex-row gap-6 h-[742px] items-start justify-center p-0 relative w-[1784px]">
        <Frame88 />
        <Frame84 />
      </div>
    </div>
  );
}

function DlsFrameFirst48() {
  return (
    <div
      className="absolute left-1/2 size-6 translate-x-[-50%] translate-y-[-50%]"
      data-name="DLS_FrameFirst_48"
      style={{ top: "calc(50% - 0.0866928px)" }}
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
      className="absolute bg-[#212121] bottom-[3.226%] left-0 overflow-clip top-[2.823%] w-[70px]"
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
      style={{ top: "calc(50% - 0.0866928px)" }}
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
      className="absolute bg-[#212121] bottom-[3.226%] overflow-clip right-0 top-[2.823%] w-[70px]"
      data-name="Next Frame"
    >
      <DlsFrameLast48 />
    </div>
  );
}

function MarkerNoReg() {
  return (
    <div
      className="absolute bottom-1 h-[35px] left-[6.019%] right-[5.833%]"
      data-name="Marker/NoReg"
    />
  );
}

function Ild() {
  return (
    <div
      className="absolute h-[179px] left-4 top-[829px] w-[1543px]"
      data-name="ILD"
    >
      <div className="absolute bg-[#212121] inset-0" />
      <div className="absolute bg-[#050505] bottom-[3.226%] left-0 right-[0.463%] top-[3.226%]" />
      <div
        className="[background-size:101.64%_105.31%] absolute bg-[48.32%_30.76%] bg-no-repeat bottom-[3.226%] left-[70px] right-[70px] top-[3.226%]"
        data-name="image 121"
        style={{ backgroundImage: `url('${imgImage121}')` }}
      />
      <PrevFrame />
      <NextFrame />
      <MarkerNoReg />
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
      className="bg-[rgba(89,89,89,0.55)] relative rounded-sm shrink-0 w-[214px]"
      data-name="Button"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-4 py-2 relative w-[214px]">
          <Icon4 />
          <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-left text-nowrap">
            <p className="block leading-[22px] whitespace-pre">Annotate</p>
          </div>
        </div>
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
      className="bg-[rgba(89,89,89,0.55)] relative rounded-sm shrink-0 w-[214px]"
      data-name="Button"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-4 py-2 relative w-[214px]">
          <Icon5 />
          <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-left text-nowrap">
            <p className="block leading-[22px] whitespace-pre">Save Frame</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LeftButtons() {
  return (
    <div className="absolute left-0 top-0" data-name="Left buttons">
      <div className="box-border content-stretch flex flex-row gap-4 items-start justify-start p-0 relative">
        <Button1 />
        <Button2 />
      </div>
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
      className="bg-[rgba(89,89,89,0.55)] relative rounded-sm shrink-0 w-[214px]"
      data-name="Button"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-4 py-2 relative w-[214px]">
          <Icon6 />
          <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-left text-nowrap">
            <p className="block leading-[22px] whitespace-pre">Bookmark</p>
          </div>
        </div>
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
      className="bg-[rgba(89,89,89,0.55)] relative rounded-sm shrink-0 w-[214px]"
      data-name="Button"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-4 py-2 relative w-[214px]">
          <Icon7 />
          <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-left text-nowrap">
            <p className="block leading-[22px] whitespace-pre">Playback</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame39() {
  return (
    <div className="relative shrink-0">
      <div className="box-border content-stretch flex flex-row gap-4 items-start justify-start p-0 relative">
        <Button4 />
      </div>
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
      className="bg-[#1474a4] relative rounded-sm shrink-0 w-[214px]"
      data-name="🟢 Button (IGT)"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-4 py-2 relative w-[214px]">
          <Camera />
          <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap">
            <p className="block leading-[22px] whitespace-pre">Live</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RightButtons() {
  return (
    <div className="absolute right-0 top-0" data-name="Right buttons">
      <div className="box-border content-stretch flex flex-row gap-4 items-start justify-start p-0 relative">
        <Button3 />
        <Frame39 />
        <ButtonIgt5 />
      </div>
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

function DlsCropCircle48() {
  return (
    <div className="absolute left-7 size-8 top-3" data-name="DLS_CropCircle_48">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="DLS_CropCircle_48">
          <path
            d={svgPaths.p1969f180}
            fill="var(--fill-0, white)"
            fillOpacity="0.8"
            id="path"
          />
        </g>
      </svg>
    </div>
  );
}

function SideButton5() {
  return (
    <div
      className="bg-neutral-900 h-[73px] overflow-clip relative rounded-sm shrink-0 w-[88px]"
      data-name="SideButton"
    >
      <DlsCropCircle48 />
      <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-11 not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-12 translate-x-[-50%]">
        <p className="block leading-[20px] whitespace-pre">Borders</p>
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

function SideButton6() {
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

function SideButton7() {
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

function SideButton8() {
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

function SideButton9() {
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

function Frame16() {
  return (
    <div className="absolute h-[901px] left-[1816px] top-[72px] w-[88px]">
      <div className="box-border content-stretch flex flex-col gap-4 h-[901px] items-start justify-start overflow-clip p-0 relative w-[88px]">
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
      className="bg-[#696969] h-10 relative rounded-sm shrink-0 w-[227px]"
      data-name="Button"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 h-10 items-center justify-center px-4 py-2 relative w-[227px]">
          <Measurement />
          <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-left text-nowrap">
            <p className="block leading-[22px] whitespace-pre">Add Segment</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SegmentAdding() {
  return (
    <div
      className="absolute left-[1575px] top-[828px]"
      data-name="Segment adding"
    >
      <div className="box-border content-stretch flex flex-row items-start justify-start p-0 relative">
        <Button5 />
      </div>
    </div>
  );
}

function Scrubber() {
  return (
    <div
      className="absolute cursor-pointer h-[167px] left-[50px] top-1.5 w-10"
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
            <g filter="url(#filter0_d_1_11342)" id="Ellipse 5">
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
              id="filter0_d_1_11342"
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
                result="effect1_dropShadow_1_11342"
              />
              <feBlend
                in="SourceGraphic"
                in2="effect1_dropShadow_1_11342"
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

function DraggableScrubber() {
  return (
    <div
      className="absolute h-[179px] left-[18px] top-[828px] w-[1543px]"
      data-name="Draggable Scrubber"
    >
      <Scrubber />
    </div>
  );
}

export default function Boom() {
  return (
    <div className="bg-[#000000] relative size-full" data-name="Boom">
      <NavigationBarIgt />
      <ButtonIgt2 />
      <Frame86 />
      <Ild />
      <ActionBarBeacon />
      <Frame16 />
      <SegmentAdding />
      <DraggableScrubber />
    </div>
  );
}