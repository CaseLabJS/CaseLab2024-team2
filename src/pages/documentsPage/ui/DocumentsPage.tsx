import type { ReactElement } from 'react';

import { Breadcrumbs } from '@/widgets/breadcrumbs';
import { DocumentsTable } from '@/widgets/documentsTable';

const DocumentsPage = (): ReactElement => {
  return (
    <>
      <Breadcrumbs />
      <DocumentsTable />
    </>
  );
};

export default DocumentsPage;
