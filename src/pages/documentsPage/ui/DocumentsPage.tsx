import type { ReactElement } from 'react';

import { Layout } from '@/shared/components/layout';
import { Breadcrumbs } from '@/widgets/breadcrumbs';
import { Typography } from '@mui/material';
import { Outlet, useParams } from 'react-router-dom';

const DocumentsPage = (): ReactElement => {
  const isDocumentCard = useParams().documentId;
  return (
    <Layout>
      <Breadcrumbs pageTitle={isDocumentCard ? `Документ №${isDocumentCard}` : undefined} />
      <Typography variant="h4">ДОКУМЕНТЫ</Typography>
      <Outlet />
    </Layout>
  );
};

export default DocumentsPage;
