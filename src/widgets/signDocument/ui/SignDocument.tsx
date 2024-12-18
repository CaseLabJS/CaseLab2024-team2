import { documentsStore } from '@/entities/documents';
import { signaturesStore } from '@/entities/signature';
import { Button } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, type ReactElement } from 'react';
import { useParams } from 'react-router-dom';

const SignDocument = observer((): ReactElement => {
  const { documentId } = useParams();

  function handleSign(sign: boolean): void {
    documentsStore.setCurrentSignatureStatus(false);
    void signaturesStore.signDocumentById({ documentId: Number(documentId), status: sign });
  }
  useEffect(() => {
    void documentsStore.getDocumentById(Number(documentId));
  }, [documentId]);
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
