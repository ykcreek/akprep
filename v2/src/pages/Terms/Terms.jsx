import "./Terms.css";

export default function Terms() {
  const lastUpdated = "January 23, 2026";

  return (
    <div className="terms-page-container">
      <header className="terms-header">
        <div className="list-title-wrapper">
          <div className="list-line"></div>
          <h1>Terms of Service</h1>
          <div className="list-line"></div>
        </div>
        <p className="terms-subtitle">Consultancy Agreement & Operational Standards</p>
      </header>

      <div className="terms-body">
        <p className="last-updated">Last Revised: {lastUpdated}</p>
        
        <p className="terms-intro">
          By engaging with Vita Prep services, you agree to the following institutional 
          standards. These terms ensure a transparent and secure relationship between 
          our consultancy and our students.
        </p>

        <section className="terms-section">
          <div className="section-header-line">
            <h3>01. Candidate Selection</h3>
            <div className="thin-line"></div>
          </div>
          <p>
            Vita Prep reserves the right to be selective in our client intake. We choose 
            candidates based on our internal assessment of their profile and our ability 
            to provide meaningful value to their specific transfer journey. Engagement 
            is subject to consultant availability and candidate fit.
          </p>
        </section>

        <section className="terms-section">
          <div className="section-header-line">
            <h3>02. Admissions Disclaimer</h3>
            <div className="thin-line"></div>
          </div>
          <p>
            While we provide expert strategy and guidance, <strong>Vita Prep does not 
            guarantee admission</strong> to any specific college or university. Admissions 
            decisions are made solely by the respective institutions. Our role is to 
            maximize the strength of your application, not to promise a final result.
          </p>
        </section>

        <section className="terms-section warning-section">
          <div className="section-header-line">
            <h3>03. Payment Security & Fraud Prevention</h3>
            <div className="thin-line"></div>
          </div>
          <p>
            To protect our students from fraud, please be advised that 
            <strong> all payments must be directed only to the official founding members </strong> 
            via our verified payment portals. No third party or unverified consultant is 
            authorized to collect funds on behalf of Vita Prep. If you are approached by anyone 
            else requesting payment, please report it immediately to our administrative team.
          </p>
        </section>

        <section className="terms-section">
          <div className="section-header-line">
            <h3>04. Conduct & Academic Integrity</h3>
            <div className="thin-line"></div>
          </div>
          <p>
            We uphold the highest standards of academic integrity. We assist in the strategy, 
            editing, and refinement of student-written content. We do not write essays or 
            complete applications on behalf of students.
          </p>
        </section>

        <footer className="terms-footer">
          <p>Official Terms of Vita Prep Consultancy • <strong>service.vitaprep@gmail.com</strong></p>
        </footer>
      </div>
    </div>
  );
}