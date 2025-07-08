import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const RequireRole = ({ allowedRoles, children }) => {
  const { role } = useAuth();

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RequireRole;
