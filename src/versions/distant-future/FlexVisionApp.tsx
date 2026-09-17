import { useEffect, useRef, useState, useCallback, type ReactNode } from "react";
import svgPaths from "./svg-paths";
import FramePlayer from "../../components/FramePlayer";
import IntrasightWindow from "./IntrasightWindow";
import imgImage2 from "figma:asset/2a97af415690c33899ec327cbd66050b75adba61.png";
import imgRectangle10 from "figma:asset/c9086bd51fc782e98eaacdee902113f255daaed2.png";
import imgRectangle11 from "figma:asset/0aa26374bbdf16857809de604ec48e1e0389d7d8.png";
import imgRectangle12 from "figma:asset/6db7f8b1b112d0b9a9945d819dc6319570b02c6d.png";
import imgRectangle13 from "figma:asset/fe558658e6b0596a10cdf774759a838bea1b9470.png";
import imgRectangle14 from "figma:asset/0af03daee20e24daa5d9333f76cda7130f909051.png";
import imgRectangle15 from "figma:asset/f335dd870d73d3a3a42625b146863522001a070f.png";
import imgRectangle16 from "figma:asset/a05764f1b689ed6937d133abf58e8584fe89dd5d.png";
import imgImage11 from "figma:asset/9658092021be4f26ecf8b1d1daa7d9530ccdde74.png";

function Background() {
  return <div className="bg-[#383838] flex-[1_0_0] h-full min-h-px min-w-px" data-name="Background" />;
}

function PhilipsWordmark() {
  return (
    <div className="h-[15px] relative shrink-0 w-[77px]" data-name="philips-wordmark-2">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77 15">
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
    <div className="content-stretch flex flex-col h-[15px] items-center px-[8px] relative shrink-0" data-name="wordmark">
      <PhilipsWordmark />
    </div>
  );
}

function SolutionName() {
  return (
    <div className="content-stretch flex items-center px-[8px] relative shrink-0" data-name="solution name">
      <p className="font-centrale-sans-medium leading-[28px] not-italic relative shrink-0 text-[20px] text-[rgba(255,255,255,0.8)] whitespace-nowrap">Azurion</p>
    </div>
  );
}

function Left1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Left">
      <Wordmark />
      <SolutionName />
    </div>
  );
}

function Left() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex gap-[48px] h-[48px] items-center left-[8px] pl-[8px] top-1/2" data-name="Left">
      <Left1 />
    </div>
  );
}

function Time() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Time">
      <div className="flex flex-col font-centrale-sans-ds-book justify-center leading-[0] not-italic relative shrink-0 text-[#d6d6d6] text-[20px] whitespace-nowrap">
        <p className="leading-[28px]">{` `}</p>
      </div>
    </div>
  );
}

function DateTimeUser() {
  return (
    <div className="content-stretch flex gap-[20px] items-center justify-end relative shrink-0" data-name="Date + Time + User">
      <div className="flex flex-col font-centrale-sans-book justify-center leading-[0] not-italic relative shrink-0 text-[#d6d6d6] text-[20px] whitespace-nowrap">
        <p className="leading-[28px]">31-Jan-2024</p>
      </div>
      <Time />
    </div>
  );
}

function Icons() {
  return <div className="content-stretch flex gap-[4px] h-[40px] items-center justify-end shrink-0 w-[172px]" data-name="Icons" />;
}

function Right() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex h-[48px] items-center justify-end right-[16px] top-1/2" data-name="Right">
      <div className="content-stretch flex gap-[12px] h-[48px] items-center justify-end relative shrink-0" data-name="Right side">
        <DateTimeUser />
        <Icons />
      </div>
    </div>
  );
}

function TopRow() {
  return (
    <div className="content-stretch flex gap-[10px] h-[56px] items-center relative shrink-0 w-full" data-name="Top row">
      <Background />
      <Left />
      <Right />
    </div>
  );
}

function Igt32PxFvApps() {
  return (
    <div className="col-1 h-[29.5px] ml-0 mt-0 relative row-1 w-[30.066px]" data-name="IGT-/-32px-/-FVApps">
      <div className="absolute inset-[0_-3.36%_-1.69%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.0758 30">
          <g id="IGT-/-32px-/-FVApps">
            <path clipRule="evenodd" d={svgPaths.p3d3a7100} fill="var(--fill-0, white)" fillOpacity="0.15" fillRule="evenodd" id="Path-3" />
            <path clipRule="evenodd" d={svgPaths.p12686900} fill="var(--fill-0, white)" fillRule="evenodd" id="Path-2" />
            <path d={svgPaths.p14580380} fill="var(--fill-0, white)" id="Rectangle" opacity="0.5" />
            <path d={svgPaths.pe1d4700} fill="var(--fill-0, white)" id="Rectangle_2" opacity="0.6" />
            <path d={svgPaths.p1340eb80} fill="var(--fill-0, white)" id="Rectangle_3" opacity="0.7" />
            <path d={svgPaths.p323e7400} fill="var(--fill-0, white)" id="Rectangle_4" opacity="0.4" />
            <path d={svgPaths.p3fed3700} id="Rectangle_5" stroke="var(--stroke-0, white)" strokeOpacity="0.3" />
            <path clipRule="evenodd" d={svgPaths.p3afb6800} fill="var(--fill-0, white)" fillRule="evenodd" id="Path" stroke="var(--stroke-0, black)" />
            <path d="M10 1H9V19H10V1Z" fill="var(--fill-0, white)" fillOpacity="0.2" id="Rectangle_6" />
            <path d="M9 9H1V10H9V9Z" fill="var(--fill-0, white)" fillOpacity="0.2" id="Rectangle_7" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function DDlsFv() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[531px] mt-[13px] place-items-start relative row-1" data-name="dDLS-FV">
      <Igt32PxFvApps />
    </div>
  );
}

