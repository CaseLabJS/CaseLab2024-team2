import type { ReactElement, ReactNode } from 'react';

import Admin from '@/pages/Admin/Admin';
import CreateAttributePage from '@/pages/CreateAttributePage/CreateAttributePage';
import DocumentTypesPage from '@/pages/DocumentTypesPage';
import ErrorPage from '@/pages/ErrorPage/ErrorPage';
import SignIn from '@/pages/SignIn/SignIn';
import User from '@/pages/User/User';
import { devCheckUserAuth, devCheckIsAdmin } from '@/shared/utils/dev/dev-utils';
import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import Layout from '../layout/Layout';
import { ROUTE_CONSTANTS } from './config/constants';

const AppRouter = (): ReactElement => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const isAuth = devCheckUserAuth();
    const isAdmin = devCheckIsAdmin();
    setIsAuthenticated(isAuth);
    setIsAdmin(isAdmin);
  }, []);

  const ProtectedUserRoute = ({ children }: { children: ReactNode }): ReactElement => {
    return isAuthenticated ? <>{children}</> : <Navigate to={ROUTE_CONSTANTS.SIGN_IN.path} replace />;
  };

  const ProtectedAdminRoute = ({ children }: { children: ReactNode }): ReactElement => {
    return isAuthenticated && isAdmin ? (
      <>{children}</>
    ) : (
      <Navigate to={isAdmin ? ROUTE_CONSTANTS.ADMIN.path : ROUTE_CONSTANTS.USER.path} replace />
    );
  };

  const router = createBrowserRouter([
    {
      path: ROUTE_CONSTANTS.ROOT.path,
      element: (
        <ProtectedUserRoute>
          <Layout />
        </ProtectedUserRoute>
      ),
      children: [
        {
          path: ROUTE_CONSTANTS.USER.path,
          element: <User />,
          children: [
            {
              path: `${ROUTE_CONSTANTS.USER.path}${ROUTE_CONSTANTS.DOCUMENT_TYPES.path}`,
              element: <DocumentTypesPage />,
            },
          ],
        },
        {
          path: ROUTE_CONSTANTS.ADMIN.path,
          element: (
            <ProtectedAdminRoute>
              <Admin />
            </ProtectedAdminRoute>
          ),
          children: [
            {
              path: `${ROUTE_CONSTANTS.ADMIN.path}${ROUTE_CONSTANTS.CREATE_ATTRIBUTE.path}`,
              element: <CreateAttributePage />,
            },
          ],
        },
      ],
      errorElement: <ErrorPage />,
    },
    {
      path: ROUTE_CONSTANTS.SIGN_IN.path,
      element: isAuthenticated ? (
        <Navigate to={isAdmin ? ROUTE_CONSTANTS.ADMIN.path : ROUTE_CONSTANTS.USER.path} />
      ) : (
        <SignIn />
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
