import axios from "axios";

const API_BASE_URL = "https://localhost:7172/api";

const addUser = async (userData, token) => {
  const response = await axios.post(`${API_BASE_URL}/User/add-user`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Sends a GET request to fetch all users
const fetchUsers = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/User/get-users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}; 


// Send a PUT request to deactivate user by their userId
const deactivateUser = async (userId, token) => {
  const response = await axios.put(`${API_BASE_URL}/User/deactivate-user`, userId, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};


// Send a PUT request to activate user by their userId
const activateUser = async (userId, token) => {
  const response = await axios.put(`${API_BASE_URL}/User/activate-user`, userId, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};


//const API_BASE_URL = "https://localhost:7172/api";

const getLoggedUser = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/User/get-logged-user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export { getLoggedUser };
 
export { activateUser };
export { deactivateUser };
export { fetchUsers };
export { addUser };
