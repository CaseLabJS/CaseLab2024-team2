import * as Yup from 'yup';

export const AuthSchema = Yup.object().shape({
  email: Yup.string()
    .email('Введите корректный email')
    .matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Введите корректный email')
    .required('Email обязателен'),

  password: Yup.string().required('Пароль обязателен'),
});
