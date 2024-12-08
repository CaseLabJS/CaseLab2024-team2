import type { AttributeValueRequest } from '@/entities/attribute';
import type { CreateDocumentRequest } from '@/entities/documents';

type FormValues = Record<string, string | File>;

export function getFilledAttributes(values: FormValues): AttributeValueRequest[] {
  const filledAttributes: AttributeValueRequest[] = [];

  for (const key in values) {
    if (+key) {
      filledAttributes.push({
        attributeId: +key,
        value: values[key] as string,
      });
    }
  }

  return filledAttributes;
}

export function getNewDocumentParameters(documentTypeId: number, values: FormValues): CreateDocumentRequest {
  return {
    document_params: {
      document_type_id: documentTypeId,
      name: values.name as string,
      first_version_attributes: getFilledAttributes(values),
    },
    content: values.file as File,
  };
}
