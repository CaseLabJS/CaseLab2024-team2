import type { DocumentTypeToAttributeResponse } from '@/entities/docs/model/types/DocumentTypeToAttributeResponse';
export interface DocumentTypeResponse {
  attributes: DocumentTypeToAttributeResponse[];
  id: number;
  name: string;
}
