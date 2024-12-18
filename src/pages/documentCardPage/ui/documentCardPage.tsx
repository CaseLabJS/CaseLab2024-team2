import type { DocumentVersionResponse } from '@/entities/documents';

import { authStore } from '@/entities/auth';
import { documentsStore } from '@/entities/documents';
import { signaturesStore } from '@/entities/signature';
import { PreviewDoc } from '@/shared/components';
import { useToast } from '@/shared/hooks';
import { Status } from '@/shared/types/status.type';
import { DocumentStatus, getStatusTranslation } from '@/shared/utils/statusTranslation';
import { CreateVoting } from '@/widgets/createVotingWidget';
import { EditDocumentDialog } from '@/widgets/editDocumentDialog/';
import { GrantAccess } from '@/widgets/grantAccessWidget';
import { SignatureDrawer } from '@/widgets/signatureDrawer';
import { SignDocument } from '@/widgets/signDocument';
import { VoteModal } from '@/widgets/voteModal';
import { EditNote, ManageHistory } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridArrowDownwardIcon, GridDeleteIcon } from '@mui/x-data-grid';
import { observer } from 'mobx-react-lite';
import { useState, type ReactElement, useEffect } from 'react';
import { useParams } from 'react-router';

import EditableText from './documentEditableText';
import { DocumentVersionDrawer } from './documentVersionDrawer';

