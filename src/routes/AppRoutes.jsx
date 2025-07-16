import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Page imports
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import ManageUsersPage from "../pages/ManageUsersPage";
import ResetPassword from "../pages/ResetPasswordPage";
import MainLayout from "../Components/Template/MainLayout";
import RequireRole from "../Components/organisms/RequireRole";
import Unauthorized from "../pages/UnauthorizedPage";
import AddComplaintForm from "../Components/molecules/AddComplaintForm";

/**
 * AppRoutes handles routing for the app.
 */
function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Login Page Route */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        {/* Dashboard Route (shows after successful login) */}
        <Route element={<MainLayout />}>
          {/* Nested routes under MainLayout */}
          <Route path="dashboard" element={<DashboardPage />} />
          <Route
            path="manage-user"
            element={
              <RequireRole allowedRoles={["Admin"]}>
                <ManageUsersPage />
              </RequireRole>
            }
          />
          <Route
            path="add-complaint"
            element={
              <RequireRole allowedRoles={["Cleaner", "Supervisor"]}>
                <AddComplaintForm />
              </RequireRole>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
