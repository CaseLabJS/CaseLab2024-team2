export interface SignatureResponse {
	id: number;
	name: string;
	status: string;
	sentAt: string;
	signedAt: string;
	signatureData: string;
	email: string;
	documentId: number;
}