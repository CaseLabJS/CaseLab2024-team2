import type { ReactElement } from 'react';

import { authStore } from '@/entities/auth';
import { Breadcrumbs } from '@/widgets/breadcrumbs';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

import { ROUTE_CONSTANTS } from '../router/config/constants';

const Layout = (): ReactElement => {
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
  const navigate = useNavigate();
  return (
    <div>
      <h1>Хэдер {authStore.isAdmin ? 'администратора' : 'пользователя'}</h1>
      {/* Для разработки */}
      <Breadcrumbs />
      <div
        style={{
          backgroundColor: 'rgba(255, 205, 210, 0.8)',
          borderRadius: '12px',
          padding: '20px',
        }}
      >
        <button
          onClick={() => {
            authStore.logout();
            navigate('/signin');
          }}
        >
          Выйти
        </button>
      </div>
      {/* Для разработки */}
      {authStore.isAdmin &&
        (authStore.isAdmin ? (
          <NavLink to={'/user'}>Панель пользователя</NavLink>
        ) : (
          <NavLink to={'/admin'}>Панель администратора</NavLink>
        ))}
      {location.pathname === '/admin' && <NavLink to={'/admin/create-attribute'}>Создать аттрибут</NavLink>}
      {location.pathname === '/user' && (
        <NavLink to={`${ROUTE_CONSTANTS.USER.path}${ROUTE_CONSTANTS.DOCUMENT_TYPES.path}`}>Типы документов</NavLink>
      )}
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
