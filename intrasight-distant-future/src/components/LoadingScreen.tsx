import React from 'react';

interface LoadingScreenProps {
  progress: number; // 0-100
  loadedVideos: number;
  totalVideos: number;
}

export function LoadingScreen({ progress, loadedVideos, totalVideos }: LoadingScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#000000] text-white">
      <div className="flex flex-col items-center gap-8 max-w-md mx-auto p-8">
        {/* IVUS Logo/Title */}
        <div className="text-center">
          <h1 className="font-['CentraleSans',_sans-serif] text-[32px] font-medium text-white mb-2">
            IVUS Imaging System
          </h1>
          <p className="font-['CentraleSans',_sans-serif] text-[16px] text-[#e8e8e8]">
            Intravascular Ultrasound Analysis
          </p>
        </div>

        {/* Loading Animation */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-[#333333] rounded-full"></div>
          <div 
            className="absolute inset-0 border-4 border-transparent border-t-[#FFDD19] rounded-full animate-spin"
            style={{ animationDuration: '1s' }}
          ></div>
        </div>

        {/* Progress Information */}
        <div className="text-center space-y-4 w-full">
          <div className="space-y-2">
            <div className="font-['CentraleSans',_sans-serif] text-[16px] text-[#e8e8e8]">
              Loading Medical Videos...
            </div>
            <div className="font-['CentraleSans',_sans-serif] text-[14px] text-[#999999]">
              {loadedVideos} of {totalVideos} videos loaded
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#333333] rounded-full h-2">
            <div 
              className="bg-[#FFDD19] h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="font-['CentraleSans',_sans-serif] text-[14px] text-[#FFDD19] font-medium">
            {Math.round(progress)}% Complete
          </div>
        </div>

        {/* Loading Status */}
        <div className="text-center">
          <p className="font-['CentraleSans',_sans-serif] text-[14px] text-[#999999] max-w-sm">
            Preparing synchronized video display and analysis tools. 
            This ensures optimal performance during medical imaging review.
          </p>
        </div>
      </div>
    </div>
  );
}