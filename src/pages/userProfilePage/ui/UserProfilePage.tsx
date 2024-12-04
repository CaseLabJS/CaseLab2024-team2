import type { ReactElement } from 'react';

import { Layout } from '@/shared/components/layout';
import { Breadcrumbs } from '@/widgets/breadcrumbs';
import { UserPageInfo } from '@/widgets/userInfo';

const UserProfilePage = (): ReactElement => {
  return (
    <Layout>
      <Breadcrumbs />
      <UserPageInfo />
    </Layout>
  );
};

export default UserProfilePage;
