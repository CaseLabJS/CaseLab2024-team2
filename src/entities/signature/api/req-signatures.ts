import type { SignatureCreateRequest, SignatureResponse } from '@/entities/signature';

import { api } from '@/shared/http';

// получение всех подписей
export const getSignatures = async (): Promise<SignatureResponse[]> => {
  const response = await api.get<SignatureResponse[]>('/signatures/all');
  return response.data;
};

// получение всех подписей документа
export const getDocumentSignatures = async (documentId: number): Promise<SignatureResponse[]> => {
  const response = await api.get<SignatureResponse[]>(`/signatures/all${documentId}`);
  return response.data;
};

// отправить документ на подпись
export const sendDocument = async (signatureData: SignatureCreateRequest): Promise<SignatureResponse> => {
  const response = await api.post<SignatureResponse>('/signatures/send', signatureData);
  return response.data;
};

// подписать документ
export const signDocument = async (id: number, status: boolean): Promise<SignatureResponse> => {
  const response = await api.post<SignatureResponse>(`/signatures/sign/${id}`, status);
  return response.data;
};
