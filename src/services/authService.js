// src/services/authService.js

const login = async ({ email, password }) => {
  // You can add your API call here
  console.log("Logging in:", email, password);

  // simulate success
  return { success: true, token: "dummy-token" };
};

export default {
  login,
};
