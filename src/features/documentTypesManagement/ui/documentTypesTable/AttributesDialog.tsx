import type { CombinedAttribute } from '@/entities/attribute';
import type { DocumentTypeResponse } from '@/entities/documentsType';
import type { DialogProps } from '@mui/material';

import { attributesStore } from '@/entities/attribute';
import CloseIcon from '@mui/icons-material/Close';
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  DialogActions,
  Button,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

const AttributesDialog = observer(
  ({
    open,
    handleClose,
    documentType,
  }: {
    open: DialogProps['open'];
    handleClose: () => void;
    documentType: DocumentTypeResponse;
  }): React.ReactElement => {
    const [combinedDocumentAttributes, setCombinedDocumentAttributes] = useState<CombinedAttribute[]>();
    useEffect(() => {
      attributesStore
        .getCombinedDocumentAttributes(documentType)
        .then((combinedAttributes) => setCombinedDocumentAttributes(combinedAttributes))
        .catch(console.error);
    }, [documentType]);

    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Атрибуты</DialogTitle>
        <IconButton
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
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Название</TableCell>
                  <TableCell>Тип</TableCell>
                  <TableCell>Обязательный</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {combinedDocumentAttributes?.map((row) => (
                  <TableRow key={row.attribute_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{!row.is_optional ? 'Да' : 'Нет'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    );
  },
);

export default AttributesDialog;
