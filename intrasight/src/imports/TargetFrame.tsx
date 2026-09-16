import svgPaths from "./svg-ftl2tix84y";

function ArrowRight16() {
  return (
    <div className="absolute bottom-[38.6%] left-1/2 right-[10%] top-[52.05%]" data-name="ArrowRight_16">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="ArrowRight_16">
          <path d="M7 5L10 8L7 11H6V5H7Z" fill="var(--fill-0, black)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function ArrowRight17() {
  return (
    <div className="relative size-full" data-name="ArrowRight_16">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="ArrowRight_16">
          <path d="M7 5L10 8L7 11H6V5H7Z" fill="var(--fill-0, black)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function Group17() {
  return (
    <div className="absolute bottom-[32.75%] contents left-0 right-0 top-[46.2%]">
      <div className="absolute bg-[#ffdd19] bottom-14 left-0 right-0 rounded-[30px] top-[79px]" />
      <ArrowRight16 />
      <div className="absolute bottom-[38.6%] flex items-center justify-center left-[10%] right-1/2 top-[52.05%]">
        <div className="flex-none rotate-[180deg] size-4">
          <ArrowRight17 />
        </div>
      </div>
    </div>
  );
}

export default function TargetFrame() {
  return (
    <div className="relative size-full" data-name="Target frame">
      <div className="absolute bottom-[0.58%] left-[47.5%] right-[47.5%] top-0" data-name="Union">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 170">
          <path d="M2 170H0V0H2V170Z" fill="var(--fill-0, #FFDD19)" id="Union" />
        </svg>
      </div>
      <Group17 />
      <div className="absolute bottom-[92.4%] flex items-center justify-center left-[35%] right-[35%] top-0">
        <div className="flex-none h-3 rotate-[90deg] w-[13px]">
          <div className="relative size-full">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 12">
              <path d={svgPaths.p2e658a80} fill="var(--fill-0, #FFDD19)" id="Vector 15" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}