function DDlsTsmTestFindings() {
  return (
    <div className="absolute contents inset-0" data-name="dDLS-TSM-Test-findings">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Apps">
          <path d="M48 0H0V48H48V0Z" fill="var(--fill-0, black)" id="Rectangle" opacity="0" />
          <path d={svgPaths.pa955b00} fill="var(--fill-0, white)" id="Rectangle_2" opacity="0.5" />
          <path d={svgPaths.p30fe3700} fill="var(--fill-0, white)" id="Rectangle_3" opacity="0.7" />
          <path d={svgPaths.p3d5f6d80} fill="var(--fill-0, white)" id="Rectangle_4" opacity="0.6" />
          <path d={svgPaths.p14c8a700} fill="var(--fill-0, white)" id="Rectangle_5" opacity="0.4" />
        </g>
      </svg>
    </div>
  );
}

function Apps() {
  return (
    <div className="col-1 ml-[308px] mt-[4px] overflow-clip relative row-1 size-[48px]" data-name="Apps 1">
      <DDlsTsmTestFindings />
    </div>
  );
}

function Group2() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
      <div className="bg-[#383838] col-1 h-[56px] ml-[3517px] mt-0 row-1 w-[323px]" />
      <div className="col-1 content-stretch flex flex-col items-start ml-0 mt-0 relative row-1 w-[3840px]" data-name="🟢 Navigation bar (IGT)">
        <div className="content-stretch flex flex-col items-center relative shadow-[0px_1px_6px_0px_rgba(0,0,0,0.2)] shrink-0 w-full" data-name="Template">
          <TopRow />
        </div>
      </div>
      <p className="col-1 font-centrale-sans-book leading-[20px] ml-[368px] mt-[18px] not-italic relative row-1 text-[#d6d6d6] text-[20px] text-center whitespace-nowrap">Applications</p>
      <p className="col-1 font-centrale-sans-book leading-[20px] ml-[574px] mt-[18px] not-italic relative row-1 text-[#d6d6d6] text-[20px] text-center whitespace-nowrap">Presets</p>
      <DDlsFv />
      <Apps />
    </div>
  );
}

function Frame58() {
  return (
    <div className="col-1 ml-[687px] mt-[12px] relative row-1 size-[32px]">
      <div className="absolute inset-[0_-3.13%_0_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33 32">
          <g id="Frame 328">
            <rect fill="var(--fill-0, #565656)" height="19" id="Rectangle 1875" rx="0.5" stroke="var(--stroke-0, white)" width="25" x="0.5" y="4.5" />
            <path d={svgPaths.p3d02ea00} fill="var(--fill-0, #D6D6D6)" id="path" stroke="var(--stroke-0, #383838)" />
            <line id="Line 16" stroke="var(--stroke-0, #787878)" x1="9.5" x2="9.5" y1="5" y2="23" />
            <line id="Line 17" stroke="var(--stroke-0, #787878)" x1="1" x2="10" y1="13.5" y2="13.5" />
            <circle cx="24" cy="23" fill="var(--fill-0, #8C8C8C)" id="Ellipse 18" r="3" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function ToggleButtonIgt() {
  return (
    <div className="bg-[rgba(89,89,89,0.55)] col-1 content-stretch flex items-center justify-center ml-[743px] mt-[8px] px-[12px] py-[8px] relative rounded-[2px] row-1 size-[40px]" data-name="🟡 Toggle button (IGT)">
      <div aria-hidden="true" className="absolute border border-[#d6d6d6] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <div className="overflow-clip relative shrink-0 size-[32px]" data-name="Icon">
        <div className="absolute inset-[8.33%]" data-name="path">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.6667 26.6667">
            <path d={svgPaths.p2fe7ae00} fill="var(--fill-0, #E8E8E8)" id="path" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group7() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Group2 />
      <Frame58 />
      <ToggleButtonIgt />
    </div>
  );
}

const imgFluoroIndicator = new URL("../../../livex-ray.svg", import.meta.url).href;

function RadiationIndicator() {
  return (
    <img alt="Fluoro on" src={imgFluoroIndicator} width={48} height={48} className="shrink-0" />
  );
}

function SystemState() {
  const [fluoroOn, setFluoroOn] = useState(false);

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !e.repeat) {
        e.preventDefault();
        setFluoroOn(true);
      }
    };
    const onUp = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        setFluoroOn(false);
      }
    };
    const onMsg = (e: MessageEvent) => {
      if (e.data?.type === "intrasight-fluoro") {
        setFluoroOn(e.data.on);
      }
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    window.addEventListener("message", onMsg);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
      window.removeEventListener("message", onMsg);
    };
  }, []);

  return (
    <div className="absolute content-stretch flex flex-col gap-[40px] items-start left-[6px] top-[44px]" data-name="System state">
      <div className="content-stretch flex flex-col items-start pl-[16px] relative shrink-0">
        <div className="h-[34px] relative shrink-0 w-[36px]" data-name="image 2">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage2} />
        </div>
      </div>
      <div className="bg-[#4d4d4d] h-px shrink-0 w-[296px]" />
      {fluoroOn && (
        <img
          alt="Fluoro on"
          src={imgFluoroIndicator}
          width={48}
          height={48}
          className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none"
        />
      )}
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute content-stretch flex flex-col font-centrale-sans-cnd-medium items-end leading-[34px] not-italic pb-[9px] right-[-2px] text-right top-0 whitespace-nowrap">
      <p className="relative shrink-0 text-[#b0b0b0] text-[34px]">44</p>
      <p className="relative shrink-0 text-[#696969] text-[20px]">KV</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute content-stretch flex flex-col font-centrale-sans-cnd-medium items-end leading-[34px] not-italic pb-[9px] right-[-2px] text-right top-0 whitespace-nowrap">
      <p className="relative shrink-0 text-[#b0b0b0] text-[34px]">59</p>
      <p className="relative shrink-0 text-[#696969] text-[20px]">mA</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute content-stretch flex flex-col font-centrale-sans-cnd-medium items-end leading-[34px] not-italic pb-[9px] right-[-2px] text-right top-0 whitespace-nowrap">
      <p className="relative shrink-0 text-[#b0b0b0] text-[34px]">3</p>
      <p className="relative shrink-0 text-[#696969] text-[20px]">ms</p>
    </div>
  );
}

