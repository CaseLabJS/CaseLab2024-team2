import { api } from '@/shared/http';

import type { RegisterRequest, UserResponse } from '..';

// получить информацию о пользователе по email
export const getUserData = async (email: string): Promise<UserResponse> => {
  const response = await api.get<UserResponse>(`/users?email=${email}`);
  return response.data;
};

// получить информацию о всех пользователях
export const getAllUserData = async (): Promise<UserResponse[]> => {
  const response = await api.get<UserResponse[]>(`/users/all`);
  return response.data;
};

// редактирование данных пользователя
export const editUserData = async (user: Omit<RegisterRequest, 'email'>): Promise<UserResponse> => {
  const response = await api.put<UserResponse>('/users', user);
  return response.data;
};

// удаление пользователя
export const deleteUserData = async (email: string): Promise<number> => {
  const response = await api.delete(`/users?email=${email}`);
  return response.status;
};
