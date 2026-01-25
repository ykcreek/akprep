import "./Services.css";

export default function Services() {
  const hourlyPoints = [
    "Live 1-on-1 editing via Google Meet & Docs",
    "Offline tracked feedback between sessions",
    "Personal statement & supplemental essays",
    "Theme, positioning & storytelling strategy",
    "Activity spikes, resume & LOCI guidance",
    "Recommendation letter strategy"
  ];
  const handlePayment = () => {
    window.location.href = "https://buy.stripe.com/14AaEXdqw12p40d5yB18c04";
  };
  return (
    <section id="services" className="services-section">
      <div className="services-container">
        
        <header className="services-header">
          <div className="services-title-wrapper">
            <div className="services-line"></div>
            <h2 className="services-title">Our Services & Pricing</h2>
            <div className="services-line"></div>
          </div>
        </header>

        <div className="services-content-wrapper">
          {/* Left: Hourly Consulting */}
          <div className="services-left-container">
            <div className="services-price-tag">
               <span className="services-currency">$</span>
               <span className="services-amount">40</span>
               <span className="services-unit">/hour</span>
            </div>
            
            <ul className="services-bullet-list">
              {hourlyPoints.map((point, index) => (
                <li key={index} className="services-bullet-item">
                  <span className="services-bullet-icon">→</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Starter Package */}
          <div className="services-right-container">
            <div className="services-package-card">
                <h3 className="services-package-title">Vita Prep Package</h3>
                <div className="services-package-price">$200</div>
                <p className="services-package-description">
                  5 Hours of online/offline time, used however you need.
                </p>
                <button className="services-package-button" onClick={handlePayment} >Get Started</button>
            </div>
            <p className="services-package-addon">Pay by the hour going forward</p>
          </div>
        </div>

      </div>
    </section>
  );
}