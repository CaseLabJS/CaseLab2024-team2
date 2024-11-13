import type { ReactElement } from 'react';

import { Header, Footer } from '@/shared/components/index';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Layout = (): ReactElement => {
  return (
    <>
      <Header />
      <Box component="main" maxWidth={'lg'} sx={{ m: '0 auto', height: '100vh', p: '32px 20px' }}>
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
