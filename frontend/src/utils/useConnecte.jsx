import { createContext, useContext, useState } from "react";

const API = import.meta.env.VITE_API_URL;

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [connecte, setConnecte] = useState(() => {
    return localStorage.getItem("admin_connecte") === "true";
  });

  async function login(login, password) {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ login, password }),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Erreur de connexion.");
    }
    localStorage.setItem("admin_connecte", "true");
    setConnecte(true);
  }

  async function logout() {
    await fetch(`${API}/logout`, { credentials: "include" });
    localStorage.removeItem("admin_connecte");
    setConnecte(false);
  }

  return (
    <AuthContext.Provider value={{ connecte, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
