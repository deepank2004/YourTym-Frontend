import { BrowserRouter, Routes, Route }
from "react-router-dom";

import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import PartnerDashboard from "./pages/PartnerDashboard";
import UserDashboard from "./pages/UserDashboard";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/partner"
          element={<PartnerDashboard />}
        />

        <Route
          path="/user"
          element={<UserDashboard />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;