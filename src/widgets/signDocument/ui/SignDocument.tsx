import type { ReactElement } from 'react';

import { documentsStore } from '@/entities/documents';
import { signaturesStore } from '@/entities/signature';
import { DocumentStatus } from '@/shared/utils/statusTranslation';
import { Button } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

const SignDocument = observer((): ReactElement => {
  const { documentId } = useParams();
  const status = documentsStore.currentDocument?.document.status;

  async function handleSign(sign: boolean): Promise<void> {
    documentsStore.setCurrentSignatureStatus(false);
    await signaturesStore.signDocumentById({ documentId: Number(documentId), status: sign });
  }

  if (status !== DocumentStatus.SIGNATURE_IN_PROGRESS) return <></>;
  if (!documentsStore.currentSignatureStatus) return <></>;

  return (
    <>
      <Button variant="outlined" onClick={() => handleSign(true)}>
        Подписать
      </Button>
      <Button variant="outlined" onClick={() => handleSign(false)}>
        Отправить обратно без подписания
      </Button>
    </>
  );
});

export default SignDocument;
