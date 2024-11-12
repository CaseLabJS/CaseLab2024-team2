import type { VoteResponse } from '@/entities/vovovo/model/types/VoteResponse';
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
