import type { ReactElement } from 'react';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import { Box } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';

import styles from './navTabs.module.css';

interface NavTabsProps {
  created: boolean;
}

export default function NavTabs({ created }: NavTabsProps): ReactElement {
  const createdNames = [
    { name: 'ТИПЫ', path: '/admin/document-types', icon: <ViewModuleIcon /> },
    { name: 'АТРИБУТЫ', path: '/admin/attributes', icon: <ViewStreamIcon /> },
    { name: 'ПОЛЬЗОВАТЕЛИ', path: '/admin/users', icon: <PersonAddIcon /> },
  ];
  const pathName = useLocation().pathname;
  return (
    <Box component={'nav'} sx={{ width: '100%', display: 'flex', mb: '20px' }}>
      {created &&
        createdNames.map((item) => {
          const isActive = pathName === item.path;
          return (
            <NavLink className={isActive ? styles.active : styles.link} key={item.name} to={item.path}>
              {item.icon}
              <span className={styles.text}>{item.name}</span>
            </NavLink>
          );
        })}
    </Box>
  );
}
