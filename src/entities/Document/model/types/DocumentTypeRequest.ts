import type { DocumentTypeToAttributeRequest } from '@/entities/document/model/types/DocumentTypeToAttributeRequest.ts';
export interface DocumentTypeRequest {
	name: string;
	attributes: DocumentTypeToAttributeRequest[];
}