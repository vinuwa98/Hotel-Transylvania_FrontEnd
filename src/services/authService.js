import axios from "axios";
 
const API_BASE_URL = "https://localhost:7172/api";
 
const login = async ({ email, password }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Account/login`, {
      email,
      password,
    });
 
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};
 
const authService = {
  login,
}; 


 
export default authService;
