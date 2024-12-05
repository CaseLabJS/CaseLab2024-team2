import type { ReactElement } from 'react';

import { ROUTE_CONSTANTS } from '@/app/providers/router/config/constants';
import { authStore } from '@/entities/auth';
import { userStore } from '@/entities/user';
import { Inbox, LocationOn, Edit, VisibilityOff, Visibility } from '@mui/icons-material';
import {
  Icon,
  Stack,
  Typography,
  Snackbar,
  Divider,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  FormHelperText,
} from '@mui/material';
import { Formik, Field, Form } from 'formik';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';

const UserPageInfo = observer((): ReactElement => {
  const [isShowPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSnackbarMessage, setSnackbarMessage] = useState<string | null>(null);

  const validationSchema = Yup.object().shape({
    display_name: Yup.string()
      .min(3, 'Имя должно содержать не менее 3 символов')
      .max(50, 'Имя должно содержать не более 50 символов')
      .required('Имя обязательно для заполнения'),
    password: Yup.string()
      .min(8, 'Пароль должен содержать не менее 8 символов')
      .max(32, 'Пароль должен содержать не более 32 символов')
      .matches(/[a-z]/, 'Пароль должен содержать хотя бы одну строчную букву')
      .matches(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
      .matches(/\d/, 'Пароль должен содержать хотя бы одну цифру')
      .required('Пароль обязателен для заполнения'),
  });

  const handleEditClick = (): void => {
    setIsEditing(true);
  };

  const handleSave = async (values: { display_name: string; password: string }): Promise<void> => {
    try {
      await userStore.editUserData({
        display_name: values.display_name,
        password: values.password,
        email: authStore.email,
      });

      // Обновить authStore
      authStore.displayName = values.display_name;
      setIsEditing(false);
      setSnackbarMessage('Данные успешно обновлены!');
    } catch (error) {
      console.error('Ошибка при обновлении данных пользователя:', error);
    }
  };

  const handleCancel = (): void => {
    setIsEditing(false);
  };

  const handleClickShowPassword = (): void => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
  };

  const handleCopyEmail = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(authStore.email);
      setSnackbarMessage('Email скопирован!');
    } catch (error) {
      console.error('Ошибка при копировании email:', error);
    }
  };

  return (
    <Formik
      initialValues={{
        display_name: authStore.displayName,
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSave}
    >
      {({ errors, touched }) => (
        <Form>
          <Stack direction="row" spacing="8px" alignItems="center" position="relative">
            {isEditing ? (
              <>
                <div>
                  <Field
                    name="display_name"
                    as={TextField}
                    label="Имя"
                    size="small"
                    variant="outlined"
                    sx={{ width: '250px' }}
                    error={touched.display_name && Boolean(errors.display_name)}
                  />

                  <FormHelperText
                    error={touched.display_name && Boolean(errors.display_name)}
                    sx={{
                      position: 'absolute',
                      top: '100%',
                      width: '200px',
                      background: '#fff',
                      borderRadius: '10px',
                      padding: '5px',
                      opacity: touched.display_name && errors.display_name ? 1 : 0, // скрыто, если нет ошибки
                      transform: touched.display_name && errors.display_name ? 'translateY(0)' : 'translateY(-10px)', // начинаем с маленьким сдвигом
                      transition: 'opacity 0.3s ease, transform 0.3s ease', // плавная анимация
                    }}
                  >
                    {touched.display_name && errors.display_name ? errors.display_name : ''}
                  </FormHelperText>
                </div>

                <div>
                  <Field
                    name="password"
                    as={TextField}
                    label="Пароль"
                    type={isShowPassword ? 'text' : 'password'}
                    size="small"
                    variant="outlined"
                    sx={{ width: '250px' }}
                    error={touched.password && Boolean(errors.password)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {isShowPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <FormHelperText
                    error={touched.password && Boolean(errors.password)}
                    sx={{
                      position: 'absolute',
                      top: '100%',
                      width: '200px',
                      background: '#fff',
                      borderRadius: '10px',
                      padding: '5px',
                      opacity: touched.password && errors.password ? 1 : 0,
                      transform: touched.password && errors.password ? 'translateY(0)' : 'translateY(-10px)',
                      transition: 'opacity 0.3s ease, transform 0.3s ease',
                    }}
                  >
                    {touched.password && errors.password ? errors.password : ''}
                  </FormHelperText>
                </div>

                <Button variant="contained" color="primary" type="submit">
                  Сохранить
                </Button>
                <Button variant="text" onClick={handleCancel}>
                  Отмена
                </Button>
              </>
            ) : (
              <>
                <Typography variant="h4" component="h1">
                  {authStore.displayName}
                </Typography>
                <Icon color="action" onClick={handleEditClick} style={{ cursor: 'pointer' }}>
                  <Edit />
                </Icon>
              </>
            )}
            <Button
              component={NavLink}
              to={ROUTE_CONSTANTS.USER_DOCUMENTS.path}
              variant="outlined"
              color="primary"
              sx={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                textTransform: 'none', // чтобы сохранить оригинальный текст
              }}
            >
              Документы
            </Button>
          </Stack>
          <Stack direction="row" spacing={'16px'} sx={{ margin: '8px 0' }} alignItems="center">
            <Icon color="action">
              <LocationOn />
            </Icon>
            <Typography variant="body1">Название организации(как идея)</Typography>
            <Icon color="action">
              <Inbox />
            </Icon>
            <Typography
              variant="body1"
              onClick={handleCopyEmail}
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
            >
              {authStore.email}
            </Typography>
          </Stack>
          <Divider />
          <Snackbar
            open={Boolean(isSnackbarMessage)}
            autoHideDuration={2000}
            onClose={() => setSnackbarMessage(null)}
            message={isSnackbarMessage}
          />
        </Form>
      )}
    </Formik>
  );
});

export default UserPageInfo;
