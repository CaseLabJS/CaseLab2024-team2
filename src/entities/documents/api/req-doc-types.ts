import { api } from '@/shared/http';

type DocTypes = {
  attributes: [
    {
      attribute_id: number;
      is_optional: boolean;
    },
  ];
  id: number;
  name: string;
};

type DocTypesCreate = {
  name: string;
  attributes: [
    {
      attribute_id: number;
      is_optional: boolean;
    },
  ];
};

// получение типа документа по id
export const getDocType = async (id: number): Promise<DocTypes> => {
  const response = await api.get<DocTypes>(`/document_types/${id}`);
  return response.data;
};

// получение всех типов документов
export const getAllDocTypes = async (): Promise<DocTypes[]> => {
  const response = await api.get<DocTypes[]>('/document_types');
  return response.data;
};

// добавление типа документа
export const addDocType = async (createTypesDoc: DocTypesCreate): Promise<DocTypes> => {
  const response = await api.post<DocTypes>('/document_types', {
    createTypesDoc,
  });
  return response.data;
};

// обновление типа документа
export const updateDocType = async (id: number, updateTypesDoc: DocTypesCreate): Promise<DocTypes> => {
  const response = await api.put<DocTypes>(`/document_types/${id}`, {
    updateTypesDoc,
  });
  return response.data;
};

// удаление типа документа
export const deleteDocType = async (id: number): Promise<void> => {
  await api.delete(`/document_types/${id}`);
  return;
};
