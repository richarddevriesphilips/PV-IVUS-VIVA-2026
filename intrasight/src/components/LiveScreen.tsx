import React, { useRef, useEffect, useCallback, useState } from 'react';
import NavigationBarIgt from '../imports/NavigationBarIgt';
// Use public assets for Electron app compatibility
const ivusVideo = '/intrasight/assets/videos/IVUS recording-export.mp4';

interface LiveScreenProps {
  onStartRecording: () => void;
}

export default function LiveScreen({ onStartRecording }: LiveScreenProps) {
  const ivusVideoRef = useRef<HTMLVideoElement>(null);
  const [tutorialStep, setTutorialStep] = useState(0); // 0 = Position catheter, 1 = Press Record, 2 = X-ray imaging

  useEffect(() => {
    // Auto-play the live IVUS feed
    const video = ivusVideoRef.current;
    if (video) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn('Video autoplay failed:', error);
        });
      }
    }

    // Tutorial sequence: 0->1->2->0 (loop every 15 seconds)
    const startTutorialLoop = () => {
      const timer1 = setTimeout(() => setTutorialStep(1), 5000);   // Step 1 at 5s
      const timer2 = setTimeout(() => setTutorialStep(2), 10000);  // Step 2 at 10s
      const timer3 = setTimeout(() => {
        setTutorialStep(0);
        startTutorialLoop(); // Restart the loop
      }, 15000); // Reset to step 0 at 15s and loop
      
      return [timer1, timer2, timer3];
    };

    const timers = startTutorialLoop();

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  const handleStartRecording = useCallback(() => {
    onStartRecording();
  }, [onStartRecording]);

  return (
    <div className="bg-black relative w-[1920px] h-[1080px] overflow-hidden">
      {/* Top Navigation Bar */}
      <div className="absolute top-0 left-0 w-full h-14 z-100">
        <NavigationBarIgt />
      </div>

      {/* Main Content Area */}
      <div className="absolute flex gap-6 h-[825px] items-start justify-center left-4 top-[87px] w-[1784px]">
        
        {/* Left Panel - Tutorial/Guide */}
        <div className="h-[774px] overflow-clip w-[843px]">
          <div className="bg-[#212121] h-[774px] w-[720px] overflow-clip relative">
            {/* Guide Header */}
            <div className="absolute left-16 top-3.5 font-['CentraleSans:Bold',_sans-serif] text-[#9dd3e3] text-[24px] leading-[28px]">
              Sync Playback guide
            </div>
            
            {/* Info Icon */}
            <div className="absolute left-4 top-3 size-8">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                <path d="M30.6667 4V28H1.33333V4H30.6667ZM18.6667 12H13.3333V14.6667H14.6667V24H18.6667V12ZM16.6667 6.66667C15.5627 6.66667 14.6667 7.56267 14.6667 8.66667C14.6667 9.77067 15.5627 10.6667 16.6667 10.6667C17.7707 10.6667 18.6667 9.77067 18.6667 8.66667C18.6667 7.56267 17.7707 6.66667 16.6667 6.66667Z" fill="#9DD3E3" />
              </svg>
            </div>

            {/* Collapse Icon */}
            <div className="absolute left-[678px] top-4 size-6">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                <path d="M1 21.5L2.5 23L12 13.5L21.5 23L23 21.5L12 10.5L1 21.5ZM12 4L21.5 13.5L23 12L12 1L1 12L2.5 13.5L12 4Z" fill="white" fillOpacity="0.8" />
              </svg>
            </div>

            {/* Tutorial Image */}
            <div className="absolute bg-center bg-cover bg-no-repeat left-[145px] size-[430px] top-[74px]" 
                 style={{ backgroundImage: tutorialStep === 2 ? "url('/intrasight/assets/89d9cf297aa794e0a11032b0c78f842dc08ea98c.png')" : "url('/intrasight/assets/9d8f3891b768a6016190129e5dcb06288d204aa9.png')" }} />

            {/* Tutorial Steps */}
            <div className="absolute left-[60px] top-[548px] w-[617px] pb-4">
              <div className={`flex items-center gap-3 mb-6 ${tutorialStep !== 0 ? 'opacity-80' : ''}`}>
                <div className={`size-3 rounded-full ${tutorialStep === 0 ? 'bg-[#9DD3E3]' : 'bg-white opacity-30'}`} />
                <div className={`text-[#d6d6d6] text-[24px] leading-[28px] ${tutorialStep === 0 ? "font-['CentraleSans:Bold',_sans-serif]" : "font-['CentraleSans:Book',_sans-serif]"}`}>
                  Position the catheter
                </div>
              </div>
              
              <div className={`flex items-center gap-3 mb-6 ${tutorialStep !== 1 ? 'opacity-80' : ''}`}>
                <div className={`size-3 rounded-full ${tutorialStep === 1 ? 'bg-[#9DD3E3]' : 'bg-white opacity-30'}`} />
                <div className={`text-[#d6d6d6] text-[24px] leading-[28px] ${tutorialStep === 1 ? "font-['CentraleSans:Bold',_sans-serif]" : "font-['CentraleSans:Book',_sans-serif]"}`}>
                  Press 'Record'
                </div>
              </div>
              
              <div className={`flex items-center gap-3 ${tutorialStep !== 2 ? 'opacity-80' : ''}`}>
                <div className={`size-3 rounded-full ${tutorialStep === 2 ? 'bg-[#9DD3E3]' : 'bg-white opacity-30'}`} />
                <div className={`text-[#d6d6d6] text-[24px] leading-[28px] ${tutorialStep === 2 ? "font-['CentraleSans:Bold',_sans-serif]" : "font-['CentraleSans:Book',_sans-serif]"}`}>
                  To include synchronized x-ray imaging, press the fluoro footpedal as needed during pullback
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - IVUS Live Feed */}
        <div className="h-full w-[917px] relative">
          {/* Live Indicator */}
          <div className="absolute left-6 top-[-12px] z-20">
            <div className="flex items-center gap-2">
              <div className="size-4 rounded-full bg-[#7FC242]" />
              <div className="font-['CentraleSans:Bold',_sans-serif] text-[#7FC242] text-[20px] leading-[28px]">
                LIVE
              </div>
            </div>
            <div className="font-['CentraleSans:Book',_sans-serif] text-[rgba(255,255,255,0.8)] text-[20px] leading-[28px] ml-6">
              Visions PV .035
            </div>
          </div>

          {/* IVUS Video Display */}
          <div className="absolute left-[159.88px] size-[664.617px] top-[36.82px]">
            <video
              ref={ivusVideoRef}
              className="w-full h-full object-cover rounded-full"
              muted
              loop
              playsInline
              style={{
                backgroundColor: '#000000',
              }}
            >
              <source 
                src={ivusVideo} 
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>

           
          </div>
        </div>
      </div>

      {/* Right Sidebar Controls */}
      <div className="absolute h-[304px] left-[1436px] top-[72px] w-[468px]">
        {/* Toolbar Buttons */}
        <div className="absolute bottom-0 right-0 top-0 left-[81.2%] flex flex-col" style={{ gap: '2px' }}>
          {/* Gain/Brightness Control */}
          <div className="bg-[rgba(89,89,89,0.55)] flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 rounded-[4px] w-[88px]" style={{ height: '64px' }}>
            <div className="size-8">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44 44">
                <path d="M22 8C14.3 8 8 14.3 8 22C8 29.7 14.3 36 22 36C29.7 36 36 29.7 36 22C36 14.3 29.7 8 22 8ZM22 32V12C27.5 12 32 16.5 32 22C32 27.5 27.5 32 22 32ZM24 6H20V0H24V6ZM9.3 12.1L5 7.9L7.8 5L12 9.2L9.3 12.1ZM6 24H0V20H6V24ZM9.3 31.9L12.1 34.7L7.9 39L5 36.2L9.3 31.9ZM20 38H24V44H20V38ZM34.7 31.9L38.9 36.1L36.1 39L31.9 34.8L34.7 31.9ZM44 20V24H38V20H44ZM34.7 12.1L31.9 9.3L36.1 5L39 7.8L34.7 12.1Z" fill="#E8E8E8" />
              </svg>
            </div>
            <div className="font-['CentraleSans:Book',_sans-serif] text-[#e8e8e8] text-[14px] text-center leading-[20px]">
              60
            </div>
          </div>

          {/* Field of View */}
          <div className="bg-[rgba(89,89,89,0.55)] flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 rounded-[4px] w-[88px]" style={{ height: '64px' }}>
            <div className="size-8">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                <path d="M30.902 15.6952L22.8776 19.4286V16.5711H19.2428C18.7707 17.9028 17.4978 18.8572 16.0006 18.8573C14.5034 18.8573 13.2305 17.9028 12.7584 16.5711H9.12267V19.4286L1.09924 15.6952L9.12267 11.4286V14.286H12.7584C13.2305 12.9544 14.5034 11.9999 16.0006 11.9999C17.4978 11.9999 18.7707 12.9544 19.2428 14.286H22.8776V11.4286L30.902 15.6952Z" fill="#E8E8E8" />
                <path d="M32 17.2402C31.3651 25.4972 24.4442 32 16 32C7.55579 32 0.634889 25.4972 0 17.2402L5.12988 19.627C6.65085 24.1604 10.9413 27.4287 16 27.4287C21.0585 27.4287 25.3481 24.1602 26.8691 19.627L32 17.2402ZM16 0C24.2023 0 30.9659 6.13569 31.9287 14.0547L26.3516 11.0889C24.5091 7.23517 20.5671 4.57129 16 4.57129C11.4328 4.57129 7.48987 7.23496 5.64746 11.0889L0.0703125 14.0547C1.03303 6.13563 7.79768 6.18488e-06 16 0Z" fill="#ADADAD" />
              </svg>
            </div>
            <div className="font-['CentraleSans:Book',_sans-serif] text-[#e8e8e8] text-[14px] text-center leading-[20px]">
              2mm
            </div>
          </div>

          {/* Ringdown */}
          <div className="bg-[rgba(89,89,89,0.55)] flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 rounded-[4px] w-[88px]" style={{ height: '64px' }}>
            <div className="size-8">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                <path d="M30.6667 16.0533C30.6667 23.5533 25.04 29.7333 17.78 30.6067L17.76 26.5067C18.6733 26.3467 19.5533 26.0867 20.3733 25.7067L16 18.1533L11.6267 25.7067C12.4133 26.0733 13.26 26.3267 14.14 26.4867L14.16 30.5933C6.92667 29.6933 1.33333 23.5333 1.33333 16.0533C1.33333 14.1133 1.71333 12.2667 2.39333 10.5733L6.22 12.7333C5.92 13.5533 5.71333 14.42 5.63333 15.3267L5.62667 15.3933L14.38 15.36L12.6067 12.3133L9.98 7.78C9.24667 8.3 8.6 8.91333 8.02667 9.6L4.14667 7.41333C6.81333 3.76 11.1267 1.38667 15.9933 1.38667C20.8667 1.38667 25.1867 3.76667 27.8533 7.42667L24.0267 9.68C23.4333 8.96 22.76 8.31333 22 7.77333L17.6333 15.32L17.5867 15.3867H26.42C26.34 14.52 26.1333 13.66 25.8267 12.82L29.6133 10.6C30.2933 12.2867 30.6667 14.1267 30.6667 16.0533Z" fill="#E8E8E8" />
              </svg>
            </div>
            <div className="font-['CentraleSans:Book',_sans-serif] text-[#e8e8e8] text-[14px] text-center leading-[20px]">
              Adaptive
            </div>
          </div>

          {/* Revolve */}
          <div className="bg-[rgba(89,89,89,0.55)] flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 rounded-[4px] w-[88px]" style={{ height: '64px' }}>
            <div className="size-8">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                <path d="M3.49 22.26C2.55 20.38 2 18.25 2 16C2 8.27 8.27 2 16 2C18.25 2 20.38 2.55 22.26 3.49L19.21 6.54C18.21 6.2 17.13 6 16 6C10.49 6 6 10.49 6 16C6 17.13 6.2 18.21 6.54 19.22L3.49 22.26ZM25.46 12.78C25.8 13.79 26 14.87 26 16C26 21.51 21.51 26 16 26C14.87 26 13.79 25.8 12.78 25.46L9.73 28.51C11.62 29.45 13.75 30 16 30C23.73 30 30 23.73 30 16C30 13.75 29.45 11.62 28.51 9.74L25.46 12.78Z" fill="#E8E8E8" opacity="0.5" />
                <path d="M19.64 14.36C19.87 14.86 20 15.41 20 16C20 18.21 18.21 20 16 20C15.41 20 14.86 19.87 14.36 19.64L3 31L1 29L12.36 17.64C12.13 17.14 12 16.59 12 16C12 13.79 13.79 12 16 12C16.59 12 17.14 12.13 17.64 12.36L29 1L31 3L19.64 14.36Z" fill="#E8E8E8" />
              </svg>
            </div>
            <div className="font-['CentraleSans:Book',_sans-serif] text-[#e8e8e8] text-[14px] text-center leading-[20px]">
              Revolve
            </div>
          </div>
        </div>
      </div>

      {/* ChromaFlo Button */}
      <div className="absolute left-[1816px] top-[944px] w-[88px]" style={{ height: '64px' }}>
        <div className="bg-[rgba(89,89,89,0.55)] flex flex-col gap-0.5 items-center justify-center pb-1 pt-1.5 px-1 rounded-[2px] relative h-full">
          <div className="size-8">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
              <path d="M16 1.33333C24.1 1.33333 30.6667 7.9 30.6667 16C30.6667 24.1 24.1 30.6667 16 30.6667C7.9 30.6667 1.33333 24.1 1.33333 16C1.33333 7.9 7.9 1.33333 16 1.33333ZM16 3.33333C9.01222 3.33333 3.33333 9.01222 3.33333 16C3.33333 22.9878 9.01222 28.6667 16 28.6667C22.9878 28.6667 28.6667 22.9878 28.6667 16C28.6667 9.01222 22.9878 3.33333 16 3.33333ZM17.3333 25.3333V26.6667H14.6667V25.3333H17.3333ZM17.3333 21.3333V22.6667H14.6667V21.3333H17.3333ZM16 14C17.1046 14 18 14.8954 18 16C18 17.1046 17.1046 18 16 18C14.8954 18 14 17.1046 14 16C14 14.8954 14.8954 14 16 14ZM6.66667 14.6667V17.3333H5.33333V14.6667H6.66667ZM10.6673 14.6667V17.3333H9.33333V14.6667H10.6673ZM22.6672 14.6667V17.3333H21.3332L21.3327 14.6667H22.6672ZM26.6672 14.6667V17.3333H25.3339V14.6667H26.6672ZM17.3333 9.33333V10.6667H14.6667V9.33333H17.3333ZM17.3333 5.33333V6.66667H14.6667V5.33333H17.3333Z" fill="white" fillOpacity="0.8" />
            </svg>
          </div>
          <div className="font-['CentraleSans:Book',_sans-serif] text-[#d6d6d6] text-[14px] text-center leading-[20px]">
            ChromaFlo
          </div>
          
          {/* Disabled indicator */}
          <div className="absolute top-[9.38%] right-[6.82%] size-2">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
              <circle cx="4" cy="4" fill="rgba(89,89,89,0.55)" r="4" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      {/* Save Frame */}
      <div className="absolute bg-[rgba(89,89,89,0.55)] flex gap-2 items-center justify-center left-4 px-4 py-2 rounded-[2px] top-[1024px] w-[214px]">
        <div className="size-6">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <path d="M2 16V21H7V22H1V16H2ZM23 16V22H17V21H22V16H23ZM12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM13 17V18H11V17H13ZM13 14V15H11V14H13ZM12 11C12.5523 11 13 11.4477 13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11ZM7 11V13H6V11H7ZM15 11V13H14V11H15ZM10 11V13H9V11H10ZM18 11V13H17V11H18ZM13 9V10H11V9H13ZM7 2V3H2V8H1V2H7ZM23 2V8H22V3H17V2H23ZM13 6V7H11V6H13Z" fill="#E8E8E8" />
          </svg>
        </div>
        <div className="font-['CentraleSans:Book',_sans-serif] text-[#e8e8e8] text-[16px] leading-[22px]">
          Save Frame
        </div>
      </div>

      {/* Freeze */}
      <div className="absolute bg-[rgba(89,89,89,0.55)] flex gap-2 items-center justify-center left-[1000px] px-4 py-2 rounded-[2px] top-[1024px] w-[214px]">
        <div className="size-6">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <path d="M23 5L17 11V5H1V19H17V13L23 19V5ZM12 8V16.0006H10V8H12ZM8 8V16.0001H6V8H8Z" fill="#E8E8E8" />
          </svg>
        </div>
        <div className="font-['CentraleSans:Book',_sans-serif] text-[#e8e8e8] text-[16px] leading-[22px]">
          Freeze
        </div>
      </div>

      {/* Ringdown */}
      <div className="absolute bg-[#1474a4] flex gap-2 items-center justify-center left-[1230px] px-4 py-2 rounded-[2px] top-[1024px] w-[214px]">
        <div className="size-6">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <path d="M19.378 9.576C19.607 10.207 19.761 10.853 19.8215 11.5025L13.5145 11.5H13.1945L13.2275 11.4525L16.5045 5.793C17.0755 6.1975 17.5805 6.684 18.024 7.224L20.8955 5.5325C18.8955 2.7865 15.6575 1 12 1C8.349 1 5.1155 2.7805 3.1145 5.5185L6.024 7.1585C6.4545 6.645 6.942 6.181 7.49 5.793L9.4585 9.1935L10.791 11.476L4.2235 11.5C4.2255 11.477 4.2215 11.5235 4.2235 11.5L4.2265 11.4525C4.2875 10.7745 4.4445 10.1265 4.668 9.51L1.7965 7.891C1.2845 9.161 1 10.547 1 12C1 17.607 5.196 22.2305 10.618 22.9105L10.6045 19.83C9.944 19.7105 9.309 19.5175 8.717 19.243L11.997 13.5775L15.2775 19.243C14.664 19.5275 14.005 19.724 13.319 19.8425L13.3325 22.917C18.779 22.259 23 17.624 23 12C23 10.5535 22.718 9.1735 22.2105 7.908L19.378 9.576Z" fill="white" />
          </svg>
        </div>
        <div className="font-['CentraleSans:Book',_sans-serif] text-white text-[16px] leading-[22px]">
          Ringdown
        </div>
      </div>

      {/* Record Button */}
      <div 
        onClick={onStartRecording}
        className="absolute bg-[#1474a4] box-border content-stretch flex gap-2 items-center justify-center px-4 py-2 left-[1460px] rounded-[2px] top-[1024px] w-[214px] cursor-pointer hover:bg-[#1068a0] transition-colors shrink-0"
      >
        <div className="size-6">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <path d="M12 1C18.0751 1 23 5.92486 23 12C23 18.0751 18.0751 23 12 23C5.92486 23 1 18.0751 1 12C1 5.92486 5.92486 1 12 1ZM12 2C6.47714 2 2 6.47714 2 12C2 17.5229 6.47714 22 12 22C17.5229 22 22 17.5229 22 12C22 6.47714 17.5229 2 12 2ZM12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6Z" fill="white" />
          </svg>
        </div>
        <div className="font-['CentraleSans:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e8e8e8] text-[16px] text-nowrap">
          <p className="leading-[22px] whitespace-pre text-white">Record</p>
        </div>
      </div>

      {/* Sync Playback Toggle */}
      <div className="absolute bg-[rgba(89,89,89,0.55)] flex gap-2 items-center justify-center left-[1690px] pl-4 pr-3 py-2 rounded-[2px] top-[1024px] w-[214px]">
        <div className="flex items-center gap-3">
          {/* Toggle Switch */}
          <div className="relative">
            <div className="bg-[#45de85] h-4 rounded-[100px] w-10" />
            <div className="absolute bg-[#e8e8e8] right-[-4px] rounded-[100px] size-6 top-1/2 translate-y-[-50%] border border-[#8c8c8c] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.45)]" />
          </div>
          <div className="font-['CentraleSans:Book',_sans-serif] text-[#e8e8e8] text-[16px] leading-[22px]">
            Sync Playback
          </div>
        </div>
      </div>
    </div>
  );
}