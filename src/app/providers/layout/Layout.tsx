import type { ReactElement } from 'react';

import {Header, Footer} from '@/shared/components/index';
import { Box } from '@mui/material';
import { Outlet} from 'react-router-dom';

const Layout = (): ReactElement => {
  return (
    <div>
      <Header/>
      <Box component="main">
        <Outlet />
      </Box>
      <Footer/>
    </div>
  );
};

export default Layout;
