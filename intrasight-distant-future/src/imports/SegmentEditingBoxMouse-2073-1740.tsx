import svgPaths from "./svg-zdazz8n401";

interface SegmentEditingBoxMouseProps {
  segmentType: 'lumen' | 'stent';
  onSegmentTypeChange: (type: 'lumen' | 'stent') => void;
  onConfirm: () => void;
  onCancel: () => void;
  onDelete: () => void;
}

function CheckmarkStandAlone() {
  return (
    <div className="relative shrink-0 size-6" data-name="CheckmarkStandAlone">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="CheckmarkStandAlone">
          <path d={svgPaths.p20660480} fill="var(--fill-0, white)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute bg-[#1474a4] hover:bg-[#1a5bb8] transition-colors box-border content-stretch flex flex-row gap-2 h-10 items-center justify-center left-4 px-4 py-2 rounded-sm top-[120px] w-[142px] cursor-pointer"
      data-name="🟢 Button (IGT)"
    >
      <CheckmarkStandAlone />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap">
        <p className="block leading-[22px] whitespace-pre">Confirm</p>
      </div>
    </button>
  );
}

function CloseCrossCircle() {
  return (
    <div className="relative shrink-0 size-6" data-name="CloseCrossCircle">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="CloseCrossCircle">
          <path d={svgPaths.p39ef700} fill="var(--fill-0, #E8E8E8)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt1({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute bg-[rgba(89,89,89,0.55)] hover:bg-[rgba(89,89,89,0.7)] transition-colors box-border content-stretch flex flex-row gap-2 h-10 items-center justify-center left-[174px] px-4 py-2 rounded-sm top-[120px] w-[142px] cursor-pointer"
      data-name="🟢 Button (IGT)"
    >
      <CloseCrossCircle />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-left text-nowrap">
        <p className="block leading-[22px] whitespace-pre">Cancel</p>
      </div>
    </button>
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

function RadioButton() {
  return (
    <div
      className="relative rounded-sm shrink-0 size-5"
      data-name="Radio button"
    >
      <Box />
    </div>
  );
}

function Checkbox() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start px-0 py-px relative shrink-0"
      data-name="Checkbox"
    >
      <RadioButton />
    </div>
  );
}

function RadioButtonIgt({ 
  isSelected, 
  onClick 
}: { 
  isSelected: boolean; 
  onClick: () => void; 
}) {
  return (
    <button
      onClick={onClick}
      className="absolute box-border content-stretch flex flex-row gap-3 items-start justify-start left-4 px-0 py-[9px] top-[76px] cursor-pointer hover:bg-[rgba(255,255,255,0.05)] rounded transition-colors"
      data-name="🟢 Radio button (IGT)"
    >
      {isSelected ? <Checkbox /> : <Checkbox1 />}
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d6d6d6] text-[16px] text-left text-nowrap">
        <p className="block leading-[22px] whitespace-pre">Lumen + Media</p>
      </div>
    </button>
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

function RadioButton1() {
  return (
    <div
      className="relative rounded-sm shrink-0 size-5"
      data-name="Radio button"
    >
      <Box1 />
    </div>
  );
}

function Checkbox1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start px-0 py-px relative shrink-0"
      data-name="Checkbox"
    >
      <RadioButton1 />
    </div>
  );
}

function RadioButtonIgt1({ 
  isSelected, 
  onClick 
}: { 
  isSelected: boolean; 
  onClick: () => void; 
}) {
  return (
    <button
      onClick={onClick}
      className="absolute box-border content-stretch flex flex-row gap-3 items-start justify-start left-[184px] px-0 py-[9px] top-[76px] cursor-pointer hover:bg-[rgba(255,255,255,0.05)] rounded transition-colors"
      data-name="🟢 Radio button (IGT)"
    >
      {isSelected ? <Checkbox /> : <Checkbox1 />}
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d6d6d6] text-[16px] text-left text-nowrap">
        <p className="block leading-[22px] whitespace-pre">Stent</p>
      </div>
    </button>
  );
}

function DeleteTrash() {
  return (
    <div className="relative shrink-0 size-6" data-name="DeleteTrash">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="DeleteTrash">
          <path
            d={svgPaths.p119c42c0}
            fill="var(--fill-0, #E8E8E8)"
            id="path"
          />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt2({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute bg-[rgba(89,89,89,0.55)] hover:bg-[rgba(89,89,89,0.7)] transition-colors box-border content-stretch flex flex-row gap-2 h-10 items-center justify-center left-[199px] px-4 py-2 rounded-sm top-[18px] w-[117px] cursor-pointer"
      data-name="🟢 Button (IGT)"
    >
      <DeleteTrash />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-left text-nowrap">
        <p className="block leading-[22px] whitespace-pre">Delete</p>
      </div>
    </button>
  );
}

export default function SegmentEditingBoxMouse({
  segmentType,
  onSegmentTypeChange,
  onConfirm,
  onCancel,
  onDelete
}: SegmentEditingBoxMouseProps) {
  return (
    <div
      className="bg-[rgba(255,255,255,0.2)] relative rounded-[3px] size-full"
      data-name="Segment Editing Box/Mouse"
    >
      <div className="overflow-clip relative size-full">
        <div className="[text-shadow:rgba(0,0,0,0.5)_0px_2px_4px] absolute font-['CentraleSans:Bold',_sans-serif] leading-[0] left-[17px] not-italic text-[#ffcd05] text-[24px] text-left text-nowrap top-6">
          <p className="block leading-[28px] whitespace-pre">A</p>
        </div>
        <ButtonIgt onClick={onConfirm} />
        <ButtonIgt1 onClick={onCancel} />
        <RadioButtonIgt 
          isSelected={segmentType === 'lumen'} 
          onClick={() => onSegmentTypeChange('lumen')} 
        />
        <RadioButtonIgt1 
          isSelected={segmentType === 'stent'} 
          onClick={() => onSegmentTypeChange('stent')} 
        />
        <ButtonIgt2 onClick={onDelete} />
      </div>
      <div className="absolute border border-[#ffcd05] border-solid inset-0 pointer-events-none rounded-[3px]" />
    </div>
  );
}