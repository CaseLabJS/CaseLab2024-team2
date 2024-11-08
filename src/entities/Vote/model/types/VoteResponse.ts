import type { VoteUserResponse } from '../../../Vote/model/types/VoteUserResponse.ts';
export interface VoteResponse {
	status: string;
	applicationUser: VoteUserResponse;
}