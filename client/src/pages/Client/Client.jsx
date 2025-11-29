import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Client.css";

import FileUploader from "../../components/FileUploader/FileUploader";
import MessageBox from "../../components/MessageBox/MessageBox";
import PersonalInfo from "../../components/PersonalInfo/PersonalInfo";

export default function Client() {
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const uid = localStorage.getItem("uid");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("uid");
    localStorage.removeItem("role");

    navigate("/login");
  };

  useEffect(() => {
    const fetchStudentInfo = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/client/info`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ uid }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load profile.");

        setStudent(data.student);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchStudentInfo();
  }, [uid, token]);

  if (error) {
    return <div className="client-error">{error}</div>;
  }

  if (!student) {
    return <div className="client-loading">Loading your dashboard...</div>;
  }

  return (
    <div className="client-dashboard">

      {/* ---- TOP BAR WITH LOGOUT ---- */}
      <div className="client-topbar">
        <button
          className="client-logout"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("uid");
            localStorage.removeItem("role");
            window.location.href = "/login"; // redirect
          }}
        >
          Logout
        </button>
      </div>

      {/* ---- HEADER (CENTERED) ---- */}
      <div className="client-header">
        <h2>Welcome, {student.firstName}</h2>
        <p>Your personalized college consulting dashboard</p>

        {/* PLAN DISPLAY */}
        <div className={`client-plan-badge plan-${student.plan || "none"}`}>
          {student.plan ? student.plan.toUpperCase() : "No Plan Selected"}
        </div>
      </div>

      {/* ---- Personal Info ---- */}
      <PersonalInfo 
        student={student}
        documentId={student.id}
        onUpdate={setStudent}
      />

      {/* ---- FILE UPLOADER ---- */}
      <section className="client-section">
        <h3>Your Uploaded Files</h3>
        <FileUploader studentId={student.id} />
      </section>

      {/* ---- MESSAGES ---- */}
      <section className="client-section">
        <h3>Messages with Vita Prep Team</h3>
        <MessageBox studentId={student.id} />
      </section>

    </div>
  );
}
