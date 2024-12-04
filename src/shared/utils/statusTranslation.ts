export enum DocumentStatus {
  DRAFT = 'DRAFT',
  VOTING_IN_PROGRESS = 'VOTING_IN_PROGRESS',
  VOTING_ACCEPTED = 'VOTING_ACCEPTED',
  VOTING_REJECTED = 'VOTING_REJECTED',
  SIGNATURE_IN_PROGRESS = 'SIGNATURE_IN_PROGRESS',
  SIGNATURE_ACCEPTED = 'SIGNATURE_ACCEPTED',
  SIGNATURE_REJECTED = 'SIGNATURE_REJECTED',
  ARCHIVED = 'ARCHIVED',
}

const statusTranslations: Record<DocumentStatus, string> = {
  [DocumentStatus.DRAFT]: 'Черновик',
  [DocumentStatus.VOTING_IN_PROGRESS]: 'На голосовании',
  [DocumentStatus.VOTING_ACCEPTED]: 'Принят голосованием',
  [DocumentStatus.VOTING_REJECTED]: 'Отклонен голосованием',
  [DocumentStatus.SIGNATURE_IN_PROGRESS]: 'Отправлен на подписание',
  [DocumentStatus.SIGNATURE_ACCEPTED]: 'Подписан всеми',
  [DocumentStatus.SIGNATURE_REJECTED]: 'Отклонен получателем',
  [DocumentStatus.ARCHIVED]: 'Архив',
};

export const getStatusTranslation = (status: DocumentStatus): string => {
  return statusTranslations[status] || 'Неизвестный статус';
};
