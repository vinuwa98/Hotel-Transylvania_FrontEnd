/*import axios from "axios";

const BASE_URL = "https://localhost:7172/api";

export const fetchJobs = async (token) => {
  const response = await axios.get(`${BASE_URL}/Job/view-jobs`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateJobStatus = async (token, jobId, status) => {
  const res = await fetch(`${BASE_URL}/Job/update-job-status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ jobId, status }), // ✅ send both in body
  });
  if (!res.ok) throw new Error("Failed to update job status");
};

export const updateJobUsers = async (token, data) => {
  const res = await fetch(`${BASE_URL}/Job/update-job-users`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to assign users to job");
};

export const fetchAllUsers = async (token) => {
  const res = await fetch(`${BASE_URL}/User/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  return await res.json();
};

export async function fetchMaintenanceStaff(token) {
  const response = await fetch(`${BASE_URL}/User/maintenance-staff`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to fetch staff");
  return await response.json();
}
*/

/*
import axios from "axios";

const BASE_URL = "https://localhost:7172/api";

export const fetchJobs = async (token) => {
  const response = await axios.get(`${BASE_URL}/Job/view-jobs`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateJobStatus = async (token, jobId, status) => {
  const res = await fetch(`${BASE_URL}/Job/update-job-status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ jobId, status }), // ✅ send both in body
  });
  if (!res.ok) throw new Error("Failed to update job status");
};

export const updateJobUsers = async (token, data) => {
  const res = await fetch(`${BASE_URL}/Job/update-job-users`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to assign users to job");
};

export const fetchAllUsers = async (token) => {
  const res = await fetch(`${BASE_URL}/User/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  return await res.json();
};

export async function fetchMaintenanceStaff(token) {
  const response = await fetch(`${BASE_URL}/User/maintenance-staff`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to fetch staff");
  return await response.json();
}

// ✅ NEW FUNCTION ADDED
export const fetchDashboardSummary = async (token) => {
  const response = await axios.get(`${BASE_URL}/Job/dashboard-summary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchJobById = async (token, jobId) => {
  const response = await fetch(`${BASE_URL}/Job/view-job-by-id?id=${jobId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Failed to fetch job details");

  return await response.json();
};

export const handleUserAssignmentSubmit = async () => {
  try {
    const token = localStorage.getItem("token");
    await updateJobUsers(token, {
      jobId: selectedJob.id,
      userIds: selectedUserIds,
    });
    await loadJobs();
    setShowAssignModal(false);
  } catch (error) {
    console.error("Failed to update users:", error);
  }
};
*/

import axios from "axios";

const BASE_URL = "https://localhost:7172/api";

// Fetch all jobs
export const fetchJobs = async (token) => {
  const res = await axios.get(`${BASE_URL}/Job/view-jobs`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Fetch single job by ID
export const fetchJobById = async (token, jobId) => {
  const res = await axios.get(`${BASE_URL}/Job/view-job-by-id?id=${jobId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Update job status
export const updateJobStatus = async (token, jobId, status) => {
  const res = await fetch(`${BASE_URL}/Job/update-job-status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ jobId, status }),
  });
  if (!res.ok) throw new Error("Failed to update job status");
};

// Update assigned users
export const updateJobUsers = async (token, data) => {
  const res = await fetch(`${BASE_URL}/Job/update-job-users`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to assign users");
};

// Fetch only maintenance staff
export const fetchMaintenanceStaff = async (token) => {
  const res = await fetch(`${BASE_URL}/User/maintenance-staff`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch staff");
  return await res.json();
};

// High-level helpers for UI component use
export const loadJobsHelper = async (setJobs) => {
  try {
    const token = localStorage.getItem("token");
    const jobs = await fetchJobs(token);
    setJobs(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }
};

export const loadUsersHelper = async (setAllUsers) => {
  try {
    const token = localStorage.getItem("token");
    const users = await fetchMaintenanceStaff(token);
    setAllUsers(users);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

export const handleViewJobHelper = async (
  jobId,
  setSelectedJob,
  setShowJobModal
) => {
  try {
    const token = localStorage.getItem("token");
    const job = await fetchJobById(token, jobId);
    setSelectedJob(job);
    setShowJobModal(true);
  } catch (error) {
    console.error("Failed to fetch job by ID:", error);
  }
};

/*
export const handleStatusChangeHelper = async (jobId, newStatus, loadJobs) => {
  try {
    const token = localStorage.getItem("token");
    await updateJobStatus(token, jobId, newStatus);
    await loadJobs();
  } catch (error) {
    console.error("Failed to update status:", error);
  }
};*/

export const handleUserAssignmentSubmit = async (
  selectedJob,
  selectedUserIds,
  loadJobs,
  setShowAssignModal
) => {
  try {
    const token = localStorage.getItem("token");
    await updateJobUsers(token, {
      jobId: selectedJob.id,
      userIds: selectedUserIds,
    });
    await loadJobs();
    setShowAssignModal(false);
  } catch (error) {
    console.error("Failed to assign users:", error);
  }
};

export const fetchDashboardSummary = async (token) => {
  const response = await axios.get(`${BASE_URL}/Job/dashboard-summary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export async function updateRoomStatus(token, jobId, jobStatus) {
  try {
    const response = await axios.put(
      `${BASE_URL}/Room/update-status/${jobId}`,
      { jobStatus }, // ✅ Send jobStatus in request body
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // Returns RoomStatusDto
  } catch (error) {
    console.error("❌ Failed to update room status:", error);
    throw error;
  }
}
export const handleStatusChangeHelper = async (
  jobId,
  newStatus,
  reloadJobs
) => {
  try {
    const token = localStorage.getItem("token");

    // Step 1: Update the job status
    await updateJobStatus(token, jobId, newStatus);

    // Step 2: Update room status if applicable
    const shouldUpdateRoom =
      newStatus === "Pending" || newStatus === "Completed";

    if (shouldUpdateRoom) {
      await updateRoomStatus(token, jobId, newStatus);
    }

    // Step 3: Refresh the job list
    await reloadJobs();
  } catch (error) {
    console.error("❌ Error updating job/room status:", error);
  }
};
