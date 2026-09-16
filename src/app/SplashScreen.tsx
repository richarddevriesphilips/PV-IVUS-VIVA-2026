import { useNavigate } from "react-router";

interface VersionOption {
  id: string;
  path: string;
  title: string;
  description: string;
  available: boolean;
}

const VERSIONS: VersionOption[] = [
  {
    id: "near-future",
    path: "/near-future",
    title: "Near Future",
    description: "The current FlexVision workflow prototype.",
    available: true,
  },
  {
    id: "distant-future",
    path: "/distant-future",
    title: "Distant Future",
    description: "An early placeholder, based on the near future version.",
    available: true,
  },
];

export default function SplashScreen() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-black flex flex-col items-center justify-center gap-[48px] text-white">
      <div className="flex flex-col items-center gap-[12px]">
        <p className="font-['CentraleSans:Medium',sans-serif] text-[20px] text-white/80">Azurion</p>
        <h1 className="font-['CentraleSans:Book',sans-serif] text-[40px]">IVUS Flexvision</h1>
        <p className="font-['CentraleSans:Book',sans-serif] text-[20px] text-white/60">Choose a version to launch</p>
      </div>

      <div className="flex gap-[32px]">
        {VERSIONS.map((version) => (
          <button
            key={version.id}
            type="button"
            onClick={() => navigate(version.path)}
            className="w-[360px] flex flex-col items-start gap-[8px] rounded-[4px] border border-[#3b3b3b] bg-[#171717] px-[24px] py-[20px] text-left transition-colors hover:border-[#41c9fe] hover:bg-[#1f1f1f]"
          >
            <span className="font-['CentraleSans:Medium',sans-serif] text-[24px] text-[#41c9fe]">
              {version.title}
            </span>
            <span className="font-['CentraleSans:Book',sans-serif] text-[16px] text-white/60">
              {version.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
