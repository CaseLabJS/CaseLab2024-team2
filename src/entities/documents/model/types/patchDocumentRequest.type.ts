import type { AttributeValueRequest } from '@/entities/attribute/@x/documents';

export interface PatchDocumentRequest {
  document_type_id: number;
  name: string;
  version_attributes: AttributeValueRequest[];
}
