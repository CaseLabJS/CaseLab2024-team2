export type FormValues = { name: string; file: File } & Record<number, string>;

export type AttributeWithValue = {
  attributeId: number;
  value: string;
};

export function getFormData(documentTypeId: number, values: FormValues): FormData {
  const formData = new FormData();
  const documentParams = {
    document_type_id: documentTypeId,
    name: values.name,
    first_version_attributes: [] as AttributeWithValue[],
  };

  for (const key in values) {
    if (+key) {
      documentParams.first_version_attributes.push({
        attributeId: +key,
        value: values[key],
      });
    }
  }

  formData.append('document_params', JSON.stringify(documentParams));
  formData.append('content', values.file, values.file.name);

  return formData;
}
