import type { ReactElement } from 'react';

import { Breadcrumbs as MuiBreadcrumbs, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

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

  return (
    <MuiBreadcrumbs aria-label="breadcrumb">
      {ruRoutes.map((route, index) =>
        index !== ruRoutes.length - 1 ? (
          <Link key={index} to={routes[index]}>
            {route}
          </Link>
        ) : (
          <Typography key={index}>{route}</Typography>
        ),
      )}
    </MuiBreadcrumbs>
  );
};

export { Breadcrumbs };
