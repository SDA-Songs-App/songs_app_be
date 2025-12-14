import React, { createContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
type User = {
  email: string;
  role: string;
};

type AuthContextType = {
  user?: User | null
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      console.log("User Logged", data)
      if (res.ok) {
        setToken(data.token);
        setUser({email,role:data.role})
        navigate("/"); // redrecct to dAsboard 
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    setToken(null);
    navigate("/login"); // redirect to login
  };

  return (
    <AuthContext.Provider value={{ token,user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
