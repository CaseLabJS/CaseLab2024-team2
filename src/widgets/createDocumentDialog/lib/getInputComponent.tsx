import type { CombinedAttribute } from '@/entities/attribute';
import type { useFormik } from 'formik';
import type { ReactElement } from 'react';

import { TextField } from '@mui/material';

export default function getInputComponent(
  attribute: CombinedAttribute,
  formik: ReturnType<typeof useFormik>,
): ReactElement {
  switch (attribute.type) {
    default:
      return (
        <TextField
          sx={{ mt: 2 }}
          key={attribute.id}
          name={attribute.id.toString()}
          label={attribute.name}
          value={(formik.values[attribute.id.toString()] as string) || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched[attribute.id.toString()]) && Boolean(formik.errors[attribute.id.toString()])}
          required={!attribute.is_optional}
          fullWidth
        />
      );
  }
}
