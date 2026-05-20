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
