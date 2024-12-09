import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import axios from 'axios';

const URL = 'http://172.18.27.102:8080/api/v1';

const apiConfig: AxiosRequestConfig = {
  baseURL: URL,
  withCredentials: true,
};

export const api: AxiosInstance = axios.create(apiConfig);

type Token = {
  accessToken: string;
  refreshToken: string;
};

type ErrorResponse = {
  response: { data: { detail: string }; status: number };
  config: AxiosRequestConfig;
};

api.interceptors.response.use(
  (response: AxiosResponse<Token>) => {
    if (response.data.accessToken && response.data.refreshToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    return response;
  },
  async (error: ErrorResponse) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        const response = await axios.post<Token>(`${URL}/auth/refresh-token`, {
          token: refreshToken,
        });
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        return api.request(originalRequest);
      }
    }
    console.log('Error: ', error.response.data.detail);
    throw new Error();
  },
);

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (config.headers && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
