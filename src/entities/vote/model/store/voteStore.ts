import type { VotingProcessRequest, VotingProcessResponse, VoteRequest } from '@/entities/vote';

import { addVote, createVotingProcess, getVotingProcess } from '@/entities/vote/api';
import { makeAutoObservable, runInAction } from 'mobx';

type ISimpleState = 'error' | 'success' | 'loading';

class VotingStore {
  state: ISimpleState = 'success';

  constructor() {
    makeAutoObservable(this);
  }

  async isAvailibleVote(documentId: number, email: string): Promise<boolean> {
    try {
      this.state = 'loading';
      const data = await getVotingProcess(documentId);
      if (!data) return false;
      const findVote = data.votes.find(
        (item) => data.status.includes('IN_PROGRESS') && item.applicationUser.email === email,
      );
      runInAction(() => {
        this.state = 'success';
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
    } catch {
      runInAction(() => {
        this.state = 'success';
      });
      return null;
    }
  }

  async createVoting(newVoting: VotingProcessRequest): Promise<void> {
    try {
      this.state = 'loading';
      const data = await createVotingProcess(newVoting);
      if (!data) {
        alert('Ошибка создания');
      } else {
        alert('Отправлен на голосование');
      }
      runInAction(() => {
        this.state = 'success';
      });
    } catch {
      runInAction(() => {
        this.state = 'error';
        alert('Ошибка при создании голосования. Что-то пошло не так');
      });
    }
  }

  async addVoteDocument(newVoteUser: VoteRequest): Promise<void> {
    try {
      this.state = 'loading';
      const addedVote = await addVote(newVoteUser);
      if (addedVote) {
        alert('Ваш голос записан');
      }
      runInAction(() => {
        this.state = 'success';
      });
    } catch {
      runInAction(() => {
        this.state = 'error';
        alert('Ошибка при голосовании. Повторите попытку');
      });
    }
  }
}

const votingStore = new VotingStore();

export { votingStore };
