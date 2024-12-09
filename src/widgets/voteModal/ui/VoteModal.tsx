import { documentsStore } from '@/entities/documents';
import { votingStore } from '@/entities/vote';
import { DocumentStatus } from '@/shared/utils/statusTranslation';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Box, Modal, Typography, Stack } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useState, type ReactElement, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import style from './voteModal.module.css';

interface VoteModalProps {
  user: string;
}

const VoteModal = observer(({ user }: VoteModalProps): ReactElement => {
  const { documentId } = useParams();

  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setIsOpen(true);
  };

  const handleClose = (): void => {
    setIsOpen(false);
  };

  async function sendVoteUser(status: 'IN_FAVOUR' | 'AGAINST'): Promise<void> {
    await votingStore.addVoteDocument({ documentId: Number(documentId), status });
    setIsOpen(false);
    setIsAvailable(false);
  }

  useEffect(() => {
    documentsStore
      .getDocumentById(Number(documentId))
      .then(() => {
        if (documentsStore.currentDocument?.document.status === DocumentStatus.VOTING_IN_PROGRESS) {
          votingStore
            .isAvailibleVote(Number(documentId), user)
            .then((res) => {
              setIsAvailable(res);
            })
            .catch(() => setIsAvailable(false));
        }
      })
      .catch(() => {});
  }, [user, documentId]);

  if (!isAvailable) return <></>;

  return (
    <Box>
      <Button variant="outlined" onClick={handleOpen}>
        Проголосовать
      </Button>
      <Modal open={isOpen} onClose={handleClose}>
        <Box className={style.boxCreateAttribute}>
          <CloseIcon color="primary" className={style.stylelinkIcon} onClick={handleClose} />
          <Stack direction="column" gap="46px" marginBottom="56px">
            <Typography variant="h6" className={style.titleAddAttribute}>
              {votingStore.currentVoting?.name}
            </Typography>
            <Stack direction="row" justifyContent="center" gap="20px">
              <Button variant="contained" color="success" onClick={() => sendVoteUser('IN_FAVOUR')}>
                За
              </Button>
              <Button variant="contained" color="error" onClick={() => sendVoteUser('AGAINST')}>
                Против
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
});

export default VoteModal;
