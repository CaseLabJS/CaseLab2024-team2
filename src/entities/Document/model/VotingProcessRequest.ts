export interface VotingProcessRequest {
name: string; // Название
threshold: unknown; // Порог принятия
deadline: { [key: string]: any }; // Время до дедлайна
documentVersionId: number; // ID версии документа
emails: string[]; // 
}