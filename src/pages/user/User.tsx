import type { ReactElement } from 'react';

import { ROUTE_CONSTANTS } from '@/app/providers/router/config/constants';
import { Layout } from '@/shared/components/layout';
import { Breadcrumbs } from '@/widgets/breadcrumbs';
import { Outlet, Link } from 'react-router-dom';

const User = (): ReactElement => {
  return (
    <Layout>
      <Breadcrumbs />
      <Link to={`${ROUTE_CONSTANTS.USER_DOCUMENTS.path}`}>ДОКУМЕНТЫ</Link>
      <Outlet />
    </Layout>
  );
};

export default User;
