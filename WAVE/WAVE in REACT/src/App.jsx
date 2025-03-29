import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";

import DashboardLayout from "./layouts/dashboard-layout";
import Dashboard from "./pages/dashboard";
import AirQuality from "./pages/air-quality";
import WaterLevels from "./pages/water-levels";
import TrafficManagement from "./pages/traffic-management";
import EnergyUsage from "./pages/energy-usage";
import Alerts from "./pages/alerts";
import Settings from "./pages/settings";

function App() {
  console.log("App component rendering");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="air-quality" element={<AirQuality />} />
          <Route path="water-levels" element={<WaterLevels />} />
          <Route path="traffic" element={<TrafficManagement />} />
          <Route path="energy" element={<EnergyUsage />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
