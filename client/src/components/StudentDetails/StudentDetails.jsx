// src/components/StudentDetails/StudentDetails.jsx
import { useState } from "react";
import { Phone, Mail, MapPin, Calendar, Trophy, Target, FileText, User, GraduationCap, Clock } from "lucide-react";
import "./StudentDetails.css";

const tabs = [
  { id: "overview", label: "Overview", icon: User },
  { id: "academics", label: "Academics", icon: GraduationCap },
  { id: "colleges", label: "Colleges", icon: Target },
  { id: "activities", label: "Activities", icon: Trophy },
  { id: "notes", label: "Notes", icon: FileText },
];

export default function StudentDetail({ student }) {
  const [activeTab, setActiveTab] = useState("overview");

  const {
    firstName, lastName, email, phone, gpa, sat, act, college,
    colleges = "", extracurriculars = "", notes = "",
    hasSpoken, timestamp
  } = student;

  const collegeList = colleges.split(",").filter(Boolean);

  return (
    <div className="student-detail">
      {/* Header */}
      <div className="detail-header">
        <div className="detail-avatar">
          {firstName[0]}{lastName[0]}
        </div>
        <div>
          <h2 className="detail-name">
            {firstName} {lastName}
            {hasSpoken && <span className="spoken-tag">Spoken</span>}
          </h2>
          <div className="detail-meta">
            <span><Mail size={14} /> {email}</span>
            {phone && <span><Phone size={14} /> {phone}</span>}
            <span><Calendar size={14} /> Joined {new Date(timestamp || Date.now()).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="detail-tabs">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "overview" && (
          <div className="tab-pane">
            <div className="info-grid">
              <div className="info-card">
                <h4><GraduationCap size={18} /> Academic Snapshot</h4>
                <div className="stats">
                  {college && <div><strong>Current College or University</strong> <span className="highlight">{college}</span></div>}
                  {gpa && <div><strong>GPA</strong> <span className="highlight">{gpa}</span></div>}
                  {sat && <div><strong>SAT</strong> <span className="highlight">{sat}</span></div>}
                  {act && <div><strong>ACT</strong> <span className="highlight">{act}</span></div>}
                </div>
              </div>

              <div className="info-card">
                <h4><Target size={18} /> Top 3 Dream Schools</h4>
                <ol className="college-list">
                  {collegeList.slice(0, 3).map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                  {collegeList.length > 3 && <li className="more">+ {collegeList.length - 3} more...</li>}
                </ol>
              </div>
            </div>
          </div>
        )}

        {activeTab === "academics" && (
          <div className="tab-pane">
            <h3>Academic Profile</h3>
            <div className="stats-large">
              {gpa ? <div><span>GPA</span> <strong>{gpa}</strong></div> : <p>No GPA provided</p>}
              {sat ? <div><span>SAT</span> <strong>{sat}</strong></div> : <p>No SAT</p>}
              {act ? <div><span>ACT</span> <strong>{act}</strong></div> : <p>No ACT</p>}
            </div>
          </div>
        )}

        {activeTab === "colleges" && (
          <div className="tab-pane">
            <h3>Dream Schools ({collegeList.length})</h3>
            {collegeList.length > 0 ? (
              <ul className="college-full-list">
                {collegeList.map((college, i) => (
                  <li key={i}>
                    <span className="rank">#{i + 1}</span>
                    {college}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty">No colleges listed yet.</p>
            )}
          </div>
        )}

        {activeTab === "activities" && (
          <div className="tab-pane">
            <h3>Activities & Spikes</h3>
            {extracurriculars ? (
              <p className="activities-text">{extracurriculars}</p>
            ) : (
              <p className="empty">No activities shared yet.</p>
            )}
          </div>
        )}

        {activeTab === "notes" && (
          <div className="tab-pane">
            <h3>Additional Notes</h3>
            {notes ? (
              <p className="notes-text">{notes}</p>
            ) : (
              <p className="empty">No additional notes.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}