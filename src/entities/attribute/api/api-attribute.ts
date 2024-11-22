import type { PaginationRequest } from '@/shared/types/paginationRequest';

import { api } from '@/shared/http';
import { buildSearchParams } from '@/shared/utils/buildSearchParams';

import type { AttributesPageResponse } from '../';
import type { AttributeRequest, AttributeResponse } from '../index';

// получить атрибут по id
export const getAttributeDoc = async (id: number): Promise<AttributeResponse> => {
  const response = await api.get<AttributeResponse>(`/attributes/${id}`);
  return response.data;
};

// получить все атрибуты
export const getAllAttributeDocs = async (paginationRequest: PaginationRequest): Promise<AttributesPageResponse> => {
  const response = await api.get<AttributesPageResponse>(`/attributes`, {
    params: buildSearchParams(paginationRequest),
  });
  return response.data;
};

// добавить атрибут
export const addAttributeDoc = async (attribute: AttributeRequest): Promise<AttributeResponse> => {
  const response = await api.post<AttributeResponse>(`/attributes`, attribute);
  return response.data;
};

// обновить атрибут
export const updateAttributeDoc = async (id: number, updateAttribute: AttributeRequest): Promise<AttributeResponse> => {
  const response = await api.put<AttributeResponse>(`/attributes/${id}`, updateAttribute);
  return response.data;
};

// удалить атрибут
export const deleteAttributeDoc = async (id: number): Promise<void> => {
  await api.delete(`/attributes/${id}`);
  return;
};
