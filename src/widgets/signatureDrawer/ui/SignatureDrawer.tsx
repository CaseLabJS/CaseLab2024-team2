import type { ReactElement } from 'react';

import { Drawer, Typography, Button, Backdrop, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useState, useEffect } from 'react';

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

  const handleSubmit = (): void => {
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

    return (): void => {
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
        <FormControl fullWidth sx={{ mb: 15 }}>
          <InputLabel>Выберите пользователя</InputLabel>
          <Select
            value={selectedUser ? selectedUser.email : ''}
            onChange={(e) => {
              const userEmail = e.target.value;
              const user = userOptions.find((option) => option.email === userEmail);
              setSelectedUser(user || null);
            }}
            label="Выберите пользователя"
          >
            {userOptions.map((option) => (
              <MenuItem key={option.email} value={option.email}>
                <Typography>{option.name}</Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
