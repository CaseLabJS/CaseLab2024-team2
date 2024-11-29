import type { Dispatch, ReactElement } from 'react';

import { Drawer } from '@mui/material';

const DocumentVersionDrawer = ({ dispatch }: { dispatch: Dispatch<boolean> }): ReactElement => {
  return (
    <Drawer
      anchor="right"
      open={false}
      onClose={() => {
        dispatch(false);
      }}
    ></Drawer>
  );
};

export { DocumentVersionDrawer };
