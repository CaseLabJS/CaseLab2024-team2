import type { DocumentTypeToAttributeResponse } from '../../../Document/model/types/DocumentTypeToAttributeResponse.ts';
export interface DocumentTypeResponse {
	attributes: DocumentTypeToAttributeResponse[];
	id: number;
	name: string;
}