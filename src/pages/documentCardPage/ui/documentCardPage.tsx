import type { ReactElement } from 'react';

import { Breadcrumbs } from '@/widgets/breadcrumbs';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const DocumentCardPage = (): ReactElement => {
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  ];

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
  ];
  return (
    <>
      <Breadcrumbs />
      <Box sx={{ backgroundColor: 'white', padding: '20px' }}>
        <DataGrid columns={columns} rows={rows} hideFooter />
      </Box>
    </>
  );
};

export { DocumentCardPage };
