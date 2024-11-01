import { AttributeValuePair } from '../../Attribute/model/AttributeValuePair.ts';
export interface DocumentVersionResponse {
id: number; // id версии документа
attributes: AttributeValuePair[]; // Значения аттрибутов текущей версии документа
name: string; // Название версии документа
createdAt: string; // Дата создания текущей версии документа
documentId: number; // id документа
signatureIds: number[]; // id подписей к текущей версии документа
votingProcessesId: number[]; // id голосов к текущей версии документа
contentName: string; // Адрес расположения файла версии документа в хранилище
}