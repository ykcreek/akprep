import './Services.css'

export default function Services() {
  return (
    <section id="services" className="services-section">
      <div className="container">

        {/* Centered & Refined Header */}
        <div className="services-header">
          <h2 className="section-title">Services & Pricing</h2>
          <p className="section-sub">
            Every package includes school list strategy, essay calendars, weekly check-ins, and fast feedback. Hourly add-ons available.
          </p>
        </div>

        {/* Feature Tags */}
        <div className="feature-grid">
          <div className="feature">
            <strong>Essay Essentials</strong>
            <span>Strong structure. Clear voice. Better essays.</span>
          </div>
          <div className="feature">
            <strong>Application Review</strong>
            <span>A sharper, stronger application — reviewed, refined, and ready to submit.</span>
          </div>
          <div className="feature">
            <strong>Guidance & Strategy</strong>
            <span>Guidance that sharpens your LORs, clubs, and transfer story.</span>
          </div>
        </div>

        {/* Pricing Layout */}
        <div className="pricing-layout">
          <div className="session-card">
            <h3>Description of sessions</h3>
            <div className="session-price">$80 <span>/ hour</span></div>
            <ul className="features-list">
              <li>Live 1-on-1 editing via Google Meet & Docs</li>
              <li>Offline tracked feedback between sessions</li>
              <li>Personal statement & supplemental essays</li>
              <li>Theme, positioning & storytelling strategy</li>
              <li>Activity spikes, resume & LOCI guidance</li>
              <li>Recommendation letter strategy</li>
            </ul>
          </div>

          <div className="pack-grid">
            {[
              { title: "Starter Pack – 5 hours", desc: "5 hours of online/offline time, used however you need" },
              { title: "Growth Pack – 10 hours", desc: "10 hours total, including 1 bonus hour" },
              { title: "Premium Pack – 20 hours", desc: "20 hours total, including 4 bonus hours", rate: "($67/hour)" }
            ].map((pack, i) => (
              <div key={i} className="pack">
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
  )
}