import type { DocumentPermissionResponse } from '@/entities/document/model/types/DocumentPermissionResponse.ts';
export interface UserToDocumentResponse {
	email: string;
	document_permissions: DocumentPermissionResponse[];
}