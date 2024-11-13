import type { Deadline } from './deadline.type';

export interface VotingProcessRequest {
  name: string;
  threshold: number;
  deadline: Deadline;
  documentId: number;
  emails: string[];
}
