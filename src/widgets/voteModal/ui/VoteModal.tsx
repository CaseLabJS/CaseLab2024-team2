import iconLink from '@/assets/iconLink.svg';
import { votingStore } from '@/entities/vote';
import { Button, Box, Modal, Typography, FormControlLabel, Checkbox, Stack } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useState, type ReactElement } from 'react';

import style from './voteModal.module.css';

interface VoteModalProps {
  documentId: number;
  handleClose: () => void;
  isOpen: boolean;
}

const VoteModal = observer(({ documentId, isOpen, handleClose }: VoteModalProps): ReactElement => {
  const [isChecked, setIsChecked] = useState<boolean>(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setIsChecked(event.target.checked);
  };

  async function sendVoteUser(): Promise<void> {
    await votingStore.addVoteDocument({ documentId: documentId, status: isChecked ? 'IN_FAVUOR' : 'AGAINST' });
  }

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box className={style.boxCreateAttribute}>
        <Box className={style.stylelinkIcon} onClick={handleClose}>
          <img src={iconLink} alt="Изображение икноки вернуться" />
        </Box>
        <Stack direction="column" gap="46px" marginBottom="56px">
          <Typography variant="h6" className={style.titleAddAttribute}>
            Проголосовать
          </Typography>
          <FormControlLabel
            className={style.formControl}
            control={<Checkbox checked={isChecked} onChange={handleChange} />}
            label="Поддерживаю"
          />
          <Stack direction="row" justifyContent="center" gap="20px">
            <Button variant="contained" onClick={sendVoteUser}>
              Сохранить
            </Button>
            <Button variant="contained" color="error" onClick={handleClose}>
              Удалить
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
});

export default VoteModal;
