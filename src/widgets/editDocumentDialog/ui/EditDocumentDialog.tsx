import type { CombinedAttribute } from '@/entities/attribute';
import type { ChangeEvent, SyntheticEvent } from 'react';

import { attributesStore } from '@/entities/attribute';
import { documentsStore } from '@/entities/documents';
import { documentTypesStore } from '@/entities/documentsType';
import { Status } from '@/shared/types/status.type';
import { Delete, FileOpen } from '@mui/icons-material';
import Close from '@mui/icons-material/Close';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect, useState, type ReactElement } from 'react';

import { getFormConfiguration, getInputComponent, getNewDocumentParameters } from '../../createDocumentDialog/lib';

interface EditDocumentDialogProps {
  open: boolean;
  onClose: () => void;
  id: number;
}

const EditDocumentDialog = observer(({ open, onClose, id: documentId }: EditDocumentDialogProps): ReactElement => {
  const [documentTypeId, setDocumentTypeId] = useState<number | null>(null);
  const [attributes, setAttributes] = useState<CombinedAttribute[]>([]);
  const [selectedDocumentType, setSelectedDocumentType] = useState<{ id: number; label: string } | null>(null);

  const formik = useFormik(
    getFormConfiguration(attributes, () => {
      documentsStore
        .updateAllDocumentById(documentId, getNewDocumentParameters(documentTypeId as number, formik.values))
        .then(() => {
          alert('Документ сохранён');
          formik.resetForm();
          onClose();
        })
        .catch(console.error);
    }),
  );

  // Загружаем текущий тип документа при открытии модального окна
  useEffect(() => {
    if (open) {
      const currentDocumentType = documentsStore.currentDocument?.document.document_type_id;
      if (currentDocumentType) {
        setDocumentTypeId(currentDocumentType);

        const documentType = documentTypesStore.getById(currentDocumentType);
        if (documentType) {
          setSelectedDocumentType({ id: documentType.id, label: documentType.name });

          attributesStore.getCombinedDocumentAttributes(documentType).then(setAttributes).catch(console.error);
        }
      }
    }
  }, [open]);

  // Загружаем атрибуты при смене типа документа
  useEffect(() => {
    if (!documentTypeId) return;

    const documentType = documentTypesStore.getById(documentTypeId);
    if (documentType) {
      attributesStore.getCombinedDocumentAttributes(documentType).then(setAttributes).catch(console.error);
    }
  }, [documentTypeId]);

  function handleDocumentTypeChange(_: SyntheticEvent, value: { id: number; label: string } | null): void {
    if (value) {
      setDocumentTypeId(value.id);
    } else {
      return;
    }
  }

  function handleFileInput(event: ChangeEvent<HTMLInputElement>): void {
    if (!event.target.files || !event.target.files.length) return;

    formik.setFieldValue('file', event.target.files[0]).catch((error) => {
      console.error(error);
      alert('Не удалось выбрать файл');
    });
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth PaperProps={{ sx: { overflowY: 'unset' } }}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Редактирование документа
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent sx={{ pt: 0, pb: 0 }}>
          <Autocomplete
            sx={{ mt: 1 }}
            disablePortal
            value={selectedDocumentType}
            onChange={handleDocumentTypeChange}
            options={
              documentTypesStore.status === Status.LOADING
                ? [{ id: -1, label: 'Загрузка...' }]
                : documentTypesStore.documentTypes.map((documentType) => ({
                    id: documentType.id,
                    label: documentType.name,
                  }))
            }
            renderInput={(params) => <TextField {...params} label="Тип документа" />}
          />
          {documentTypeId && (
            <>
              <TextField
                sx={{ mt: 2 }}
                name="name"
                label="Название документа"
                value={(formik.values.name as string) || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.touched.name) && Boolean(formik.errors.name)}
                required
                fullWidth
              />
              {attributes.map((attribute) => getInputComponent(attribute, formik))}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <input id="filePicker" name="file" style={{ display: 'none' }} type="file" onChange={handleFileInput} />
                <label htmlFor="filePicker">
                  <Button component="span" size="medium" startIcon={<FileOpen />}>
                    {(formik?.values.file as { name?: string })?.name || 'Выбрать файл *'}
                  </Button>
                </label>
                <IconButton onClick={() => formik.setFieldValue('file', null)}>
                  <Delete />
                </IconButton>
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ alignContent: 'end', pr: 3, pb: 2 }}>
          <LoadingButton
            size="small"
            type="submit"
            loading={documentsStore.status === Status.LOADING}
            variant="outlined"
            disabled={!formik.isValid || documentTypeId === null || !formik.values.file}
          >
            Сохранить
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
});

export default EditDocumentDialog;
