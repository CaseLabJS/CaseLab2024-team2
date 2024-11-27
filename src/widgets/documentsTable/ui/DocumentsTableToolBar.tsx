import type { ReactElement } from 'react';

import { SearchForm } from '@/shared/components';
import { Add, Delete } from '@mui/icons-material';
import { Toolbar, Button } from '@mui/material';

const DocumentsTableToolbar = (): ReactElement => {
  return (
    <Toolbar
      sx={{
        paddingLeft: { xs: 0, sm: 0 },
        paddingRight: { xs: 0, sm: 0 },
      }}
    >
      <Button variant="text" startIcon={<Add />} sx={{ marginRight: 2 }}>
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
