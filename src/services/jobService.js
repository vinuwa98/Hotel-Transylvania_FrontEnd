import axios from "axios";

const API_BASE_URL = "https://localhost:7172/api";

export const createJob = async (jobData, token) => {
  const response = await axios
    .post(`${API_BASE_URL}/Job/create-job`, jobData, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => console.log(res))
    .catch((err) => {
      throw Error(err);
    });

  return response?.data;
};

export const deleteJob = async (jobData, token) => {
  const response = await axios
    .post(`${API_BASE_URL}/Job/delete-job`, jobData, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => console.log(res))
    .catch((err) => {
      throw Error(err);
    });

  return response?.data;
};
