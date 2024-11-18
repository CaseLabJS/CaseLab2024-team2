import type { DocumentTypeResponse } from './documentTypeResponse.type';

export interface DocumentTypesPageResponse {
  content: DocumentTypeResponse[];
  empty: boolean;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
}
