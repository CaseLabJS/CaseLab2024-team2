import { apiAuth } from "./api-config";

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

// регистрация пользователя
export const registerUser = async (user: UserRegister) => {
  const response = await apiAuth.post<{ token: string }>(
    "/auth/register",
    user
  );
  localStorage.setItem("token", response.data.token);
  return response.data.token;
};

// аутентификация пользователя
export const authUser = async (user: UserLogin) => {
  const response = await apiAuth.post<{ token: string }>(
    "/auth/authenticate",
    user
  );
  localStorage.setItem("token", response.data.token);
  return response.data.token;
};
