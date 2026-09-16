import svgPaths from "./svg-f3qr59jht6";
import imgImage121 from "figma:asset/a88a842f3a8fb7070c090488a99c78d4f568d185.png";

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
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex gap-2 items-center justify-center p-[8px] relative rounded-[2px] shrink-0 w-10" data-name="Button">
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
    <div className="box-border content-stretch flex flex-col h-[15px] items-center justify-start px-2 py-0 relative shrink-0" data-name="wordmark">
      <PhilipsWordmark2 />
    </div>
  );
}

function SolutionName() {
  return (
    <div className="box-border content-stretch flex gap-2.5 items-center justify-start px-2 py-0 relative shrink-0" data-name="solution name">
      <div className="font-['CentraleSans:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[20px] text-[rgba(255,255,255,0.8)] text-nowrap">
        <p className="leading-[28px] whitespace-pre">IVUS</p>
      </div>
    </div>
  );
}

function Left() {
  return (
    <div className="content-stretch flex gap-2 items-center justify-start relative shrink-0" data-name="Left">
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
    <div className="content-stretch flex gap-1 items-center justify-start relative shrink-0" data-name="Text container">
      <div className="font-['CentraleSans:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#41c9fe] text-[20px] text-nowrap">
        <p className="leading-[28px] whitespace-pre">DOE, Jane</p>
      </div>
    </div>
  );
}

function Patient() {
  return (
    <div className="content-stretch flex gap-3 items-center justify-start relative shrink-0" data-name="Patient">
      <DlsPatientAcquisition24 />
      <TextContainer />
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex font-['CentraleSans:Book',_sans-serif] gap-2 items-start justify-start leading-[0] not-italic relative shrink-0 text-[20px] text-nowrap" data-name="Label">
      <div className="flex flex-col justify-center relative shrink-0 text-[rgba(214,214,214,0.65)]">
        <p className="leading-[28px] text-nowrap whitespace-pre">Patient ID</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 text-[rgba(255,255,255,0.8)]">
        <p className="leading-[28px] text-nowrap whitespace-pre">234567</p>
      </div>
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex font-['CentraleSans:Book',_sans-serif] gap-2 items-start justify-start leading-[0] not-italic relative shrink-0 text-[20px] text-nowrap" data-name="Label">
      <div className="flex flex-col justify-center relative shrink-0 text-[#8c8c8c]">
        <p className="leading-[28px] text-nowrap whitespace-pre">DOB</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 text-[rgba(255,255,255,0.8)]">
        <p className="leading-[28px] text-nowrap whitespace-pre">15-Jan-1991 (33 y)</p>
      </div>
    </div>
  );
}

function Info() {
  return (
    <div className="content-stretch flex gap-4 items-center justify-start relative shrink-0" data-name="Info">
      <Label />
      <Label1 />
    </div>
  );
}

function PatientInfo() {
  return (
    <div className="content-stretch flex gap-6 h-6 items-center justify-center relative shrink-0" data-name="Patient info">
      <Patient />
      <Info />
    </div>
  );
}

function Left1() {
  return (
    <div className="absolute box-border content-stretch flex gap-12 h-12 items-center justify-start left-2 pl-2 pr-0 py-0 top-1/2 translate-y-[-50%]" data-name="Left">
      <Left />
      <PatientInfo />
    </div>
  );
}

function Time() {
  return (
    <div className="content-stretch flex gap-1 items-center justify-start leading-[0] not-italic relative shrink-0 text-[#d6d6d6] text-[20px]" data-name="Time">
      <div className="flex flex-col font-['CentraleSansDS:Book',_sans-serif] justify-center relative shrink-0 text-nowrap">
        <p className="leading-[28px] whitespace-pre">09:00</p>
      </div>
      <div className="flex flex-col font-['CentraleSans:Book',_sans-serif] justify-center relative shrink-0 text-center w-10">
        <p className="leading-[28px]">AM</p>
      </div>
    </div>
  );
}

