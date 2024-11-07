import type { DocumentTypeToAttributeRequest } from '../../../Document/model/types/DocumentTypeToAttributeRequest.ts';
export interface DocumentTypeRequest {
  name: string;
  attributes: DocumentTypeToAttributeRequest;
}
