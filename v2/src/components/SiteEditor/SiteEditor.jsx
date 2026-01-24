import { Hammer, Layout, Type, Image as ImageIcon, Save } from "lucide-react";
import "./SiteEditor.css";

export default function SiteEditor() {
  return (
    <div className="site-editor-container">
      {/* Header with Signature Lines */}
      <header className="editor-header">
        <div className="list-title-wrapper">
          <div className="list-line"></div>
          <h1>Site Content Editor</h1>
          <div className="list-line"></div>
        </div>
        <p>Modify public-facing content and institutional branding.</p>
      </header>

      {/* Placeholder Grid */}
      <div className="editor-placeholder-grid">
        <div className="placeholder-card main-preview">
          <div className="construction-overlay">
            <Hammer size={48} className="pulse-icon" />
            <h2>Editor Under Construction</h2>
            <p>We are currently architecting the live-preview engine for the Vita Prep landing page.</p>
          </div>
          
          {/* Faded background representation of a form */}
          <div className="skeleton-form">
            <div className="skeleton-line header"></div>
            <div className="skeleton-line body"></div>
            <div className="skeleton-line body"></div>
            <div className="skeleton-line body"></div>
          </div>
        </div>

        <div className="editor-sidebar-controls">
          <section className="control-group">
            <div className="section-header-line">
              <h3>Available Modules</h3>
              <div className="thin-line"></div>
            </div>
            
            <div className="module-item disabled">
              <Type size={18} /> <span>Hero Typography</span>
            </div>
            <div className="module-item disabled">
              <ImageIcon size={18} /> <span>Brand Imagery</span>
            </div>
            <div className="module-item disabled">
              <Layout size={18} /> <span>Service Packages</span>
            </div>
          </section>

          <button className="save-placeholder-btn" disabled>
            <Save size={18} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}