import { useState } from "react";
import "./PersonalInfo.css";

export default function PersonalInfo({ student, documentId, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...student });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/client/update-profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            documentId,
            phone: form.phone,
            gpa: form.gpa,
            sat: form.sat,
            act: form.act,
            extracurriculars: form.extracurriculars,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Update failed");

      onUpdate(data.student);
      setEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (editing) {
    return (
      <section className="personal-info-section">
        <h3>Edit Profile</h3>

        {error && <p className="pi-error">{error}</p>}

        <div className="pi-form-grid">
          {/* ===== LOCKED FIELDS ===== */}
          <div>
            <label>First Name (locked)</label>
            <input value={form.firstName || ""} disabled className="pi-locked" />
          </div>

          <div>
            <label>Last Name (locked)</label>
            <input value={form.lastName || ""} disabled className="pi-locked" />
          </div>

          <div>
            <label>Email (locked)</label>
            <input value={form.email || ""} disabled className="pi-locked" />
          </div>

          {/* ===== EDITABLE FIELDS ===== */}
          <div>
            <label>Phone</label>
            <input
              name="phone"
              value={form.phone || ""}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>GPA</label>
            <input name="gpa" value={form.gpa || ""} onChange={handleChange} />
          </div>

          <div>
            <label>SAT</label>
            <input name="sat" value={form.sat || ""} onChange={handleChange} />
          </div>

          <div>
            <label>ACT</label>
            <input name="act" value={form.act || ""} onChange={handleChange} />
          </div>

          <div className="pi-full">
            <label>Extracurriculars</label>
            <textarea
              name="extracurriculars"
              value={form.extracurriculars || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="pi-buttons">
          <button onClick={saveProfile} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <button className="pi-cancel" onClick={() => setEditing(false)}>
            Cancel
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="personal-info-section">
      <h3>Personal Information</h3>

      <div className="pi-grid">
        <div>
          <strong>Name:</strong> {student.firstName} {student.lastName}
        </div>
        <div>
          <strong>Email:</strong> {student.email}
        </div>
        <div>
          <strong>Phone:</strong> {student.phone || "—"}
        </div>
        <div>
          <strong>GPA:</strong> {student.gpa || "—"}
        </div>
        <div>
          <strong>SAT:</strong> {student.sat || "—"}
        </div>
        <div>
          <strong>ACT:</strong> {student.act || "—"}
        </div>
        <div className="pi-full">
          <strong>Extracurriculars:</strong> {student.extracurriculars || "—"}
        </div>
      </div>

      <button className="pi-edit-button" onClick={() => setEditing(true)}>
        Edit Profile
      </button>
    </section>
  );
}
