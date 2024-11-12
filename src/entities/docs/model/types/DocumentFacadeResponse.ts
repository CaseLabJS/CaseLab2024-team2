import type { DocumentResponse } from '@/entities/docs/model/types/DocumentResponse';
import type { DocumentVersionResponse } from '@/entities/docs/model/types/DocumentVersionResponse';
import type { SignatureResponse } from '@/entities/signature/model/types/SignatureResponse.ts';
export interface DocumentFacadeResponse {
  document: DocumentResponse;
  latest_version: DocumentVersionResponse;
  signature: SignatureResponse;
}
