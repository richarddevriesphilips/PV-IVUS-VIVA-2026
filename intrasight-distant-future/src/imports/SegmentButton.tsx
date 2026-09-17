import svgPaths from "./svg-gzdt084vmm";

function Measurement() {
  return (
    <div className="relative shrink-0 size-6" data-name="Measurement">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Measurement">
          <path
            d={svgPaths.p2a409f80}
            fill="var(--fill-0, #E8E8E8)"
            id="path"
          />
        </g>
      </svg>
    </div>
  );
}

function Button({ onAddSegment }: { onAddSegment: () => void }) {
  return (
    <button
      onClick={onAddSegment}
      className="bg-[#696969] box-border content-stretch flex flex-row gap-2 h-10 items-center justify-center px-4 py-2 relative rounded-sm shrink-0 w-[227px]"
      data-name="Button"
    >
      <Measurement />
      <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-left text-nowrap">
        <p className="block leading-[22px] whitespace-pre">Add Segment</p>
      </div>
    </button>
  );
}

function SegmentAdding({ onAddSegment }: { onAddSegment: () => void }) {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Segment adding"
    >
      <Button onAddSegment={onAddSegment} />
    </div>
  );
}

function Frame68({ length }: { length: string }) {
  return (
    <div className="box-border content-stretch flex flex-row font-['CentraleSans:Book',_sans-serif] gap-2.5 items-start justify-end leading-[0] not-italic text-[#ffffff] text-[24px] text-nowrap text-right">
      <div className="[text-shadow:rgba(0,0,0,0.5)_0px_2px_4px] relative">
        <p className="block leading-[24px] text-nowrap whitespace-pre">{length}</p>
      </div>
      <div className="[text-shadow:rgba(0,0,0,0.5)_0px_2px_4px] relative">
        <p className="block leading-[24px] text-nowrap whitespace-pre">mm</p>
      </div>
    </div>
  );
}

function SegmentInputFieldBoom({ label, length, onSegmentClick }: { label: string; length: string; onSegmentClick?: () => void }) {
  return (
    <button
      onClick={onSegmentClick}
      className="absolute bg-[rgba(89,89,89,0.5)] box-border content-stretch flex flex-row items-center justify-between left-0 overflow-clip p-[14px] rounded-[3px] top-0 w-[152px] cursor-pointer hover:bg-[rgba(99,99,99,0.6)] transition-colors"
      data-name="Segment input field/Boom"
    >
      <div className="[text-shadow:rgba(0,0,0,0.5)_0px_2px_4px] font-['CentraleSans:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[24px] text-[rgba(173,173,173,0.87)] text-left text-nowrap">
        <p className="block leading-[28px] whitespace-pre">{label}</p>
      </div>
      <Frame68 length={length} />
    </button>
  );
}

function Edit() {
  return (
    <div className="relative shrink-0 size-8" data-name="Edit">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="Edit">
          <path
            d={svgPaths.p21a57f00}
            fill="var(--fill-0, #E8E8E8)"
            id="path"
          />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt({ onEdit }: { onEdit: () => void }) {
  return (
    <button
      onClick={onEdit}
      className="absolute bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-row gap-2 h-14 items-center justify-center left-40 px-[18px] py-4 rounded top-0 hover:bg-[rgba(99,99,99,0.65)] transition-colors mx-[20px] my-[0px] mx-[10px] my-[0px]"
      data-name="🟢 Button (IGT)"
    >
      <Edit />
    </button>
  );
}

function SegmentInputFieldBoom1({ label, length, onEdit, onSegmentClick }: { label: string; length: string; onEdit: () => void; onSegmentClick?: () => void }) {
  return (
    <div
      className="h-14 overflow-clip relative rounded-[3px] shrink-0 w-full"
      data-name="Segment input field/Boom"
    >
      <SegmentInputFieldBoom label={label} length={length} onSegmentClick={onSegmentClick} />
      <ButtonIgt onEdit={onEdit} />
    </div>
  );
}

interface SegmentData {
  id: number;
  label: string;
  length: string;
}

interface SegmentButtonProps {
  segments: SegmentData[];
  onEdit?: (segmentId: number) => void;
  onAddSegment: () => void;
  onSegmentClick?: (segmentId: number) => void;
}

export default function SegmentButton({ segments, onEdit, onAddSegment, onSegmentClick }: SegmentButtonProps) {
  return (
    <div className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-0 relative size-full" data-name="Segment button">
      {/* Render all segments */}
      {segments.map((segment, index) => (
        <SegmentInputFieldBoom1 
          key={segment.id}
          label={segment.label} 
          length={segment.length} 
          onEdit={() => onEdit?.(segment.id)} 
          onSegmentClick={() => onSegmentClick?.(segment.id)} 
        />
      ))}
      
      {/* Add Segment button at the bottom */}
      <SegmentAdding onAddSegment={onAddSegment} />
    </div>
  );
}