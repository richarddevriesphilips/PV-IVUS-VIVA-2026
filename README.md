
  # IVUS Flexvision

  This is the PV-IVUS Flexvision workflow prototype application.

  ## Running the code

  Run `npm i` to install the dependencies.

  ### Frame Generation (First Time Setup)

  The application uses frame-by-frame playback instead of video files. You need to generate frames from the video files first:

  ```bash
  ./scripts/generate-frames.sh
  ```

  This will create frame sequences in `public/frames/` from the source videos. You only need to do this once (or when videos change).

  ### Starting the Application

  Run `npm run dev:all` to start both the main application and the Intrasight window (recommended).
  
  Alternatively, run `npm run dev` to start only the main application.
  