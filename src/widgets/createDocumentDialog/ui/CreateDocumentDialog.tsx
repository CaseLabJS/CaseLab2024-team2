import type { CombinedAttribute } from '@/entities/attribute';
import type { ChangeEvent } from 'react';

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

import { getFormConfiguration, getInputComponent } from '../lib';

interface CreateDocumentDialogProps {
  open: boolean;
  onClose: () => void;
}

const CreateDocumentDialog = observer(({ open, onClose }: CreateDocumentDialogProps): ReactElement => {
  const [documentTypeId, setDocumentTypeId] = useState<number | null>(null);
  const [attributes, setAttributes] = useState<CombinedAttribute[]>([]);
  const formik = useFormik(
    getFormConfiguration(attributes, () => {
      // const formData = getFormData(documentTypeId as number, formik.values as FormValues);
      // использованиче formData
    }),
  );

  useEffect(() => {
    documentTypesStore.load().then(console.log).catch(console.error);

    if (!documentTypeId) return;

    const documentType = documentTypesStore.getById(documentTypeId);

    if (!documentType) return;

    attributesStore
      .getCombinedDocumentAttributes(documentType)
      .then((combinedAttributes) => setAttributes(combinedAttributes))
      .catch(console.error);
  }, [documentTypeId]);

  function handleFileInput(event: ChangeEvent<HTMLInputElement>): void {
    if (!event.target.files || !event.target.files.length) return;

    formik
      .setFieldValue('file', event.target.files[0])
      .then(console.log)
      .catch((error) => {
        console.error(error);
        alert('Не удалось выбрать файл');
      });
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth PaperProps={{ sx: { overflowY: 'unset' } }}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Создание нового документа
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent sx={{ pt: 0, pb: 0 }}>
          <Autocomplete
            sx={{ mt: 1 }}
            disablePortal
            onChange={(_, value) => {
              if (value === null) return;

              setDocumentTypeId(value.id);
            }}
            options={
              documentTypesStore.status === Status.LOADING
                ? [{ id: -1, label: 'Загрузка...' }]
                : documentTypesStore.documentTypes.map((documentType) => {
                    return {
                      id: documentType.id,
                      label: documentType.name,
                    };
                  })
            }
            renderInput={(params) => <TextField {...params} label="Тип документа" />}
          />
          <TextField
            sx={{ mt: 2 }}
            name="name"
            label="Название документа"
            value={formik.values.name as string}
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
        </DialogContent>
        <DialogActions sx={{ alignContent: 'end', pr: 3, pb: 2 }}>
          <LoadingButton
            size="small"
            type="submit"
            loading={documentsStore.status === Status.LOADING}
            variant="outlined"
            disabled={!formik.isValid || documentTypeId === null || !formik.values.file}
          >
            Создать
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
});

export default CreateDocumentDialog;
