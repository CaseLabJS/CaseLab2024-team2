import type { ReactElement } from 'react';

import { ROUTE_CONSTANTS } from '@/app/providers/router/config/constants';
import HouseIcon from '@mui/icons-material/House';
import { Breadcrumbs as MuiBreadcrumbs, Typography } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';

import { getRussianRouteAndPath } from '../model/getRussianRoute';

const Breadcrumbs = ({ pageTitle }: { pageTitle?: string }): ReactElement => {
  const location = useLocation();

  const routes = location.pathname.split('/');
  if (routes.at(-1) === '') {
    routes.pop();
  }

  const ruRoutes = routes.map((route) => getRussianRouteAndPath(route));

  if (ruRoutes.length === 1 || ruRoutes.every((route) => !route)) {
    return <></>;
  }

  let path = '';
  const routesComponents = ruRoutes.map((route, index) => {
    if (route?.ruTitle === ROUTE_CONSTANTS.ROOT.ruTitle) {
      return (
        <NavLink key={index} color="inherit" to={ROUTE_CONSTANTS.ROOT.path}>
          <HouseIcon color="inherit" sx={{ mt: 0.5 }} />
        </NavLink>
      );
    } else if (index !== ruRoutes.length - 1) {
      path += route?.path;
      return (
        <NavLink key={index} color="inherit" to={path}>
          {route?.ruTitle}
        </NavLink>
      );
    } else {
      return <Typography key={index}>{route?.ruTitle ?? pageTitle}</Typography>;
    }
  });

  return <MuiBreadcrumbs aria-label="breadcrumb">{routesComponents}</MuiBreadcrumbs>;
};

export default Breadcrumbs;
