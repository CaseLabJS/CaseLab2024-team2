import {
  deleteDocumentData,
  getDocumentData,
  updateDocumentData,
  createDocumentData,
  getAllDocumentsData,
  patchDocumentData,
  searchDocumentsData,
} from '@/entities/documents/api';
import { Status } from '@/shared/types/status.type';
import { makeAutoObservable, onBecomeObserved, autorun, runInAction, observable } from 'mobx';

import type {
  CreateDocumentRequest,
  DocumentFacadeResponse,
  PatchDocumentRequest,
  UpdateDocumentRequest,
} from '../index';

class DocumentsStore {
  documents = observable.array<DocumentFacadeResponse>([]);
  status: Status = Status.UNSET;
  pageNumber: number = 0;
  searchQuery: string | null = null;

  constructor() {
    makeAutoObservable(this);

    onBecomeObserved(this, 'documents', () => {
      this.getDocumentsPage().catch(() => alert('Ошибка'));
    });

    autorun(async (): Promise<void> => {
      if (this.searchQuery) {
        await this.searchDocuments();
      } else {
        await this.getDocumentsPage();
      }
    });
  }

  async setQuery(query: string): Promise<void> {
    this.searchQuery = query;
    await this.searchDocuments();
  }

  initPage(): void {
    this.pageNumber = 0;
  }

  //на предыдущую страницу на пагинации
  prevPage(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
    }
  }
  //на след страницу на пагинации (в идеале в ui добавить disabled кнопки при переключении с первой или последней страницы)
  nextPage(): void {
    if (this.pageNumber < 23) {
      this.pageNumber++;
    }
  }

  //поиск документов (эту функцию не вызываем, просто устанавливаем query через setQuery)
  async searchDocuments(): Promise<void> {
    try {
      this.status = Status.LOADING;
      if (!this.searchQuery) return;
      const documentPage = await searchDocumentsData({
        pageNum: this.pageNumber,
        pageSize: 32,
        query: this.searchQuery,
      });
      this.documents.clear();
      this.documents = observable.array(documentPage);
      runInAction(() => {
        this.status = Status.SUCCESS;
      });
    } catch {
      this.status = Status.ERROR;
      alert('Не удалось найти документы');
    }
  }

  //получить все документы
  async getDocumentsPage(): Promise<void> {
    try {
      this.status = Status.LOADING;
      const documentPage = await getAllDocumentsData({ pageNum: this.pageNumber, pageSize: 32 });
      this.documents.clear();
      this.documents = observable.array(documentPage);
      runInAction(() => {
        this.searchQuery = null;
        this.status = Status.SUCCESS;
      });
    } catch {
      this.status = Status.ERROR;
      alert('Не удалось получить список документов');
    }
  }

  //получить документ по id
  async getDocumentById(id: number): Promise<DocumentFacadeResponse | null> {
    try {
      this.status = Status.LOADING;
      const data = await getDocumentData(id);
      runInAction(() => {
        this.status = Status.SUCCESS;
      });
      return data;
    } catch {
      this.status = Status.ERROR;
      alert('Не удалось получить документ');
      return null;
    }
  }

  //создание документа
  async createDocument(newDocument: CreateDocumentRequest): Promise<void> {
    try {
      this.status = Status.LOADING;
      const createdDocument = await createDocumentData(newDocument);
      if (!createdDocument) {
        alert('Не удалось создать документ');
      } else {
        runInAction(() => {
          this.status = Status.SUCCESS;
        });
      }
    } catch {
      this.status = Status.ERROR;
      alert('Не удалось создать документ');
    }
  }

  //полное изменение документа
  async updateAllDocumentById(id: number, document: UpdateDocumentRequest): Promise<void> {
    const documentToUpdate = this.documents.find((item) => item.document.id === id);
    if (documentToUpdate) {
      try {
        this.status = Status.LOADING;
        const updatedAttribute = await updateDocumentData(id, document);
        Object.assign(documentToUpdate, updatedAttribute);
        runInAction(() => {
          this.status = Status.SUCCESS;
        });
      } catch {
        this.status = Status.ERROR;
        alert('Не удалось обновить документ');
      }
    }
  }

  //частичное изменение документа
  async updateDocumentById(id: number, document: PatchDocumentRequest): Promise<void> {
    const documentToUpdate = this.documents.find((item) => item.document.id === id);
    if (documentToUpdate) {
      try {
        this.status = Status.LOADING;
        const updatedAttribute = await patchDocumentData(id, document);
        Object.assign(documentToUpdate, updatedAttribute);
        runInAction(() => {
          this.status = Status.SUCCESS;
        });
      } catch {
        this.status = Status.ERROR;
        alert('Не удалось обновить документ');
      }
    }
  }

  //отправка документа в архив
  async deleteDocumentById(id: number): Promise<void> {
    try {
      this.status = Status.LOADING;
      await deleteDocumentData(id);
      const deletedItem = this.documents.find((item) => item.document.id === id);
      if (deletedItem) {
        this.documents.remove(deletedItem);
      }
      runInAction(() => {
        this.status = Status.SUCCESS;
      });
    } catch {
      this.status = Status.ERROR;
      alert('Не удалось удалить документ');
    }
  }
}

const documentsStore = new DocumentsStore();
export { documentsStore };
