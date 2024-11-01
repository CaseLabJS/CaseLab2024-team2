import { UserToDocumentRequest } from '../../User/model/UserToDocumentRequest.ts';
export interface DocumentRequest {
document_type_id: number; // id типа документа
name: string; // Имя документа
users_permissions: UserToDocumentRequest[]; // 
}