import React, { useState, useEffect } from 'react';
import LiveScreen from './LiveScreen';
import RecordScreen from './RecordScreen';
import CleanMedicalInterface from './CleanMedicalInterface';
import { BookmarkProvider, useBookmarks } from '../contexts/BookmarkContext';

type WorkflowStage = 'live' | 'recording' | 'analysis';

function IVUSWorkflowAppInner() {
  const [currentStage, setCurrentStage] = useState<WorkflowStage>('live');
  const [recordingDuration, setRecordingDuration] = useState<number>(26); // Track actual recording duration
  const { clearAllBookmarks, clearXRayTimeRanges } = useBookmarks();

  // Let the parent FlexVision app (X-ray Live / X-ray Ref quadrants) know which
  // stage we're in, so it can drive its FramePlayer in sync with this workflow.
  useEffect(() => {
    window.parent.postMessage({ type: "intrasight-phase", phase: currentStage }, "*");
  }, [currentStage]);

  const handleStartRecording = () => {
    // Clear bookmarks and X-ray time ranges when going from analysis back to recording
    clearAllBookmarks();
    clearXRayTimeRanges();
    setCurrentStage('recording');
  };

  const handleStopRecording = (actualDuration: number) => {
    // Store the actual recording duration for the review screen
    setRecordingDuration(actualDuration);
    // Bookmarks persist when going from recording to analysis
    setCurrentStage('analysis');
  };

  const handleGoToLive = () => {
    setCurrentStage('live');
  };

  const renderCurrentStage = () => {
    switch (currentStage) {
      case 'live':
        return <LiveScreen onStartRecording={handleStartRecording} />;
      case 'recording':
        return <RecordScreen onStopRecording={handleStopRecording} />;
      case 'analysis':
        return <CleanMedicalInterface onGoToLive={handleGoToLive} recordingDuration={recordingDuration} />;
      default:
        return <LiveScreen onStartRecording={handleStartRecording} />;
    }
  };

  return (
    <div className="w-[1920px] h-[1080px] relative overflow-hidden">
      {renderCurrentStage()}
    </div>
  );
}

export default function IVUSWorkflowApp() {
  return (
    <BookmarkProvider>
      <IVUSWorkflowAppInner />
    </BookmarkProvider>
  );
}