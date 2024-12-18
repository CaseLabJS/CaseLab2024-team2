import type { PaginationRequest } from '@/shared/types/paginationRequest';
import type { Stateful } from '@/shared/types/status.type';

import { addDocType, deleteDocType, getAllDocTypes, updateDocType } from '@/entities/documents/api';
import { Status } from '@/shared/types/status.type';
import { makeAutoObservable, runInAction, observable } from 'mobx';

import type { DocumentTypeRequest, DocumentTypeResponse } from '../..';
import type { DocumentTypesPageResponse } from '../types/documentTypesPageResponse.type';

export type StatefulDocumentType = Stateful<DocumentTypeResponse>;

class DocumentTypesStore {
  documentTypes = observable.array<StatefulDocumentType>([]);
  status: Status = Status.UNSET;

  constructor() {
    makeAutoObservable(this);
  }

  async load(reload: boolean = false): Promise<void> {
    if (this.status === Status.LOADING && !reload) return;

    let pageNumber = 0;
    const documentTypes: DocumentTypeResponse[] = [];
    let documentTypesPage: DocumentTypesPageResponse;

    this.status = Status.LOADING;
    try {
      do {
        documentTypesPage = await getAllDocTypes({ pageNum: pageNumber, pageSize: 32 });
        documentTypes.push(...documentTypesPage.content);
        pageNumber++;
      } while (!documentTypesPage.last);

      runInAction(() => {
        this.status = Status.SUCCESS;
        this.documentTypes.replace(
          documentTypes.map((documentType) => {
            return {
              ...documentType,
              status: Status.SUCCESS,
              getOriginal: (): DocumentTypeResponse => documentType,
            } as StatefulDocumentType;
          }),
        );
      });
    } catch (error) {
      this.status = Status.ERROR;
      console.error(error);
      throw error;
    }
  }

  async create(documentType: DocumentTypeRequest): Promise<void> {
    const documentTypeToCreate = observable.object(
      Object.assign(documentType, { id: Date.now(), status: Status.LOADING }) as StatefulDocumentType,
    );
    this.documentTypes.push(documentTypeToCreate);

    try {
      const createdDocumentType = await addDocType(documentType);

      runInAction(() => {
        Object.assign(documentTypeToCreate, createdDocumentType, {
          status: Status.SUCCESS,
          getOriginal: (): DocumentTypeResponse => createdDocumentType,
        });
      });
    } catch (error) {
      documentTypeToCreate.status = Status.ERROR;
      console.error(error);
      throw error;
    }
  }

  getById(id: number): DocumentTypeResponse | undefined {
    return this.documentTypes.find((document) => document.id === id);
  }

  getDocumentTypesPage({ pageNum, pageSize }: PaginationRequest): DocumentTypeResponse[] {
    return this.documentTypes.slice(pageNum * pageSize, pageSize);
  }

  async updateById(id: DocumentTypeResponse['id'], documentType: DocumentTypeRequest): Promise<void> {
    const documentTypeToUpdate = this.documentTypes.find((documentType) => documentType.id === id);

    if (!documentTypeToUpdate) return;

    try {
      documentTypeToUpdate.status = Status.LOADING;

      const updatedDocumentType = await updateDocType(id, documentType);

      runInAction(() => {
        Object.assign(documentTypeToUpdate, updatedDocumentType, {
          status: Status.SUCCESS,
          getOriginal: (): DocumentTypeResponse => updatedDocumentType,
        });
      });
    } catch (error) {
      documentTypeToUpdate.status = Status.ERROR;
      console.error(error);
      throw error;
    }
  }

  async deleteById(id: DocumentTypeResponse['id']): Promise<void> {
    const documentTypeToDelete = this.documentTypes.find((documentType) => documentType.id === id);

    if (!documentTypeToDelete) return;

    try {
      documentTypeToDelete.status = Status.LOADING;

      await deleteDocType(id);

      this.documentTypes.remove(documentTypeToDelete);
    } catch (error) {
      documentTypeToDelete.status = Status.ERROR;
      console.error(error);
      throw error;
    }
  }
}

const documentTypesStore = new DocumentTypesStore();
export { documentTypesStore };
