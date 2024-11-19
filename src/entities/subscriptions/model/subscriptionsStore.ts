import { makeAutoObservable, onBecomeObserved, runInAction } from 'mobx';

import type { SubscriptionsResponse } from './types/subscriptionsResponse.type';

import { addSubscriptionToDoc, deleteAllSubscriptions, deleteSubscriptionDoc, getAllSubscriptionsData, checkSubscriptionStatus } from '../api/api-subscriptions';

class SubscriptionsStore {
  subscriptions: SubscriptionsResponse[];

  constructor() {
    makeAutoObservable(this);
    this.subscriptions = [];

    onBecomeObserved(this, 'subscriptions', () => {
      this.getAllSubscriptions().catch(console.error);
    });
  }

  async getAllSubscriptions(): Promise<void> {
    try {
      const response = await getAllSubscriptionsData();
      runInAction(() => {
        this.subscriptions = response; // получаем массив из id подписанных документов
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message) {
          alert(error.message);
        } else {
          alert('Что-то не так...');
        }
      }
    }
  }

  async checkSubscription({ id }: { id: number }): Promise<void> {
    try {
      const response = await checkSubscriptionStatus(id);
      if (response) {
        alert('Вы подписаны!')
      } else alert('Вы не подписаны!')
    } catch (error) {
      if (error instanceof Error) {
        if (error.message) {
          alert(error.message);
        } else {
          alert('Что-то не так...');
        }
      }
    }
  }

  async addSubscription({ id }: { id: number }): Promise<void> {
    try {
      const isTrue = await addSubscriptionToDoc(id);
      runInAction(() => {
        if (isTrue) {
          this.subscriptions.push({ id });
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message) {
          alert(error.message);
        } else {
          alert('Что-то не так...');
        }
      }
    }
  }

  async removeSubscription({ id }: { id: number }): Promise<void> {
    try {
      const isTrue = await deleteSubscriptionDoc(id);
      runInAction(() => {
        if (isTrue) this.subscriptions = this.subscriptions.filter((subscription) => subscription.id !== id);
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message) {
          alert(error.message);
        } else {
          alert('Что-то не так...');
        }
      }
    }
  }

  async removeAllSubscriptions(): Promise<void> {
    try {
      const isTrue = await deleteAllSubscriptions();
      runInAction(() => {
        if (isTrue) this.subscriptions = [];
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message) {
          alert(error.message);
        } else {
          alert('Что-то не так...');
        }
      }
    }
  }
}

const subscriptionsStore = new SubscriptionsStore();

export { subscriptionsStore };
