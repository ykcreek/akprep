import './Nav.css';

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner container">
        <a className="brand" href="#home">
          <img src="/vita-logo.svg" alt="Vita logo" className="logo-img" />
          <span>Vita Prep</span>
        </a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#services">Services & Pricing</a>
          <a href="#process">Our Process</a>
          <a href="#results">Results</a>
          <a href="#faq">FAQ</a>
          <a href="#contact" className="pill">Schedule</a>
          <a href="#contact" className="cta">Chat with us</a>
        </div>
      </div>
    </nav>
  );
}