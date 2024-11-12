import type { RegisterRequest } from '@/entities/user';
import type { FormikHelpers } from 'formik';

import { userStore } from '@/entities/user';
import { SignupSchema } from '@/features/auth';
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import { useState, type ReactElement } from 'react';

import style from './signUp.module.css';

const SignUp = (): ReactElement => {
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
    <div className={style.signUpContainer}>
      <div className={style.signUpBox}>
        <Formik initialValues={initialValues} validationSchema={SignupSchema} onSubmit={submitFormHandler}>
          {({ errors, touched, isSubmitting, isValid, dirty, getFieldProps }) => (
            <Form className={style.signUpForm}>
              <TextField
                label={errors.display_name || 'Отображаемое имя'}
                {...getFieldProps('display_name')}
                fullWidth
                margin="none"
                error={touched.display_name && Boolean(errors.display_name)}
              />

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
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
