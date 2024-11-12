import type { AttributeValueRequest } from '@/entities/exemple/model/types/AttributeValueRequest';
export interface CreateDocumentRequest {
  document_type_id: number;
  name: string;
  first_version_attributes: AttributeValueRequest[];
}
