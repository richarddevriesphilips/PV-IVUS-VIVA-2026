import React from 'react';

interface NumberedBookmarkProps {
  number: number;
  onClick?: () => void;
  className?: string;
}

export default function NumberedBookmark({ number, onClick, className = '' }: NumberedBookmarkProps) {
  return (
    <div 
      className={`relative cursor-pointer hover:scale-110 transition-transform ${className}`}
      onClick={onClick}
      title={`Bookmark ${number}`}
    >
      {/* Orange bookmark icon */}
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M18 23L12 17L6 23V1H18V23Z" 
          fill="#FF830F" 
          stroke="#B85C0A" 
          strokeWidth="1"
        />
      </svg>
      
      {/* Number overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span 
          className="text-white font-['CentraleSans:Bold',_sans-serif] text-[10px] leading-none"
          style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
        >
          {number}
        </span>
      </div>
    </div>
  );
}