function KvMAMs() {
  return (
    <div className="content-stretch flex gap-[42px] items-start relative shrink-0" data-name="KV mA ms">
      <div className="h-[59px] relative shrink-0 w-[38px]" data-name="Value and Unit">
        <Frame1 />
      </div>
      <div className="h-[59px] relative shrink-0 w-[38px]" data-name="Value and Unit">
        <Frame4 />
      </div>
      <div className="h-[59px] relative shrink-0 w-[38px]" data-name="Value and Unit">
        <Frame5 />
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="col-1 content-stretch flex gap-[42px] items-start ml-0 mt-0 relative row-1">
      <div className="overflow-clip relative shrink-0 size-[48px]" data-name="ExposureLabel">
        <div className="absolute inset-[8.33%_17.71%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31 40">
            <path d={svgPaths.p1373b00} fill="var(--fill-0, #B0B0B0)" id="Vector" />
          </svg>
        </div>
      </div>
      <KvMAMs />
    </div>
  );
}

function ExposureParameters() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Exposure parameters">
      <Frame2 />
    </div>
  );
}

function Section() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[30px] items-center left-[6px] top-[152px]" data-name="Section 2">
      <ExposureParameters />
      <div className="bg-[#4d4d4d] h-px shrink-0 w-[296px]" />
    </div>
  );
}

function DlsStopwatch1() {
  return <div className="absolute h-[41px] left-[44px] top-[1934px] w-[40px]" data-name="DLS_Stopwatch_48 1" />;
}

function DlsStopwatch() {
  return (
    <div className="col-1 h-[33.525px] ml-0 mt-0 relative row-1 w-[30px]" data-name="DLS_Stopwatch_48">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 33.5245">
        <g id="DLS_Stopwatch_48">
          <path d={svgPaths.p3dd79800} fill="var(--fill-0, #B0B0B0)" id="Shape" />
        </g>
      </svg>
    </div>
  );
}

function StatusAreaFlexVisionVerticalBiplane() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-name="Status-area/FlexVision/vertical/biplane">
      <DlsStopwatch />
    </div>
  );
}

function CorFvViewingOverview() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Cor_FV_Viewing_overview">
      <StatusAreaFlexVisionVerticalBiplane />
    </div>
  );
}

function ForPpt() {
  return (
    <div className="content-stretch flex gap-[80px] items-end pl-[60px] relative shrink-0" data-name="for-ppt">
      <CorFvViewingOverview />
      <p className="font-centrale-sans-cnd-medium leading-[34px] not-italic relative shrink-0 text-[#b0b0b0] text-[34px] text-right whitespace-nowrap">11:14 AM</p>
    </div>
  );
}

function Frame21() {
  return (
    <div className="absolute bottom-[22px] content-stretch flex flex-col gap-[15px] items-center left-[6px]">
      <div className="bg-[#4d4d4d] h-px shrink-0 w-[296px]" />
      <ForPpt />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="overflow-clip relative shrink-0 size-[40px]" data-name="DLS_TiltAngle_48">
        <div className="absolute inset-[10.85%_12.96%_10.06%_12.5%]" data-name="path">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.8167 31.6333">
            <path d={svgPaths.p247f9c00} fill="var(--fill-0, #8C8C8C)" id="path" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center pl-[20px] pr-[10px] py-[10px] relative shrink-0">
      <p className="font-centrale-sans-cnd-medium-noto leading-[34px] relative shrink-0 text-[#b0b0b0] text-[34px] text-right whitespace-nowrap" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 500" }}>
        0ᵒ
      </p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col items-start left-1/2 top-1/2">
      <Frame8 />
      <Frame6 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="relative shrink-0 size-[40px]">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgRectangle10} />
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center pl-[20px] pr-[10px] py-[10px] relative shrink-0">
      <p className="font-centrale-sans-cnd-medium-noto leading-[34px] relative shrink-0 text-[#b0b0b0] text-[34px] text-right whitespace-nowrap" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 500" }}>
        0ᵒ
      </p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col items-start left-1/2 top-1/2">
      <Frame11 />
      <Frame12 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="relative shrink-0 size-[40px]">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgRectangle11} />
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center pl-[20px] pr-[10px] py-[10px] relative shrink-0">
      <p className="font-centrale-sans-cnd-medium-noto leading-[34px] relative shrink-0 text-[#b0b0b0] text-[34px] text-right whitespace-nowrap" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 500" }}>
        0ᵒ
      </p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col items-start left-1/2 top-1/2">
      <Frame14 />
      <Frame15 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex gap-[18px] items-start pl-[16px] relative shrink-0">
      <div className="h-[94px] relative shrink-0 w-[80px]" data-name="Angle values">
        <Frame7 />
      </div>
      <div className="h-[94px] relative shrink-0 w-[80px]" data-name="Angle values">
        <Frame10 />
      </div>
      <div className="h-[94px] relative shrink-0 w-[80px]" data-name="Angle values">
        <Frame13 />
      </div>
    </div>
  );
}

function Section2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[10px] items-center left-[6px] top-[541px]" data-name="Section 4">
      <Frame9 />
      <div className="bg-[#4d4d4d] h-px shrink-0 w-[296px]" />
    </div>
  );
}

function Frame18() {
  return (
    <div className="absolute content-stretch flex flex-col font-centrale-sans-cnd-medium items-end leading-[34px] not-italic pb-[9px] right-[-2px] text-right top-0 whitespace-nowrap">
      <p className="relative shrink-0 text-[#b0b0b0] text-[34px]">117</p>
      <p className="relative shrink-0 text-[#696969] text-[20px]">cm</p>
    </div>
  );
}

