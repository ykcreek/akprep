import { useContext, useEffect, useState } from "react";
import './Navbar.css';
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { loggedIn, role, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setOpen(false);
  };

  useEffect(() => {
    if (loggedIn && location.pathname === "/login") {
      if (role === "admin") navigate("/admin");
      else navigate("/client");
    }
  }, [loggedIn, role, location.pathname, navigate]);

  return (
    <nav className="nav">
      <div className="container nav-inner">
        
        {/* Brand */}
        <a href="/" className="brand">
          <img src="/vita-logo.png" alt="Vita Prep" className="logo-img" />
          <span>Vita Prep</span>
        </a>

        {/* Hamburger (only on mobile) */}
        <button className="hamburger" onClick={() => setOpen(!open)}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Desktop Navigation */}
        <div className="nav-links desktop-only">
          <a href="/#about" className="nav-link">About</a>
          <a href="/#services" className="nav-link">Services & Pricing</a>
          <a href="/#process" className="nav-link">Our Process</a>
          <a href="/#faq" className="nav-link">FAQ</a>

          {!loggedIn ? (
            <a href="/student-form" className="pill">Schedule a Call</a>
          ) : role === "admin" ? (
            <button className="pill" onClick={() => navigate("/admin")}>
              Dashboard
            </button>
          ) : (
            <button className="pill" onClick={() => navigate("/client")}>
              Dashboard
            </button>
          )}

          {!loggedIn ? (
            <button onClick={() => navigate("/login")} className="pill">
              Login
            </button>
          ) : (
            <button onClick={handleLogout} className="pill logout-btn-nav">
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="mobile-menu">
          <a onClick={() => setOpen(false)} href="/#about" className="mobile-item">About</a>
          <a onClick={() => setOpen(false)} href="/#services" className="mobile-item">Services & Pricing</a>
          <a onClick={() => setOpen(false)} href="/#process" className="mobile-item">Our Process</a>
          <a onClick={() => setOpen(false)} href="/#faq" className="mobile-item">FAQ</a>

          {!loggedIn ? (
            <a href="/student-form" className="mobile-pill">Schedule a Call</a>
          ) : role === "admin" ? (
            <button className="mobile-pill" onClick={() => { navigate("/admin"); setOpen(false); }}>
              Dashboard
            </button>
          ) : (
            <button className="mobile-pill" onClick={() => { navigate("/client"); setOpen(false); }}>
              Dashboard
            </button>
          )}

          {!loggedIn ? (
            <button onClick={() => { navigate("/login"); setOpen(false); }} className="mobile-pill">
              Login
            </button>
          ) : (
            <button onClick={handleLogout} className="mobile-pill logout-btn-nav">
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
