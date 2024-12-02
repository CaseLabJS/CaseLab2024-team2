import type { SignatureCreateRequest } from '@/entities/signature';
import type { SignatureResponse } from '@/entities/signature';

import { getSignatures, getDocumentSignatures, sendDocument, signDocument } from '@/entities/signature/api';
import { makeAutoObservable, onBecomeObserved, runInAction } from 'mobx';
import { useParams } from 'react-router-dom';

type ISimpleState = 'idle' | 'loading' | 'success' | 'error';

class SignaturesStore {
  signatures: SignatureResponse[] = [];
  selectedDocumentSignatures: SignatureResponse[] = [];
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

  sendDocumentToSign = this.tryCatch(async (signatureData: SignatureCreateRequest): Promise<void> => {
    this.status = 'loading';
    const newSignature = await sendDocument(signatureData);
    runInAction(() => {
      this.signatures.push(newSignature);
      this.status = 'success';
    });
  });

  signDocumentById = this.tryCatch(async (id: number, status: boolean): Promise<void> => {
    this.status = 'loading';
    const updatedSignature = await signDocument(id, status);
    runInAction(() => {
      const index = this.signatures.findIndex((signature) => signature.id === id);
      if (index !== -1) {
        this.signatures[index] = updatedSignature;
      }
      this.status = 'success';
    });
  });
}

const signaturesStore = new SignaturesStore();

export { signaturesStore };
