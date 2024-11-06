import type { UserToDocumentResponse } from '../../User/model/UserToDocumentResponse.ts';
export interface DocumentResponse {
id: number; // ID документа
document_type_id: number; // ID типа документа
name: string; // Имя документа
document_versions_ids: number[]; // 
user_permissions: UserToDocumentResponse[]; // 
}