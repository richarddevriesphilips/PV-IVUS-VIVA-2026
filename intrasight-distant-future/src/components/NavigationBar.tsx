import React, { useState, useEffect } from 'react';
import svgPaths from '../imports/svg-htfrh24qmy';

export function NavigationBar() {
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
    <div className="absolute box-border content-stretch flex flex-col items-center justify-start left-0 p-0 top-0 w-[1920px]">
      <div className="box-border content-stretch flex flex-row gap-2 h-14 items-center justify-start p-0 relative shrink-0 w-full">
        <div className="basis-0 bg-[#383838] grow h-full min-h-px min-w-px shrink-0" />

        {/* Left Side */}
        <div className="absolute box-border content-stretch flex flex-row gap-12 h-12 items-center justify-start left-2 pl-2 pr-0 py-0 top-1/2 translate-y-[-50%]">
          <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0">
            <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-row gap-2 items-center justify-center p-[8px] relative rounded-sm shrink-0 w-10">
              <div className="relative shrink-0 size-6">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 24 24"
                >
                  <path d={svgPaths.p2df20600} fill="#D6D6D6" />
                </svg>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-col h-[15px] items-center justify-start px-2 py-0 relative shrink-0">
              <div className="h-[15px] relative shrink-0 w-[77px]">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 77 15"
                >
                  <path d={svgPaths.p25010500} fill="white" />
                </svg>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start px-2 py-0 relative shrink-0">
              <div className="font-['CentraleSans',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[20px] text-[rgba(255,255,255,0.8)] text-left text-nowrap">
                <p className="block leading-[28px] whitespace-pre">IVUS</p>
              </div>
            </div>
          </div>

          {/* Patient Info */}
          <div className="box-border content-stretch flex flex-row gap-6 h-6 items-center justify-center p-0 relative shrink-0">
            <div className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0">
              <div className="relative shrink-0 size-8">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 32 32"
                >
                  <path d={svgPaths.p4381100} fill="#41C9FE" />
                </svg>
              </div>
              <div className="font-['CentraleSans',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#41c9fe] text-[20px] text-left text-nowrap">
                <p className="block leading-[28px] whitespace-pre">DOE, Jane</p>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0">
              <div className="box-border content-stretch flex flex-row font-['CentraleSans',_sans-serif] gap-2 items-start justify-start leading-[0] not-italic p-0 relative shrink-0 text-[20px] text-left text-nowrap">
                <div className="flex flex-col justify-center relative shrink-0 text-[rgba(214,214,214,0.65)]">
                  <p className="block leading-[28px] text-nowrap whitespace-pre">Patient ID</p>
                </div>
                <div className="flex flex-col justify-center relative shrink-0 text-[rgba(255,255,255,0.8)]">
                  <p className="block leading-[28px] text-nowrap whitespace-pre">234567</p>
                </div>
              </div>
              <div className="box-border content-stretch flex flex-row font-['CentraleSans',_sans-serif] gap-2 items-start justify-start leading-[0] not-italic p-0 relative shrink-0 text-[20px] text-left text-nowrap">
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

        {/* Right Side */}
        <div className="absolute box-border content-stretch flex flex-row gap-2 h-12 items-center justify-end p-0 right-4 top-1/2 translate-y-[-50%]">
          <div className="box-border content-stretch flex flex-row gap-4 h-12 items-center justify-end p-0 relative shrink-0">
            <div className="box-border content-stretch flex flex-row gap-4 items-center justify-end p-0 relative shrink-0">
              <div className="flex flex-col font-['CentraleSans',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#d6d6d6] text-[20px] text-left text-nowrap">
                <p className="block leading-[28px] whitespace-pre">{formatDate(currentDateTime)}</p>
              </div>
              <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start leading-[0] not-italic p-0 relative shrink-0 text-[#d6d6d6] text-[20px]">
                <div className="flex flex-col font-['CentraleSans',_sans-serif] justify-center relative shrink-0 text-left text-nowrap">
                  <p className="block leading-[28px] whitespace-pre">{time}</p>
                </div>
                <div className="flex flex-col font-['CentraleSans',_sans-serif] justify-center relative shrink-0 text-center w-10">
                  <p className="block leading-[28px]">{ampm}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}