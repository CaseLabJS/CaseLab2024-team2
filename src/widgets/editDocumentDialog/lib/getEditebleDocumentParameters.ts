import type { UpdateDocumentRequest } from '@/entities/documents';

import { getFilledAttributes } from '@/widgets/createDocumentDialog/lib/getNewDocumentParameters';

export function getEditebleDocumentParameters(
  documentTypeId: number,
  values: Record<string, string | File>,
): UpdateDocumentRequest {
  return {
    document_params: {
      document_type_id: documentTypeId,
      name: values.name as string,
      version_attributes: getFilledAttributes(values),
    },
    content: values.file as File,
  };
}
