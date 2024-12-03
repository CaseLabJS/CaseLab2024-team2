import type { DocumentVersionResponse } from '@/entities/documents';
import type { PaginationRequest } from '@/shared/types/paginationRequest';

import { makeAutoObservable, runInAction } from 'mobx';

import * as api from '../../api';

class DocumentVersionsStore {
  versions: DocumentVersionResponse[] = [];
  currentVersion: DocumentVersionResponse | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setCurrentDocumentVersionById(id: number): void {
    const version = this.versions.find((v) => v.id == id);
    if (version) {
      this.currentVersion = version;
    }
  }

  async getDocumentVersionsByDocumentId(id: number, paginationRequest: PaginationRequest): Promise<void> {
    try {
      const versions = await api.getDocumentVersionsByDocumentId(id, paginationRequest);
      runInAction(() => {
        this.versions = versions;
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message) {
          alert(error.message);
        } else {
          alert('Что-то пошло не так');
        }
      }
    }
  }
}

const documentVersionsStore = new DocumentVersionsStore();

export { documentVersionsStore };
