import type { SignatureCreateRequest } from '@/entities/signature';
import type { SignatureResponse } from '@/entities/signature';

import { documentsStore } from '@/entities/documents';
import { getSignatures, getDocumentSignatures, sendDocument, signDocument } from '@/entities/signature/api';
import { makeAutoObservable, onBecomeObserved, runInAction } from 'mobx';
import { useParams } from 'react-router-dom';

import type { SignDocumentRequest } from '../../api/req-signatures';

type ISimpleState = 'idle' | 'loading' | 'success' | 'error';

class SignaturesStore {
  signatures: SignatureResponse[] = [];
  selectedDocumentSignatures: SignatureResponse[] = [];
  selectedSignature: SignatureResponse | null = null;
  status: ISimpleState = 'idle';

  constructor() {
    makeAutoObservable(this);

    onBecomeObserved(this, 'selectedDocumentSignatures', () => {
      this.fetchDocumentSignatures(Number(useParams().documentId)).catch(console.error);
    });
  }

  private readonly tryCatch =
    <T, A extends unknown[]>(fn: (...args: A) => Promise<T>) =>
    async (...args: A): Promise<T> => {
      try {
        return await fn(...args);
      } catch (e) {
        this.status = 'error';
        throw e;
      }
    };

  fetchSignatures = this.tryCatch(async (): Promise<void> => {
    this.status = 'loading';
    const data = await getSignatures();
    runInAction(() => {
      this.signatures = data;
      this.status = 'success';
    });
  });

  fetchDocumentSignatures = this.tryCatch(async (documentId: number): Promise<void> => {
    this.status = 'loading';
    const data = await getDocumentSignatures(documentId);
    runInAction(() => {
      this.selectedDocumentSignatures = data;
      this.status = 'success';
    });
  });

  async checkSignByEmail(email: string, documentId: number): Promise<boolean> {
    try {
      this.status = 'loading';
      const data = await getDocumentSignatures(documentId);
      const currentSignature =
        data.find((signature) => signature.email === email && signature.status === 'NOT_SIGNED') || null;
      runInAction(() => {
        this.selectedSignature = currentSignature;
      });
      return !!currentSignature;
    } catch {
      this.status = 'error';
      this.selectedSignature = null;
      return false;
    }
  }

  sendDocumentToSign = this.tryCatch(async (signatureData: SignatureCreateRequest): Promise<void> => {
    this.status = 'loading';
    const newSignature = await sendDocument(signatureData);
    runInAction(() => {
      this.signatures.push(newSignature);
      this.status = 'success';
      documentsStore.checkDocumentStatus(Number(useParams().documentId));
    });
  });

  signDocumentById = this.tryCatch(async (sign: SignDocumentRequest): Promise<void> => {
    this.status = 'loading';
    const updatedSignature = await signDocument(sign);
    runInAction(() => {
      this.selectedSignature = updatedSignature;
      documentsStore.checkDocumentStatus(Number(useParams().documentId));
    });
  });
}

const signaturesStore = new SignaturesStore();

export { signaturesStore };
