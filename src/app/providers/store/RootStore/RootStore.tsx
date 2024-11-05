import type { ReactElement } from 'react';

import { UserStore } from '@/entities/User/model/UserStore';
import { createContext } from 'react';
import { DocumentTypesStore } from '@/entities/Document/model/DocumentTypesStore';

class RootStore {
  userStore: UserStore;
  documentTypesStore: DocumentTypesStore;

  constructor() {
    this.userStore = new UserStore(); // При создании нового стора необходимо его инициализировать в конструкторе RootStore
    this.documentTypesStore = new DocumentTypesStore();
  }
}

const rootStore = new RootStore();
const RootStoreContext = createContext<RootStore>(rootStore);

const RootStoreProvider = ({ children }: { children: React.ReactNode }): ReactElement => {
  return <RootStoreContext.Provider value={rootStore}>{children}</RootStoreContext.Provider>;
};

export { RootStoreProvider, RootStoreContext, RootStore };
