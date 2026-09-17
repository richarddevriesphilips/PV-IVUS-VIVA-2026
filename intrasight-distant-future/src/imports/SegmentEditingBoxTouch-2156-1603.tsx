import svgPaths from "./svg-xrodi05ltm";

function Icons() {
  return (
    <div className="absolute left-[240px] size-6 top-1/2 translate-y-[-50%]" data-name="Icons">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Plus">
          <path d={svgPaths.p778cc70} fill="var(--fill-0, #E8E8E8)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function Icons1() {
  return (
    <div className="absolute left-[71px] size-6 top-1/2 translate-y-[-50%]" data-name="Icons">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Minus">
          <path
            d="M23 11V13H1V11H23Z"
            fill="var(--fill-0, #E8E8E8)"
            id="path"
          />
        </g>
      </svg>
    </div>
  );
}

function CheckmarkStandAlone() {
  return (
    <div className="relative shrink-0 size-8" data-name="CheckmarkStandAlone">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="CheckmarkStandAlone">
          <path d={svgPaths.pf7ee7c0} fill="var(--fill-0, white)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt() {
  return (
    <div
      className="absolute bg-[#1474a4] box-border content-stretch flex flex-row gap-2 h-16 items-center justify-center px-[18px] py-4 right-[100px] rounded top-1/2 translate-y-[-50%] w-[68px]"
      data-name="🟢 Button (IGT)"
    >
      <CheckmarkStandAlone />
    </div>
  );
}

function CloseCrossCircle() {
  return (
    <div className="relative shrink-0 size-8" data-name="CloseCrossCircle">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="CloseCrossCircle">
          <path
            d={svgPaths.p2b88f1f0}
            fill="var(--fill-0, #E8E8E8)"
            id="path"
          />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt1() {
  return (
    <div
      className="absolute bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-row gap-2 h-16 items-center justify-center px-[18px] py-4 right-4 rounded top-1/2 translate-y-[-50%] w-[68px]"
      data-name="🟢 Button (IGT)"
    >
      <CloseCrossCircle />
    </div>
  );
}

function Dot() {
  return (
    <div className="bg-[#ffffff] rounded shrink-0 size-2" data-name="Dot" />
  );
}

function Box() {
  return (
    <div
      className="absolute bg-[#1474a4] box-border content-stretch flex flex-row gap-2.5 inset-0 items-center justify-center p-[2px] rounded-[22px]"
      data-name="Box"
    >
      <Dot />
    </div>
  );
}

function RadioButton({ isSelected }: { isSelected: boolean }) {
  return (
    <div
      className="relative rounded-sm shrink-0 size-5"
      data-name="Radio button"
    >
      {isSelected ? <Box /> : <Box1 />}
    </div>
  );
}

function Checkbox({ isSelected }: { isSelected: boolean }) {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start px-0 py-1 relative shrink-0"
      data-name="Checkbox"
    >
      <RadioButton isSelected={isSelected} />
    </div>
  );
}

function RadioButtonIgt({ isSelected }: { isSelected: boolean }) {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row gap-3 items-center justify-start left-[450px] px-0 py-0 top-1/2 translate-y-[-50%]"
      data-name="🟢 Radio button (IGT)"
    >
      <Checkbox isSelected={isSelected} />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d6d6d6] text-[20px] text-left text-nowrap">
        <p className="block leading-[28px] whitespace-pre">Lumen + Media</p>
      </div>
    </div>
  );
}

function Box1() {
  return (
    <div
      className="absolute bg-[rgba(196,196,196,0.25)] inset-0 rounded-xl"
      data-name="Box"
    />
  );
}

function RadioButton1({ isSelected }: { isSelected: boolean }) {
  return (
    <div
      className="relative rounded-sm shrink-0 size-5"
      data-name="Radio button"
    >
      {isSelected ? <Box /> : <Box1 />}
    </div>
  );
}

function Checkbox1({ isSelected }: { isSelected: boolean }) {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start px-0 py-1 relative shrink-0"
      data-name="Checkbox"
    >
      <RadioButton1 isSelected={isSelected} />
    </div>
  );
}

