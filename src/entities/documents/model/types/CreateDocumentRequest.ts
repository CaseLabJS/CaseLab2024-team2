import type { AttributeValueRequest } from '@/entities/attribute/model/types/AttributeValueRequest';
export interface CreateDocumentRequest {
  document_type_id: number;
  name: string;
  first_version_attributes: AttributeValueRequest[];
}
