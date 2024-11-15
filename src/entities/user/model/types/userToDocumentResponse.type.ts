import type { DocumentPermissionResponse } from '@/entities/documents/model/@x/user';

export interface UserToDocumentResponse {
  email: string;
  document_permissions: DocumentPermissionResponse[];
}
