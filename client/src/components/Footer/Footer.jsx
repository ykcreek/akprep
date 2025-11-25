import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer>
      <div className="container footer-inner">
        <div className="footer-left">
          <img src="/vita-logo.png" alt="Vita logo" className="logo-img" />
          <span>© {year} Vita Prep</span>
        </div>
        <div className="footer-links">
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
          <a href="#services">Pricing</a>
        </div>
      </div>
    </footer>
  )
}