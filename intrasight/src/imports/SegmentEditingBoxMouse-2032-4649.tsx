import svgPaths from "./svg-c5fy8oqpkd";

function Icons() {
  return (
    <div className="absolute right-[86px] size-6 top-[26px]" data-name="Icons">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Plus">
          <path d={svgPaths.p778cc70} fill="var(--fill-0, #E8E8E8)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function Icons1() {
  return (
    <div className="absolute left-[69px] size-6 top-[26px]" data-name="Icons">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Minus">
          <path d="M23 11V13H1V11H23Z" fill="var(--fill-0, #E8E8E8)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function CheckmarkStandAlone() {
  return (
    <div className="relative shrink-0 size-6" data-name="CheckmarkStandAlone">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="CheckmarkStandAlone">
          <path d={svgPaths.p20660480} fill="var(--fill-0, white)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt() {
  return (
    <div className="absolute bg-[#1474a4] box-border content-stretch flex gap-2 h-10 items-center justify-center left-4 px-4 py-2 rounded-[2px] top-[190px] w-[142px]" data-name="🟢 Button (IGT)">
      <CheckmarkStandAlone />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white">
        <p className="leading-[22px] whitespace-pre">Confirm</p>
      </div>
    </div>
  );
}

function CloseCrossCircle() {
  return (
    <div className="relative shrink-0 size-6" data-name="CloseCrossCircle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="CloseCrossCircle">
          <path d={svgPaths.p39ef700} fill="var(--fill-0, #E8E8E8)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt1() {
  return (
    <div className="absolute bg-[rgba(89,89,89,0.55)] box-border content-stretch flex gap-2 h-10 items-center justify-center left-[174px] px-4 py-2 rounded-[2px] top-[190px] w-[142px]" data-name="🟢 Button (IGT)">
      <CloseCrossCircle />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-nowrap">
        <p className="leading-[22px] whitespace-pre">Cancel</p>
      </div>
    </div>
  );
}

function Dot() {
  return <div className="bg-white rounded-[4px] shrink-0 size-2" data-name="Dot" />;
}

function Box() {
  return (
    <div className="absolute bg-[#1474a4] box-border content-stretch flex gap-2.5 inset-0 items-center justify-center p-[2px] rounded-[22px]" data-name="Box">
      <Dot />
    </div>
  );
}

function RadioButton() {
  return (
    <div className="relative rounded-[2px] shrink-0 size-5" data-name="Radio button">
      <Box />
    </div>
  );
}

function Checkbox() {
  return (
    <div className="box-border content-stretch flex gap-2.5 items-center justify-start px-0 py-px relative shrink-0" data-name="Checkbox">
      <RadioButton />
    </div>
  );
}

function RadioButtonIgt() {
  return (
    <div className="absolute box-border content-stretch flex gap-3 items-start justify-start left-4 px-0 py-[9px] top-[76px]" data-name="🟢 Radio button (IGT)">
      <Checkbox />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d6d6d6] text-[16px] text-nowrap">
        <p className="leading-[22px] whitespace-pre">Lumen + Media</p>
      </div>
    </div>
  );
}

function Box1() {
  return <div className="absolute bg-[rgba(196,196,196,0.25)] inset-0 rounded-[12px]" data-name="Box" />;
}

function RadioButton1() {
  return (
    <div className="relative rounded-[2px] shrink-0 size-5" data-name="Radio button">
      <Box1 />
    </div>
  );
}

function Checkbox1() {
  return (
    <div className="box-border content-stretch flex gap-2.5 items-center justify-start px-0 py-px relative shrink-0" data-name="Checkbox">
      <RadioButton1 />
    </div>
  );
}

function RadioButtonIgt1() {
  return (
    <div className="absolute box-border content-stretch flex gap-3 items-start justify-start left-[184px] px-0 py-[9px] top-[76px]" data-name="🟢 Radio button (IGT)">
      <Checkbox1 />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d6d6d6] text-[16px] text-nowrap">
        <p className="leading-[22px] whitespace-pre">Stent</p>
      </div>
    </div>
  );
}

function DeleteTrash() {
  return (
    <div className="relative shrink-0 size-6" data-name="DeleteTrash">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="DeleteTrash">
          <path d={svgPaths.p119c42c0} fill="var(--fill-0, #E8E8E8)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt2() {
  return (
    <div className="absolute bg-[rgba(89,89,89,0.55)] box-border content-stretch flex gap-2 h-10 items-center justify-center left-[268px] px-3 py-2 rounded-[2px] top-[18px] w-12" data-name="🟢 Button (IGT)">
      <DeleteTrash />
    </div>
  );
}

export default function SegmentEditingBoxMouse() {
  return (
    <div className="bg-[rgba(255,255,255,0.2)] relative rounded-[3px] size-full" data-name="Segment Editing Box/Mouse">
      <div className="overflow-clip relative size-full">
        <div className="[text-shadow:rgba(0,0,0,0.5)_0px_2px_4px] absolute font-['CentraleSans:Bold',_sans-serif] leading-[0] left-[17px] not-italic text-[#ffcd05] text-[24px] text-nowrap top-6">
          <p className="leading-[28px] whitespace-pre">A</p>
        </div>
        <div className="absolute bg-neutral-900 h-11 left-[55px] rounded-[3px] top-4 w-[205px]">
          <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.7)] border-solid inset-0 pointer-events-none rounded-[3px]" />
        </div>
        <div className="[text-shadow:rgba(0,0,0,0.5)_0px_2px_4px] absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-[136.5px] not-italic text-[24px] text-center text-nowrap text-white top-[26px] translate-x-[-50%]">
          <p className="leading-[24px] whitespace-pre">16.8</p>
        </div>
        <Icons />
        <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-48 not-italic text-[#787878] text-[20px] text-center text-nowrap top-6 translate-x-[-50%]">
          <p className="leading-[28px] whitespace-pre">mm</p>
        </div>
        <Icons1 />
        <ButtonIgt />
        <ButtonIgt1 />
        <RadioButtonIgt />
        <RadioButtonIgt1 />
        <ButtonIgt2 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#ffcd05] border-solid inset-0 pointer-events-none rounded-[3px]" />
    </div>
  );
}