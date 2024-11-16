import type { ReactElement } from 'react';

import LaunchIcon from '@mui/icons-material/Launch';
import Button from '@mui/material/Button';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { NavLink } from "react-router-dom";
import * as Yup from 'yup';

import styles from './userForm.module.css';

export const CreateUser = (): ReactElement => {

  return (
    <div className={styles.userForm}>
      <div className={styles.userForm__head}>
        <p className={styles.userForm__title}>Создать пользователя</p>
        <NavLink className={styles.userForm__link} to={'ROUTE_CONSTANTS.ROOT'}>
          <LaunchIcon />
        </NavLink>
      </div>
      <Formik
        initialValues={{ user: '', email: '', password: '' }}
        validationSchema={Yup.object({
          user: Yup.string()
            .max(15, 'Введите не более 15 символов')
            .required('Введите имя пользователя'),
          email: Yup.string()
            .email('Email не действительный')
            .required('Введите Email'),
          password: Yup.string()
            .min(8, 'Введите не менее 8 символов')
            .required('Введите пароль'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          /**code to send data */
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className={styles.userForm__form}>
          <div className={styles.userForm__inputs}>
            <Field
              name="user"
              type="text"
              placeholder='Имя пользователя'
            />
            <div className={styles.userFrom__errorBox}>
              <ErrorMessage component="p" className={styles.userFrom__error} name="user" />
            </div>
            <Field
              name="email"
              type="email"
              placeholder='Email'
            />
            <div className={styles.userFrom__errorBox}>
              <ErrorMessage component="p" className={styles.userFrom__error} name="email" />
            </div>
            <Field
              name="password"
              type="password"
              placeholder='Пароль'
            />
            <div className={styles.userFrom__errorBox}>
              <ErrorMessage component="p" className={styles.userFrom__error} name="password" />
            </div>
          </div>
          <div className={styles.userForm__buttonContainer}>
            <Button variant="contained" type="submit" size="small">Создать</Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
