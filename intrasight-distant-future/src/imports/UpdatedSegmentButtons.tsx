import svgPaths from "./svg-u6go899s66";

function Frame98() {
  return (
    <div className="absolute box-border content-stretch flex flex-row font-['CentraleSans:Book',_sans-serif] gap-1.5 items-center justify-start left-[42px] p-0 text-[#ffffff] text-right top-5">
      <div className="[text-shadow:rgba(0,0,0,0.5)_0px_2px_4px] relative shrink-0">
        <p className="block leading-[24px] text-nowrap whitespace-pre">12.0</p>
      </div>
      <div className="[text-shadow:rgba(0,0,0,0.5)_0px_2px_4px] relative shrink-0">
        <p className="block leading-[24px] text-nowrap whitespace-pre">mm</p>
      </div>
    </div>
  );
}

function SegmentInputFieldBoom() {
  return (
    <div
      className="absolute bg-[#746826] h-16 left-0 rounded-[3px] top-0 w-[152px]"
      data-name="Segment input field/Boom"
    >
      <div className="h-16 leading-[0] not-italic overflow-clip relative text-[24px] text-nowrap w-[152px]">
        <Frame98 />
        <div className="[text-shadow:rgba(0,0,0,0.5)_0px_2px_4px] absolute font-['CentraleSans:Bold',_sans-serif] left-3.5 text-[#ffdd19] text-left top-[18px]">
          <p className="block leading-[28px] text-nowrap whitespace-pre">A</p>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border-2 border-[#ffdd19] border-solid inset-0 pointer-events-none rounded-[3px]"
      />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-8" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="Icon">
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

function ButtonIgt() {
  return (
    <div
      className="absolute bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-row gap-2 items-center justify-center left-[156px] px-[18px] py-4 rounded top-0"
      data-name="🟢 Button (IGT)"
    >
      <Icon />
    </div>
  );
}

function SegmentInputFieldTouch() {
  return (
    <div
      className="absolute h-16 left-0 overflow-clip rounded-[3px] top-0 w-[228px]"
      data-name="Segment input field/Touch"
    >
      <SegmentInputFieldBoom />
      <ButtonIgt />
    </div>
  );
}

function Measurement() {
  return (
    <div className="relative shrink-0 size-8" data-name="Measurement">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="Measurement">
          <path
            d={svgPaths.p2938bf00}
            fill="var(--fill-0, #E8E8E8)"
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
      className="absolute bg-[#696969] box-border content-stretch flex flex-row gap-3 h-16 items-center justify-center left-60 px-5 py-4 rounded top-0 w-[207px]"
      data-name="🟢 Button (IGT)"
    >
      <Measurement />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[20px] text-center text-nowrap">
        <p className="block leading-[28px] whitespace-pre">Add Segment</p>
      </div>
    </div>
  );
}

export default function UpdatedSegmentButtons() {
  return (
    <div className="relative size-full" data-name="Updated segment buttons">
      <SegmentInputFieldTouch />
      <ButtonIgt1 />
    </div>
  );
}