import type { FormikHelpers } from 'formik';
import type React from 'react';

import { Form, Formik } from 'formik';
import { useState, type ReactElement } from 'react';

import type { AuthenticationRequest } from '@/entities/User';

import { AuthSchema } from '@/features/auth';
import { Box, Button, Checkbox, FormControlLabel, TextField } from '@mui/material';

import style from './SignIn.module.scss';
import { authStore } from '@/entities/auth/model/store';
import { useNavigate } from 'react-router-dom';

export const SignIn = (): ReactElement => {
  const navigate = useNavigate();
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
      navigate('/user');
    } catch (error) {
      alert('Ошибка авторизации пользователя. Попробуйте снова.');
      throw error;
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Box sx={{ width: '100vw' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '714px',
          mx: 'auto',
          my: '0',
          alignItems: 'center',
          padding: '53px 57px 65px',
          borderRadius: '20px',
          boxSizing: 'border-box',
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
