import "./Privacy.css";

export default function Privacy() {
  const lastUpdated = "January 23, 2026";

  return (
    <div className="privacy-page-container">
      <header className="privacy-header">
        <div className="list-title-wrapper">
          <div className="list-line"></div>
          <h1>Privacy Policy</h1>
          <div className="list-line"></div>
        </div>
        <p className="privacy-subtitle">Institutional Data Handling & Privacy Standards</p>
      </header>

      <div className="privacy-body">
        <p className="last-updated">Effective Date: {lastUpdated}</p>
        
        <p className="privacy-intro">
          Vita Prep is committed to safeguarding the personal and academic information of our students. 
          This document describes our practices regarding the collection, storage, and protection of data 
          entrusted to us during the consultancy process.
        </p>

        <section className="privacy-section">
          <div className="section-header-line">
            <h3>01. Information Collection</h3>
            <div className="thin-line"></div>
          </div>
          <p>
            We collect academic records, standardized testing data, and personal narratives provided 
            voluntarily through our secure intake portals. This information is utilized exclusively 
             to develop transfer strategies and institutional applications.
          </p>
        </section>

        <section className="privacy-section">
          <div className="section-header-line">
            <h3>02. Security & Encryption</h3>
            <div className="thin-line"></div>
          </div>
          <p>
            Data is housed within encrypted environments provided by Google Cloud and Firebase. 
            Internal access is strictly governed by role-based permissions, ensuring that only 
            assigned consultants can view sensitive student documentation.
          </p>
        </section>

        <section className="privacy-section">
          <div className="section-header-line">
            <h3>03. Data Retention</h3>
            <div className="thin-line"></div>
          </div>
          <p>
            Academic data is retained for the duration of the consultancy engagement. Upon 
            completion of services or by student request, personal identifiable information 
            can be purged from our active records in accordance with standard compliance procedures.
          </p>
        </section>

        <footer className="privacy-footer">
          <p>Inquiries regarding privacy compliance: <strong>service.vitaprep@gmail.com</strong></p>
        </footer>
      </div>
    </div>
  );
}