import type { UserToDocumentResponse } from '@/entities/user/@x/documents';

export interface DocumentResponse {
  id: number;
  document_type_id: number;
  name: string;
  document_versions_ids: number[];
  user_permissions: UserToDocumentResponse[];
  status: string;
}