function Frame19() {
  return (
    <div className="absolute content-stretch flex flex-col font-centrale-sans-cnd-medium items-end leading-[34px] not-italic pb-[9px] right-[-2px] text-right top-0 whitespace-nowrap">
      <p className="relative shrink-0 text-[#b0b0b0] text-[34px]">11.6</p>
      <p className="relative shrink-0 text-[#696969] text-[20px]">inch</p>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0">
      <div className="h-[59px] relative shrink-0 w-[283px]" data-name="Positions">
        <p className="absolute font-centrale-sans-cnd-medium leading-[34px] left-0 not-italic text-[#696969] text-[30px] top-0 whitespace-nowrap">SID</p>
        <div className="absolute h-[59px] right-0 top-0 w-[38px]" data-name="Value and Unit">
          <Frame18 />
        </div>
      </div>
      <div className="h-[59px] relative shrink-0 w-[283px]" data-name="Positions">
        <p className="absolute font-centrale-sans-cnd-medium leading-[34px] left-0 not-italic text-[#696969] text-[30px] top-0 whitespace-nowrap">FD</p>
        <div className="absolute h-[59px] right-0 top-0 w-[38px]" data-name="Value and Unit">
          <Frame19 />
        </div>
      </div>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col gap-[28px] items-start relative shrink-0">
      <div className="content-stretch flex items-start justify-between leading-[34px] relative shrink-0 w-[288px] whitespace-nowrap" data-name="Positions">
        <p className="font-centrale-sans-cnd-medium not-italic relative shrink-0 text-[#696969] text-[30px]">LAO</p>
        <p className="font-centrale-sans-cnd-medium-noto relative shrink-0 text-[#b0b0b0] text-[34px] text-right" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 500" }}>
          0ᵒ
        </p>
      </div>
      <div className="content-stretch flex items-start justify-between leading-[34px] relative shrink-0 w-[288px] whitespace-nowrap" data-name="Positions">
        <p className="font-centrale-sans-cnd-medium not-italic relative shrink-0 text-[#696969] text-[30px]">CRAN</p>
        <p className="font-centrale-sans-cnd-medium-noto relative shrink-0 text-[#b0b0b0] text-[34px] text-right" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 500" }}>
          0ᵒ
        </p>
      </div>
      <Frame17 />
    </div>
  );
}

function Section1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-center left-[6px] top-[266px]" data-name="Section 3">
      <Frame16 />
      <div className="bg-[#4d4d4d] h-px shrink-0 w-[296px]" />
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="relative shrink-0 size-[40px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRectangle12} />
      </div>
    </div>
  );
}

function Frame25() {
  return (
    <div className="absolute content-stretch flex flex-col font-centrale-sans-cnd-medium items-end leading-[34px] not-italic pb-[9px] right-[-2px] text-right top-0 whitespace-nowrap">
      <p className="relative shrink-0 text-[#b0b0b0] text-[34px]">-9</p>
      <p className="relative shrink-0 text-[#696969] text-[20px]">cm</p>
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center pl-[20px] pr-[10px] py-[10px] relative shrink-0">
      <div className="h-[59px] relative shrink-0 w-[38px]" data-name="Value and Unit">
        <Frame25 />
      </div>
    </div>
  );
}

function Frame22() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col items-start left-1/2 top-1/2">
      <Frame23 />
      <Frame24 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="relative shrink-0 size-[40px]">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgRectangle13} />
      </div>
    </div>
  );
}

function Frame29() {
  return (
    <div className="absolute content-stretch flex flex-col font-centrale-sans-cnd-medium items-end leading-[34px] not-italic pb-[9px] right-[-2px] text-right top-0 whitespace-nowrap">
      <p className="relative shrink-0 text-[#b0b0b0] text-[34px]">-53</p>
      <p className="relative shrink-0 text-[#696969] text-[20px]">cm</p>
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center pl-[20px] pr-[10px] py-[10px] relative shrink-0">
      <div className="h-[59px] relative shrink-0 w-[38px]" data-name="Value and Unit">
        <Frame29 />
      </div>
    </div>
  );
}

function Frame26() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col items-start left-1/2 top-1/2">
      <Frame27 />
      <Frame28 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="relative shrink-0 size-[40px]">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgRectangle14} />
      </div>
    </div>
  );
}

function Frame33() {
  return (
    <div className="absolute content-stretch flex flex-col font-centrale-sans-cnd-medium items-end leading-[34px] not-italic pb-[9px] right-[-2px] text-right top-0 whitespace-nowrap">
      <p className="relative shrink-0 text-[#b0b0b0] text-[34px]">13</p>
      <p className="relative shrink-0 text-[#696969] text-[20px]">cm</p>
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center pl-[20px] pr-[10px] py-[10px] relative shrink-0">
      <div className="h-[59px] relative shrink-0 w-[38px]" data-name="Value and Unit">
        <Frame33 />
      </div>
    </div>
  );
}

function Frame30() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col items-start left-1/2 top-1/2">
      <Frame31 />
      <Frame32 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex gap-[18px] items-start pl-[16px] relative shrink-0">
      <div className="h-[120px] relative shrink-0 w-[80px]" data-name="Table positions">
        <Frame22 />
      </div>
      <div className="h-[120px] relative shrink-0 w-[80px]" data-name="Table positions">
        <Frame26 />
      </div>
      <div className="h-[120px] relative shrink-0 w-[80px]" data-name="Table positions">
        <Frame30 />
      </div>
    </div>
  );
}

function Section3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[10px] items-center left-[6px] top-[651px]" data-name="Section 5">
      <Frame20 />
      <div className="bg-[#4d4d4d] h-px shrink-0 w-[296px]" />
    </div>
  );
}

function LeftCoronary() {
  return (
    <div className="content-stretch flex items-center justify-center pl-[5px] relative shrink-0" data-name="Left Coronary">
      <p className="font-centrale-sans-cnd-medium leading-[34px] not-italic relative shrink-0 text-[#b0b0b0] text-[30px] whitespace-nowrap">Left Coronary</p>
    </div>
  );
}

