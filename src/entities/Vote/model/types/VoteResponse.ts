import type { VoteUserResponse } from '../../../vote/model/types/VoteUserResponse.ts';
export interface VoteResponse {
  status: string;
  applicationUser: VoteUserResponse;
}
