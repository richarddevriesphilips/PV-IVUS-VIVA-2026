import svgPaths from "./svg-0ya4td57c8";

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

export default function Button() {
  return (
    <div className="bg-[dimgrey] relative rounded-[2px] size-full" data-name="Button">
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex gap-2 items-center justify-center px-4 py-2 relative size-full">
          <Measurement />
          <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-nowrap">
            <p className="leading-[22px] whitespace-pre">Add Segment</p>
          </div>
        </div>
      </div>
    </div>
  );
}