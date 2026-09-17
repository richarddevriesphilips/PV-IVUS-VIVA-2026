
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

  Run `npm run dev` to start the application.

  On launch, a splash screen lets you choose between the **Near Future** and **Distant Future** versions of the application. Both are fully-built FlexVision workflow prototypes, each rendering their own version of the Intrasight window directly (no iframe) as part of the same React tree.

  ### Project structure

  - `src/app/` – app shell, router, and splash screen.
  - `src/versions/near-future/` – the FlexVision workflow prototype, rendering the `intrasight/` sub-app directly via `IntrasightWindow.tsx`.
  - `src/versions/distant-future/` – the next iteration of the prototype, rendering the newer `intrasight-distant-future/` sub-app directly.
  - `intrasight/` – vendored source of the Intrasight/CoReg app (components/contexts/hooks/etc. only – no separate `package.json` or build step).
  - `intrasight-distant-future/` – vendored source of the newer Intrasight/Northstar app.
  - `public/intrasight/` and `public/intrasight-distant-future/` – each vendored app's static assets (videos, fonts, frame images), namespaced to avoid filename collisions between the two.

  ### Intrasight integration

  The Intrasight window used to run in an `<iframe>` pointing at a separately-built Vite app. It is now compiled directly into the main bundle: `vite.config.ts` aliases `@intrasight` / `@intrasight-distant-future` to the vendored `src/` folders, forces a single React instance (sub-apps otherwise had their own nested `node_modules/react`), and strips the Figma-export `package@version` import specifiers (e.g. `lucide-react@0.487.0`) down to plain package names. Each sub-app's own `App.tsx` was adjusted to scale itself to fit its parent container (via `ResizeObserver`/`clientWidth`) instead of the browser window, since it no longer owns the whole page. Communication with the rest of the FlexVision app (phase changes, fluoro pedal, recording time) still uses `window.postMessage`, which continues to work without an iframe since `window.parent === window` at the top level.
  