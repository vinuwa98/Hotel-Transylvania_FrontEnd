import React, { createContext, useContext, useEffect, useState } from "react";
import { getRoleFromToken } from "../utils/jwtHelper";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState("");
  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const roleFromToken = getRoleFromToken(token);
    setRole(roleFromToken);
  }, []);

  return (
    <AuthContext.Provider value={{ role, activeUser, setActiveUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
