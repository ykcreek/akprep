import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, FileUp, MessageSquare, ShieldCheck } from "lucide-react";
import Loading from "../../pages/Loading/Loading"; // Path to your professional loader
import "./Client.css";

export default function Client() {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Start in loading state

  const token = localStorage.getItem("token");
  const uid = localStorage.getItem("uid");

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

      if (res.status === 401) {
        localStorage.clear();
        navigate("/login", { replace: true });
        return;
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load profile.");

      // Add a professional delay so the brand animation is visible
      setTimeout(() => {
        setStudent(data.student);
        setLoading(false);
      }, 1500);

    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && uid) {
      fetchStudentInfo();
    } else {
      // If no credentials, don't just hang—send back to login
      navigate("/login");
    }
  }, [uid, token, navigate]);

  // Handle Global Loader State
  if (loading) return <Loading />;

  // Handle Error State
  if (error) {
    return (
      <div className="client-error-container">
        <p>System Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry Connection</button>
      </div>
    );
  }

  // Fallback for missing data
  const displayUser = student || {
    firstName: "Student",
    institution: "Pending...",
    gpa: "—",
    plan: "Standard",
    email: "—"
  };

  return (
    <div className="client-portal-container">
      <header className="portal-header">
        <div className="list-title-wrapper">
          <div className="list-line"></div>
          <h1>Student Dashboard</h1>
          <div className="list-line"></div>
        </div>
        <p>Welcome, {displayUser.firstName}. Your personalized college consulting portal.</p>
      </header>

      <div className="portal-grid">
        {/* Left Column: Academic Profile */}
        <section className="portal-section profile-info">
          <div className="section-header-line">
            <h3><User size={16} /> Academic Profile</h3>
            <div className="thin-line"></div>
          </div>
          
          <div className="profile-summary-card">
            <div className="info-row">
              <label>Current Institution</label>
              <p>{displayUser.institution}</p>
            </div>
            <div className="info-row-grid">
              <div className="info-row">
                <label>GPA</label>
                <p className="highlight-purple">{displayUser.gpa}</p>
              </div>
              <div className="info-row">
                <label>Tier</label>
                <p className="status-badge">
                   <ShieldCheck size={12} /> {(displayUser.plan || "Standard").toUpperCase()}
                </p>
              </div>
            </div>
            <div className="info-row">
              <label>Consultancy Email</label>
              <p>{displayUser.email}</p>
            </div>
          </div>
        </section>

        {/* Right Column: Interaction Modules */}
        <div className="interaction-column">
          <section className="portal-section">
            <div className="section-header-line">
              <h3><FileUp size={16} /> Document Locker</h3>
              <div className="thin-line"></div>
            </div>
            <div className="module-placeholder">
              <div className="lock-overlay">
                <p>Upload System Initializing</p>
                <span>Secure file transfer for transcripts will be available shortly.</span>
              </div>
              <button className="disabled-action-btn" disabled>
                <FileUp size={18} /> Upload New Document
              </button>
            </div>
          </section>

          <section className="portal-section">
            <div className="section-header-line">
              <h3><MessageSquare size={16} /> Message Center</h3>
              <div className="thin-line"></div>
            </div>
            <div className="module-placeholder">
              <div className="lock-overlay">
                <p>Direct Messaging Pending</p>
                <span>Communication with the Vita Prep team is being provisioned.</span>
              </div>
              <div className="skeleton-chat">
                <div className="skeleton-bubble"></div>
                <div className="skeleton-bubble user"></div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <footer className="portal-footer">
        <p>Vita Prep Secure Student Access • Authorized Personnel Only</p>
      </footer>
    </div>
  );
}