import type { AttributeValueResponse } from '@/entities/attribute/model/types/AttributeValueResponse.ts';
export interface DocumentVersionResponse {
	id: number;
	attributes: AttributeValueResponse[];
	name: string;
	createdAt: string;
	documentId: number;
	signatureIds: number[];
	votingProcessesId: number[];
	contentName: string;
}