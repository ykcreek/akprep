// src/pages/AdminDashboard/AdminDashboard.jsx
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Students from "../Students/Students";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [selected, setSelected] = useState("students");

  return (
    <div className="admin-layout">
      <Sidebar selected={selected} setSelected={setSelected} />
      
      <div className="admin-content">
        <Routes>
          <Route path="/" element={<Students />} />
          <Route path="/students" element={<Students />} />
          <Route path="/analytics" element={<AnalyticsPlaceholder />} />
          <Route path="/settings" element={<SettingsPlaceholder />} />
        </Routes>
      </div>
    </div>
  );
}

// Simple placeholders
function AnalyticsPlaceholder() {
  return <div className="placeholder">Analytics Dashboard – Coming Soon</div>;
}
function SettingsPlaceholder() {
  return <div className="placeholder">Settings – Coming Soon</div>;
}