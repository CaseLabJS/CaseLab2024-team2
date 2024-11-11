import type { DocumentPermissionResponse } from '../../../document/model/types/DocumentPermissionResponse.ts';
export interface UserToDocumentResponse {
  email: string;
  document_permissions: DocumentPermissionResponse[];
}