function Frame37() {
  return (
    <div className="absolute content-stretch flex flex-col font-centrale-sans-cnd-medium items-end leading-[34px] not-italic pb-[9px] right-[-2px] text-right top-0 whitespace-nowrap">
      <p className="relative shrink-0 text-[#b0b0b0] text-[34px]">15</p>
      <p className="relative shrink-0 text-[#696969] text-[20px]">fps</p>
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0">
      <div className="content-stretch flex gap-[205px] items-center relative shrink-0" data-name="Positions">
        <div className="relative shrink-0 size-[40px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRectangle15} />
        </div>
        <div className="h-[59px] relative shrink-0 w-[38px]" data-name="Value and Unit">
          <Frame37 />
        </div>
      </div>
      <div className="content-stretch flex gap-[190px] items-center relative shrink-0" data-name="Positions">
        <div className="relative shrink-0 size-[40px]">
          <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgRectangle16} />
        </div>
        <p className="font-centrale-sans-cnd-medium-noto leading-[34px] relative shrink-0 text-[#b0b0b0] text-[34px] text-right whitespace-nowrap" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 500" }}>
          Low
        </p>
      </div>
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0">
      <LeftCoronary />
      <Frame36 />
    </div>
  );
}

function Frame34() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] items-center left-[6px] top-[992px]">
      <Frame35 />
      <div className="bg-[#4d4d4d] h-px shrink-0 w-[296px]" />
    </div>
  );
}

function LeftCoronary1() {
  return (
    <div className="bg-[#191919] content-stretch flex items-center pl-[5px] relative shrink-0 w-[288px]" data-name="Left Coronary">
      <p className="font-centrale-sans-cnd-medium leading-[34px] not-italic relative shrink-0 text-[#b0b0b0] text-[30px] whitespace-nowrap">Left Coronary</p>
    </div>
  );
}

function Frame41() {
  return (
    <div className="absolute content-stretch flex flex-col font-centrale-sans-cnd-medium items-end leading-[34px] not-italic pb-[9px] right-[-2px] text-right top-0 whitespace-nowrap">
      <p className="relative shrink-0 text-[#b0b0b0] text-[34px]">119</p>
      <p className="relative shrink-0 text-[#696969] text-[20px]">min</p>
    </div>
  );
}

function Group() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
      <p className="col-1 font-centrale-sans-cnd-medium leading-[34px] ml-0 mt-0 not-italic relative row-1 text-[#b0b0b0] text-[30px] text-right whitespace-nowrap">K</p>
    </div>
  );
}

function Group1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="col-1 h-[42px] ml-[25px] mt-[5px] relative row-1 w-[96px]" data-name="image 11">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage11} />
      </div>
      <Group />
    </div>
  );
}

function Frame42() {
  return (
    <div className="absolute content-stretch flex flex-col font-centrale-sans-cnd-medium items-end leading-[34px] not-italic pb-[9px] right-[-2px] text-right top-0 whitespace-nowrap">
      <p className="relative shrink-0 text-[#b0b0b0] text-[34px]">00</p>
      <p className="relative shrink-0 text-[#696969] text-[20px]">mm</p>
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0">
      <div className="content-stretch flex gap-[205px] items-center relative shrink-0" data-name="Positions">
        <div className="opacity-0 relative shrink-0 size-[40px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRectangle15} />
        </div>
        <div className="h-[59px] relative shrink-0 w-[38px]" data-name="Value and Unit">
          <Frame41 />
        </div>
      </div>
      <div className="content-stretch flex gap-[117px] items-center relative shrink-0" data-name="Positions">
        <Group1 />
        <div className="h-[59px] relative shrink-0 w-[38px]" data-name="Value and Unit">
          <Frame42 />
        </div>
      </div>
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0">
      <LeftCoronary1 />
      <Frame40 />
    </div>
  );
}

function Frame38() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[10px] top-[1174px]">
      <Frame39 />
    </div>
  );
}

function LeftCoronary2() {
  return (
    <div className="bg-[#191919] content-stretch flex items-center pl-[5px] relative shrink-0 w-[288px]" data-name="Left Coronary">
      <p className="font-centrale-sans-cnd-medium leading-[34px] not-italic relative shrink-0 text-[#b0b0b0] text-[30px] whitespace-nowrap">K Rate</p>
    </div>
  );
}

function Frame46() {
  return (
    <div className="absolute content-stretch flex flex-col font-centrale-sans-cnd-medium items-end leading-[34px] not-italic pb-[9px] right-[-2px] text-right top-0 whitespace-nowrap">
      <p className="relative shrink-0 text-[#b0b0b0] text-[34px]">119</p>
      <p className="relative shrink-0 text-[#696969] text-[20px]">min</p>
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <div className="content-stretch flex gap-[205px] items-center relative shrink-0" data-name="Positions">
        <div className="opacity-0 relative shrink-0 size-[40px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRectangle15} />
        </div>
        <div className="h-[59px] relative shrink-0 w-[38px]" data-name="Value and Unit">
          <Frame46 />
        </div>
      </div>
    </div>
  );
}

function Frame44() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0">
      <LeftCoronary2 />
      <Frame45 />
    </div>
  );
}

function Frame43() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[10px] top-[1368px]">
      <Frame44 />
    </div>
  );
}

function LeftCoronary3() {
  return (
    <div className="bg-[#191919] content-stretch flex items-center pl-[5px] relative shrink-0 w-[288px]" data-name="Left Coronary">
      <p className="font-centrale-sans-cnd-medium leading-[34px] not-italic relative shrink-0 text-[#b0b0b0] text-[30px] whitespace-nowrap">Fluoroscopy Time</p>
    </div>
  );
}

function Frame50() {
  return (
    <div className="absolute content-stretch flex flex-col font-centrale-sans-cnd-medium items-end leading-[34px] not-italic pb-[9px] right-[-2px] text-right top-0 whitespace-nowrap">
      <p className="relative shrink-0 text-[#b0b0b0] text-[34px]">0.0</p>
      <p className="relative shrink-0 text-[#696969] text-[20px]">min</p>
    </div>
  );
}

function Frame49() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <div className="content-stretch flex gap-[205px] items-center relative shrink-0" data-name="Positions">
        <div className="opacity-0 relative shrink-0 size-[40px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRectangle15} />
        </div>
        <div className="h-[59px] relative shrink-0 w-[38px]" data-name="Value and Unit">
          <Frame50 />
        </div>
      </div>
    </div>
  );
}

