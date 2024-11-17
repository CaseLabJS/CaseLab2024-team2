import type { ReactElement } from 'react';

import { Layout } from '@/shared/components/layout';
import { Outlet } from 'react-router-dom';

const User = (): ReactElement => {
  return (
    <Layout>
      <div>
        <h1>Страница пользователя</h1>
        <Outlet />
      </div>
    </Layout>
  );
};

export default User;
