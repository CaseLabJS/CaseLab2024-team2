import type { DialogProps } from '@mui/material';

import { attributesStore, type StatefulAttribute } from '@/entities/attribute';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogTitle, IconButton, DialogContent, Stack, TextField, DialogActions, Button } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

const EditAttributeDialog = observer(
  ({
    open,
    handleClose,
    attribute,
  }: {
    open: DialogProps['open'];
    handleClose: () => void;
    attribute: StatefulAttribute;
  }): React.ReactElement => {
    const [name, setName] = useState<string>('');
    const [type, setType] = useState<string>('');

    const handleEdit = (): void => {
      void attributesStore.updateById(attribute.id, {
        name: name,
        type: type,
      });
      handleClose();
    };

    useEffect(() => {
      setName(attribute.name);
      setType(attribute.type);
    }, [attribute]);

    return (
      <>
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ textAlign: 'center' }}>Изменить атрибут</DialogTitle>
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
            <Stack
              spacing={2}
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TextField size="small" label="Название" value={name} onChange={(e) => setName(e.target.value)} />
              <TextField size="small" label="Тип" value={type} onChange={(e) => setType(e.target.value)} />
            </Stack>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: 'center',
              paddingY: '16px',
            }}
          >
            <Button variant="contained" color="primary" onClick={handleEdit}>
              Изменить
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  },
);

export default EditAttributeDialog;
