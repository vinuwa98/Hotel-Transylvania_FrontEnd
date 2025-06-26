// src/services/authService.js
import api from '../../axiosConfig';

// Fake async login simulation
const login = async ({ email, password }) => {
  // You can replace this with real backend logic later
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     if (email === 'admin@gmail.com' && password === '123456') {
  //       resolve({
  //         token: 'fake-jwt-token',
  //         name: 'Admin User'
  //       });
  //     } else {
  //       reject(new Error('Invalid credentials'));
  //     }
  //   }, 1000);
  // });

  return api.post('/Account/login', {
    "userName": email,
    "password": password,
    "email": email
  }).then((res) => {

    if (res.status === 200) {
      return {
          token: res.data["token"],
          name: 'Admin User'
      }
    }
  });
};

const authService = {
  login,
};

export default authService;