function Frame48() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-center relative shrink-0">
      <LeftCoronary3 />
      <Frame49 />
    </div>
  );
}

function Frame47() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[10px] top-[1483px]">
      <Frame48 />
    </div>
  );
}

function LeftCoronary4() {
  return (
    <div className="bg-[#191919] content-stretch flex items-center pl-[5px] relative shrink-0 w-[288px]" data-name="Left Coronary">
      <p className="font-centrale-sans-cnd-medium leading-[34px] not-italic relative shrink-0 text-[#b0b0b0] text-[30px] whitespace-nowrap">Total K</p>
    </div>
  );
}

function Frame54() {
  return (
    <div className="absolute content-stretch flex flex-col font-centrale-sans-cnd-medium items-end leading-[34px] not-italic pb-[9px] right-[-2px] text-right top-0 whitespace-nowrap">
      <p className="relative shrink-0 text-[#b0b0b0] text-[34px]">2.80</p>
      <p className="relative shrink-0 text-[#696969] text-[20px]">min</p>
    </div>
  );
}

function Frame55() {
  return (
    <div className="absolute content-stretch flex flex-col font-centrale-sans-cnd-medium items-end leading-[34px] not-italic pb-[9px] right-[-2px] text-right top-0 whitespace-nowrap">
      <p className="relative shrink-0 text-[#b0b0b0] text-[34px]">0.591</p>
      <p className="relative shrink-0 text-[#696969] text-[20px]">Gy-cm²</p>
    </div>
  );
}

function Frame56() {
  return (
    <div className="absolute content-stretch flex flex-col font-centrale-sans-cnd-medium items-end leading-[34px] not-italic pb-[9px] right-[-2px] text-right top-0 whitespace-nowrap">
      <p className="relative shrink-0 text-[#b0b0b0] text-[34px]">0.0</p>
      <p className="relative shrink-0 text-[#696969] text-[20px]">mm</p>
    </div>
  );
}

function Frame53() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-center relative shrink-0">
      <div className="content-stretch flex gap-[205px] items-center relative shrink-0" data-name="Positions">
        <div className="opacity-0 relative shrink-0 size-[40px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRectangle15} />
        </div>
        <div className="h-[59px] relative shrink-0 w-[38px]" data-name="Value and Unit">
          <Frame54 />
        </div>
      </div>
      <div className="h-[59px] relative shrink-0 w-[283px]" data-name="Positions">
        <p className="absolute font-centrale-sans-cnd-medium leading-[34px] left-0 not-italic text-[#696969] text-[30px] top-0 whitespace-nowrap">DAP</p>
        <div className="absolute h-[59px] right-0 top-0 w-[38px]" data-name="Value and Unit">
          <Frame55 />
        </div>
      </div>
      <div className="h-[59px] relative shrink-0 w-[283px]" data-name="Positions">
        <p className="absolute font-centrale-sans-cnd-medium leading-[34px] left-0 not-italic text-[#696969] text-[30px] top-0 whitespace-nowrap">Total Fluoro</p>
        <div className="absolute h-[59px] right-0 top-0 w-[38px]" data-name="Value and Unit">
          <Frame56 />
        </div>
      </div>
    </div>
  );
}

function Frame52() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0">
      <LeftCoronary4 />
      <Frame53 />
    </div>
  );
}

function Frame51() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[10px] top-[1606px]">
      <Frame52 />
    </div>
  );
}

function StatusBar() {
  return (
    <div className="absolute bg-[#050505] h-[2104px] left-0 top-0 w-[308px]" data-name="Status bar">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bg-[#4d4d4d] h-px left-[6px] top-[975px] w-[296px]" />
        <SystemState />
        <Section />
        <DlsStopwatch1 />
        <Frame21 />
        <Section2 />
        <Section1 />
        <Section3 />
        <Frame34 />
        <Frame38 />
        <Frame43 />
        <Frame47 />
        <Frame51 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#3b3b3b] border-solid inset-[-2px] pointer-events-none" />
    </div>
  );
}

function SmartMask() {
  return (
    <div className="col-1 ml-0 mt-[18px] relative row-1 size-[48px]" data-name="SmartMask 1">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g clipPath="url(#clip0_1_4484)" id="SmartMask 1">
          <g id="Vector" />
          <path d={svgPaths.p11e89c80} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p37a6e800} fill="var(--fill-0, white)" id="Vector_3" />
          <path d={svgPaths.p25fc2200} fill="var(--fill-0, white)" id="Vector_4" />
          <path d={svgPaths.p1d392b00} fill="var(--fill-0, white)" id="Vector_5" opacity="0.5" />
          <path d={svgPaths.p3173ad00} fill="var(--fill-0, white)" id="Vector_6" />
          <path d={svgPaths.p2a8dfc00} fill="var(--fill-0, white)" id="Vector_7" />
          <path d={svgPaths.p1975040} fill="var(--fill-0, white)" id="Vector_8" />
          <path d={svgPaths.p26721e00} fill="var(--fill-0, black)" id="Vector_9" />
          <path d={svgPaths.p3150200} fill="var(--fill-0, black)" id="Vector_10" />
        </g>
        <defs>
          <clipPath id="clip0_1_4484">
            <rect fill="white" height="48" width="48" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Group3() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <p className="col-1 font-centrale-sans-cnd-medium leading-[34px] ml-[44px] mt-0 not-italic relative row-1 text-[20px] text-center text-white whitespace-nowrap">A</p>
      <SmartMask />
    </div>
  );
}

