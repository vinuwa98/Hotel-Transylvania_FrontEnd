import React, { createContext, useContext, useEffect, useState } from "react";
import { getRoleFromToken } from "../utils/jwtHelper";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState("");
  const [activeUser, setActiveUser] = useState(null);

  console.log("auth reloaded");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const roleFromToken = getRoleFromToken(token);
    setRole(roleFromToken);

    const storedUser = localStorage.getItem("activeUser");
    if (storedUser) {
      setActiveUser(JSON.parse(storedUser));
    }
  }, [activeUser]);

  useEffect(() => {
    if (activeUser) {
      localStorage.setItem("activeUser", JSON.stringify(activeUser));
    } else {
      localStorage.removeItem("activeUser");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ role, activeUser, setActiveUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export { AuthContext };

