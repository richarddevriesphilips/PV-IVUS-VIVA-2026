import IntrasightApp from "@intrasight-distant-future/App";
import "@intrasight-distant-future/index.css";

// Rendered directly (no iframe) so it shares this app's React/DOM tree.
export default function IntrasightWindow() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-black">
      <IntrasightApp />
    </div>
  );
}
