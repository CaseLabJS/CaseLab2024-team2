import { makeAutoObservable, onBecomeObserved, runInAction } from 'mobx';

import type { SubscriptionsResponse } from './types/subscriptionsResponse.type';

import { addSubscriptionToDoc, deleteAllSubscriptions, deleteSubscriptionDoc, getAllSubscriptionsData, getSubscriptionStatusData } from '../api/api-subscriptions';

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
          alert('Something went wrong');
        }
      }
    }
  }

  async checkSubscription({id}: {id: number}): Promise<void> {
    try {
      const response = await getSubscriptionStatusData(id);
      if (response) {
        alert('Вы подписаны!')
      } else alert('Вы не подписаны!')
    } catch (error) {
      if (error instanceof Error) {
        if (error.message) {
          alert(error.message);
        } else {
          alert('Something went wrong');
        }
      }
    }
  }

  async addSubscription({ id }: { id: number }): Promise<void> {
    try {
      const response = await addSubscriptionToDoc(id);
      runInAction(() => {
        if (response === 200) {
        this.subscriptions.push(id);
      }
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message) {
          alert(error.message);
        } else {
          alert('Something went wrong');
        }
      }
    }
  }

  async removeSubscription({ id }: { id: number }): Promise<void> {
    try {
      const response = await deleteSubscriptionDoc(id);
      runInAction(() => {
        if (response === 200) this.subscriptions = this.subscriptions.filter((subscription) => subscription.id !== id);
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message) {
          alert(error.message);
        } else {
          alert('Something went wrong');
        }
      }
    }
  }

  async removeAllSubscriptions(): Promise<void> {
    try {
      const response = await deleteAllSubscriptions();
      runInAction(() => {
        if (response === 200) this.subscriptions.length = 0;
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message) {
          alert(error.message);
        } else {
          alert('Something went wrong');
        }
      }
    }
  }
}

const subscriptionsStore = new SubscriptionsStore();

export { subscriptionsStore };
