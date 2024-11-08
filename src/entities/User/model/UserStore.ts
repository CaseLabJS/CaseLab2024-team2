import { registerUser } from '@/api/register-auth';
import { deleteUserData, editUserData, getAllUserData, getUserData } from '@/api/req-user-data';
import { makeAutoObservable, onBecomeObserved, runInAction } from 'mobx';

import type { RegisterRequest } from './RegisterRequest';
import type { UserResponse } from './UserResponse';

class UserStore {
  users: UserResponse[];
  email = '';
  displayName = '';

  constructor() {
    makeAutoObservable(this);
    this.users = [];

    onBecomeObserved(this, 'users', () => {
      this.getAllUsers().catch(console.error);
    });

    this.init();
  }

  async getAllUsers(): Promise<void> {
    try {
      const response = await getAllUserData();
      runInAction(() => {
        this.users = response;
      });
    } catch (error) {
      console.error('Error fetching users:', error);
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
      console.error(error);
      throw error;
    }
  }

  async getUserData({ email }: { email: string }): Promise<void> {
    try {
      const response = await getUserData(email);
      runInAction(() => {
        this.email = response.email;
        this.displayName = response.display_name;
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
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
      console.error('Error editing user data:', error);
    }
  }

  async deleteUser({ email }: { email: string }): Promise<void> {
    try {
      const response = await deleteUserData(email);
      runInAction(() => {
        if (response === 204) this.users = this.users.filter((user) => user.email !== email);
      });
    } catch (error) {
      console.error('Error deleting user data:', error);
    }
  }

  async load(): Promise<void> {
    try {
      const user = await getUserData('admin@gmail.com');
      // TODO надо продумать логику хранения мейла или токена

      runInAction(() => {
        this.email = user.email;
        this.displayName = user.display_name;
      });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  init(): void {
    this.load().catch(console.error);
  }
}

const userStore = new UserStore();

export { userStore };
