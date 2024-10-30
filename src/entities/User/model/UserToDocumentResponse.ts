import { DocumentPermissionResponse } from '../../Document/model/DocumentPermissionResponse.ts';
export interface UserToDocumentResponse {
email: string; // Email пользователя
document_permissions: DocumentPermissionResponse[]; // 
}