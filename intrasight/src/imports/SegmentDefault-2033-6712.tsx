function SegmentBubble({ label, measurement }: { label?: string; measurement?: string }) {
  return (
    <div className="absolute bg-black h-7 rounded-[30px] top-3 translate-x-[-50%]" data-name="Segment Bubble" style={{ left: "calc(50% + 0.5px)" }}>
      <div className="box-border content-stretch flex gap-2.5 h-7 items-center justify-center overflow-clip p-[8px] relative">
        <div className="flex flex-col font-['CentraleSans:Book',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffdd19] text-[20px] text-center text-nowrap">
          <p className="leading-[22px] whitespace-pre">{label || 'A'} {measurement || '16.8 mm'}</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#ffdd19] border-solid inset-0 pointer-events-none rounded-[30px]" />
    </div>
  );
}

interface SegmentDefaultProps {
  label?: string;
  measurement?: string;
}

export default function SegmentDefault({ label, measurement }: SegmentDefaultProps) {
  return (
    <div className="relative size-full" data-name="Segment/Default">
      <div className="absolute bg-[rgba(0,0,0,0.4)] bottom-0 left-0 right-0 top-[3.35%]" />
      <div className="absolute h-0 left-0 right-0 top-2">
        <div className="absolute bottom-0 left-0 right-0 top-[-4px]" style={{ "--fill-0": "rgba(255, 221, 25, 1)", "--stroke-0": "rgba(255, 221, 25, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 359 4">
            <line id="Line 131" stroke="var(--stroke-0, #FFDD19)" strokeWidth="4" x2="359" y1="2" y2="2" />
          </svg>
        </div>
      </div>
      <div className="absolute flex h-[12px] items-center justify-center left-0 top-0 w-[10px]">
        <div className="flex-none rotate-[90deg]">
          <div className="h-2.5 relative w-3">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 10">
              <path d="M6 0L0 6V10H12V6L6 0Z" fill="var(--fill-0, #FFDD19)" id="Vector 94" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[12px] items-center justify-center right-0 top-0 w-[10px]">
        <div className="flex-none rotate-[270deg]">
          <div className="h-2.5 relative w-3">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 10">
              <path d="M6 0L0 6V10H12V6L6 0Z" fill="var(--fill-0, #FFDD19)" id="Vector 95" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 flex items-center justify-center right-[49px] top-3 w-0">
        <div className="flex-none h-px rotate-[90deg] w-[164.455px]">
          <div className="relative size-full">
            <div className="absolute bottom-0 left-0 right-0 top-[-2px]" style={{ "--stroke-0": "rgba(255, 221, 25, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 165 2">
                <line id="Line 132" stroke="var(--stroke-0, #FFDD19)" strokeWidth="2" x2="164.455" y1="1" y2="1" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 flex items-center justify-center right-0 top-3 w-0">
        <div className="flex-none h-px rotate-[270deg] w-[169.575px]">
          <div className="relative size-full">
            <div className="absolute bottom-0 left-0 right-0 top-[-2px]" style={{ "--stroke-0": "rgba(255, 221, 25, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 170 2">
                <line id="Line 221" stroke="var(--stroke-0, #FFDD19)" strokeWidth="2" x2="169.575" y1="1" y2="1" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 flex items-center justify-center left-0.5 top-3 w-0">
        <div className="flex-none h-px rotate-[270deg] w-[168.15px]">
          <div className="relative size-full">
            <div className="absolute bottom-0 left-0 right-0 top-[-2px]" style={{ "--stroke-0": "rgba(255, 221, 25, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 169 2">
                <line id="Line 222" stroke="var(--stroke-0, #FFDD19)" strokeWidth="2" x2="168.15" y1="1" y2="1" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <SegmentBubble label={label} measurement={measurement} />
    </div>
  );
}