import type { VoteResponse } from '../../../Vote/model/types/VoteResponse.ts';
export interface VotingProcessResponse {
	id: number;
	name: string;
	threshold: number;
	status: string;
	createdAt: string;
	deadline: string;
	documentId: number;
	votes: VoteResponse;
}