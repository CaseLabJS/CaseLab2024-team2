import { api } from '@/shared/http';

import type { AttributeRequest, AttributeResponse } from '../index';

// получить атрибут по id
export const getAttributeDoc = async (id: number): Promise<AttributeResponse> => {
  const response = await api.get<AttributeResponse>(`/attributes/${id}`);
  return response.data;
};

// получить все атрибуты
export const getAllAttributeDocs = async (): Promise<AttributeResponse[]> => {
  const response = await api.get<AttributeResponse[]>(`/attributes`);
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
