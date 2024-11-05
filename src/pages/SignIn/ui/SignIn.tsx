import React, { useState, type ReactElement } from 'react';
import { Form, Formik } from 'formik';
import type { FormikHelpers } from 'formik';

// import { devSignIn } from '@/shared/utils/dev/dev-utils';
import type { AuthenticationRequest } from '@/entities/User';
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { authUser } from '@/api/register-auth';
import { AuthSchema } from '@/features/auth';

export const SignIn = (): ReactElement => {
  const initialValues: AuthenticationRequest = {
    email: '',
    password: '',
  };
  const [isAgree, setIsAgree] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setIsAgree(event.target.checked);
  };

  const submitFormHandler = async (
    values: AuthenticationRequest,
    { setSubmitting }: FormikHelpers<AuthenticationRequest>,
  ): Promise<void> => {
    try {
      const body: AuthenticationRequest = { ...values };
      // Когда появится AuthStore, запрос нужно делать с его помощью.
      await authUser(body);
      alert('Пользователь успешно авторизирован!');
    } catch (error) {
      alert('Ошибка авторизации пользователя. Попробуйте снова.');
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
        <Formik initialValues={initialValues} validationSchema={AuthSchema} onSubmit={submitFormHandler}>
          {({ errors, touched, isSubmitting, isValid, dirty, getFieldProps }) => (
            <Form style={{ width: '600px', display: 'flex', flexDirection: 'column', rowGap: '16px' }}>
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
      </div>
    </div>
  );
  // return (
  //   <div>
  //     <h1>Вход</h1>
  //     <button>Войти</button>
  //     {/* Для разработки */}
  //     <div
  //       style={{
  //         backgroundColor: 'rgba(255, 205, 210, 0.8)',
  //         borderRadius: '12px',
  //         padding: '20px',
  //       }}
  //     >
  //       <button onClick={() => devSignIn('user')}>Войти как пользователь</button>
  //       <button onClick={() => devSignIn('admin')}>Войти как админ</button>
  //     </div>
  //     {/* Для разработки */}
  //   </div>
  // );
};
