import React, { useState, useEffect, useRef, useMemo } from 'react';
import svgPaths from '../imports/svg-fsqwxjwt5e';
import imgPositionTheCatheterV21 from "../assets/89d9cf297aa794e0a11032b0c78f842dc08ea98c.png";

interface LiveMainScreenProps {
  onStartRecording: () => void;
  isSyncPlaybackEnabled: boolean;
  onToggleSyncPlayback: () => void;
  liveIvusSrc: string;
}

function Icons() {
  return (
    <div className="absolute left-4 size-8 top-3" data-name="Icons">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="GuidanceInform">
          <path d={svgPaths.p204cd200} fill="#9DD3E3" id="path" />
        </g>
      </svg>
    </div>
  );
}

function Icons1() {
  return (
    <div className="absolute left-[678px] size-6 top-4" data-name="Icons">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="ChevronUp">
          <path d={svgPaths.p2e8fd500} fill="white" fillOpacity="0.8" id="path" />
        </g>
      </svg>
    </div>
  );
}

interface Frame4Props {
  isSyncPlaybackEnabled: boolean;
}

function Frame4({ isSyncPlaybackEnabled }: Frame4Props) {
  if (!isSyncPlaybackEnabled) {
    return null; // Hide tutorial when sync playback is disabled
  }
  
  return (
    <div className="absolute bg-[#212121] h-[720px] left-4 overflow-clip top-[87px] w-[720px]">
      <div className="absolute font-['CentraleSans',_sans-serif] font-bold leading-[0] left-16 not-italic text-[#9dd3e3] text-[24px] text-left text-nowrap top-3.5">
        <p className="block leading-[28px] whitespace-pre">Sync Playback guide</p>
      </div>
      <Icons />
      <Icons1 />
      <div className="absolute flex flex-col font-['CentraleSans',_sans-serif] font-bold justify-center leading-[0] left-[60px] not-italic text-[#d6d6d6] text-[24px] text-left top-[548px] translate-y-[-50%] w-[617px]">
        <p className="block leading-[28px]">Position the catheter</p>
      </div>
      <div className="absolute flex flex-col font-['CentraleSans',_sans-serif] font-bold justify-center leading-[0] left-[60px] not-italic opacity-80 text-[#d6d6d6] text-[0px] text-left top-[596px] translate-y-[-50%] w-[617px]">
        <p className="block font-['CentraleSans',_sans-serif] leading-[28px] text-[24px]">Press 'Record'</p>
      </div>
      <div className="absolute flex flex-col font-['CentraleSans',_sans-serif] font-bold justify-center leading-[0] left-[60px] not-italic opacity-80 text-[#d6d6d6] text-[0px] text-left top-[658px] translate-y-[-50%] w-[617px]">
        <p className="block font-['CentraleSans',_sans-serif] leading-[28px] text-[24px]">
          To include synchronized x-ray imaging, press the fluoro footpedal as needed during pullback
        </p>
      </div>
      <div className="absolute left-6 size-3 top-[589px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
          <circle cx="6" cy="6" fill="white" id="Ellipse 2" opacity="0.3" r="6" />
        </svg>
      </div>
      <div className="absolute left-6 size-3 top-[541px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" role="presentation" viewBox="0 0 12 12">
          <circle cx="6" cy="6" fill="#9DD3E3" id="Ellipse 1" r="6" />
        </svg>
      </div>
      <div className="absolute left-6 size-3 top-[652px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
          <circle cx="6" cy="6" fill="white" id="Ellipse 2" opacity="0.3" r="6" />
        </svg>
      </div>
      <div
        className="absolute bg-center bg-cover bg-no-repeat left-[145px] size-[430px] top-[74px]"
        data-name="position the catheter v2 1"
        style={{ backgroundImage: `url('${imgPositionTheCatheterV21}')` }}
      />
    </div>
  );
}

