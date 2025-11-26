import './Navbar.css'

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="container nav-inner">  
        <a href="/" className="brand">
          <img src="/vita-logo.png" alt="Vita Prep" className="logo-img" />
          <span>Vita Prep</span>
        </a>

        <div className="nav-links">
            <a href="/#about" className='nav-link'>About</a>
            <a href="/#services" className='nav-link'>Services & Pricing</a>
            <a href="/#process" className='nav-link'>Our Process</a>
            <a href="/#faq" className='nav-link'>FAQ</a>
            <a href="/student-form" className="pill">Schedule a Call</a>
        </div>
      </div>
    </nav>
  )
}