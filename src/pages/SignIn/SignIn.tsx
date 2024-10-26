import { NavLink } from "react-router-dom";
import { devSignIn } from "@/shared/utils/dev/dev-utils";

const SignIn = () => {
  return (
    <div>
      <h1>Вход</h1>
      <button>Войти</button>
      <p>
        Еще не зарегистрированы? Нажмите <NavLink to={"/signup"}>здесь</NavLink>
      </p>
      {/* Для разработки */}
      <div style={{
        backgroundColor: 'rgba(255, 205, 210, 0.8)',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <button onClick={() => devSignIn('user')}>Войти как пользователь</button>
        <button onClick={() => devSignIn('admin')}>Войти как админ</button>
      </div>
      {/* Для разработки */}
    </div>
  );
};

export default SignIn;
