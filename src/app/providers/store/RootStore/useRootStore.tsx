import { useContext } from 'react';

import type { RootStore } from './RootStore';

import { RootStoreContext } from './RootStore';

const useRootStore = (): RootStore => {
  return useContext(RootStoreContext);
};

export { useRootStore };
