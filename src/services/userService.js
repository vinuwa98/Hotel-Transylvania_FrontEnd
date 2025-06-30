import axios from "axios";

const API_BASE_URL = "https://localhost:7172/api";

const addUser = async (userData, token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Account/add-user`, userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data[0] || "Server error");
    } else {
      throw new Error("Network error");
    }
  }
};

export { addUser };
