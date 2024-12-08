import type { ReactElement } from 'react';

import { Loader as FullPageLoader } from '@/shared/components/spinner';
import { useState, useEffect } from 'react';

import { AppRouter } from './providers/router';

const App = (): ReactElement => {
  const [isAppLoaded, setIsAppLoaded] = useState(true);

  useEffect(() => {
    const timer = setTimeout((): void => {
      setIsAppLoaded(false);
    }, 2000);
    return (): void => clearTimeout(timer);
  }, []);

  return (
    <>
      <AppRouter />
      {isAppLoaded && <FullPageLoader />}
    </>
  );
};

export { App };
