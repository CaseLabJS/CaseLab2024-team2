import type { ReactElement } from 'react';

import { Header, Footer } from '@/shared/components/index';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Layout = (): ReactElement => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100vh', alignItems: 'center' }}>
      <Header />
      <Box component="main">
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
