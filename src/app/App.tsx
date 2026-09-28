import { HashRouter, Routes, Route } from "react-router";
import SplashScreen from "./SplashScreen";
import NearFutureApp from "../versions/near-future/NearFutureApp";
import DistantFutureApp from "../versions/distant-future/DistantFutureApp";
import { RoadmapTool } from "@intrasight-distant-future/components/RoadmapTool";
import { BorderTool } from "@intrasight-distant-future/components/BorderTool";
import { KeyframeGrid } from "@intrasight-distant-future/components/KeyframeGrid";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/near-future" element={<NearFutureApp />} />
        <Route path="/distant-future" element={<DistantFutureApp />} />
        {/* Dev tool: trace the catheter roadmap/positioning for a leg on its real fluoro video */}
        <Route path="/roadmap-tool" element={<RoadmapTool />} />
        {/* Dev tool: trace lumen/vessel borders on individual IVUS frames */}
        <Route path="/border-tool" element={<BorderTool />} />
        {/* Dev tool: review/fix many lumen/vessel keyframes on one page */}
        <Route path="/keyframe-grid" element={<KeyframeGrid />} />
      </Routes>
    </HashRouter>
  );
}
