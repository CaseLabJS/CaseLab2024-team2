import type { DocumentResponse } from '@/entities/document/model/types/DocumentResponse.ts';
import type { DocumentVersionResponse } from '@/entities/document/model/types/DocumentVersionResponse.ts';
import type { SignatureResponse } from '@/entities/signature/model/types/SignatureResponse.ts';
export interface DocumentFacadeResponse {
	document: DocumentResponse;
	latest_version: DocumentVersionResponse;
	signature: SignatureResponse;
}