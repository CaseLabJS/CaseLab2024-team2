import type { AttributeValueRequest } from '@/entities/attribute/@x/documents';

export interface CreateDocumentRequest {
  document_params: {
    document_type_id: number;
    name: string;
    first_version_attributes: AttributeValueRequest[];
  },
  content: File,
}
