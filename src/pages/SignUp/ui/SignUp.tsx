import { Form, Formik } from 'formik';
import type { FormikHelpers } from 'formik';

import { useState, type ReactElement } from 'react';

import type { RegisterRequest } from '@/entities/user';
import { SignupSchema } from '@/features/auth';

import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { useRootStore } from '@/app/providers/store';

export const SignUp = (): ReactElement => {
  const { userStore } = useRootStore();
  const initialValues: RegisterRequest = { display_name: '', email: '', password: '' };

  const [isAgree, setIsAgree] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setIsAgree(event.target.checked);
  };

  const submitFormHandler = async (
    values: RegisterRequest,
    { setSubmitting }: FormikHelpers<RegisterRequest>,
  ): Promise<void> => {
    try {
      const body: RegisterRequest = { ...values };
      await userStore.createUser(body);
      alert('Пользователь успешно зарегистрирован!');
    } catch (error) {
      alert('Ошибка регистрации пользователя. Попробуйте снова.');
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        width: '100vw',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '714px',
          boxSizing: 'border-box',
          margin: '0 auto',
          justifyContent: 'center',
          borderRadius: '20px',
          border: '1px solid black',
          padding: '53px 57px 65px',
        }}
      >
        <Formik initialValues={initialValues} validationSchema={SignupSchema} onSubmit={submitFormHandler}>
          {({ errors, touched, isSubmitting, isValid, dirty, getFieldProps }) => (
            <Form style={{ width: '600px', display: 'flex', flexDirection: 'column', rowGap: '16px' }}>
              <TextField
                label="Отображаемое имя"
                {...getFieldProps('display_name')}
                fullWidth
                margin="none"
                error={touched.display_name && Boolean(errors.display_name)}
                helperText={touched.display_name && errors.display_name}
              />

              <TextField
                label="Email"
                {...getFieldProps('email')}
                fullWidth
                margin="none"
                type="email"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />

              <TextField
                label="Пароль"
                {...getFieldProps('password')}
                fullWidth
                margin="none"
                type="password"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />

              <FormControlLabel
                control={<Checkbox checked={isAgree} onChange={handleChange} />}
                label="Я принимаю Правила и Условия пользования"
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={isSubmitting || !isAgree || !isValid || !dirty}
                fullWidth
              >
                Зарегистрироваться
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
