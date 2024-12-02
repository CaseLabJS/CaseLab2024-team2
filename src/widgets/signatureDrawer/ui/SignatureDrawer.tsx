import type { SignatureResponse } from '@/entities/signature';
import type { UserResponse } from '@/entities/user';
import type { ReactElement } from 'react';

import { signaturesStore } from '@/entities/signature';
import { userStore } from '@/entities/user';
import { Drawer, Typography, Button, Backdrop, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useState, useEffect } from 'react';

interface SignatureDrawerProps {
  isOpen: boolean;
  documentId: number;
  documentName: string;
  onClose: () => void;
  signatures: SignatureResponse[];
}

const SignatureDrawer = observer(
  ({ isOpen, documentId, documentName, onClose, signatures }: SignatureDrawerProps): ReactElement => {
    const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);

    const userOptions = userStore.users;
    const notSignedUsers = userOptions.filter(
      (user) => !signatures.some((signature) => signature.email === user.email),
    );

    const handleSubmit = (): void => {
      // TODO сделать валидацию
      if (!selectedUser) {
        alert('Пожалуйста, выберите пользователя.');
        return;
      }

      const requestData = {
        documentId,
        email: selectedUser.email,
        name: documentName,
      };

      signaturesStore.sendDocumentToSign(requestData).catch(console.error);
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
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: 3,
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
          <FormControl fullWidth sx={{ mb: 15, marginBottom: '20px' }}>
            <InputLabel>Выберите пользователя</InputLabel>
            <Select
              value={selectedUser ? selectedUser.email : ''}
              onChange={(e) => {
                const userEmail = e.target.value;
                const user = notSignedUsers.find((option) => option.email === userEmail);
                setSelectedUser(user || null);
              }}
              label="Выберите пользователя"
              MenuProps={{
                sx: {
                  maxHeight: '70%',
                },
              }}
            >
              {notSignedUsers.map((option) => (
                <MenuItem key={option.email} value={option.email}>
                  <Typography sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    {option.display_name} <Box sx={{ color: 'text.secondary', display: 'inline' }}>{option.email}</Box>
                  </Typography>
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
  },
);

export default SignatureDrawer;
