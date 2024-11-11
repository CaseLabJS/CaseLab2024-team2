import { getAllDocTypes } from '@/api/req-doc-types';
import { makeAutoObservable, onBecomeObserved, runInAction } from 'mobx';

import type { DocumentTypeResponse } from './types/DocumentTypeResponse';

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

export { DocumentTypesStore };
