import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
  display_name: Yup.string()
    .min(3, 'Имя должно содержать не менее 3 символов')
    .max(50, 'Имя должно содержать не более 50 символов')
    .required('Имя обязательно для заполнения'),

  email: Yup.string()
    .email('Введите корректный email')
    .matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Введите корректный email')
    .required('Email обязателен для заполнения'),

  password: Yup.string()
    .min(8, 'Пароль должен содержать не менее 8 символов')
    .matches(/[a-z]/, 'Пароль должен содержать хотя бы одну строчную букву')
    .matches(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
    .matches(/\d/, 'Пароль должен содержать хотя бы одну цифру')
    .required('Пароль обязателен для заполнения'),
});