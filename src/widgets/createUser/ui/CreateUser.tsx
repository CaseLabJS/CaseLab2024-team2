import type { RegisterRequest } from '@/entities/user';
import type { FormikHelpers } from 'formik';
import type { ReactElement } from 'react';

import { userStore } from '@/entities/user/model/store/userStore';
import { SignupSchema } from '@/features/auth';
import LaunchIcon from '@mui/icons-material/Launch';
import Button from '@mui/material/Button';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { NavLink } from 'react-router-dom';

import styles from './userForm.module.css';

const CreateUser = (): ReactElement => {
  const initialValues: RegisterRequest = { display_name: '', email: '', password: '' };

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
    <div className={styles.userForm}>
      <div className={styles.userForm__head}>
        <p className={styles.userForm__title}>Создать пользователя</p>
        <NavLink className={styles.userForm__link} to={'ROUTE_CONSTANTS.ROOT'}>
          <LaunchIcon />
        </NavLink>
      </div>
      <Formik initialValues={initialValues} validationSchema={SignupSchema} onSubmit={submitFormHandler}>
        <Form className={styles.userForm__form}>
          <div className={styles.userForm__inputs}>
            <Field name="display_name" type="text" placeholder="Имя пользователя" />
            <div className={styles.userFrom__errorBox}>
              <ErrorMessage component="p" className={styles.userFrom__error} name="display_name" />
            </div>
            <Field name="email" type="email" placeholder="Email" />
            <div className={styles.userFrom__errorBox}>
              <ErrorMessage component="p" className={styles.userFrom__error} name="email" />
            </div>
            <Field name="password" type="password" placeholder="Пароль" />
            <div className={styles.userFrom__errorBox}>
              <ErrorMessage component="p" className={styles.userFrom__error} name="password" />
            </div>
          </div>
          <div className={styles.userForm__buttonContainer}>
            <Button variant="contained" type="submit" size="small">
              Создать
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateUser;
