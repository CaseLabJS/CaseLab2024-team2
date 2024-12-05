import type { ReactElement } from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  children: ReactElement;
}

const ConfirmationDialog = ({ open, onClose, onSubmit, children }: ConfirmationDialogProps): ReactElement => {
  function submitAndClose(): void {
    onSubmit();
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Подтвердите действие</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions sx={{ alignItems: 'end', mr: 2, mb: 2 }}>
        <Button onClick={onClose} variant="text">
          Отменить
        </Button>
        <Button onClick={submitAndClose} variant='contained'>
          Подтвердить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