function NavigationBarIgt({ onScreenshotClick }: { onScreenshotClick?: () => void }) {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return { time: `${String(hours).padStart(2, '0')}:${minutes}`, ampm };
  };

  const { time, ampm } = formatTime(currentDateTime);

  return (
    <div className="absolute box-border content-stretch flex flex-col items-start justify-start left-0 p-0 top-0 w-[1920px]" data-name="🟢 Navigation bar (IGT)">
      <div className="box-border content-stretch flex flex-col items-center justify-start p-0 relative shadow-[0px_1px_6px_0px_rgba(0,0,0,0.2)] shrink-0 w-full" data-name="Template">
        <div className="box-border content-stretch flex flex-row gap-2.5 h-14 items-center justify-start p-0 relative shrink-0 w-full" data-name="Top row">
          <div className="basis-0 bg-[#383838] grow h-full min-h-px min-w-px shrink-0" data-name="Background" />
          
          <div className="absolute box-border content-stretch flex flex-row gap-12 h-12 items-center justify-start left-2 pl-2 pr-0 py-0 top-1/2 translate-y-[-50%]" data-name="Left">
            <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0" data-name="Left">
              <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-row gap-2 items-center justify-center p-[8px] relative rounded-sm shrink-0 w-10" data-name="Button">
                <div className="relative shrink-0 size-6" data-name="DLS_Home_24">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                    <g id="DLS_Home_24">
                      <path d={svgPaths.p2df20600} fill="#D6D6D6" id="path" />
                    </g>
                  </svg>
                </div>
              </div>
              
              <div className="box-border content-stretch flex flex-col h-[15px] items-center justify-start px-2 py-0 relative shrink-0" data-name="wordmark">
                <div className="h-[15px] relative shrink-0 w-[77px]" data-name="philips-wordmark-2">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77 15">
                    <g id="philips-wordmark-2">
                      <path d="M77 0H0V15H77V0Z" fill="#E8E8E8" id="pixelrounder" opacity="0" />
                      <path d={svgPaths.p25010500} fill="white" id="Shape" />
                    </g>
                  </svg>
                </div>
              </div>
              
              <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start px-2 py-0 relative shrink-0" data-name="solution name">
                <div className="font-['CentraleSans',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[20px] text-[rgba(255,255,255,0.8)] text-left text-nowrap">
                  <p className="block leading-[28px] whitespace-pre">IVUS</p>
                </div>
              </div>
            </div>
            
            <div className="box-border content-stretch flex flex-row gap-6 h-6 items-center justify-center p-0 relative shrink-0" data-name="Patient info">
              <div className="box-border content-stretch flex flex-row gap-3 items-center justify-start p-0 relative shrink-0" data-name="Patient">
                <div className="relative shrink-0 size-8" data-name="DLS_PatientAcquisition_24">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                    <g id="DLS_PatientAcquisition_24">
                      <path d={svgPaths.p4381100} fill="#41C9FE" id="path" />
                    </g>
                  </svg>
                </div>
                <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0" data-name="Text container">
                  <div className="font-['CentraleSans',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#41c9fe] text-[20px] text-left text-nowrap">
                    <p className="block leading-[28px] whitespace-pre">DOE, Jane</p>
                  </div>
                </div>
              </div>
              
              <div className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0" data-name="Info">
                <div className="box-border content-stretch flex flex-row font-['CentraleSans',_sans-serif] gap-2 items-start justify-start leading-[0] not-italic p-0 relative shrink-0 text-[20px] text-left text-nowrap" data-name="Label">
                  <div className="flex flex-col justify-center relative shrink-0 text-[rgba(214,214,214,0.65)]">
                    <p className="block leading-[28px] text-nowrap whitespace-pre">Patient ID</p>
                  </div>
                  <div className="flex flex-col justify-center relative shrink-0 text-[rgba(255,255,255,0.8)]">
                    <p className="block leading-[28px] text-nowrap whitespace-pre">234567</p>
                  </div>
                </div>
                
                <div className="box-border content-stretch flex flex-row font-['CentraleSans',_sans-serif] gap-2 items-start justify-start leading-[0] not-italic p-0 relative shrink-0 text-[20px] text-left text-nowrap" data-name="Label">
                  <div className="flex flex-col justify-center relative shrink-0 text-[#8c8c8c]">
                    <p className="block leading-[28px] text-nowrap whitespace-pre">DOB</p>
                  </div>
                  <div className="flex flex-col justify-center relative shrink-0 text-[rgba(255,255,255,0.8)]">
                    <p className="block leading-[28px] text-nowrap whitespace-pre">15-Jan-1991 (33 y)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute box-border content-stretch flex flex-row gap-2 h-12 items-center justify-end p-0 right-4 top-1/2 translate-y-[-50%]" data-name="Right">
            <div className="box-border content-stretch flex flex-row gap-3 h-12 items-center justify-end p-0 relative shrink-0" data-name="Right side">
              <div className="box-border content-stretch flex flex-row gap-5 items-center justify-end p-0 relative shrink-0" data-name="Date + Time + User">
                <div className="flex flex-col font-['CentraleSans',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#d6d6d6] text-[20px] text-left text-nowrap">
                  <p className="block leading-[28px] whitespace-pre">{formatDate(currentDateTime)}</p>
                </div>
                <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start leading-[0] not-italic p-0 relative shrink-0 text-[#d6d6d6] text-[20px]" data-name="Time">
                  <div className="flex flex-col font-['CentraleSans',_sans-serif] justify-center relative shrink-0 text-left text-nowrap">
                    <p className="block leading-[28px] whitespace-pre">{time}</p>
                  </div>
                  <div className="flex flex-col font-['CentraleSans',_sans-serif] justify-center relative shrink-0 text-center w-10">
                    <p className="block leading-[28px]">{ampm}</p>
                  </div>
                </div>
              </div>
              
              <div className="box-border content-stretch flex flex-row gap-1 items-center justify-end p-0 relative shrink-0" data-name="Icons">
                <div
                  className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-3 py-2 relative rounded-sm shrink-0 size-10 cursor-pointer hover:bg-[rgba(255,255,255,0.1)] transition-colors"
                  data-name="🟢 Button (IGT)"
                  onClick={onScreenshotClick}
                  title="Send screenshot to X-ray Ref"
                >
                  <div className="relative shrink-0 size-6" data-name="Icon">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                      <g id="Icon">
                        <path d={svgPaths.p32cbff80} fill="#D6D6D6" id="path" />
                      </g>
                    </svg>
                  </div>
                </div>
                
                <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-3 py-2 relative rounded-sm shrink-0 size-10" data-name="🟢 Button (IGT)">
                  <div className="relative shrink-0 size-6" data-name="Icon">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                      <g id="Icon">
                        <path d={svgPaths.p3a6c9900} fill="#D6D6D6" id="path" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface LiveIndicatorProps {
  left: number;
  top: number;
}

function LiveIndicator({ left, top }: LiveIndicatorProps) {
  return (
    <div className="absolute flex flex-col gap-1" style={{ left: `${left - 120}px`, top: `${top}px` }}>
      {/* LIVE text with green dot */}
      <div className="flex items-center gap-2">
        <div className="size-4">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <circle cx="8" cy="8" fill="#7FC242" r="8" />
          </svg>
        </div>
        <p className="font-['CentraleSans',_sans-serif] font-bold leading-[28px] text-[#7fc242] text-[20px]">
          LIVE
        </p>
      </div>
      {/* Catheter name */}
      <div className="pl-6">
        <p className="font-['CentraleSans',_sans-serif] leading-[28px] text-[rgba(255,255,255,0.8)] text-[20px] whitespace-nowrap">
          PV 0.35
        </p>
      </div>
    </div>
  );
}

interface IVUSDisplayProps {
  isSyncPlaybackEnabled: boolean;
  liveIvusSrc: string;
}

function IVUSDisplay({ isSyncPlaybackEnabled, liveIvusSrc }: IVUSDisplayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const ivusLeft = isSyncPlaybackEnabled ? 900 : 960 - 695 / 2; // Center when no tutorial
  const ivusTop = 87;

  return (
    <>
      <LiveIndicator left={ivusLeft} top={ivusTop} />
      <div className={`absolute h-[619px] w-[695px] transition-all`} style={{ left: `${ivusLeft}px`, top: `${ivusTop}px` }}>
        {/* Live IVUS Video */}
        <div className="relative w-full h-full">
          <video
            key={liveIvusSrc}
            ref={videoRef}
            className="w-full h-full object-cover rounded-full"
            src={liveIvusSrc}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </div>
    </>
  );
}

function SideBar() {
  return (
    <div className="absolute h-[304px] left-[1436px] top-[72px] w-[468px]" data-name="Side Bar">
      <div className="absolute bottom-0 box-border content-stretch flex flex-col gap-4 items-start justify-start left-[81.2%] p-0 right-0 top-0">
        <div className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 relative rounded shrink-0 w-[88px]">
          <div className="relative shrink-0 size-8">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
              <path d={svgPaths.p30e8f500} fill="#E8E8E8" />
            </svg>
          </div>
          <div className="font-['CentraleSans',_sans-serif] leading-[0] min-w-full not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#e8e8e8] text-[14px] text-center text-nowrap">
            <p className="block leading-[20px] overflow-inherit">60</p>
          </div>
        </div>
        
        <div className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 relative rounded shrink-0 w-[88px]">
          <div className="relative shrink-0 size-8">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
              <path d={svgPaths.p17c13900} fill="#E8E8E8" />
              <path d={svgPaths.p23655800} fill="#ADADAD" />
            </svg>
          </div>
          <div className="font-['CentraleSans',_sans-serif] leading-[0] min-w-full not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#e8e8e8] text-[14px] text-center text-nowrap">
            <p className="block leading-[20px] overflow-inherit">2mm</p>
          </div>
        </div>
        
        <div className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 relative rounded shrink-0 w-[88px]">
          <div className="relative shrink-0 size-8">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
              <path d={svgPaths.p3907b300} fill="#E8E8E8" />
            </svg>
          </div>
          <div className="font-['CentraleSans',_sans-serif] leading-[0] min-w-full not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#e8e8e8] text-[14px] text-center text-nowrap">
            <p className="block leading-[20px] overflow-inherit">Adaptive</p>
          </div>
        </div>
        
        <div className="bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 relative rounded shrink-0 w-[88px]">
          <div className="relative shrink-0 size-8">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
              <path d={svgPaths.p642e380} fill="#E8E8E8" opacity="0.5" />
              <path d={svgPaths.p1b2b1700} fill="#E8E8E8" />
            </svg>
          </div>
          <div className="font-['CentraleSans',_sans-serif] leading-[0] min-w-full not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#e8e8e8] text-[14px] text-center text-nowrap">
            <p className="block leading-[20px] overflow-inherit">Revolve</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChromaFlo() {
  return (
    <div className="absolute h-16 left-[1816px] top-[944px] w-[88px]" data-name="ChromaFlo">
      <div className="absolute bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-col gap-0.5 inset-0 items-center justify-center pb-1 pt-1.5 px-1 rounded-sm">
        <div className="relative shrink-0 size-8">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <rect fill="#E8E8E8" height="32" width="32" />
            <path d={svgPaths.p3dc7b500} fill="white" fillOpacity="0.8" />
          </svg>
        </div>
        <div className="font-['CentraleSans',_sans-serif] leading-[0] min-w-full not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#d6d6d6] text-[14px] text-center text-nowrap">
          <p className="block leading-[20px] overflow-inherit">ChromaFlo</p>
        </div>
      </div>
      <div className="absolute inset-[9.38%_6.82%_78.13%_84.09%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <circle cx="4" cy="4" fill="#595959" fillOpacity="0.55" r="4" />
        </svg>
      </div>
    </div>
  );
}

interface ToggleSwitchProps {
  isEnabled: boolean;
}

function ToggleSwitch({ isEnabled }: ToggleSwitchProps) {
  return (
    <div className="box-border content-stretch flex flex-row items-center justify-start p-0 relative shrink-0">
      <div className={`h-4 rounded-[100px] shrink-0 w-10 transition-colors ${isEnabled ? 'bg-[#45de85]' : 'bg-[#595959]'}`} data-name="track" />
      <div className={`absolute bg-[#e8e8e8] rounded-[100px] size-6 top-1/2 translate-y-[-50%] transition-all ${isEnabled ? 'right-[-4px]' : 'left-[-4px]'}`} data-name="thumb">
        <div className="absolute border border-[#8c8c8c] border-solid inset-0 pointer-events-none rounded-[100px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.45)]" />
      </div>
    </div>
  );
}

export function LiveMainScreen({ onStartRecording, isSyncPlaybackEnabled, onToggleSyncPlayback, liveIvusSrc }: LiveMainScreenProps) {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return { time: `${String(hours).padStart(2, '0')}:${minutes}`, ampm };
  };

  const { time, ampm } = formatTime(currentDateTime);

  return (
    <div className="bg-[#000000] relative w-[1920px] h-[1080px]" data-name="Live Main Screen">
      <NavigationBarIgt onScreenshotClick={() => window.parent.postMessage({ type: "intrasight-screenshot", time: 0 }, "*")} />
      <Frame4 isSyncPlaybackEnabled={isSyncPlaybackEnabled} />
      <IVUSDisplay isSyncPlaybackEnabled={isSyncPlaybackEnabled} liveIvusSrc={liveIvusSrc} />
      <SideBar />
      <ChromaFlo />

      {/* Action Buttons - positions match the Figma "Boom" (Live) frame exactly */}
      <button className="absolute left-4 top-[1024px] bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-row gap-2 items-center justify-center px-4 py-2 rounded-sm w-[214px]">
        <div className="relative shrink-0 size-6">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <path d={svgPaths.p28d83c80} fill="#E8E8E8" />
          </svg>
        </div>
        <div className="font-['CentraleSans',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-left text-nowrap">
          <p className="block leading-[22px] whitespace-pre">Save Frame</p>
        </div>
      </button>

      <button className="absolute left-[1000px] top-[1024px] bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-row gap-2 items-center justify-center px-4 py-2 rounded-sm w-[214px]">
        <div className="relative shrink-0 size-6">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <path d={svgPaths.pc15d00} fill="#E8E8E8" />
          </svg>
        </div>
        <div className="font-['CentraleSans',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-left text-nowrap">
          <p className="block leading-[22px] whitespace-pre">Freeze</p>
        </div>
      </button>

      <button className="absolute left-[1230px] top-[1024px] bg-[#1474a4] box-border content-stretch flex flex-row gap-2 items-center justify-center px-4 py-2 rounded-sm w-[214px]">
        <div className="relative shrink-0 size-6">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <path d={svgPaths.p315022f0} fill="white" />
          </svg>
        </div>
        <div className="font-['CentraleSans',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap">
          <p className="block leading-[22px] whitespace-pre">Ringdown</p>
        </div>
      </button>

      <button
        onClick={onStartRecording}
        className="absolute left-[1460px] top-[1024px] bg-[#1474a4] box-border content-stretch flex flex-row gap-2 items-center justify-center px-4 py-2 rounded-sm w-[214px] hover:bg-[#1a85b5] transition-colors cursor-pointer"
      >
        <div className="relative shrink-0 size-6">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <path d={svgPaths.p275e1550} fill="white" />
          </svg>
        </div>
        <div className="font-['CentraleSans',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap">
          <p className="block leading-[22px] whitespace-pre">Record</p>
        </div>
      </button>

      <button
        onClick={onToggleSyncPlayback}
        className="absolute left-[1690px] top-[1024px] bg-[rgba(89,89,89,0.55)] box-border content-stretch flex flex-row gap-3 items-center justify-center pl-4 pr-3 py-2 rounded-sm w-[214px] cursor-pointer"
      >
        <ToggleSwitch isEnabled={isSyncPlaybackEnabled} />
        <div className="font-['CentraleSans',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-left text-nowrap">
          <p className="block leading-[22px] whitespace-pre">Sync Playback</p>
        </div>
      </button>
    </div>
  );
}