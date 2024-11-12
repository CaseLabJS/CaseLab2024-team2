export interface VotingProcessRequest {
  name: string;
  threshold: number;
  deadline: { [key: string]: unknown };
  documentId: number;
  emails: string[];
}
