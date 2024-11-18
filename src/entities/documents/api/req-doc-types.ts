import type { PaginationRequest } from '@/shared/types/paginationRequest';

import { api } from '@/shared/http';
import { buildSearchParams } from '@/shared/utils/buildSearchParams';

import type { DocumentTypeRequest } from '../model/types/documentTypeRequest.type';
import type { DocumentTypeResponse } from '../model/types/documentTypeResponse.type';
import type { DocumentTypesPageResponse } from '../model/types/documentTypesPageResponse.type';

// получение типа документа по id
export const getDocType = async (id: number): Promise<DocumentTypeResponse> => {
  const response = await api.get<DocumentTypeResponse>(`/document_types/${id}`);
  return response.data;
};

// получение всех типов документов
export const getAllDocTypes = async (paginationRequest: PaginationRequest): Promise<DocumentTypesPageResponse> => {
  const response = await api.get<DocumentTypesPageResponse>('/document_types', {
    params: buildSearchParams(paginationRequest),
  });
  return response.data;
};

// добавление типа документа
export const addDocType = async (createTypesDoc: DocumentTypeRequest): Promise<DocumentTypeResponse> => {
  const response = await api.post<DocumentTypeResponse>('/document_types', createTypesDoc);
  return response.data;
};

// обновление типа документа
export const updateDocType = async (id: number, updateTypesDoc: DocumentTypeRequest): Promise<DocumentTypeResponse> => {
  const response = await api.put<DocumentTypeResponse>(`/document_types/${id}`, updateTypesDoc);
  return response.data;
};

// удаление типа документа
export const deleteDocType = async (id: number): Promise<void> => {
  await api.delete(`/document_types/${id}`);
  return;
};
