import type { ReactElement } from 'react';

import DocumentTypesTable from '@/features/documentTypesManagement/ui/documentTypesTable/DocumentTypesTable';
import { TabsPanel } from '@/shared/components';
import UserManagement from '@/shared/components/userManagement/userManagement';
import { AttributeList } from '@/widgets/attributeList';

const CreateAttributePage = (): ReactElement => {
  return (
    <>
      <TabsPanel
        tabs={[
          <DocumentTypesTable />,
          <div>
            <AttributeList />
          </div>,
          <UserManagement />,
        ]}
        created
      />
      <div>Страница со списком аттрибутов</div>
    </>
  );
};

export default CreateAttributePage;
