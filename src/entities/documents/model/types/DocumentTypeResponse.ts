import type { DocumentTypeToAttributeResponse } from '@/entities/documents/model/types/DocumentTypeToAttributeResponse';
export interface DocumentTypeResponse {
  attributes: DocumentTypeToAttributeResponse[];
  id: number;
  name: string;
}
