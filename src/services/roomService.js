import axios from "axios";

const API_BASE_URL = "https://localhost:7172/api";

export const updateRoomStatus = async (roomNumber, newStatus) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${API_BASE_URL}/Room/update-room-status`,
    { roomNumber, newStatus },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const getRoomDashboardData = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_BASE_URL}/Room/dashboard-data`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const getRoomStatusTypes = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_BASE_URL}/Room/room-status-types`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const getAllRoomData = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_BASE_URL}/Room/all-rooms`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};
