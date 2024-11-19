import type { DocumentTypeToAttributeRequest } from './documentTypeToAttributeRequest.type.ts';

export interface DocumentTypeRequest {
  name: string;
  attributes: DocumentTypeToAttributeRequest[];
}
