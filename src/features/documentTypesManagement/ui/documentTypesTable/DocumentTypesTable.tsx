import type { DocumentTypeResponse } from '@/entities/documentsType';
import type { GridColDef } from '@mui/x-data-grid';
import type { ReactElement } from 'react';

import { attributesStore } from '@/entities/attribute/model/store/attributeStore';
import { documentTypesStore } from '@/entities/documents/model/documentTypesStore';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Button, IconButton, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';

import ManageDocumentTypeDialog from '../manageDocumentType/ManageDocumentTypeDialog';
import AttributesDialog from './AttributesDialog';

const CustomToolbar = ({ openAddNewTypeDialog }: { openAddNewTypeDialog: () => void }): ReactElement => (
  <GridToolbarContainer sx={{ justifyContent: 'space-between', padding: '0.5rem 1rem' }}>
    <Button color="primary" startIcon={<AddIcon />} onClick={openAddNewTypeDialog}>
      Добавить
    </Button>
    <GridToolbarQuickFilter />
  </GridToolbarContainer>
);

const DocumentTypesTable = observer((): ReactElement => {
  const [isAttbutesDialogOpen, setIsAttbutesDialogOpen] = useState(false);
  const [currentDocType, setCurrentDocType] = useState<DocumentTypeResponse | null>(null);
  const [isManageDocumentDialogOpen, setIsManageDocumentDialogOpen] = useState(false);

  const openAttributesDialog = (): void => setIsAttbutesDialogOpen(true);
  const closeAttributesDialog = (): void => setIsAttbutesDialogOpen(false);

  const closeManageDocumentDialog = (): void => {
    setCurrentDocType(null);
    setIsManageDocumentDialogOpen(false);
  };

  const openCreateDocumentTypeDialog = (): void => {
    setCurrentDocType(null);
    setIsManageDocumentDialogOpen(true);
  };

  const openEditDocumentDialog = (documentType: DocumentTypeResponse): void => {
    setCurrentDocType(documentType);
    setIsManageDocumentDialogOpen(true);
  };

  useEffect(() => {
    void documentTypesStore.load();
  }, []);

  useEffect(() => {
    void attributesStore.load();
  }, []);

  const columns: GridColDef<DocumentTypeResponse>[] = [
    {
      field: 'edit',
      headerName: '',
      sortable: false,
      filterable: false,
      resizable: false,
      disableColumnMenu: true,
      flex: 1,
      renderCell: ({ row }: { row: DocumentTypeResponse }): ReactElement => (
        <IconButton
          onClick={() => {
            openEditDocumentDialog(row);
          }}
        >
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: 'name',
      headerName: 'Название',
      resizable: false,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      resizable: false,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerName: 'Атрибуты',
      field: 'attributes',
      align: 'center',
      headerAlign: 'center',
      flex: 1,
      renderCell: ({ row }: { row: DocumentTypeResponse }): ReactElement => (
        <IconButton
          onClick={() => {
            setCurrentDocType(row);
            openAttributesDialog();
          }}
        >
          <FormatListBulletedIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <React.Fragment>
      <Paper>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            disableRowSelectionOnClick
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            rows={documentTypesStore.documentTypes.map(
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
              (e) => ({ id: e.id, name: e.name, attributes: e.attributes }) as DocumentTypeResponse,
            )}
            columns={columns}
            slots={{
              toolbar: () => <CustomToolbar openAddNewTypeDialog={openCreateDocumentTypeDialog}></CustomToolbar>,
            }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
            sx={{
              '& .MuiDataGrid-columnSeparator': {
                display: 'none',
              },
            }}
          />
        </Box>
      </Paper>
      {currentDocType && (
        <AttributesDialog
          open={isAttbutesDialogOpen}
          handleClose={closeAttributesDialog}
          documentType={currentDocType}
        />
      )}

      <ManageDocumentTypeDialog
        open={isManageDocumentDialogOpen}
        handleClose={closeManageDocumentDialog}
        documentType={currentDocType}
      />
    </React.Fragment>
  );
});

export default DocumentTypesTable;
