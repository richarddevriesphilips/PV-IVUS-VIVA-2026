import svgPaths from "./svg-v2sk4pgqu9";

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

function SideButton() {
  return (
    <div className="absolute bg-neutral-900 h-[76px] left-[399px] overflow-clip rounded-[2px] top-0 w-[88px]" data-name="SideButton">
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

function ContrastBrightness33() {
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

function SideButton1() {
  return (
    <div className="absolute bg-neutral-900 h-[76px] left-[399px] overflow-clip rounded-[2px] top-0 w-[88px]" data-name="SideButton">
      <ContrastBrightness33 />
      <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-11 not-italic text-[14px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-12 translate-x-[-50%]">
        <p className="leading-[20px] whitespace-pre">75</p>
      </div>
      <div className="absolute flex h-3.5 items-center justify-center left-[9px] top-[31px] w-[7px]">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <div className="h-3.5 relative w-[7px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 14">
              <path d="M0 7L7 0V14L0 7Z" fill="var(--fill-0, white)" fillOpacity="0.8" id="Vector 55" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrackSegment() {
  return (
    <div className="basis-0 content-stretch flex grow h-1 items-center justify-center min-h-px min-w-px relative shrink-0 z-[4]" data-name="Track segment">
      <div className="basis-0 bg-[#1474a4] grow h-1 min-h-px min-w-px shrink-0" data-name="Track" />
    </div>
  );
}

function TrackSegment1() {
  return (
    <div className="basis-0 content-stretch flex grow h-1 items-center justify-center min-h-px min-w-px relative shrink-0 z-[3]" data-name="Track segment">
      <div className="basis-0 bg-[#1474a4] grow h-1 min-h-px min-w-px shrink-0" data-name="Track" />
    </div>
  );
}

function Circle() {
  return <div className="absolute bg-[rgba(105,105,105,0.35)] left-1/2 rounded-[20px] size-4 top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Circle" />;
}

function RightThumb() {
  return (
    <div className="absolute right-[-20px] size-10 top-1/2 translate-y-[-50%]" data-name="Right thumb">
      <Circle />
      <div className="absolute bg-[#c4c4c4] left-1/2 rounded-[100px] size-4 top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="thumb">
        <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.08)] border-solid inset-[-1px] pointer-events-none rounded-[101px] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.45)]" />
      </div>
    </div>
  );
}

function TrackSegment2() {
  return (
    <div className="basis-0 content-stretch flex grow h-1 items-center justify-center min-h-px min-w-px relative shrink-0 z-[2]" data-name="Track segment">
      <div className="basis-0 bg-[#1474a4] grow h-1 min-h-px min-w-px shrink-0" data-name="Track" />
      <RightThumb />
    </div>
  );
}

function TrackSegment3() {
  return (
    <div className="basis-0 content-stretch flex grow h-1 items-center justify-center min-h-px min-w-px relative shrink-0 z-[1]" data-name="Track segment">
      <div className="basis-0 bg-[#454545] grow h-1 min-h-px min-w-px shrink-0" data-name="Track" />
    </div>
  );
}

function SliderIgt() {
  return (
    <div className="absolute box-border content-stretch flex isolate items-center justify-start left-[33px] px-0 py-[18px] top-[18px] w-[328px]" data-name="🟢 Slider (IGT)">
      <TrackSegment />
      <TrackSegment1 />
      <TrackSegment2 />
      <TrackSegment3 />
    </div>
  );
}

export default function Frame101() {
  return (
    <div className="relative size-full">
      <SideButton />
      <SideButton1 />
      <div className="absolute bg-[rgba(23,23,23,0.8)] h-[76px] left-0 top-0 w-[402px]" />
      <SliderIgt />
    </div>
  );
}