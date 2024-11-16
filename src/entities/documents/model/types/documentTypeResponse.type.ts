import type { DocumentTypeToAttributeResponse } from '@/entities/documents/model/types/documentTypeToAttributeResponse.type.ts';
export interface DocumentTypeResponse {
  attributes: DocumentTypeToAttributeResponse[];
  id: number;
  name: string;
}
