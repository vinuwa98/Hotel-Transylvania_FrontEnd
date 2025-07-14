import React, { useState } from "react";
import DashboardCards from "../Components/organisms/DashboardCards";
import { useAuth } from "../contexts/AuthContext";
import SupervisorSection from "../Components/organisms/SupervisorSection";
import MaintenanceStaffSection from "../Components/organisms/MaintenanceStaffSection";
import MaintenanceManagerSection from "../Components/organisms/MaintenanceManagerSection";
import HelpDeskSection from "../Components/organisms/HelpDeskSection";
import RoomsSection from "../Components/organisms/RoomsSection";
import ManageUsersSection from "../Components/organisms/ManageUsersSection";
import Button from "../Components/atoms/Button";
import { themeColors } from "../Theme/colors";
import DropdownList from "../Components/atoms/DropdownList";
import JobCreateForm from "../Components/molecules/JobCreateForm";
import { createJob } from "../services/jobService";
import AssignCleanerTable from "../Components/organisms/AssignCleanerTable"; // New Import

const RenderDashboard = (role) => {
  const [showCreateJobModal, setShowJobCreateModal] = useState(false);

  const handleCreateJob = (jobData, token) => {
    createJob(jobData.form, token).then(() => {
      setShowJobCreateModal(false);
    });
  };

  switch (role) {
    case "Admin-":
      return <DashboardCards />;
    case "Admin-manage-users":
      return <ManageUsersSection />;
    case "Supervisor-":
      return <SupervisorSection />;
    case "Supervisor-assign-cleaner": //New case
      return <AssignCleanerTable />;
    case "MaintenanceStaff":
      return <MaintenanceStaffSection />;
    case "MaintenanceManager-":
      return <MaintenanceManagerSection />;
    case "HelpDesk-":
      return <HelpDeskSection />;
    case "HelpDesk-complaints":
      return (
        <>
          <h1>Complaints under construction</h1>
          <JobCreateForm
            open={showCreateJobModal}
            onClose={() => setShowJobCreateModal(false)}
            handleSubmit={handleCreateJob}
          />
          <Button
            label={"Create a Job"}
            onClick={() => setShowJobCreateModal(true)}
            style={{
              backgroundColor: themeColors.Blue3rd,
              color: themeColors.White,
            }}
            className="w-fit px-4 py-2 rounded-md mb-4 hover:opacity-90 transition"
          />
        </>
      );
    case "HelpDesk-rooms":
      return <RoomsSection />;
    case "HelpDesk-jobs":
      return (
        <>
          <h1>Jobs under construction</h1>
          <Button
            label={"Delete Job"}
            style={{
              backgroundColor: themeColors.Blue3rd,
              color: themeColors.White,
            }}
            className="w-fit px-4 py-2 rounded-md mb-4 hover:opacity-90 transition"
          />
          <DropdownList
            name={`job-priority`}
            options={[
              { label: "Open", value: "open" },
              { label: "In Progress", value: "in-progress" },
              { label: "Completed", value: "completed" },
            ]}
          />
        </>
      );
    default:
      return <div>Section not found</div>;
  }
};

const DashboardPage = ({ sectionName = "" }) => {
  const auth = useAuth();

  return <div>{RenderDashboard(`${auth.role}-${sectionName}`)}</div>;
};

export default DashboardPage;
