import { api } from "./api-config";

// получить атрибут по id
export const getAttributeDoc = async (id: number) => {
  const response = await api.get<{ id: number; name: string; type: string }>(
    `/attributes/${id}`
  );
  return response.data;
};

// получить все атрибуты
export const getAllAttributeDocs = async () => {
  const response = await api.get<{ id: number; name: string; type: string }[]>(
    `/attributes`
  );
  return response.data;
};

// добавить атрибут
export const addAttributeDoc = async (name: string, type: string) => {
  const response = await api.post<{ id: number; name: string; type: string }>(
    `/attributes`,
    { name, type }
  );
  return response.data;
};

// обновить атрибут
export const updateAttributeDoc = async (
  id: number,
  name: string,
  type: string
) => {
  const response = await api.put<{ id: number; name: string; type: string }>(
    `/attributes/${id}`,
    { name, type }
  );
  return response.data;
};

// удалить атрибут
export const deleteAttributeDoc = async (id: number) => {
  const response = await api.delete(`/attributes/${id}`);
  return response.data;
};
