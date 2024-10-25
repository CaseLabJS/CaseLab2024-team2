import { api } from "./api-config";

type Document = {
  id: number;
  document_type_id: number;
  name: string;
  document_versions_ids: number[];
  user_permissions: {
    email: string;
    document_permissions: {
      id: number;
      name: string;
    }[];
  }[];
};

type CreateDocument = {
  document_type_id: number;
  name: string;
  users_permissions: [
    {
      email: string;
      document_permissions: number[];
    }
  ];
};

// получение документа по id
export const getDocumentData = async (id: number) => {
  const response = await api.get<Document>(`/documents/${id}`);
  return response.data;
};

// получение всех документов
export const getAllDocumentsData = async () => {
  const response = await api.get<Document[]>("/documents");
  return response.data;
};

// создание документа
export const createDocumentData = async (createDocument: CreateDocument) => {
  const response = await api.post<Document>("/documents", {
    document_type_id: createDocument.document_type_id,
    name: createDocument.name,
    users_permissions: createDocument.users_permissions,
  });
  return response.data;
};

// обновление документа
export const updateDocumentData = async (
  id: number,
  updeteDocument: CreateDocument
) => {
  const response = await api.put<Document>(`/documents/${id}`, {
    document_type_id: updeteDocument.document_type_id,
    name: updeteDocument.name,
    users_permissions: updeteDocument.users_permissions,
  });
  return response.data;
};

// удаление документа
export const deleteDocumentData = async (id: number) => {
  const response = await api.delete(`/documents/${id}`);
  return response.data;
};
