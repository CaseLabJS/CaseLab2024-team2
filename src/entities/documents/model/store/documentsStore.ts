import {
  deleteDocumentData,
  getDocumentData,
  updateDocumentData,
  createDocumentData,
  getAllDocumentsData,
  patchDocumentData,
  searchDocumentsData,
  downloadDocumentData,
  grantAccess,
} from '@/entities/documents/api';
import { Status } from '@/shared/types/status.type';
import { DocumentStatus } from '@/shared/utils/statusTranslation';
import { makeAutoObservable, runInAction } from 'mobx';

import type {
  CreateDocumentRequest,
  DocumentFacadeResponse,
  PatchDocumentRequest,
  UpdateDocumentRequest,
} from '../../index';

class DocumentsStore {
  documents: DocumentFacadeResponse[] = [];
  signDocuments: DocumentFacadeResponse[] = [];
  currentDocument: DocumentFacadeResponse | null = null;
  currentDocumentDelete: boolean = false;
  currentSignatureStatus: boolean = false;
  status: Status = Status.UNSET;
  pageNumber: number = 0;
  searchQuery: string = '';
  currentBlob: Blob | null = null;
  rowsPerPage: number = 10;
  count = 0;
  isShowSignedOnly: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  getVisibleDocuments(): void {
    if (this.searchQuery.length > 0) {
      void this.searchDocuments();
    } else {
      void this.getDocumentsPage();
    }
  }
  setCurrentSignatureStatus(status: boolean): void {
    this.currentSignatureStatus = status;
  }
  setQuery(query: string): void {
    this.searchQuery = query;
    this.isShowSignedOnly = false;
    this.getVisibleDocuments();
  }

  setPage(page: number): void {
    this.pageNumber = page;
    if (this.isShowSignedOnly) {
      this.setSignDocuments();
    } else {
      this.getVisibleDocuments();
    }
  }

  setRowsPerPage(rowsPage: number): void {
    this.rowsPerPage = rowsPage;
    this.pageNumber = 0;
    if (this.isShowSignedOnly) {
      this.setSignDocuments();
    } else {
      this.getVisibleDocuments();
    }
  }

  setSignDocuments(): void {
    this.documents = this.signDocuments.slice(
      this.pageNumber * this.rowsPerPage,
      this.pageNumber * this.rowsPerPage + this.rowsPerPage,
    );
  }

  async setIsShowSignedOnly(isValue: boolean): Promise<void> {
    try {
      this.status = Status.LOADING;
      this.isShowSignedOnly = isValue;
      this.pageNumber = 0;
      if (isValue) {
        await this.getDocumentsPage();
        runInAction(() => {
          this.setSignDocuments();
          this.status = Status.SUCCESS;
        });
      } else {
        void this.getDocumentsPage();
        this.status = Status.SUCCESS;
      }
    } catch {
      this.status = Status.ERROR;
    }
  }
  //поиск документов (эту функцию не вызываем, просто устанавливаем query через setQuery)
  async searchDocuments(): Promise<void> {
    try {
      this.status = Status.LOADING;
      if (!this.searchQuery) return;
      const documentPage = await searchDocumentsData({
        page: this.pageNumber,
        size: this.rowsPerPage,
        query: this.searchQuery,
      });

      runInAction(() => {
        this.documents = documentPage.content;
        this.count = documentPage.totalElements;
        this.status = Status.SUCCESS;
      });
    } catch (error) {
      this.status = Status.ERROR;
      throw error;
    }
  }

  //получить все документы
  async getDocumentsPage(): Promise<void> {
    try {
      this.status = Status.LOADING;
      const documentPage = await getAllDocumentsData({
        pageNum: this.pageNumber,
        pageSize: this.isShowSignedOnly ? this.count : this.rowsPerPage,
      });
      runInAction(() => {
        this.searchQuery = '';
        this.documents = documentPage.content;
        this.signDocuments = documentPage.content.filter(
          (item) => item.document.status === DocumentStatus.SIGNATURE_ACCEPTED,
        );
        this.count = documentPage.totalElements;
        if (this.isShowSignedOnly) {
          this.count = this.signDocuments.length;
        }
        this.status = Status.SUCCESS;
      });
    } catch (error) {
      this.status = Status.ERROR;
      throw error;
    }
  }

