import type { ReactElement } from 'react';

import { devLogOut, devCheckIsAdmin } from '@/shared/utils/dev/dev-utils';
import { NavLink, Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ROUTE_CONSTANTS } from '../router/config/constants';

const Layout = () : ReactElement => {
  return (
    <div>
      <DevHeader />
      <Outlet />
      <DevFooter />
    </div>
  );
};

export default Layout;

const DevHeader = (): ReactElement => {
  const location = useLocation();
  return (
    <div>
      <h1>Хэдер {location.pathname.includes('/admin') ? 'администратора' : 'пользователя'}</h1>
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
      {devCheckIsAdmin() &&
        (location.pathname === '/admin' ? (
          <NavLink to={'/user'}>Панель пользователя</NavLink>
        ) : (
          <NavLink to={'/admin'}>Панель администратора</NavLink>
        ))}
        {location.pathname === '/admin' && <NavLink to={'/admin/create-attribute'}>Создать аттрибут</NavLink>}
        {location.pathname === '/user' && <NavLink to={ROUTE_CONSTANTS.DOCUMENT_TYPES}>Типы документов</NavLink>}
    </div>
  );
};

const DevFooter = (): ReactElement => {
  return (
    <div>
      <h1>Футер</h1>
    </div>
  );
};
