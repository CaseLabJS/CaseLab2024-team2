import type { ReactElement } from 'react';

import { Layout } from '@/shared/components/layout';
import { Breadcrumbs } from '@/widgets/breadcrumbs';
import { Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Admin = (): ReactElement => {
  return (
    <Layout>
      <Breadcrumbs />
      <Typography variant="h4">ADMIN MENU</Typography>
      <Outlet />
    </Layout>
  );
};

export default Admin;
