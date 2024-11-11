import type { VoteUserResponse } from '@/entities/vote/model/types/VoteUserResponse.ts';
export interface VoteResponse {
	status: string;
	applicationUser: VoteUserResponse;
}