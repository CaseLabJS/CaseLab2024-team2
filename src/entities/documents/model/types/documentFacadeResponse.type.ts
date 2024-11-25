import type { DocumentResponse } from '@/entities/documents';
import type { DocumentVersionResponse } from '@/entities/documents';
import type { SignatureResponse } from '@/entities/signature/@x/documents';

export interface DocumentFacadeResponse {
  document: DocumentResponse;
  latest_version: DocumentVersionResponse;
  signature: SignatureResponse;
}
