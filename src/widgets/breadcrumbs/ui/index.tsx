import type { ReactElement } from 'react';

import { ROUTE_CONSTANTS } from '@/app/providers/router/config/constants';
import HouseIcon from '@mui/icons-material/House';
import { Breadcrumbs as MuiBreadcrumbs, Typography } from '@mui/material';
import { Link as MuiLink } from '@mui/material';
import { useLocation } from 'react-router-dom';

import { getRussianRoute } from '../model/getRussianRoute';

const Breadcrumbs = (): ReactElement => {
  const location = useLocation();

  const routes = location.pathname.split('/');
  if (routes.at(-1) === '') {
    routes.pop();
  }

  const ruRoutes = routes.map((route) => getRussianRoute(route));

  if (ruRoutes.length === 1 || ruRoutes.every((route) => !route)) {
    return <></>;
  }

  const routesComponents = ruRoutes.map((route, index) => {
    if (route === ROUTE_CONSTANTS.ROOT.ruTitle) {
      return (
        <MuiLink key={index} color="inherit" href={ROUTE_CONSTANTS.ROOT.path}>
          <HouseIcon color="inherit" sx={{ mt: 0.5 }} />
        </MuiLink>
      );
    } else if (index !== ruRoutes.length - 1) {
      return (
        <MuiLink key={index} color="inherit" href={routes[index]}>
          {route}
        </MuiLink>
      );
    } else {
      return <Typography key={index}>{route}</Typography>;
    }
  });

  return <MuiBreadcrumbs aria-label="breadcrumb">{routesComponents}</MuiBreadcrumbs>;
};

export { Breadcrumbs };
