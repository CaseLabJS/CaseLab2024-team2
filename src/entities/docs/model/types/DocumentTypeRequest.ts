import type { DocumentTypeToAttributeRequest } from '@/entities/docs/model/types/DocumentTypeToAttributeRequest';
export interface DocumentTypeRequest {
  name: string;
  attributes: DocumentTypeToAttributeRequest[];
}
