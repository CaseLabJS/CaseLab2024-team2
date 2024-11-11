import type { ReactElement, ReactNode } from 'react';

import { authStore } from '@/entities/auth/model/store';
import Admin from '@/pages/Admin/Admin';
import CreateAttributePage from '@/pages/CreateAttributePage/CreateAttributePage';
import DocumentTypesPage from '@/pages/DocumentTypesPage';
import ErrorPage from '@/pages/ErrorPage/ErrorPage';
import { SignIn } from '@/pages/SignIn/';
import User from '@/pages/User/User';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import Layout from '../layout/Layout';
import { ROUTE_CONSTANTS } from './config/constants';

const AppRouter = observer((): ReactElement => {
  //Если реализуем функцию получения пользователя по токену в userStore, то эту можно снести в будущем
  useEffect(() => {
    const checkAuthAsync = (): void => {
      void authStore.checkAuth();
    };

    checkAuthAsync();
  }, []);
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
