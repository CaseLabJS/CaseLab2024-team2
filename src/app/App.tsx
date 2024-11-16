import type { ReactElement } from 'react';

import { AppRouter } from './providers/router';

const App = (): ReactElement => {
  return <AppRouter />;
};

export { App };
