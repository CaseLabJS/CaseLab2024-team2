import type { AttributeValueRequest } from '@/entities/attribute/model/types/AttributeValueRequest.ts';
export interface PatchDocumentRequest {
	document_type_id: number;
	name: string;
	version_attributes: AttributeValueRequest[];
}