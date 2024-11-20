import type { ReactElement } from 'react';

import { TabsPanel } from '@/shared/components';
import AttributeList from '@/widgets/attributeList/ui/AttributeList';

const CreateAttributePage = (): ReactElement => {
  return (
    <>
      <TabsPanel tabs={[<div>1</div>, <div>2</div>, <div>3</div>]} created />
      <AttributeList />
    </>
  );
};

export default CreateAttributePage;
