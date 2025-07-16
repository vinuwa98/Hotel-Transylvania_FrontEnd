import React from "react";
import DashboardCards from "../Components/organisms/DashboardCards";
import { useAuth } from "../contexts/AuthContext";
import SupervisorSection from "../Components/organisms/SupervisorSection";
import CleanerSection from "../Components/organisms/CleanerSection";
import MaintenanceStaffSection from "../Components/organisms/MaintenanceStaffSection";
import MaintenanceManagerSection from "../Components/organisms/MaintenanceManagerSection";
import HelpDeskSection from "../Components/organisms/HelpDeskSection";

const RenderDashboard = (role) => {
  switch (role) {
    case "Admin":
      return <DashboardCards />;
    case "Supervisor":
      return <SupervisorSection />;
    case "Cleaner":
      return <CleanerSection />;
    case "MaintenanceStaff":
      return <MaintenanceStaffSection />;
    case "MaintenanceManager":
      return <MaintenanceManagerSection />;
    case "HelpDesk":
      return <HelpDeskSection />;
  }
};

const DashboardPage = () => {
  const auth = useAuth();

  return <div>{RenderDashboard(auth.role)}</div>;
};

export default DashboardPage;
