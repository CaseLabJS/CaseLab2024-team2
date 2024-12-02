import type { ReactElement } from 'react';

import { authStore } from '@/entities/auth';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Button } from '@mui/material';

export default function Logout(): ReactElement {
  return (
    <Button
      startIcon={<ExitToAppIcon htmlColor="rgba(0 0 0 / 54%)" />}
      sx={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '4px', width: '96px' }}
      onClick={() => {
        authStore.logout();
      }}
    >
      Выход
    </Button>
  );
}
