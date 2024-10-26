import type { ReactNode } from 'react';

import Admin from '@/pages/Admin/Admin';
import ErrorPage from '@/pages/ErrorPage/ErrorPage';
import SignIn from '@/pages/SignIn/SignIn';
import SignUp from '@/pages/SignUp/SignUp';
import User from '@/pages/User/User';
import { devCheckUserAuth, devCheckIsAdmin } from '@/shared/utils/dev/dev-utils';
import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import { ROUTE_CONSTANTS } from './config/constants';

const AppRouter = (): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const isAuth = devCheckUserAuth();
    const isAdmin = devCheckIsAdmin();
    setIsAuthenticated(isAuth);
    setIsAdmin(isAdmin);
  }, []);

  const ProtectedUserRoute = ({ children }: { children: ReactNode }): JSX.Element => {
    return isAuthenticated ? <>{children}</> : <Navigate to={ROUTE_CONSTANTS.SIGN_IN} replace />;
  };

  const ProtectedAdminRoute = ({ children }: { children: ReactNode }): JSX.Element => {
    return isAuthenticated && isAdmin ? <>{children}</> : <Navigate to={ROUTE_CONSTANTS.USER} replace />;
  };

  const router = createBrowserRouter([
    {
      path: ROUTE_CONSTANTS.ROOT,
      element: (
        <ProtectedUserRoute>
          <User />
        </ProtectedUserRoute>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: ROUTE_CONSTANTS.SIGN_IN,
      element: isAuthenticated ? <Navigate to={ROUTE_CONSTANTS.USER} /> : <SignIn />,
    },
    {
      path: ROUTE_CONSTANTS.SIGN_UP,
      element: isAuthenticated ? <Navigate to={ROUTE_CONSTANTS.USER} /> : <SignUp />,
    },
    {
      path: ROUTE_CONSTANTS.USER,
      element: (
        <ProtectedUserRoute>
          <User />
        </ProtectedUserRoute>
      ),
    },
    {
      path: ROUTE_CONSTANTS.ADMIN,
      element: (
        <ProtectedAdminRoute>
          <Admin />
        </ProtectedAdminRoute>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
