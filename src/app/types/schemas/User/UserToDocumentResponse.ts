import { DocumentPermissionResponse } from '../Document/DocumentPermissionResponse.ts';
export interface UserToDocumentResponse {
email: string; // Email пользователя
document_permissions: DocumentPermissionResponse[]; // 
}