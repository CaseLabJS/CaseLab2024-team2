export interface UserResponse {
  email: string; // Адрес электронной почты пользователя
  display_name: string; // Отображаемое имя пользователя
  roles: ['USER' | 'ADMIN']; // Список id документов пользователя
}
