import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Classes from "./pages/Classes";
import ClassDetail from "./pages/ClassDetail";
import BuildPlanner from "./pages/BuildPlanner";
import Inventory from "./pages/Inventory";
import MapTracker from "./pages/MapTracker";
import Stats from "./pages/Stats";
import './App.css'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/classes/:id" element={<ClassDetail />} />
          <Route path="/build" element={<BuildPlanner />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/map" element={<MapTracker />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
