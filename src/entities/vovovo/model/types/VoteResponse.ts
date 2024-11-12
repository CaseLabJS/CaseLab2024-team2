import type { VoteUserResponse } from '@/entities/vovovo/model/types/VoteUserResponse';
export interface VoteResponse {
  status: string;
  applicationUser: VoteUserResponse;
}
