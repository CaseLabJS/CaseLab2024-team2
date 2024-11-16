import type { DocumentResponse } from '@/entities/documents/model/types/documentResponse.type.ts';
import type { DocumentVersionResponse } from '@/entities/documents/model/types/documentVersionResponse.type.ts';
import type { SignatureResponse } from '@/entities/signature/model/types/signatureResponse.type.ts';
export interface DocumentFacadeResponse {
  document: DocumentResponse;
  latest_version: DocumentVersionResponse;
  signature: SignatureResponse;
}
