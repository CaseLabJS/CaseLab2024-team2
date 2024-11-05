import { makeAutoObservable, onBecomeObserved, runInAction } from 'mobx';

import { DocumentTypeResponse } from './DocumentTypeResponse';
import { getAllDocTypes } from '@/api/req-doc-types';

class DocumentTypesStore {
    documentTypes: DocumentTypeResponse[];

    constructor() {
        makeAutoObservable(this);
        this.documentTypes = [];

        onBecomeObserved(this, 'documentTypes', () => {
        getAllDocTypes()
            .then(result => runInAction(() => { this.documentTypes = result }))
            .catch(console.log);
        });
    }

    getDocumentType(id: number) {
        return this.documentTypes.find(document => document.id === id)
    }
}

export { DocumentTypesStore };