const DocumentCardPage = observer((): ReactElement => {
  const id = useParams().documentId;
  const [isVersionDrawerOpen, setVersionDrawerOpen] = useState(false);
  const [isSignatureDrawerOpen, setSignatureDrawerOpen] = useState(false);
  const [isEditDocumentDialogEdit, setEditDocumentDialogState] = useState(false);
  const signatures = signaturesStore.selectedDocumentSignatures;
  const { showToast } = useToast();

  useEffect(() => {
    documentsStore.getDocumentById(Number(id)).catch((err) => console.log(err));
    documentsStore.checkDocumentStatus();
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
  const { status: statusDocument, user_permissions } = documentsStore.currentDocument.document;
  const permission = user_permissions.find((user) => user.email === userMail);
  const isCreator = permission?.document_permissions[0].name === 'CREATOR';
  const documentStatuses = [
    DocumentStatus.DRAFT,
    DocumentStatus.SIGNATURE_IN_PROGRESS,
    DocumentStatus.SIGNATURE_ACCEPTED,
  ];
  const isEditStatuses = [
    DocumentStatus.DRAFT,
    DocumentStatus.SIGNATURE_REJECTED,
    DocumentStatus.VOTING_REJECTED,
    DocumentStatus.ARCHIVED,
  ];
  const isSignBtnShown = documentStatuses.includes(statusDocument);
  const isEditMode = isEditStatuses.includes(statusDocument) && isCreator;
  // Проверяем, что документ можно удалить
  const isDeleteBtnShown = documentsStore.currentDocumentDelete;
  const blobFile = documentsStore.currentBlob;

  // TODO Нужно делать запрос версий в сторе. Пока что вводим моковые данные
  const versionsList: DocumentVersionResponse[] = [
    {
      attributes: documentsStore.currentDocument.latest_version.attributes,
      documentId: documentsStore.currentDocument.document.id,
      id: documentsStore.currentDocument.latest_version.id,
      name: documentsStore.currentDocument.latest_version.name,
      createdAt: documentsStore.currentDocument.latest_version.createdAt,
      signatureIds: documentsStore.currentDocument.latest_version.signatureIds,
      votingProcessesId: documentsStore.currentDocument.latest_version.votingProcessesId,
      contentName: documentsStore.currentDocument.latest_version.contentName,
    },
    {
      attributes: documentsStore.currentDocument.latest_version.attributes,
      documentId: documentsStore.currentDocument.document.id,
      id: documentsStore.currentDocument.latest_version.id,
      name: documentsStore.currentDocument.latest_version.name,
      createdAt: documentsStore.currentDocument.latest_version.createdAt,
      signatureIds: documentsStore.currentDocument.latest_version.signatureIds,
      votingProcessesId: documentsStore.currentDocument.latest_version.votingProcessesId,
      contentName: documentsStore.currentDocument.latest_version.contentName,
    },
    {
      attributes: documentsStore.currentDocument.latest_version.attributes,
      documentId: documentsStore.currentDocument.document.id,
      id: documentsStore.currentDocument.latest_version.id,
      name: documentsStore.currentDocument.latest_version.name,
      createdAt: documentsStore.currentDocument.latest_version.createdAt,
      signatureIds: documentsStore.currentDocument.latest_version.signatureIds,
      votingProcessesId: documentsStore.currentDocument.latest_version.votingProcessesId,
      contentName: documentsStore.currentDocument.latest_version.contentName,
    },
  ];

  const rows = documentsStore.currentDocument.latest_version.attributes.map((attribute) => ({
    id: attribute.id,
    attributeName: attribute.name,
    attributeType: attribute.type,
    attributeValue: attribute.value,
  }));

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
    } catch {
      showToast('error', 'Ошибка при загрузке документа:');
    }
  };

  const handleDelete = async (): Promise<void> => {
    try {
      await documentsStore.deleteDocumentById(Number(id)).then(() => showToast('success', 'Документ удален'));
    } catch {
      showToast('error', 'Ошибка при загрузке документа:');
    }
  };

  return (
    <>
      <Box width="70%" margin="0 auto">
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <EditableText isEditMode={isEditMode} />
          <Button
            sx={{ marginLeft: 'auto' }}
            startIcon={<ManageHistory />}
            variant="outlined"
            onClick={() => setVersionDrawerOpen(true)}
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
          {documentsStore.currentDocument.latest_version.contentName && (
            <Button startIcon={<GridArrowDownwardIcon />} variant="outlined" onClick={handleDownload}>
              Скачать документ
            </Button>
          )}
          {isCreator && (
            <>
              {isEditMode && (
                <Button startIcon={<EditNote />} variant="outlined" onClick={() => setEditDocumentDialogState(true)}>
                  Редактировать документ
                </Button>
              )}

              {isDeleteBtnShown && (
                <Button startIcon={<GridDeleteIcon />} variant="outlined" onClick={() => handleDelete()}>
                  Отправить в архив
                </Button>
              )}
            </>
          )}
        </Box>
        <Box>{blobFile && <PreviewDoc blob={blobFile} />}</Box>
        <Box sx={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
          {rows.length > 0 && (
            <DataGrid
              columns={columns}
              rows={rows}
              hideFooter
              disableColumnResize={true}
              disableColumnFilter
              disableColumnMenu
            />
          )}

          {rows.length === 0 && (
            <Box sx={{ margin: '20px auto', padding: '20px', backgroundColor: '#e7f4ff', borderRadius: '10px' }}>
              <Typography sx={{ fontSize: '18px' }}>Документ не содержит атрибутов</Typography>
            </Box>
          )}

          <Box sx={{ margin: '20px auto', padding: '20px', backgroundColor: '#bbdefb', borderRadius: '10px' }}>
            <Typography sx={{ fontSize: '18px' }}>Статус документа: {getStatusTranslation(statusDocument)}</Typography>
          </Box>
          {isCreator && (
            <Box sx={{ margin: '20px auto', gap: '20px', display: 'flex' }}>
              <VoteModal user={userMail} />
              {isSignBtnShown && (
                <Button variant="outlined" onClick={() => setSignatureDrawerOpen(true)}>
                  Отправить на подпись
                </Button>
              )}
              {statusDocument === DocumentStatus.DRAFT && <CreateVoting />}
              <GrantAccess />
            </Box>
          )}
          <Box sx={{ margin: '20px auto', gap: '20px', display: 'flex' }}>
            <SignDocument />
            {!isCreator && statusDocument === DocumentStatus.VOTING_IN_PROGRESS && <VoteModal user={userMail} />}
          </Box>
          <Box sx={{ backgroundColor: 'white', marginTop: '20px', borderRadius: '10px' }}>
            <Typography sx={{ fontSize: '18px' }}>
              Этот документ доступен для: {user_permissions.map((user) => user.email).join(', ')}
            </Typography>
          </Box>
        </Box>
      </Box>

      <DocumentVersionDrawer
        isOpenDrawer={isVersionDrawerOpen}
        setIsOpenDrawer={setVersionDrawerOpen}
        versionsList={versionsList}
        currentVersionId={documentsStore.currentDocument?.latest_version.id} // По умолчанию выбираем последнюю версию, нужно брать из стора версий
      />
      <SignatureDrawer
        isOpen={isSignatureDrawerOpen}
        onClose={() => setSignatureDrawerOpen(false)}
        documentName={documentsStore.currentDocument?.document.name}
        documentId={documentsStore.currentDocument?.document.id}
        signatures={signatures}
      />
      <EditDocumentDialog open={isEditDocumentDialogEdit} onClose={() => setEditDocumentDialogState(false)} id={+id!} />
    </>
  );
});

export { DocumentCardPage };
