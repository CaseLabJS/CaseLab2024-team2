import type { ReactElement } from 'react';

import { authStore } from '@/entities/auth';
import { Layout } from '@/shared/components/layout';
import { Inbox, LocationOn } from '@mui/icons-material';
import { Breadcrumbs, Icon, Stack, Typography, Snackbar } from '@mui/material';
import React from 'react';

const UserProfilePage = (): ReactElement => {
  const [isSnackbarOpen, setSnackbarOpen] = React.useState(false);

  const handleCopyEmail = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(authStore.email);
      setSnackbarOpen(true); // Показать уведомление
    } catch (error) {
      console.error('Ошибка при копировании email:', error);
    }
  };

  return (
    <Layout>
      <Breadcrumbs />
      <Typography variant="h4" component="h1">
        {authStore.displayName}
      </Typography>
      <Stack direction="row" spacing={'16px'} alignItems="center">
        <Icon color="action">
          <LocationOn />
        </Icon>
        <Typography variant="body1">Название организации(как идея)</Typography>
        <Icon color="action">
          <Inbox />
        </Icon>
        <Typography
          variant="body1"
          onClick={handleCopyEmail}
          style={{ cursor: 'pointer', textDecoration: 'underline' }}
        >
          {authStore.email}
        </Typography>
      </Stack>

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="Email скопирован!"
      />
    </Layout>
  );
};
export default UserProfilePage;
