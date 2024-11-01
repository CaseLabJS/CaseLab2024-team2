import { registerUser } from '@/api/register-auth';
import { RegisterRequest } from '@/entities/User';
import { SignupSchema } from '@/features/auth';
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { Formik, Form, FormikHelpers } from 'formik';
import { useState, type ReactElement } from 'react';

const SignUp = (): ReactElement => {
  const initialValues: RegisterRequest = { display_name: '', email: '', password: '' };

  const [agree, setAgree] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgree(event.target.checked);
  };

  const submitFormHandler = async (values: RegisterRequest, { setSubmitting }: FormikHelpers<RegisterRequest>) => {
    try {
      const body: RegisterRequest = { ...values };
      await registerUser(body);
      alert('Пользователь успешно зарегистрирован!');
    } catch (error) {
      alert('Ошибка регистрации пользователя. Попробуйте снова.');
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
          {({ errors, touched, isSubmitting, getFieldProps }) => (
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
                control={<Checkbox checked={agree} onChange={handleChange} />}
                label="Я принимаю Правила и Условия пользования"
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={isSubmitting || !agree}
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

export default SignUp;
