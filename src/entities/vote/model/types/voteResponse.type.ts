import type { VoteUserResponse } from './voteUserResponse.type.ts';

export interface VoteResponse {
  status: string;
  applicationUser: VoteUserResponse;
}
