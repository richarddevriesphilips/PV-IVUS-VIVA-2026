import React from "react";

console.log('🚨 FRESH INTERFACE IMPORTED');

export default function FreshInterface() {
  console.log('🚨 FRESH INTERFACE FUNCTION CALLED');
  
  return (
    <div style={{
      position: 'absolute',
      top: '0px',
      left: '300px',
      width: '300px',
      height: '100px',
      backgroundColor: 'lime',
      color: 'black',
      fontSize: '20px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 999999,
      border: '5px solid purple'
    }}>
      FRESH INTERFACE WORKS
    </div>
  );
}