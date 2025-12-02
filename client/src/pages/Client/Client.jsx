import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Client.css";

import FileUploader from "../../components/FileUploader/FileUploader";
import MessageBox from "../../components/MessageBox/MessageBox";
import PersonalInfo from "../../components/PersonalInfo/PersonalInfo";

export default function Client() {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const uid = localStorage.getItem("uid");

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

        // 🔥 If token is expired or invalid → redirect to login
        if (res.status === 401) {
          localStorage.clear();
          navigate("/login", { replace: true });
          return;
        }

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to load profile.");

        setStudent(data.student);

      } catch (err) {
        setError(err.message);
      }
    };

    fetchStudentInfo();
  }, [uid, token, navigate]);

  if (error) {
    return <div className="client-error">{error}</div>;
  }

  if (!student) {
    return <div className="client-loading">Loading your dashboard...</div>;
  }

  return (
    <div className="client-dashboard">

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
