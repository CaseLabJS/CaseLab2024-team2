import type { AuthenticationRequest } from '@/entities/auth';
import type { FormikHelpers } from 'formik';
import type React from 'react';

import { authStore } from '@/entities/auth';
import { AuthSchema } from '@/features/auth';
import { Box, Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import { useState, type ReactElement } from 'react';

import style from './signIn.module.css';

const SignIn = (): ReactElement => {
  const initialValues: AuthenticationRequest = {
    email: 'admin@gmail.com',
    password: '',
  };
  const [isAgree, setIsAgree] = useState<boolean>(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setIsAgree(event.target.checked);
  };

  const submitFormHandler = async (
    values: AuthenticationRequest,
    { setSubmitting }: FormikHelpers<AuthenticationRequest>,
  ): Promise<void> => {
    try {
      const body: AuthenticationRequest = { ...values };
      await authStore.login(body);
      alert('Пользователь успешно авторизирован!');
    } catch (error) {
      alert('Ошибка авторизации пользователя. Попробуйте снова.');
      throw error;
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
      <Box
        sx={{
          width: '714px',
          backgroundColor: '#fff',
          mx: 'auto',
          padding: '53px 57px 65px',
          borderRadius: '20px',
        }}
      >
        <Formik initialValues={initialValues} validationSchema={AuthSchema} onSubmit={submitFormHandler}>
          {({ errors, touched, isSubmitting, isValid, dirty, getFieldProps }) => (
            <Form className={style.signInForm}>
              <TextField
                label={errors.email || 'Email'}
                {...getFieldProps('email')}
                fullWidth
                margin="none"
                type="email"
                error={touched.email && Boolean(errors.email)}
              />

              <TextField
                label={errors.password || 'Пароль'}
                {...getFieldProps('password')}
                fullWidth
                margin="none"
                type="password"
                error={touched.password && Boolean(errors.password)}
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
                Sign In
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default SignIn;
