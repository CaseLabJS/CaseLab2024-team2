import axios from "axios";

const URL = "http://172.18.27.102:8080/api/v1";

export const api = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
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
    console.log("Error: ", error.response.data.detail);
    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  (config) => {
    const TOKEN = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${TOKEN}`;

    return config;
  },
  (error) => {
    console.log("Error: ", error.response.data.detail);
    return Promise.reject(error);
  }
);

apiAuth.interceptors.response.use(
  (response) => {
    console.log(response.data);
    if (response.status === 200)
      localStorage.setItem("token", response.data.token);
    return response;
  },
  (error) => {
    console.log("Error: ", error.response.data.detail);
    return Promise.reject(error);
  }
);

apiAuth.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log("Error: ", error.response.data.detail);
    return Promise.reject(error);
  }
);
