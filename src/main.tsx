import { StrictMode } from 'react';
import '@/app/styles/index.css';
import { createRoot } from 'react-dom/client';

import { App } from './app/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
