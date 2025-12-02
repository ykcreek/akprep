// src/pages/Login/Login.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

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

    try {
      const firebaseData = await firebaseLogin(email, password);
      const idToken = firebaseData.idToken;
      const uid = firebaseData.localId;

      const role = await fetchUserRole(uid);

      // Update global state
      login(idToken, uid, role);

      // Route based on role
      if (role === "admin") navigate("/admin");
      else navigate("/client");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-page">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="login-error">{error}</p>}

        <input type="email" required value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" required value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
