import { useState } from "react";
import { Menu, X } from "lucide-react";
import './Navbar.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen((prev) => !prev);

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
        <div className="navbar-links-container navbar-desktop-only">
          <a href="/home" className="navbar-link">Home</a>
          <a href="/about-us" className="navbar-link">About Us</a>
          <a href="./faq" className="navbar-link">FAQ</a>
          <a href="/interest-form" className="navbar-link">Interest Form</a>
          <button className="navbar-pill navbar-login-btn">Login</button>
        </div>
      </div>
      {open && (
        <div className="navbar-mobile-menu">
          <a onClick={() => setOpen(false)} href="#about" className="navbar-mobile-item">About</a>
          <a onClick={() => setOpen(false)} href="#services" className="navbar-mobile-item">Services & Pricing</a>
          <a onClick={() => setOpen(false)} href="#process" className="navbar-mobile-item">Our Process</a>
          <a onClick={() => setOpen(false)} href="#faq" className="navbar-mobile-item">FAQ</a>
          
          <a href="/student-form" className="navbar-mobile-pill">Schedule a Call</a>
          <button className="navbar-mobile-pill navbar-login-btn">Login</button>
        </div>
      )}
    </nav>
  );
}