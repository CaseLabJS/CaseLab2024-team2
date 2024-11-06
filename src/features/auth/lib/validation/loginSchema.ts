import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup.string().email('Введите корректный email').required('Email обязателен'),
  password: yup.string().min(8, 'Пароль должен быть не менее 8 символов').required('Пароль обязателен'),
});
