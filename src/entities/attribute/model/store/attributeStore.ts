import type { DocumentTypeResponse, DocumentTypeToAttributeResponse } from '@/entities/documentsType';
import type { PaginationRequest } from '@/shared/types/paginationRequest';
import type { Stateful } from '@/shared/types/status.type';

import {
  addAttributeDoc,
  deleteAttributeDoc,
  getAllAttributeDocs,
  getAttributeDoc,
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
      throw error;
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
      attributeToCreate.status = Status.ERROR;
      console.error(error);
      throw error;
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
      console.error(error);
      throw error;
    }
  }

  async deleteById(id: AttributeResponse['id']): Promise<void> {
    const attributeToDelete = this.attributes.find((attribute) => attribute.id === id);

    if (!attributeToDelete) return;

    try {
      attributeToDelete.status = Status.LOADING;

      await deleteAttributeDoc(id);

      this.attributes.remove(attributeToDelete);
    } catch (error) {
      attributeToDelete.status = Status.ERROR;
      console.error(error);
      throw error;
    }
  }

  async getCombinedDocumentAttributes(documentType: DocumentTypeResponse): Promise<CombinedAttribute[]> {
    const combinedAttributes: CombinedAttribute[] = [];

    for (const attribute of documentType.attributes) {
      combinedAttributes.push({
        ...(await getAttributeDoc(attribute.attribute_id)),
        ...attribute,
      });
    }

    return combinedAttributes;
  }
}

const attributesStore = new AttributesStore();
export { attributesStore };
