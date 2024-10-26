import { api } from "./api-config";

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
export const getAttributeDoc = async (id: number) => {
  const response = await api.get<Attribute>(`/attributes/${id}`);
  return response.data;
};

// получить все атрибуты
export const getAllAttributeDocs = async () => {
  const response = await api.get<Attribute[]>(`/attributes`);
  return response.data;
};

// добавить атрибут
export const addAttributeDoc = async (attribute: CreateAttribute) => {
  const response = await api.post<Attribute>(`/attributes`, attribute);
  return response.data;
};

// обновить атрибут
export const updateAttributeDoc = async (
  id: number,
  updateAttribute: CreateAttribute
) => {
  const response = await api.put<Attribute>(
    `/attributes/${id}`,
    updateAttribute
  );
  return response.data;
};

// удалить атрибут
export const deleteAttributeDoc = async (id: number) => {
  const response = await api.delete(`/attributes/${id}`);
  return response.data;
};
