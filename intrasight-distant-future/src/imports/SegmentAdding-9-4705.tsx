import svgPaths from "./svg-u67og6v0lz";

function Measurement() {
  return (
    <div className="relative shrink-0 size-6" data-name="Measurement">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Measurement">
          <path
            d={svgPaths.p2a409f80}
            fill="var(--fill-0, #E8E8E8)"
            id="path"
          />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div
      className="bg-[#696969] box-border content-stretch flex flex-row gap-2 h-10 items-center justify-center px-4 py-2 relative rounded-sm shrink-0 w-[227px]"
      data-name="Button"
    >
      <Measurement />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-left text-nowrap">
        <p className="block leading-[22px] whitespace-pre">Add Segment</p>
      </div>
    </div>
  );
}

export default function SegmentAdding() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-start p-0 relative size-full"
      data-name="Segment adding"
    >
      <Button />
    </div>
  );
}