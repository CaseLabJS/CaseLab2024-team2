const devSignIn = (role: "user" | "admin"): void => {
  const user = "John Doe";
  localStorage.setItem("auth", JSON.stringify({ user, role }));
  location.reload()
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
    return parsedCredentials.role === "admin" ? true : false;
  } else {
    return false;
  }
};
const devLogOut = () => {
  if (devCheckUserAuth()) {
    localStorage.removeItem("auth");
    location.reload()
  } else {
    console.log("Пользователь не авторизован!");
  }
};
export { devSignIn, devCheckUserAuth, devCheckIsAdmin, devLogOut };
