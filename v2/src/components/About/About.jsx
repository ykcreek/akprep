import "./About.css";

export default function About() {
  return (
    <section id="home-about" className="about-section">
      <div className="about-container">
        
        {/* Centered Header Row 
        <div className="about-header-group">
          <div className="about-title-container">
            <img src="/vita-logo.png" alt="Vita Prep" className="about-logo-img" />
            <h2 className="about-title">VITA PREP</h2>
          </div>
          <p className="about-vita-tagline">
            College for students by students.
          </p>
        </div>*/}

        {/* Main Section Content */}
        <div className="about-vita-mission-container">
          <div className="about-vita-mission">
            <h1 className="about-vita-mission-title">
              Guiding Students Into Their <span>Dream Schools.</span>
            </h1>
            <h3 className="about-vita-mission-subtitle">
              We help students craft standout transfer applications with proven, student-led systems.
            </h3>
            
            <div className="about-vita-mission-list-container">
              <div className="about-vita-mission-item">
                <strong>Essays</strong>
                <p>Tailored storytelling that captures your unique voice.</p>
              </div>
              <div className="about-vita-mission-item">
                <strong>Strategies</strong>
                <p>Data-backed roadmaps for competitive transfers.</p>
              </div>
              <div className="about-vita-mission-item">
                <strong>School Lists</strong>
                <p>Targeted selections based on fit and probability.</p>
              </div>
              <div className="about-vita-mission-item">
                <strong>Guidance</strong>
                <p>Full support from submission to acceptance.</p>
              </div>
            </div>
          </div>

          <div className="about-vita-founders-images-container">
            {/* Founder 1 */}
            <div className="about-founder-card">
              <img src="/krisshk.jpg" alt="Krissh" className="about-vita-founder-image" />
              <div className="about-founder-label">
                <span className="about-founder-name">Krissh Kolhatkar</span>
                <span className="about-founder-edu">NYU Stern Class 2028</span>
              </div>
            </div>

            {/* Founder 2 */}
            <div className="about-founder-card">
              <img src="/arnavr.jpg" alt="Arnav" className="about-vita-founder-image" />
              <div className="about-founder-label">
                <span className="about-founder-name">Arnav Raghuvanshi</span>
                <span className="about-founder-edu">NYU Stern Class 2028</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}