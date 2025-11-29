import { useState, useEffect } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [documentId, setDocumentId] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ---- Get docId from URL ----
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const doc = query.get("docId");

    if (doc) setDocumentId(doc);
    else setError("Missing required signup link parameter.");
  }, []);

  // ---- Submit signup ----
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log("Submitting signup with docID:", documentId);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          email: email,
          password: password,
          documentId: documentId,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");

      console.log("Signup successful:", data);
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message);
    }
  };

  return (
    <div className="signup-page">
      <form className="signup-box" onSubmit={handleSubmit}>
        <h2>Create Your Account</h2>

        {error && <p className="signup-error">{error}</p>}

        {!error && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Create Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Hidden field just for debugging */}
            <input type="hidden" name="documentId" value={documentId} />

            <button type="submit">Create Account</button>
          </>
        )}
      </form>
    </div>
  );
}
