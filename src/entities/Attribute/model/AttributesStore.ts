import type { DocumentTypeResponse, DocumentTypeToAttributeResponse } from '@/entities/document';

import { getAllAttributeDocs } from '@/api/req-doc-attributes';
import { makeAutoObservable, onBecomeObserved, runInAction } from 'mobx';

import type { AttributeResponse } from './types/AttributeResponse';

export interface CombinedAttribute extends AttributeResponse, DocumentTypeToAttributeResponse {}

class AttributesStore {
  attributes: AttributeResponse[];

  constructor() {
    makeAutoObservable(this);
    this.attributes = [];

    onBecomeObserved(this, 'attributes', () => {
      getAllAttributeDocs()
        .then((result) =>
          runInAction(() => {
            this.attributes = result;
          }),
        )
        .catch(console.error);
    });
  }

  getAttribute(id: number): AttributeResponse | undefined {
    return this.attributes.find((attribute) => attribute.id === id);
  }

  getCombinedDocumentAttributes(documentType: DocumentTypeResponse): CombinedAttribute[] {
    return documentType.attributes.map((attribute) => {
      return {
        ...attribute,
        ...this.getAttribute(attribute.attribute_id),
      } as CombinedAttribute;
    });
  }
}

const attributesStore = new AttributesStore();
export { attributesStore };
