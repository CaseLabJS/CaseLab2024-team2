import { apiAuth } from "./api-config";

// Работа с регистрацией и аутентификацией

// регистрация пользователя
export const registerUser = async (
  display_name: string,
  email: string,
  password: string
) => {
  const response = await apiAuth.post<{ token: string }>("/auth/register", {
    display_name,
    email,
    password,
  });
  localStorage.setItem("token", response.data.token);
  return response.data.token;
};

// аутентификация пользователя
export const authUser = async (email: string, password: string) => {
  const response = await apiAuth.post<{ token: string }>("/auth/authenticate", {
    email,
    password,
  });
  localStorage.setItem("token", response.data.token);
  return response.data.token;
};
