import type { ReactElement } from 'react';

import { ROUTE_CONSTANTS } from '@/app/providers/router/config/constants';
import { authStore } from '@/entities/auth/model/store/authStore';
import Dashboard from '@/shared/components/dashboard/ui/Dashboard';
import NotificatoinsBadge from '@/shared/components/notificatoinsBadge/ui/NotificatoinsBadge';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import logo from './images/logo.svg';

import styles from './header.module.css';
import { useToast } from '@/shared/hooks';

export const Header = observer((): ReactElement => {
  const { showToast } = useToast();
  const stableShowToast = useCallback(showToast, [showToast]);
  useEffect(() => {
    authStore.processAuthResponse().catch(() => stableShowToast('error', 'Ошибка'));
  });

  return (
    <header className={styles.header}>
      <div className={styles.userHeader}>
        <NavLink className={styles.userHeader__link} to={ROUTE_CONSTANTS.ROOT.path}>
          <img className={styles.userHeader__logo} src={logo} alt="userHeaderLogo" />
        </NavLink>
        <nav className={styles.userHeader__icons}>
          <NotificatoinsBadge />
          <Dashboard />
        </nav>
      </div>
    </header>
  );
});
