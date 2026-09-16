import svgPaths from "./svg-vfrudit9n5";
import imgImage121 from "figma:asset/a88a842f3a8fb7070c090488a99c78d4f568d185.png";

function DlsFrameFirst48() {
  return (
    <div className="absolute left-1/2 size-6 translate-x-[-50%] translate-y-[-50%]" data-name="DLS_FrameFirst_48" style={{ top: "calc(50% - 0.087px)" }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="DLS_FrameFirst_48">
          <path d={svgPaths.p37816600} fill="var(--fill-0, white)" fillOpacity="0.8" id="path" />
        </g>
      </svg>
    </div>
  );
}

function PrevFrame() {
  return (
    <div className="absolute bg-[#212121] bottom-[3.23%] left-0 overflow-clip top-[2.82%] w-[70px]" data-name="Prev Frame">
      <DlsFrameFirst48 />
    </div>
  );
}

function DlsFrameLast48() {
  return (
    <div className="absolute left-1/2 size-6 translate-x-[-50%] translate-y-[-50%]" data-name="DLS_FrameLast_48" style={{ top: "calc(50% - 0.087px)" }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="DLS_FrameFirst_48">
          <path d={svgPaths.p37816600} fill="var(--fill-0, white)" fillOpacity="0.8" id="path" />
        </g>
      </svg>
    </div>
  );
}

function NextFrame() {
  return (
    <div className="absolute bg-[#212121] bottom-[3.23%] overflow-clip right-0 top-[2.82%] w-[70px]" data-name="Next Frame">
      <DlsFrameLast48 />
    </div>
  );
}

function MarkerNoReg() {
  return <div className="absolute bottom-1 h-[35px] left-[6.02%] right-[5.83%]" data-name="Marker/NoReg" />;
}

function Ild() {
  return (
    <div className="absolute h-[179px] left-0 top-0 w-[1540px]" data-name="ILD">
      <div className="absolute bg-[#212121] inset-0" />
      <div className="absolute bg-[#050505] bottom-[3.23%] left-0 right-[0.46%] top-[3.23%]" />
      <div className="absolute bg-[48.32%_30.76%] bg-no-repeat bg-size-[101.64%_105.31%] inset-[3.23%_70px]" data-name="image 121" style={{ backgroundImage: `url('${imgImage121}')` }} />
      <PrevFrame />
      <NextFrame />
      <MarkerNoReg />
    </div>
  );
}

function Scrubber() {
  return (
    <div className="absolute cursor-pointer h-[167px] left-[51px] top-1.5 w-10" data-name="Scrubber">
      <div className="absolute bottom-0 left-[-10%] right-[-10%] top-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 167">
          <g id="Scrubber">
            <path d="M25 167H23V0H25V167Z" fill="var(--fill-0, #FFDD19)" id="Union" />
            <g filter="url(#filter0_d_2004_9415)" id="Ellipse 5">
              <circle cx="24" cy="84" fill="var(--fill-0, #A28E18)" r="20" />
            </g>
            <circle cx="24" cy="84" fill="var(--fill-0, #FFDD19)" id="Ellipse 6" r="18" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="48" id="filter0_d_2004_9415" width="48" x="0" y="62">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="2" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_2004_9415" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_2004_9415" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export default function Frame99() {
  return (
    <div className="relative size-full">
      <Ild />
      <Scrubber />
    </div>
  );
}