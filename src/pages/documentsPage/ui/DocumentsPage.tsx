import type { ReactElement } from 'react';

import { Layout } from '@/shared/components/layout';
import { Breadcrumbs } from '@/widgets/breadcrumbs';
import { Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

const DocumentsPage = (): ReactElement => {
  return (
    <Layout>
      <Breadcrumbs />
      <Typography variant="h4">ДОКУМЕНТЫ</Typography>
      <Outlet />
    </Layout>
  );
};

export default DocumentsPage;
