import { Button } from '@mui/material';
import { useState, type ReactElement } from 'react';

const DocumentVersionButton = (): ReactElement => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Button variant="contained" color="primary" onClick={() => setOpen(!isOpen)}>
      Версии
    </Button>
  );
};

export { DocumentVersionButton };