function DateTimeUser() {
  return (
    <div className="content-stretch flex gap-5 items-center justify-end relative shrink-0" data-name="Date + Time + User">
      <div className="flex flex-col font-['CentraleSans:Book',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#d6d6d6] text-[20px] text-nowrap">
        <p className="leading-[28px] whitespace-pre">01-Jul-2024</p>
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
    <div className="box-border content-stretch flex gap-2 items-center justify-center px-3 py-2 relative rounded-[2px] shrink-0 size-10" data-name="🟢 Button (IGT)">
      <Icon />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-6" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="DLS_Home_24">
          <path d={svgPaths.p2df20600} fill="var(--fill-0, #D6D6D6)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt1() {
  return (
    <div className="box-border content-stretch flex gap-2 items-center justify-center px-3 py-2 relative rounded-[2px] shrink-0 size-10" data-name="🟢 Button (IGT)">
      <Icon1 />
    </div>
  );
}

function Icons() {
  return (
    <div className="content-stretch flex gap-1 items-center justify-end relative shrink-0" data-name="Icons">
      <ButtonIgt />
      <ButtonIgt1 />
    </div>
  );
}

function RightSide() {
  return (
    <div className="content-stretch flex gap-3 h-12 items-center justify-end relative shrink-0" data-name="Right side">
      <DateTimeUser />
      <Icons />
    </div>
  );
}

function Right() {
  return (
    <div className="absolute content-stretch flex gap-2 h-12 items-center justify-end right-4 top-1/2 translate-y-[-50%]" data-name="Right">
      <RightSide />
    </div>
  );
}

function TopRow() {
  return (
    <div className="content-stretch flex gap-2.5 h-14 items-center justify-start relative shrink-0 w-full" data-name="Top row">
      <Background />
      <Left1 />
      <Right />
    </div>
  );
}

function Template() {
  return (
    <div className="box-border content-stretch flex flex-col items-center justify-start relative shadow-[0px_1px_6px_0px_rgba(0,0,0,0.2)] shrink-0 w-full" data-name="Template">
      <TopRow />
    </div>
  );
}

function NavigationBarIgt() {
  return (
    <div className="absolute content-stretch flex flex-col items-start justify-start left-0 top-0 w-[1920px]" data-name="🟢 Navigation bar (IGT)">
      <Template />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-6" data-name="Icon">
      <div className="absolute bottom-0 left-[-4.17%] right-[-4.17%] top-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 24">
          <g clipPath="url(#clip0_2004_9536)" filter="url(#filter0_d_2004_9536)" id="Icon">
            <g filter="url(#filter1_d_2004_9536)" id="path">
              <path d={svgPaths.p3a1b6200} fill="var(--fill-0, white)" fillOpacity="0.8" shapeRendering="crispEdges" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="28" id="filter0_d_2004_9536" width="28" x="-1" y="-2">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="1" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_2004_9536" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_2004_9536" mode="normal" result="shape" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="14" id="filter1_d_2004_9536" width="24" x="2" y="6">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="1" dy="1" />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_2004_9536" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_2004_9536" mode="normal" result="shape" />
            </filter>
            <clipPath id="clip0_2004_9536">
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
    <button className="absolute bg-[rgba(89,89,89,0.55)] box-border content-stretch cursor-pointer flex gap-2 items-center justify-center left-4 overflow-visible px-4 py-2 rounded-[2px] top-[765px]" data-name="🟢 Button (IGT)">
      <Icon2 />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-nowrap">
        <p className="leading-[22px] whitespace-pre">Show X-Ray</p>
      </div>
    </button>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-6" data-name="Icon">
      <div className="absolute bottom-[-2.08%] left-0 right-0 top-[-2.08%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 26">
          <g clipPath="url(#clip0_2004_9517)" filter="url(#filter0_d_2004_9517)" id="Icon">
            <g filter="url(#filter1_d_2004_9517)" id="path">
              <path d={svgPaths.p3ea86a00} fill="var(--fill-0, white)" fillOpacity="0.8" shapeRendering="crispEdges" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="28" id="filter0_d_2004_9517" width="28" x="-2" y="-1">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="1" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_2004_9517" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_2004_9517" mode="normal" result="shape" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="23" id="filter1_d_2004_9517" width="10" x="8" y="2.5">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="1" dy="1" />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_2004_9517" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_2004_9517" mode="normal" result="shape" />
            </filter>
            <clipPath id="clip0_2004_9517">
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
    <div className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex gap-2 items-center justify-center px-3 py-2 relative rounded-[2px] shrink-0" data-name="🟢 Button (IGT)">
      <Icon3 />
    </div>
  );
}

function VirtualRulerButton() {
  return (
    <button className="box-border content-stretch flex items-start justify-start overflow-visible p-0 relative shrink-0" data-name="Virtual Ruler Button">
      <ButtonIgt3 />
    </button>
  );
}

function EyeOffOutline() {
  return (
    <div className="relative shrink-0 size-6" data-name="EyeOffOutline">
      <div className="absolute inset-[-5.42%_-5.62%_-5.83%_-5.63%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
          <g clipPath="url(#clip0_2004_9527)" filter="url(#filter0_d_2004_9527)" id="EyeOffOutline">
            <g filter="url(#filter1_d_2004_9527)" id="path">
              <path d={svgPaths.p2c140d00} fill="var(--fill-0, white)" fillOpacity="0.8" shapeRendering="crispEdges" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="28" id="filter0_d_2004_9527" width="28" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="1" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_2004_9527" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_2004_9527" mode="normal" result="shape" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="24.7" id="filter1_d_2004_9527" width="24.7" x="2.64999" y="2.70001">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="1" dy="1" />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_2004_9527" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_2004_9527" mode="normal" result="shape" />
            </filter>
            <clipPath id="clip0_2004_9527">
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
    <button className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex gap-2 items-center justify-center overflow-visible px-3 py-2 relative rounded-[2px] shrink-0" data-name="Button (IGT)">
      <EyeOffOutline />
    </button>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch cursor-pointer flex gap-2 items-center justify-start left-2 top-[678px]" data-name="Container">
      <VirtualRulerButton />
      <ButtonIgt4 />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute h-[796px] left-1/2 top-0 translate-x-[-50%] w-[720px]" data-name="Container">
      <div className="absolute h-[796px] left-0 object-cover top-0 w-[720px]" data-name="postrecord 2" />
      <Container />
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-black h-[724px] overflow-clip relative shrink-0 w-[720px]" data-name="Container">
      <Container1 />
    </div>
  );
}

function Component2() {
  return (
    <div className="absolute left-[190.97px] size-[664.617px] top-[42.82px]" data-name="Component 2">
      <div className="absolute inset-[49.26%_49.51%_49.42%_49.17%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
          <ellipse cx="4.38692" cy="4.39415" fill="var(--fill-0, #FF830F)" id="Ellipse 35" rx="4.38692" ry="4.39415" />
        </svg>
      </div>
      <div className="absolute bg-[#ff830f] inset-[49.09%_59.9%_49.42%_39.77%]">
        <div aria-hidden="true" className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none" />
      </div>
      <div className="absolute bg-[#ff830f] inset-[49.09%_69.8%_49.42%_29.87%]">
        <div aria-hidden="true" className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none" />
      </div>
      <div className="absolute bg-[#ff830f] inset-[49.09%_40.1%_49.42%_59.57%]">
        <div aria-hidden="true" className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none" />
      </div>
      <div className="absolute flex inset-[59.5%_49.34%_40.16%_49.17%] items-center justify-center">
        <div className="flex-none h-[9.871px] rotate-[270deg] w-[2.197px]">
          <div className="bg-[#ff830f] relative size-full">
            <div aria-hidden="true" className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-[99.67%] flex items-center justify-center left-[49.17%] right-[49.34%] top-0">
        <div className="flex-none h-[9.871px] rotate-[270deg] w-[2.197px]">
          <div className="bg-[#ff830f] relative size-full">
            <div aria-hidden="true" className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none" />
          </div>
        </div>
      </div>
      <div className="absolute flex inset-[69.59%_49.34%_30.08%_49.17%] items-center justify-center">
        <div className="flex-none h-[9.871px] rotate-[270deg] w-[2.197px]">
          <div className="bg-[#ff830f] relative size-full">
            <div aria-hidden="true" className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none" />
          </div>
        </div>
      </div>
      <div className="absolute flex inset-[9.92%_49.34%_89.75%_49.17%] items-center justify-center">
        <div className="flex-none h-[9.871px] rotate-[270deg] w-[2.197px]">
          <div className="bg-[#ff830f] relative size-full">
            <div aria-hidden="true" className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none" />
          </div>
        </div>
      </div>
      <div className="absolute flex inset-[80%_49.34%_19.67%_49.17%] items-center justify-center">
        <div className="flex-none h-[9.871px] rotate-[270deg] w-[2.197px]">
          <div className="bg-[#ff830f] relative size-full">
            <div aria-hidden="true" className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none" />
          </div>
        </div>
      </div>
      <div className="absolute flex inset-[19.84%_49.34%_79.83%_49.17%] items-center justify-center">
        <div className="flex-none h-[9.871px] rotate-[270deg] w-[2.197px]">
          <div className="bg-[#ff830f] relative size-full">
            <div aria-hidden="true" className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none" />
          </div>
        </div>
      </div>
      <div className="absolute flex inset-[89.59%_49.34%_10.08%_49.17%] items-center justify-center">
        <div className="flex-none h-[9.871px] rotate-[270deg] w-[2.197px]">
          <div className="bg-[#ff830f] relative size-full">
            <div aria-hidden="true" className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none" />
          </div>
        </div>
      </div>
      <div className="absolute flex inset-[29.92%_49.34%_69.75%_49.17%] items-center justify-center">
        <div className="flex-none h-[9.871px] rotate-[270deg] w-[2.197px]">
          <div className="bg-[#ff830f] relative size-full">
            <div aria-hidden="true" className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 flex items-center justify-center left-[49.17%] right-[49.34%] top-[99.67%]">
        <div className="flex-none h-[9.871px] rotate-[270deg] w-[2.197px]">
          <div className="bg-[#ff830f] relative size-full">
            <div aria-hidden="true" className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none" />
          </div>
        </div>
      </div>
      <div className="absolute flex inset-[39.84%_49.34%_59.84%_49.17%] items-center justify-center">
        <div className="flex-none h-[9.871px] rotate-[270deg] w-[2.197px]">
          <div className="bg-[#ff830f] relative size-full">
            <div aria-hidden="true" className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none" />
          </div>
        </div>
      </div>
      <div className="absolute bg-[#ff830f] inset-[49.09%_30.03%_49.42%_69.64%]">
        <div aria-hidden="true" className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none" />
      </div>
      <div className="absolute bg-[#ff830f] inset-[49.09%_19.97%_49.42%_79.7%]">
        <div aria-hidden="true" className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none" />
      </div>
      <div className="absolute bg-[#ff830f] inset-[49.09%_10.07%_49.42%_89.6%]">
        <div aria-hidden="true" className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none" />
      </div>
      <div className="absolute bg-[#ff830f] bottom-[49.42%] left-[99.67%] right-0 top-[49.09%]">
        <div aria-hidden="true" className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none" />
      </div>
      <div className="absolute font-['CentraleSans:Book',_sans-serif] inset-[48.43%_3.5%_49.46%_92.74%] leading-[0] not-italic text-[#ff9f19] text-[10px] text-nowrap">
        <p className="leading-[14px] whitespace-pre">1 mm</p>
      </div>
      <div className="absolute bg-[#ff830f] inset-[49.09%_79.87%_49.42%_19.8%]">
        <div aria-hidden="true" className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none" />
      </div>
      <div className="absolute bg-[#ff830f] inset-[49.09%_89.77%_49.42%_9.9%]">
        <div aria-hidden="true" className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none" />
      </div>
      <div className="absolute bg-[#ff830f] bottom-[49.42%] left-0 right-[99.67%] top-[49.09%]">
        <div aria-hidden="true" className="absolute border border-[#802726] border-solid inset-[-1px] pointer-events-none" />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute contents left-[185px] top-9" data-name="Container">
      <div className="absolute left-[185px] object-cover size-[664.617px] top-9" data-name="Sequence 01 1" />
      <Component2 />
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[742px] relative shrink-0 w-[1040px]" data-name="Container">
      <Container3 />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex gap-6 h-[742px] items-start justify-start left-4 top-[87px] w-[1784px]" data-name="Container">
      <Container2 />
      <Container4 />
    </div>
  );
}

function DlsFrameFirst48() {
  return (
    <div className="absolute left-1/2 size-6 translate-x-[-50%] translate-y-[-50%]" data-name="DLS_FrameFirst_48" style={{ top: "calc(50% - 0.087px)" }}>
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
    <div className="absolute bg-[#212121] bottom-[3.23%] left-0 overflow-clip top-[2.82%] w-[70px]" data-name="Prev Frame">
      <DlsFrameFirst48 />
    </div>
  );
}

function DlsFrameLast48() {
  return (
    <div className="absolute left-1/2 size-6 translate-x-[-50%] translate-y-[-50%]" data-name="DLS_FrameLast_48" style={{ top: "calc(50% - 0.087px)" }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="DLS_FrameFirst_48">
          <path d={svgPaths.p37816600} fill="var(--fill-0, white)" fillOpacity="0.8" id="path" />
        </g>
      </svg>
    </div>
  );
}

function NextFrame() {
  return (
    <div className="absolute bg-[#212121] bottom-[3.23%] overflow-clip right-0 top-[2.82%] w-[70px]" data-name="Next Frame">
      <DlsFrameLast48 />
    </div>
  );
}

function MarkerNoReg() {
  return <div className="absolute bottom-1 h-[35px] left-[6.02%] right-[5.83%]" data-name="Marker/NoReg" />;
}

function Ild() {
  return (
    <div className="absolute h-[179px] left-4 top-[829px] w-[1543px]" data-name="ILD">
      <div className="absolute bg-[#212121] inset-0" />
      <div className="absolute bg-[#050505] bottom-[3.23%] left-0 right-[0.46%] top-[3.23%]" />
      <div className="absolute bg-[48.32%_30.76%] bg-no-repeat bg-size-[101.64%_105.31%] inset-[3.23%_70px]" data-name="image 121" style={{ backgroundImage: `url('${imgImage121}')` }} />
      <PrevFrame />
      <NextFrame />
      <MarkerNoReg />
    </div>
  );
}

function Icon4() {
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

function Button1() {
  return (
    <div className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex gap-2 items-center justify-center px-4 py-2 relative rounded-[2px] shrink-0 w-[214px]" data-name="Button">
      <Icon4 />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-nowrap">
        <p className="leading-[22px] whitespace-pre">Annotate</p>
      </div>
    </div>
  );
}

function Icon5() {
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

function Button2() {
  return (
    <div className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex gap-2 items-center justify-center px-4 py-2 relative rounded-[2px] shrink-0 w-[214px]" data-name="Button">
      <Icon5 />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-nowrap">
        <p className="leading-[22px] whitespace-pre">Save Frame</p>
      </div>
    </div>
  );
}

function LeftButtons() {
  return (
    <div className="absolute content-stretch flex gap-4 items-start justify-start left-0 top-0" data-name="Left buttons">
      <Button1 />
      <Button2 />
    </div>
  );
}

function Icon6() {
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

function Button3() {
  return (
    <div className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex gap-2 items-center justify-center px-4 py-2 relative rounded-[2px] shrink-0 w-[214px]" data-name="Button">
      <Icon6 />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-nowrap">
        <p className="leading-[22px] whitespace-pre">Bookmark</p>
      </div>
    </div>
  );
}

function Icon7() {
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

function Button4() {
  return (
    <div className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex gap-2 items-center justify-center px-4 py-2 relative rounded-[2px] shrink-0 w-[214px]" data-name="Button">
      <Icon7 />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-nowrap">
        <p className="leading-[22px] whitespace-pre">Playback</p>
      </div>
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex gap-4 items-start justify-start relative shrink-0">
      <Button4 />
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

function ButtonIgt5() {
  return (
    <div className="bg-[#1474a4] box-border content-stretch flex gap-2 items-center justify-center px-4 py-2 relative rounded-[2px] shrink-0 w-[214px]" data-name="🟢 Button (IGT)">
      <Camera />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white">
        <p className="leading-[22px] whitespace-pre">Live</p>
      </div>
    </div>
  );
}

function RightButtons() {
  return (
    <div className="absolute content-stretch flex gap-4 items-start justify-start right-0 top-0" data-name="Right buttons">
      <Button3 />
      <Frame39 />
      <ButtonIgt5 />
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
          <path d={svgPaths.p248eff00} id="Vector 47" stroke="var(--stroke-0, white)" strokeOpacity="0.8" strokeWidth="3" />
          <path d={svgPaths.p227bb8f2} id="Ellipse 36" stroke="var(--stroke-0, white)" strokeOpacity="0.8" strokeWidth="2" />
          <path d={svgPaths.p3cc08c00} id="Ellipse 37" stroke="var(--stroke-0, white)" strokeOpacity="0.8" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function SideButton() {
  return (
    <div className="bg-neutral-900 h-[76px] overflow-clip relative rounded-[2px] shrink-0 w-[88px]" data-name="SideButton">
      <DiameterIcon />
      <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-[44.5px] not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-12 translate-x-[-50%]">
        <p className="leading-[20px] whitespace-pre">Diameter</p>
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
    <div className="bg-neutral-900 h-[76px] overflow-clip relative rounded-[2px] shrink-0 w-[88px]" data-name="SideButton">
      <ManualDrawLine />
      <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-[44.5px] not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-12 translate-x-[-50%]">
        <p className="leading-[20px] whitespace-pre">Draw</p>
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
    <div className="bg-neutral-900 h-[76px] overflow-clip relative rounded-[2px] shrink-0 w-[88px]" data-name="SideButton">
      <MeasurementDots />
      <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-11 not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-12 translate-x-[-50%]">
        <p className="leading-[20px] whitespace-pre">Dots</p>
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
    <div className="bg-neutral-900 h-[76px] overflow-clip relative rounded-[2px] shrink-0 w-[88px]" data-name="SideButton">
      <AutoBorder />
      <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-11 not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-12 translate-x-[-50%]">
        <p className="leading-[20px] whitespace-pre">Auto Borders</p>
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
    <div className="bg-neutral-900 h-[76px] overflow-clip relative rounded-[2px] shrink-0 w-[88px]" data-name="SideButton">
      <DlsRotateContinuous48 />
      <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-[44.5px] not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-12 translate-x-[-50%]">
        <p className="leading-[20px] whitespace-pre">Rapid Rev.</p>
      </div>
    </div>
  );
}

function DlsCropCircle48() {
  return (
    <div className="absolute left-7 size-8 top-3" data-name="DLS_CropCircle_48">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="DLS_CropCircle_48">
          <path d={svgPaths.p1969f180} fill="var(--fill-0, white)" fillOpacity="0.8" id="path" />
        </g>
      </svg>
    </div>
  );
}

function SideButton5() {
  return (
    <div className="bg-neutral-900 h-[73px] overflow-clip relative rounded-[2px] shrink-0 w-[88px]" data-name="SideButton">
      <DlsCropCircle48 />
      <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-11 not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-12 translate-x-[-50%]">
        <p className="leading-[20px] whitespace-pre">Borders</p>
      </div>
      <div className="absolute left-[76px] size-2 top-[3px]" data-name="Toggle on">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <circle cx="4" cy="4" fill="var(--fill-0, #45DE85)" id="Toggle on" r="4" />
        </svg>
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

function SideButton6() {
  return (
    <div className="bg-neutral-900 h-[76px] overflow-clip relative rounded-[2px] shrink-0 w-[88px]" data-name="SideButton">
      <FieldOfViewIcon />
      <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-11 not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-12 translate-x-[-50%]">
        <p className="leading-[20px] whitespace-pre">50</p>
      </div>
      <div className="absolute h-3.5 left-[9px] top-[31px] w-[7px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 14">
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

function SideButton7() {
  return (
    <div className="bg-neutral-900 h-[76px] overflow-clip relative rounded-[2px] shrink-0 w-[88px]" data-name="SideButton">
      <ContrastBrightness32 />
      <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-11 not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-12 translate-x-[-50%]">
        <p className="leading-[20px] whitespace-pre">50</p>
      </div>
      <div className="absolute h-3.5 left-[9px] top-[31px] w-[7px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 14">
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

function SideButton8() {
  return (
    <div className="bg-neutral-900 h-[76px] overflow-clip relative rounded-[2px] shrink-0 w-[88px]" data-name="SideButton">
      <RevolveCenter32 />
      <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-[44.5px] not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-12 translate-x-[-50%]">
        <p className="leading-[20px] whitespace-pre">Revolve</p>
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

function SideButton9() {
  return (
    <div className="bg-neutral-900 h-[76px] overflow-clip relative rounded-[2px] shrink-0 w-[88px]" data-name="SideButton">
      <RotateIldHorizontal />
      <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-[44.5px] not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-12 translate-x-[-50%]">
        <p className="leading-[20px] whitespace-pre">Rotate ILD</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex flex-col gap-4 h-[901px] items-start justify-start left-[1816px] overflow-clip top-[72px] w-[88px]" data-name="Container">
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

function Button5() {
  return (
    <div className="bg-[dimgrey] box-border content-stretch flex gap-2 h-10 items-center justify-center px-4 py-2 relative rounded-[2px] shrink-0 w-[227px]" data-name="Button">
      <Measurement />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-nowrap">
        <p className="leading-[22px] whitespace-pre">Add Segment</p>
      </div>
    </div>
  );
}

function SegmentAdding() {
  return (
    <div className="absolute content-stretch flex items-start justify-start left-[1575px] top-[828px]" data-name="Segment adding">
      <Button5 />
    </div>
  );
}

function Scrubber() {
  return (
    <div className="absolute cursor-pointer h-[167px] left-[597px] top-[835px] w-10" data-name="Scrubber">
      <div className="absolute bottom-0 left-[-10%] right-[-10%] top-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 167">
          <g id="Scrubber">
            <path d="M25 167H23V0H25V167Z" fill="var(--fill-0, #FFDD19)" id="Union" />
            <g filter="url(#filter0_d_2004_9415)" id="Ellipse 5">
              <circle cx="24" cy="84" fill="var(--fill-0, #A28E18)" r="20" />
            </g>
            <circle cx="24" cy="84" fill="var(--fill-0, #FFDD19)" id="Ellipse 6" r="18" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="48" id="filter0_d_2004_9415" width="48" x="0" y="62">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="2" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_2004_9415" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_2004_9415" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Container7() {
  return <div className="absolute h-[159px] left-[91px] top-[845px] w-[57px]" data-name="Container" />;
}

export default function Boom() {
  return (
    <div className="bg-black relative size-full" data-name="Boom">
      <NavigationBarIgt />
      <ButtonIgt2 />
      <Container5 />
      <Ild />
      <ActionBarBeacon />
      <Container6 />
      <SegmentAdding />
      <Scrubber />
      <Container7 />
    </div>
  );
}