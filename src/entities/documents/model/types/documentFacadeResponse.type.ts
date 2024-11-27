import type { DocumentResponse } from '@/entities/documents';
import type { DocumentVersionResponse } from '@/entities/documents';
import type { SignatureResponse } from '@/entities/signature/@x/documents';

export interface DocumentFacadeResponse {
  slice(arg0: number, arg1: number): unknown;
  document: DocumentResponse;
  latest_version: DocumentVersionResponse;
  signature: SignatureResponse;
}
