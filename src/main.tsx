import { StrictMode, ReactNode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
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
import { devCheckUserAuth } from "./utils/dev-utils.ts";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = devCheckUserAuth();
  return isAuthenticated ? children : <Navigate to="/signin" />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <User />
      </ProtectedRoute>
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
      <ProtectedRoute>
        <User />
      </ProtectedRoute>
    ),
  },
  {
    path: "admin/",
    element: (
      <ProtectedRoute>
        <Admin />
      </ProtectedRoute>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
