import type { CombinedAttribute } from '@/entities/attribute';
import type { DocumentTypeResponse, DocumentTypeToAttributeRequest } from '@/entities/documentsType';
import type { DialogProps } from '@mui/material';

import { attributesStore } from '@/entities/attribute';
import { documentTypesStore } from '@/entities/documentsType/model/store/documentTypesStore';
import { useToast } from '@/shared/hooks';
import { ConfirmationDialog } from '@/widgets/confirmationDialog';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Stack,
  Box,
  TextField,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

import AddAttributesDialog from './AddAttributesDialog';
import AttributesTable from './AttributesTable';

const ManageDocumentTypeDialog = observer(
  ({
    open,
    handleClose,
    documentType,
  }: {
    open: DialogProps['open'];
    handleClose: () => void;
    documentType?: DocumentTypeResponse | null;
  }): React.ReactElement => {
    const [name, setName] = useState<string>('');
    const [attributes, setAttributes] = useState<DocumentTypeToAttributeRequest[]>([]);
    const [isAddAtributeDialogOpen, setIsAddAtributeDialogOpen] = useState(false);
    const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

    const combinedAttributes = attributes.map((a) => {
      return { ...a, ...attributesStore.getById(a.attribute_id) } as CombinedAttribute;
    });

    const { showToast } = useToast();

    const openAddAtributeDialog = (): void => setIsAddAtributeDialogOpen(true);
    const closeAddAtributeDialog = (): void => setIsAddAtributeDialogOpen(false);

    const handleSaveButton = async (): Promise<void> => {
      if (documentType) {
        try {
          await documentTypesStore.updateById(documentType.id, {
            name,
            attributes: attributes.map((a) => ({
              attribute_id: a.attribute_id,
              is_optional: a.is_optional,
            })),
          });
          handleClose();
          showToast('success', 'Тип документа успешно обновлен');
        } catch {
          showToast('error', 'Ошибка обновления типа документа');
        }
      }
    };

    const handleDeleteButton = async (): Promise<void> => {
      if (documentType) {
        try {
          await documentTypesStore.deleteById(documentType.id);
          handleClose();
          showToast('success', 'Тип документа успешно удален');
        } catch {
          showToast('error', 'Ошибка удаления типа документа');
        }
      }
    };

    const handleCreateButton = async (): Promise<void> => {
      try {
        await documentTypesStore.create({
          name: name,
          attributes: attributes.map((a) => ({
            attribute_id: a.attribute_id,
            is_optional: a.is_optional,
          })),
        });
        showToast('success', 'Тип документа успешно создан');
      } catch {
        showToast('error', 'Ошибка создания типа документа');
      }
    };

    const handleAddAttribute = (newAttributes: DocumentTypeToAttributeRequest[]): void => {
      const newAttributesToCombined = newAttributes.map((a) => ({
        ...a,
        ...attributesStore.getById(a.attribute_id),
      }));
      setAttributes(newAttributesToCombined);
    };

    useEffect(() => {
      if (documentType) {
        setName(documentType.name);
        setAttributes(documentType.attributes);
      } else {
        setName('');
        setAttributes([]);
      }
    }, [documentType]);

    return (
      <>
        <ConfirmationDialog
          open={isConfirmationDialogOpen}
          onClose={() => setConfirmationDialogOpen(false)}
          onSubmit={() => handleDeleteButton()}
          children={<Typography>Вы действительно собираетесь тип документа {name}?</Typography>}
        />
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ textAlign: 'center' }}>{documentType ? 'Изменить' : 'Создать'} тип документа</DialogTitle>
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
            <Stack spacing={2}>
              <Box sx={{ textAlign: 'center' }}>
                <TextField size="small" label="Название типа" value={name} onChange={(e) => setName(e.target.value)} />
              </Box>
              <Stack>
                {attributes.length > 0 && (
                  <AttributesTable attributes={combinedAttributes} setAttributes={setAttributes}></AttributesTable>
                )}
                <Button onClick={openAddAtributeDialog} startIcon={<AddIcon />}>
                  Добавить атрибуты
                </Button>
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: 'center',
              paddingY: '16px',
            }}
          >
            {documentType ? (
              <>
                <Button variant="contained" color="primary" onClick={handleSaveButton}>
                  Сохранить
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => setConfirmationDialogOpen(true)}
                >
                  Удалить
                </Button>
              </>
            ) : (
              <Button variant="contained" color="primary" onClick={handleCreateButton}>
                Создать
              </Button>
            )}
          </DialogActions>
        </Dialog>
        <AddAttributesDialog
          open={isAddAtributeDialogOpen}
          handleClose={closeAddAtributeDialog}
          onAdd={handleAddAttribute}
          usedAttributes={attributes}
        />
      </>
    );
  },
);

export default ManageDocumentTypeDialog;
