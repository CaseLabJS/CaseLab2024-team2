import { api } from "./api-config";

type Signature = {
  id: number;
  name: string;
  status: "SIGNED";
  sentAt: string;
  signedAt: string;
  signatureData: string;
  email: string;
  documentVersionId: number;
};
type SignatureData = {
  documentVersionId: number;
  name: string;
  email: string;
};

// получение всех подписей
export const getSignatures = async () => {
  const response = await api.get<Signature[]>("/signatures/all");
  return response.data;
};

// отправить документ на подпись
export const sendDocument = async (signatureData: SignatureData) => {
  const response = await api.post<Signature>("/signatures/send", signatureData);
  return response.data;
};

// подписать документ
export const signDocument = async (id: number, status: boolean) => {
  const response = await api.post<Signature>(`/signatures/sign/${id}`, status);
  return response.data;
};
