import type { DocumentTypeToAttributeResponse } from './documentTypeToAttributeResponse.type.ts';

export interface DocumentTypeResponse {
  attributes: DocumentTypeToAttributeResponse[];
  id: number;
  name: string;
}
