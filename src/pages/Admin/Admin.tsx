import { NavLink } from "react-router-dom";
import { devLogOut } from "../../shared/utils/dev/dev-utils";

const Admin = () => {
  return (
    <div>
      <h1>Страница администратора</h1>
      {/* Для разработки */}
      <div style={{
        backgroundColor: 'rgba(255, 205, 210, 0.8)',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <button onClick={() => devLogOut()}>Выйти</button>
      </div>
      {/* Для разработки */}
      <NavLink to={"/user"}>Панель пользователя</NavLink>
    </div>
  );
};

export default Admin;
