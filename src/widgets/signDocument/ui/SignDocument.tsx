import { signaturesStore } from '@/entities/signature';
import { Button } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useState, type ReactElement, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SignDocument = observer(({ email }: { email: string }): ReactElement => {
  const { documentId } = useParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  async function handleSign(sign: boolean): Promise<void> {
    await signaturesStore.signDocumentById({ documentId: Number(documentId), status: sign });
    setIsOpen(false);
  }

  useEffect(() => {
    void signaturesStore.checkSignByEmail(email, Number(documentId)).then((res) => setIsOpen(res));
  }, [email, documentId]);

  if (!isOpen) return <></>;

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
