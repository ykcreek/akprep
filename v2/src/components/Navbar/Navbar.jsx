import { useState, useContext, useEffect } from "react";
import { Menu, X } from "lucide-react";
import './Navbar.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { loggedIn, role, logout } = useContext(AuthContext);
  
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setOpen((prev) => !prev);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setOpen(false);
  };

  // Logic: If already logged in and tries to go to /login, push to appropriate dashboard
  useEffect(() => {
    if (loggedIn && location.pathname === "/login") {
      if (role === "admin") navigate("/admin");
      else navigate("/client");
    }
  }, [loggedIn, role, location.pathname, navigate]);

  return (
    <nav className="navbar-nav">
      <div className="navbar-container navbar-nav-inner">
        <a href="/" className="navbar-brand">
          <img src="/vita-logo.png" alt="Vita Prep" className="navbar-logo-img" />
          <span className="navbar-brand-text">Vita Prep</span>
        </a>

        <button 
          className="navbar-hamburger" 
          onClick={toggleMenu}
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Desktop Navigation */}
        <div className="navbar-links-container navbar-desktop-only">
          <a href="/home" className="navbar-link">Home</a>
          <a href="/about-us" className="navbar-link">About Us</a>
          <a href="/faq" className="navbar-link">FAQ</a>
          <a href="/interest-form" className="navbar-link">Interest Form</a>

          {/* Dynamic Dashboard/Schedule Link */}
          {loggedIn && (
            <button 
              className="navbar-link-btn" 
              onClick={() => navigate(role === "admin" ? "/admin" : "/client")}
            >
              Dashboard
            </button>
          )}

          {/* Dynamic Login/Logout Button */}
          {!loggedIn ? (
            <button className="navbar-pill navbar-login-btn" onClick={() => navigate('/login')}>
              Login
            </button>
          ) : (
            <button className="navbar-pill navbar-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="navbar-mobile-menu">
          <a onClick={() => setOpen(false)} href="/home" className="navbar-mobile-item">Home</a>
          <a onClick={() => setOpen(false)} href="/about-us" className="navbar-mobile-item">About Us</a>
          <a onClick={() => setOpen(false)} href="/faq" className="navbar-mobile-item">FAQ</a>
          
          <div className="navbar-mobile-actions">
            {!loggedIn ? (
              <>
                <a href="/interest-form" className="navbar-mobile-pill" onClick={() => setOpen(false)}>Schedule a Call</a>
                <button 
                  className="navbar-mobile-pill navbar-login-btn" 
                  onClick={() => { navigate('/login'); setOpen(false); }}
                >
                  Login
                </button>
              </>
            ) : (
              <>
                <button 
                  className="navbar-mobile-pill" 
                  onClick={() => { navigate(role === "admin" ? "/admin" : "/client"); setOpen(false); }}
                >
                  Dashboard
                </button>
                <button className="navbar-mobile-pill navbar-logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}