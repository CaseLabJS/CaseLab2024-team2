import type { ReactElement } from 'react';

import { Outlet } from 'react-router-dom';

const Admin = (): ReactElement => {
  return (
    <div>
      <h1>Страница администратора</h1>
      <Outlet />
    </div>
  );
};

export default Admin;
