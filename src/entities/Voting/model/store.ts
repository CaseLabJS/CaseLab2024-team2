import { makeAutoObservable, runInAction } from 'mobx';
import { addVote, createVotingProcess, getVotingProcess } from '../api';
import { VoteRequest } from '@/entities/Vote';
import { VotingProcessRequest, VotingProcessResponse } from '..';
type ISimpleState = 'error' | 'success' | 'loading';

class VotingStore {
  state: ISimpleState = 'success';

  constructor() {
    makeAutoObservable(this);
  }

  async getVotingDocument(documentId: number): Promise<VotingProcessResponse | null> {
    try {
      this.state = 'loading';
      const data = await getVotingProcess(documentId);
      runInAction(() => {
        this.state = 'success';
      });
      return data;
    } catch (error) {
      runInAction(() => {
        this.state = 'error';
        alert('Ошибка. Что-то пошло не так');
      });
      return null;
    }
  }

  async createVoting(newVoting: VotingProcessRequest): Promise<void> {
    try {
      this.state = 'loading';
      await createVotingProcess(newVoting);
      runInAction(() => {
        this.state = 'success';
      });
    } catch (error) {
      runInAction(() => {
        this.state = 'error';
        alert('Ошибка при создании голосования. Что-то пошло не так');
      });
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
        alert('Ошибка при голосовании. Повторите попытку');
      });
    }
  }
}

const votingStore = new VotingStore();

export { votingStore };
