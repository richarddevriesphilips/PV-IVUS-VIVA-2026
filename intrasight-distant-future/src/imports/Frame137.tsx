import svgPaths from "./svg-wjresxch8o";
import SegmentEditingBoxTouch from "./SegmentEditingBoxTouch-2073-2141";

function Measurement() {
  return (
    <div className="relative shrink-0 size-8" data-name="Measurement">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="Measurement">
          <path
            d={svgPaths.p2938bf00}
            fill="var(--fill-0, #E8E8E8)"
            id="path"
          />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt1({ onAddSegment }: { onAddSegment?: () => void }) {
  return (
    <button
      onClick={onAddSegment}
      className="bg-[#696969] box-border content-stretch flex flex-row gap-3 items-center justify-center px-5 py-4 relative rounded shrink-0 w-[214px]"
      data-name="🟢 Button (IGT)"
    >
      <Measurement />
      <div className="font-['CentraleSans',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[20px] text-center text-nowrap">
        <p className="block leading-[28px] whitespace-pre">Add Segment</p>
      </div>
    </button>
  );
}

function Container({ onAddSegment }: { onAddSegment?: () => void }) {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row gap-4 items-center justify-start left-0 p-0 top-0"
      data-name="Container"
    >
      <ButtonIgt1 onAddSegment={onAddSegment} />
    </div>
  );
}

function Controls() {
  return (
    <div className="relative size-6" data-name="Controls">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Controls">
          <path
            d={svgPaths.p1833f00}
            fill="var(--fill-0, white)"
            fillOpacity="0.8"
            id="path"
          />
        </g>
      </svg>
    </div>
  );
}

function ArrowLeft() {
  return (
    <div className="absolute left-2 size-6 top-5" data-name="ArrowLeft">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="ArrowLeft">
          <path
            clipRule="evenodd"
            d="M14 17L9 12L14 7H15V17H14Z"
            fill="var(--fill-0, #E8E8E8)"
            fillRule="evenodd"
            id="path"
          />
        </g>
      </svg>
    </div>
  );
}

function SideButton() {
  return (
    <div
      className="bg-neutral-900 h-16 overflow-clip relative rounded-sm shrink-0 w-[212px]"
      data-name="SideButton"
    >
      <div className="absolute flex h-[24px] items-center justify-center left-[35px] top-5 w-[24px]">
        <div className="flex-none rotate-[90deg]">
          <Controls />
        </div>
      </div>
      <div className="absolute font-['CentraleSans',_sans-serif] leading-[0] left-[70px] not-italic text-[20px] text-[rgba(255,255,255,0.8)] text-left text-nowrap top-[18px]">
        <p className="block leading-[28px] whitespace-pre">Adjust Image</p>
      </div>
      <ArrowLeft />
    </div>
  );
}

function AdjustImageSlideBar() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row gap-px h-16 items-start justify-end left-[516px] overflow-clip pb-2.5 pt-0 px-0 top-0 w-[588px]"
      data-name="Adjust Image slide bar"
    >
      <SideButton />
    </div>
  );
}

interface Frame137Props {
  onAddSegment?: () => void;
  isSegmentActive?: boolean;
  segmentType?: 'lumen' | 'stent';
  onSegmentTypeChange?: (type: 'lumen' | 'stent') => void;
  onSegmentConfirm?: () => void;
  onSegmentCancel?: () => void;
  onSegmentDelete?: () => void;
}

export default function Frame137({ 
  onAddSegment, 
  isSegmentActive = false,
  segmentType = 'lumen',
  onSegmentTypeChange,
  onSegmentConfirm,
  onSegmentCancel,
  onSegmentDelete
}: Frame137Props) {
  return (
    <div className="relative size-full">
      {!isSegmentActive ? (
        <>
          <Container onAddSegment={onAddSegment} />
          <AdjustImageSlideBar />
        </>
      ) : (
        <div className="absolute left-0 top-0 w-full h-16">
          <SegmentEditingBoxTouch 
            segmentType={segmentType}
            onSegmentTypeChange={onSegmentTypeChange}
            onConfirm={onSegmentConfirm}
            onCancel={onSegmentCancel}
            onDelete={onSegmentDelete}
          />
        </div>
      )}
    </div>
  );
}