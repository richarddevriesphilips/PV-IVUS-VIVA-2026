import { HashRouter, Routes, Route } from "react-router";
import SplashScreen from "./SplashScreen";
import NearFutureApp from "../versions/near-future/NearFutureApp";
import DistantFutureApp from "../versions/distant-future/DistantFutureApp";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/near-future" element={<NearFutureApp />} />
        <Route path="/distant-future" element={<DistantFutureApp />} />
      </Routes>
    </HashRouter>
  );
}
