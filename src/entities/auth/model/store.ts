import type { AuthenticationRequest } from '@/entities/user';
import type { UserResponse } from '@/entities/user';

import { authUser, getCurrentUser } from '@/entities/auth/api';
import { makeAutoObservable, runInAction } from 'mobx';
type ISimpleState = 'error' | 'success' | 'loading';

class AuthStore {
  isAuth: boolean = !!localStorage.getItem('token');
  isAdmin: boolean = !!localStorage.getItem('isAdmin');
  isUser: boolean = !!localStorage.getItem('isUser');
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
        const userData = await this.fetchCurrentUser();
        if (userData) {
          this.processAuthResponse(authResponse.token, userData.roles);
        }
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

  private processAuthResponse(token: string, roles: string[]): void {
    runInAction(() => {
      localStorage.setItem('token', token);
      this.state = 'success';
      this.isAuth = true;
      if (roles.includes('ADMIN')) {
        localStorage.setItem('isAdmin', JSON.stringify(roles.includes('ADMIN')));
        this.isAdmin = true;
      }
      if (roles.includes('USER')) {
        localStorage.setItem('isUser', JSON.stringify(roles.includes('USER')));
        this.isUser = true;
      }
    });
  }
}

const authStore = new AuthStore();

export { authStore };
