import svgPaths from "./svg-h599n3hwv";
import img5X4Footpedal3882402 from "figma:asset/7f8fa0d7ab4274e2f13de8eb818eb7544728f7ea.png";
import imgImage121 from "figma:asset/a88a842f3a8fb7070c090488a99c78d4f568d185.png";

function Icon() {
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

function Button() {
  return (
    <div className="absolute bg-[rgba(89,89,89,0.55)] box-border content-stretch flex gap-2 items-center justify-center left-[1460px] px-4 py-2 rounded-[2px] top-[1024px] w-[214px]" data-name="Button">
      <Icon />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-nowrap">
        <p className="leading-[22px] whitespace-pre">Bookmark</p>
      </div>
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

function Button1() {
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
      <Button1 />
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

function Icon1() {
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
      <Icon1 />
    </div>
  );
}

function Icon2() {
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
      <Icon2 />
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

function SyncPlaybackRecording() {
  return (
    <div className="absolute h-[747px] left-[0.5px] overflow-clip top-0 w-[719px]" data-name="Sync Playback - Recording">
      <div className="absolute flex flex-col font-['CentraleSans:Bold',_sans-serif] justify-end leading-[0] left-[72px] not-italic text-[#9dd3e3] text-[24px] text-nowrap top-[476px] translate-y-[-100%]">
        <p className="leading-[28px] whitespace-pre">Begin Fluoro to add X-ray imaging to the pullback</p>
      </div>
      <div className="absolute bg-center bg-cover bg-no-repeat h-[257px] left-[177px] top-[115px] w-[362px]" data-name="5x4_Footpedal (388,240) 2" style={{ backgroundImage: `url('${img5X4Footpedal3882402}')` }} />
    </div>
  );
}

function Frame87() {
  return (
    <div className="h-[774px] overflow-clip relative shrink-0 w-[843px]">
      <SyncPlaybackRecording />
    </div>
  );
}

function Component2() {
  return (
    <div className="absolute left-[159.88px] size-[664.617px] top-[36.82px]" data-name="Component 2">
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

function Group62() {
  return (
    <div className="absolute contents left-[153.92px] top-[30px]">
      <div className="absolute left-[153.92px] object-cover size-[664.617px] top-[30px]" data-name="Sequence 01 1" />
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
    <div className="absolute content-stretch flex gap-6 h-[742px] items-start justify-center left-4 top-[87px] w-[1784px]">
      <Frame87 />
      <Frame84 />
    </div>
  );
}

function RecordStop() {
  return (
    <div className="relative shrink-0 size-6" data-name="RecordStop">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Record">
          <path d={svgPaths.p275e1550} fill="var(--fill-0, white)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt2() {
  return (
    <div className="absolute bg-[#1474a4] box-border content-stretch flex gap-2 items-center justify-center px-4 py-2 right-4 rounded-[2px] top-[1024px] w-[214px]" data-name="🟢 Button (IGT)">
      <RecordStop />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white">
        <p className="leading-[22px] whitespace-pre">Stop</p>
      </div>
    </div>
  );
}

function Frame40() {
  return (
    <div className="absolute bottom-[2.13%] left-1 overflow-clip right-0.5 top-[2.13%]">
      <div className="absolute bg-center bg-cover bg-no-repeat bottom-0 left-0 right-[-1.69%] top-0" data-name="image 121" style={{ backgroundImage: `url('${imgImage121}')` }} />
      <div className="absolute bg-[#0e0e0e] bottom-0 left-0 right-[-40.71%] top-0" />
    </div>
  );
}

function Ild() {
  return (
    <div className="absolute h-[183px] left-[25px] top-[825px] w-[1870px]" data-name="ILD">
      <div className="absolute bg-[#212121] inset-0" />
      <Frame40 />
    </div>
  );
}

function LightRecordingIndicator() {
  return (
    <div className="absolute left-3 size-4 top-3" data-name="Light Recording indicator">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Light Recording indicator">
          <circle cx="8" cy="8" fill="var(--fill-0, white)" id="Ellipse 38" r="8" />
        </g>
      </svg>
    </div>
  );
}

function LightRecordingTimer() {
  return (
    <div className="absolute h-[22px] left-[39px] top-[7px] w-[58px]" data-name="Light recording timer">
      <div className="absolute bottom-[-27.27%] font-['CentraleSans:Book',_sans-serif] leading-[0] left-0 not-italic right-[-19.36%] text-[#e8e8e8] text-[20px] top-0">
        <p className="leading-[28px]">0:00</p>
      </div>
    </div>
  );
}

function RecordingPill() {
  return (
    <div className="absolute bg-[rgba(194,35,31,0.7)] h-10 left-[46px] rounded-[20px] top-[951px] w-[97px]" data-name="Recording Pill">
      <LightRecordingIndicator />
      <LightRecordingTimer />
    </div>
  );
}

export default function Boom() {
  return (
    <div className="bg-black relative size-full" data-name="Boom">
      <Button />
      <NavigationBarIgt />
      <Frame86 />
      <ButtonIgt2 />
      <Ild />
      <RecordingPill />
    </div>
  );
}