import axios from "axios";

const BASE_URL = "https://localhost:7172/api";

// Get token from local storage
const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Get total user count with Authorization header
export const getUserCount = async () => {
  try {
    const token = getAuthToken();

    const response = await axios.get(`${BASE_URL}/Users/count`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // Example: { totalUsers: 25 }

  } catch (error) {
    console.error("Failed to fetch user count:", error);
    throw error;
  }
};
