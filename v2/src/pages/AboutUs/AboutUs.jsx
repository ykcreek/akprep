import "./AboutUs.css";

export default function AboutUs() {
  const founders = [
    {
      id: "krissh",
      name: "Krissh Kolhatkar",
      role: "Founder",
      image: "/krisshk.jpg",
      stats: {
        transfer: "IU Kelley → NYU Stern (Fall '25)",
        major: "Finance",
        goal: "Investment Banking",
      },
      bio: "After successfully navigating the highly competitive lateral transfer from Indiana University's Kelley School of Business to NYU Stern, Krissh founded Vita Prep to demystify the elite transfer process. He specializes in helping students from Top-50 programs articulate why a pivot to New York City is essential for their career trajectory.",
      specialties: ["Lateral Transfers", "Banking Recruitment", "Kelley-to-Stern Pipeline"]
    },
    {
      id: "arnav",
      name: "Arnav Raghuvanshi",
      role: "Co-Founder",
      image: "/arnavr.jpg",
      stats: {
        transfer: "UMass Amherst → NYU Stern (Fall '25)",
        major: "Finance",
        goal: "Wealth Management",
      },
      bio: "Arnav’s journey from a large public state school at UMass Amherst to the heart of Greenwich Village serves as the blueprint for Vita Prep's operational strategy. He focuses on the 'Total Candidate' approach—ensuring that high GPAs are matched with a compelling 'Why Transfer' narrative that resonates with Stern's admissions committee.",
      specialties: ["Public-to-Private Pivots", "Portfolio Management", "Strategic Positioning"]
    }
  ];

  return (
    <div className="about-us-page">
      <header className="about-us-hero">
        <h1 className="about-us-hero-title">The Founders</h1>
        <p className="about-us-hero-subtitle">Student-led guidance rooted in proven success.</p>
        <div className="about-us-accent-line"></div>
      </header>

      {founders.map((founder, index) => (
        <section 
          key={founder.id} 
          className={`about-us-founder-section ${index % 2 !== 0 ? 'about-us-reverse' : ''}`}
        >
          <div className="about-us-container">
            <div className="about-us-founder-grid">
              
              <div className="about-us-image-area">
                <div className="about-us-image-frame">
                  <img src={founder.image} alt={founder.name} className="about-us-img" />
                </div>
              </div>

              <div className="about-us-text-area">
                <h2 className="about-us-name">{founder.name}</h2>
                <h3 className="about-us-role">{founder.role}</h3>
                
                {/* Background Stats Grid */}
                <div className="about-us-stats-grid">
                  <div className="about-us-stat-item">
                    <strong>Path </strong>
                    <span>{founder.stats.transfer}</span>
                  </div>
                  <div className="about-us-stat-item">
                    <strong>Major </strong>
                    <span>{founder.stats.major}</span>
                  </div>
                  <div className="about-us-stat-item">
                    <strong>Future </strong>
                    <span>{founder.stats.goal}</span>
                  </div>
                </div>

                <p className="about-us-bio">{founder.bio}</p>

                <div className="about-us-specialties">
                  {founder.specialties.map((spec, i) => (
                    <span key={i} className="about-us-spec-pill">{spec}</span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>
      ))}
    </div>
  );
}