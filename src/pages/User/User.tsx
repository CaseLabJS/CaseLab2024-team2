import type { ReactElement } from 'react';

import { devLogOut } from '@/shared/utils/dev/dev-utils';
import { NavLink } from 'react-router-dom';
const User = (): ReactElement=> {
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
      <NavLink to={'/admin'}>Панель администратора</NavLink>
    </div>
  );
};

export default User;
