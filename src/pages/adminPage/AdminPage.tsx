import type { ReactElement } from 'react';

import { Breadcrumbs } from '@/widgets/breadcrumbs';
import { Box, Typography } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

const Admin = (): ReactElement => {
  return (
    <Box>
      <Breadcrumbs />
      <Typography variant="h4">Документы</Typography>
      <Link to={'/admin/attributes'}>Аттрибуты</Link>
      <Outlet />
    </Box>
  );
};

export default Admin;
