import { apiAuth } from './api-config';

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
type UserAuth = {
  display_name: string;
  email: string;
  roles: string[];
};
// регистрация пользователя
export const registerUser = async (user: UserRegister): Promise<{ token: string }> => {
  const response = await apiAuth.post<{ token: string }>('/auth/register', user);
  return response.data;
};

// аутентификация пользователя
export const authUser = async (user: UserLogin): Promise<{ token: string }> => {
  const response = await apiAuth.post<{ token: string }>('/auth/authenticate', user);
  return response.data;
};
export const getCurrentUser = async (): Promise<UserAuth> => {
  const response = await apiAuth.get<UserAuth>('/users/current');
  return response.data;
};
