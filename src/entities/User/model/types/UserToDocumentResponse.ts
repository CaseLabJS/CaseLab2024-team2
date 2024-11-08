import type { DocumentPermissionResponse } from '../../../Document/model/types/DocumentPermissionResponse.ts';
export interface UserToDocumentResponse {
  email: string;
  document_permissions: DocumentPermissionResponse;
}
