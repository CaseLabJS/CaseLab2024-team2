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

  sendDocumentToSign = this.tryCatch(
    async (signatureData: SignatureCreateRequest, isCurrentSign: boolean): Promise<void> => {
      this.status = 'loading';
      const newSignature = await sendDocument(signatureData);
      runInAction(() => {
        this.signatures.push(newSignature);
        this.status = 'success';
        if (isCurrentSign) {
          documentsStore.setCurrentSignatureStatus(isCurrentSign);
        }
        documentsStore.checkDocumentStatus(Number(useParams().documentId));
      });
    },
  );

  signDocumentById = this.tryCatch(async (sign: SignDocumentRequest): Promise<void> => {
    this.status = 'loading';
    const updatedSignature = await signDocument(sign);
    runInAction(() => {
      this.selectedSignature = updatedSignature;
      documentsStore.setCurrentSignatureStatus(false);
      documentsStore.checkDocumentStatus(Number(useParams().documentId));
    });
  });
}

const signaturesStore = new SignaturesStore();

export { signaturesStore };
