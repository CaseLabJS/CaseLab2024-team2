import type { ReactElement, ReactNode } from 'react';

import { Header, Footer } from '@/shared/components/index';
import { Box } from '@mui/material';

const Layout = ({ children }: { children: ReactNode }): ReactElement => {
  return (
    <>
      <Header />
      <Box component="main" sx={{ m: '0 auto', flexGrow: 1, width: '100%', p: '32px 20px' }}>
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
