import { authUser, getCurrentUser } from '@/api/register-auth';
import { devCheckRole, devCheckToken, devCleanRole, devLogOut, devSaveRole } from '@/shared/utils/dev/dev-utils';
import { makeAutoObservable, runInAction } from 'mobx';
type ISimpleState = 'error' | 'success' | 'loading';

class AuthStore {
  isAuth: boolean = !!devCheckToken();
  isAdmin: boolean = devCheckRole() === 'admin';
  state: ISimpleState = 'success';

  constructor() {
    makeAutoObservable(this);
  }

  async login(email: string, password: string): Promise<void> {
    try {
      this.state = 'loading';
      await authUser({ email, password }); //функция сохраняет токен в локал сторадже
      const data = await getCurrentUser();
      runInAction(() => {
        this.state = 'success';
        this.isAuth = true;
        const role = data.roles.includes('admin') ? 'admin' : 'user';
        this.isAdmin = role === 'admin';
        devSaveRole(role);
      });
    } catch {
      this.state = 'error';
      alert('Ошибка авторизации');
    }
  }

  logout(): void {
    this.isAdmin = false;
    this.isAuth = false;
    devLogOut();
    devCleanRole();
    this.state = 'success';
  }
}

export { AuthStore };
