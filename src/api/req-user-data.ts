import { api } from './api-config';

type UserData = {
  email: string;
  display_name: string;
  document_ids: number[];
};

// получить информацию о пользователе по email
export const getUserData = async (email: string): Promise<UserData> => {
  const response = await api.get<UserData>(`/users?email=${email}`);
  return response.data;
};

// получить информацию о всех пользователях
export const getAllUserData = async (): Promise<UserData[]> => {
  const response = await api.get<UserData[]>(`/users/all`);
  return response.data;
};

// редактирование данных пользователя
export const editUserData = async (user: { email: string; display_name: string }): Promise<UserData> => {
  const response = await api.put<UserData>('/users', user);
  return response.data;
};

// удаление пользователя
export const deleteUserData = async (): Promise<void> => {
  const response = await api.delete('/users');
  if (response.status === 204) {
    localStorage.removeItem('token');
  }
  return;
};