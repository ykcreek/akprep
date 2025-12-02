// StudentDetails.jsx (modern UI)
import { useState } from "react";
import {
  Phone,
  Mail,
  CalendarDays,
  Trophy,
  Target,
  FileText,
  User2,
  GraduationCap,
  School,
} from "lucide-react";
import "./StudentDetails.css";

const tabs = [
  { id: "overview", label: "Overview", icon: User2 },
  { id: "academics", label: "Academics", icon: GraduationCap },
  { id: "colleges", label: "Colleges", icon: School },
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
    college,
    colleges = "",
    extracurriculars = "",
    notes = "",
    timestamp
  } = student;

  const collegeList = colleges.split(",").filter(Boolean);

  const savePlan = async () => {
    try {
      const token = localStorage.getItem("token");

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
            name: `${firstName} ${lastName}`.trim(),
            email,
            plan
          })
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update plan.");

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
    <div className="student-detail-modern">
      {/* ---------------------------------------------------- */}
      {/* HEADER */}
      {/* ---------------------------------------------------- */}
      <div className="detail-header-modern">
        <div className="detail-avatar-modern">
          {firstName[0]}{lastName[0]}
        </div>

        <div className="detail-header-info">
          <h2 className="detail-name-modern">
            {firstName} {lastName}
            <span className={`plan-tag-modern plan-${plan || "lead"}`}>
              {planLabel(plan)}
            </span>
          </h2>

          <div className="detail-meta-modern">
            <span><Mail size={16} /> {email}</span>
            {phone && <span><Phone size={16} /> {phone}</span>}
            <span><CalendarDays size={16} /> Joined {new Date(timestamp).toLocaleDateString()}</span>
          </div>

          {!editingPlan ? (
            <button className="edit-plan-btn-modern" onClick={() => setEditingPlan(true)}>
              Edit Plan
            </button>
          ) : (
            <div className="plan-edit-modern">
              <select value={plan} onChange={(e) => setPlan(e.target.value)}>
                <option value="basic">Free Tier</option>
                <option value="starter">Starter</option>
                <option value="growth">Growth</option>
                <option value="premium">Premium</option>
              </select>

              <button onClick={savePlan} className="save-plan-btn-modern">
                Save
              </button>

              <button className="cancel-plan-btn-modern" onClick={() => setEditingPlan(false)}>
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* TABS */}
      {/* ---------------------------------------------------- */}
      <div className="tabs-modern">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`tab-btn-modern ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ---------------------------------------------------- */}
      {/* TAB CONTENT */}
      {/* ---------------------------------------------------- */}
      <div className="tab-content-modern">

        {/* Overview */}
        {activeTab === "overview" && (
          <div className="overview-grid">
            <div className="card-modern">
              <h4 className="card-title-modern">
                <GraduationCap size={18} /> Academic Snapshot
              </h4>
              <div className="info-pairs-modern">
                {gpa && <div><strong>GPA:</strong> {gpa}</div>}
                {sat && <div><strong>SAT:</strong> {sat}</div>}
                {act && <div><strong>ACT:</strong> {act}</div>}
                {college && (
                  <div><strong>Current College:</strong> {college}</div>
                )}
              </div>
            </div>

            <div className="card-modern">
              <h4 className="card-title-modern"><School size={18} /> Dream Schools</h4>
              <ol className="college-list-modern">
                {collegeList.slice(0, 3).map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
                {collegeList.length > 3 && (
                  <li className="more">+ {collegeList.length - 3} more...</li>
                )}
              </ol>
            </div>
          </div>
        )}

        {/* Academics */}
        {activeTab === "academics" && (
          <div className="card-modern">
            <h3 className="card-title-modern">Academic Profile</h3>
            <div className="info-pairs-modern large">
              <div><span>GPA</span> <strong>{gpa || "N/A"}</strong></div>
              <div><span>SAT</span> <strong>{sat || "N/A"}</strong></div>
              <div><span>ACT</span> <strong>{act || "N/A"}</strong></div>
              <div><span>Current College</span> <strong>{college || "N/A"}</strong></div>
            </div>
          </div>
        )}

        {/* Colleges */}
        {activeTab === "colleges" && (
          <div className="card-modern">
            <h3 className="card-title-modern">Dream Schools</h3>
            {collegeList.length > 0 ? (
              <ul className="college-full-list-modern">
                {collegeList.map((college, i) => (
                  <li key={i}><span className="rank">#{i + 1}</span> {college}</li>
                ))}
              </ul>
            ) : <p className="empty-modern">No colleges listed.</p>}
          </div>
        )}

        {/* Activities */}
        {activeTab === "activities" && (
          <div className="card-modern">
            <h3 className="card-title-modern">Activities & Spikes</h3>
            {extracurriculars ? (
              <p className="text-modern">{extracurriculars}</p>
            ) : <p className="empty-modern">No activities provided.</p>}
          </div>
        )}

        {/* Notes */}
        {activeTab === "notes" && (
          <div className="card-modern">
            <h3 className="card-title-modern">Notes</h3>
            {notes ? <p className="text-modern">{notes}</p> : <p className="empty-modern">No notes yet.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
