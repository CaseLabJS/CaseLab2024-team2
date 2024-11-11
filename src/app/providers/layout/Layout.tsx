import type { ReactElement } from 'react';

import {Header, Footer} from '@/shared/components/index';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { authStore } from '@/entities/auth/model/store';
import { Breadcrumbs } from '@/widgets/breadcrumbs';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

import { ROUTE_CONSTANTS } from '../router/config/constants';

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
