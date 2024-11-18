import { getAllDocTypes } from '@/entities/documents/api';
import { makeAutoObservable, onBecomeObserved, runInAction } from 'mobx';

import type { DocumentTypeResponse } from '..';

class DocumentTypesStore {
  documentTypes: DocumentTypeResponse[];

  constructor() {
    makeAutoObservable(this);
    this.documentTypes = [];

    onBecomeObserved(this, 'documentTypes', () => {
      getAllDocTypes()
        .then((result) =>
          runInAction(() => {
            this.documentTypes = result;
          }),
        )
        .catch(console.log);
    });
  }

  getDocumentType(id: number): DocumentTypeResponse | undefined {
    return this.documentTypes.find((document) => document.id === id);
  }
}

const documentTypesStore = new DocumentTypesStore();
export { documentTypesStore };
