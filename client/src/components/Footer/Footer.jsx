import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="container footer-inner">
        <div className="footer-brand">
          <img src="/vita-logo.svg" className="logo-img" alt="Vita logo" />
          <span>© {year} AK Prep</span>
        </div>

        <div className="footer-links">
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
          <a href="#services">Pricing</a>
        </div>
      </div>
    </footer>
  );
}
