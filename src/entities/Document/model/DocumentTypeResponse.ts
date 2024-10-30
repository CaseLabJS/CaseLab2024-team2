import { DocumentTypeToAttributeResponse } from '../../Document/model/DocumentTypeToAttributeResponse.ts';
export interface DocumentTypeResponse {
attributes: DocumentTypeToAttributeResponse[]; // 
id: number; // ID типа документа
name: string; // Название типа документа
}