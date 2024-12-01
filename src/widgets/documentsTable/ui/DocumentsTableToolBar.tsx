import { SearchForm } from '@/shared/components';
import { CreateDocumentDialog } from '@/widgets/createDocumentDialog';
import { Add, Delete } from '@mui/icons-material';
import { Toolbar, Button } from '@mui/material';
import { useState, type ReactElement } from 'react';

const DocumentsTableToolbar = (): ReactElement => {
  const [isCreateDocumentDialogOpen, setCreateDocumentDialogState] = useState(false);

  return (
    <Toolbar
      sx={{
        paddingLeft: { xs: 0, sm: 0 },
        paddingRight: { xs: 0, sm: 0 },
      }}
    >
      <CreateDocumentDialog open={isCreateDocumentDialogOpen} onClose={() => setCreateDocumentDialogState(false)} />
      <Button
        variant="text"
        startIcon={<Add />}
        sx={{ marginRight: 2 }}
        onClick={() => setCreateDocumentDialogState(true)}
      >
        Добавить
      </Button>
      <Button variant="text" startIcon={<Delete sx={{ color: 'grey.500' }} />} sx={{ color: 'grey.500' }}>
        Удалить
      </Button>
      <SearchForm sx={{ marginLeft: 'auto', marginRight: 2 }} />
    </Toolbar>
  );
};

export default DocumentsTableToolbar;
