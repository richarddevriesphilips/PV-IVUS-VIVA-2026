import svgPaths from "./svg-12fsp74r4j";

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

function ButtonIgt({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-[#1474a4] hover:bg-[#1a5bb8] transition-colors box-border content-stretch flex flex-row gap-2 h-[48px] items-center justify-center px-3 py-1 rounded shrink-0 w-[60px] cursor-pointer"
      data-name="🟢 Button (IGT)"
    >
      <CheckmarkStandAlone />
    </button>
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

function ButtonIgt1({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-[rgba(89,89,89,0.55)] hover:bg-[rgba(89,89,89,0.7)] transition-colors box-border content-stretch flex flex-row gap-2 h-[48px] items-center justify-center px-3 py-1 rounded shrink-0 w-[60px] cursor-pointer"
      data-name="🟢 Button (IGT)"
    >
      <CloseCrossCircle />
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

function RadioButtonIgt({ isSelected, onClick }: { isSelected: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start px-0 py-1 cursor-pointer"
      data-name="🟢 Radio button (IGT)"
    >
      <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start px-0 py-0 relative shrink-0">
        <div className="relative rounded-sm shrink-0 size-4">
          {isSelected ? <Box /> : <Box1 />}
        </div>
      </div>
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d6d6d6] text-[18px] text-left text-nowrap">
        <p className="block leading-[24px] whitespace-pre">Lumen + Media</p>
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

function RadioButtonIgt1({ isSelected, onClick }: { isSelected: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start px-0 py-1 cursor-pointer"
      data-name="🟢 Radio button (IGT)"
    >
      <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start px-0 py-0 relative shrink-0">
        <div className="relative rounded-sm shrink-0 size-4">
          {isSelected ? <Box /> : <Box1 />}
        </div>
      </div>
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d6d6d6] text-[18px] text-left text-nowrap">
        <p className="block leading-[24px] whitespace-pre">Stent</p>
      </div>
    </button>
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

function ButtonIgt2({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-[rgba(89,89,89,0.55)] hover:bg-[rgba(89,89,89,0.7)] transition-colors box-border content-stretch flex flex-row gap-2 h-[48px] items-center justify-center px-3 py-1 rounded shrink-0 w-[60px] cursor-pointer"
      data-name="🟢 Button (IGT)"
    >
      <DeleteTrash />
    </button>
  );
}

interface SegmentEditingBoxTouchProps {
  segmentType?: 'lumen' | 'stent';
  onSegmentTypeChange?: (type: 'lumen' | 'stent') => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  onDelete?: () => void;
}

export default function SegmentEditingBoxTouch({ 
  segmentType = 'lumen',
  onSegmentTypeChange,
  onConfirm,
  onCancel,
  onDelete
}: SegmentEditingBoxTouchProps) {
  const handleLumenClick = () => {
    onSegmentTypeChange?.('lumen');
  };

  const handleStentClick = () => {
    onSegmentTypeChange?.('stent');
  };

  return (
    <div
      className="bg-[rgba(255,255,255,0.2)] relative rounded-[3px] size-full border border-[#ffcd05] border-solid"
      data-name="Segment Editing Box/Touch"
    >
      <div className="flex items-center justify-between gap-4 h-full px-4 py-1">
        {/* Left Section - Segment Label and Delete Button */}
        <div className="flex items-center gap-4">
          <div className="[text-shadow:rgba(0,0,0,0.5)_0px_2px_4px] font-['CentraleSans:Bold',_sans-serif] leading-[0] not-italic text-[#ffcd05] text-[20px] text-left text-nowrap">
            <p className="block leading-[24px] whitespace-pre">A</p>
          </div>
          <ButtonIgt2 onClick={onDelete} />
        </div>

        {/* Center Section - Radio Buttons */}
        <div className="flex items-center gap-6">
          <RadioButtonIgt isSelected={segmentType === 'lumen'} onClick={handleLumenClick} />
          <RadioButtonIgt1 isSelected={segmentType === 'stent'} onClick={handleStentClick} />
        </div>

        {/* Right Section - Action Buttons */}
        <div className="flex items-center gap-4">
          <ButtonIgt onClick={onConfirm} />
          <ButtonIgt1 onClick={onCancel} />
        </div>
      </div>
    </div>
  );
}