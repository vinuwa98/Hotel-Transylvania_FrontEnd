import axios from "axios";
 
const API_BASE_URL = "https://localhost:7172/api";
 
const login = async ({ email, password }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Account/login`, {
<<<<<<< HEAD
      userName: email, //should remove userName: part after get backend working
=======
      email,
>>>>>>> 3002b07c349bb04162fc94cf59535a4f67490f2a
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
