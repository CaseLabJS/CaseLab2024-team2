import { authUser, getCurrentUser } from '@/api/register-auth';
import { devCheckToken, devLogOut, devSignIn } from '@/shared/utils/dev/dev-utils';
import { makeAutoObservable, runInAction, when } from 'mobx';

class AuthStore {
  roles: string[];
  _userEmail: string | null;
  _displayName: string;

  get isAuth() {
    //true если user, false если null
    return !!this._userEmail;
  }
  get isAdmin() {
    //true если roles содержит admin, иначе false
    return this.roles.includes('admin');
  }
  get displayName() {
    return this._displayName;
  }

  constructor() {
    makeAutoObservable(this);
    this.roles = [];
    this._userEmail = null;
    this._displayName = '';

    when(
      //когда выполняется выход - удаляем токен
      () => !this._userEmail,
      () => devLogOut(),
    );

    this.init();
  }

  logOut() {
    //выход
    this.roles = [];
    this._userEmail = null;
  }

  async getAuthUser(): Promise<void> {
    //при аутентификации получаем пользователя и роль
    try {
      const data = await getCurrentUser(); //токен уже должен быть сохранен
      runInAction(() => {
        this._userEmail = data.email;
        this._displayName = data.display_name;
        this.roles = data.roles;
      });
    } catch (error) {
      alert('Ошибка авторизации. Попробуйте еще раз');
    }
  }

  async signIn(email: string, password: string): Promise<void> {
    //функция входа
    try {
      await authUser({ email, password }); //сохраняем токен
      await this.getAuthUser();
    } catch (error) {
      alert('Ошибка авторизации. Попробуйте еще раз');
    }
  }
  async load(): Promise<void> {
    //если токен жив, запрашиваем текущего пользователя
    const token = devCheckToken();
    if (token) {
      this.getAuthUser();
    }
  }

  init(): void {
    this.load();
  }
}

export { AuthStore };
