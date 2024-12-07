import type { CombinedAttribute } from '@/entities/attribute';
import type { FormikConfig, FormikValues } from 'formik';

import * as Yup from 'yup';

function generateInitialValues(attributes: CombinedAttribute[]): object {
  const initialValues = {
    file: '',
  };

  for (const attribute of attributes) {
    Object.assign(initialValues, { [attribute.id.toString()]: '' });
  }

  return initialValues;
}

function generateValidationSchema(attributes: CombinedAttribute[]): object {
  const validationSchema = {
    file: Yup.mixed().required('Необходимо загрузить файл'),
  };

  attributes.map((attribute) => {
    let fieldValidation;

    switch (attribute.type) {
      default:
        fieldValidation = Yup.string();
    }

    if (!attribute.is_optional) fieldValidation = fieldValidation.required('Поле обязательно для заполнения');

    Object.assign(validationSchema, { [attribute.id.toString()]: fieldValidation });
  });

  return Yup.object(validationSchema);
}

export function getFormConfiguration(
  attributes: CombinedAttribute[],
  onSubmit: () => void,
): FormikConfig<FormikValues> {
  return {
    initialValues: generateInitialValues(attributes),
    validationSchema: generateValidationSchema(attributes),
    onSubmit,
  };
}
