import type { ReactElement } from 'react';

import AppRouter from './providers/router/AppRouter';
import { RootStoreProvider } from './providers/store/RootStore';

const App = (): ReactElement => {
  return (
    <RootStoreProvider>
      <AppRouter />
    </RootStoreProvider>
  );
};

export { App };
