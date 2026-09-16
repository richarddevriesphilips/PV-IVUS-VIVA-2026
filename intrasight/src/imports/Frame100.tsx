import svgPaths from "./svg-y8esx9byjs";

function Frame94() {
  return (
    <div className="absolute h-6 left-[-7px] overflow-clip top-0 w-[51px]">
      <div className="[text-shadow:rgba(0,0,0,0.5)_0px_2px_4px] absolute font-['CentraleSans:Book',_sans-serif] h-6 leading-[0] left-[51px] not-italic text-[24px] text-right text-white top-0 translate-x-[-100%] w-[51px]">
        <p className="leading-[24px]">16.8</p>
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
    <div className="absolute bg-[#746826] left-0 rounded-[3px] top-0 w-[152px]" data-name="Segment input field/Boom">
      <div className="box-border content-stretch flex gap-2.5 items-center justify-start overflow-clip p-[14px] relative w-[152px]">
        <div className="[text-shadow:rgba(0,0,0,0.5)_0px_2px_4px] font-['CentraleSans:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffdd19] text-[24px] text-nowrap">
          <p className="leading-[28px] whitespace-pre">A</p>
        </div>
        <Frame68 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#ffdd19] border-solid inset-0 pointer-events-none rounded-[3px]" />
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

function SegmentInputFieldBoom1() {
  return (
    <div className="h-14 overflow-clip relative rounded-[3px] shrink-0 w-full" data-name="Segment input field/Boom">
      <SegmentInputFieldBoom />
      <ButtonIgt />
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

function Button() {
  return (
    <div className="bg-[dimgrey] h-10 relative rounded-[2px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex gap-2 h-10 items-center justify-center px-4 py-2 relative w-full">
          <Measurement />
          <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-nowrap">
            <p className="leading-[22px] whitespace-pre">Add Segment</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Frame100() {
  return (
    <div className="content-stretch flex flex-col gap-[11px] items-start justify-start relative size-full">
      <SegmentInputFieldBoom1 />
      <Button />
    </div>
  );
}