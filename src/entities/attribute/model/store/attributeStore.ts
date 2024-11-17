import type { DocumentTypeResponse, DocumentTypeToAttributeResponse } from '@/entities/documentsType';
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

import type { AttributeRequest, AttributeResponse, AttributesPageResponse } from '../../index';

export interface CombinedAttribute extends AttributeResponse, DocumentTypeToAttributeResponse {}

export type StatefulAttribute = Stateful<AttributeResponse>;

class AttributesStore {
  attributes = observable.array<StatefulAttribute>([]);
  status: Status = Status.UNSET;

  constructor() {
    makeAutoObservable(this);
  }

  async load(reload: boolean = false): Promise<void> {
    if (this.status === Status.LOADING && !reload) return;

    let pageNumber = 0;
    const attributes: AttributeResponse[] = [];
    let attributesPage: AttributesPageResponse;

    this.status = Status.LOADING;
    try {
      do {
        attributesPage = await getAllAttributeDocs({ pageNum: pageNumber, pageSize: 32 });
        attributes.push(...attributesPage.content);
        pageNumber++;
      } while (!attributesPage.last);

      runInAction(() => {
        this.status = Status.SUCCESS;
        this.attributes.replace(
          attributes.map((attribute) => {
            return {
              ...attribute,
              status: Status.SUCCESS,
              getOriginal: (): AttributeResponse => attribute,
            } as StatefulAttribute;
          }),
        );
      });
    } catch (error) {
      this.status = Status.ERROR;
      console.error(error);
      alert('Не удалось получить список атрибутов');
    }
  }

  async create(attribute: AttributeRequest): Promise<void> {
    const attributeToCreate = observable.object(
      Object.assign(attribute, { id: Date.now(), status: Status.LOADING }) as StatefulAttribute,
    );
    this.attributes.push(attributeToCreate);

    try {
      const createdAttribute = await addAttributeDoc(attribute);

      runInAction(() => {
        Object.assign(attributeToCreate, createdAttribute, {
          status: Status.SUCCESS,
          getOriginal: (): AttributeResponse => createdAttribute,
        });
      });
    } catch (error) {
      this.attributes.remove(attributeToCreate);
      console.error(error);
      alert('Не удалось создать атрибут');
    }
  }

  getById(id: AttributeResponse['id']): AttributeResponse | undefined {
    return this.attributes.find((attribute) => attribute.id === id);
  }

  getAttributesPage({ pageNum, pageSize }: PaginationRequest): AttributeResponse[] {
    return this.attributes.slice(pageNum * pageSize, pageSize);
  }

  async updateById(id: AttributeResponse['id'], attribute: AttributeRequest): Promise<void> {
    const attributeToUpdate = this.attributes.find((attribute) => attribute.id === id);

    if (!attributeToUpdate) return;

    try {
      attributeToUpdate.status = Status.LOADING;

      const updatedAttribute = (await updateAttributeDoc(id, attribute)) as StatefulAttribute;
      updatedAttribute.status = Status.SUCCESS;

      runInAction(() => {
        Object.assign(attributeToUpdate, updatedAttribute, {
          status: Status.SUCCESS,
          getOriginal: (): AttributeResponse => attributeToUpdate,
        });
      });
    } catch (error) {
      attributeToUpdate.status = Status.ERROR;
      alert('Не удалось обновить атрибут');
      console.error(error);
    }
  }

  async deleteById(id: AttributeResponse['id']): Promise<void> {
    const attributeToDeleteIndex = this.attributes.findIndex((attribute) => attribute.id === id);

    if (attributeToDeleteIndex === -1) return;

    try {
      this.attributes[attributeToDeleteIndex].status = Status.LOADING;

      await deleteAttributeDoc(id);

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
        ...this.getById(attribute.attribute_id),
      } as CombinedAttribute;
    });
  }
}

const attributesStore = new AttributesStore();
export { attributesStore };
