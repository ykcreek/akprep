import "./Footer.css";

export default function Footer() {      
    return (    
        <footer className="footer-section">
            <div className="footer-container">
                {/*<div className="footer-top">
                    <div className="footer-brand">
                        <img src="/vita-logo.png" alt="Vita Prep" className="footer-logo-img" />
                        <span className="footer-brand-name">VITA PREP</span>
                    </div>
                    <div className="footer-nav-links">
                        <a href="#about" className="footer-nav-link">About</a>
                        <a href="#services" className="footer-nav-link">Services</a>
                        <a href="#process" className="footer-nav-link">Process</a>
                        <a href="/student-form" className="footer-nav-link">Contact</a>
                    </div>
                </div>

                <div className="footer-divider"></div>*/}

                <div className="footer-bottom">
                    <p className="footer-copyright">
                        © 2026 Vita Prep. All rights reserved.
                    </p>
                    <div className="footer-legal-links">
                        <a href="/privacy" className="footer-legal-link">Privacy Policy</a>
                        <a href="/terms" className="footer-legal-link">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}