import "./InterestForm.css";

export default function InterestForm() {
  return (
    <section className="gform-inlay-section">
      <div className="gform-inlay-container">
        
        {/* Replace the src with your actual Google Form embed link */}
        <iframe 
          src="https://docs.google.com/forms/d/e/1FAIpQLSfnJkY0IqROOqFqPGpUpQWTioM6He9EqT9sBfAQ-X_fO-yhkA/viewform?embedded=true" 
          width="100%" 
          height="1200" 
          frameBorder="0" 
          marginHeight="0" 
          marginWidth="0"
          className="gform-iframe"
          title="Vita Prep Intake Form"
        >
          Loading…
        </iframe>

        <div className="gform-inlay-footer">
          <p className="gform-disclaimer">
            Vita Prep provides advising only; we do not guarantee admission to any institution.
          </p>
        </div>
      </div>
    </section>
  );
}