import type { DocumentTypeResponse } from '@/entities/document';
import type { ReactElement } from 'react';

import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useState } from 'react';

import DocumentFormModalWindow from './DocumentFormModalWindow';

export interface DocumentTypeProps {
  documentType: DocumentTypeResponse;
}

const DocumentType = ({ documentType }: DocumentTypeProps): ReactElement => {
  const [isModalWindowOpen, setModalWindowOpen] = useState(false);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Документ {documentType.id}
        </Typography>
        <Typography variant="h6">{documentType.name}</Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={() => setModalWindowOpen(true)}>
          Заполнить
        </Button>
        <Button color="error">Удалить</Button>
      </CardActions>
      <DocumentFormModalWindow
        {...{ documentType, isOpen: isModalWindowOpen, handleClose: () => setModalWindowOpen(false) }}
      />
    </Card>
  );
};

export default DocumentType;
