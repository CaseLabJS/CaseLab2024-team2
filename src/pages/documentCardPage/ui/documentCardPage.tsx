import type { ReactElement } from 'react';

import { Header } from '@/shared/components';
import { Breadcrumbs } from '@/widgets/breadcrumbs';

const DocumentCardPage = (): ReactElement => {
  return (
    <>
      <Header />
      <Breadcrumbs />
    </>
  );
};

export { DocumentCardPage };
