import type { DocumentResponse } from '../../../Document/model/types/DocumentResponse.ts';
import type { DocumentVersionResponse } from '../../../Document/model/types/DocumentVersionResponse.ts';
import type { SignatureResponse } from '../../../Signature/model/types/SignatureResponse.ts';
export interface DocumentFacadeResponse {
  document: DocumentResponse;
  latest_version: DocumentVersionResponse;
  signature: SignatureResponse;
}
