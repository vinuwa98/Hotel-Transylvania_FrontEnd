import axios from "axios";

const API_BASE_URL = "https://localhost:7172/api";

const login = async ({ email, password }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/User/login`, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

const resetPassword = async ({ email, token, newPassword }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/User/reset-password`, {
      email,
      token,
      newPassword,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Reset password failed");
  }
};

const authService = {
  login,
  resetPassword,
};

export default authService;
