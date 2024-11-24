import type { ReactElement } from 'react';

import { documentsStore } from '@/entities/documents';
import { Layout } from '@/shared/components/layout';
import { Breadcrumbs } from '@/widgets/breadcrumbs';
import { Box, Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { observer } from 'mobx-react-lite';

const DocumentCardPage = observer((): ReactElement => {
  if (documentsStore.currentDocument === null) {
    return <Typography>Загрузка...</Typography>;
  }

  if (documentsStore.currentDocument === undefined) {
    return <Typography>Документ не найден</Typography>;
  }

  const rows = documentsStore.currentDocument.latest_version.attributes.map((attribute) => ({
    id: attribute.id,
    attributeName: attribute.name,
    attributeType: attribute.type,
    attributeValue: attribute.value,
  }));

  const columns = [
    { field: 'id', headerName: 'ID', maxWidth: 70 },
    { field: 'attributeName', headerName: 'Атрибут' },
    { field: 'attributeType', headerName: 'Тип атрибута' },
    { field: 'attributeValue', headerName: 'Значение' },
  ];

  return (
    <Layout>
      <Breadcrumbs />
      <Typography variant="h1" sx={{ fontSize: '34px', margin: '8px' }}>
        Документ: {documentsStore.currentDocument?.document.name}
      </Typography>
      <Box sx={{ backgroundColor: 'white', padding: '20px', marginTop: '40px' }}>
        <DataGrid columns={columns} rows={rows} hideFooter autosizeOnMount autosizeOptions={{ expand: true }} />
        <Paper sx={{ margin: '20px auto', padding: '20px' }}>
          <Typography sx={{ fontSize: '18px' }}>
            {documentsStore.currentDocument?.signature
              ? `Подписан ${documentsStore.currentDocument?.signature.name}`
              : 'Документ еще не подписан'}
          </Typography>
        </Paper>
      </Box>
    </Layout>
  );
});

export { DocumentCardPage };
