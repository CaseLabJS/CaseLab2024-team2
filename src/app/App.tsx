import type { ReactElement } from 'react';

import AppRouter from './providers/router/AppRouter';

const App = (): ReactElement => {
  return <AppRouter />;
};

export { App };
