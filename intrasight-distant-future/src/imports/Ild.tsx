import svgPaths from "./svg-buannyhgf";
import imgVector from "figma:asset/9b39ab5937c11e027fe76e41cd618cdbe78210a0.png";
import imgVector1 from "figma:asset/7f10d6534b9c55094469694608d4e321e0d357ca.png";
import imgVector2 from "figma:asset/1011f89c554c3fce9aa82ca825033fcb58117620.png";
import imgVector3 from "figma:asset/c118d0171898b14313024acbd55278d8683d45f9.png";

function Clippath1() {
  return (
    <div
      className="absolute bottom-[67.665%] contents left-0 right-0 top-[4.79%]"
      data-name="clippath-1"
    >
      <div
        className="absolute bottom-[67.665%] left-0 right-0 top-[4.79%]"
        data-name="Vector"
      >
        <img
          className="block max-w-none size-full"
          height="45.999996185302734"
          src={imgVector}
          width="1403"
        />
      </div>
    </div>
  );
}

function Group() {
  return (
    <div
      className="absolute bottom-[69.012%] contents left-[0.001%] right-[-0.136%] top-[4.192%]"
      data-name="Group"
    >
      <div
        className="absolute bottom-[69.012%] left-[0.001%] right-[-0.136%] top-[4.192%]"
        data-name="Vector"
      >
        <img
          className="block max-w-none size-full"
          height="44.75"
          src={imgVector1}
          width="1404.893310546875"
        />
      </div>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div
      className="absolute bottom-[67.665%] contents left-0 right-0 top-[4.79%]"
      data-name="Clip path group"
    >
      <Clippath1 />
      <Group />
    </div>
  );
}

function Group1() {
  return (
    <div
      className="absolute bottom-[67.665%] contents left-0 right-0 top-[4.79%]"
      data-name="Group"
    >
      <ClipPathGroup />
    </div>
  );
}

function ClipPathGroup1() {
  return (
    <div
      className="absolute bottom-[67.665%] contents left-0 right-0 top-[4.79%]"
      data-name="Clip path group"
    >
      <Group1 />
    </div>
  );
}

