import type { ReactElement } from 'react';

import { authStore } from '@/entities/auth';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Button } from '@mui/material';

export default function Logout(): ReactElement {
  return (
    <Button
      startIcon={<ExitToAppIcon />}
      onClick={() => {
        authStore.logout();
      }}
    >
      Log out
    </Button>
  );
}
