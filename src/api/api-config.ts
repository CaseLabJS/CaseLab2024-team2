import axios from "axios";

const URL = "http://172.18.27.102:8080/api/v1";
const TOKEN = localStorage.getItem("token");

export const api = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
  withCredentials: true,
});

export const apiAuth = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
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

apiAuth.interceptors.response.use(
  (response) => {
    console.log(response.status);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiAuth.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
