// src/components/StudentDetails/StudentDetails.jsx
import { useState } from "react";
import {
  Phone,
  Mail,
  Calendar,
  Trophy,
  Target,
  FileText,
  User,
  GraduationCap,
} from "lucide-react";
import "./StudentDetails.css";

const tabs = [
  { id: "overview", label: "Overview", icon: User },
  { id: "academics", label: "Academics", icon: GraduationCap },
  { id: "colleges", label: "Colleges", icon: Target },
  { id: "activities", label: "Activities", icon: Trophy },
  { id: "notes", label: "Notes", icon: FileText },
];

export default function StudentDetail({ student, onPlanChange }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [editingPlan, setEditingPlan] = useState(false);
  const [plan, setPlan] = useState(student.plan || "");

  const {
    firstName,
    lastName,
    email,
    phone,
    gpa,
    sat,
    act,
    colleges = "",
    extracurriculars = "",
    notes = "",
    timestamp
  } = student;

  const collegeList = colleges.split(",").filter(Boolean);

  // ========================================
  // 🔥 Save plan to backend (includes token)
  // ========================================
  const savePlan = async () => {
    try {
      const token = localStorage.getItem("token");

      const fullName = `${firstName} ${lastName}`.trim();

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/update-plan`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            studentId: student.id,
            name: fullName,
            email: email,
            plan: plan
          })
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to update plan.");

      // Update parent
      onPlanChange({ ...student, plan });

      setEditingPlan(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const planLabel = (plan) => {
    if (!plan) return "Free Tier";
    return plan.charAt(0).toUpperCase() + plan.slice(1);
  };

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

            <span className={`plan-tag plan-${plan || "lead"}`}>
              {planLabel(plan)}
            </span>
          </h2>

          <div className="detail-meta">
            <span><Mail size={14} /> {email}</span>
            {phone && <span><Phone size={14} /> {phone}</span>}
            <span>
              <Calendar size={14} /> Joined{" "}
              {new Date(timestamp || Date.now()).toLocaleDateString()}
            </span>
          </div>

          {/* Edit Plan */}
          {!editingPlan ? (
            <button className="edit-plan-btn" onClick={() => setEditingPlan(true)}>
              Edit Plan
            </button>
          ) : (
            <div className="plan-edit-box">
              <select value={plan} onChange={(e) => setPlan(e.target.value)}>
                <option value="basic">Free Tier</option>
                <option value="starter">Starter</option>
                <option value="growth">Growth</option>
                <option value="premium">Premium</option>
              </select>

              <button onClick={savePlan} className="save-plan-btn">
                Save
              </button>

              <button
                className="cancel-plan-btn"
                onClick={() => setEditingPlan(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="detail-tabs">
        {tabs.map((tab) => {
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
                  {gpa && <div><strong>GPA:</strong> <span className="highlight">{gpa}</span></div>}
                  {sat && <div><strong>SAT:</strong> <span className="highlight">{sat}</span></div>}
                  {act && <div><strong>ACT:</strong> <span className="highlight">{act}</span></div>}
                </div>
              </div>

              <div className="info-card">
                <h4><Target size={18} /> Top 3 Dream Schools</h4>
                <ol className="college-list">
                  {collegeList.slice(0, 3).map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                  {collegeList.length > 3 && (
                    <li className="more">+ {collegeList.length - 3} more...</li>
                  )}
                </ol>
              </div>
            </div>
          </div>
        )}

        {activeTab === "academics" && (
          <div className="tab-pane">
            <h3>Academic Profile</h3>
            <div className="stats-large">
              {gpa ? <div><span>GPA</span> <strong>{gpa}</strong></div> : <p>No GPA yet</p>}
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
                    <span className="rank">#{i + 1}</span> {college}
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
              <p className="empty">No activities yet.</p>
            )}
          </div>
        )}

        {activeTab === "notes" && (
          <div className="tab-pane">
            <h3>Additional Notes</h3>
            {notes ? <p className="notes-text">{notes}</p> : <p className="empty">No notes yet.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
