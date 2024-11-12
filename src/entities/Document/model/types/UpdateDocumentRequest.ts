import type { AttributeValueRequest } from '@/entities/exemple/model/types/AttributeValueRequest';
export interface UpdateDocumentRequest {
  document_type_id: number;
  name: string;
  version_attributes: AttributeValueRequest[];
}
