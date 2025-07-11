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
            path="dashboard/rooms"
            element={<DashboardPage sectionName={"rooms"} />}
          />
          <Route
            path="dashboard/complaints"
            element={<DashboardPage sectionName={"complaints"} />}
          />
          <Route
            path="dashboard/jobs"
            element={<DashboardPage sectionName={"jobs"} />}
          />
          <Route
            path="dashboard/manage-user"
            element={<DashboardPage sectionName={"manage-users"} />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
