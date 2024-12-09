import type { SelectChangeEvent } from '@mui/material';

import { documentsStore } from '@/entities/documents';
import { userStore } from '@/entities/user';
import { useToast } from '@/shared/hooks';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Typography, Box, Stack, Select, MenuItem, Modal } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useState, type ReactElement } from 'react';
import { useParams } from 'react-router-dom';

import style from './grantAccessWidget.module.css';

const GrantAccess = observer((): ReactElement => {
  const users = userStore.users
    .map((user) => user.email)
    .filter(
      (item) => !documentsStore.currentDocument?.document.user_permissions.map((item) => item.email).includes(item),
    );

  const { showToast } = useToast();

  const { documentId } = useParams();
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setIsOpen(true);
  };

  const handleClose = (): void => {
    setSelectedUser('');
    setIsOpen(false);
  };

  const handleChangeUser = (event: SelectChangeEvent): void => {
    setSelectedUser(event.target.value);
  };

  async function handleGrantAccess(): Promise<void> {
    try {
      if (documentId) {
        await documentsStore.grantAccess(Number(documentId), selectedUser);
        handleClose();
      }
    } catch {
      showToast('error', 'Ошибка предоставления доступа');
    }
  }

  return (
    <Box>
      <Button variant="outlined" onClick={handleOpen}>
        Дать доступ к документу
      </Button>
      <Modal open={isOpen} onClose={handleClose}>
        <Box className={style.boxCreate}>
          <CloseIcon color="primary" className={style.stylelinkIcon} onClick={handleClose} />
          <Stack direction="column" gap="20px" marginBottom="40px">
            <Typography variant="h6" className={style.titleCreate}>
              Предоставить доступ
            </Typography>
            <Stack>
              <Typography color="textDisabled">Выбор пользователя</Typography>
              {users.length > 0 && (
                <Select value={selectedUser} onChange={handleChangeUser}>
                  {users.map((item: string, index: number) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </Stack>
          </Stack>
          <Button onClick={handleGrantAccess} variant="contained" className={style.btnCreate}>
            Предоставить
          </Button>
        </Box>
      </Modal>
    </Box>
  );
});

export default GrantAccess;
