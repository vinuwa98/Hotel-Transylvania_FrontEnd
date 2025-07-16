import React from "react";
import DashboardCards from "../Components/organisms/DashboardCards";
import { useAuth } from "../contexts/AuthContext";
import SupervisorSection from "../Components/organisms/SupervisorSection";
import MaintenanceStaffSection from "../Components/organisms/MaintenanceStaffSection";
import MaintenanceManagerSection from "../Components/organisms/MaintenanceManagerSection";
import HelpDeskSection from "../Components/organisms/HelpDeskSection";
import RoomsSection from "../Components/organisms/RoomsSection";
import ManageUsersSection from "../Components/organisms/ManageUsersSection";
import AssignCleanerTable from "../Components/organisms/AssignCleanerTable";
import Jobs from "../Components/organisms/Jobs";

// New Import
import ComplaintsSection from "../Components/organisms/ComplaintsSection";
import JobsSection from "../Components/organisms/JobsSection";

const RenderDashboard = (role, sectionName) => {
  const key = `${role}-${sectionName}`.replace(/-$/, ""); // Remove trailing dash

  switch (key) {
    case "Admin":
      return <DashboardCards />;
    case "Admin-manage-users":
      return <ManageUsersSection />;
    case "Supervisor":
      return <SupervisorSection />;
    case "Supervisor-assign-cleaner":
      return <AssignCleanerTable />;
    case "MaintenanceStaff":
      return <MaintenanceStaffSection />;
    case "MaintenanceManager":
      return <MaintenanceManagerSection />;
    case "HelpDesk-":
      return <HelpDeskSection />;
    case "HelpDesk-complaints":
      return <ComplaintsSection />;
    case "HelpDesk-rooms":
      return <RoomsSection />;
    case "HelpDesk-jobs":
      return <JobsSection />;
    default:
      return <div>Section not found</div>;
  }
};

const DashboardPage = ({ sectionName = "" }) => {
  const auth = useAuth();

  return <div>{RenderDashboard(auth.role, sectionName)}</div>;
};

export default DashboardPage;
