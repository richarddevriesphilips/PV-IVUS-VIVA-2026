import svgPaths from "./svg-626nhpiffb";

function Icon1() {
  return (
    <div className="relative shrink-0 size-6" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p315d7b80} fill="var(--fill-0, #E8E8E8)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt() {
  return (
    <div
      className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-row gap-2 items-center justify-center px-4 py-2 relative rounded-sm shrink-0 w-[228px]"
      data-name="🟢 Button (IGT)"
    >
      <Icon1 />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-left text-nowrap">
        <p className="block leading-[22px] whitespace-pre">Adjust position</p>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-6" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p17a0bb00} fill="var(--fill-0, #E8E8E8)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt1() {
  return (
    <div
      className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-row gap-2 items-center justify-center px-4 py-2 relative rounded-sm shrink-0 w-[228px]"
      data-name="🟢 Button (IGT)"
    >
      <Icon2 />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-left text-nowrap">
        <p className="block leading-[22px] whitespace-pre">Move to nearest frame</p>
      </div>
    </div>
  );
}

function Slot() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Slot">
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="[flex-flow:wrap] box-border content-center flex gap-2 items-center justify-center px-2 py-1 relative w-full">
          <ButtonIgt />
          <ButtonIgt1 />
        </div>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row items-start justify-start p-[16px] relative w-full">
          <Slot />
        </div>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div
      className="basis-0 bg-[#212121] box-border content-stretch flex flex-col grow items-center justify-start min-h-px min-w-px p-0 relative rounded-sm shrink-0"
      data-name="Container"
    >
      <div
        aria-hidden="true"
        className="absolute border border-[#595959] border-solid inset-0 pointer-events-none rounded-sm"
      />
      <Content />
    </div>
  );
}

function PopoverArrow() {
  return (
    <div className="h-2.5 relative w-4" data-name=".popover arrow">
      <div className="absolute bottom-0 left-[-5%] right-[-5%] top-[-10%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 11">
          <g id=".popover arrow">
            <path d="M0.2 0L9 11L17.8 0H0.2Z" fill="var(--fill-0, #212121)" id="Arrow background" />
            <path d={svgPaths.p2e7ecf80} fill="var(--fill-0, #595959)" id="Arrow border" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col items-start justify-center px-0 py-4 right-[-10px] top-1/2 translate-y-[-50%]"
      data-name="Arrow"
    >
      <div className="flex h-[16px] items-center justify-center relative shrink-0 w-[10px]">
        <div className="flex-none rotate-[270deg]">
          <PopoverArrow />
        </div>
      </div>
    </div>
  );
}

export default function Popover() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-start p-0 relative shadow-[0px_1px_6px_0px_rgba(0,0,0,0.45)] size-full"
      data-name="Popover"
    >
      <Container1 />
      <Arrow />
    </div>
  );
}