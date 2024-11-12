import type { DocumentPermissionResponse } from '@/entities/documents/model/types/DocumentPermissionResponse';
export interface UserToDocumentResponse {
  email: string;
  document_permissions: DocumentPermissionResponse[];
}
