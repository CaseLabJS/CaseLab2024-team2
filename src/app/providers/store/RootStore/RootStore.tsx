import type { ReactElement } from 'react';

import { AttributesStore } from '@/entities/attribute';
import { DocumentTypesStore } from '@/entities/document';
import { UserStore } from '@/entities/user/model/UserStore';
import { createContext } from 'react';

class RootStore {
  userStore: UserStore;
  documentTypesStore: DocumentTypesStore;
  attributesStore: AttributesStore;

  constructor() {
    this.userStore = new UserStore(); // При создании нового стора необходимо его инициализировать в конструкторе RootStore
    this.documentTypesStore = new DocumentTypesStore();
    this.attributesStore = new AttributesStore();
  }
}

const rootStore = new RootStore();
const RootStoreContext = createContext<RootStore>(rootStore);

const RootStoreProvider = ({ children }: { children: React.ReactNode }): ReactElement => {
  return <RootStoreContext.Provider value={rootStore}>{children}</RootStoreContext.Provider>;
};

export { RootStoreProvider, RootStoreContext, RootStore };
