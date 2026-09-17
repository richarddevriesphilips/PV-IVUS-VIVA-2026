import svgPaths from "./svg-arricbcxzi";

function Frame99() {
  return (
    <div className="absolute box-border content-stretch flex flex-row font-['CentraleSans:Book',_sans-serif] gap-1.5 items-center justify-start left-[42px] p-0 text-[#ffffff] text-right top-5 w-[94px]">
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
      className="absolute bg-[rgba(89,89,89,0.5)] h-16 leading-[0] left-0 not-italic overflow-clip rounded-[3px] text-[24px] text-nowrap top-0 w-[152px]"
      data-name="Segment input field/Boom"
    >
      <Frame99 />
      <div className="[text-shadow:rgba(0,0,0,0.5)_0px_2px_4px] absolute font-['CentraleSans:Bold',_sans-serif] left-3.5 text-[rgba(173,173,173,0.87)] text-left top-[18px]">
        <p className="block leading-[28px] text-nowrap whitespace-pre">A</p>
      </div>
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

export default function SegmentInputFieldTouch() {
  return (
    <div
      className="overflow-clip relative rounded-[3px] size-full"
      data-name="Segment input field/Touch"
    >
      <SegmentInputFieldBoom />
      <ButtonIgt />
    </div>
  );
}