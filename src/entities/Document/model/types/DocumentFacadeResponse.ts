import type { DocumentResponse } from '../../../document/model/types/DocumentResponse.ts';
import type { DocumentVersionResponse } from '../../../document/model/types/DocumentVersionResponse.ts';
import type { SignatureResponse } from '../../../signature/model/types/SignatureResponse.ts';
export interface DocumentFacadeResponse {
  document: DocumentResponse;
  latest_version: DocumentVersionResponse;
  signature: SignatureResponse;
}