  //получить документ по id
  async getDocumentById(id: number): Promise<Blob | undefined> {
    this.currentBlob = null;
    try {
      this.status = Status.LOADING;
      const data = await getDocumentData(id);
      const blob = await downloadDocumentData(data.latest_version.id);
      runInAction(() => {
        this.status = Status.SUCCESS;
        this.currentDocument = data;
        this.currentDocumentDelete = this.checkDocumentStatus(id);
        this.currentBlob = blob;
        if (data.signature) {
          this.setCurrentSignatureStatus(true);
        }
      });
      return blob;
    } catch (error) {
      this.status = Status.ERROR;
      throw error;
    }
  }

  //создание документа
  async createDocument(newDocument: CreateDocumentRequest): Promise<void> {
    try {
      this.status = Status.LOADING;
      const createdDocument = await createDocumentData(newDocument);
      if (!createdDocument) {
        // Вызывать уведомление нужно из компонента создающего документ
        // После создания компонента - удалить эту часть
        console.log('Не удалось создать документ');
        return;
      } else {
        runInAction(() => {
          this.status = Status.SUCCESS;
          this.currentDocument = createdDocument;
          this.getDocumentsPage().catch((err) => console.log(err));
        });
      }
    } catch (error) {
      this.status = Status.ERROR;
      throw error;
    }
  }

  //полное изменение документа
  async updateAllDocumentById(id: number, document: UpdateDocumentRequest): Promise<void> {
    try {
      this.status = Status.LOADING;
      const updatedDocument = await updateDocumentData(id, document);
      runInAction(() => {
        this.currentDocument = updatedDocument;
        this.status = Status.SUCCESS;
        this.currentDocumentDelete = this.checkDocumentStatus(id);
        this.getDocumentById(id).catch((err) => console.log(err));
      });
    } catch (error) {
      this.status = Status.ERROR;
      throw error;
    }
  }

  //частичное изменение документа
  async updateDocumentById(id: number, document: PatchDocumentRequest): Promise<void> {
    try {
      this.status = Status.LOADING;
      const updatedDocument = await patchDocumentData(id, document);
      runInAction(() => {
        this.currentDocument = updatedDocument;
        this.status = Status.SUCCESS;
        this.currentDocumentDelete = this.checkDocumentStatus(id);
      });
    } catch (error) {
      this.status = Status.ERROR;
      throw error;
    }
  }

  //отправка документа в архив
  async deleteDocumentById(id: number): Promise<void> {
    try {
      this.status = Status.LOADING;
      await deleteDocumentData(id);
      runInAction(() => {
        this.status = Status.SUCCESS;
        this.currentDocumentDelete = false;
      });
    } catch (error) {
      this.status = Status.ERROR;
      throw error;
    }
  }

  // проверка статуса документа для удаления
  // Для удаления документа статус документа должен быть одним из DRAFT/SIGNATURE_REJECTED/SIGNATURE_ACCEPTED/VOTING_REJECTED/VOTING_ACCEPTED
  checkDocumentStatus(id: number): boolean {
    const document = this.documents.find((item) => item.document.id === id);
    if (document) {
      if (
        document.document.status === DocumentStatus.DRAFT ||
        document.document.status === DocumentStatus.SIGNATURE_REJECTED ||
        document.document.status === DocumentStatus.SIGNATURE_ACCEPTED ||
        document.document.status === DocumentStatus.VOTING_REJECTED ||
        document.document.status === DocumentStatus.VOTING_ACCEPTED
      ) {
        this.currentDocumentDelete = true;
        return true;
      }
    }

    this.currentDocumentDelete = false;
    return false;
  }

  async fetchDocumentBlob(): Promise<Blob> {
    try {
      if (!this.currentDocument?.latest_version.contentName) {
        throw new Error('Отсутствует файл для загрузки');
      }
      const id = this.currentDocument.latest_version.id;
      return await downloadDocumentData(id);
    } catch (error) {
      console.error('Ошибка при загрузке документа:', error);
      throw error;
    }
  }

  async grantAccess(id: number, email: string): Promise<void> {
    try {
      this.status = Status.LOADING;
      const updatedDocument = await grantAccess(id, email);
      runInAction(() => {
        this.currentDocument = updatedDocument;
        this.status = Status.SUCCESS;
      });
    } catch (error) {
      this.status = Status.ERROR;
      throw error;
    }
  }

  clear(): void {
    this.documents = [];
    this.currentDocument = null;
    this.currentDocumentDelete = false;
    this.status = Status.UNSET;
    this.pageNumber = 0;
    this.searchQuery = '';
  }
}

const documentsStore = new DocumentsStore();
export { documentsStore };
