function SegmentBubble() {
  return (
    <div
      className="absolute bg-[#000000] h-7 rounded-[30px] top-3 translate-x-[-50%]"
      data-name="Segment Bubble"
      style={{ left: "calc(50% + 0.5px)" }}
    >
      <div className="box-border content-stretch flex flex-row gap-2.5 h-7 items-center justify-center overflow-clip p-[8px] relative">
        <div className="flex flex-col font-['CentraleSans:Book',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[20px] text-center text-nowrap">
          <p className="block leading-[22px] whitespace-pre">A 16.8 mm</p>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border border-[#ffffff] border-solid inset-0 pointer-events-none rounded-[30px]"
      />
    </div>
  );
}

export default function SegmentDefault() {
  return (
    <div className="relative size-full" data-name="Segment/Default">
      <div className="absolute bg-gradient-to-b bottom-0 from-[#ffffff1a] left-0 right-0 to-[#ffffff00] top-[3.35%]" />
      <div className="absolute h-0 left-0 right-0 top-2">
        <div className="absolute bottom-0 left-0 right-0 top-[-4px]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 359 4"
          >
            <line
              id="Line 131"
              stroke="var(--stroke-0, white)"
              strokeWidth="4"
              x2="359"
              y1="2"
              y2="2"
            />
          </svg>
        </div>
      </div>
      <div className="absolute flex h-[12px] items-center justify-center left-0 top-0 w-[10px]">
        <div className="flex-none rotate-[90deg]">
          <div className="h-2.5 relative w-3">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 12 10"
            >
              <path
                d="M6 0L0 6V10H12V6L6 0Z"
                fill="var(--fill-0, white)"
                id="Vector 94"
              />
            </svg>
          </div>
        </div>
      </div>
      <SegmentBubble />
      <div className="absolute flex h-[12px] items-center justify-center right-0 top-0 w-[10px]">
        <div className="flex-none rotate-[270deg]">
          <div className="h-2.5 relative w-3">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 12 10"
            >
              <path
                d="M6 0L0 6V10H12V6L6 0Z"
                fill="var(--fill-0, white)"
                id="Vector 95"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}