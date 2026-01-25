import "./Results.css";

export default function Results() {
  const colleges = [
    { name: "NYU Stern", logo: "/logos/nyu.avif" },
    { name: "IU Kelley", logo: "/logos/kelley.png" },
    { name: "UVA", logo: "/logos/uva.png" },
    { name: "Purdue", logo: "/logos/purdue.png" },
    { name: "UPenn", logo: "/logos/penn.png" },
    { name: "UMass Amherst", logo: "/logos/umass.jpg" },
    { name: "UMich", logo: "/logos/umich.png" },
    { name: "Vanderbilt", logo: "/logos/vandy.png" },
  ];

  return (
    <section id="results" className="results-section">
      <div className="results-container">
        <header className="results-header">
          <h3 className="results-subtitle">Proven Results</h3>
          <h2 className="results-title">Our Community of Acceptances</h2>
        </header>

        <div className="results-logo-grid">
          {colleges.map((college, index) => (
            <div key={index} className="results-logo-item">
              {/* If image doesn't exist yet, it shows the name as a placeholder */}
              <img 
                src={college.logo} 
                alt={`${college.name} Logo`} 
                className="results-logo-img" 
                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}