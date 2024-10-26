import { NavLink } from 'react-router-dom';

const SignUp = (): JSX.Element => {
  return (
    <div>
      <h1>Регистрация</h1>
      <button>Зарегистрироваться</button>
      <p>
        Уже зарегистрированы? Нажмите <NavLink to={'/signin'}>здесь</NavLink>
      </p>
    </div>
  );
};

export default SignUp;
