import { authUser } from '@/api/register-auth';
import { devLogOut, devSignIn } from '@/shared/utils/dev/dev-utils';
import { makeAutoObservable, observable, onBecomeObserved, runInAction, autorun } from 'mobx';
type Role = 'user' | 'admin';
class AuthStore {
  role: Role | null = null;
  user: string | null = null;
  get isAuth() {
    //true если user, false если null
    return !!this.user;
  }
  get isAdmin() {
    //true если role  -  admin, иначе false
    return this.role === 'admin';
  }

  constructor() {
    makeAutoObservable(this);

    autorun(() => {
      //если role и user изменяются, то автоматически запись в storage
      if (this.role && this.user) {
        devSignIn(this.role, this.user);
      } else {
        devLogOut();
      }
    });
  }

  logOut() {
    //выход
    this.role = null;
    this.user = null;
  }

  //   async getAuthUser(email: string, password: string): Promise<void> {
  //     //при аутентификации получаем пользователя и роль
  //     try {
  //       const response = await authUser({ email, password });
  //       const data = await getCurrentUserByToken(response.token); создать функцию после создания нового эндпоинта на бэке
  //       runInAction(() => {
  //         this.user = email;
  //         this.role = data.role;
  //       });
  //     } catch (error) {
  //       console.error('Error fetching users:', error);
  //     }
  //  }
}

export { AuthStore };
