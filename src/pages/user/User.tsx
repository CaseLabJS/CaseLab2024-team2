import type { ReactElement } from 'react';

import { Outlet } from 'react-router-dom';

const User = (): ReactElement => {
  return (
    <div>
      <h1>Страница пользователя</h1>
      <Outlet />
    </div>
  );
};

export default User;
