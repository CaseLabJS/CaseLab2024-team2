import type { DocumentTypeToAttributeRequest } from '@/entities/documents/model/types/DocumentTypeToAttributeRequest';
export interface DocumentTypeRequest {
  name: string;
  attributes: DocumentTypeToAttributeRequest[];
}
