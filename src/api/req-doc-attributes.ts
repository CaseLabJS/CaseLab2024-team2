import { api } from '@/shared/http';

type Attribute = {
  id: number;
  name: string;
  type: string;
};

type CreateAttribute = {
  name: string;
  type: string;
};

// получить атрибут по id
export const getAttributeDoc = async (id: number): Promise<Attribute> => {
  const response = await api.get<Attribute>(`/attributes/${id}`);
  return response.data;
};

// получить все атрибуты
export const getAllAttributeDocs = async (): Promise<Attribute[]> => {
  const response = await api.get<Attribute[]>(`/attributes`);
  return response.data;
};

// добавить атрибут
export const addAttributeDoc = async (attribute: CreateAttribute): Promise<Attribute> => {
  const response = await api.post<Attribute>(`/attributes`, attribute);
  return response.data;
};

// обновить атрибут
export const updateAttributeDoc = async (id: number, updateAttribute: CreateAttribute): Promise<Attribute> => {
  const response = await api.put<Attribute>(`/attributes/${id}`, updateAttribute);
  return response.data;
};

// удалить атрибут
export const deleteAttributeDoc = async (id: number): Promise<void> => {
  await api.delete(`/attributes/${id}`);
  return;
};
