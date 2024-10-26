import { ReactNode } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import {
  devCheckUserAuth,
  devCheckIsAdmin,
} from "../../../shared/utils/dev/dev-utils";
import ErrorPage from "../../../widgets/ErrorPage/ErrorPage";
import User from "../../../pages/User/User";
import Admin from "../../../pages/Admin/Admin";
import SignIn from "../../../pages/SignIn/SignIn";
import SignUp from "../../../pages/SignUp/SignUp";
import { ROUTE_CONSTANTS } from "./config/constants";

const AppRouter = () => {
  const ProtectedUserRoute = ({ children }: { children: ReactNode }) => {
    const isAuthenticated = devCheckUserAuth();
    return isAuthenticated ? children : <Navigate to="/signin" />;
  };

  const ProtectedAdminRoute = ({ children }: { children: ReactNode }) => {
    const isAuthenticated = devCheckUserAuth();
    const isAdmin = devCheckIsAdmin();
    return isAuthenticated && isAdmin ? children : <Navigate to="/user" />;
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
      element: devCheckUserAuth() ? <User /> : <SignIn />,
    },
    {
      path: ROUTE_CONSTANTS.SIGN_UP,
      element: devCheckUserAuth() ? <User /> : <SignUp />,
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
