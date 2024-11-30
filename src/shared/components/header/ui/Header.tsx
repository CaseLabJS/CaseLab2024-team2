import type { ReactElement } from 'react';

import { ROUTE_CONSTANTS } from '@/app/providers/router/config/constants';
import { authStore } from '@/entities/auth/model/store/authStore';
import Dashboard from '@/shared/components/dashboard/ui/Dashboard';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import logo from './images/logo.svg';

import styles from './header.module.css';

export const Header = observer((): ReactElement => {
  useEffect(() => {
    authStore.processAuthResponse().catch(() => alert('Ошибка'));
  });

  return (
    <header className={styles.header}>
      <div className={styles.userHeader}>
        <NavLink className={styles.userHeader__link} to={ROUTE_CONSTANTS.ROOT.path}>
          <img className={styles.userHeader__logo} src={logo} alt="userHeaderLogo" />
        </NavLink>
        <nav className={styles.userHeader__icons}>
          <Dashboard />
        </nav>
      </div>
    </header>
  );
});
