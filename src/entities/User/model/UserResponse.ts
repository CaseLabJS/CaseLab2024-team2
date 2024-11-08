export interface UserResponse {
  email: string; // Адрес электронной почты пользователя
  display_name: string; // Отображаемое имя пользователя
  document_ids: number[]; // Список id документов пользователя
}
