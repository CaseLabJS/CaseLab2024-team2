const devSignIn = (role: "user" | "admin"): void => {
  const user = "John Doe";
  localStorage.setItem("auth", JSON.stringify({ user, role }));
};
const devCheckUserAuth = (): boolean => {
  const credentials = localStorage.getItem("auth");
  if (credentials !== null) {
    return true;
  } else {
    return false;
  }
};
const devCheckIsAdmin = () => {
  if (devCheckUserAuth()) {
    const credentials = localStorage.getItem("auth");
    const parsedCredentials = JSON.parse(credentials as string);
    console.log(parsedCredentials);
  } else {
    console.log("Пользователь не авторизован!");
  }
};
const devLogOut = () => {
  if (devCheckUserAuth()) {
    localStorage.removeItem("auth");
  } else {
    console.log("Пользователь не авторизован!");
  }
};
export { devSignIn, devCheckUserAuth, devCheckIsAdmin, devLogOut };
