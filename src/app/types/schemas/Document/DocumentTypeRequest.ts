import { DocumentTypeToAttributeRequest } from '../Document/DocumentTypeToAttributeRequest.ts';
export interface DocumentTypeRequest {
name: string; // Название типа документа
attributes: DocumentTypeToAttributeRequest[]; // 
}