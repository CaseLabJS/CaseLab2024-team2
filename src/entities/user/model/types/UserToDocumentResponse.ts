import type { DocumentPermissionResponse } from '@/entities/docs/model/types/DocumentPermissionResponse';
export interface UserToDocumentResponse {
  email: string;
  document_permissions: DocumentPermissionResponse[];
}
