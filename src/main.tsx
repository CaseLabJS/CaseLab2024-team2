import { StrictMode, ReactNode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import SignIn from "./routes/SignIn/SignIn.tsx";
import SignUp from "./routes/SignUp/SignUp.tsx";
import User from "./routes/User/User.tsx";
import Admin from "./routes/Admin/Admin.tsx";
import ErrorRoute from "./routes/ErrorRoute/ErrorRoute.tsx";
import { devCheckIsAdmin, devCheckUserAuth } from "./utils/dev-utils.ts";

const ProtectedUserRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = devCheckUserAuth();
  return isAuthenticated ? children : <Navigate to="/signin" />;
};

const ProtectedAdminRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = devCheckUserAuth();
  const isAdmin = devCheckIsAdmin()
  return isAuthenticated && isAdmin ? children : <Navigate to="/user" />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedUserRoute>
        <User />
      </ProtectedUserRoute>
    ),
    errorElement: <ErrorRoute />,
  },
  {
    path: "signin/",
    element: devCheckUserAuth() ? <User /> : <SignIn />,
  },
  {
    path: "signup/",
    element: devCheckUserAuth() ? <User /> : <SignUp />,
  },
  {
    path: "user/",
    element: (
      <ProtectedUserRoute>
        <User />
      </ProtectedUserRoute>
    ),
  },
  {
    path: "admin/",
    element: (
      <ProtectedAdminRoute>
        <Admin />
      </ProtectedAdminRoute>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
