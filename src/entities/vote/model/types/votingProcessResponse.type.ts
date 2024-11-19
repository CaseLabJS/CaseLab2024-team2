import type { VoteResponse } from './voteResponse.type.ts';

export interface VotingProcessResponse {
  id: number;
  name: string;
  threshold: number;
  status: string;
  createdAt: string;
  deadline: string;
  documentId: number;
  votes: VoteResponse[];
}
