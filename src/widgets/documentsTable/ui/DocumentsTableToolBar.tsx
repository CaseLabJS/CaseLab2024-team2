import type { ReactElement } from 'react';

import { Add, Delete, Search } from '@mui/icons-material';
import { Toolbar, Button, TextField, InputAdornment } from '@mui/material';

import type { DocumentsTableToolbarProps } from '../model/DocumentsTableToolbarProps';

const DocumentsTableToolbar = ({ searchTerm, handleSearchChange }: DocumentsTableToolbarProps): ReactElement => {
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
      <TextField
        variant="standard"
        size="small"
        placeholder="Поиск..."
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ marginLeft: 'auto', marginRight: 2 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          },
        }}
      />
    </Toolbar>
  );
};

export default DocumentsTableToolbar;
