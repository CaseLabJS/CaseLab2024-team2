import { DocumentTypeToAttributeRequest } from '../../Document/model/DocumentTypeToAttributeRequest.ts';
export interface DocumentTypeRequest {
  name: string; // Название типа документа
  attributes: DocumentTypeToAttributeRequest[]; //
}
