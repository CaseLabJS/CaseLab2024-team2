import { SignatureResponse } from '../../Signature/model/SignatureResponse.ts';
export interface DocumentFacadeResponse {
document: DocumentResponse; // 
latest_version: DocumentVersionResponse; // 
signature: SignatureResponse; // 
}