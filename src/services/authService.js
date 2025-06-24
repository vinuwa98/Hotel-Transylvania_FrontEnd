// src/services/authService.js

// Fake async login simulation
const login = async ({ email, password }) => {
  // You can replace this with real backend logic later
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'admin@gmail.com' && password === '123456') {
        resolve({
          token: 'fake-jwt-token',
          name: 'Admin User'
        });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};

const authService = {
  login,
};

export default authService;
