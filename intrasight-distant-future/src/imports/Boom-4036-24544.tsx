import svgPaths from "./svg-iii75s15zk";
import imgImage151 from "figma:asset/56598378c871bc06738064084590f2bc0e131dd6.png";
import imgImage152 from "figma:asset/5e606ec8cffad8dbebbbf04d68e4c4f78779dddd.png";
import imgVector from "figma:asset/9b39ab5937c11e027fe76e41cd618cdbe78210a0.png";
import imgVector1 from "figma:asset/7f10d6534b9c55094469694608d4e321e0d357ca.png";
import imgVector2 from "figma:asset/1011f89c554c3fce9aa82ca825033fcb58117620.png";
import imgVector3 from "figma:asset/c118d0171898b14313024acbd55278d8683d45f9.png";

function Background() {
  return <div className="basis-0 bg-[#383838] grow h-full min-h-px min-w-px shrink-0" data-name="Background" />;
}

function DlsHome24() {
  return (
    <div className="relative shrink-0 size-6" data-name="DLS_Home_24">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="DLS_Home_24">
          <path d={svgPaths.p2df20600} fill="var(--fill-0, #D6D6D6)" id="path" />
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
    <div className="h-[15px] relative shrink-0 w-[77px]" data-name="philips-wordmark-2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77 15">
        <g id="philips-wordmark-2">
          <path d="M77 0H0V15H77V0Z" fill="var(--fill-0, #E8E8E8)" id="pixelrounder" opacity="0" />
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
    <div className="relative shrink-0 size-8" data-name="DLS_PatientAcquisition_24">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
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
        <p className="block leading-[28px] text-nowrap whitespace-pre">Patient ID</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 text-[rgba(255,255,255,0.8)]">
        <p className="block leading-[28px] text-nowrap whitespace-pre">234567</p>
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
        <p className="block leading-[28px] text-nowrap whitespace-pre">15-Jan-1991 (33 y)</p>
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
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p32cbff80} fill="var(--fill-0, #D6D6D6)" id="path" />
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
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p3a6c9900} fill="var(--fill-0, #D6D6D6)" id="path" />
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
      <div className="absolute bottom-0 left-[-4.17%] right-[-4.17%] top-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 24">
          <g clipPath="url(#clip0_4036_26596)" filter="url(#filter0_d_4036_26596)" id="Icon">
            <g filter="url(#filter1_d_4036_26596)" id="path">
              <path d={svgPaths.p3a1b6200} fill="var(--fill-0, white)" fillOpacity="0.8" shapeRendering="crispEdges" />
            </g>
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="28"
              id="filter0_d_4036_26596"
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
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_4036_26596" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_4036_26596" mode="normal" result="shape" />
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="14"
              id="filter1_d_4036_26596"
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
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_4036_26596" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_4036_26596" mode="normal" result="shape" />
            </filter>
            <clipPath id="clip0_4036_26596">
              <rect fill="white" height="24" transform="translate(1)" width="24" />
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
      <div className="absolute bottom-[-2.08%] left-0 right-0 top-[-2.08%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 26">
          <g clipPath="url(#clip0_4036_26509)" filter="url(#filter0_d_4036_26509)" id="Icon">
            <g filter="url(#filter1_d_4036_26509)" id="path">
              <path d={svgPaths.p3ea86a00} fill="var(--fill-0, white)" fillOpacity="0.8" shapeRendering="crispEdges" />
            </g>
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="28"
              id="filter0_d_4036_26509"
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
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_4036_26509" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_4036_26509" mode="normal" result="shape" />
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="23"
              id="filter1_d_4036_26509"
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
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_4036_26509" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_4036_26509" mode="normal" result="shape" />
            </filter>
            <clipPath id="clip0_4036_26509">
              <rect fill="white" height="24" transform="translate(0 1)" width="24" />
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
      <div className="absolute inset-[-5.42%_-5.62%_-5.83%_-5.63%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <g clipPath="url(#clip0_4036_26587)" filter="url(#filter0_d_4036_26587)" id="EyeOffOutline">
            <g filter="url(#filter1_d_4036_26587)" id="path">
              <path d={svgPaths.p2c140d00} fill="var(--fill-0, white)" fillOpacity="0.8" shapeRendering="crispEdges" />
            </g>
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="28"
              id="filter0_d_4036_26587"
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
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_4036_26587" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_4036_26587" mode="normal" result="shape" />
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="24.7"
              id="filter1_d_4036_26587"
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
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_4036_26587" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_4036_26587" mode="normal" result="shape" />
            </filter>
            <clipPath id="clip0_4036_26587">
              <rect fill="white" height="24" transform="translate(2 2)" width="24" />
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

function Icon5() {
  return (
    <div className="relative shrink-0 size-6" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p315d7b80} fill="var(--fill-0, #E8E8E8)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt5() {
  return (
    <div
      className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-row gap-2 items-center justify-center px-4 py-2 relative rounded-sm shrink-0 w-[228px]"
      data-name="🟢 Button (IGT)"
    >
      <Icon5 />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-left text-nowrap">
        <p className="block leading-[22px] whitespace-pre">Adjust position</p>
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-6" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p17a0bb00} fill="var(--fill-0, #E8E8E8)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt6() {
  return (
    <div
      className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-row gap-2 items-center justify-center px-4 py-2 relative rounded-sm shrink-0 w-[228px]"
      data-name="🟢 Button (IGT)"
    >
      <Icon6 />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-left text-nowrap">
        <p className="block leading-[22px] whitespace-pre">Move to nearest frame</p>
      </div>
    </div>
  );
}

function Slot() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Slot">
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="[flex-flow:wrap] box-border content-center flex gap-2 items-center justify-center px-2 py-1 relative w-full">
          <ButtonIgt5 />
          <ButtonIgt6 />
        </div>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row items-start justify-start p-[16px] relative w-full">
          <Slot />
        </div>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div
      className="basis-0 bg-[#212121] box-border content-stretch flex flex-col grow items-center justify-start min-h-px min-w-px p-0 relative rounded-sm shrink-0"
      data-name="Container"
    >
      <div
        aria-hidden="true"
        className="absolute border border-[#595959] border-solid inset-0 pointer-events-none rounded-sm"
      />
      <Content />
    </div>
  );
}

function PopoverArrow() {
  return (
    <div className="h-2.5 relative w-4" data-name=".popover arrow">
      <div className="absolute bottom-0 left-[-5%] right-[-5%] top-[-10%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 11">
          <g id=".popover arrow">
            <path d="M0.2 0L9 11L17.8 0H0.2Z" fill="var(--fill-0, #212121)" id="Arrow background" />
            <path d={svgPaths.p2e7ecf80} fill="var(--fill-0, #595959)" id="Arrow border" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col items-start justify-center px-0 py-4 right-[-10px] translate-y-[-50%]"
      data-name="Arrow"
      style={{ top: "calc(50% - 0.5px)" }}
    >
      <div className="flex h-[16px] items-center justify-center relative shrink-0 w-[10px]">
        <div className="flex-none rotate-[270deg]">
          <PopoverArrow />
        </div>
      </div>
    </div>
  );
}

function Popover() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-24 items-start justify-start left-[69px] p-0 shadow-[0px_1px_6px_0px_rgba(0,0,0,0.45)] top-[323px] w-[260px]"
      data-name="Popover"
    >
      <Container1 />
      <Arrow />
    </div>
  );
}

