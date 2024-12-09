import type { ReactElement } from 'react';

import { authStore } from '@/entities/auth';
import { documentsStore } from '@/entities/documents';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { ListItemIcon, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Logout(): ReactElement {
  return (
    <MenuItem>
      <ListItemIcon>
        <ExitToAppIcon htmlColor="rgba(0 0 0 / 54%)" />
      </ListItemIcon>
      <Link
        style={{
          display: 'flex',
          paddingLeft: '4px',
          textDecoration: 'none',
        }}
        to="/"
        onClick={() => {
          authStore.logout();
          documentsStore.clear();
        }}
      >
        Выход
      </Link>
    </MenuItem>
  );
}
