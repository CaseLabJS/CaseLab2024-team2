import type { ReactElement } from 'react';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

export const WidgetToPageButton = ({ path }: { path: string }): ReactElement => {
  return (
    <Box
      sx={() => ({
        position: 'absolute',
        right: '8px',
        top: '8px',
      })}
    >
      <Link to={path}>
        <OpenInNewIcon color="action" />
      </Link>
    </Box>
  );
};
