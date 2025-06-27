import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Page imports
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import ManageUsersPage from '../pages/ManageUsersPage';

/**
 * AppRoutes handles routing for the app.
 */
function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* ✅ Login Page Route */}
        <Route path="/" element={<LoginPage />} />

        {/* ✅ Dashboard Route (shows after successful login) */}
        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/manage-user" element={<ManageUsersPage />} /> 
      </Routes>
    </Router>
  );
}

export default AppRoutes;
