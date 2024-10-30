import type { ReactElement } from 'react';

import { devLogOut } from '@/shared/utils/dev/dev-utils';
import { NavLink } from 'react-router-dom';

import { AdminHeader, AdminFooter} from './HeaderAndFooter.tsx';

const Admin = (): ReactElement => {
  return (
    <div>
      <AdminHeader/>
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
      <AdminFooter/>
    </div>
  );
};

export default Admin;
