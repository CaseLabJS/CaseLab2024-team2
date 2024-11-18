import type { AttributeResponse } from './attributeResponse.type';

export interface AttributesPageResponse {
  content: AttributeResponse[];
  empty: boolean;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
}
