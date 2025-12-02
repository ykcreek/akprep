import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true); // prevents flicker

  useEffect(() => {
    const token = localStorage.getItem("token");
    const uid = localStorage.getItem("uid");
    const savedRole = localStorage.getItem("role");

    if (token && uid && savedRole) {
      setLoggedIn(true);
      setRole(savedRole);
      setUserId(uid);
    }

    setLoading(false);
  }, []);

  const login = (token, uid, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("uid", uid);
    localStorage.setItem("role", role);

    setLoggedIn(true);
    setRole(role);
    setUserId(uid);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("uid");
    localStorage.removeItem("role");

    setLoggedIn(false);
    setRole(null);
    setUserId(null);
  };


  return (
    <AuthContext.Provider value={{ loggedIn, role, userId, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}