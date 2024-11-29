import type { PaginationRequest } from '@/shared/types/paginationRequest';

import { api } from '@/shared/http';
import { buildSearchParams } from '@/shared/utils/buildSearchParams';

import type { CreateDocumentRequest, DocumentFacadeResponse, PatchDocumentRequest, UpdateDocumentRequest } from '..';

export interface DocumentPageResponse {
  content: DocumentFacadeResponse[];
  empty: boolean;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
}

export interface SearchDocumentRequest extends PaginationRequest {
  query: string;
}
// получение документа по id
export const getDocumentData = async (id: number): Promise<DocumentFacadeResponse> => {
  const response = await api.get<DocumentFacadeResponse>(`/documents-facade/${id}`);
  return response.data;
};

// получение всех документов пользователя текущего
export const getAllDocumentsData = async (paginationRequest: PaginationRequest): Promise<DocumentFacadeResponse[]> => {
  const response = await api.get<DocumentPageResponse>('/documents-facade/', {
    params: buildSearchParams(paginationRequest),
  });
  return response.data.content;
};

// получение всех документов по поиску
export const searchDocumentsData = async (searchRequest: SearchDocumentRequest): Promise<DocumentFacadeResponse[]> => {
  const response = await api.get<DocumentPageResponse>('/documents-facade/', {
    params: buildSearchParams(searchRequest),
  });
  return response.data.content;
};

// создание документа
export const createDocumentData = async (createDocument: CreateDocumentRequest): Promise<DocumentFacadeResponse> => {
  const response = await api.post<DocumentFacadeResponse>('/documents-facade/', createDocument);
  return response.data;
};

// обновление документа
export const updateDocumentData = async (
  id: number,
  updateDocument: UpdateDocumentRequest,
): Promise<DocumentFacadeResponse> => {
  const response = await api.put<DocumentFacadeResponse>(`/documents-facade/${id}`, updateDocument);
  return response.data;
};

// частичное обновление документа
export const patchDocumentData = async (
  id: number,
  updateDocument: PatchDocumentRequest,
): Promise<DocumentFacadeResponse> => {
  const response = await api.put<DocumentFacadeResponse>(`/documents-facade/${id}`, updateDocument);
  return response.data;
};

// отправка документа в архив
export const deleteDocumentData = async (id: number): Promise<void> => {
  await api.delete(`/documents-facade/${id}`);
  return;
};
