// src/components/StudentCard/StudentCard.jsx
import "./StudentCard.css";

export default function StudentCard({ student, onSelect, isSelected }) {
  const {
    firstName,
    lastName,
    email,
    gpa,
    sat,
    act,
    colleges,
    plan // <-- new field
  } = student;

  // Top college preview
  const topCollege = colleges?.split("\n")[0] || "No colleges listed";

  // Plan badge text
  const badge = plan
    ? plan                    // Example: "Starter", "Growth", "Premium"
    : "Free Tier";          // No plan chosen → intro stage

  // Badge class based on plan
  const badgeClass = plan ? "plan-badge existing" : "plan-badge new";

  return (
    <div
      className={`student-card ${isSelected ? "selected" : ""}`}
      onClick={onSelect}
    >
      <div className="card-header">
        <h3 className="student-name">
          {firstName} {lastName}

          {/* PLAN BADGE */}
          <span className={badgeClass}>{badge}</span>
        </h3>

        <p className="student-email">{email}</p>
      </div>

      <div className="card-body">
        <div className="stats-grid">
          {gpa && (
            <div className="stat">
              <span>GPA</span> <strong>{gpa}</strong>
            </div>
          )}
          {sat && (
            <div className="stat">
              <span>SAT</span> <strong>{sat}</strong>
            </div>
          )}
          {act && (
            <div className="stat">
              <span>ACT</span> <strong>{act}</strong>
            </div>
          )}
        </div>

        <div className="college-preview">
          <span className="label">Dream School</span>
          <p className="college-name">{topCollege}</p>
        </div>
      </div>

      <div className="card-glow"></div>
    </div>
  );
}
