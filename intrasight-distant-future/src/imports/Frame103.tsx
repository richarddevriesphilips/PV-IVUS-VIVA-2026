import imgImage121 from "figma:asset/a88a842f3a8fb7070c090488a99c78d4f568d185.png";

function Frame40() {
  return (
    <div className="absolute bottom-[2.13%] left-1 overflow-clip right-0.5 top-[2.13%]">
      <div
        className="absolute bg-center bg-cover bg-no-repeat bottom-0 left-0 right-[-1.69%] top-0"
        data-name="image 121"
        style={{ backgroundImage: `url('${imgImage121}')` }}
      />
      <div className="absolute bg-[#0e0e0e] bottom-0 left-0 right-[-40.71%] top-0" />
    </div>
  );
}

function Ild() {
  return (
    <div className="absolute h-[124px] left-0 top-0 w-[1428px]" data-name="ILD">
      <div className="absolute bg-[#212121] inset-0" />
      <Frame40 />
    </div>
  );
}

function LightRecordingIndicator() {
  return (
    <div className="absolute left-3 size-4 top-3" data-name="Light Recording indicator">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Light Recording indicator">
          <circle cx="8" cy="8" fill="var(--fill-0, white)" id="Ellipse 38" r="8" />
        </g>
      </svg>
    </div>
  );
}

function LightRecordingTimer() {
  return (
    <div className="absolute h-[22px] left-[39px] top-[7px] w-[58px]" data-name="Light recording timer">
      <div className="absolute bottom-[-27.27%] font-['CentraleSans:Book',_sans-serif] leading-[0] left-0 not-italic right-[-19.36%] text-[#e8e8e8] text-[20px] text-left top-0">
        <p className="block leading-[28px]">0:00</p>
      </div>
    </div>
  );
}

function RecordingPill() {
  return (
    <div
      className="absolute bg-[rgba(194,35,31,0.7)] h-10 left-3.5 rounded-[20px] top-[61px] w-[97px]"
      data-name="Recording Pill"
    >
      <LightRecordingIndicator />
      <LightRecordingTimer />
    </div>
  );
}

export default function Frame103() {
  return (
    <div className="relative size-full">
      <Ild />
      <RecordingPill />
    </div>
  );
}