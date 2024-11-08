interface Credentials {
  role: string;
}

const devSignIn = (role: 'user' | 'admin'): void => {
  const user = 'John Doe';
  localStorage.setItem('auth', JSON.stringify({ user, role }));
  location.reload();
};
const devCheckUserAuth = (): boolean => {
  const credentials = localStorage.getItem('auth');
  if (credentials !== null) {
    return true;
  } else {
    return false;
  }
};
const devCheckIsAdmin = (): boolean => {
  if (devCheckUserAuth()) {
    const credentials = localStorage.getItem('auth');
    if (credentials) {
      try {
        const parsedCredentials = JSON.parse(credentials) as Credentials;
        return parsedCredentials.role === 'admin';
      } catch (error) {
        console.error('Error parsing credentials:', error);
        return false;
      }
    }
  }
  return false;
};
const devLogOut = (): void => {
  if (devCheckUserAuth()) {
    localStorage.removeItem('auth');
    location.reload();
  } else {
    console.log('Пользователь не авторизован!');
  }
};
export { devSignIn, devCheckUserAuth, devCheckIsAdmin, devLogOut };