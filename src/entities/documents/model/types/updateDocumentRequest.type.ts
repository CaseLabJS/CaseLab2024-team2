import type { AttributeValueRequest } from '@/entities/attribute/model/@x/documents';

export interface UpdateDocumentRequest {
  document_type_id: number;
  name: string;
  version_attributes: AttributeValueRequest[];
}
