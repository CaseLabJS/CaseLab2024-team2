import type { DocumentTypeToAttributeResponse } from '@/entities/document/model/types/DocumentTypeToAttributeResponse.ts';
export interface DocumentTypeResponse {
	attributes: DocumentTypeToAttributeResponse[];
	id: number;
	name: string;
}