import type { AttributeValueResponse } from '../../../Attribute/model/types/AttributeValueResponse.ts';
export interface DocumentVersionResponse {
  id: number;
  attributes: AttributeValueResponse;
  name: string;
  createdAt: string;
  documentId: number;
  signatureIds: number[];
  votingProcessesId: number[];
  contentName: string;
}
