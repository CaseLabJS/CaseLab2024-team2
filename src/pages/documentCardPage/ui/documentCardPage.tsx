import type { ReactElement } from 'react';

import { authStore } from '@/entities/auth';
import { documentsStore } from '@/entities/documents';
import { Layout } from '@/shared/components/layout';
import { Breadcrumbs } from '@/widgets/breadcrumbs';
import { Box, Button, Paper, Typography } from '@mui/material';
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

  const userMail = authStore.email;
  const permission = documentsStore.currentDocument.document.user_permissions.find((user) => user.email === userMail);
  const isCreator = permission?.document_permissions[0].name === 'CREATOR';

  return (
    <Layout>
      <Breadcrumbs pageTitle={documentsStore.currentDocument?.document.name} />
      <Typography variant="h1" sx={{ fontSize: '34px', margin: '8px' }}>
        Документ: {documentsStore.currentDocument?.document.name}
      </Typography>
      <Paper sx={{ margin: '20px auto', padding: '20px', gap: '20px', display: 'flex' }}>
        <Button variant="contained" onClick={() => alert('В разработке')}>
          Скачать документ
        </Button>
        {isCreator && (
          <>
            <Button variant="contained" onClick={() => alert('В разработке')}>
              Редактировать документ
            </Button>
            <Button variant="contained" onClick={() => alert('В разработке')}>
              Отправить в архив
            </Button>
          </>
        )}
      </Paper>
      <Box sx={{ backgroundColor: 'white', padding: '20px', marginTop: '20px', borderRadius: '10px' }}>
        <DataGrid columns={columns} rows={rows} hideFooter autosizeOnMount autosizeOptions={{ expand: true }} />
        <Paper sx={{ margin: '20px auto', padding: '20px' }}>
          <Typography sx={{ fontSize: '18px' }}>
            {documentsStore.currentDocument?.signature
              ? `Подписан ${documentsStore.currentDocument?.signature.name}`
              : 'Документ еще не подписан'}
          </Typography>
        </Paper>
        {isCreator && (
          <Box sx={{ margin: '20px auto', gap: '20px', display: 'flex' }}>
            <Button variant="contained" onClick={() => alert('В разработке')}>
              Отправить на подпись
            </Button>
            <Button variant="contained" onClick={() => alert('В разработке')}>
              Отправить на согласование
            </Button>
            <Button variant="contained" onClick={() => alert('В разработке')}>
              Дать доступ к документу
            </Button>
          </Box>
        )}
        {!isCreator && (
          <Box sx={{ margin: '20px auto', gap: '20px', display: 'flex' }}>
            <Button variant="contained" onClick={() => alert('В разработке')}>
              Проголосовать
            </Button>
            <Button variant="contained" onClick={() => alert('В разработке')}>
              Подписаться
            </Button>
          </Box>
        )}
        <Paper sx={{ margin: '20px auto', padding: '20px' }}>
          <Typography sx={{ fontSize: '18px' }}>
            Этот документ доступен для:{' '}
            {documentsStore.currentDocument?.document.user_permissions.map((user) => user.email)}
          </Typography>
        </Paper>
      </Box>
    </Layout>
  );
});

export { DocumentCardPage };
