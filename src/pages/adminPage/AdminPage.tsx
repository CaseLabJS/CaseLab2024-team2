import type { ReactElement } from 'react';

import { Layout } from '@/shared/layout';
import { Breadcrumbs } from '@/widgets/breadcrumbs';
import { Typography } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

const Admin = (): ReactElement => {
  return (
    <Layout>
      <Breadcrumbs />
      <Typography variant="h4">Документы</Typography>
      <Link to={'/admin/attributes'}>Аттрибуты</Link>
      <Outlet />
    </Layout>
  );
};

export default Admin;
