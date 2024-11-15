import type { DialogProps } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogContentText,
  Stack,
  Box,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';

import TransferList from './TransferList';

const ManageDocumentTypeDialog = ({
  open,
  handleClose,
  edit = false,
}: {
  open: DialogProps['open'];
  handleClose: () => void;
  edit: boolean;
}): React.ReactElement => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle sx={{ textAlign: 'center' }}>{edit ? 'Изменить' : 'Добавить'} тип документа</DialogTitle>
    <IconButton
      aria-label="close"
      onClick={handleClose}
      sx={(theme) => ({
        position: 'absolute',
        right: 8,
        top: 8,
        color: theme.palette.grey[500],
      })}
    >
      <CloseIcon />
    </IconButton>
    <DialogContent>
      <DialogContentText tabIndex={-1}>
        <Stack spacing={2}>
          <Box sx={{ textAlign: 'center' }}>
            <TextField size="small" label="Название типа" />
          </Box>
          <TransferList leftData={[1, 2, 3, 4]} rightData={[5, 6, 7, 8]}></TransferList>
        </Stack>
      </DialogContentText>
    </DialogContent>
    <DialogActions
      sx={{
        justifyContent: 'center',
        paddingY: '16px',
      }}
    >
      {edit ? (
        <>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Сохранить
          </Button>
          <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={handleClose}>
            Удалить
          </Button>
        </>
      ) : (
        <Button variant="contained" color="primary" onClick={handleClose}>
          Добавить
        </Button>
      )}
    </DialogActions>
  </Dialog>
);

export default ManageDocumentTypeDialog;
