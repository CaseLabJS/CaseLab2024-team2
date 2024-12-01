import iconLink from '@/assets/iconLink.svg';
import { votingStore } from '@/entities/vote';
import { useToast } from '@/shared/hooks';
import { Button, Box, Modal, Typography, FormControlLabel, Checkbox, Stack } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useState, type ReactElement, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';

import style from './voteModal.module.css';

interface VoteModalProps {
  user: string;
}

const VoteModal = observer(({ user }: VoteModalProps): ReactElement => {
  const { documentId } = useParams();
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [isAvailible, setIsAvailible] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { showToast } = useToast();
  const stableShowToast = useCallback(showToast, [showToast]);

  const handleOpen = (): void => {
    setIsOpen(true);
  };

  const handleClose = (): void => {
    setIsOpen(false);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setIsChecked(event.target.checked);
  };

  async function sendVoteUser(): Promise<void> {
    await votingStore.addVoteDocument({ documentId: Number(documentId), status: isChecked ? 'IN_FAVUOR' : 'AGAINST' });
    showToast('success', 'Спасибо! Ваш голос учтен');
  }

  useEffect(() => {
    votingStore
      .isAvailibleVote(Number(documentId), user)
      .then((res) => {
        setIsAvailible(res);
      })
      .catch(() => {
        setIsAvailible(false);
        stableShowToast('error', 'Ошибка');
      });
  }, [stableShowToast]);

  if (!isAvailible) return <></>;

  return (
    <Box>
      <Button variant="outlined" onClick={handleOpen}>
        Проголосовать
      </Button>
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
    </Box>
  );
});

export default VoteModal;
