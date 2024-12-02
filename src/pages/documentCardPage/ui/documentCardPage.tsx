import { ROUTE_CONSTANTS } from '@/app/providers/router/config/constants';
import { authStore } from '@/entities/auth';
import { documentsStore } from '@/entities/documents';
import { Layout } from '@/shared/components/layout';
import { Status } from '@/shared/types/status.type';
import { Breadcrumbs } from '@/widgets/breadcrumbs';
import { VoteModal } from '@/widgets/voteModal';
import { EditNote, ManageHistory } from '@mui/icons-material';
import { Box, Button, Divider, Drawer, List, ListItem, Typography } from '@mui/material';
import { DataGrid, GridArrowDownwardIcon, GridDeleteIcon } from '@mui/x-data-grid';
import { observer } from 'mobx-react-lite';
import { useState, type ReactElement } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const DocumentCardPage = observer((): ReactElement => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  if (documentsStore.status === Status.ERROR) {
    return <Typography>Документ не найден</Typography>;
  }

  if (documentsStore.currentDocument === null) {
    return <Typography>Загрузка...</Typography>;
  }

  // TODO делать запрос версий в сторе
  const versionsList = [
    {
      id: documentsStore.currentDocument.latest_version.id,
      name: documentsStore.currentDocument.latest_version.name,
      date: documentsStore.currentDocument.latest_version.createdAt,
    },
    // ...documentsStore.currentDocument.versions.map((version) => ({
    //   id: version.id,
    //   name: version.name,
    //   date: version.created_at,
    // })),
    {
      id: documentsStore.currentDocument.document.document_versions_ids,
      name: 'Настройки',
      date: '2022-12-12',
    },
    {
      id: 101,
      name: 'Удалить документ',
      date: '2022-12-12',
    },
  ];

  const rows = documentsStore.currentDocument.latest_version.attributes.map((attribute) => ({
    id: attribute.id,
    attributeName: attribute.name,
    attributeType: attribute.type,
    attributeValue: attribute.value,
  }));

  const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'attributeName', headerName: 'Атрибут', flex: 1 },
    { field: 'attributeType', headerName: 'Тип атрибута', flex: 1 },
    { field: 'attributeValue', headerName: 'Значение', flex: 1 },
  ];

  const userMail = authStore.email;
  const permission = documentsStore.currentDocument.document.user_permissions.find((user) => user.email === userMail);
  const isCreator = permission?.document_permissions[0].name === 'CREATOR';
  const statusDocument = documentsStore.currentDocument.document.status;

  const handleCreateVoting = (): void => {
    navigate(`${location.pathname}${ROUTE_CONSTANTS.CREATE_VOTING.path}`);
  };

  return (
    <Layout>
      <Breadcrumbs pageTitle={documentsStore.currentDocument?.document.name} />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h1" sx={{ fontSize: '34px', margin: '8px', maxWidth: '90%' }}>
          Документ: {documentsStore.currentDocument?.document.name}
        </Typography>
        <Button
          sx={{ marginLeft: 'auto' }}
          startIcon={<ManageHistory />}
          variant="outlined"
          onClick={() => setIsOpenDrawer(true)}
        >
          Версии документа
        </Button>
      </Box>

      <Box
        sx={{
          backgroundColor: 'white',
          padding: '20px',
          marginTop: '20px',
          borderRadius: '10px',
          display: 'flex',
          gap: '20px',
        }}
      >
        <Button startIcon={<GridArrowDownwardIcon />} variant="outlined" onClick={() => alert('В разработке')}>
          Скачать документ
        </Button>
        {isCreator && (
          <>
            <Button startIcon={<EditNote />} variant="outlined" onClick={() => alert('В разработке')}>
              Редактировать документ
            </Button>
            <Button startIcon={<GridDeleteIcon />} variant="outlined" onClick={() => alert('В разработке')}>
              Отправить в архив
            </Button>
          </>
        )}
      </Box>
      <Box sx={{ backgroundColor: 'white', padding: '20px', marginTop: '20px', borderRadius: '10px' }}>
        <DataGrid
          columns={columns}
          rows={rows}
          hideFooter
          disableColumnResize={true}
          disableColumnFilter
          disableColumnMenu
        />
        <Box sx={{ margin: '20px auto', padding: '20px', backgroundColor: '#bbdefb', borderRadius: '10px' }}>
          <Typography sx={{ fontSize: '18px' }}>
            {documentsStore.currentDocument?.signature
              ? `Подписан ${documentsStore.currentDocument?.signature.name}`
              : 'Документ еще не подписан'}
          </Typography>
        </Box>
        {isCreator && (
          <Box sx={{ margin: '20px auto', gap: '20px', display: 'flex' }}>
            <VoteModal user={userMail} />
            <Button variant="outlined" onClick={() => alert('В разработке')}>
              Отправить на подпись
            </Button>
            {statusDocument === 'DRAFT' && (
              <Button variant="outlined" onClick={handleCreateVoting}>
                Создать согласование
              </Button>
            )}
            <Button variant="outlined" onClick={() => alert('В разработке')}>
              Дать доступ к документу
            </Button>
          </Box>
        )}
        {!isCreator && (
          <Box sx={{ margin: '20px auto', gap: '20px', display: 'flex' }}>
            <VoteModal user={userMail} />
            <Button variant="outlined" onClick={() => alert('В разработке')}>
              Подписаться
            </Button>
          </Box>
        )}
        <Box sx={{ backgroundColor: 'white', marginTop: '20px', borderRadius: '10px' }}>
          <Typography sx={{ fontSize: '18px' }}>
            Этот документ доступен для:{' '}
            {documentsStore.currentDocument?.document.user_permissions.map((user) => user.email).join(', ')}
          </Typography>
        </Box>
      </Box>
      <Drawer sx={{ width: '400px' }} open={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} anchor="right">
        <Typography sx={{ padding: '20px' }} variant="h6">
          Версии документа: {documentsStore.currentDocument?.document.name}
        </Typography>
        <List sx={{ width: '400px' }}>
          {versionsList.map((version) => (
            <>
              <Divider />
              <ListItem
                key={version.name}
                sx={{
                  cursor: 'pointer',
                  ':hover': { backgroundColor: '#bbdefb' },
                  ':first-of-type': { backgroundColor: '#d9ebfa' },
                }}
                onClick={() => alert('В разработке')}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Typography>{version.name}</Typography>
                  <Typography>{new Date(version.date).toLocaleString()}</Typography>
                </Box>
              </ListItem>
            </>
          ))}
        </List>
      </Drawer>
    </Layout>
  );
});

export { DocumentCardPage };
