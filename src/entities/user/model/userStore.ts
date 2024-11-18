import { registerUser } from '@/entities/auth/api/api-auth';
import { deleteUserData, editUserData, getAllUserData, getUserData } from '@/entities/user/api';
import { makeAutoObservable, onBecomeObserved, runInAction } from 'mobx';

import type { RegisterRequest, UserResponse } from '..';

class UserStore {
  users: UserResponse[];

  constructor() {
    makeAutoObservable(this);
    this.users = [];

    onBecomeObserved(this, 'users', () => {
      this.getAllUsers().catch(console.error);
    });
  }

  async getAllUsers(): Promise<void> {
    try {
      const response = await getAllUserData();
      runInAction(() => {
        this.users = response;
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

  async createUser({ email, display_name, password }: RegisterRequest): Promise<void> {
    try {
      await registerUser({ email, display_name, password });
      const user = await getUserData(email);
      runInAction(() => {
        this.users.push(user);
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

  async editUserData({ password, display_name, email }: RegisterRequest): Promise<void> {
    try {
      const response = await editUserData({ password, display_name });
      const user = this.users.find((user) => user.email === email);
      runInAction(() => {
        if (user) {
          user.display_name = response.display_name;
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

  async deleteUser({ email }: { email: string }): Promise<void> {
    try {
      const response = await deleteUserData(email);
      runInAction(() => {
        if (response === 204) this.users = this.users.filter((user) => user.email !== email);
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

const userStore = new UserStore();

export { userStore };
