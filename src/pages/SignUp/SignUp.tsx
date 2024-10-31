import { registerUser, UserRegister } from '@/api/register-auth';
import { SignupSchema } from '@/features/auth';
import { Field, Formik, Form } from 'formik';
import type { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

const SignUp = (): ReactElement => {
  const initialValues: UserRegister = { display_name: '', email: '', password: '' };
  // const formik = useFormik({
  //   initialValues: {
  //     firstName: '',
  //     lastName: '',
  //     email: '',
  //   },
  //   onSubmit: (values) => {
  //     alert(JSON.stringify(values, null, 2));
  //   },
  // });
  return (
    <div>
      <h1>Регистрация</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={(values, actions) => {
          registerUser(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <label htmlFor="display_name">Отображаемое имя</label>
            <Field id="firstName" name="display_name" placeholder="Иван Иванов" />
            {errors.display_name && touched.display_name ? <div>{errors.display_name}</div> : null}
            <label htmlFor="email">Email</label>
            <Field id="email" name="email" placeholder="ivanivanov@mail.ru" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <label htmlFor="password">password</label>
            <Field type="password" id="password" name="password" placeholder="Пароль" />
            {errors.password && touched.password ? <div>{errors.password}</div> : null}
            <button type="submit">Зарегистрироваться</button>
          </Form>
        )}
      </Formik>
      <p>
        Уже зарегистрированы? Нажмите <NavLink to={'/signin'}>здесь</NavLink>
      </p>
    </div>
  );
};

// {({ errors, touched }) => (
//   <Form>
//     <Field name="firstName" />
//     {errors.firstName && touched.firstName ? (
//       <div>{errors.firstName}</div>
//     ) : null}
//     <Field name="lastName" />
//     {errors.lastName && touched.lastName ? (
//       <div>{errors.lastName}</div>
//     ) : null}
//     <Field name="email" type="email" />
//     {errors.email && touched.email ? <div>{errors.email}</div> : null}
//     <button type="submit">Submit</button>
//   </Form>
// )}

export default SignUp;
