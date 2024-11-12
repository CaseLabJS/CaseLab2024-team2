import type { AuthenticationRequest, RegisterRequest, UserResponse } from '@/entities/user';

import { api } from '@/shared/http';

// регистрация пользователя
export const registerUser = async (user: RegisterRequest): Promise<number> => {
  const response = await api.post('/auth/register', user);
  return response.status;
};

// аутентификация пользователя
export const authUser = async (user: AuthenticationRequest): Promise<{ token: string }> => {
  const response = await api.post<{ token: string }>('/auth/authenticate', user);
  return response.data;
};
export const getCurrentUser = async (): Promise<UserResponse> => {
  const response = await api.get<UserResponse>('/users/current');
  return response.data;
};
