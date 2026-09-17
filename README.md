
  # IVUS Flexvision

  This is the PV-IVUS Flexvision workflow prototype application.

  ## Running the code

  Run `npm i` to install the dependencies. This also installs the dependencies for the vendored `intrasight/` and `intrasight-distant-future/` sub-apps (via `postinstall`).

  ### Frame Generation (First Time Setup)

  The application uses frame-by-frame playback instead of video files. You need to generate frames from the video files first:

  ```bash
  ./scripts/generate-frames.sh
  ```

  This will create frame sequences in `public/frames/` from the source videos. You only need to do this once (or when videos change).

  ### Starting the Application

  Run `npm run dev:all` to start both the main application and the Intrasight window (recommended).
  
  Alternatively, run `npm run dev` to start only the main application.

  On launch, a splash screen lets you choose between the **Near Future** and **Distant Future** versions of the application. Both are fully-built FlexVision workflow prototypes, each embedding their own version of the Intrasight window.

  ### Project structure

  - `src/app/` – app shell, router, and splash screen.
  - `src/versions/near-future/` – the FlexVision workflow prototype, embedding the `intrasight/` sub-app.
  - `src/versions/distant-future/` – the next iteration of the prototype, embedding the newer `intrasight-distant-future/` sub-app.
  - `intrasight/` – vendored copy of the Intrasight/CoReg app, built independently and served under `/intrasight` (see below).
  - `intrasight-distant-future/` – vendored copy of the newer Intrasight/Northstar app, built independently and served under `/intrasight-distant-future`.

  ### Intrasight sub-apps

  The Intrasight window is a separate Vite app vendored into this repository. Near Future uses `intrasight/` (has its own `package.json`, builds via `npm run build:intrasight`, embedded via iframe: dev `http://localhost:3000`, production `/intrasight/`). Distant Future uses `intrasight-distant-future/` (builds via `npm run build:intrasight-distant-future`, embedded via iframe: dev `http://localhost:3001`, production `/intrasight-distant-future/`). Neither depends on any sibling repository anymore.
  