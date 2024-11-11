import type { DocumentTypeToAttributeRequest } from '../../../document/model/types/DocumentTypeToAttributeRequest.ts';
export interface DocumentTypeRequest {
  name: string;
  attributes: DocumentTypeToAttributeRequest[];
}
