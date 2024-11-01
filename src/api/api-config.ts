import type { AxiosResponse } from 'axios';

import axios from 'axios';

const URL = 'http://172.18.27.102:8080/api/v1';

type ResponseData = {
  token: string;
};

export const api = axios.create({
  baseURL: URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const apiAuth = axios.create({
  baseURL: URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    console.log(response.status);
    return response;
  },
  (error: { response: { data: { detail: string } } }) => {
    console.log('Error: ', error.response.data.detail);
    return Promise.reject(new Error(error.response.data.detail));
  },
);

api.interceptors.request.use(
  (config) => {
    const TOKEN = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${TOKEN}`;

    return config;
  },
  (error: { response: { data: { detail: string } } }) => {
    console.log('Error: ', error.response.data.detail);
    return Promise.reject(new Error(error.response.data.detail));
  },
);

apiAuth.interceptors.response.use(
  (response: AxiosResponse<ResponseData>) => {
    const token = response.data.token;
    if (response.status === 200 && token) localStorage.setItem('token', token);
    return response;
  },
  (error: { response: { data: { detail: string } } }) => {
    console.log('Error: ', error.response.data.detail);
    return Promise.reject(new Error(error.response.data.detail));
  },
);

apiAuth.interceptors.request.use(
  (config) => {
    const TOKEN = localStorage.getItem('token');
    if (TOKEN) {
      config.headers.Authorization = `Bearer ${TOKEN}`;
    }
    return config;
  },
  (error: { response: { data: { detail: string } } }) => {
    console.log('Error: ', error.response.data.detail);
    return Promise.reject(new Error(error.response.data.detail));
  },
);
