import type { ReactElement } from 'react';

import { DocumentTypesTable } from '@/features/documentTypesManagement/ui';
import { NavTabs } from '@/shared/components';

const DocumentsTypePage = (): ReactElement => {
  return (
    <>
      <NavTabs created />
      <DocumentTypesTable />
    </>
  );
};

export default DocumentsTypePage;
