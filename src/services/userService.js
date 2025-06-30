import axios from "axios";

const API_BASE_URL = "https://localhost:7172/api";

const addUser = async (userData, token) => {
  const response = await axios.post(`${API_BASE_URL}/Account/add-user`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Sends a GET request to fetch all users
const fetchUsers = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/Account/get-users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}; 

export const deactivateUser = async (userId, token) => {
  const response = await axios.put(`${API_BASE_URL}/Account/deactivate-user/${userId}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


export { fetchUsers };
export { addUser };
