import type { DocumentVersionResponse } from '@/entities/documents';
import type { PaginationRequest } from '@/shared/types/paginationRequest';

import { makeAutoObservable, runInAction } from 'mobx';

import * as api from '../../api';

class DocumentVersionsStore {
  versions: DocumentVersionResponse[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async getDocumentVersionById(id: number): Promise<void> {
    try {
      const version = await api.getDocumentVersionById(id);
      runInAction(() => {
        this.versions = [version];
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
