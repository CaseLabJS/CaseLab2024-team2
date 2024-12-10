import type { DocumentVersionResponse } from '@/entities/documents';
import type { ReactElement } from 'react';

import { documentsStore } from '@/entities/documents';
import { documentVersionsStore } from '@/entities/documentVersions';
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
        {versionsList.map((version, index) => (
          <Box key={index}>
            <Divider />
            <ListItem
              key={index}
              sx={{
                cursor: 'pointer',
                backgroundColor: version.id === currentVersionId ? '#d9ebfa' : 'unset',
                ':hover': { backgroundColor: '#bbdefb' },
              }}
              onClick={() => {
                documentVersionsStore.setCurrentDocumentVersionById(version.id);
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography>{version.name}</Typography>
                <Typography>{new Date(version.createdAt).toLocaleString()}</Typography>
              </Box>
            </ListItem>
          </Box>
        ))}
      </List>
    </Drawer>
  );
};

export { DocumentVersionDrawer };
