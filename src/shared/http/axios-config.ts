import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import axios from 'axios';

const URL = 'http://172.18.27.102:8080/api/v1';

const apiConfig: AxiosRequestConfig = {
  baseURL: URL,
  withCredentials: true,
};

export const api: AxiosInstance = axios.create(apiConfig);

api.interceptors.response.use(
  (response: AxiosResponse<{ token: string }>) => {
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response;
  },
  (error: { response: { data: { detail: string } } }) => {
    console.log('Error: ', error.response.data.detail);
    return Promise.reject(new Error(error.response.data.detail));
  },
);

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (config.headers && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: { response: { data: { detail: string } } }) => {
    console.log('Error: ', error.response.data.detail);
    return Promise.reject(new Error(error.response.data.detail));
  },
);
