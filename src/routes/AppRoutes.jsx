import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Page imports
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import ManageUsersPage from "../pages/ManageUsersPage";
import ResetPassword from "../pages/ResetPasswordPage";
import MainLayout from "../Components/Template/MainLayout";
import Unauthorized from "../pages/UnauthorizedPage";
import AddComplaintForm from "../Components/molecules/AddComplaintForm";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route element={<MainLayout />}>
          {/* 👇 Default dashboard */}
          <Route path="dashboard" element={<DashboardPage />} />

          {/* 👇 Routes with sectionName */}
          <Route
            path="dashboard/rooms"
            element={<DashboardPage sectionName="rooms" />}
          />
          <Route
            path="dashboard/complaints"
            element={<DashboardPage sectionName="complaints" />}
          />
          <Route
            path="dashboard/jobs"
            element={<DashboardPage sectionName="jobs" />}
          />
          <Route
            path="dashboard/manage-user"
            element={<DashboardPage sectionName="manage-users" />}
          />
          <Route
            path="dashboard/assign-cleaner"
            element={<DashboardPage sectionName="assign-cleaner" />}
          />
          <Route
            path="dashboard/help-desk"
            element={<DashboardPage sectionName="help-desk" />}
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

/*
    {/* <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route path="dashboard" element={<MainLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="rooms" element={<DashboardPage sectionName="rooms" />} />
          <Route
            path="complaints"
            element={<DashboardPage sectionName="complaints" />}
          />
          <Route path="jobs" element={<DashboardPage sectionName="jobs" />} />
          <Route
            path="manage-user"
            element={<DashboardPage sectionName="manage-users" />}
          />
          <Route
            path="assign-cleaner"
            element={<DashboardPage sectionName="assign-cleaner" />}
          />

          <Route path="jobs"  element={<DashboardPage sectionName="jobs" />
        </Route>
      </Routes>
    </Router> */
