import type { ReactElement } from "react";

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

interface ConfirmationDialogProps {
  open: boolean
  onClose: () => void;
  onSubmit: () => void;
  children: ReactElement;
}

const ConfirmationDialog = ({ open, onClose, onSubmit, children }: ConfirmationDialogProps): ReactElement => {
  return <Dialog open={open} onClose={onClose}>
    <DialogTitle>Подтвердите действие</DialogTitle>
    <DialogContent>
      {children}
    </DialogContent>
    <DialogActions sx={{ alignItems: "end" }}>
      <Button onClick={onClose} variant="text">
        Отменить
      </Button>
      <Button onClick={onSubmit} variant="contained" color="error">
        Подтвердить
      </Button>
    </DialogActions>
  </Dialog>;
}

export default ConfirmationDialog;
