import { Autocomplete, Drawer, TextField, Box, Typography, Button, Backdrop } from '@mui/material';
import { ReactElement, useState, useEffect } from 'react';

interface Option {
  email: string;
  name: string;
}

interface SignatureDrawerProps {
  isOpen: boolean;
  documentId?: string;
  documentName?: string;
  onClose: () => void;
}

const SignatureDrawer = ({
  isOpen,
  documentId = '100500',
  documentName = 'дефолтный',
  onClose,
}: SignatureDrawerProps): ReactElement => {
  const [selectedUser, setSelectedUser] = useState<Option | null>(null);

  // Здесь должны использоваться данные из usersStore
  const userOptions = [
    { email: 'user@yandex.ru', name: 'Иванов Иван' },
    { email: 'user2@gmail.com', name: 'Сидоров Казимир' },
  ];

  const handleSubmit = () => {
    if (!selectedUser) {
      alert('Пожалуйста, выберите пользователя.');
      return;
    }

    const requestData = {
      documentId,
      email: selectedUser.email,
      documentName: documentName.trim(),
    };
    // Здесь отправляем запрос на подпись документа
    console.log('Данные для запроса:', requestData);
    setSelectedUser(null);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  return (
    <>
      <Backdrop
        open={isOpen}
        onClick={onClose}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer - 1,
          backgroundColor: 'rgba(148, 148, 148, 0.68',
        }}
      />
      <Drawer
        sx={{
          width: '40%',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: '40%',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            padding: 2,
            boxShadow:
              '0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12)',
          },
        }}
        variant="persistent"
        anchor="right"
        open={isOpen}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 5 }}>
          {`Отправить документ ${documentName} на подпись`}
        </Typography>
        <Autocomplete
          disablePortal
          options={userOptions}
          fullWidth
          getOptionLabel={(option) => option.name}
          renderOption={(props, option) => {
            const { key, ...otherProps } = props;
            return (
              <Box
                key={key}
                {...otherProps}
                component="li"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography>{option.name}</Typography>
              </Box>
            );
          }}
          onChange={(_, value) => setSelectedUser(value)}
          value={selectedUser}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Имя пользователя"
              variant="standard"
              placeholder="Выберите пользователя"
              fullWidth
              sx={{ mb: 15 }}
            />
          )}
        />
        <Button
          variant="contained"
          size="medium"
          color="primary"
          onClick={handleSubmit}
          sx={{ alignSelf: 'center', width: 'fit-content' }}
        >
          Отправить
        </Button>
      </Drawer>
    </>
  );
};

export default SignatureDrawer;
