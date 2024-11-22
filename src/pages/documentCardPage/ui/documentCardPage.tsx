import type { ReactElement } from 'react';

import { Breadcrumbs } from '@/widgets/breadcrumbs';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { documentsStore } from '@/entities/documents';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { Layout } from '@/shared/components/layout';

const DocumentCardPage = observer((): ReactElement => {
  const id = useParams().id;

  // if (documentsStore.currentDocument === null) {
  //   return <Typography>Загрузка...</Typography>;
  // }

  // if (id === undefined) {
  //   return <Typography>Документ не найден</Typography>;
  // }

  documentsStore.getDocumentById(Number(id));

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
    <Layout>
      <Breadcrumbs />
      <Box sx={{ backgroundColor: 'white', padding: '20px' }}>
        <DataGrid columns={columns} rows={rows} hideFooter />
        <Typography variant="h4">{documentsStore.currentDocument?.document.name}</Typography>
      </Box>
    </Layout>
  );
});

export { DocumentCardPage };
