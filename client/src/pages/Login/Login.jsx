import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ---- 1) Firebase login via REST ----
  const firebaseLogin = async (email, password) => {
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${import.meta.env.VITE_FIREBASE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) throw new Error(data.error?.message || "Login failed!");

    return data; // contains idToken + localId + email
  };

  // ---- 2) Fetch role from Firestore REST ----
  const fetchUserRole = async (uid) => {
    const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;

    const res = await fetch(
      `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/users/${uid}`
    );

    const data = await res.json();

    if (!data.fields || !data.fields.role)
      throw new Error("User role not found");

    return data.fields.role.stringValue;
  };

  // ---- 3) Handle form submit ----
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Firebase login
      const firebaseData = await firebaseLogin(email, password);

      const idToken = firebaseData.idToken;
      const uid = firebaseData.localId;

      // Get user role from Firestore
      const role = await fetchUserRole(uid);

      // Store auth data
      localStorage.setItem("token", idToken);
      localStorage.setItem("uid", uid);
      localStorage.setItem("role", role);

      // Call parent handler (navigate to admin, etc.)
      onLogin();
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-page">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Admin Login</h2>

        {error && <p className="login-error">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
