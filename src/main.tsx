import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignIn from './routes/SignIn/SignIn.tsx';
import SignUp from './routes/SignUp/SignUp.tsx';
import User from './routes/User/User.tsx';
import Admin from './routes/Admin/Admin.tsx';
import ErrorRoute from './routes/ErrorRoute/ErrorRoute.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorRoute />
  },
  {
    path: "signin/",
    element: <SignIn />,
  },
  {
    path: "signup/",
    element: <SignUp />,
  },
  {
    path: 'user/',
    element: <User />
  },
  {
    path: 'admin/',
    element: <Admin/>
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
