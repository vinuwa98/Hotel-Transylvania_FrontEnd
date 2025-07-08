import axios from "axios";

const API_BASE_URL = "https://localhost:7172/api";

const addUser = async (userData, token) => {
  try {
    const response = await axios
      .post(`${API_BASE_URL}/User/add-user`, userData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        alert(err.response.data);
      });

    // If the request is successful
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    console.error("Add user error:", err);
    alert(err?.response?.data || "Something went wrong while adding the user.");
    return null; //This prevents `.data` crash
  }
};

export const getSupervisors = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/User/get-supervisors`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("getSupervisors FULL response:", response); // see the full response structure

    // Double check if it's nested: response.data.data or just response.data
    const data = response.data?.data || response.data;

    console.log("Supervisor array:", data); // see what inside

    return data;
  } catch (err) {
    console.error("Error fetching supervisors:", err);
    return [];
  }
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

// ADDITION: Function to get a single user by ID
const getUserById = async (userId, token) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/User/get-user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    throw error;
  }
};

// ADDITION: Function to update user data
const updateUser = async (userId, userData, token) => {
  try {
    // Assuming your backend expects the userId in the DTO as well, and/or as part of the URL
    const response = await axios.put(
      `${API_BASE_URL}/User/update-user`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID ${userId}:`, error);
    throw error;
  }
};

// Send a PUT request to deactivate user by their userId
const deactivateUser = async (userId, token) => {
  const response = await axios.put(
    `${API_BASE_URL}/User/deactivate-user`,
    userId,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Send a PUT request to activate user by their userId
const activateUser = async (userId, token) => {
  const response = await axios.put(
    `${API_BASE_URL}/User/activate-user`,
    userId,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export { activateUser };
export { deactivateUser };
export { fetchUsers };
export { addUser };
export { getUserById };
export { updateUser };
