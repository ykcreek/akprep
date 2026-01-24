// ProtectedRoute.jsx
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { loggedIn, role, logout } = useContext(AuthContext);
  const [checking, setChecking] = useState(true);
  const token = localStorage.getItem("token");
  const uid = localStorage.getItem("uid");

  useEffect(() => {
    const validateToken = async () => {
      if (!token || !uid) {
        logout();
        setChecking(false);
        return;
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ uid }),
      });

      if (res.status === 401) {
        logout();
      }

      setChecking(false);
    };

    validateToken();
  }, []);

  if (checking) return null;

  if (!loggedIn) return <Navigate to="/login" replace />;

  if (adminOnly && role !== "admin") {
    return <Navigate to="/client" replace />;
  }

  return children;
}