function LeftImageContainer() {
  return (
    <div className="absolute h-[796px] left-1/2 top-0 translate-x-[-50%] w-[718px]" data-name="Left Image Container">
      <div
        className="absolute bg-center bg-cover bg-no-repeat h-[791px] left-0 top-0 w-[718px]"
        data-name="image 151"
        style={{ backgroundImage: `url('${imgImage151}')` }}
      />
      <HorizontalButtonContainer />
      <div className="absolute flex h-[32.683px] items-center justify-center left-[340.33px] top-[355.03px] w-[33.014px]">
        <div className="flex-none rotate-[60deg]">
          <div className="h-[24.5px] relative w-[23.601px]">
            <div
              className="absolute inset-[-2.62%_-10.59%_-10.2%_-2.12%]"
              style={{ "--fill-0": "rgba(255, 221, 25, 1)", "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}
            >
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                role="presentation"
                viewBox="0 0 28 28"
              >
                <g filter="url(#filter0_d_4036_26578)" id="Vector 19">
                  <path d={svgPaths.p2c1cd3c0} fill="var(--fill-0, #FFDD19)" />
                  <path d={svgPaths.p2c1cd3c0} stroke="var(--stroke-0, black)" />
                </g>
                <defs>
                  <filter
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                    height="27.6419"
                    id="filter0_d_4036_26578"
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
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
                    <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_4036_26578" />
                    <feBlend in="SourceGraphic" in2="effect1_dropShadow_4036_26578" mode="normal" result="shape" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Popover />
    </div>
  );
}

function LeftPanel() {
  return (
    <div className="bg-[#000000] h-[724px] overflow-clip relative shrink-0 w-[936px]" data-name="Left Panel">
      <LeftImageContainer />
    </div>
  );
}

function Component2() {
  return (
    <div className="absolute left-[82.97px] size-[664.617px] top-[36.82px]" data-name="Component 2">
      <div className="absolute inset-[49.26%_49.51%_49.42%_49.17%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" role="presentation" viewBox="0 0 9 9">
          <ellipse cx="4.38692" cy="4.39415" fill="var(--fill-0, #FF830F)" id="Ellipse 35" rx="4.38692" ry="4.39415" />
        </svg>
      </div>
      <div className="absolute bg-[#ff830f] inset-[49.09%_59.9%_49.42%_39.77%]">
        <div
          aria-hidden="true"
          className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none"
        />
      </div>
      <div className="absolute bg-[#ff830f] inset-[49.09%_69.8%_49.42%_29.87%]">
        <div
          aria-hidden="true"
          className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none"
        />
      </div>
      <div className="absolute bg-[#ff830f] inset-[49.09%_40.1%_49.42%_59.57%]">
        <div
          aria-hidden="true"
          className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none"
        />
      </div>
      <div className="absolute flex inset-[59.5%_49.34%_40.16%_49.17%] items-center justify-center">
        <div className="flex-none h-[9.871px] rotate-[270deg] w-[2.197px]">
          <div className="bg-[#ff830f] relative size-full">
            <div
              aria-hidden="true"
              className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none"
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-[99.67%] flex items-center justify-center left-[49.17%] right-[49.34%] top-0">
        <div className="flex-none h-[9.871px] rotate-[270deg] w-[2.197px]">
          <div className="bg-[#ff830f] relative size-full">
            <div
              aria-hidden="true"
              className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none"
            />
          </div>
        </div>
      </div>
      <div className="absolute flex inset-[69.59%_49.34%_30.08%_49.17%] items-center justify-center">
        <div className="flex-none h-[9.871px] rotate-[270deg] w-[2.197px]">
          <div className="bg-[#ff830f] relative size-full">
            <div
              aria-hidden="true"
              className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none"
            />
          </div>
        </div>
      </div>
      <div className="absolute flex inset-[9.92%_49.34%_89.75%_49.17%] items-center justify-center">
        <div className="flex-none h-[9.871px] rotate-[270deg] w-[2.197px]">
          <div className="bg-[#ff830f] relative size-full">
            <div
              aria-hidden="true"
              className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none"
            />
          </div>
        </div>
      </div>
      <div className="absolute flex inset-[80%_49.34%_19.67%_49.17%] items-center justify-center">
        <div className="flex-none h-[9.871px] rotate-[270deg] w-[2.197px]">
          <div className="bg-[#ff830f] relative size-full">
            <div
              aria-hidden="true"
              className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none"
            />
          </div>
        </div>
      </div>
      <div className="absolute flex inset-[19.84%_49.34%_79.83%_49.17%] items-center justify-center">
        <div className="flex-none h-[9.871px] rotate-[270deg] w-[2.197px]">
          <div className="bg-[#ff830f] relative size-full">
            <div
              aria-hidden="true"
              className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none"
            />
          </div>
        </div>
      </div>
      <div className="absolute flex inset-[89.59%_49.34%_10.08%_49.17%] items-center justify-center">
        <div className="flex-none h-[9.871px] rotate-[270deg] w-[2.197px]">
          <div className="bg-[#ff830f] relative size-full">
            <div
              aria-hidden="true"
              className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none"
            />
          </div>
        </div>
      </div>
      <div className="absolute flex inset-[29.92%_49.34%_69.75%_49.17%] items-center justify-center">
        <div className="flex-none h-[9.871px] rotate-[270deg] w-[2.197px]">
          <div className="bg-[#ff830f] relative size-full">
            <div
              aria-hidden="true"
              className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none"
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 flex items-center justify-center left-[49.17%] right-[49.34%] top-[99.67%]">
        <div className="flex-none h-[9.871px] rotate-[270deg] w-[2.197px]">
          <div className="bg-[#ff830f] relative size-full">
            <div
              aria-hidden="true"
              className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none"
            />
          </div>
        </div>
      </div>
      <div className="absolute flex inset-[39.84%_49.34%_59.84%_49.17%] items-center justify-center">
        <div className="flex-none h-[9.871px] rotate-[270deg] w-[2.197px]">
          <div className="bg-[#ff830f] relative size-full">
            <div
              aria-hidden="true"
              className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none"
            />
          </div>
        </div>
      </div>
      <div className="absolute bg-[#ff830f] inset-[49.09%_30.03%_49.42%_69.64%]">
        <div
          aria-hidden="true"
          className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none"
        />
      </div>
      <div className="absolute bg-[#ff830f] inset-[49.09%_19.97%_49.42%_79.7%]">
        <div
          aria-hidden="true"
          className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none"
        />
      </div>
      <div className="absolute bg-[#ff830f] inset-[49.09%_10.07%_49.42%_89.6%]">
        <div
          aria-hidden="true"
          className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none"
        />
      </div>
      <div className="absolute bg-[#ff830f] bottom-[49.42%] left-[99.67%] right-0 top-[49.09%]">
        <div
          aria-hidden="true"
          className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none"
        />
      </div>
      <div className="absolute font-['CentraleSans:Book',_sans-serif] inset-[48.43%_3.5%_49.46%_92.74%] leading-[0] not-italic text-[#ff9f19] text-[10px] text-left text-nowrap">
        <p className="block leading-[14px] whitespace-pre">1 mm</p>
      </div>
      <div className="absolute bg-[#ff830f] inset-[49.09%_79.87%_49.42%_19.8%]">
        <div
          aria-hidden="true"
          className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none"
        />
      </div>
      <div className="absolute bg-[#ff830f] inset-[49.09%_89.77%_49.42%_9.9%]">
        <div
          aria-hidden="true"
          className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none"
        />
      </div>
      <div className="absolute bg-[#ff830f] bottom-[49.42%] left-0 right-[99.67%] top-[49.09%]">
        <div
          aria-hidden="true"
          className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none"
        />
      </div>
    </div>
  );
}

function RightImageContainer() {
  return (
    <div className="absolute contents left-[82.97px] top-[36.82px]" data-name="Right Image Container">
      <Component2 />
    </div>
  );
}

function RightPanel() {
  return (
    <div className="h-[742px] relative shrink-0 w-[824px]" data-name="Right Panel">
      <div
        className="absolute bg-center bg-cover bg-no-repeat h-[689px] left-[69px] top-[11px] w-[690px]"
        data-name="image 152"
        style={{ backgroundImage: `url('${imgImage152}')` }}
      />
      <RightImageContainer />
      <div className="absolute font-['CentraleSans:Bold',_sans-serif] inset-[0.4%_92.48%_95.82%_-10.8%] leading-[0] not-italic text-[24px] text-[rgba(255,255,255,0.8)] text-left text-nowrap">
        <p className="block leading-[28px] whitespace-pre">FRAME #195</p>
      </div>
      <div className="absolute font-['CentraleSans:Book',_sans-serif] inset-[14.16%_99.88%_82.07%_-10.8%] leading-[0] not-italic text-[#8c8c8c] text-[20px] text-left text-nowrap">
        <p className="block leading-[28px] whitespace-pre">Diameter</p>
      </div>
      <div className="absolute font-['CentraleSans:Book',_sans-serif] inset-[6.33%_96.84%_89.89%_-10.8%] leading-[0] not-italic text-[#8c8c8c] text-[20px] text-left text-nowrap">
        <p className="block leading-[28px] whitespace-pre">Lumen Area</p>
      </div>
      <div className="absolute font-['CentraleSans:Book',_sans-serif] inset-[36.55%_99.88%_59.67%_-10.8%] leading-[0] not-italic text-[#8c8c8c] text-[20px] text-left text-nowrap">
        <p className="block leading-[28px] whitespace-pre">Diameter</p>
      </div>
      <div className="absolute font-['CentraleSans:Book',_sans-serif] inset-[28.73%_97.33%_67.5%_-10.8%] leading-[0] not-italic text-[#8c8c8c] text-[20px] text-left text-nowrap">
        <p className="block leading-[28px] whitespace-pre">Vessel Area</p>
      </div>
      <div className="absolute font-['CentraleSans:Book',_sans-serif] inset-[51.12%_93.69%_45.11%_-10.8%] leading-[0] not-italic text-[#8c8c8c] text-[20px] text-left text-nowrap">
        <p className="block leading-[28px] whitespace-pre">Plaque Burden</p>
      </div>
      <div className="absolute font-['CentraleSans:Bold',_sans-serif] inset-[18.01%_100.73%_78.21%_-10.8%] leading-[0] not-italic text-[#21b9ff] text-[24px] text-left text-nowrap">
        <p className="block leading-[28px] whitespace-pre">3.5 mm</p>
      </div>
      <div
        className="absolute font-['CentraleSans:Bold',_'Noto_Sans:Bold',_sans-serif] inset-[10.19%_99.64%_86.04%_-10.8%] leading-[0] text-[#21b9ff] text-[24px] text-left text-nowrap"
        style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 700" }}
      >
        <p className="block leading-[28px] whitespace-pre">2.5 mm²</p>
      </div>
      <div className="absolute font-['CentraleSans:Bold',_sans-serif] inset-[40.3%_100.61%_55.93%_-10.8%] leading-[0] not-italic text-[#23cc72] text-[24px] text-left text-nowrap">
        <p className="block leading-[28px] whitespace-pre">3.9 mm</p>
      </div>
      <div
        className="absolute font-['CentraleSans:Bold',_'Noto_Sans:Bold',_sans-serif] inset-[32.47%_99.52%_63.76%_-10.8%] leading-[0] text-[#23cc72] text-[24px] text-left text-nowrap"
        style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 700" }}
      >
        <p className="block leading-[28px] whitespace-pre">3.4 mm²</p>
      </div>
      <div className="absolute font-['CentraleSans:Bold',_sans-serif] inset-[54.86%_101.33%_41.37%_-10.8%] leading-[0] not-italic text-[#d780ff] text-[24px] text-left text-nowrap">
        <p className="block leading-[28px] whitespace-pre">49.0 %</p>
      </div>
      <div className="absolute font-['CentraleSans:Bold',_sans-serif] inset-[21.73%_91.63%_75.03%_-10.8%] leading-[0] not-italic text-[#21b9ff] text-[0px] text-left text-nowrap">
        <p className="leading-[24px] text-[20px] whitespace-pre">
          <span>{`min 2.5 `}</span>
          <span className="text-[#21b9ff]">|</span>
          <span>{` max 5.5`}</span>
        </p>
      </div>
      <div className="absolute font-['CentraleSans:Bold',_sans-serif] inset-[44.12%_91.63%_52.64%_-10.8%] leading-[0] not-italic text-[#23cc72] text-[0px] text-left text-nowrap">
        <p className="leading-[24px] text-[20px] whitespace-pre">
          <span>{`min 2.5 `}</span>
          <span className="text-[#23cc72]">|</span>
          <span>{` max 5.5 `}</span>
        </p>
      </div>
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
    <div className="absolute contents inset-[7.82%_4.54%_66.48%_4.54%]" data-name="clippath-1">
      <div className="absolute inset-[7.82%_4.54%_66.48%_4.54%]" data-name="Vector">
        <img className="block max-w-none size-full" height="46" src={imgVector} width="1403" />
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[7.26%_4.41%_67.74%_4.54%]" data-name="Group">
      <div className="absolute inset-[7.26%_4.41%_67.74%_4.54%]" data-name="Vector">
        <img className="block max-w-none size-full" height="44.75" src={imgVector1} width="1404.893" />
      </div>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-[7.82%_4.54%_66.48%_4.54%]" data-name="Clip path group">
      <Clippath1 />
      <Group />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-[7.82%_4.54%_66.48%_4.54%]" data-name="Group">
      <ClipPathGroup />
    </div>
  );
}

function ClipPathGroup1() {
  return (
    <div className="absolute contents inset-[7.82%_4.54%_66.48%_4.54%]" data-name="Clip path group">
      <Group1 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[8.38%_4.54%_86.59%_83.77%]" data-name="Group">
      <div className="absolute inset-[-8.24%_-0.37%_-11.11%_-0.02%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 183 11">
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
    <div className="absolute contents inset-[8.38%_4.54%_86.59%_83.77%]" data-name="Clip path group">
      <Group2 />
    </div>
  );
}

function Clippath2() {
  return (
    <div className="absolute contents inset-[59.13%_4.34%_18.71%_4.54%]" data-name="clippath-1">
      <div className="absolute flex inset-[59.13%_4.34%_18.71%_4.54%] items-center justify-center">
        <div className="flex-none h-[39.656px] scale-y-[-100%] w-[1405.99px]">
          <div className="relative size-full" data-name="Vector">
            <img className="block max-w-none size-full" height="39.656" src={imgVector2} width="1405.992" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents inset-[58.1%_4.44%_17.32%_4.54%]" data-name="Group">
      <div className="absolute flex inset-[58.1%_4.44%_17.32%_4.54%] items-center justify-center">
        <div className="flex-none h-11 scale-y-[-100%] w-[1404.55px]">
          <div className="relative size-full" data-name="Vector">
            <img className="block max-w-none size-full" height="44" src={imgVector3} width="1404.551" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup3() {
  return (
    <div className="absolute contents inset-[59.13%_4.34%_18.71%_4.54%]" data-name="Clip path group">
      <Clippath2 />
      <Group3 />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents inset-[59.13%_4.34%_18.71%_4.54%]" data-name="Group">
      <ClipPathGroup3 />
    </div>
  );
}

function ClipPathGroup4() {
  return (
    <div className="absolute contents inset-[59.13%_4.34%_18.71%_4.54%]" data-name="Clip path group">
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
    <div className="absolute bottom-[3px] h-[35px] left-[4.54%] overflow-clip right-[4.54%]" data-name="Coreg Marker">
      <div className="absolute bg-neutral-900 h-[27px] left-0 top-1 w-[26px]" />
      <div className="absolute font-['CentraleSans:Bold',_sans-serif] h-[30px] leading-[0] left-[14.5px] not-italic text-[#ff9f19] text-[22px] text-center top-[5px] translate-x-[-50%] w-[19px]">
        <p className="block leading-[22px]">D</p>
      </div>
      <Group26 />
    </div>
  );
}

function CoRegistrationLine() {
  return <div className="absolute h-[174px] left-[5.83%] right-[5.93%] top-[25px]" data-name="Co-registration Line" />;
}

function Ild() {
  return (
    <div className="absolute h-[179px] left-4 top-[829px] w-[1543px]" data-name="ILD">
      <div className="absolute bg-[#212121] inset-0" data-name="Background Rounded Rectangle" />
      <div className="absolute inset-[3.35%_4.54%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1403 167">
          <path d="M0 0H1403V167H0V0Z" fill="var(--fill-0, #171717)" id="Rectangle 144" />
        </svg>
      </div>
      <ClipPathGroup1 />
      <ClipPathGroup2 />
      <div className="absolute inset-[10.06%_18.34%_77.09%_4.54%]" data-name="Vector">
        <div
          className="absolute bottom-[-4.35%] left-0 right-0 top-[-4.35%]"
          style={{ "--stroke-0": "rgba(35, 204, 114, 1)" } as React.CSSProperties}
        >
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            role="presentation"
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
      <div className="absolute h-[31px] left-[4.54%] right-[4.34%] top-[29px]">
        <div
          className="absolute bottom-[-3.23%] left-[-0.04%] right-0 top-[-3.23%]"
          style={{ "--stroke-0": "rgba(65, 201, 254, 1)" } as React.CSSProperties}
        >
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            role="presentation"
            viewBox="0 0 1407 33"
          >
            <path d={svgPaths.p33173e00} id="Vector 20" stroke="var(--stroke-0, #41C9FE)" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <ClipPathGroup4 />
      <div className="absolute flex inset-[68.72%_4.34%_17.88%_4.54%] items-center justify-center">
        <div className="flex-none h-6 scale-y-[-100%] w-[1406px]">
          <div className="relative size-full" data-name="Vector">
            <div
              className="absolute bottom-[-4.17%] left-0 right-[-0.04%] top-[-3.24%]"
              style={{ "--stroke-0": "rgba(35, 204, 114, 1)" } as React.CSSProperties}
            >
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                role="presentation"
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
      <div className="absolute flex h-[31px] items-center justify-center left-[4.54%] right-[4.54%] top-[103px]">
        <div className="flex-none h-[31px] scale-y-[-100%] w-[1403px]">
          <div className="relative size-full">
            <div
              className="absolute bottom-[-3.23%] left-[-0.05%] right-0 top-[-3.23%]"
              style={{ "--stroke-0": "rgba(65, 201, 254, 1)" } as React.CSSProperties}
            >
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                role="presentation"
                viewBox="0 0 1404 33"
              >
                <path d={svgPaths.p207768c0} id="Vector 21" stroke="var(--stroke-0, #41C9FE)" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <CoregMarker />
      <div className="absolute flex h-[12.496px] items-center justify-center right-[275.76px] top-1.5 w-[13.682px]">
        <div className="flex-none rotate-[218.66deg]">
          <div className="h-[5.518px] relative w-[13.113px]">
            <div
              className="absolute inset-[-16.71%_-2.96%]"
              style={{ "--stroke-0": "rgba(35, 204, 114, 1)" } as React.CSSProperties}
            >
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                role="presentation"
                viewBox="0 0 15 8"
              >
                <path d="M1 1L14.1129 6.51751" id="Line 218" stroke="var(--stroke-0, #23CC72)" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[63.41%] right-[233px] top-[5.03%] w-[47px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 47 57">
          <path d={svgPaths.p12da6a00} fill="var(--fill-0, #171717)" id="Vector 3" />
        </svg>
      </div>
      <div className="absolute flex h-[13.246px] items-center justify-center right-[233.33px] top-1.5 w-[14.184px]">
        <div className="flex-none rotate-[220.601deg]">
          <div className="h-[5.42px] relative w-[14.051px]">
            <div
              className="absolute inset-[-17.21%_-2.56%]"
              style={{ "--stroke-0": "rgba(35, 204, 114, 1)" } as React.CSSProperties}
            >
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                role="presentation"
                viewBox="0 0 16 8"
              >
                <path d="M1 1L15.051 6.4198" id="Line 219" stroke="var(--stroke-0, #23CC72)" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <CoRegistrationLine />
    </div>
  );
}

function DlsFrameFirst48() {
  return (
    <div
      className="absolute left-1/2 size-6 translate-x-[-50%] translate-y-[-50%]"
      data-name="DLS_FrameFirst_48"
      style={{ top: "calc(50% - 0.365px)" }}
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="DLS_FrameFirst_48">
          <path d={svgPaths.p37816600} fill="var(--fill-0, white)" fillOpacity="0.8" id="path" />
        </g>
      </svg>
    </div>
  );
}

function PrevFrame() {
  return (
    <div
      className="absolute bg-[#212121] bottom-[7.15%] left-4 overflow-clip top-[77.23%] w-[70px]"
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
      style={{ top: "calc(50% - 0.365px)" }}
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="DLS_FrameLast_48">
          <path d={svgPaths.p376b1100} fill="var(--fill-0, white)" fillOpacity="0.8" id="path" />
        </g>
      </svg>
    </div>
  );
}

function NextFrame() {
  return (
    <div
      className="absolute bg-[#212121] bottom-[7.15%] overflow-clip right-[361px] top-[77.23%] w-[70px]"
      data-name="Next Frame"
    >
      <DlsFrameLast48 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-6" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p9b98300} fill="var(--fill-0, #E8E8E8)" id="path" />
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
      <Icon7 />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-left text-nowrap">
        <p className="block leading-[22px] whitespace-pre">Annotate</p>
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-6" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p28d83c80} fill="var(--fill-0, #E8E8E8)" id="path" />
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
      <Icon8 />
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
      <Button2 />
      <Button3 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-6" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M18 23L12 17L6 23V1H18V23Z" fill="var(--fill-0, #E8E8E8)" id="path" />
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
      <Icon9 />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-left text-nowrap">
        <p className="block leading-[22px] whitespace-pre">Bookmark</p>
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-6" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p1d906500} fill="var(--fill-0, #E8E8E8)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div
      className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-row gap-2 items-center justify-center px-4 py-2 relative rounded-sm shrink-0 w-[214px]"
      data-name="Button"
    >
      <Icon10 />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-left text-nowrap">
        <p className="block leading-[22px] whitespace-pre">Playback</p>
      </div>
    </div>
  );
}

function Frame39() {
  return (
    <div className="box-border content-stretch flex flex-row gap-4 items-start justify-start p-0 relative shrink-0">
      <Button5 />
    </div>
  );
}

function Camera() {
  return (
    <div className="relative shrink-0 size-6" data-name="Camera">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Camera">
          <path d={svgPaths.p264ecd40} fill="var(--fill-0, white)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt7() {
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
      <Button4 />
      <Frame39 />
      <ButtonIgt7 />
    </div>
  );
}

function ActionBarBeacon() {
  return (
    <div className="absolute h-10 left-4 top-[1024px] w-[1888px]" data-name="Action-bar / Beacon">
      <LeftButtons />
      <RightButtons />
    </div>
  );
}

function DiameterIcon() {
  return (
    <div className="absolute left-7 size-8 top-3" data-name="Diameter Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
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
    <div className="bg-neutral-900 h-[76px] overflow-clip relative rounded-sm shrink-0 w-[88px]" data-name="SideButton">
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
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="ManualDrawLine">
          <path d={svgPaths.paab4180} fill="var(--fill-0, white)" fillOpacity="0.8" id="path" opacity="0.5" />
          <path d={svgPaths.p3f8bdd80} fill="var(--fill-0, white)" fillOpacity="0.8" id="path_2" />
        </g>
      </svg>
    </div>
  );
}

function SideButton1() {
  return (
    <div className="bg-neutral-900 h-[76px] overflow-clip relative rounded-sm shrink-0 w-[88px]" data-name="SideButton">
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
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="MeasurementDots">
          <path d={svgPaths.p7044580} fill="var(--fill-0, white)" fillOpacity="0.8" id="path" />
        </g>
      </svg>
    </div>
  );
}

function SideButton2() {
  return (
    <div className="bg-neutral-900 h-[76px] overflow-clip relative rounded-sm shrink-0 w-[88px]" data-name="SideButton">
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
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="AutoBorder">
          <path d={svgPaths.p2ca05000} fill="var(--fill-0, white)" fillOpacity="0.8" id="path" />
        </g>
      </svg>
    </div>
  );
}

function SideButton3() {
  return (
    <div className="bg-neutral-900 h-[76px] overflow-clip relative rounded-sm shrink-0 w-[88px]" data-name="SideButton">
      <AutoBorder />
      <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-11 not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-12 translate-x-[-50%]">
        <p className="block leading-[20px] whitespace-pre">Auto Borders</p>
      </div>
    </div>
  );
}

function DlsRotateContinuous48() {
  return (
    <div className="absolute left-7 size-8 top-3" data-name="DLS_RotateContinuous_48">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="DLS_RotateContinuous_48">
          <path d={svgPaths.p132b1b80} fill="var(--fill-0, white)" fillOpacity="0.8" id="path" />
        </g>
      </svg>
    </div>
  );
}

function SideButton4() {
  return (
    <div className="bg-neutral-900 h-[76px] overflow-clip relative rounded-sm shrink-0 w-[88px]" data-name="SideButton">
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
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="FieldOfViewIcon">
          <path d={svgPaths.p17c13900} fill="var(--fill-0, #D1D1D1)" id="Union" />
          <path d={svgPaths.p23655800} fill="var(--fill-0, #C4C4C4)" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function SideButton5() {
  return (
    <div className="bg-neutral-900 h-[76px] overflow-clip relative rounded-sm shrink-0 w-[88px]" data-name="SideButton">
      <FieldOfViewIcon />
      <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-11 not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-12 translate-x-[-50%]">
        <p className="block leading-[20px] whitespace-pre">50</p>
      </div>
      <div className="absolute h-3.5 left-[9px] top-[31px] w-[7px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" role="presentation" viewBox="0 0 7 14">
          <path d="M0 7L7 0V14L0 7Z" fill="var(--fill-0, white)" fillOpacity="0.8" id="Vector 55" />
        </svg>
      </div>
    </div>
  );
}

function ContrastBrightness32() {
  return (
    <div className="absolute left-7 size-8 top-3" data-name="ContrastBrightness_32">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="ContrastBrightness_32">
          <path d={svgPaths.p3349c100} fill="var(--fill-0, white)" fillOpacity="0.8" id="path" />
        </g>
      </svg>
    </div>
  );
}

function SideButton6() {
  return (
    <div className="bg-neutral-900 h-[76px] overflow-clip relative rounded-sm shrink-0 w-[88px]" data-name="SideButton">
      <ContrastBrightness32 />
      <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-11 not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-12 translate-x-[-50%]">
        <p className="block leading-[20px] whitespace-pre">50</p>
      </div>
      <div className="absolute h-3.5 left-[9px] top-[31px] w-[7px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" role="presentation" viewBox="0 0 7 14">
          <path d="M0 7L7 0V14L0 7Z" fill="var(--fill-0, white)" fillOpacity="0.8" id="Vector 55" />
        </svg>
      </div>
    </div>
  );
}

function RevolveCenter32() {
  return (
    <div className="absolute left-7 size-8 top-3" data-name="RevolveCenter_32">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="RevolveCenter_32">
          <path d={svgPaths.p642e380} fill="var(--fill-0, #8C8C8C)" id="path" />
          <path d={svgPaths.p1b2b1700} fill="var(--fill-0, white)" fillOpacity="0.8" id="path_2" />
        </g>
      </svg>
    </div>
  );
}

function SideButton7() {
  return (
    <div className="bg-neutral-900 h-[76px] overflow-clip relative rounded-sm shrink-0 w-[88px]" data-name="SideButton">
      <RevolveCenter32 />
      <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-[44.5px] not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-12 translate-x-[-50%]">
        <p className="block leading-[20px] whitespace-pre">Revolve</p>
      </div>
    </div>
  );
}

function RotateIldHorizontal() {
  return (
    <div className="absolute left-7 size-8 top-3" data-name="RotateILDHorizontal">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="RotateILDHorizontal">
          <path d={svgPaths.p25d07070} fill="var(--fill-0, #8C8C8C)" id="path" />
          <path d={svgPaths.p5a9e00} fill="var(--fill-0, white)" fillOpacity="0.8" id="path_2" />
        </g>
      </svg>
    </div>
  );
}

function SideButton8() {
  return (
    <div className="bg-neutral-900 h-[76px] overflow-clip relative rounded-sm shrink-0 w-[88px]" data-name="SideButton">
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
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
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
    <div className="bg-neutral-900 h-[73px] overflow-clip relative rounded-sm shrink-0 w-[88px]" data-name="SideButton">
      <GraphicIldIcon />
      <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-11 not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-12 translate-x-[-50%]">
        <p className="block leading-[20px] whitespace-pre">Graphic ILD</p>
      </div>
      <div className="absolute left-[76px] size-2 top-[3px]" data-name="Toggle on">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" role="presentation" viewBox="0 0 8 8">
          <circle cx="4" cy="4" fill="var(--fill-0, #45DE85)" id="Toggle on" r="4" />
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
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Measurement">
          <path d={svgPaths.p2a409f80} fill="var(--fill-0, #E8E8E8)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
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
      className="absolute box-border content-stretch flex flex-row items-start justify-start left-[1576px] p-0 top-[834px]"
      data-name="Segment adding"
    >
      <Button6 />
    </div>
  );
}

function Scrubber() {
  return (
    <div className="absolute cursor-pointer h-[167px] left-[666px] top-[835px] w-10" data-name="Scrubber">
      <div className="absolute bottom-0 left-[-10%] right-[-10%] top-0">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          role="presentation"
          viewBox="0 0 48 167"
        >
          <g id="Scrubber">
            <path d="M25 167H23V0H25V167Z" fill="var(--fill-0, #FFDD19)" id="Union" />
            <g filter="url(#filter0_d_4036_26447)" id="Ellipse 5">
              <circle cx="24" cy="84" fill="var(--fill-0, #A28E18)" r="20" />
            </g>
            <circle cx="24" cy="84" fill="var(--fill-0, #FFDD19)" id="Ellipse 6" r="18" />
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="48"
              id="filter0_d_4036_26447"
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
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_4036_26447" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_4036_26447" mode="normal" result="shape" />
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
      <Scrubber />
    </div>
  );
}