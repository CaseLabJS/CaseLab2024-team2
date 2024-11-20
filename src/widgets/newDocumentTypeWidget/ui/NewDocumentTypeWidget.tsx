import type { CombinedAttribute } from '@/entities/attribute/model/attributeStore';
import type { DocumentTypeToAttributeRequest } from '@/entities/documents';

import { ROUTE_CONSTANTS } from '@/app/providers/router/config/constants';
import { attributesStore } from '@/entities/attribute/model/attributeStore';
import { documentTypesStore } from '@/entities/documents/model/documentTypesStore';
import AddAttributesDialog from '@/features/documentTypesManagement/ui/manageDocumentType/AddAttributesDialog';
import AttributesTable from '@/features/documentTypesManagement/ui/manageDocumentType/AttributesTable';
import AddIcon from '@mui/icons-material/Add';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Stack, Box, TextField, Button, Paper } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const NewDocumentTypeWidget = observer((): React.ReactElement => {
  const [name, setName] = useState<string>('');
  const [attributes, setAttributes] = useState<DocumentTypeToAttributeRequest[]>([]);
  const [isAddAtributeDialogOpen, setIsAddAtributeDialogOpen] = useState(false);

  const combinedAttributes = attributes.map((a) => {
    return { ...a, ...attributesStore.getById(a.attribute_id) } as CombinedAttribute;
  });

  const openAddAtributeDialog = (): void => setIsAddAtributeDialogOpen(true);
  const closeAddAtributeDialog = (): void => setIsAddAtributeDialogOpen(false);

  const handleCreateButton = (): void => {
    void documentTypesStore.create({
      name: name,
      attributes: attributes.map((a) => ({
        attribute_id: a.attribute_id,
        is_optional: a.is_optional,
      })),
    });
  };

  useEffect(() => {
    void attributesStore.load();
  }, []);

  const handleAddAttribute = (newAttributes: DocumentTypeToAttributeRequest[]): void => {
    const newAttributesToCombined = newAttributes.map((a) => ({
      ...a,
      ...attributesStore.getById(a.attribute_id),
    }));
    setAttributes(newAttributesToCombined);
  };

  return (
    <>
      <Paper sx={{ p: '16px', minWidth: '350px', width: 'fit-content', position: 'relative' }}>
        <Box
          sx={() => ({
            position: 'absolute',
            right: '8px',
            top: '8px',
          })}
        >
          <Link to={ROUTE_CONSTANTS.DOCUMENT_TYPES.path}>
            <OpenInNewIcon />
          </Link>
        </Box>
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
          <Button variant="contained" color="primary" onClick={handleCreateButton}>
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
