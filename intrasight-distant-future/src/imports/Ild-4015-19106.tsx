import imgImage121 from "figma:asset/a88a842f3a8fb7070c090488a99c78d4f568d185.png";

function Frame40() {
  return (
    <div className="absolute bottom-[2.24%] left-0 overflow-clip right-0 top-[2.02%]">
      <div
        className="absolute bg-center bg-cover bg-no-repeat inset-[1.26%_-0.51%_1.03%_0.74%]"
        data-name="image 121"
        style={{ backgroundImage: `url('${imgImage121}')` }}
      />
      <div className="absolute bg-[#0e0e0e] inset-[1.67%_-140%_1.67%_99.63%]" />
    </div>
  );
}

export default function Ild() {
  return (
    <div className="relative size-full" data-name="ILD">
      <div className="absolute bg-[#212121] inset-0" />
      <div className="absolute bg-[#050505] inset-[3.72%_0.65%]" />
      <Frame40 />
      <div className="absolute bottom-0 flex items-center justify-center left-[1068px] top-0 w-0">
        <div className="flex-none h-px rotate-[90deg] w-[248px]">
          <div className="relative size-full">
            <div
              className="absolute bottom-0 left-0 right-0 top-[-8px]"
              style={{ "--stroke-0": "rgba(33, 33, 33, 1)" } as React.CSSProperties}
            >
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                role="presentation"
                viewBox="0 0 248 8"
              >
                <line id="Line 220" stroke="var(--stroke-0, #212121)" strokeWidth="8" x2="248" y1="4" y2="4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}