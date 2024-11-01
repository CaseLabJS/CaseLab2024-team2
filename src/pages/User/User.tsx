import type { ReactElement } from 'react';

import { devLogOut, devCheckIsAdmin } from '@/shared/utils/dev/dev-utils';
import { NavLink, Outlet } from 'react-router-dom';

const User = (): ReactElement => {
  return (
    <div>
      <DevUserHeader />
      <Outlet />
      <DevUserFooter />
    </div>
  );
};

const DevUserHeader = (): ReactElement => {
  return (
    <div>
      <h1>Страница пользователя</h1>
      {/* Для разработки */}
      <div
        style={{
          backgroundColor: 'rgba(255, 205, 210, 0.8)',
          borderRadius: '12px',
          padding: '20px',
        }}
      >
        <button onClick={() => devLogOut()}>Выйти</button>
      </div>
      {/* Для разработки */}
      {devCheckIsAdmin() && <NavLink to={'/admin'}>Панель администратора</NavLink>}
    </div>
  );
};

const DevUserFooter = (): ReactElement => {
  return (
    <div>
      <h1>DevUserFooter</h1>
    </div>
  );
};

export default User;
