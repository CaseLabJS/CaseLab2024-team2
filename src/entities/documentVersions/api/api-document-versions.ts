import type { DocumentVersionResponse } from '@/entities/documents';
import type { PaginationRequest } from '@/shared/types/paginationRequest';

import { api } from '@/shared/http';
import { buildSearchParams } from '@/shared/utils/buildSearchParams';

type PaginationInfo = {
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      sorted: boolean;
      empty: boolean;
      unsorted: boolean;
    };
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    empty: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
};

type PaginatedResponse<T> = {
  content: T[];
} & PaginationInfo;

// Возвращает версию документа по указанному id
export const getDocumentVersionById = async (id: number): Promise<DocumentVersionResponse> => {
  const response = await api.get<DocumentVersionResponse>(`/versions/${id}`);
  return response.data;
};

// Возвращает все версии документа по id документа. Доступно только администратору либо создателю документа
export const getDocumentVersionsByDocumentId = async (
  id: number,
  paginationRequest: PaginationRequest,
): Promise<DocumentVersionResponse[]> => {
  const response = await api.get<PaginatedResponse<DocumentVersionResponse>>(`/versions/document/${id}`, {
    params: buildSearchParams(paginationRequest),
  });
  return response.data.content;
};
