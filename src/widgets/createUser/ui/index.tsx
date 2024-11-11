import type { ReactElement } from 'react';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import styles from './userForm.module.css';

export const CreateUserForm = (): ReactElement => {
  return (
    <div className={styles.userForm}>
      <p className={styles.userForm__title}>Создать пользователя</p>
      <Formik
        initialValues={{ user: '', email: '', password: '' }}
        validationSchema={Yup.object({
          user: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          password: Yup.string()
            .min(8, 'Must be 8 characters or more')
            .required('Required'),

        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className={styles.userForm__form}>
          <div>
            <Field name="user" type="text" placeholder='Имя пользователя' />
            <ErrorMessage className={styles.userFrom__error} name="user" />

            <Field name="email" type="email" placeholder='Email' />
            <ErrorMessage className={styles.userFrom__error} name="email" />

            <Field name="password" type="text" placeholder='Пароль' />
            <ErrorMessage className={styles.userFrom__error} name="password" />
          </div>
          <button className={styles.userForm__button} type="submit">Создать</button>
        </Form>
      </Formik>
    </div>
  );
};
