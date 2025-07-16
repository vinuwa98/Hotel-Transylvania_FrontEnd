import axios from "axios";

const API_BASE_URL = "https://localhost:7172/api";

const getAuthToken = () => {
  return localStorage.getItem("token");
};

export const getAllComplaints = async () => {
  const token = getAuthToken();

  const response = await axios.get(`${API_BASE_URL}/Complaint/all-complaints`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
