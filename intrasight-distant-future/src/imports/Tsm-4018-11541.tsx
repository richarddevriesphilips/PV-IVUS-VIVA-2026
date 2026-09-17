import svgPaths from "./svg-w00dqxd84o";
import imgImage134 from "figma:asset/99afbf22ffcead74b80cb037dcd1d1fb556cefe3.png";

function Icon() {
  return (
    <div className="relative shrink-0 size-8" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p1c6ba100} fill="var(--fill-0, #E8E8E8)" id="path" />
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
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
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

function SavedFrame() {
  return (
    <div className="relative shrink-0 size-8" data-name="SavedFrame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="SavedFrame">
          <path d={svgPaths.p2b832000} fill="var(--fill-0, #171717)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt() {
  return (
    <div className="bg-[#c4c4c4] relative rounded shrink-0 w-full" data-name="🟢 Button (IGT)">
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 relative w-full">
          <SavedFrame />
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

function CameraFreeze() {
  return (
    <div className="relative shrink-0 size-8" data-name="CameraFreeze">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="CameraFreeze">
          <path d={svgPaths.p1419d180} fill="var(--fill-0, #171717)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt1() {
  return (
    <div className="bg-[#c4c4c4] relative rounded shrink-0 w-full" data-name="🟢 Button (IGT)">
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 relative w-full">
          <CameraFreeze />
          <div
            className="font-['CentraleSans:Book',_sans-serif] leading-[0] min-w-full not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-center text-neutral-900 text-nowrap"
            style={{ width: "min-content" }}
          >
            <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[20px] overflow-inherit">
              Freeze
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Ringdown() {
  return (
    <div className="relative shrink-0 size-8" data-name="Ringdown">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Ringdown">
          <path d={svgPaths.p48d3000} fill="var(--fill-0, #171717)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt2() {
  return (
    <div className="bg-[#c4c4c4] relative rounded shrink-0 w-full" data-name="🟢 Button (IGT)">
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 relative w-full">
          <Ringdown />
          <div
            className="font-['CentraleSans:Book',_sans-serif] leading-[0] min-w-full not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-center text-neutral-900 text-nowrap"
            style={{ width: "min-content" }}
          >
            <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[20px] overflow-inherit">
              Ringdown
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Record() {
  return (
    <div className="relative shrink-0 size-8" data-name="Record">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Record">
          <path d={svgPaths.p13f52000} fill="var(--fill-0, white)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt3() {
  return (
    <div className="bg-[#1474a4] relative rounded shrink-0 w-full" data-name="🟢 Button (IGT)">
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 relative w-full">
          <Record />
          <div
            className="font-['CentraleSans:Book',_sans-serif] leading-[0] min-w-full not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#ffffff] text-[14px] text-center text-nowrap"
            style={{ width: "min-content" }}
          >
            <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[20px] overflow-inherit">
              Record
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToggleSwitch() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start p-0 relative shrink-0"
      data-name="Toggle Switch"
    >
      <div className="bg-[#45de85] h-4 rounded-[100px] shrink-0 w-10" data-name="track" />
      <div
        className="absolute bg-[#e8e8e8] right-[-4px] rounded-[100px] size-6 top-1/2 translate-y-[-50%]"
        data-name="thumb"
      >
        <div
          aria-hidden="true"
          className="absolute border border-[#8c8c8c] border-solid inset-0 pointer-events-none rounded-[100px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.45)]"
        />
      </div>
    </div>
  );
}

function ButtonIgt4() {
  return (
    <div className="bg-[rgba(89,89,89,0.55)] h-16 relative rounded shrink-0 w-full" data-name="🟢 Button (IGT)">
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-0.5 h-16 items-center justify-center pb-1 pt-1.5 px-1 relative w-full">
          <ToggleSwitch />
          <div
            className="font-['CentraleSans:Book',_sans-serif] leading-[0] min-w-full not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#e8e8e8] text-[14px] text-center text-nowrap"
            style={{ width: "min-content" }}
          >
            <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[20px] overflow-inherit">
              Sync PB
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame64() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-2 h-[350px] items-start justify-start left-5 p-0 top-[348px] w-[88px]">
      <ButtonIgt />
      <ButtonIgt1 />
      <ButtonIgt2 />
      <ButtonIgt3 />
      <ButtonIgt4 />
    </div>
  );
}

function Graticules() {
  return (
    <div className="absolute inset-[22.22%_33.75%_22.22%_35%]" data-name="Graticules">
      <div className="absolute inset-[-0.25%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 402 402">
          <g id="Graticules">
            <ellipse cx="200.34" cy="200.008" fill="var(--fill-0, #FF830F)" id="Ellipse 35" rx="2.64026" ry="2.64463" />
            <rect
              fill="var(--fill-0, #FF830F)"
              height="6.28926"
              id="Rectangle 68"
              stroke="var(--stroke-0, #802726)"
              width="2.32013"
              x="159.576"
              y="196.864"
            />
            <rect
              fill="var(--fill-0, #FF830F)"
              height="6.28926"
              id="Rectangle 69"
              stroke="var(--stroke-0, #802726)"
              width="2.32013"
              x="119.972"
              y="196.864"
            />
            <rect
              fill="var(--fill-0, #FF830F)"
              height="6.28926"
              id="Rectangle 73"
              stroke="var(--stroke-0, #802726)"
              width="2.32013"
              x="238.784"
              y="196.864"
            />
            <rect
              fill="var(--fill-0, #FF830F)"
              height="6.28052"
              id="Rectangle 78"
              stroke="var(--stroke-0, #802726)"
              transform="rotate(-90 197.2 240.839)"
              width="2.32231"
              x="197.2"
              y="240.839"
            />
            <rect
              fill="var(--fill-0, #FF830F)"
              height="6.28052"
              id="Rectangle 83"
              stroke="var(--stroke-0, #802726)"
              transform="rotate(-90 197.2 2.82231)"
              width="2.32231"
              x="197.2"
              y="2.82231"
            />
            <rect
              fill="var(--fill-0, #FF830F)"
              height="6.28052"
              id="Rectangle 79"
              stroke="var(--stroke-0, #802726)"
              transform="rotate(-90 197.2 281.169)"
              width="2.32233"
              x="197.2"
              y="281.169"
            />
            <rect
              fill="var(--fill-0, #FF830F)"
              height="6.28052"
              id="Rectangle 84"
              stroke="var(--stroke-0, #802726)"
              transform="rotate(-90 197.2 42.4917)"
              width="2.32232"
              x="197.2"
              y="42.4917"
            />
            <rect
              fill="var(--fill-0, #FF830F)"
              height="6.28052"
              id="Rectangle 80"
              stroke="var(--stroke-0, #802726)"
              transform="rotate(-90 197.2 322.822)"
              width="2.32233"
              x="197.2"
              y="322.822"
            />
            <rect
              fill="var(--fill-0, #FF830F)"
              height="6.28052"
              id="Rectangle 85"
              stroke="var(--stroke-0, #802726)"
              transform="rotate(-90 197.2 82.1612)"
              width="2.32231"
              x="197.2"
              y="82.1612"
            />
            <rect
              fill="var(--fill-0, #FF830F)"
              height="6.28052"
              id="Rectangle 81"
              stroke="var(--stroke-0, #802726)"
              transform="rotate(-90 197.2 361.169)"
              width="2.32233"
              x="197.2"
              y="361.169"
            />
            <rect
              fill="var(--fill-0, #FF830F)"
              height="6.28052"
              id="Rectangle 86"
              stroke="var(--stroke-0, #802726)"
              transform="rotate(-90 197.2 122.492)"
              width="2.32232"
              x="197.2"
              y="122.492"
            />
            <rect
              fill="var(--fill-0, #FF830F)"
              height="6.28052"
              id="Rectangle 82"
              stroke="var(--stroke-0, #802726)"
              transform="rotate(-90 197.2 401.5)"
              width="2.32233"
              x="197.2"
              y="401.5"
            />
            <rect
              fill="var(--fill-0, #FF830F)"
              height="6.28052"
              id="Rectangle 87"
              stroke="var(--stroke-0, #802726)"
              transform="rotate(-90 197.2 162.161)"
              width="2.32233"
              x="197.2"
              y="162.161"
            />
            <rect
              fill="var(--fill-0, #FF830F)"
              height="6.28926"
              id="Rectangle 74"
              stroke="var(--stroke-0, #802726)"
              width="2.32013"
              x="279.048"
              y="196.864"
            />
            <rect
              fill="var(--fill-0, #FF830F)"
              height="6.28926"
              id="Rectangle 75"
              stroke="var(--stroke-0, #802726)"
              width="2.32013"
              x="319.312"
              y="196.864"
            />
            <rect
              fill="var(--fill-0, #FF830F)"
              height="6.28926"
              id="Rectangle 76"
              stroke="var(--stroke-0, #802726)"
              width="2.32013"
              x="358.916"
              y="196.864"
            />
            <rect
              fill="var(--fill-0, #FF830F)"
              height="6.28926"
              id="Rectangle 77"
              stroke="var(--stroke-0, #802726)"
              width="2.32013"
              x="399.18"
              y="196.864"
            />
            <rect
              fill="var(--fill-0, #FF830F)"
              height="6.28926"
              id="Rectangle 70"
              stroke="var(--stroke-0, #802726)"
              width="2.32013"
              x="79.7079"
              y="196.864"
            />
            <rect
              fill="var(--fill-0, #FF830F)"
              height="6.28926"
              id="Rectangle 71"
              stroke="var(--stroke-0, #802726)"
              width="2.32013"
              x="40.104"
              y="196.864"
            />
            <rect
              fill="var(--fill-0, #FF830F)"
              height="6.28926"
              id="Rectangle 72"
              stroke="var(--stroke-0, #802726)"
              width="2.32013"
              x="0.5"
              y="196.864"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

function DlsContrastBrightness48() {
  return (
    <div className="relative shrink-0 size-8" data-name="DLS_ContrastBrightness_48">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="DLS_ContrastBrightness_48">
          <path d={svgPaths.p30e8f500} fill="var(--fill-0, #E8E8E8)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt5() {
  return (
    <div
      className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 relative rounded shrink-0 w-[88px]"
      data-name="🟢 Button (IGT)"
    >
      <DlsContrastBrightness48 />
      <div
        className="font-['CentraleSans:Book',_sans-serif] leading-[0] min-w-full not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#e8e8e8] text-[14px] text-center text-nowrap"
        style={{ width: "min-content" }}
      >
        <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[20px] overflow-inherit">
          60
        </p>
      </div>
    </div>
  );
}

function FieldOfViewIcon() {
  return (
    <div className="relative shrink-0 size-8" data-name="FieldOfViewIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="FieldOfViewIcon">
          <path d={svgPaths.p17c13900} fill="var(--fill-0, #D1D1D1)" id="Union" />
          <path d={svgPaths.p23655800} fill="var(--fill-0, #C4C4C4)" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt6() {
  return (
    <div
      className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 relative rounded shrink-0 w-[88px]"
      data-name="🟢 Button (IGT)"
    >
      <FieldOfViewIcon />
      <div
        className="font-['CentraleSans:Book',_sans-serif] leading-[0] min-w-full not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#e8e8e8] text-[14px] text-center text-nowrap"
        style={{ width: "min-content" }}
      >
        <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[20px] overflow-inherit">
          2 mm
        </p>
      </div>
    </div>
  );
}

function DlsRingdown48() {
  return (
    <div className="relative shrink-0 size-8" data-name="DLS_Ringdown_48">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="DLS_Ringdown_48">
          <path d={svgPaths.p3907b300} fill="var(--fill-0, #E8E8E8)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt7() {
  return (
    <div
      className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 relative rounded shrink-0 w-[88px]"
      data-name="🟢 Button (IGT)"
    >
      <DlsRingdown48 />
      <div
        className="font-['CentraleSans:Book',_sans-serif] leading-[0] min-w-full not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#e8e8e8] text-[14px] text-center text-nowrap"
        style={{ width: "min-content" }}
      >
        <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[20px] overflow-inherit">
          Adaptive
        </p>
      </div>
    </div>
  );
}

function RevolveCenter32() {
  return (
    <div className="relative shrink-0 size-8" data-name="RevolveCenter_32">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="RevolveCenter_32">
          <path d={svgPaths.p642e380} fill="var(--fill-0, #E8E8E8)" id="path" opacity="0.5" />
          <path d={svgPaths.p1b2b1700} fill="var(--fill-0, #E8E8E8)" id="path_2" />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt8() {
  return (
    <div
      className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 relative rounded shrink-0 w-[88px]"
      data-name="🟢 Button (IGT)"
    >
      <RevolveCenter32 />
      <div
        className="font-['CentraleSans:Book',_sans-serif] leading-[0] min-w-full not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#e8e8e8] text-[14px] text-center text-nowrap"
        style={{ width: "min-content" }}
      >
        <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[20px] overflow-inherit">
          Revolve
        </p>
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-4 items-start justify-start left-[1168px] p-0 top-6">
      <ButtonIgt5 />
      <ButtonIgt6 />
      <ButtonIgt7 />
      <ButtonIgt8 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-8" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p46b8d80} fill="var(--fill-0, #E8E8E8)" id="path" />
        </g>
      </svg>
    </div>
  );
}

function ButtonIgt9() {
  return (
    <div
      className="absolute bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-col gap-0.5 inset-0 items-center justify-center pb-1 pt-1.5 px-1 rounded-sm"
      data-name="🟢 Button (IGT)"
    >
      <Icon2 />
      <div
        className="font-['CentraleSans:Book',_sans-serif] leading-[0] min-w-full not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#d6d6d6] text-[14px] text-center text-nowrap"
        style={{ width: "min-content" }}
      >
        <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[20px] overflow-inherit">
          ChromaFlo
        </p>
      </div>
    </div>
  );
}

function Group26() {
  return (
    <div className="absolute contents inset-0">
      <ButtonIgt9 />
      <div className="absolute inset-[9.38%_6.82%_78.13%_84.09%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <circle cx="4" cy="4" fill="var(--fill-0, #595959)" fillOpacity="0.55" id="Ellipse 23" r="4" />
        </svg>
      </div>
    </div>
  );
}

function ChromaFlo() {
  return (
    <div className="absolute h-16 left-[1168px] top-[632px] w-[88px]" data-name="ChromaFlo">
      {[...Array(2).keys()].map((_, i) => (
        <Group26 key={i} />
      ))}
    </div>
  );
}

function Group40() {
  return (
    <div className="absolute contents left-[959px] top-6">
      <div className="absolute font-['CentraleSans:Book',_sans-serif] leading-[0] left-[959px] not-italic text-[#8c8c8c] text-[20px] text-left text-nowrap top-6">
        <p className="block leading-[28px] whitespace-pre">PV 0.35</p>
      </div>
    </div>
  );
}

function Group41() {
  return (
    <div className="absolute contents left-[959px] top-6">
      <Group40 />
    </div>
  );
}

function Group56() {
  return (
    <div className="absolute contents left-[959px] top-6">
      <Group41 />
    </div>
  );
}

export default function Tsm() {
  return (
    <div className="bg-[#000000] relative size-full" data-name="TSM">
      <ActionBarVerticalIgt />
      <Frame64 />
      <div
        className="absolute bg-center bg-cover bg-no-repeat inset-[22.22%_33.75%_22.22%_35%]"
        data-name="image 134"
        style={{ backgroundImage: `url('${imgImage134}')` }}
      />
      <Graticules />
      <Frame21 />
      <ChromaFlo />
      <Group56 />
    </div>
  );
}