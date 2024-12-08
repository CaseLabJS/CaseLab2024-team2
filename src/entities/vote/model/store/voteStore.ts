import type { VotingProcessRequest, VotingProcessResponse, VoteRequest } from '@/entities/vote';

import { authStore } from '@/entities/auth';
import { addVote, createVotingProcess, getVotingProcess } from '@/entities/vote/api';
import { makeAutoObservable, runInAction } from 'mobx';

type ISimpleState = 'error' | 'success' | 'loading';

class VotingStore {
  state: ISimpleState = 'success';
  currentVoting: VotingProcessResponse | null = null;
  isAvailableVote: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }
  setIsAvailableVote(isOpen: boolean): void {
    this.isAvailableVote = isOpen;
  }
  async getAvailableVote(documentId: number, email: string): Promise<void> {
    try {
      this.state = 'loading';
      const data = await getVotingProcess(documentId);
      if (!data) return;
      const findVote = data.votes.find(
        (item) =>
          data.status.includes('IN_PROGRESS') && item.applicationUser.email === email && item.status === 'NOT_VOTED',
      );
      runInAction(() => {
        this.state = 'success';
        if (findVote) {
          this.currentVoting = data;
        }
        this.isAvailableVote = !!findVote;
      });
    } catch {
      runInAction(() => {
        this.state = 'error';
      });
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
        this.currentVoting = data;
        if (data.votes.find((vote) => vote.applicationUser.email === authStore.email)) {
          this.isAvailableVote = true;
        }
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
        if (this.currentVoting?.votes.find((vote) => vote.applicationUser.email === authStore.email)) {
          this.currentVoting = null;
          this.isAvailableVote = false;
        }
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
