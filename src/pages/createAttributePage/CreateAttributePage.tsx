import type { ReactElement } from 'react';

import DocumentTypesTable from '@/features/document-types-table/ui/DocumentTypesTable';
import { TabsPanel } from '@/shared/components';

const CreateAttributePage = (): ReactElement => {
  return (
    <>
      <TabsPanel tabs={[<div>1</div>, <div>2</div>, <div>3</div>]} created />
      <DocumentTypesTable></DocumentTypesTable>
    </>
  );
};

export default CreateAttributePage;
