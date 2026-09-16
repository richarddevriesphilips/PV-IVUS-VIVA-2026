import Button from '../imports/Button-2033-3119';

interface AddSegmentButtonProps {
  onClick: () => void;
}

export default function AddSegmentButton({ onClick }: AddSegmentButtonProps) {
  return (
    <div 
      className="w-[228px] h-10 cursor-pointer hover:opacity-90 transition-opacity" 
      onClick={onClick}
    >
      <Button />
    </div>
  );
}