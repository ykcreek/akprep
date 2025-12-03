// src/components/Sidebar/Sidebar.jsx
import { useContext } from "react";
import { Users, BarChart3, Settings, LogOut, Compass } from "lucide-react";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const menu = [
  { id: "students", label: "Students", icon: Users, path: "/admin/students" },
  { id: "site", label: "Change Site", icon: Compass, path: "/admin/site" },
];

export default function Sidebar({ selected, setSelected }) {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleMenuClick = (item) => {
    setSelected(item.id);
    navigate(item.path); 
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-inner">
        <div className="sidebar-header">
          <h2 className="sidebar-title">
            <span>Vita Prep</span>
          </h2>
        </div>

        <nav className="sidebar-menu">
          {menu.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`menu-item ${selected === item.id ? "active" : ""}`}
                onClick={() => handleMenuClick(item)}
              >
                <Icon size={20} className="menu-icon" />
                <span className="menu-label">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
          <small>v1.0 • Admin Panel</small>
        </div>
      </div>
    </aside>
  );
}