import AppRouter from '@/app/providers/router/AppRouter.tsx';
import { StrictMode } from 'react';
import '@/app/styles/index.css';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
);
