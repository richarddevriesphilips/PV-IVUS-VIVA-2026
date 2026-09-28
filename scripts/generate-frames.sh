#!/bin/bash

# Script to generate frame sequences from video files
# Requires ffmpeg to be installed

set -e

echo "Generating frame sequences from videos..."

# Create directories
mkdir -p public/frames/postrecord
mkdir -p public/frames/treatment

# Convert Postrecord.mov to frames (30 fps)
echo "Converting Postrecord.mov to frames..."
ffmpeg -i videos/Postrecord.mov -vf "fps=30" -q:v 3 public/frames/postrecord/frame_%04d.jpg -y

# Convert treatment_cut.mp4 to frames (30 fps)
echo "Converting treatment_cut.mp4 to frames..."
ffmpeg -i videos/treatment_cut.mp4 -vf "fps=30" -q:v 3 public/frames/treatment/frame_%04d.jpg -y

echo "Frame generation complete!"
echo "Postrecord frames: $(ls public/frames/postrecord | wc -l)"
echo "Treatment frames: $(ls public/frames/treatment | wc -l)"

# --- Distant-future "Pullback 2" leg assets --------------------------------
# Source videos live in "Pullback 2/" at the repo root (not under videos/).
# These feed the same frame-based players as above (FramePlayer for the
# outer FlexVision "X-ray Ref"/"X-ray Live" quadrants, IVUSFramePlayer for the
# Intrasight segment tomo view) - one set per leg.

mkdir -p public/frames/postrecord-left-leg
mkdir -p public/frames/postrecord-right-leg
mkdir -p public/intrasight-distant-future/assets/ivus-frames-right-leg

echo "Converting Fluoro Recording_Left Leg.mp4 to frames..."
ffmpeg -i "Pullback 2/Fluoro Recording_Left Leg.mp4" -vf "fps=30" -q:v 3 public/frames/postrecord-left-leg/frame_%04d.jpg -y

echo "Converting Fluoro Recording_Right Leg.mov to frames..."
ffmpeg -i "Pullback 2/Fluoro Recording_Right Leg.mov" -vf "fps=30" -q:v 3 public/frames/postrecord-right-leg/frame_%04d.jpg -y

echo "Converting IVUS Recording_Right Leg.mp4 to frames..."
ffmpeg -i "Pullback 2/IVUS Recording_Right Leg.mp4" -vf "fps=30" -q:v 3 public/intrasight-distant-future/assets/ivus-frames-right-leg/frame_%04d.jpg -y

# Note: IVUS Recording_Left Leg.mp4 is byte-identical to the existing
# public/intrasight-distant-future/assets/videos/IVUS-recording-export.mp4,
# so the Left Leg's frames are already extracted at
# public/intrasight-distant-future/assets/ivus-frames/ - no need to regenerate.

echo "Left leg postrecord frames: $(ls public/frames/postrecord-left-leg | wc -l)"
echo "Right leg postrecord frames: $(ls public/frames/postrecord-right-leg | wc -l)"
echo "Right leg IVUS frames: $(ls public/intrasight-distant-future/assets/ivus-frames-right-leg | wc -l)"
