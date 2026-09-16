import svgPaths from "./svg-fmby15y6iy";

function Frame67() {
  return (
    <div className="absolute left-[92px] top-4">
      <div className="flex flex-row justify-end relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2.5 items-start justify-end p-[10px] relative">
          <div className="[text-shadow:rgba(0,0,0,0.5)_0px_2px_4px] absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-[-4px] not-italic text-[#ffffff] text-[24px] text-nowrap text-right top-0 translate-x-[-100%]">
            <p className="block leading-[24px] whitespace-pre"> </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SegmentInputFieldBoom() {
  return (
    <div
      className="absolute bg-[rgba(89,89,89,0.5)] left-0 rounded-[3px] top-0 w-[152px]"
      data-name="Segment input field/Boom"
    >
      <div className="flex flex-row items-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-between p-[14px] relative w-[152px]">
          <div className="[text-shadow:rgba(0,0,0,0.5)_0px_2px_4px] font-['CentraleSans:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[24px] text-[rgba(173,173,173,0.87)] text-left text-nowrap">
            <p className="block leading-[28px] whitespace-pre">A</p>
          </div>
          <Frame67 />
        </div>
      </div>
    </div>
  );
}

function Edit() {
  return (
    <div className="relative shrink-0 size-8" data-name="Edit">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="Edit">
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

function EditButtonIgt() {
  return (
    <div
      className="absolute bg-[rgba(89,89,89,0.55)] h-14 left-40 rounded top-0"
      data-name="Edit Button (IGT)"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 h-14 items-center justify-center px-[18px] py-4 relative">
          <Edit />
        </div>
      </div>
    </div>
  );
}

export default function SegmentInputFieldBoom1() {
  return (
    <div className="relative size-full" data-name="Segment input field/Boom">
      <SegmentInputFieldBoom />
      <EditButtonIgt />
    </div>
  );
}