function RadioButtonIgt1({ isSelected }: { isSelected: boolean }) {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row gap-3 items-center justify-start left-[654px] px-0 py-0 top-1/2 translate-y-[-50%]"
      data-name="🟢 Radio button (IGT)"
    >
      <Checkbox1 isSelected={isSelected} />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d6d6d6] text-[20px] text-left text-nowrap">
        <p className="block leading-[28px] whitespace-pre">Stent</p>
      </div>
    </div>
  );
}

function DeleteTrash() {
  return (
    <div className="relative shrink-0 size-8" data-name="DeleteTrash">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="DeleteTrash">
          <path
            d={svgPaths.p3dc87700}
            fill="var(--fill-0, #E8E8E8)"
            id="path"
          />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt2() {
  return (
    <div
      className="absolute bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-row gap-2 h-16 items-center justify-center left-[320px] px-[18px] py-4 rounded top-1/2 translate-y-[-50%] w-[68px]"
      data-name="🟢 Button (IGT)"
    >
      <DeleteTrash />
    </div>
  );
}

interface SegmentEditingBoxTouchProps {
  segmentType: "lumen" | "stent";
  segmentLength: string;
  segmentLabel: string;
  onSegmentTypeChange: (type: "lumen" | "stent") => void;
  onConfirm: () => void;
  onCancel: () => void;
  onDelete: () => void;
  onSizeIncrease: () => void;
  onSizeDecrease: () => void;
}

export default function SegmentEditingBoxTouch({
  segmentType,
  segmentLength,
  segmentLabel,
  onSegmentTypeChange,
  onConfirm,
  onCancel,
  onDelete,
  onSizeIncrease,
  onSizeDecrease,
}: SegmentEditingBoxTouchProps) {
  return (
    <div
      className="bg-[rgba(255,255,255,0.2)] relative rounded-[3px] w-full h-20"
      data-name="Segment Editing Box/Touch"
    >
      <div className="overflow-clip relative size-full">
        <div className="[text-shadow:rgba(0,0,0,0.5)_0px_2px_4px] absolute font-['CentraleSans:Bold',_sans-serif] leading-[0] left-[26px] not-italic text-[#ffcd05] text-[24px] text-left text-nowrap top-1/2 translate-y-[-50%]">
          <p className="block leading-[28px] whitespace-pre">{segmentLabel}</p>
        </div>
        <div className="absolute bg-neutral-900 h-16 left-[117px] rounded-[3px] top-1/2 translate-y-[-50%] w-[100px]">
          <div
            aria-hidden="true"
            className="absolute border border-[rgba(255,255,255,0.7)] border-solid inset-0 pointer-events-none rounded-[3px]"
          />
        </div>
        <div className="[text-shadow:rgba(0,0,0,0.5)_0px_2px_4px] absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-[167px] not-italic text-[#ffffff] text-[24px] text-center text-nowrap top-1/2 translate-y-[-50%] translate-x-[-50%]">
          <p className="block leading-[24px] whitespace-pre" style={{ fontSize: '25px', paddingLeft: '50px', marginTop: '-4px' }}>{segmentLength}{segmentLength ? " mm" : ""}</p>
        </div>
        <button onClick={onSizeIncrease}>
          <Icons />
        </button>

        <button onClick={onSizeDecrease}>
          <Icons1 />
        </button>
        <button onClick={onConfirm}>
          <ButtonIgt />
        </button>
        <button onClick={onCancel}>
          <ButtonIgt1 />
        </button>
        <button onClick={onDelete}>
          <ButtonIgt2 />
        </button>
      </div>
      <div
        aria-hidden="true"
        className="absolute border border-[#ffcd05] border-solid inset-0 pointer-events-none rounded-[3px]"
      />
    </div>
  );
}