import { registerUser } from '@/api/register-auth';
import { RegisterRequest } from '@/entities/User';
import { SignupSchema } from '@/features/auth';
import { Field, Formik, Form, FormikHelpers } from 'formik';
import type { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

const SignUp = (): ReactElement => {
  const initialValues: RegisterRequest = { display_name: '', email: '', password: '' };

  const submitFormHandler = async (values: RegisterRequest, { setSubmitting }: FormikHelpers<RegisterRequest>) => {
    // localStorage.setItem(
    //   'token',
    //   'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3MzA0MDc0NDMsImV4cCI6MTczMDQwOTI0M30.FbIjdDftn9walcxOPq2VtOFCS4aTEnZRdkimvO6SGv4',
    // );
    const body: RegisterRequest = { ...values };
    await registerUser(body);
    setSubmitting(false);
  };

  return (
    <div>
      <h1>Регистрация</h1>
      <Formik initialValues={initialValues} validationSchema={SignupSchema} onSubmit={submitFormHandler}>
        {({ errors, touched }) => (
          <Form>
            <label htmlFor="display_name">Отображаемое имя</label>
            <Field id="display_name" name="display_name" placeholder="Иван Иванов" />
            {errors.display_name && touched.display_name && <div>{errors.display_name}</div>}

            <label htmlFor="email">Email</label>
            <Field id="email" name="email" type="email" placeholder="ivanivanov@mail.ru" />
            {errors.email && touched.email && <div>{errors.email}</div>}

            <label htmlFor="password">Пароль</label>
            <Field id="password" name="password" type="password" placeholder="Пароль" />
            {errors.password && touched.password && <div>{errors.password}</div>}

            <button type="submit">Зарегистрироваться</button>
          </Form>
        )}
      </Formik>
      <p>
        Уже зарегистрированы? Нажмите <NavLink to="/signin">здесь</NavLink>
      </p>
    </div>
  );
};

export default SignUp;
