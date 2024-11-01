import { AttributeValuePair } from '../../Attribute/model/AttributeValuePair.ts';
export interface UpdateDocumentRequest {
document_type_id: number; // 
name: string; // Новое название документа
version_name: string; // 
version_attributes_attributes: AttributeValuePair[]; // 
}