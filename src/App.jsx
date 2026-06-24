import { HashRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import PartnerDashboard from "./pages/PartnerDashboard";
import UserDashboard from "./pages/UserDashboard";
import HubManagement from "./pages/HubManagement";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/partner" element={<PartnerDashboard />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/hub-management" element={<HubManagement />} />
      </Routes>
    </HashRouter>
  );
}

export default App;