import type { VotingProcessRequest, VotingProcessResponse, VoteRequest } from '@/entities/vote';

import { documentsStore } from '@/entities/documents';
import { addVote, createVotingProcess, getVotingProcess } from '@/entities/vote/api';
import { DocumentStatus } from '@/shared/utils/statusTranslation';
import { makeAutoObservable, runInAction } from 'mobx';

type ISimpleState = 'error' | 'success' | 'loading';

class VotingStore {
  state: ISimpleState = 'success';
  currentVoting: VotingProcessResponse | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async isAvailibleVote(documentId: number, email: string): Promise<boolean> {
    try {
      this.state = 'loading';
      const data = await getVotingProcess(documentId);
      if (!data) return false;
      const findVote = data.votes.find(
        (item) =>
          data.status.includes('IN_PROGRESS') && item.applicationUser.email === email && item.status === 'NOT_VOTED',
      );
      runInAction(() => {
        this.state = 'success';
        if (findVote) {
          this.currentVoting = data;
        }
      });
      return !!findVote;
    } catch {
      runInAction(() => {
        this.state = 'error';
      });
      return false;
    }
  }

  async getVotingDocument(documentId: number): Promise<VotingProcessResponse | null> {
    try {
      this.state = 'loading';
      const data = await getVotingProcess(documentId);

      if (!data) {
        return null;
      }
      runInAction(() => {
        this.state = 'success';
      });
      return data;
    } catch (error) {
      runInAction(() => {
        this.state = 'success';
      });
      throw error;
    }
  }

  async createVoting(newVoting: VotingProcessRequest): Promise<void> {
    try {
      this.state = 'loading';
      await createVotingProcess(newVoting);
      runInAction(() => {
        documentsStore.setCurrentStatus(DocumentStatus.VOTING_IN_PROGRESS);
        this.state = 'success';
      });
    } catch (error) {
      runInAction(() => {
        this.state = 'error';
      });
      throw error;
    }
  }

  async addVoteDocument(newVoteUser: VoteRequest): Promise<void> {
    try {
      this.state = 'loading';
      await addVote(newVoteUser);
      runInAction(() => {
        this.state = 'success';
      });
    } catch (error) {
      runInAction(() => {
        this.state = 'error';
        throw error;
      });
    }
  }
}

const votingStore = new VotingStore();

export { votingStore };
