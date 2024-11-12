import type { DocumentResponse } from '@/entities/documents/model/types/DocumentResponse';
import type { DocumentVersionResponse } from '@/entities/documents/model/types/DocumentVersionResponse';
import type { SignatureResponse } from '@/entities/result/model/types/SignatureResponse';
export interface DocumentFacadeResponse {
  document: DocumentResponse;
  latest_version: DocumentVersionResponse;
  signature: SignatureResponse;
}
