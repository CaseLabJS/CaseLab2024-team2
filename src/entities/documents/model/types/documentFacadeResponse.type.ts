import type { DocumentResponse } from '@/entities/documents/model/@x';
import type { DocumentVersionResponse } from '@/entities/documents/model/@x';
import type { SignatureResponse } from '@/entities/signature/model/@x/documents';

export interface DocumentFacadeResponse {
  document: DocumentResponse;
  latest_version: DocumentVersionResponse;
  signature: SignatureResponse;
}
