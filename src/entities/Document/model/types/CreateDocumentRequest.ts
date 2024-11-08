import type { AttributeValueRequest } from '../../../Attribute/model/types/AttributeValueRequest.ts';
export interface CreateDocumentRequest {
  document_type_id: number;
  name: string;
  first_version_attributes: AttributeValueRequest;
}
