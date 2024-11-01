import { VoteResponse } from '../../Vote/model/VoteResponse.ts';
export interface VotingProcessResponse {
id: number; // ID голосования
name: string; // Название
threshold: unknown; // Порог принятия
status: string; // Результат голосования
createdAt: string; // Время создания
deadline: string; // Время окончания
documentVersionId: number; // ID версии документа
votes: VoteResponse[]; // 
}