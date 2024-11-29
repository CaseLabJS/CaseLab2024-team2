import type { ReactElement } from 'react';

import { NavTabs } from '@/shared/components';
import { Layout } from '@/shared/components/layout';
import { Breadcrumbs } from '@/widgets/breadcrumbs';
import { Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

const User = (): ReactElement => {
  return (
    <Layout>
      <Breadcrumbs />
      <Typography variant="h4">{'ДОКУМЕНТЫ'}</Typography>
      <NavTabs created={false} />
      <Outlet />
    </Layout>
  );
};

export default User;
