// Tracks whether the fluoro footpedal (Space / F13) is held, from app load onward,
// so a screen that mounts while the pedal is already down can pick that up.
let held = false;

const isPedalKey = (e: KeyboardEvent) => e.code === "Space" || e.code === "F13";

if (typeof window !== "undefined") {
  window.addEventListener("keydown", (e) => { if (isPedalKey(e)) held = true; }, true);
  window.addEventListener("keyup", (e) => { if (isPedalKey(e)) held = false; }, true);
  window.addEventListener("blur", () => { held = false; });
}

export function isFluoroPedalHeld(): boolean {
  return held;
}
