import type { DocumentPermissionResponse } from '@/entities/documents/model/types/documentPermissionResponse.type.ts';
export interface UserToDocumentResponse {
  email: string;
  document_permissions: DocumentPermissionResponse[];
}
