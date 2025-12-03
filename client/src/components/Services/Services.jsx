import './Services.css'

export default function Services({ content }) {
  if (!content) return null;

  return (
    <section id="services" className="services-section">
      <div className="container">

        {/* Centered Header */}
        <div className="services-header">
          <h2 className="section-title">{content.title}</h2>
          <p className="section-sub">{content.sub}</p>
        </div>

        {/* Feature Tags */}
        <div className="feature-grid">
          {(content.features || []).map((feature, idx) => (
            <div key={idx} className="feature">
              <strong>{feature.name}</strong>
              <span>{feature.desc}</span>
            </div>
          ))}
        </div>

        {/* Pricing Layout */}
        <div className="pricing-layout">
          {/* Session Card */}
          {content.session && (
            <div className="session-card">
              <h3>{content.session.title}</h3>
              <div className="session-price">
                ${content.session.price} <span>/ hour</span>
              </div>
              <ul className="features-list">
                {(content.session.features || []).map((feat, idx) => (
                  <li key={idx}>{feat}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Packs */}
          <div className="pack-grid">
            {(content.packs || []).map((pack, idx) => (
              <div key={idx} className="pack">
                <div>
                  <h4 className="pack-title">
                    {pack.title}
                    {pack.rate && <span className="rate">{pack.rate}</span>}
                  </h4>
                  <p className="pack-desc">{pack.desc}</p>
                </div>
                <a href="/student-form" className="pack-btn">Book a Call</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
