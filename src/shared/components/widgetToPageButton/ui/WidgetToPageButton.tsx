import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export const WidgetToPageButton = ({ path }: { path: string }) => {
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
