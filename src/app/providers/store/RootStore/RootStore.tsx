import type { ReactElement } from 'react';

import { UserStore } from '@/entities/User/model/UserStore';
import { createContext } from 'react';
import { AuthStore } from '@/entities/auth';

class RootStore {
  userStore: UserStore;
  authStore: AuthStore;
  constructor() {
    this.userStore = new UserStore(); // При создании нового стора необходимо его инициализировать в конструкторе RootStore
    this.authStore = new AuthStore();
  }
}

const rootStore = new RootStore();
const RootStoreContext = createContext<RootStore>(rootStore);

const RootStoreProvider = ({ children }: { children: React.ReactNode }): ReactElement => {
  return <RootStoreContext.Provider value={rootStore}>{children}</RootStoreContext.Provider>;
};

export { RootStoreProvider, RootStoreContext, RootStore };
