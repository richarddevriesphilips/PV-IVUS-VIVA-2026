import svgPaths from "./svg-1rf0uo437j";

interface AddSegmentBoxProps {
  label?: string;
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

function ConfirmButton() {
  return (
    <div
      className="absolute bg-[#1474a4] bottom-[18px] h-10 left-1/2 rounded-sm translate-x-[-50%] w-[203px]"
      data-name="Confirm Button"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 h-10 items-center justify-center px-4 py-2 relative w-[203px]">
          <CheckmarkStandAlone />
          <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap">
            <p className="block leading-[22px] whitespace-pre">Confirm</p>
          </div>
        </div>
      </div>
    </div>
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

function CancelButton() {
  return (
    <button
      className="absolute bg-[rgba(89,89,89,0.55)] bottom-[67px] cursor-pointer h-10 left-1/2 rounded-sm translate-x-[-50%] w-[203px]"
      data-name="Cancel Button"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 h-10 items-center justify-center px-4 py-2 relative w-[203px]">
          <CloseCrossCircle />
          <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-left text-nowrap">
            <p className="block leading-[22px] whitespace-pre">Cancel</p>
          </div>
        </div>
      </div>
    </button>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-6" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Icon">
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

function DeleteButton() {
  return (
    <div
      className="absolute bg-[rgba(89,89,89,0.55)] h-10 left-[55px] rounded-sm top-[18px] w-40"
      data-name="Delete Button"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 h-10 items-center justify-center px-4 py-2 relative w-40">
          <Icon />
          <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-left text-nowrap">
            <p className="block leading-[22px] whitespace-pre">Delete</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SegmentEditingBoxMouse({ label }: { label: string }) {
  return (
    <div
      className="bg-[rgba(255,255,255,0.2)] h-[175px] relative rounded-[3px] shrink-0 w-[227px]"
      data-name="Segment Editing Box/Mouse"
    >
      <div className="h-[175px] overflow-clip relative w-[227px]">
        <div className="[text-shadow:rgba(0,0,0,0.5)_0px_2px_4px] absolute font-['CentraleSans:Bold',_sans-serif] leading-[0] left-[17px] not-italic text-[#ffcd05] text-[24px] text-left text-nowrap top-6">
          <p className="block leading-[28px] whitespace-pre">{label}</p>
        </div>
        <ConfirmButton />
        <CancelButton />
        <DeleteButton />
      </div>
      <div className="absolute border border-[#ffcd05] border-solid inset-0 pointer-events-none rounded-[3px]" />
    </div>
  );
}

function SegmentAdding({ label }: { label: string }) {
  return (
    <div
      className="absolute h-[175px] left-0 top-0 w-[227px]"
      data-name="Segment adding"
    >
      <div className="box-border content-stretch flex flex-row h-[175px] items-start justify-start p-0 relative w-[227px]">
        <SegmentEditingBoxMouse label={label} />
      </div>
    </div>
  );
}

export default function AddSegmentBox({ label = "A" }: AddSegmentBoxProps) {
  return (
    <div className="relative size-full" data-name="Add segment box">
      <SegmentAdding label={label} />
    </div>
  );
}