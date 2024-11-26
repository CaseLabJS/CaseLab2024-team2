import type { ReactElement } from 'react';

import { NavTabs } from '@/shared/components';
import { AttributeList } from '@/widgets/attributeList';

const CreateAttributePage = (): ReactElement => {
  return (
    <>
      <NavTabs created />
      <AttributeList />
    </>
  );
};

export default CreateAttributePage;
