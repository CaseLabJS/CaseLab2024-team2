import type { ReactElement } from 'react';

import { TabsPanel } from '@/shared/components';
import UserManagement from '@/shared/components/userManagement/userManagement';

const CreateAttributePage = (): ReactElement => {
  return (
    <>
      <TabsPanel tabs={[<div>1</div>, <div>2</div>, <UserManagement />]} created />
      <div>Страница со списком аттрибутов</div>
    </>
  );
};

export default CreateAttributePage;