function Group4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <p className="bg-clip-text col-1 font-centrale-sans-cnd-medium leading-[34px] ml-[41px] mt-0 not-italic relative row-1 text-[20px] text-[transparent] text-center whitespace-nowrap" style={{ backgroundImage: "linear-gradient(76.0028deg, rgb(65, 201, 254) 28.971%, rgb(43, 135, 170) 73.962%)" }}>
        A
      </p>
      <div className="col-1 ml-0 mt-[21px] overflow-clip relative row-1 size-[48px]" data-name="CropSquare">
        <div className="absolute inset-[4.17%]" data-name="path">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44 44">
            <path d={svgPaths.p3edffa00} fill="url(#paint0_linear_1_4539)" id="path" />
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_4539" x1="21.0582" x2="44.0063" y1="44" y2="29.0389">
                <stop stopColor="#41C9FE" />
                <stop offset="1" stopColor="#2B87AA" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Component1Icons24VesselNavigatorPlanning() {
  return (
    <div className="absolute inset-[4.17%]" data-name="1.-Icons/24/Vessel-Navigator-Planning">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44.9167 44.9167">
        <g id="1.-Icons/24/Vessel-Navigator-Planning">
          <path clipRule="evenodd" d={svgPaths.p2b00fa00} fill="url(#paint0_linear_1_4481)" fillRule="evenodd" id="Combined-Shape" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_4481" x1="21.4969" x2="44.9231" y1="44.9167" y2="29.6439">
            <stop stopColor="#41C9FE" />
            <stop offset="1" stopColor="#2B87AA" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function DDlsTsmTestFindings1() {
  return (
    <div className="absolute contents inset-[4.17%]" data-name="dDLS-TSM-Test-findings">
      <Component1Icons24VesselNavigatorPlanning />
    </div>
  );
}

function VesselNavigatorPlanning() {
  return (
    <div className="col-1 ml-0 mt-[20px] overflow-clip relative row-1 size-[49px]" data-name="Vessel Navigator Planning 1">
      <DDlsTsmTestFindings1 />
    </div>
  );
}

function Group5() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <p className="bg-clip-text col-1 font-centrale-sans-cnd-medium leading-[34px] ml-[43px] mt-0 not-italic relative row-1 text-[20px] text-[transparent] text-center whitespace-nowrap" style={{ backgroundImage: "linear-gradient(76.0028deg, rgb(65, 201, 254) 28.971%, rgb(43, 135, 170) 73.962%)" }}>
        A
      </p>
      <VesselNavigatorPlanning />
    </div>
  );
}

function Frame57() {
  return (
    <div className="absolute content-stretch flex gap-[40px] items-start left-[31px] top-[1906px]">
      <div aria-hidden="true" className="absolute border-2 border-[#3b3b3b] border-solid inset-[-2px] pointer-events-none" />
      <Group3 />
      <Group4 />
      <Group5 />
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents left-0 top-0">
      <StatusBar />
      <Frame57 />
    </div>
  );
}

function Frame61() {
  return (
    <div className="h-[2104px] relative shrink-0 w-[308px]">
      <Group6 />
    </div>
  );
}

const imgStudyStateIcon = new URL("../../assets/ce32fd58653bb29169f77245470cd0ac20f243cb.svg", import.meta.url).href;

function Column() {
  const [phase, setPhase] = useState<string>("live");
  const phaseRef = useRef(phase);
  phaseRef.current = phase;
  const [fluoroOn, setFluoroOn] = useState(false);
  const fluoroOnRef = useRef(fluoroOn);
  fluoroOnRef.current = fluoroOn;
  const [sequence, setSequence] = useState<"postrecord" | "treatment">("postrecord");
  const pendingSequence = useRef<"postrecord" | "treatment" | null>(null);
  const [seekFrame, setSeekFrame] = useState<number | undefined>(undefined);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !e.repeat) setFluoroOn(true);
    };
    const onUp = (e: KeyboardEvent) => {
      if (e.code === "Space") setFluoroOn(false);
    };
    const onMsg = (e: MessageEvent) => {
      if (e.data?.type === "intrasight-fluoro") {
        setFluoroOn(e.data.on);
      }
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    window.addEventListener("message", onMsg);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
      window.removeEventListener("message", onMsg);
    };
  }, []);

  useEffect(() => {
    if (fluoroOn && pendingSequence.current) {
      setSequence(pendingSequence.current);
      setSeekFrame(0);
      pendingSequence.current = null;
    }
  }, [fluoroOn]);

  const handleMessage = useCallback((e: MessageEvent) => {
    if (!e.data || typeof e.data.type !== "string") return;

    if (e.data.type === "intrasight-phase") {
      setPhase(e.data.phase);
      
      if (e.data.phase === "recording" || e.data.phase === "live") {
        setSeekFrame(0);
      }
    }

    if (e.data.type === "intrasight-recording-time" && phaseRef.current === "recording") {
      // Convert time to frame number (30 fps)
      const frameNum = Math.floor(e.data.time * 30);
      setSeekFrame(frameNum);
    }

    if (e.data.type === "intrasight-segment-confirmed") {
      pendingSequence.current = "treatment";
    }
  }, []);

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleMessage]);

  return (
    <div className="bg-black content-stretch flex flex-col h-full relative shrink-0 w-full overflow-hidden border-2 border-[#3b3b3b]" data-name="Column">
      {/* Patient bar */}
      <div className="bg-[#171717] content-stretch flex gap-[20px] h-[40px] items-center px-[24px] py-[2px] shrink-0 w-full">
        <p className="font-centrale-sans-medium leading-[20px] not-italic text-[#41c9fe] text-[20px] whitespace-nowrap shrink-0">LIVE</p>
        <div className="flex gap-[12px] items-center overflow-clip shrink-0">
          <div className="relative shrink-0 w-[32px] h-[32px] flex items-center justify-center">
            <img alt="" className="w-[28px] h-[20px]" src={imgStudyStateIcon} />
          </div>
          <p className="font-centrale-sans-book leading-[36px] not-italic text-[#41c9fe] text-[20px] whitespace-nowrap shrink-0">DOE, Jane</p>
        </div>
        <div className="flex font-centrale-sans-book gap-[8px] items-center not-italic text-[#d6d6d6] text-[20px] whitespace-nowrap shrink-0">
          <p className="leading-[24px] opacity-50">Patient ID</p>
          <p className="leading-[24px]">2345412</p>
        </div>
        <div className="flex font-centrale-sans-book gap-[8px] items-center not-italic text-[#d6d6d6] text-[20px] shrink-0">
          <p className="leading-[24px] opacity-50">DOB</p>
          <p className="leading-[24px]">12-Apr-1949 (74y)</p>
        </div>
      </div>
      {/* Frame player */}
      <div className="relative flex-1 min-h-0 w-full">
        <FramePlayer
          sequence={sequence}
          isPlaying={fluoroOn}
          playbackRate={phaseRef.current === "recording" ? 1.0 : 0.5}
          className="absolute inset-0 w-full h-full"
          seekToFrame={seekFrame}
          onTimeUpdate={(frameIndex) => setCurrentFrameIndex(frameIndex)}
        />
      </div>
      {fluoroOn && (
        <img
          alt="Fluoro on"
          src={imgFluoroIndicator}
          width={96}
          height={96}
          className="absolute top-[48px] right-[12px] pointer-events-none"
        />
      )}
    </div>
  );
}

