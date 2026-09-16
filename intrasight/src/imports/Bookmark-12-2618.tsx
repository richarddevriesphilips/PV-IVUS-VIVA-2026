function Bookmark() {
  return (
    <div className="absolute left-1 size-6 top-[-1px]" data-name="Bookmark">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Bookmark">
          <path
            d="M18 23L12 17L6 23V1H18V23Z"
            fill="var(--fill-0, #FF9F19)"
            id="path"
          />
        </g>
      </svg>
    </div>
  );
}

export default function Bookmark1() {
  return (
    <div className="relative size-full" data-name="Bookmark">
      <Bookmark />
      <div className="absolute font-['CentraleSans:Bold',_sans-serif] leading-[0] left-4 not-italic text-[#000000] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">
        <p className="block leading-[18px] whitespace-pre">&nbsp;</p>
      </div>
    </div>
  );
}