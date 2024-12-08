import type { ReactElement } from 'react';

import { Worker } from '@react-pdf-viewer/core';

import { AppRouter } from './providers/router';

const App = (): ReactElement => {
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <AppRouter />
    </Worker>
  );
};

export { App };
