import { X, FileText, ExternalLink, Paperclip } from "lucide-react";
import "./StudentModal.css";

export default function StudentModal({ student, isOpen, onClose }) {
  if (!isOpen || !student) return null;

  // Logic for the file preview (assuming the URL is provided in the sheet)
  const fileUrl = student["Resume/Transcript Link"] || null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content full-screen-modal" onClick={(e) => e.stopPropagation()}>
        
        {/* Top Navigation Bar */}
        <div className="modal-top-nav">
          <div className="brand-context">Vita Prep • Student Profile</div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} /> <span>Close</span>
          </button>
        </div>

        <div className="modal-inner-scroll">
          {/* Main Profile Heading */}
          <header className="modal-sheet-header">
            <div className="list-title-wrapper">
              <div className="list-line"></div>
              <h1>{student["First Name"]} {student["Last Name"]}</h1>
              <div className="list-line"></div>
            </div>
            <div className="subtitle-grid">
              <span>{student["Email Address"]}</span>
              <span className="separator">|</span>
              <span>{student["Phone Number"] || "No Phone"}</span>
              <span className="separator">|</span>
              <span>Submitted: {new Date(student["Timestamp"]).toLocaleDateString()}</span>
            </div>
          </header>

          <div className="profile-main-grid">
            {/* Left Column: Data Grid */}
            <div className="data-column">
              <section className="profile-section">
                <div className="section-header-line">
                  <h3>Academic Credentials</h3>
                  <div className="thin-line"></div>
                </div>
                <div className="academic-grid-cards">
                  <div className="data-card">
                    <label>Current Institution</label>
                    <p>{student["Current College or University"]}</p>
                  </div>
                  <div className="data-card small">
                    <label>Cumulative GPA</label>
                    <p className="highlight-purple">{student["GPA"]}</p>
                  </div>
                  <div className="data-card small">
                    <label>SAT/ACT Score</label>
                    <p>{student["SAT or ACT Score"] || "N/A"}</p>
                  </div>
                </div>
              </section>

              <section className="profile-section">
                <div className="section-header-line">
                  <h3>Strategic Objectives</h3>
                  <div className="thin-line"></div>
                </div>
                <div className="data-card">
                  <label>Target Schools</label>
                  <p>{student["What Schools Are You Considering?"]}</p>
                </div>
                <div className="data-card mt-16">
                  <label>Consultant Preference</label>
                  <p>{student["Do you have a specific consultant preference?"] || "None"}</p>
                </div>
              </section>

              <section className="profile-section">
                <div className="section-header-line">
                  <h3>Narrative & Background</h3>
                  <div className="thin-line"></div>
                </div>
                <div className="narrative-content">
                  {student["Notable Extracurriculars or Awards"]}
                </div>
              </section>
            </div>

            {/* Right Column: File Preview */}
            <div className="preview-column">
              <div className="section-header-line">
                <h3>Document Preview</h3>
                <div className="thin-line"></div>
              </div>
              <div className="file-preview-container">
                {fileUrl ? (
                  <iframe 
                    src={fileUrl.replace("/view", "/preview")} 
                    title="Document Preview"
                    className="document-iframe"
                  />
                ) : (
                  <div className="no-file-placeholder">
                    <Paperclip size={32} />
                    <p>No attached documents (Resume/Transcripts) found for this entry.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <footer className="modal-footer-sticky">
           <button className="footer-btn-outline" onClick={onClose}>Exit View</button>
           <button className="footer-btn-solid">Update Record Status</button>
        </footer>
      </div>
    </div>
  );
}