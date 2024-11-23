import type { ReactElement } from 'react';

import DocumentTypesTable from '@/features/documentTypesManagement/ui/documentTypesTable/DocumentTypesTable';
import { TabsPanel } from '@/shared/components';
import UserManagement from '@/shared/components/userManagement/userManagement';

const CreateAttributePage = (): ReactElement => {
  return (
    <>
      <TabsPanel tabs={[<DocumentTypesTable />, <div>2</div>, <UserManagement />]} created />
      <div>Страница со списком аттрибутов</div>
    </>
  );
};

export default CreateAttributePage;
