import type { AuthenticationRequest } from '@/entities/auth';
import type { UserResponse } from '@/entities/user';

import { authUser, getCurrentUser } from '@/entities/auth/api';
import { makeAutoObservable, runInAction } from 'mobx';

type ISimpleState = 'error' | 'success' | 'loading';

class AuthStore {
  isAuth: boolean = !!localStorage.getItem('token');
  isAdmin: boolean = !!localStorage.getItem('isAdmin');
  isUser: boolean = !!localStorage.getItem('isUser');
  displayName: string = '';
  email: string = '';
  state: ISimpleState = 'success';

  constructor() {
    makeAutoObservable(this);
  }

  async login(values: AuthenticationRequest): Promise<void> {
    this.state = 'loading';
    try {
      const authResponse = await authUser(values);
      if (!authResponse) {
        this.handleAuthError();
      } else {
        await this.processAuthResponse();
      }
    } catch (error) {
      this.handleAuthError();
      throw error;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isUser');
    this.isAdmin = false;
    this.isUser = false;
    this.isAuth = false;
    this.displayName = '';
    this.email = '';
    this.state = 'success';
  }

  private handleAuthError(): void {
    runInAction(() => {
      this.state = 'error';
      this.isAuth = false;
      this.isAdmin = false;
      this.isUser = false;
      localStorage.removeItem('token');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('isUser');
    });
  }

  private async fetchCurrentUser(): Promise<UserResponse | null> {
    try {
      const data = await getCurrentUser();
      return data;
    } catch (error) {
      console.error('Error fetching current user:', error);
      return null;
    }
  }

  private async processAuthResponse(): Promise<void> {
    const token = localStorage.getItem('token');
    if (token) {
      const userData = await this.fetchCurrentUser();
      if (userData) {
        runInAction(() => {
          this.state = 'success';
          this.isAuth = true;
          this.displayName = userData.display_name;
          this.email = userData.email;
          if (userData.roles.includes('ADMIN')) {
            localStorage.setItem('isAdmin', JSON.stringify(userData.roles.includes('ADMIN')));
            this.isAdmin = true;
          }
          if (userData.roles.includes('USER')) {
            localStorage.setItem('isUser', JSON.stringify(userData.roles.includes('USER')));
            this.isUser = true;
          }
        });
      } else {
        this.logout();
      }
    }
  }
}

const authStore = new AuthStore();

export { authStore };