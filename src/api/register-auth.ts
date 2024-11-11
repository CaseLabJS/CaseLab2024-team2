import { api } from '@/shared/http';

// Работа с регистрацией и аутентификацией

type UserRegister = {
  display_name: string;
  email: string;
  password: string;
};

type UserLogin = {
  email: string;
  password: string;
};
export type UserAuth = {
  display_name: string;
  email: string;
  roles: string[];
};
// регистрация пользователя
export const registerUser = async (user: UserRegister): Promise<number> => {
  const response = await api.post('/auth/register', user);
  return response.status;
};

// аутентификация пользователя
export const authUser = async (user: UserLogin): Promise<{ token: string }> => {
  const response = await api.post<{ token: string }>('/auth/authenticate', user);
  return response.data;
};
export const getCurrentUser = async (): Promise<UserAuth> => {
  const response = await api.get<UserAuth>('/users/current');
  return response.data;
};
