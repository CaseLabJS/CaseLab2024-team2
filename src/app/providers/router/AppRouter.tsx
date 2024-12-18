import type { ReactElement, ReactNode } from 'react';

import { authStore } from '@/entities/auth';
import { AdminMainPage } from '@/pages/adminMainPage';
import { Admin } from '@/pages/adminPage';
import { CreateAttributePage } from '@/pages/createAttributePage';
import { DocumentCardPage } from '@/pages/documentCardPage';
import { DocumentsPage } from '@/pages/documentsPage';
import { DocumentsTypePage } from '@/pages/documentsTypePage';
import { ErrorPage } from '@/pages/errorPage';
import { MainMenu } from '@/pages/mainMenu';
import { SignIn } from '@/pages/signin';
import { UserManagmentPage } from '@/pages/userManagmentPage';
import { UserProfilePage } from '@/pages/userProfilePage';
import { DocumentsTable } from '@/widgets/documentsTable';
import { observer } from 'mobx-react-lite';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import { ToastProvider } from '../ToastProvider';
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
        element: <MainMenu />,
        errorElement: <ErrorPage />,
      },
      {
        path: ROUTE_CONSTANTS.USER_DOCUMENTS.path,
        element: (
          <ProtectedUserRoute>
            <DocumentsPage />
          </ProtectedUserRoute>
        ),
        children: [
          {
            path: `${ROUTE_CONSTANTS.USER_DOCUMENTS.path}`,
            element: <DocumentsTable />,
          },
          {
            path: `${ROUTE_CONSTANTS.USER_DOCUMENTS.path}${ROUTE_CONSTANTS.DOCUMENT_CARD.path}`,
            element: <DocumentCardPage />,
          },
        ],
      },
      {
        path: ROUTE_CONSTANTS.USER_PROFILE.path,
        element: (
          <ProtectedUserRoute>
            <UserProfilePage />
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
            path: `${ROUTE_CONSTANTS.ADMIN.path}`,
            element: <AdminMainPage />,
          },
          {
            path: `${ROUTE_CONSTANTS.ADMIN.path}${ROUTE_CONSTANTS.DOCUMENT_TYPES.path}`,
            element: <DocumentsTypePage />,
          },
          {
            path: `${ROUTE_CONSTANTS.ADMIN.path}${ROUTE_CONSTANTS.ATTRIBUTES.path}`,
            element: <CreateAttributePage />,
          },
          {
            path: `${ROUTE_CONSTANTS.ADMIN.path}${ROUTE_CONSTANTS.USERS.path}`,
            element: <UserManagmentPage />,
          },
        ],
      },
      {
        path: ROUTE_CONSTANTS.SIGN_IN.path,
        element: authStore.isAuth ? (
          <>
            {authStore.isAdmin && <Navigate to={ROUTE_CONSTANTS.ADMIN.path} />}
            {authStore.isUser && <Navigate to={ROUTE_CONSTANTS.USER_DOCUMENTS.path} />}
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
    <ToastProvider>
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
    </ToastProvider>
  );
});

export default AppRouter;
