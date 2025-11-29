import { useEffect, useState } from "react";
import './Navbar.css';

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const uid = localStorage.getItem("uid");
    setLoggedIn(!!token && !!uid);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("uid");
    localStorage.removeItem("role");

    window.location.href = "/login"; // force redirect
  };

  return (
    <nav className="nav">
      <div className="container nav-inner">  
        
        {/* Brand */}
        <a href="/" className="brand">
          <img src="/vita-logo.png" alt="Vita Prep" className="logo-img" />
          <span>Vita Prep</span>
        </a>

        {/* Right-side links */}
        <div className="nav-links">
          <a href="/#about" className="nav-link">About</a>
          <a href="/#services" className="nav-link">Services & Pricing</a>
          <a href="/#process" className="nav-link">Our Process</a>
          <a href="/#faq" className="nav-link">FAQ</a>

          <a href="/student-form" className="pill">Schedule a Call</a>

          {/* Dynamic login/logout */}
          {!loggedIn ? (
            <a href="/login" className="pill">Login</a>
          ) : (
            <button className="pill logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}

        </div>
      </div>
    </nav>
  );
}
