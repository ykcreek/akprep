import "./Admissions.css";

export default function Admissions() {
  return (
    <section id="admissions" className="admissions-section">
      <div className="admissions-container">
        
        <header className="admissions-header">
          <h2 className="admissions-title">What Do Admissions Look For?</h2>
          <div className="admissions-accent-line"></div>
        </header>

        {/* Gray placeholder for your future image */}
        <div className="admissions-picture-container">
          <div className="admissions-picture-placeholder">
            <span className="admissions-placeholder-text">Admissions Analysis Graphic Placeholder</span>
          </div>
        </div>

      </div>
    </section>
  );
}