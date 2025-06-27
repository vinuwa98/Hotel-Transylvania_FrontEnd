import axios from "axios";

const API_BASE_URL = "https://localhost:7172/api";

const addUser = async (userData, token) => {
  const response = await axios.post(`${API_BASE_URL}/Account/add-user`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export { addUser };
