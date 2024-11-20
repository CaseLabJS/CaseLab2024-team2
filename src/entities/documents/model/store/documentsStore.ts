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
import { makeAutoObservable, onBecomeObserved, autorun, runInAction } from 'mobx';

import type {
  CreateDocumentRequest,
  DocumentFacadeResponse,
  PatchDocumentRequest,
  UpdateDocumentRequest,
} from '../../index';

class DocumentsStore {
  documents: DocumentFacadeResponse[] = [];
  currentDocument: DocumentFacadeResponse | null = null;
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
      runInAction(() => {
        this.documents = documentPage;
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
      runInAction(() => {
        this.searchQuery = null;
        this.documents = documentPage;
        this.status = Status.SUCCESS;
      });
    } catch {
      this.status = Status.ERROR;
      alert('Не удалось получить список документов');
    }
  }

  //получить документ по id
  async getDocumentById(id: number): Promise<void> {
    try {
      this.status = Status.LOADING;
      const data = await getDocumentData(id);
      runInAction(() => {
        this.status = Status.SUCCESS;
        this.currentDocument = data;
      });
    } catch {
      this.status = Status.ERROR;
      alert('Не удалось получить документ');
    }
  }

  //создание документа
  async createDocument(newDocument: CreateDocumentRequest): Promise<void> {
    try {
      this.status = Status.LOADING;
      const createdDocument = await createDocumentData(newDocument);
      if (!createdDocument) {
        alert('Не удалось создать документ');
        return;
      } else {
        runInAction(() => {
          this.status = Status.SUCCESS;
          this.currentDocument = createdDocument;
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
        const updatedDocument = await updateDocumentData(id, document);
        runInAction(() => {
          this.currentDocument = updatedDocument;
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
        const updatedDocument = await patchDocumentData(id, document);
        runInAction(() => {
          this.currentDocument = updatedDocument;
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
      runInAction(() => {
        this.documents = this.documents.filter((item) => item.document.id !== id);
        this.status = Status.SUCCESS;
        this.currentDocument = null;
      });
    } catch {
      this.status = Status.ERROR;
      alert('Не удалось удалить документ');
    }
  }
}

const documentsStore = new DocumentsStore();
export { documentsStore };
