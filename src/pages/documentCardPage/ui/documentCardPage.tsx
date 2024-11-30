import type { ReactElement } from 'react';

import { api } from '@/shared/http';
import DocumentFormModal from '@/shared/components/editNewDocument/editNewDocument';
// import { saveAs } from 'file-saver';
import { ROUTE_CONSTANTS } from '@/app/providers/router/config/constants';
import { authStore } from '@/entities/auth';
import { documentsStore } from '@/entities/documents';
import { Layout } from '@/shared/components/layout';
import { Status } from '@/shared/types/status.type';
import { Breadcrumbs } from '@/widgets/breadcrumbs';
import { VoteModal } from '@/widgets/voteModal';
import { EditNote } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridArrowDownwardIcon, GridDeleteIcon } from '@mui/x-data-grid';
import { observer } from 'mobx-react-lite';
import { useNavigate, useLocation } from 'react-router-dom';
import {useState} from 'react';
const DocumentCardPage = observer((): ReactElement => {
  const [canOpen, setOpen] = useState(false);
  const handleOpen = ():void => setOpen(true);
  const handleClose = ():void => setOpen(false);
  const navigate = useNavigate();
  const location = useLocation();
  if (documentsStore.status === Status.ERROR) {
    return <Typography>Документ не найден</Typography>;
  }

  if (documentsStore.currentDocument === null) {
    return <Typography>Загрузка...</Typography>;
  }

  const rows = documentsStore.currentDocument.latest_version.attributes.map((attribute) => ({
    id: attribute.id,
    attributeName: attribute.name,
    attributeType: attribute.type,
    attributeValue: attribute.value,
  }));
  
  const columns = [
    { field: 'id', headerName: 'ID', maxWidth: 60 },
    { field: 'attributeName', headerName: 'Атрибут' },
    { field: 'attributeType', headerName: 'Тип атрибута' },
    { field: 'attributeValue', headerName: 'Значение' },
  ];

  const userMail = authStore.email;
  const permission = documentsStore.currentDocument.document.user_permissions.find((user) => user.email === userMail);
  const isCreator = permission?.document_permissions[0].name === 'CREATOR';
  const statusDocument = documentsStore.currentDocument.document.status;

  const handleCreateVoting = (): void => {
    navigate(`${location.pathname}${ROUTE_CONSTANTS.CREATE_VOTING.path}`);
  };
  const handleDownloadDocument = async (): Promise<void> =>{
    try {
      const id = documentsStore.currentDocument?.latest_version.id;
      const response = await api.get(`http://172.18.27.102:8080/api/v1/versions/content/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        responseType: 'blob',
      });
      console.log("response ", response)
      console.log(JSON.stringify(documentsStore.currentDocument?.latest_version))

      const myString = await response.data;
      console.log("blob ", myString, myString instanceof Blob)
      const url = window.URL.createObjectURL(myString);
      console.log(url)
      const a = document.createElement('a');
      a.href = url;
      a.download = documentsStore.currentDocument?.latest_version.contentName || 'document';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      console.error('Error downloading document:', error);
      alert(`Error downloading document: ${error.message}`);
    }
  };
  return (
    <Layout>
      <Breadcrumbs pageTitle={documentsStore.currentDocument?.document.name} />
      <Typography variant="h1" sx={{ fontSize: '34px', margin: '8px' }}>
        Документ: {documentsStore.currentDocument?.document.name}
      </Typography>
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
        <Button startIcon={<GridArrowDownwardIcon />} variant="outlined" onClick={() => handleDownloadDocument()}>
          Скачать документ
        </Button>
        {isCreator && (
          <>
            <Button startIcon={<EditNote />} variant="outlined" onClick={handleOpen}>
              Редактировать документ
            </Button>
            <DocumentFormModal open={canOpen} handleClose={handleClose}/>
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
          autosizeOptions={{ expand: true }}
          autosizeOnMount
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
    </Layout>
  );
});

export { DocumentCardPage };
