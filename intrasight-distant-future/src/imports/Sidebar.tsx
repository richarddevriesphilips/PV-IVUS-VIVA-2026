import svgPaths from "./svg-k8pn9utbsh";

function Icon() {
  return (
    <div className="relative shrink-0 size-8" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="Icon">
          <path
            d={svgPaths.p1c6ba100}
            fill="var(--fill-0, #E8E8E8)"
            id="path"
          />
        </g>
      </svg>
    </div>
  );
}

function Home() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 h-16 items-center justify-center px-[18px] py-4 relative rounded shrink-0 w-[88px]"
      data-name="Home"
    >
      <Icon />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-8" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="Icon">
          <path d={svgPaths.pa1c6aa0} fill="var(--fill-0, #E8E8E8)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function Snapshot() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 h-16 items-center justify-center px-[18px] py-4 relative rounded shrink-0 w-[88px]"
      data-name="Snapshot"
    >
      <Icon1 />
    </div>
  );
}

function QuietButtons() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-5 items-start justify-start p-0 relative shrink-0"
      data-name="Quiet buttons"
    >
      <Home />
      <Snapshot />
    </div>
  );
}

function ActionBarVerticalIgt() {
  return (
    <div
      className="absolute bg-neutral-900 box-border content-stretch flex flex-col gap-6 h-[720px] items-center justify-start left-0 px-0 py-5 top-0 w-32"
      data-name="🟢 Action bar vertical (IGT)"
    >
      <QuietButtons />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-8" data-name="Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="Icon">
          <path
            d={svgPaths.p2b832000}
            fill="var(--fill-0, #171717)"
            id="path"
          />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt() {
  return (
    <div
      className="bg-[#c4c4c4] relative rounded shrink-0 w-full"
      data-name="🟢 Button (IGT)"
    >
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 relative w-full">
          <Icon2 />
          <div
            className="font-['CentraleSans:Book',_sans-serif] leading-[0] min-w-full not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-center text-neutral-900 text-nowrap"
            style={{ width: "min-content" }}
          >
            <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[20px] overflow-inherit">
              Save Frame
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TextBubbleAnnotation() {
  return (
    <div className="relative shrink-0 size-8" data-name="TextBubbleAnnotation">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="TextBubbleAnnotation">
          <path
            d={svgPaths.p27261b00}
            fill="var(--fill-0, #171717)"
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
      className="bg-[#c4c4c4] relative rounded shrink-0 w-full"
      data-name="🟢 Button (IGT)"
    >
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 relative w-full">
          <TextBubbleAnnotation />
          <div
            className="font-['CentraleSans:Book',_sans-serif] leading-[0] min-w-full not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-center text-neutral-900 text-nowrap"
            style={{ width: "min-content" }}
          >
            <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[20px] overflow-inherit">
              Annotate
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DlsBookmark48() {
  return (
    <div className="relative shrink-0 size-8" data-name="DLS_Bookmark_48">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="DLS_Bookmark_48">
          <path d={svgPaths.p4c62300} fill="var(--fill-0, #171717)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt2() {
  return (
    <div
      className="bg-[#c4c4c4] relative rounded shrink-0 w-full"
      data-name="🟢 Button (IGT)"
    >
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 relative w-full">
          <DlsBookmark48 />
          <div
            className="font-['CentraleSans:Book',_sans-serif] leading-[0] min-w-full not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-center text-neutral-900 text-nowrap"
            style={{ width: "min-content" }}
          >
            <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[20px] overflow-inherit">
              Bookmark
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame65() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-2 items-start justify-start left-5 p-0 top-[184px] w-[88px]">
      <ButtonIgt />
      <ButtonIgt1 />
      <ButtonIgt2 />
    </div>
  );
}

function DlsMoviecontrolPlayCircle48() {
  return (
    <div
      className="relative shrink-0 size-8"
      data-name="DLS_MoviecontrolPlay_Circle_48"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="DLS_MoviecontrolPlay_Circle_48">
          <path d={svgPaths.pe127e00} fill="var(--fill-0, #171717)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt4() {
  return (
    <div
      className="bg-[#c4c4c4] relative rounded shrink-0 w-full"
      data-name="🟢 Button (IGT)"
    >
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 relative w-full">
          <DlsMoviecontrolPlayCircle48 />
          <div
            className="font-['CentraleSans:Book',_sans-serif] leading-[0] min-w-full not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-center text-neutral-900 text-nowrap"
            style={{ width: "min-content" }}
          >
            <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[20px] overflow-inherit">
              Playback
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Camera() {
  return (
    <div className="relative shrink-0 size-8" data-name="Camera">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="Camera">
          <path d={svgPaths.p2bda4100} fill="var(--fill-0, white)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt5() {
  return (
    <div
      className="bg-[#1474a4] relative rounded shrink-0 w-full"
      data-name="🟢 Button (IGT)"
    >
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 relative w-full">
          <Camera />
          <div
            className="font-['CentraleSans:Book',_sans-serif] leading-[0] min-w-full not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#ffffff] text-[14px] text-center text-nowrap"
            style={{ width: "min-content" }}
          >
            <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[20px] overflow-inherit">
              Live
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame64() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-2 h-52 items-center justify-end left-5 p-0 top-[492px] w-[88px]">
      <ButtonIgt4 />
      <ButtonIgt5 />
    </div>
  );
}

export default function Sidebar() {
  return (
    <div className="relative size-full" data-name="Sidebar">
      <ActionBarVerticalIgt />
      <Frame65 />
      <Frame64 />
    </div>
  );
}