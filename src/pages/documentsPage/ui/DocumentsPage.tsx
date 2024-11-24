import type { ReactElement } from 'react';

import { Layout } from '@/shared/components/layout';
import { Breadcrumbs } from '@/widgets/breadcrumbs';
import { DocumentsTable } from '@/widgets/documentsTable';

const DocumentsPage = (): ReactElement => {
  const data = [
    { column1: 'Row 1, Cell 1', column2: 'Row 1, Cell 2', column3: 'Row 1, Cell 3' },
    { column1: 'Row 2, Cell 1', column2: 'Row 2, Cell 2', column3: 'Row 2, Cell 3' },
    { column1: 'Row 3, Cell 1', column2: 'Row 3, Cell 2', column3: 'Row 3, Cell 3' },
    { column1: 'Row 4, Cell 1', column2: 'Row 4, Cell 2', column3: 'Row 4, Cell 3' },
    { column1: 'Row 5, Cell 1', column2: 'Row 5, Cell 2', column3: 'Row 5, Cell 3' },
    { column1: 'Row 6, Cell 1', column2: 'Row 6, Cell 2', column3: 'Row 6, Cell 3' },
    { column1: 'Row 7, Cell 1', column2: 'Row 7, Cell 2', column3: 'Row 7, Cell 3' },
    { column1: 'Row 8, Cell 1', column2: 'Row 8, Cell 2', column3: 'Row 8, Cell 3' },
    { column1: 'Row 9, Cell 1', column2: 'Row 9, Cell 2', column3: 'Row 9, Cell 3' },
    { column1: 'Row 10, Cell 1', column2: 'Row 10, Cell 2', column3: 'Row 10, Cell 3' },
  ];
  return (
    <Layout>
      <Breadcrumbs />
      <DocumentsTable data={data} />
    </Layout>
  );
};

export default DocumentsPage;
