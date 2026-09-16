function TrackSegment() {
  return (
    <div
      className="basis-0 grow h-1 min-h-px min-w-px order-4 relative shrink-0"
      data-name="Track segment"
    >
      <div className="box-border content-stretch flex flex-row h-1 items-center justify-center p-0 relative w-full">
        <div
          className="basis-0 bg-[#1474a4] grow h-1 min-h-px min-w-px shrink-0"
          data-name="Track"
        />
      </div>
    </div>
  );
}

function Circle() {
  return (
    <div
      className="absolute bg-[rgba(105,105,105,0.35)] left-1/2 rounded-[20px] size-4 top-1/2 translate-x-[-50%] translate-y-[-50%]"
      data-name="Circle"
    />
  );
}

function RightThumb() {
  return (
    <div
      className="absolute right-[-20px] size-10 top-1/2 translate-y-[-50%]"
      data-name="Right thumb"
    >
      <Circle />
      <div
        className="absolute bg-[#c4c4c4] left-1/2 rounded-[100px] size-4 top-1/2 translate-x-[-50%] translate-y-[-50%]"
        data-name="thumb"
      >
        <div className="absolute border border-[rgba(0,0,0,0.08)] border-solid inset-[-1px] pointer-events-none rounded-[101px] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.45)]" />
      </div>
    </div>
  );
}

function TrackSegment1() {
  return (
    <div
      className="basis-0 grow h-1 min-h-px min-w-px order-3 relative shrink-0"
      data-name="Track segment"
    >
      <div className="box-border content-stretch flex flex-row h-1 items-center justify-center p-0 relative w-full">
        <div
          className="basis-0 bg-[#1474a4] grow h-1 min-h-px min-w-px shrink-0"
          data-name="Track"
        />
        <RightThumb />
      </div>
    </div>
  );
}

function TrackSegment2() {
  return (
    <div
      className="basis-0 grow h-1 min-h-px min-w-px order-2 relative shrink-0"
      data-name="Track segment"
    >
      <div className="box-border content-stretch flex flex-row h-1 items-center justify-center p-0 relative w-full">
        <div
          className="basis-0 bg-[#454545] grow h-1 min-h-px min-w-px shrink-0"
          data-name="Track"
        />
      </div>
    </div>
  );
}

function TrackSegment3() {
  return (
    <div
      className="basis-0 grow h-1 min-h-px min-w-px order-1 relative shrink-0"
      data-name="Track segment"
    >
      <div className="box-border content-stretch flex flex-row h-1 items-center justify-center p-0 relative w-full">
        <div
          className="basis-0 bg-[#454545] grow h-1 min-h-px min-w-px shrink-0"
          data-name="Track"
        />
      </div>
    </div>
  );
}

function SliderIgt() {
  return (
    <div
      className="absolute left-[58px] top-6 w-[328px]"
      data-name="Slider (IGT)"
    >
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row-reverse items-center justify-start px-0 py-[18px] relative w-[328px]">
          <TrackSegment />
          <TrackSegment1 />
          <TrackSegment2 />
          <TrackSegment3 />
        </div>
      </div>
    </div>
  );
}

export default function Frame66() {
  return (
    <div className="bg-[#000000] relative size-full">
      <SliderIgt />
      <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-[25px] not-italic text-[#ffffff] text-[16px] text-nowrap text-right top-[33px] translate-x-[-100%]">
        <p className="block leading-[22px] whitespace-pre">0</p>
      </div>
      <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-[423px] not-italic text-[#ffffff] text-[16px] text-nowrap text-right top-[33px] translate-x-[-100%]">
        <p className="block leading-[22px] whitespace-pre">100</p>
      </div>
    </div>
  );
}