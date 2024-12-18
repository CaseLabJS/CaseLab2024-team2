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

export interface SearchDocumentRequest {
  query: string;
  page: number;
  size: number;
}
// получение документа по id
export const getDocumentData = async (id: number): Promise<DocumentFacadeResponse> => {
  const response = await api.get<DocumentFacadeResponse>(`/documents-facade/${id}`);
  return response.data;
};

// получение всех документов пользователя текущего
export const getAllDocumentsData = async (
  paginationRequest: PaginationRequest,
): Promise<{ totalElements: number; content: DocumentFacadeResponse[] }> => {
  const response = await api.get<DocumentPageResponse>('/documents-facade/', {
    params: buildSearchParams(paginationRequest),
  });
  return { content: response.data.content, totalElements: response.data.totalElements };
};

// получение всех документов по поиску
export const searchDocumentsData = async (
  searchRequest: SearchDocumentRequest,
): Promise<{ totalElements: number; content: DocumentFacadeResponse[] }> => {
  const response = await api.get<DocumentPageResponse>(
    `/documents-facade/search?query=${searchRequest.query}&page=${searchRequest.page}&size=${searchRequest.size}`,
  );
  return { content: response.data.content, totalElements: response.data.totalElements };
};

// создание документа
export const createDocumentData = async (createDocument: CreateDocumentRequest): Promise<DocumentFacadeResponse> => {
  const formData = new FormData();

  formData.append(
    'document_params',
    new Blob([JSON.stringify(createDocument.document_params)], { type: 'application/json' }),
  );
  formData.append('content', createDocument.content);

  const response = await api.post<DocumentFacadeResponse>('/documents-facade/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// обновление документа
export const updateDocumentData = async (
  id: number,
  updateDocument: UpdateDocumentRequest,
): Promise<DocumentFacadeResponse> => {
  const formData = new FormData();

  formData.append(
    'document_params',
    new Blob([JSON.stringify(updateDocument.document_params)], { type: 'application/json' }),
  );
  formData.append('content', updateDocument.content);

  const response = await api.put<DocumentFacadeResponse>(`/documents-facade/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// частичное обновление документа
export const patchDocumentData = async (
  id: number,
  updateDocument: PatchDocumentRequest,
): Promise<DocumentFacadeResponse> => {
  const formData = new FormData();

  formData.append(
    'document_params',
    new Blob([JSON.stringify(updateDocument.document_params)], { type: 'application/json' }),
  );
  if (updateDocument?.content) formData.append('content', updateDocument.content);

  const response = await api.patch<DocumentFacadeResponse>(`/documents-facade/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// отправка документа в архив
export const deleteDocumentData = async (id: number): Promise<void> => {
  await api.delete(`/documents-facade/${id}`);
  return;
};

// скачивание документа
export const downloadDocumentData = async (id: number): Promise<Blob> => {
  const response = await api.get<Blob>(`/versions/content/${id}`, {
    responseType: 'blob',
  });
  return response.data;
};

// Добавляет разрешение для чтения документа для пользователя по его email
export const grantAccess = async (id: number, email: string): Promise<DocumentFacadeResponse> => {
  const response = await api.put<DocumentFacadeResponse>(`/documents-facade/${id}/grant-access-to/${email}`);
  return response.data;
};
