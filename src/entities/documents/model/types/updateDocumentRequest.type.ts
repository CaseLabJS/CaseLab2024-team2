import type { AttributeValueRequest } from '@/entities/attribute/@x/documents';

export interface UpdateDocumentRequest {
  document_params: {
    document_type_id: number;
    name: string;
    version_attributes: AttributeValueRequest[];
  };
  content: File;
}
