import type { AuthenticationRequest } from '@/entities/auth';
import type { UserResponse } from '@/entities/user';

import { authUser, getCurrentUser } from '@/entities/auth/api';
import { autorun, makeAutoObservable, runInAction } from 'mobx';

type ISimpleState = 'error' | 'success' | 'loading';

class AuthStore {
  isAuth: boolean = !!localStorage.getItem('accessToken');
  isAdmin: boolean = !!localStorage.getItem('isAdmin');
  isUser: boolean = !!localStorage.getItem('isUser');
  displayName: string = '';
  email: string = '';
  state: ISimpleState = 'success';

  constructor() {
    makeAutoObservable(this);

    autorun(async (): Promise<void> => {
      if (this.isAuth) {
        await this.fetchCurrentUser().catch(console.error);
      }
    });
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
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
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
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('isUser');
    });
  }

  private async fetchCurrentUser(): Promise<UserResponse | null> {
    try {
      const data = await getCurrentUser();
      runInAction(() => {
        this.displayName = data.display_name;
        this.email = data.email;
      });
      return data;
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  }

  async processAuthResponse(): Promise<void> {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
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
      } catch (error) {
        throw error;
      }
    }
  }
}

const authStore = new AuthStore();

export { authStore };
