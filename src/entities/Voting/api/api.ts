import { api } from '@/shared/http';
import { VoteRequest, VoteResponse } from '@/entities/Vote';
import { VotingProcessRequest, VotingProcessResponse } from '..';

// получение голосование по id документа
export const getVotingProcess = async (documentId: number): Promise<VotingProcessResponse> => {
  const response = await api.get<VotingProcessResponse>(`/voting_process?documentId=${documentId}`);
  return response.data;
};

// создание голосования
export const createVotingProcess = async (createVote: VotingProcessRequest): Promise<VotingProcessResponse> => {
  const response = await api.post<VotingProcessResponse>('/voting_process', createVote);
  return response.data;
};

// проголосовать
export const addVote = async (vote: VoteRequest): Promise<VoteResponse> => {
  const response = await api.post<VoteResponse>('/voting_process/vote', vote);
  return response.data;
};
