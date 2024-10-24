import axios from "axios";

const URL = "http://172.18.27.102:8080/api/v1";
const TOKEN = "";

export const api = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
});

api.interceptors.response.use(
  (response) => {
    console.log(response.status);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
