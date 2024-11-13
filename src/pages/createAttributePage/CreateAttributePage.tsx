import type { ReactElement } from 'react';

import { TabsPanel } from '@/shared/components';

const CreateAttributePage = (): ReactElement => {
  return (
    <>
      <TabsPanel tabs={[<div>1</div>, <div>2</div>, <div>3</div>]} created />
      <div>Страница со списком аттрибутов</div>
    </>
  );
};

export default CreateAttributePage;
