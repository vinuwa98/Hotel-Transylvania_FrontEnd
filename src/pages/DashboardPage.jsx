import React from "react";
import DashboardCards from "../Components/organisms/DashboardCards";
import { useAuth } from "../contexts/AuthContext";
import SupervisorSection from "../Components/organisms/SupervisorSection";
import MaintenanceStaffSection from "../Components/organisms/MaintenanceStaffSection";
import MaintenanceManagerSection from "../Components/organisms/MaintenanceManagerSection";
import HelpDeskSection from "../Components/organisms/HelpDeskSection";
import RoomsSection from "../Components/organisms/RoomsSection";
import ManageUsersSection from "../Components/organisms/ManageUsersSection";

const RenderDashboard = (role) => {
  switch (role) {
    case "Admin-":
      return <DashboardCards />;
    case "Admin-manage-users":
      return <ManageUsersSection />;
    case "Supervisor":
      return <SupervisorSection />;
    case "MaintenanceStaff":
      return <MaintenanceStaffSection />;
    case "MaintenanceManager":
      return <MaintenanceManagerSection />;
    case "HelpDesk-help-desk":
      return <HelpDeskSection />;
    case "HelpDesk-rooms":
      return <RoomsSection />;
  }
};

const DashboardPage = ({ sectionName = "" }) => {
  const auth = useAuth();

  return <div>{RenderDashboard(`${auth.role}-${sectionName}`)}</div>;
};

export default DashboardPage;
