import type { DocumentTypeToAttributeRequest } from '@/entities/documents/model/types/documentTypeToAttributeRequest.type.ts';
export interface DocumentTypeRequest {
  name: string;
  attributes: DocumentTypeToAttributeRequest[];
}
