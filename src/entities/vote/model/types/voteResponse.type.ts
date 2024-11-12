import type { VoteUserResponse } from '@/entities/vote/model/types/voteUserResponse.type.ts';
export interface VoteResponse {
  status: string;
  applicationUser: VoteUserResponse;
}