function Group2() {
  return (
    <div
      className="absolute bottom-[89.222%] left-[87.135%] right-0 top-[5.389%]"
      data-name="Group"
    >
      <div className="absolute bottom-[-11.111%] left-[-0.025%] right-[-0.372%] top-[-8.239%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 183 11"
        >
          <g id="Group">
            <path
              d={svgPaths.p360fd480}
              id="Vector"
              stroke="var(--stroke-0, #23CC72)"
              strokeMiterlimit="10"
              strokeWidth="2"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

function ClipPathGroup2() {
  return (
    <div
      className="absolute bottom-[89.222%] contents left-[87.135%] right-0 top-[5.389%]"
      data-name="Clip path group"
    >
      <Group2 />
    </div>
  );
}

function Clippath2() {
  return (
    <div
      className="absolute bottom-[16.467%] contents left-[0.001%] right-[-0.214%] top-[59.787%]"
      data-name="clippath-1"
    >
      <div className="absolute bottom-[16.467%] flex items-center justify-center left-[0.001%] right-[-0.214%] top-[59.787%]">
        <div className="flex-none h-[39.656px] scale-y-[-100%] w-[1405.99px]">
          <div className="relative size-full" data-name="Vector">
            <img
              className="block max-w-none size-full"
              height="39.65568923950195"
              src={imgVector2}
              width="1405.9915771484375"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Group3() {
  return (
    <div
      className="absolute bottom-[14.97%] contents left-0 right-[-0.111%] top-[58.683%]"
      data-name="Group"
    >
      <div className="absolute bottom-[14.97%] flex items-center justify-center left-0 right-[-0.111%] top-[58.683%]">
        <div className="flex-none h-11 scale-y-[-100%] w-[1404.55px]">
          <div className="relative size-full" data-name="Vector">
            <img
              className="block max-w-none size-full"
              height="44"
              src={imgVector3}
              width="1404.5511474609375"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup3() {
  return (
    <div
      className="absolute bottom-[16.467%] contents left-[0.001%] right-[-0.214%] top-[59.787%]"
      data-name="Clip path group"
    >
      <Clippath2 />
      <Group3 />
    </div>
  );
}

function Group4() {
  return (
    <div
      className="absolute bottom-[16.467%] contents left-[0.001%] right-[-0.214%] top-[59.787%]"
      data-name="Group"
    >
      <ClipPathGroup3 />
    </div>
  );
}

function ClipPathGroup4() {
  return (
    <div
      className="absolute bottom-[16.467%] contents left-[0.001%] right-[-0.214%] top-[59.787%]"
      data-name="Clip path group"
    >
      <Group4 />
    </div>
  );
}

function CoRegistrationLine() {
  return (
    <div
      className="absolute h-[174px] left-[1.426%] right-[1.528%] top-[19px]"
      data-name="Co-registration Line"
    />
  );
}

export default function Ild() {
  return (
    <div className="relative size-full" data-name="ILD">
      <div className="absolute inset-0">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 1403 167"
        >
          <path
            d="M0 0H1403V167H0V0Z"
            fill="var(--fill-0, #171717)"
            id="Rectangle 144"
          />
        </svg>
      </div>
      <ClipPathGroup1 />
      <ClipPathGroup2 />
      <div
        className="absolute bottom-[79.042%] left-0 right-[15.182%] top-[7.186%]"
        data-name="Vector"
      >
        <div className="absolute bottom-[-4.348%] left-0 right-0 top-[-4.348%]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 1190 25"
          >
            <path
              d={svgPaths.p16a31d00}
              id="Vector"
              stroke="var(--stroke-0, #23CC72)"
              strokeMiterlimit="10"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
      <div className="absolute h-[31px] left-0 right-[-0.214%] top-[23px]">
        <div className="absolute bottom-[-3.227%] left-[-0.041%] right-0 top-[-3.227%]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 1407 33"
          >
            <path
              d={svgPaths.p33173e00}
              id="Vector 20"
              stroke="var(--stroke-0, #41C9FE)"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
      <ClipPathGroup4 />
      <div className="absolute bottom-[15.569%] flex items-center justify-center left-0 right-[-0.214%] top-[70.06%]">
        <div className="flex-none h-6 scale-y-[-100%] w-[1406px]">
          <div className="relative size-full" data-name="Vector">
            <div className="absolute bottom-[-4.167%] left-0 right-[-0.045%] top-[-3.243%]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 1407 26"
              >
                <path
                  d={svgPaths.p108e7200}
                  id="Vector"
                  stroke="var(--stroke-0, #23CC72)"
                  strokeMiterlimit="10"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[31px] items-center justify-center left-0 right-0 top-[97px]">
        <div className="flex-none h-[31px] scale-y-[-100%] w-[1403px]">
          <div className="relative size-full">
            <div className="absolute bottom-[-3.228%] left-[-0.046%] right-0 top-[-3.227%]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 1404 33"
              >
                <path
                  d={svgPaths.p207768c0}
                  id="Vector 21"
                  stroke="var(--stroke-0, #41C9FE)"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[12.496px] items-center justify-center right-[205.761px] top-0 w-[13.682px]">
        <div className="flex-none rotate-[218.66deg]">
          <div className="h-[5.518px] relative w-[13.113px]">
            <div className="absolute bottom-[-16.706%] left-[-2.958%] right-[-2.958%] top-[-16.706%]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 15 8"
              >
                <path
                  d="M1 1L14.1129 6.51751"
                  id="Line 218"
                  stroke="var(--stroke-0, #23CC72)"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[64.379%] right-[163px] top-[1.796%] w-[47px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 47 57"
        >
          <path
            d={svgPaths.p12da6a00}
            fill="var(--fill-0, #171717)"
            id="Vector 3"
          />
        </svg>
      </div>
      <div className="absolute flex h-[13.246px] items-center justify-center right-[163.332px] top-0 w-[14.184px]">
        <div className="flex-none rotate-[220.601deg]">
          <div className="h-[5.42px] relative w-[14.051px]">
            <div className="absolute bottom-[-17.215%] left-[-2.561%] right-[-2.561%] top-[-17.215%]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 16 8"
              >
                <path
                  d="M1 1L15.051 6.4198"
                  id="Line 219"
                  stroke="var(--stroke-0, #23CC72)"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <CoRegistrationLine />
    </div>
  );
}