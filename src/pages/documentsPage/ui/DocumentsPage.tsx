import type { ReactElement } from 'react';

import { Layout } from '@/shared/components/layout';
import { Breadcrumbs } from '@/widgets/breadcrumbs';
import { DocumentsTable } from '@/widgets/documentsTable';
import { Typography } from '@mui/material';

const DocumentsPage = (): ReactElement => {
  return (
    <Layout>
      <Breadcrumbs />
      <Typography variant="h4">ДОКУМЕНТЫ</Typography>
      <DocumentsTable />
    </Layout>
  );
};

export default DocumentsPage;
