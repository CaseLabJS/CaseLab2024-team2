import type { ReactElement } from 'react';

import { createContext } from 'react';

class RootStore {
  // userStore: UserStore;

  constructor() {
    // this.userStore = new UserStore(); При создании нового стора необходимо его инициализировать в конструкторе RootStore
  }
}

const rootStore = new RootStore();
const RootStoreContext = createContext<RootStore>(rootStore);

const RootStoreProvider = ({ children }: { children: React.ReactNode }): ReactElement => {
  return <RootStoreContext.Provider value={rootStore}>{children}</RootStoreContext.Provider>;
};

export { RootStoreProvider, RootStoreContext };
