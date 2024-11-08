import type { ReactElement } from 'react';

import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { authStore } from '@/entities/auth/model/store';

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
      {authStore.isAdmin && <NavLink to={'/admin/create-attribute'}>Создать аттрибут</NavLink>}
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
