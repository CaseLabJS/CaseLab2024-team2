import type { CombinedAttribute } from '@/entities/attribute';
import type { DocumentTypeToAttributeRequest } from '@/entities/documentsType';

import { ROUTE_CONSTANTS } from '@/app/providers/router/config/constants';
import { attributesStore } from '@/entities/attribute';
import { documentTypesStore } from '@/entities/documentsType/model/store/documentTypesStore';
import AddAttributesDialog from '@/features/documentTypesManagement/ui/manageDocumentType/AddAttributesDialog';
import AttributesTable from '@/features/documentTypesManagement/ui/manageDocumentType/AttributesTable';
import { WidgetToPageButton } from '@/shared/components';
import { useToast } from '@/shared/hooks';
import AddIcon from '@mui/icons-material/Add';
import { Stack, Box, TextField, Button, Paper, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useState } from 'react';

export const NewDocumentTypeWidget = observer((): React.ReactElement => {
  const [name, setName] = useState<string>('');
  const [attributes, setAttributes] = useState<DocumentTypeToAttributeRequest[]>([]);
  const [isAddAtributeDialogOpen, setIsAddAtributeDialogOpen] = useState(false);

  const combinedAttributes = attributes.map((a) => {
    return { ...a, ...attributesStore.getById(a.attribute_id) } as CombinedAttribute;
  });

  const { showToast } = useToast();
  const stableShowToast = useCallback(showToast, [showToast]);

  const openAddAtributeDialog = (): void => setIsAddAtributeDialogOpen(true);
  const closeAddAtributeDialog = (): void => setIsAddAtributeDialogOpen(false);

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

  useEffect(() => {
    attributesStore.load(true).catch(() => stableShowToast('error', 'Не удалось получить список атрибутов'));
  }, [stableShowToast]);

  const handleAddAttribute = (newAttributes: DocumentTypeToAttributeRequest[]): void => {
    const newAttributesToCombined = newAttributes.map((a) => ({
      ...a,
      ...attributesStore.getById(a.attribute_id),
    }));
    setAttributes(newAttributesToCombined);
  };

  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          p: '30px',
          minWidth: '350px',
          width: 'fit-content',
          position: 'relative',
          borderRadius: '10px',
          alignItems: 'center',
          border: 'none',
        }}
      >
        <WidgetToPageButton path={`${ROUTE_CONSTANTS.ADMIN.path}${ROUTE_CONSTANTS.DOCUMENT_TYPES.path}`} />
        <Stack
          spacing={2}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" color="primary" mb="46px">
              Создать тип документа
            </Typography>
            <TextField
              size="small"
              label="Название типа"
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <Stack>
            {attributes.length > 0 && (
              <AttributesTable attributes={combinedAttributes} setAttributes={setAttributes}></AttributesTable>
            )}
            <Button onClick={openAddAtributeDialog} startIcon={<AddIcon />}>
              Добавить атрибуты
            </Button>
          </Stack>
          <Button variant="contained" size="small" color="primary" sx={{ mt: 'auto' }} onClick={handleCreateButton}>
            Создать
          </Button>
        </Stack>
      </Paper>
      <AddAttributesDialog
        open={isAddAtributeDialogOpen}
        handleClose={closeAddAtributeDialog}
        onAdd={handleAddAttribute}
        usedAttributes={attributes}
      />
    </>
  );
});
