import svgPaths from "./svg-qupxdlw99h";

function Frame94() {
  return (
    <div className="absolute h-6 left-[-7px] overflow-clip top-0 w-[51px]">
      <div className="[text-shadow:rgba(0,0,0,0.5)_0px_2px_4px] absolute font-['CentraleSans:Book',_sans-serif] h-6 leading-[0] left-[51px] not-italic text-[24px] text-right text-white top-0 translate-x-[-100%] w-[51px]">
        <p className="leading-[24px]"></p>
      </div>
    </div>
  );
}

function Frame68() {
  return (
    <div className="absolute h-6 left-[43px] top-4 w-[93px]">
      <Frame94 />
      <div className="[text-shadow:rgba(0,0,0,0.5)_0px_2px_4px] absolute font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic right-0 text-[24px] text-nowrap text-right text-white top-0">
        <p className="leading-[24px] whitespace-pre">cm</p>
      </div>
    </div>
  );
}

function SegmentInputFieldBoom() {
  return (
    <div className="absolute bg-[rgba(89,89,89,0.55)] box-border content-stretch flex gap-2.5 items-center justify-start left-0 overflow-clip rounded-[3px] top-0 w-[152px] p-[14px]" data-name="Segment input field/Boom">
      <div className="[text-shadow:rgba(0,0,0,0.5)_0px_2px_4px] font-['CentraleSans:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[24px] text-[rgba(173,173,173,0.87)] text-nowrap">
        <p className="leading-[28px] whitespace-pre text-[rgba(173,173,173,1)]"></p>
      </div>
      <Frame68 />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-8" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p3a75100} fill="var(--fill-0, #E8E8E8)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt() {
  return (
    <div className="absolute bg-[rgba(89,89,89,0.55)] box-border content-stretch flex gap-2 h-14 items-center justify-center left-40 px-[18px] py-4 rounded-[4px] top-0" data-name="🟢 Button (IGT)">
      <Icon />
    </div>
  );
}

export default function SegmentInputFieldBoom1() {
  return (
    <div className="overflow-clip relative rounded-[3px] size-full" data-name="Segment input field/Boom">
      <SegmentInputFieldBoom />
      <ButtonIgt />
    </div>
  );
}