function Column1() {
  const [phase, setPhase] = useState<string>("live");
  const [isPlaying, setIsPlaying] = useState(false);
  const [seekFrame, setSeekFrame] = useState<number | undefined>(undefined);

  const handleMessage = useCallback((e: MessageEvent) => {
    if (!e.data || typeof e.data.type !== "string") return;

    if (e.data.type === "intrasight-phase") {
      setPhase(e.data.phase);

      if (e.data.phase === "recording") {
        setSeekFrame(0);
        setIsPlaying(true);
      } else if (e.data.phase === "analysis" || e.data.phase === "live") {
        setIsPlaying(false);
        if (e.data.phase === "live") {
          setSeekFrame(0);
        }
      }
    }

    if (e.data.type === "intrasight-recording-time" && phase === "recording") {
      const frameNum = Math.floor(e.data.time * 30);
      setSeekFrame(frameNum);
    }
  }, [phase]);

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleMessage]);

  return (
    <div className="bg-black content-stretch flex flex-col h-full relative shrink-0 w-full overflow-hidden border border-[#3b3b3b]" data-name="Column">
      {/* Patient bar */}
      <div className="bg-[#171717] content-stretch flex gap-[8px] h-[20px] items-center px-[10px] py-[1px] shrink-0 w-full">
        <p className="font-centrale-sans-medium leading-[10px] not-italic text-[#41c9fe] text-[8px] whitespace-nowrap shrink-0">REF</p>
        <div className="flex gap-[4px] items-center overflow-clip shrink-0">
          <img alt="" className="w-[11px] h-[8px] shrink-0" src={imgStudyStateIcon} />
          <p className="font-centrale-sans-book leading-[14px] not-italic text-[#41c9fe] text-[8px] whitespace-nowrap shrink-0">DOE, Jane</p>
        </div>
        <div className="flex font-centrale-sans-book gap-[3px] items-center not-italic text-[#d6d6d6] text-[8px] whitespace-nowrap shrink-0">
          <p className="leading-[10px] opacity-50">Patient ID</p>
          <p className="leading-[10px]">2345412</p>
        </div>
        <div className="flex font-centrale-sans-book gap-[3px] items-center not-italic text-[#d6d6d6] text-[8px] shrink-0">
          <p className="leading-[10px] opacity-50">DOB</p>
          <p className="leading-[10px]">12-Apr-1949 (74y)</p>
        </div>
      </div>
      {/* Frame player */}
      <FramePlayer
        sequence="postrecord"
        isPlaying={isPlaying}
        className="w-full flex-1 min-h-0"
        seekToFrame={seekFrame}
      />
    </div>
  );
}

function Boom() {
  return (
    <div className="bg-black content-stretch flex h-full items-center justify-center overflow-clip relative shrink-0 w-full" data-name="Boom">
      <IntrasightWindow />
    </div>
  );
}

function QuadrantWrapper({ children, aspectRatio }: { children: ReactNode; aspectRatio: number }) {
  // Quadrant size: 1764x1052
  const quadrantW = 1764;
  const quadrantH = 1052;
  const quadrantAspect = quadrantW / quadrantH; // ~1.677

  // Calculate scaled dimensions to fit while maintaining aspect ratio
  let contentW, contentH;
  if (aspectRatio > quadrantAspect) {
    // Content is wider - fit to width
    contentW = quadrantW;
    contentH = quadrantW / aspectRatio;
  } else {
    // Content is taller - fit to height
    contentH = quadrantH;
    contentW = quadrantH * aspectRatio;
  }

  return (
    <div className="relative flex items-center justify-center" style={{ width: `${quadrantW}px`, height: `${quadrantH}px` }}>
      <div style={{ width: `${contentW}px`, height: `${contentH}px` }}>
        {children}
      </div>
    </div>
  );
}

function NewGridLayout() {
  return (
    <div className="absolute left-0 top-0 w-[3840px] h-[2152px] bg-black">
      {/* Top Bar */}
      <Group7 />
      
      {/* Content area with sidebar + grid */}
      <div className="absolute top-[48px] left-0 flex gap-[4px]">
        {/* Sidebar */}
        <Frame61 />
        
        {/* 2x2 Grid - each quadrant is 1764x1052 */}
        <div className="grid grid-cols-2 grid-rows-2 gap-0">
          {/* Top-left: X-ray Live */}
          <QuadrantWrapper aspectRatio={1530 / 1650}>
            <Column />
          </QuadrantWrapper>

          {/* Top-right: Intrasight */}
          <QuadrantWrapper aspectRatio={1920 / 1080}>
            <Boom />
          </QuadrantWrapper>

          {/* Bottom-left: X-ray Ref */}
          <QuadrantWrapper aspectRatio={569 / 646}>
            <Column1 />
          </QuadrantWrapper>
        </div>
      </div>
    </div>
  );
}

export default function FlexVisionApp() {
  return (
    <div className="bg-black relative size-full" data-name="FlexVision - SmartSize on">
      <NewGridLayout />
    </div>
  );
}