import type { DocumentPermissionResponse } from '@/entities/documents/@x/user';

export interface UserToDocumentResponse {
  email: string;
  document_permissions: DocumentPermissionResponse[];
}
