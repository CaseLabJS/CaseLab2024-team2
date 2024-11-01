import type { ReactElement } from 'react';

import { devLogOut } from '@/shared/utils/dev/dev-utils';
import { NavLink, Outlet } from 'react-router-dom';

const Admin = (): ReactElement => {
  return (
    <div>
      <DevAdminHeader />
      <Outlet />
      <DevAdminFooter />
    </div>
  );
};

const DevAdminHeader = (): ReactElement => {
  return (
    <div>
      <h1>Страница администратора</h1>
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
      <NavLink to={'/user'}>Панель пользователя</NavLink>
      <NavLink to={'create-attribute'}>Страница создания аттрибута</NavLink>
    </div>
  );
};
const DevAdminFooter = (): ReactElement => {
  return (
    <div>
      <h1>DevAdminFooter</h1>
    </div>
  );
};
export default Admin;
