import type { ReactElement } from 'react';

import { Layout } from '@/shared/components/layout';
import { Breadcrumbs } from '@/widgets/breadcrumbs';
import { Typography } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import DocumentFormModal from '@/shared/components/creationNewDocument/creationNewDocument';
import {Button} from '@mui/material';
import { useState } from 'react';

const Admin = (): ReactElement => {
  const [canOpen, setOpen] = useState(false);

  const handleOpen = ():void => setOpen(true);
  const handleClose = ():void => setOpen(false);
  return (
    <Layout>
      <Breadcrumbs />
      <Typography variant="h4">Документы</Typography>
      <Link to={'/admin/attributes'}>Аттрибуты</Link>
      <Button onClick={handleOpen}>Открыть модальное окно</Button>
      <DocumentFormModal open={canOpen} handleClose={handleClose} />
      <Outlet />
    </Layout>
  );
};

export default Admin;
