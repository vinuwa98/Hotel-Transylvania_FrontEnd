import axios from "axios";

const API_BASE_URL = "https://localhost:7172/api";

const addComplaint = async (formData, token) => {

  const complaintData = new FormData();
  complaintData.append("title", formData.title);
  complaintData.append("description", formData.description);
  complaintData.append("roomId", formData.roomId);

  if (formData.image) {
    complaintData.append("image", formData.image);
  }

    const response = await axios.post(`${API_BASE_URL}/Complaint/add-complaint`, complaintData, {
        headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        },
    });

  return response.data;
};  

const fetchRooms = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/Room/get-all-rooms`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const ComplaintService = {
  addComplaint,
  fetchRooms,
};

export default ComplaintService;