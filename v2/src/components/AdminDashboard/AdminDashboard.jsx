import { useState } from "react";
import { Users, TrendingUp, DollarSign, Calendar as CalIcon, Mail, ArrowUpRight, X, ChevronRight } from "lucide-react";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [activeOverlay, setActiveOverlay] = useState(null); // 'calendar' or 'email'

  const closeOverlay = () => setActiveOverlay(null);

  return (
    <div className="dashboard-container">
      {/* ... Previous Header and Metrics Grid remain same ... */}
      <header className="dashboard-header">
        <div className="list-title-wrapper">
          <div className="list-line"></div>
          <h1>Strategic Overview</h1>
          <div className="list-line"></div>
        </div>
        <p>Vita Prep Performance & Operations</p>
      </header>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon"><Users size={20} /></div>
          <div className="metric-data">
            <label>Current Members</label>
            <h3>142</h3>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon"><TrendingUp size={20} /></div>
          <div className="metric-data">
            <label>New</label>
            <h3 className="highlight-green">+12</h3>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon"><DollarSign size={20} /></div>
          <div className="metric-data">
            <label>Quarterly Profit</label>
            <h3>$42,850</h3>
          </div>
        </div>
        <div className="metric-card highlight-card">
          <div className="metric-icon"><CalIcon size={20} /></div>
          <div className="metric-data">
            <label>Next Appointment</label>
            <h3>Today, 4:00 PM</h3>
            <span className="sub-text">Jane Doe • Strategy</span>
          </div>
        </div>
      </div>

      <div className="operations-layout">
        <section className="overlay-section">
          <div className="section-title-line">
            <h3>Management Centers</h3>
            <div className="thin-line"></div>
          </div>
          
          <div className="action-grid">
            {/* Calendar Trigger */}
            <div className="overlay-preview" onClick={() => setActiveOverlay('calendar')}>
              <div className="overlay-header">
                <CalIcon size={16} /> <span>Open Scheduling</span>
                <ChevronRight size={16} />
              </div>
              <p>View upcoming bookings and manage consultant availability.</p>
            </div>

            {/* Email Trigger */}
            <div className="overlay-preview" onClick={() => setActiveOverlay('email')}>
              <div className="overlay-header">
                <Mail size={16} /> <span>Open Inbox</span>
                <ChevronRight size={16} />
              </div>
              <p>Review student inquiries and respond to active leads.</p>
            </div>
          </div>
        </section>

        <section className="activity-section">
          <div className="section-title-line">
            <h3>Recent Activity</h3>
            <div className="thin-line"></div>
          </div>
          <ul className="activity-list">
            <li>
              <span className="dot"></span>
              <p>New lead: <strong>Michael Chen</strong></p>
              <span className="time">2h ago</span>
            </li>
          </ul>
        </section>
      </div>

      {/* --- SLIDE-OVER OVERLAY --- */}
      {activeOverlay && (
        <div className="dashboard-overlay-root">
          <div className="overlay-backdrop" onClick={closeOverlay}></div>
          <div className="overlay-panel">
            <div className="overlay-panel-header">
              <h3>{activeOverlay === 'calendar' ? 'Cal.com Management' : 'Admin Inbox'}</h3>
              <button onClick={closeOverlay} className="close-panel-btn"><X size={20} /> Close</button>
            </div>
            <div className="overlay-iframe-container">
              {activeOverlay === 'calendar' ? (
                <iframe 
                  src="https://cal.com/vita-prep-cb06c0/intro-call" 
                  title="Calendar"
                  className="admin-iframe"
                />
              ) : (
                <iframe 
                  src="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=service.vitaprep@gmail.com" 
                  title="Gmail"
                  className="admin-iframe"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}