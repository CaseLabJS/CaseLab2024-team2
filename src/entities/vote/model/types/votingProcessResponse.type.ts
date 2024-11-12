import type { VoteResponse } from '@/entities/vote/model/types/voteResponse.type.ts';
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
