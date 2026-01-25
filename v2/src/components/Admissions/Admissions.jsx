import "./Admissions.css";

export default function Admissions() {
  return (
    <section id="admissions" className="admissions-section">
      <div className="admissions-container">
        
        <header className="admissions-header">
          <div className="admissions-title-wrapper">
            <div className="admissions-line"></div>
            <h2 className="admissions-title">What Do Admissions Look For?</h2>
            <div className="admissions-line"></div>
          </div>
        </header>

        <div className="admissions-pillar-grid">
          {/* Pillar 01 */}
          <div className="pillar-column">
            <div className="pillar-header">
              <span className="pillar-number">01</span>
              <h3>Academic Trajectory</h3>
            </div>
            <ul className="pillar-list">
              <li>Upward GPA trends since high school graduation</li>
              <li>Mastery of major-specific prerequisite sequences</li>
              <li>Evidence of "Intellectual Vitality" beyond the syllabus</li>
              <li>Demonstrated momentum in college-level coursework</li>
            </ul>
          </div>

          {/* Pillar 02 */}
          <div className="pillar-column">
            <div className="pillar-header">
              <span className="pillar-number">02</span>
              <h3>Purposeful Narrative</h3>
            </div>
            <ul className="pillar-list">
              <li>Surgical explanation of the motivation to transfer</li>
              <li>Identification of specific institutional resources/faculty</li>
              <li>Alignment between target curriculum and career goals</li>
              <li>Evidence of matured academic and personal objectives</li>
            </ul>
          </div>

          {/* Pillar 03 */}
          <div className="pillar-column">
            <div className="pillar-header">
              <span className="pillar-number">03</span>
              <h3>Institutional Maturity</h3>
            </div>
            <ul className="pillar-list">
              <li>Active engagement in current campus or work spheres</li>
              <li>Evidence of leadership and community contribution</li>
              <li>Professional maturity reflected in personal statements</li>
              <li>Ready-to-contribute mindset for the new campus</li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}