import type { ReactElement, ReactNode } from 'react';

import Admin from '@/pages/Admin/Admin';
import CreateAttributePage from '@/pages/CreateAttributePage/CreateAttributePage';
import DocumentTypesPage from '@/pages/DocumentTypesPage';
import ErrorPage from '@/pages/ErrorPage/ErrorPage';
import { SignIn } from '@/pages/SignIn/';
import User from '@/pages/User/User';
// import { devCheckUserAuth, devCheckIsAdmin } from '@/shared/utils/dev/dev-utils';
// import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import Layout from '../layout/Layout';
import { ROUTE_CONSTANTS } from './config/constants';
import { authStore } from '@/entities/auth/model/store';
import { observer } from 'mobx-react-lite';

const AppRouter = observer((): ReactElement => {
  const ProtectedUserRoute = ({ children }: { children: ReactNode }): ReactElement => {
    return authStore.isAuth ? <>{children}</> : <Navigate to={ROUTE_CONSTANTS.SIGN_IN} replace />;
  };

  const ProtectedAdminRoute = ({ children }: { children: ReactNode }): ReactElement => {
    return authStore.isAuth && authStore.isAdmin ? (
      <>{children}</>
    ) : (
      <Navigate to={authStore.isAdmin ? ROUTE_CONSTANTS.ADMIN : ROUTE_CONSTANTS.USER} replace />
    );
  };

  const router = createBrowserRouter([
    {
      path: ROUTE_CONSTANTS.ROOT,
      element: (
        <ProtectedUserRoute>
          <Layout />
        </ProtectedUserRoute>
      ),
      children: [
        {
          path: ROUTE_CONSTANTS.USER,
          element: <User />,
          children: [
            {
              path: ROUTE_CONSTANTS.DOCUMENT_TYPES,
              element: <DocumentTypesPage />,
            },
          ],
        },
        {
          path: ROUTE_CONSTANTS.ADMIN,
          element: (
            <ProtectedAdminRoute>
              <Admin />
            </ProtectedAdminRoute>
          ),
          children: [
            {
              path: ROUTE_CONSTANTS.CREATE_ATTRIBUTE,
              element: <CreateAttributePage />,
            },
          ],
        },
      ],
      errorElement: <ErrorPage />,
    },
    {
      path: ROUTE_CONSTANTS.SIGN_IN,
      element: authStore.isAuth ? (
        <Navigate to={authStore.isAdmin ? ROUTE_CONSTANTS.ADMIN : ROUTE_CONSTANTS.USER} />
      ) : (
        <SignIn />
      ),
    },
  ]);

  return <RouterProvider router={router} />;
});

export default AppRouter;
