import type { DocumentTypeResponse, DocumentTypeToAttributeResponse } from '@/entities/documents';
import type { PaginationRequest } from '@/shared/types/paginationRequest';
import type { Stateful } from '@/shared/types/status.type';

import {
  addAttributeDoc,
  deleteAttributeDoc,
  getAllAttributeDocs,
  updateAttributeDoc,
} from '@/entities/attribute/api/api-attribute';
import { Status } from '@/shared/types/status.type';
import { makeAutoObservable, runInAction, observable } from 'mobx';

import type { AttributeRequest, AttributeResponse } from '../index';
import type { AttributesPageResponse } from './types/attributePageResponse.type';

export interface CombinedAttribute extends AttributeResponse, DocumentTypeToAttributeResponse {}

export interface StatefulAttribute extends AttributeResponse, Stateful {}

class AttributesStore {
  attributes = observable.array<StatefulAttribute>([]);
  status: Status = Status.UNSET;

  constructor() {
    makeAutoObservable(this);
  }

  *load(reload: boolean = false): Generator<Promise<AttributesPageResponse>, void, AttributesPageResponse> {
    if (this.status === Status.LOADING && !reload) return;

    let pageNumber = 0;
    const attibutes: AttributeResponse[] = [];
    let attibutesPage: AttributesPageResponse;

    this.status = Status.LOADING;
    try {
      do {
        attibutesPage = yield getAllAttributeDocs({ pageNum: pageNumber, pageSize: 32 });
        attibutes.push(...attibutesPage.content);
        pageNumber++;
      } while (!attibutesPage.last);

      runInAction(() => {
        this.status = Status.SUCCESS;
        this.attributes = observable.array<StatefulAttribute>(
          attibutes.map((attribute) => Object.assign(attribute, { status: Status.SUCCESS }) as StatefulAttribute),
        );
      });
    } catch (error) {
      this.status = Status.ERROR;
      console.error(error);
      alert('Не удалось получить список атрибутов');
    }
  }

  *create(attibute: AttributeRequest): Generator<Promise<AttributeResponse>, void, AttributeResponse> {
    const statefulAttrubute = observable.object(
      Object.assign(attibute, { id: 0, status: Status.LOADING }) as StatefulAttribute,
    );
    this.attributes.push(statefulAttrubute);

    try {
      const createdAttribute = (yield addAttributeDoc(attibute)) as StatefulAttribute;
      Object.assign(statefulAttrubute, createdAttribute, { status: Status.SUCCESS });
    } catch (error) {
      this.attributes.remove(statefulAttrubute);
      console.error(error);
      alert('Не удалось создать атрибут');
    }
  }

  get(id: AttributeResponse['id']): AttributeResponse | undefined {
    return this.attributes.find((attribute) => attribute.id === id);
  }

  getAll({ pageNum, pageSize }: PaginationRequest): AttributeResponse[] {
    return this.attributes.slice(pageNum * pageSize, pageSize);
  }

  *update(
    id: AttributeResponse['id'],
    attribute: AttributeRequest,
  ): Generator<Promise<AttributeResponse>, void, AttributeResponse> {
    const attributeToUpdate = this.attributes.find((attribute) => attribute.id === id);

    if (!attributeToUpdate) return;

    try {
      attributeToUpdate.status = Status.LOADING;

      const updatedAttribute = (yield updateAttributeDoc(id, attribute)) as StatefulAttribute;
      updatedAttribute.status = Status.SUCCESS;

      Object.assign(attributeToUpdate, updatedAttribute, { status: Status.SUCCESS });
    } catch (error) {
      attributeToUpdate.status = Status.ERROR;
      alert('Не удалось обновить атрибут');
      console.error(error);
    }
  }

  *delete(id: AttributeResponse['id']): Generator<Promise<void>, void, void> {
    const attributeToDeleteIndex = this.attributes.findIndex((attribute) => attribute.id === id);

    if (attributeToDeleteIndex === -1) return;

    try {
      this.attributes[attributeToDeleteIndex].status = Status.LOADING;

      yield deleteAttributeDoc(id);

      this.attributes = observable.array(this.attributes.filter((attribute) => attribute.id !== id));
    } catch (error) {
      this.attributes[attributeToDeleteIndex].status = Status.ERROR;
      alert('Не удалось удалить атрибут');
      console.error(error);
    }
  }

  getCombinedDocumentAttributes(documentType: DocumentTypeResponse): CombinedAttribute[] {
    return documentType.attributes.map((attribute) => {
      return {
        ...attribute,
        ...this.get(attribute.attribute_id),
      } as CombinedAttribute;
    });
  }
}

const attributesStore = new AttributesStore();
export { attributesStore };
