import type { ReactElement, ReactNode } from 'react';

import { authStore } from '@/entities/auth';
import { Admin } from '@/pages/adminPage';
import { CreateAttributePage } from '@/pages/createAttributePage';
import { DocumentCardPage } from '@/pages/documentCardPage';
import { DocumentTypesPage } from '@/pages/documentPage';
import { ErrorPage } from '@/pages/errorPage';
import { SignIn } from '@/pages/signin';
import { User } from '@/pages/user';
import { observer } from 'mobx-react-lite';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import { ROUTE_CONSTANTS } from './config/constants';

const AppRouter = observer((): ReactElement => {
  const ProtectedUserRoute = ({ children }: { children: ReactNode }): ReactElement => {
    return authStore.isAuth && authStore.isUser === true ? (
      <>{children}</>
    ) : (
      <Navigate to={ROUTE_CONSTANTS.SIGN_IN.path} />
    );
  };

  const ProtectedAdminRoute = ({ children }: { children: ReactNode }): ReactElement => {
    return authStore.isAuth && authStore.isAdmin === true ? (
      <>{children}</>
    ) : (
      <Navigate to={ROUTE_CONSTANTS.SIGN_IN.path} />
    );
  };

  const router = createBrowserRouter(
    [
      {
        path: ROUTE_CONSTANTS.ROOT.path,
        element: <div>Здесь будет главная страница</div>,
        errorElement: <ErrorPage />,
      },
      {
        path: ROUTE_CONSTANTS.USER.path,
        element: (
          <ProtectedUserRoute>
            <User />
          </ProtectedUserRoute>
        ),
        children: [
          {
            path: `${ROUTE_CONSTANTS.USER.path}${ROUTE_CONSTANTS.DOCUMENT_TYPES.path}`,
            element: <DocumentTypesPage />,
          },
        ],
      },
      {
        path: `${ROUTE_CONSTANTS.USER.path}${ROUTE_CONSTANTS.USER_DOCUMENTS.path}/:id`,
        element: (
          <ProtectedUserRoute>
            <DocumentCardPage />
          </ProtectedUserRoute>
        ),
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
            path: `${ROUTE_CONSTANTS.ADMIN.path}${ROUTE_CONSTANTS.ATTRIBUTES.path}`,
            element: <CreateAttributePage />,
          },
        ],
      },
      {
        path: ROUTE_CONSTANTS.SIGN_IN.path,
        element: authStore.isAuth ? (
          <>
            {authStore.isAdmin && <Navigate to={ROUTE_CONSTANTS.ADMIN.path} />}
            {authStore.isUser && <Navigate to={ROUTE_CONSTANTS.USER.path} />}
          </>
        ) : (
          <SignIn />
        ),
      },
    ],
    {
      future: {
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
      },
    },
  );

  return (
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  );
});

export default AppRouter;
