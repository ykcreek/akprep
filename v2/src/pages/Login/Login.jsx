import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, AlertCircle } from "lucide-react";
import Loading from "../../pages/Loading/Loading"; 
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Clean helper for Firebase Auth
  const firebaseLogin = async (email, password) => {
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${import.meta.env.VITE_FIREBASE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, returnSecureToken: true })
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || "Login failed!");
    return data;
  };

  // Clean helper for Firestore Role
  const fetchUserRole = async (uid) => {
    const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
    const res = await fetch(
      `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/users/${uid}`
    );
    const data = await res.json();
    if (!data.fields?.role) throw new Error("User role not found");
    return data.fields.role.stringValue;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Authenticate and get role
      const firebaseData = await firebaseLogin(email, password);
      const idToken = firebaseData.idToken;
      const uid = firebaseData.localId;
      const role = await fetchUserRole(uid);

      // 2. Add the professional delay before finishing
      setTimeout(() => {
        // Update global state
        login(idToken, uid, role);

        // Redirect based on role
        if (role === "admin") navigate("/admin");
        else navigate("/client");
      }, 1500); // 1.5 second delay to show off the Vita Prep animation

    } catch (err) {
      // Handle errors and stop loading so user can try again
      const cleanError = err.message.replace(/_/g, " ").toLowerCase();
      setError(cleanError.includes("invalid password") ? "Invalid email or password." : err.message);
      setLoading(false); 
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="login-page-container">
      <div className="login-card-wrapper">
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-brand">VITA<span>PREP</span></h1>
            <p className="login-subtitle">Member Portal</p>
          </div>

          {error && (
            <div className="login-error-box">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-input-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="name@vitaprep.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="login-input-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button type="submit" className="login-submit-btn">
              Sign In
            </button>
          </form>

          <footer className="login-card-footer">
            <p>Login credentials will be provided to you upon service enrollment.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}