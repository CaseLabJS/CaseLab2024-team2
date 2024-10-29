import { UserToDocumentRequest } from '../User/UserToDocumentRequest.ts';
export interface DocumentRequest {
document_type_id: number; // id типа документа
name: string; // Имя документа
users_permissions: UserToDocumentRequest[]; // 
}