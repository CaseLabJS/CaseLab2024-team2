import { authStore } from '@/entities/auth';
import { documentsStore } from '@/entities/documents';
import { documentVersionsStore } from '@/entities/documentVersions';
import { signaturesStore } from '@/entities/signature';
import { Layout } from '@/shared/components/layout';
import { Status } from '@/shared/types/status.type';
import { DocumentStatus, getStatusTranslation } from '@/shared/utils/statusTranslation';
import { Breadcrumbs } from '@/widgets/breadcrumbs';
import { CreateVoting } from '@/widgets/createVotingWidget';
import { SignatureDrawer } from '@/widgets/signatureDrawer';
import { SignDocument } from '@/widgets/signDocument';
import { VoteModal } from '@/widgets/voteModal';
import { EditNote, ManageHistory } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridArrowDownwardIcon, GridDeleteIcon } from '@mui/x-data-grid';
import { observer } from 'mobx-react-lite';
import { useState, type ReactElement, useEffect } from 'react';
import { useParams } from 'react-router';

import { DocumentVersionDrawer } from './documentVersionDrawer';

const DocumentCardPage = observer((): ReactElement => {
  const id = useParams().documentId;
  const [isVersionDrawerOpen, setVersionDrawerOpen] = useState(false);
  const [isSignatureDrawerOpen, setSignatureDrawerOpen] = useState(false);
  const signatures = signaturesStore.selectedDocumentSignatures;

  useEffect(() => {
    if (id) {
      void documentsStore.getDocumentById(Number(id));
    }
  }, [id]);

  useEffect(() => {
    documentsStore
      .getDocumentById(Number(id))
      .then(() => {
        const userPermissions = documentsStore.currentDocument?.document.user_permissions.find(
          (p) => p.email == authStore.email,
        );
        if (userPermissions) {
          const creatorPermission = userPermissions.document_permissions.find((p) => p.name == 'CREATOR');
          if (creatorPermission) {
            void documentVersionsStore.getDocumentVersionsByDocumentId(Number(id), { pageNum: 0, pageSize: 100 });
          }
        }
      })
      .catch((_) => {});
  }, [id]);

  // Проверяем статус документа
  if (documentsStore.currentDocument === null) {
    return <Typography>Загрузка...</Typography>;
  }

  if (documentsStore.status === Status.ERROR) {
    return <Typography>Документ не найден</Typography>;
  }

  // Проверяем, что юзер является создателем документа
  const userMail = authStore.email;
  const { status: statusDocument, name, user_permissions } = documentsStore.currentDocument.document;
  const permission = user_permissions.find((user) => user.email === userMail);
  const isCreator = permission?.document_permissions[0].name === 'CREATOR';
  const documentStatuses = [
    DocumentStatus.DRAFT,
    DocumentStatus.SIGNATURE_IN_PROGRESS,
    DocumentStatus.SIGNATURE_ACCEPTED,
  ];
  const isSignBtnShown = documentStatuses.includes(documentsStore.currentDocument?.document.status);

  const attributes =
    documentVersionsStore.currentVersion?.attributes || documentsStore.currentDocument.latest_version.attributes;

  const rows = attributes.map((a) => ({
    id: a.id,
    attributeName: a.name,
    attributeType: a.type,
    attributeValue: a.value,
  }));

  const currentVersionId = documentVersionsStore.currentVersion?.id || documentsStore.currentDocument.latest_version.id;

  const columns = [
    { field: 'id', headerName: 'ID', maxWidth: 60 },
    { field: 'attributeName', headerName: 'Атрибут', flex: 1 },
    { field: 'attributeType', headerName: 'Тип атрибута', flex: 1 },
    { field: 'attributeValue', headerName: 'Значение', flex: 1 },
  ];

  const handleDownload = async (): Promise<void> => {
    try {
      const blob = await documentsStore.fetchDocumentBlob();
      if (!blob) return;

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = documentsStore.currentDocument?.latest_version.contentName || 'document';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Layout>
      <Breadcrumbs pageTitle={name} />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h1" sx={{ fontSize: '34px', margin: '8px', maxWidth: '90%' }}>
          Документ: {name}
        </Typography>
        {isCreator && (
          <Button
            sx={{ marginLeft: 'auto' }}
            startIcon={<ManageHistory />}
            variant="outlined"
            onClick={() => setVersionDrawerOpen(true)}
          >
            Версии документа
          </Button>
        )}
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
        <Button startIcon={<GridArrowDownwardIcon />} variant="outlined" onClick={handleDownload}>
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
          <Typography sx={{ fontSize: '18px' }}>Статус документа: {getStatusTranslation(statusDocument)}</Typography>
        </Box>
        {isCreator && (
          <Box sx={{ margin: '20px auto', gap: '20px', display: 'flex' }}>
            <VoteModal user={userMail} />
            {isSignBtnShown && (
              <Button variant="outlined" onClick={() => alert('В разработке')}>
                Отправить на подпись
              </Button>
            )}
            {statusDocument === DocumentStatus.DRAFT && <CreateVoting />}
            {statusDocument === DocumentStatus.VOTING_IN_PROGRESS && <VoteModal user={userMail} />}
            <Button variant="outlined" onClick={() => alert('В разработке')}>
              Дать доступ к документу
            </Button>
            {statusDocument === DocumentStatus.SIGNATURE_IN_PROGRESS && <SignDocument email={userMail} />}
          </Box>
        )}
        {!isCreator && (
          <Box sx={{ margin: '20px auto', gap: '20px', display: 'flex' }}>
            {statusDocument === DocumentStatus.VOTING_IN_PROGRESS && <VoteModal user={userMail} />}
            {statusDocument === DocumentStatus.SIGNATURE_IN_PROGRESS && <SignDocument email={userMail} />}
          </Box>
        )}
        <Box sx={{ backgroundColor: 'white', marginTop: '20px', borderRadius: '10px' }}>
          <Typography sx={{ fontSize: '18px' }}>
            Этот документ доступен для: {user_permissions.map((user) => user.email).join(', ')}
          </Typography>
        </Box>
      </Box>
      <DocumentVersionDrawer
        isOpenDrawer={isVersionDrawerOpen}
        setIsOpenDrawer={setVersionDrawerOpen}
        versionsList={documentVersionsStore.versions}
        currentVersionId={currentVersionId}
      />
      <SignatureDrawer
        isOpen={isSignatureDrawerOpen}
        onClose={() => setSignatureDrawerOpen(false)}
        documentName={documentsStore.currentDocument?.document.name}
        documentId={documentsStore.currentDocument?.document.id}
        signatures={signatures}
      />
    </Layout>
  );
});

export { DocumentCardPage };
