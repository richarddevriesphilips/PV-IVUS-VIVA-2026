import IntrasightApp from "@intrasight/App";
import "@intrasight/index.css";

// Rendered directly (no iframe) so it shares this app's React/DOM tree.
export default function IntrasightWindow() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-black">
      <IntrasightApp />
    </div>
  );
}
