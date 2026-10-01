import React from 'react';

interface NoXRayOverlayProps {
  timeDifference?: number;
  direction?: 'ahead' | 'behind';
}

/**
 * Overlay message displayed when no X-ray was recorded for the current frame
 * Shows nearest X-ray frame info when available
 */
export function NoXRayOverlay({ timeDifference, direction }: NoXRayOverlayProps) {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', alignItems: 'flex-start', pointerEvents: 'none', zIndex: 70 }}>
      <div style={{ display: 'flex', alignItems: 'stretch', boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.45)' }}>
        {/* Left indicator bar */}
        <div style={{ backgroundColor: '#ff9f19', width: '4px' }} />
        
        {/* Main content - single row layout */}
        <div style={{ backgroundColor: '#212121', borderTop: '1px solid #595959', borderRight: '1px solid #595959', borderBottom: '1px solid #595959', display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
          {/* Header container with icon and title */}
          <div style={{ display: 'flex', alignItems: 'flex-start', paddingLeft: '12px', paddingTop: '16px', paddingBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* Warning Icon */}
              <div style={{ flexShrink: 0 }}>
                <svg style={{ width: '24px', height: '24px', color: '#ff9f19' }} fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" fill="currentColor" />
                  <path d="M11 7h2v6h-2zm0 8h2v2h-2z" fill="#212121" />
                </svg>
              </div>
              
              {/* Title */}
              <span style={{ fontFamily: 'CentraleSans, sans-serif', color: '#ff9f19', fontSize: '24px', fontWeight: 700, lineHeight: '28px', whiteSpace: 'nowrap' }}>
                No Xray
              </span>
            </div>
          </div>
          
          {/* Content text - on same row */}
          <div style={{ paddingLeft: '20px', paddingRight: '22px', paddingTop: '16px', paddingBottom: '16px', minHeight: '116px', display: 'flex', alignItems: 'flex-start', width: '557px' }}>
            {timeDifference !== undefined && direction ? (
              <div style={{ fontFamily: 'CentraleSans, sans-serif', color: 'rgba(255,255,255,0.8)', fontSize: '24px', fontWeight: 400, lineHeight: '28px' }}>
                No X-ray was recorded for this frame, showing the nearest frame which is {timeDifference.toFixed(1)}s {direction}
              </div>
            ) : (
              <div style={{ fontFamily: 'CentraleSans, sans-serif', color: 'rgba(255,255,255,0.8)', fontSize: '24px', fontWeight: 400, lineHeight: '28px' }}>
                No X-ray recorded for this frame
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
