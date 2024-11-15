import type { ReactElement } from 'react';

import { documentTypesStore } from '@/entities/documents/model/documentTypesStore';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Button, IconButton, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';

import AttributesDialog from './AttributesDialog';
import ManageDocumentTypeDialog from './ManageDocumentTypeDialog';

const CustomToolbar = ({ openAddNewTypeDialog }: { openAddNewTypeDialog: () => void }): ReactElement => (
  <GridToolbarContainer sx={{ justifyContent: 'space-between', padding: '0.5rem 1rem' }}>
    <Button color="primary" startIcon={<AddIcon />} onClick={openAddNewTypeDialog}>
      Добавить
    </Button>
    <GridToolbarQuickFilter />
  </GridToolbarContainer>
);

const DocumentTypesTable = observer((): ReactElement => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [isAttbutesDialogOpen, setIsAttbutesDialogOpen] = useState(false);

  const openAttributesDialog = (): void => setIsAttbutesDialogOpen(true);
  const closeAttributesDialog = (): void => setIsAttbutesDialogOpen(false);

  const [isManageDocumentDialogOpen, setIsManageDocumentDialogOpen] = useState(false);

  const openCreateDocumentTypeDialog = (): void => {
    setIsManageDocumentDialogOpen(true);
    setIsEditDialogOpen(false);
  };
  const openEditDocumentDialog = (): void => {
    setIsManageDocumentDialogOpen(true);
    setIsEditDialogOpen(true);
  };
  const closeManageDocumentDialog = (): void => setIsManageDocumentDialogOpen(false);

  const columns = [
    {
      field: 'edit',
      headerName: '',
      sortable: false,
      filterable: false,
      resizable: false,
      disableColumnMenu: true,
      flex: 1,
      renderCell: (): ReactElement => (
        <IconButton onClick={openEditDocumentDialog}>
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
      flex: 1,
      renderCell: (): ReactElement => (
        <IconButton onClick={openAttributesDialog}>
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
            rows={documentTypesStore.documentTypes}
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
      <AttributesDialog open={isAttbutesDialogOpen} handleClose={closeAttributesDialog} />
      <ManageDocumentTypeDialog
        open={isManageDocumentDialogOpen}
        handleClose={closeManageDocumentDialog}
        edit={isEditDialogOpen}
      />
    </React.Fragment>
  );
});

export default DocumentTypesTable;
