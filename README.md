
  # IVUS Flexvision

  This is the PV-IVUS Flexvision workflow prototype application.

  ## Running the code

  Run `npm i` to install the dependencies. This also installs the dependencies for the vendored `intrasight/` sub-app (via `postinstall`).

  ### Frame Generation (First Time Setup)

  The application uses frame-by-frame playback instead of video files. You need to generate frames from the video files first:

  ```bash
  ./scripts/generate-frames.sh
  ```

  This will create frame sequences in `public/frames/` from the source videos. You only need to do this once (or when videos change).

  ### Starting the Application

  Run `npm run dev:all` to start both the main application and the Intrasight window (recommended).
  
  Alternatively, run `npm run dev` to start only the main application.

  On launch, a splash screen lets you choose between the **Near Future** and **Distant Future** versions of the application. Near Future is the current, fully-built FlexVision workflow prototype. Distant Future is currently a placeholder duplicate of Near Future, to be updated separately.

  ### Project structure

  - `src/app/` – app shell, router, and splash screen.
  - `src/versions/near-future/` – the current FlexVision workflow prototype.
  - `src/versions/distant-future/` – placeholder for the next iteration (currently a duplicate of `near-future`).
  - `intrasight/` – vendored copy of the Intrasight/CoReg app, built independently and served under `/intrasight` (see below).

  ### Intrasight sub-app

  The Intrasight window is a separate Vite app vendored into this repository under `intrasight/`. It has its own `package.json`, builds independently (`npm run build:intrasight`), and is embedded via an iframe (dev: `http://localhost:3000`, production: `/intrasight/`). It no longer depends on any sibling repository.
  