export interface SignatureCreateRequest {
  documentVersionId: number; // ID версии документа
  name: string; // Название подписи
  email: string; // Адрес электронной почты пользователя
}