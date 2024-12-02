import type { DocumentVersionResponse } from '@/entities/documents';
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
  versionsList: DocumentVersionResponse[];
  currentVersionId: number;
}): ReactElement => {
  return (
    <Drawer sx={{ width: '400px' }} open={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} anchor="right">
      <Typography sx={{ padding: '20px' }} variant="h6">
        Версии документа: {documentsStore.currentDocument?.document.name}
      </Typography>
      <List sx={{ width: '400px' }}>
        {versionsList.map((version, index) =>
          version.id === currentVersionId ? ( // Если это выбранная версия, то у неё другой фон. Сейчас подходят все версии, так как у нас нет функционала переключения и версия всегда последняя
            <Box key={index}>
              <Divider />
              <ListItem
                key={index}
                sx={{
                  cursor: 'pointer',
                  backgroundColor: '#d9ebfa',
                  ':hover': { backgroundColor: '#bbdefb' },
                }}
                onClick={() => alert(`Версия ${new Date(version.createdAt).toLocaleString()}`)} // TODO добавить функционал переключения версии при клике, то есть меняем в сторе currentVersion
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Typography>{version.name}</Typography>
                  <Typography>{new Date(version.createdAt).toLocaleString()}</Typography>
                </Box>
              </ListItem>
            </Box>
          ) : (
            <Box key={index}>
              <Divider />
              <ListItem
                key={index}
                sx={{
                  cursor: 'pointer',
                  ':hover': { backgroundColor: '#bbdefb' },
                }}
                onClick={() => alert(`Версия ${new Date(version.createdAt).toLocaleString()}`)} // TODO добавить функционал переключения версии при клике
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Typography>{version.name}</Typography>
                  <Typography>{new Date(version.createdAt).toLocaleString()}</Typography>
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
