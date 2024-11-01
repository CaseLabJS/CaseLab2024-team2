import type { ReactElement } from "react";

import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

import './header.css';
import bellIcon from './images/bell.svg';
import logo from './images/logo.svg';
import chatIcon from './images/messenger.svg';
import userIcon from './images/user.svg';

export const Header = (): ReactElement => {

  /**Пример данных о пользователе (для разработки) */
  const user = {
    id: 1,
    email: 'user@mail.ru',
    isAdmin: true,
  }

  /**Пример уведомлений (для разработки) */
  const notices = [
    {
      id: 1,
      note: 'Получено уведомление',
      isRead: false
    },
    {
      id: 2,
      note: 'Нужно проголосовать',
      isRead: false
    },
    {
      id: 3,
      note: 'Новый сотрудник',
      isRead: false
    },
  ]

  /**Функционал выпадающего меню пользователя: */
  const [isOpen, setOpen] = useState(false);
  const handleOpen = (): void => setOpen(!isOpen);

  /**Счетчик уведомлений */
  // const [countNotices, setCountNotices] = useState(0);
  // if (notices.length !== 0) {
  //   setCountNotices(notices.length);
  // }

  /**Массив пунктов выпадающего меню пользователя: */
  const itemsAdmin = [ // в случае администратора
    {
      name: 'Администратор',
      link: 'admin',
    },
    {
      name: 'Выход',
      link: 'signin',
    }
  ];

  const itemsUser = [ // в случае простого пользователя
    {
      name: 'Выход',
      link: 'signin',
    }
  ];

  /** Проверка пользователя на права администратора, для рендеринга сообветствующего меню пользователя*/
  let items;

  if (user.isAdmin === true) {
    items = itemsAdmin;
  } else items = itemsUser;

  return (
    <header className="user-header">
      <NavLink className="user-header__link" to={'/'}><img className="user-header__logo" src={logo} alt="user-header-logo" /></NavLink>
      <nav className='user-header__icons'>
        <NavLink className="user-header__link" to={'/'}>
          <img className="user-header__user-icon user-header__user-icon_chat" src={chatIcon} alt="chat-icon" />
        </NavLink>
        <NavLink className="user-header__link" to={'/'}>
          <img className="user-header__user-icon user-header__user-icon_bell" src={bellIcon} alt="bell-icon" />
          {/* {
            countNotices > 0 &&
            (<p className="user-header__user-icon_bell-notes">{countNotices}</p>)
          } */}
        </NavLink>
        <NavLink className="user-header__link" to={'/'}>
          <img onClick={handleOpen} className="user-header__user-icon user-header__user-icon_user" src={userIcon} alt="user-icon" />
          {
            isOpen && (<ul className="user-menu">
              {items.map((item, i) => (
                <NavLink to={item.link} key={i}><li>{item.name}</li></NavLink>
              ))}
            </ul>)
          }
        </NavLink>
      </nav>
    </header>
  )
}
