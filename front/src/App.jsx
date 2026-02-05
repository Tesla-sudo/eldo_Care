import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";

import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import HospitalDashboard from "./pages/HospitalDashboard";
import CHVDashboard from "./pages/CHVDashboard";
import NGODashboard from "./pages/ngo/NGODashboard";
import CallMe from "./pages/CallMe";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/hospital" element={<HospitalDashboard />} />
        <Route path="/chv" element={<CHVDashboard />} />
        <Route path="/ngo" element={<NGODashboard />} />
        <Route path="/call-me" element={<CallMe />} />
      </Routes>
    </BrowserRouter>
  );
}
