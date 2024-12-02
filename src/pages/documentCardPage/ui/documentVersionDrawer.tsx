import type { ReactElement } from 'react';

import { documentsStore } from '@/entities/documents';
import { Box, Divider, Drawer, List, ListItem, Typography } from '@mui/material';

const DocumentVersionDrawer = ({
  isOpenDrawer,
  setIsOpenDrawer,
  versionsList,
  currentVersionId,
}: {
  isOpenDrawer: boolean;
  setIsOpenDrawer: (isOpenDrawer: boolean) => void;
  versionsList: {
    id: number;
    name: string;
    date: string;
  }[];
  currentVersionId: number;
}): ReactElement => {
  return (
    <Drawer sx={{ width: '400px' }} open={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} anchor="right">
      <Typography sx={{ padding: '20px' }} variant="h6">
        Версии документа: {documentsStore.currentDocument?.document.name}
      </Typography>
      <List sx={{ width: '400px' }}>
        {versionsList.map((version) =>
          version.id === currentVersionId ? (
            <Box key={version.id}>
              <Divider />
              <ListItem
                key={version.id}
                sx={{
                  cursor: 'pointer',
                  backgroundColor: '#d9ebfa',
                  ':hover': { backgroundColor: '#bbdefb' },
                }}
                onClick={() => alert(`Версия ${new Date(version.date).toLocaleString()}`)} // TODO добавить функционал переключения версии
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Typography>{version.name}</Typography>
                  <Typography>{new Date(version.date).toLocaleString()}</Typography>
                </Box>
              </ListItem>
            </Box>
          ) : (
            <Box key={version.id}>
              <Divider />
              <ListItem
                key={version.id}
                sx={{
                  cursor: 'pointer',
                  ':hover': { backgroundColor: '#bbdefb' },
                }}
                onClick={() => alert(`Версия ${new Date(version.date).toLocaleString()}`)} // TODO добавить функционал переключения версии
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Typography>{version.name}</Typography>
                  <Typography>{new Date(version.date).toLocaleString()}</Typography>
                </Box>
              </ListItem>
            </Box>
          ),
        )}
      </List>
    </Drawer>
  );
};

export { DocumentVersionDrawer };
