import React, { useEffect, useState } from "react";
import Button from "../atoms/Button";
import { themeColors } from "../../Theme/colors";
import Table from "./Table/Table";
import MultiSelectDropdown from "../atoms/MultiSelectDropdown";
import DropdownList from "../atoms/DropdownList";
import Modal from "../molecules/Modal";

import {
  loadJobsHelper,
  loadUsersHelper,
  handleViewJobHelper,
  handleStatusChangeHelper,
  handleUserAssignmentSubmit,
  updateRoomStatus,
} from "../../services/jobService";

const jobStatusOptions = [
  { value: "Pending", label: "Pending" },
  { value: "In Progress", label: "In Progress" },
  { value: "Completed", label: "Completed" },
  { value: "Not Fixed", label: "Not Fixed" },
  { value: "Cancelled", label: "Cancelled" },
];

function Jobs() {
  const [jobsData, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState({});
  const [showJobModal, setShowJobModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [editableStatusRows, setEditableStatusRows] = useState({});
  const [statusDrafts, setStatusDrafts] = useState({});

  const toggleUser = (userId) => {
    setSelectedUserIds((prevIds) =>
      prevIds.includes(userId)
        ? prevIds.filter((id) => id !== userId)
        : [...prevIds, userId]
    );
  };

  const toggleEditStatus = (jobId, currentStatus) => {
    setEditableStatusRows((prev) => ({ ...prev, [jobId]: true }));
    setStatusDrafts((prev) => ({ ...prev, [jobId]: currentStatus }));
  };

  const cancelStatusEdit = (jobId) => {
    setEditableStatusRows((prev) => ({ ...prev, [jobId]: false }));
    setStatusDrafts((prev) => {
      const copy = { ...prev };
      delete copy[jobId];
      return copy;
    });
  };

  const saveStatusChange = async (jobId) => {
    const newStatus = statusDrafts[jobId];
    const originalJob = jobsData.find((j) => j.id === jobId);
    if (newStatus !== originalJob.status) {
      await handleStatusChangeHelper(jobId, newStatus, loadJobs);
    }
    cancelStatusEdit(jobId);
  };

  const loadJobs = () => loadJobsHelper(setJobs);
  const loadUsers = () => loadUsersHelper(setAllUsers);
  const handleViewJob = (jobId) =>
    handleViewJobHelper(jobId, setSelectedJob, setShowJobModal);

  const handleAssignJob = async (jobId) => {
    const job = jobsData.find((j) => j.id === jobId);
    setSelectedJob(job);
    setSelectedUserIds(job.users.map((u) => u.userId));
    await loadUsers();
    setShowAssignModal(true);
  };

  const submitUserAssignment = () =>
    handleUserAssignmentSubmit(
      selectedJob,
      selectedUserIds,
      loadJobs,
      setShowAssignModal
    );

  const columns = [
    { header: "Job Name", accessor: "name", width: "200px" },
    {
      header: "Status",
      renderCell: (job) => (
        <span
          className={`font-semibold ${
            job.status === "Fixed"
              ? "text-green-600"
              : job.status === "Completed"
              ? "bg-green-100 text-green-700"
              : job.status === "In Progress"
              ? "bg-blue-100 text-blue-700"
              : job.status === "Pending"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {job.status || "Unknown"}
        </span>
      ),
      width: "150px",
    },
    {
      header: "Priority",
      renderCell: (job) => (
        <span className="font-medium text-yellow-700">
          {job.priority || "Normal"}
        </span>
      ),
      width: "120px",
    },
    {
      header: "View Details",
      renderCell: (job) => (
        <Button
          label="View Job"
          style={{ backgroundColor: themeColors.Red, color: themeColors.White }}
          onClick={() => handleViewJob(job.id)}
        />
      ),
      width: "140px",
    },
    {
      header: "Assign / View",
      renderCell: (job) => (
        <Button
          label="View Users"
          style={{
            backgroundColor: themeColors.Blue,
            color: themeColors.White,
          }}
          onClick={() => handleAssignJob(job.id)}
        />
      ),
      width: "140px",
    },
    {
      header: "Update Status",
      renderCell: (job) => {
        const isEditing = editableStatusRows[job.id];
        const draftStatus = statusDrafts[job.id] ?? job.status;

        return (
          <div className="flex items-center space-x-2">
            <DropdownList
              name={`status-${job.id}`}
              value={draftStatus}
              onChange={(e) =>
                setStatusDrafts((prev) => ({
                  ...prev,
                  [job.id]: e.target.value,
                }))
              }
              options={jobStatusOptions}
              disabled={!isEditing}
            />
            {!isEditing ? (
              <Button
                label="Edit"
                onClick={() => toggleEditStatus(job.id, job.status)}
                style={{
                  backgroundColor: themeColors.Blue,
                  color: themeColors.White,
                }}
              />
            ) : (
              <>
                <Button
                  label="Save"
                  onClick={() => saveStatusChange(job.id)}
                  style={{
                    backgroundColor: themeColors.Green,
                    color: themeColors.White,
                  }}
                />
                <Button
                  label="Cancel"
                  onClick={() => cancelStatusEdit(job.id)}
                  style={{
                    backgroundColor: themeColors.Red,
                    color: themeColors.White,
                  }}
                />
              </>
            )}
          </div>
        );
      },
      width: "300px",
    },
  ];

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <div className="flex flex-col p-4">
      <h1 className="text-center text-2xl mb-5 font-bold">All Jobs</h1>
      <div className="flex justify-center overflow-x-auto shadow-lg rounded-lg">
        <Table columns={columns} data={jobsData} />
      </div>

      {/* View Job Modal */}
      <Modal isOpen={showJobModal} onClose={() => setShowJobModal(false)}>
        <div className="bg-white p-6 rounded-xl shadow-xl max-w-md mx-auto space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
            Job Details
          </h2>
          <div className="space-y-3 text-gray-700">
            <div>
              <p className="text-sm font-semibold text-gray-500">Job Name</p>
              <p className="text-lg font-medium">{selectedJob.name}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500">Status</p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  selectedJob.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : selectedJob.status === "In Progress"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {selectedJob.status}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500">Priority</p>
              <span
                className={`inline-block px-2 py-1 rounded text-sm ${
                  selectedJob.priority === "High"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {selectedJob.priority}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500">Description</p>
              <p className="text-base">{selectedJob.description || "—"}</p>
            </div>
          </div>
        </div>
      </Modal>

      {/* Assign Users Modal */}
      <Modal isOpen={showAssignModal} onClose={() => setShowAssignModal(false)}>
        <div className="bg-white p-6 rounded-xl shadow-xl max-w-md mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
            Assign Users to Job
          </h2>

          <div>
            <p className="text-sm font-semibold text-gray-600 mb-1">
              Currently Assigned
            </p>
            {selectedUserIds.length > 0 ? (
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {allUsers
                  .filter((u) => selectedUserIds.includes(u.id))
                  .map((user) => (
                    <li key={user.id}>
                      {user.fullName}{" "}
                      <span className="text-gray-500 text-xs">
                        ({user.role})
                      </span>
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">
                No users currently assigned.
              </p>
            )}
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-600 mb-1">
              Select Users
            </p>
            <MultiSelectDropdown
              options={allUsers.map((user) => ({
                value: user.id,
                label: `${user.fullName} (${user.role})`,
              }))}
              value={allUsers
                .filter((u) => selectedUserIds.includes(u.id))
                .map((user) => ({
                  value: user.id,
                  label: `${user.fullName} (${user.role})`,
                }))}
              onChange={(selected) =>
                setSelectedUserIds(selected.map((s) => s.value))
              }
              disabled={selectedJob?.status === "Completed"}
            />
          </div>

          <div className="flex justify-center">
            <Button
              label="Save Assignments"
              onClick={submitUserAssignment}
              className="w-full bg-[#003366] text-white py-2 rounded-md hover:bg-[#002a55] transition"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Jobs;
