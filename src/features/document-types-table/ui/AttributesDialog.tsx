import type { DialogProps } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogContentText,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  DialogActions,
  Button,
} from '@mui/material';

const AttributesDialog = ({
  open,
  handleClose,
}: {
  open: DialogProps['open'];
  handleClose: () => void;
}): React.ReactElement => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Атрибуты</DialogTitle>
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
    <DialogContent dividers>
      <DialogContentText tabIndex={-1}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Название</TableCell>
                <TableCell>Обязательный</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[{ id: 1, r: true }].map((row) => (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell align="right">{row.r ? 'Да' : 'Нет'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Закрыть</Button>
    </DialogActions>
  </Dialog>
);

export default AttributesDialog;
