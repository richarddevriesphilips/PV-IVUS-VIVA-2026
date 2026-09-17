import svgPaths from "./svg-fsqwxjwt5e";
import imgPositionTheCatheterV21 from "figma:asset/9d8f3891b768a6016190129e5dcb06288d204aa9.png";
import imgImage134 from "figma:asset/99afbf22ffcead74b80cb037dcd1d1fb556cefe3.png";

function Icons() {
  return (
    <div className="absolute left-4 size-8 top-3" data-name="Icons">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="GuidanceInform">
          <path d={svgPaths.p204cd200} fill="var(--fill-0, #9DD3E3)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function Icons1() {
  return (
    <div className="absolute left-[678px] size-6 top-4" data-name="Icons">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="ChevronUp">
          <path d={svgPaths.p2e8fd500} fill="var(--fill-0, white)" fillOpacity="0.8" id="path" />
        </g>
      </svg>
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute bg-[#212121] h-[720px] left-4 overflow-clip top-[87px] w-[720px]">
      <div className="absolute font-['CentraleSans:Bold',_sans-serif] leading-[0] left-16 not-italic text-[#9dd3e3] text-[24px] text-left text-nowrap top-3.5">
        <p className="block leading-[28px] whitespace-pre">Sync Playback guide</p>
      </div>
      <Icons />
      <Icons1 />
      <div className="absolute flex flex-col font-['CentraleSans:Bold',_sans-serif] justify-center leading-[0] left-[60px] not-italic text-[#d6d6d6] text-[24px] text-left top-[548px] translate-y-[-50%] w-[617px]">
        <p className="block leading-[28px]">Position the catheter</p>
      </div>
      <div className="absolute flex flex-col font-['CentraleSans:Bold',_sans-serif] justify-center leading-[0] left-[60px] not-italic opacity-80 text-[#d6d6d6] text-[0px] text-left top-[596px] translate-y-[-50%] w-[617px]">
        <p className="block font-['CentraleSans:Book',_sans-serif] leading-[28px] text-[24px]">Press ‘Record’</p>
      </div>
      <div className="absolute flex flex-col font-['CentraleSans:Bold',_sans-serif] justify-center leading-[0] left-[60px] not-italic opacity-80 text-[#d6d6d6] text-[0px] text-left top-[658px] translate-y-[-50%] w-[617px]">
        <p className="block font-['CentraleSans:Book',_sans-serif] leading-[28px] text-[24px]">
          To include synchronized x-ray imaging, press the fluoro footpedal as needed during pullback
        </p>
      </div>
      <div className="absolute left-6 size-3 top-[589px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
          <circle cx="6" cy="6" fill="var(--fill-0, white)" id="Ellipse 2" opacity="0.3" r="6" />
        </svg>
      </div>
      <div className="absolute left-6 size-3 top-[541px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" role="presentation" viewBox="0 0 12 12">
          <circle cx="6" cy="6" fill="var(--fill-0, #9DD3E3)" id="Ellipse 1" r="6" />
        </svg>
      </div>
      <div className="absolute left-6 size-3 top-[652px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
          <circle cx="6" cy="6" fill="var(--fill-0, white)" id="Ellipse 2" opacity="0.3" r="6" />
        </svg>
      </div>
      <div
        className="absolute bg-center bg-cover bg-no-repeat left-[145px] size-[430px] top-[74px]"
        data-name="position the catheter v2 1"
        style={{ backgroundImage: `url('${imgPositionTheCatheterV21}')` }}
      />
    </div>
  );
}

function Icon() {
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

function Button() {
  return (
    <div
      className="absolute bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-row gap-2 items-center justify-center left-4 px-4 py-2 rounded-sm top-[1024px] w-[214px]"
      data-name="Button"
    >
      <Icon />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-left text-nowrap">
        <p className="block leading-[22px] whitespace-pre">Save Frame</p>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-6" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.pc15d00} fill="var(--fill-0, #E8E8E8)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div
      className="absolute bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-row gap-2 items-center justify-center left-[1005px] px-4 py-2 rounded-sm top-[1024px] w-[214px]"
      data-name="Button"
    >
      <Icon1 />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-left text-nowrap">
        <p className="block leading-[22px] whitespace-pre">Freeze</p>
      </div>
    </div>
  );
}

function Ringdown() {
  return (
    <div className="relative shrink-0 size-6" data-name="Ringdown">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Ringdown">
          <path d={svgPaths.p315022f0} fill="var(--fill-0, white)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt() {
  return (
    <div
      className="absolute bg-[#1474a4] box-border content-stretch flex flex-row gap-2 items-center justify-center left-[1235px] px-4 py-2 rounded-sm top-[1024px] w-[214px]"
      data-name="🟢 Button (IGT)"
    >
      <Ringdown />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap">
        <p className="block leading-[22px] whitespace-pre">Ringdown</p>
      </div>
    </div>
  );
}

function Record() {
  return (
    <div className="relative shrink-0 size-6" data-name="Record">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Record">
          <path d={svgPaths.p275e1550} fill="var(--fill-0, white)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt1() {
  return (
    <div
      className="absolute bg-[#1474a4] box-border content-stretch flex flex-row gap-2 items-center justify-center left-[1465px] px-4 py-2 rounded-sm top-[1024px] w-[214px]"
      data-name="🟢 Button (IGT)"
    >
      <Record />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap">
        <p className="block leading-[22px] whitespace-pre">Record</p>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-8" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <rect fill="#E8E8E8" height="32" width="32" />
          <path d={svgPaths.p3dc7b500} fill="var(--fill-0, white)" fillOpacity="0.8" id="path" />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt3() {
  return (
    <div
      className="absolute bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-col gap-0.5 inset-0 items-center justify-center pb-1 pt-1.5 px-1 rounded-sm"
      data-name="🟢 Button (IGT)"
    >
      <Icon3 />
      <div
        className="font-['CentraleSans:Book',_sans-serif] leading-[0] min-w-full not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#d6d6d6] text-[14px] text-center text-nowrap"
        style={{ width: "min-content" }}
      >
        <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[20px] overflow-inherit">
          ChromaFlo
        </p>
      </div>
    </div>
  );
}

function Group25() {
  return (
    <div className="absolute contents inset-0">
      <ButtonIgt3 />
      <div className="absolute inset-[9.38%_6.82%_78.13%_84.09%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <circle cx="4" cy="4" fill="var(--fill-0, #595959)" fillOpacity="0.55" id="Ellipse 23" r="4" />
        </svg>
      </div>
    </div>
  );
}

function ChromaFlo() {
  return (
    <div className="absolute h-16 left-[1816px] top-[944px] w-[88px]" data-name="ChromaFlo">
      <Group25 />
    </div>
  );
}

function Component2() {
  return (
    <div className="absolute left-[97px] size-[780px] top-[38px]" data-name="Component 2">
     
     
    </div>
  );
}

function Group62() {
  return (
    <div className="absolute contents left-[97px] top-[38px]">
      <Component2 />
    </div>
  );
}

function Group70() {
  return (
    <div className="absolute contents left-6 top-[-12px]">
      <div className="absolute flex flex-col font-['CentraleSans:Book',_sans-serif] h-[54px] justify-center leading-[0] left-6 not-italic text-[#7fc242] text-[0px] text-left top-[15px] translate-y-[-50%] w-[133px]">
        <p className="block font-['CentraleSans:Bold',_sans-serif] leading-[28px] text-[20px]">LIVE</p>
      </div>
      <div className="absolute flex flex-col font-['CentraleSans:Book',_sans-serif] justify-center leading-[0] left-[49px] not-italic text-[20px] text-[rgba(255,255,255,0.8)] text-left text-nowrap top-[49px] translate-y-[-50%]">
        <p className="block leading-[28px] whitespace-pre">PV 0.35</p>
      </div>
      <div className="absolute left-6 size-4 top-[41px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
          <circle cx="8" cy="8" fill="var(--fill-0, #7FC242)" id="Ellipse 56" r="8" />
        </svg>
      </div>
    </div>
  );
}

function Frame84() {
  return (
    <div className="absolute h-[825px] left-[837px] top-[87px] w-[927px]">
      <div
        className="absolute bg-center bg-cover bg-no-repeat inset-[2.54%_3.67%_-2.42%_7.44%]"
        data-name="image 134"
        style={{ backgroundImage: `url('${imgImage134}')` }}
      />
      <Group62 />
      <Group70 />
    </div>
  );
}

function ToggleSwitch() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start p-0 relative shrink-0"
      data-name="Toggle Switch"
    >
      <div className="bg-[#45de85] h-4 rounded-[100px] shrink-0 w-10" data-name="track" />
      <div
        className="absolute bg-[#e8e8e8] right-[-4px] rounded-[100px] size-6 top-1/2 translate-y-[-50%]"
        data-name="thumb"
      >
        <div
          aria-hidden="true"
          className="absolute border border-[#8c8c8c] border-solid inset-0 pointer-events-none rounded-[100px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.45)]"
        />
      </div>
    </div>
  );
}

function ContentSpacer() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-3 h-6 items-center justify-start p-0 relative shrink-0"
      data-name="Content spacer"
    >
      <ToggleSwitch />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-left text-nowrap">
        <p className="block leading-[22px] whitespace-pre">Sync Playback</p>
      </div>
    </div>
  );
}

function ToggleSwitchButton() {
  return (
    <div
      className="absolute bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-row gap-2 items-center justify-center left-[1695px] pl-4 pr-3 py-2 rounded-sm top-[1024px] w-[209px]"
      data-name="Toggle switch button"
    >
      <ContentSpacer />
    </div>
  );
}

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

function Button2() {
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
      <Button2 />
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

function Icon4() {
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

function ButtonIgt4() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-3 py-2 relative rounded-sm shrink-0 size-10"
      data-name="🟢 Button (IGT)"
    >
      <Icon4 />
    </div>
  );
}

function Icon5() {
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

function ButtonIgt5() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-3 py-2 relative rounded-sm shrink-0 size-10"
      data-name="🟢 Button (IGT)"
    >
      <Icon5 />
    </div>
  );
}

function Icons2() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 items-center justify-end p-0 relative shrink-0"
      data-name="Icons"
    >
      <ButtonIgt4 />
      <ButtonIgt5 />
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
      <Icons2 />
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

function DlsContrastBrightness48() {
  return (
    <div className="relative shrink-0 size-8" data-name="DLS_ContrastBrightness_48">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="DLS_ContrastBrightness_48">
          <path d={svgPaths.p30e8f500} fill="var(--fill-0, #E8E8E8)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt6() {
  return (
    <div
      className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 relative rounded shrink-0 w-[88px]"
      data-name="🟢 Button (IGT)"
    >
      <DlsContrastBrightness48 />
      <div
        className="font-['CentraleSans:Book',_sans-serif] leading-[0] min-w-full not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#e8e8e8] text-[14px] text-center text-nowrap"
        style={{ width: "min-content" }}
      >
        <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[20px] overflow-inherit">
          60
        </p>
      </div>
    </div>
  );
}

function FieldOfViewIcon() {
  return (
    <div className="relative shrink-0 size-8" data-name="FieldOfViewIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="FieldOfViewIcon">
          <path d={svgPaths.p17c13900} fill="var(--fill-0, #E8E8E8)" id="Union" />
          <path d={svgPaths.p23655800} fill="var(--fill-0, #ADADAD)" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt7() {
  return (
    <div
      className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 relative rounded shrink-0 w-[88px]"
      data-name="🟢 Button (IGT)"
    >
      <FieldOfViewIcon />
      <div
        className="font-['CentraleSans:Book',_sans-serif] leading-[0] min-w-full not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#e8e8e8] text-[14px] text-center text-nowrap"
        style={{ width: "min-content" }}
      >
        <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[20px] overflow-inherit">
          2mm
        </p>
      </div>
    </div>
  );
}

function DlsRingdown48() {
  return (
    <div className="relative shrink-0 size-8" data-name="DLS_Ringdown_48">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="DLS_Ringdown_48">
          <path d={svgPaths.p3907b300} fill="var(--fill-0, #E8E8E8)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt8() {
  return (
    <div
      className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 relative rounded shrink-0 w-[88px]"
      data-name="🟢 Button (IGT)"
    >
      <DlsRingdown48 />
      <div
        className="font-['CentraleSans:Book',_sans-serif] leading-[0] min-w-full not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#e8e8e8] text-[14px] text-center text-nowrap"
        style={{ width: "min-content" }}
      >
        <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[20px] overflow-inherit">
          Adaptive
        </p>
      </div>
    </div>
  );
}

function RevolveCenter32() {
  return (
    <div className="relative shrink-0 size-8" data-name="RevolveCenter_32">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="RevolveCenter_32">
          <path d={svgPaths.p642e380} fill="var(--fill-0, #E8E8E8)" id="path" opacity="0.5" />
          <path d={svgPaths.p1b2b1700} fill="var(--fill-0, #E8E8E8)" id="path_2" />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt9() {
  return (
    <div
      className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 relative rounded shrink-0 w-[88px]"
      data-name="🟢 Button (IGT)"
    >
      <RevolveCenter32 />
      <div
        className="font-['CentraleSans:Book',_sans-serif] leading-[0] min-w-full not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#e8e8e8] text-[14px] text-center text-nowrap"
        style={{ width: "min-content" }}
      >
        <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[20px] overflow-inherit">
          Revolve
        </p>
      </div>
    </div>
  );
}

function Frame97() {
  return (
    <div className="absolute bottom-0 box-border content-stretch flex flex-col gap-4 items-start justify-start left-[81.2%] p-0 right-0 top-0">
      <ButtonIgt6 />
      <ButtonIgt7 />
      <ButtonIgt8 />
      <ButtonIgt9 />
    </div>
  );
}

function Frame94() {
  return (
    <div className="basis-0 bg-[rgba(0,0,0,0.4)] grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-row items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-[13px] py-[18px] relative w-full">
          <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[20px] text-center w-24">
            <p className="block leading-[28px]">Ringdown</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame93() {
  return (
    <div className="basis-0 bg-[#696969] grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-row items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-[13px] py-[18px] relative w-full">
          <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[20px] text-center text-nowrap">
            <p className="block leading-[28px] whitespace-pre">Adaptive</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame92() {
  return (
    <div className="basis-0 bg-[#323232] grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-row items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-[13px] py-[18px] relative w-full">
          <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[20px] text-center text-nowrap">
            <p className="block leading-[28px] whitespace-pre">Manual</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame98() {
  return (
    <div className="absolute bottom-[26.32%] box-border content-stretch flex flex-row items-center justify-start left-0 opacity-0 p-0 right-[20.51%] top-[52.63%]">
      <Frame94 />
      <Frame93 />
      <Frame92 />
    </div>
  );
}

function MinusSolid() {
  return (
    <div className="relative shrink-0 size-6" data-name="MinusSolid">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="MinusSolid">
          <path d={svgPaths.p1cff4700} fill="var(--fill-0, white)" fillOpacity="0.5" id="path" />
        </g>
      </svg>
    </div>
  );
}

function Frame90() {
  return (
    <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start p-[10px] relative shrink-0">
      <MinusSolid />
    </div>
  );
}

function Track() {
  return (
    <div className="basis-0 bg-[#00bd5e] grow h-1 min-h-px min-w-px relative shrink-0" data-name=".Track">
      <div className="absolute bg-[#00bd5e] inset-0" data-name="track-filled" />
      <div className="absolute bg-[#00bd5e] inset-0" data-name="track-filled" />
    </div>
  );
}

function Track2() {
  return (
    <div className="basis-0 grow h-1 min-h-px min-w-px relative shrink-0" data-name=".Track">
      <div className="absolute bg-[rgba(255,255,255,0.5)] inset-0" data-name="track-filled" />
      <div className="absolute bg-[rgba(255,255,255,0.5)] inset-0" data-name="track-filled" />
    </div>
  );
}

function Thumb() {
  return (
    <div className="absolute left-1/2 size-10 top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name=".Thumb">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" role="presentation" viewBox="0 0 40 40">
        <g id=".Thumb">
          <circle cx="20" cy="20" fill="var(--fill-0, #EDEDED)" id="Ellipse 51" r="8" />
        </g>
      </svg>
    </div>
  );
}

function SliderControl() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center min-h-10 p-0 relative shrink-0 w-full"
      data-name=".Slider control"
    >
      {[...Array(2).keys()].map((_, i) => (
        <Track key={i} />
      ))}
      {[...Array(2).keys()].map((_, i) => (
        <Track2 key={i} />
      ))}
      <Thumb />
    </div>
  );
}

function Slider() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-1 items-start justify-start p-0 relative shrink-0 w-[146px]"
      data-name="Slider"
    >
      <SliderControl />
    </div>
  );
}

function PlusSolid() {
  return (
    <div className="relative shrink-0 size-6" data-name="PlusSolid">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="PlusSolid">
          <path d={svgPaths.p2a37c800} fill="var(--fill-0, white)" fillOpacity="0.5" id="path" />
        </g>
      </svg>
    </div>
  );
}

function Frame99() {
  return (
    <div className="absolute bg-[#000000] bottom-[52.63%] box-border content-stretch flex flex-row gap-[7px] items-center justify-end left-0 opacity-0 overflow-clip px-4 py-2.5 right-[20.51%] top-[26.32%]">
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[20px] text-center text-nowrap">
        <p className="block leading-[28px] whitespace-pre">FOV</p>
      </div>
      <Frame90 />
      <Slider />
      <PlusSolid />
    </div>
  );
}

function MinusSolid1() {
  return (
    <div className="relative shrink-0 size-6" data-name="MinusSolid">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="MinusSolid">
          <path d={svgPaths.p1cff4700} fill="var(--fill-0, white)" fillOpacity="0.5" id="path" />
        </g>
      </svg>
    </div>
  );
}

function Frame91() {
  return (
    <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start p-[10px] relative shrink-0">
      <MinusSolid1 />
    </div>
  );
}

function Track4() {
  return (
    <div className="basis-0 bg-[#00bd5e] grow h-1 min-h-px min-w-px relative shrink-0" data-name=".Track">
      <div className="absolute bg-[#00bd5e] inset-0" data-name="track-filled" />
      <div className="absolute bg-[#00bd5e] inset-0" data-name="track-filled" />
    </div>
  );
}

function Track6() {
  return (
    <div className="basis-0 grow h-1 min-h-px min-w-px relative shrink-0" data-name=".Track">
      <div className="absolute bg-[rgba(255,255,255,0.5)] inset-0" data-name="track-filled" />
      <div className="absolute bg-[rgba(255,255,255,0.5)] inset-0" data-name="track-filled" />
    </div>
  );
}

function Thumb1() {
  return (
    <div className="absolute left-1/2 size-10 top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name=".Thumb">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" role="presentation" viewBox="0 0 40 40">
        <g id=".Thumb">
          <circle cx="20" cy="20" fill="var(--fill-0, #EDEDED)" id="Ellipse 51" r="8" />
        </g>
      </svg>
    </div>
  );
}

function SliderControl1() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center min-h-10 p-0 relative shrink-0 w-full"
      data-name=".Slider control"
    >
      {[...Array(2).keys()].map((_, i) => (
        <Track4 key={i} />
      ))}
      {[...Array(2).keys()].map((_, i) => (
        <Track6 key={i} />
      ))}
      <Thumb1 />
    </div>
  );
}

function Slider1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-1 items-start justify-start p-0 relative shrink-0 w-[146px]"
      data-name="Slider"
    >
      <SliderControl1 />
    </div>
  );
}

function PlusSolid1() {
  return (
    <div className="relative shrink-0 size-6" data-name="PlusSolid">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="PlusSolid">
          <path d={svgPaths.p2a37c800} fill="var(--fill-0, white)" fillOpacity="0.5" id="path" />
        </g>
      </svg>
    </div>
  );
}

function Frame100() {
  return (
    <div className="absolute bg-[#000000] bottom-[78.95%] box-border content-stretch flex flex-row gap-[7px] items-center justify-end left-0 opacity-0 overflow-clip px-4 py-2.5 right-[20.51%] top-0">
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[20px] text-nowrap text-right">
        <p className="block leading-[28px] whitespace-pre">Gain</p>
      </div>
      <Frame91 />
      <Slider1 />
      <PlusSolid1 />
    </div>
  );
}

function SideBar() {
  return (
    <div className="absolute h-[304px] left-[1436px] top-[72px] w-[468px]" data-name="Side Bar">
      <Frame97 />
      <Frame98 />
      <Frame99 />
      <Frame100 />
    </div>
  );
}

export default function Boom() {
  return (
    <div className="bg-[#000000] relative size-full" data-name="Boom">
      <Frame4 />
      <Button />
      <Button1 />
      <ButtonIgt />
      <ButtonIgt1 />
      <ChromaFlo />
      <Frame84 />
      <ToggleSwitchButton />
      <NavigationBarIgt />
      <SideBar />
    </div>
  );
}