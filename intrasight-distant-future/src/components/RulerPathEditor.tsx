import React, { useState } from 'react';
import { RULER_PATH_DATA, APP_CONSTANTS } from './constants/appConstants';

interface PathPoint {
  progress: number;
  x: number;
  y: number;
}

export function RulerPathEditor() {
  const [points, setPoints] = useState([...RULER_PATH_DATA]);
  const [draggingIndex, setDraggingIndex] = useState(null as number | null);
  const [showEditor, setShowEditor] = useState(false);

  const handleMouseDown = (index: number) => {
    setDraggingIndex(index);
  };

  const handleMouseMove = (e: any) => {
    if (draggingIndex === null) return;

    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Convert to SVG coordinates
    const svgX = x - APP_CONSTANTS.INDICATOR.BASE_OFFSET_X;
    const svgY = y - APP_CONSTANTS.INDICATOR.BASE_OFFSET_Y;

    const newPoints = [...points];
    newPoints[draggingIndex] = {
      ...newPoints[draggingIndex],
      x: Math.round(svgX),
      y: Math.round(svgY),
    };
    setPoints(newPoints);
  };

  const handleMouseUp = () => {
    setDraggingIndex(null);
  };

  const copyToClipboard = () => {
    const dataString = `export const RULER_PATH_DATA = [\n${points
      .map((p) => `  { progress: ${p.progress}, y: ${p.y}, x: ${p.x} }`)
      .join(',\n')}\n];`;
    navigator.clipboard.writeText(dataString);
    alert('Path data copied to clipboard!');
  };

  if (!showEditor) {
    return (
      <button
        onClick={() => setShowEditor(true)}
        className="fixed bottom-4 right-4 z-50 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded shadow-lg"
      >
        Edit Ruler Path
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
      <div className="bg-neutral-900 p-6 rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-2xl font-bold">Ruler Path Editor</h2>
          <div className="space-x-2">
            <button
              onClick={copyToClipboard}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Copy Data
            </button>
            <button
              onClick={() => setShowEditor(false)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>

        <div className="bg-black rounded-lg p-4">
          <svg
            width="820"
            height="740"
            viewBox="0 0 820 740"
            className="w-full"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Background grid */}
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="820" height="740" fill="url(#grid)" />

            {/* Draw the path line */}
            <path
              d={`M ${points.map((p, i) => 
                `${APP_CONSTANTS.INDICATOR.BASE_OFFSET_X + p.x},${APP_CONSTANTS.INDICATOR.BASE_OFFSET_Y + p.y}`
              ).join(' L ')}`}
              stroke="#FFDD19"
              strokeWidth="3"
              fill="none"
            />

            {/* Draw control points */}
            {points.map((point, index) => {
              const x = APP_CONSTANTS.INDICATOR.BASE_OFFSET_X + point.x;
              const y = APP_CONSTANTS.INDICATOR.BASE_OFFSET_Y + point.y;

              return (
                <g key={index}>
                  {/* Larger invisible hit area */}
                  <circle
                    cx={x}
                    cy={y}
                    r="15"
                    fill="transparent"
                    style={{ cursor: 'move' }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleMouseDown(index);
                    }}
                  />
                  {/* Visible dot */}
                  <circle
                    cx={x}
                    cy={y}
                    r="8"
                    fill={draggingIndex === index ? '#FF0000' : '#FFDD19'}
                    stroke="white"
                    strokeWidth="2"
                    style={{ cursor: 'move', pointerEvents: 'none' }}
                  />
                  {/* Label */}
                  <text
                    x={x}
                    y={y - 15}
                    fill="white"
                    fontSize="12"
                    textAnchor="middle"
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    {Math.round(point.progress * 100)}%
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="mt-4 text-white text-sm">
          <p className="mb-2">
            <strong>Instructions:</strong> Drag the yellow dots to adjust the ruler path. 
            The percentage shows the progress along the timeline (0% = start, 100% = end).
          </p>
          <p>
            Click "Copy Data" to copy the updated path coordinates to your clipboard, 
            then paste them into the appConstants.ts file.
          </p>
        </div>

        {/* Show current coordinates */}
        <div className="mt-4 bg-black rounded p-4 max-h-40 overflow-auto">
          <pre className="text-green-400 text-xs font-mono">
            {points.map((p, i) => 
              `  { progress: ${p.progress}, y: ${p.y}, x: ${p.x} }${i < points.length - 1 ? ',' : ''}\n`
            ).join('')}
          </pre>
        </div>
      </div>
    </div>
  );
}
