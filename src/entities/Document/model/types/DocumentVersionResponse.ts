import type { AttributeValueResponse } from '@/entities/exemple/model/types/AttributeValueResponse';
export interface DocumentVersionResponse {
  id: number;
  attributes: AttributeValueResponse[];
  name: string;
  createdAt: string;
  documentId: number;
  signatureIds: number[];
  votingProcessesId: number[];
  contentName: string;
}
