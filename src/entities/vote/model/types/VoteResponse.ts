import type { VoteUserResponse } from '@/entities/vote/model/types/VoteUserResponse';
export interface VoteResponse {
  status: string;
  applicationUser: VoteUserResponse;
}
