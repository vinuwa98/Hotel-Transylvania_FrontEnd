import React, { createContext, useContext, useEffect, useState } from "react";
import { getRoleFromToken } from "../utils/jwtHelper";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [activeUser, setActiveUser] = useState(() => {
    const storedUser = localStorage.getItem("activeUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (activeUser) {
      localStorage.setItem("activeUser", JSON.stringify(activeUser));
    } else {
      localStorage.removeItem("activeUser");
    }
  }, [activeUser]);

  useEffect(() => {
    localStorage.setItem("token", token);
    const roleFromToken = getRoleFromToken(token);
    setRole(roleFromToken);
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ role, token, setToken, activeUser, setActiveUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
