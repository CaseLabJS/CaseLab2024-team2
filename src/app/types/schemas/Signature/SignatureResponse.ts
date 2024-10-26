export interface SignatureResponse {
  id: number; // ID подписи
  name: string; // Название документа
  status: string; // Статус документа
  sentAt: string; // Дата и время отправки документа на подпись
  signedAt: string; // Дата и время подписания документа
  signatureData: string; // Хеш подписи
  email: string; // Электронная почта пользователя, к которому относится подпись
  documentVersionId: number; // ID версии документа для подписи
}