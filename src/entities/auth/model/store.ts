import { authUser, getCurrentUser } from '@/api/register-auth';
import { AuthenticationRequest } from '@/entities/User';
import { makeAutoObservable, runInAction } from 'mobx';
type ISimpleState = 'error' | 'success' | 'loading';

class AuthStore {
  isAuth: boolean = !!localStorage.getItem('token');
  isAdmin: boolean = false;
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
    this.isAdmin = false;
    this.isAuth = false;
    this.state = 'success';
  }
  private handleAuthError(): void {
    runInAction(() => {
      this.state = 'error';
      this.isAuth = false;
      this.isAdmin = false;
      localStorage.removeItem('token');
    });
  }

  private async fetchCurrentUser() {
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
      this.isAdmin = roles.includes('ADMIN');
    });
  }
}

const authStore = new AuthStore();

export { authStore };
