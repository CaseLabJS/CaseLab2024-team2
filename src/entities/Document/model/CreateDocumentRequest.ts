import { AttributeValuePair } from '../../Attribute/model/AttributeValuePair.ts';
export interface CreateDocumentRequest {
document_type_id: number; // 
name: string; // 
first_version_name: string; // 
first_version_attributes_attributes: AttributeValuePair[]; // 
}