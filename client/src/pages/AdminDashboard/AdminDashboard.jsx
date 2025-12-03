// AdminDashboard.jsx
import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Students from "../Students/Students";
import SiteContentEditor from "../SiteContentEditor/SiteContentEditor";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const location = useLocation();
  const [selected, setSelected] = useState("students");

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/admin/students")) setSelected("students");
    else if (path.includes("/admin/site")) setSelected("site");
    else setSelected("students");
  }, [location.pathname]);

  return (
    <div className="admin-layout">
      <Sidebar selected={selected} setSelected={setSelected} />
      <div className="admin-content">
        <Routes>
          <Route path="/" element={<Students />} />
          <Route path="/students" element={<Students />} />
          <Route path="/site" element={<SiteContentEditor />} />
        </Routes>
      </div>
    </div>
  );
}