import { useContext } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Users, 
  Settings, 
  ExternalLink, 
  LayoutDashboard,
  LogOut 
} from 'lucide-react';
import { AuthContext } from "../../context/AuthContext";
import "./Sidebar.css";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={18} /> },
    { name: 'Students', path: '/admin/students', icon: <Users size={18} /> },
    { name: 'Site Editor', path: '/admin/site-editor', icon: <Settings size={18} /> },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <h2 className="admin-brand">Vita<span>Admin</span></h2>
      </div>

      <nav className="admin-nav">
        <span className="nav-label">Management</span>
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`admin-nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="admin-sidebar-footer">
        <a href="/" target="_blank" className="admin-nav-item external">
          <ExternalLink size={18} />
          <span>Live Site</span>
        </a>
        
        {/* Updated Logout Button */}
        <button className="admin-nav-item logout" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}