import type { ReactElement } from "react";

import { useState } from "react";
import { NavLink } from "react-router-dom";

import './header.css';
import { ROUTE_CONSTANTS } from '../../../app/providers/router/config/constants';
import bellIcon from './images/bell.svg';
import logo from './images/logo.svg';
import chatIcon from './images/messenger.svg';
import userIcon from './images/user.svg';

export const Header = (): ReactElement => {

  /**Пример данных о пользователе - должно приходить с backend (для разработки) */
  const user = {
    id: 1,
    email: 'user@mail.ru',
    isAdmin: true,
  }

  /**Пример уведомлений - должно приходить с backend (для разработки) */
  const notifications = [ // уведомления
    {
      id: 1,
      note: 'Получено уведомление',
      isRead: true,
    },
    {
      id: 2,
      note: 'Нужно проголосовать',
      isRead: true,
    },
    {
      id: 3,
      note: 'Новый сотрудник',
      isRead: true,
    },
    // {
    //   id: 4,
    //   note: 'Новый сотрудник',
    //   isRead: false,
    // },
    // {
    //   id: 5,
    //   note: 'Новый сотрудник',
    //   isRead: false,
    // },
    // {
    //   id: 6,
    //   note: 'Новый сотрудник',
    //   isRead: false,
    // },
    // {
    //   id: 7,
    //   note: 'Новый сотрудник',
    //   isRead: true,
    // },
    // {
    //   id: 8,
    //   note: 'Новый сотрудник',
    //   isRead: false,
    // },
    // {
    //   id: 9,
    //   note: 'Новый сотрудник',
    //   isRead: false,
    // },
    // {
    //   id: 10,
    //   note: 'Новый сотрудник',
    //   isRead: false,
    // },
  ];

  const isRead = notifications.filter((item) => item.isRead === false).map((notif) => notif.isRead); //создание массива непрочитанных уведомлений, для определения их количества

  /**Функционал выпадающего меню пользователя: */
  const [isOpen, setOpen] = useState(false);
  const handleOpen = (): void => setOpen(!isOpen);

  /**Массив пунктов выпадающего меню пользователя: */
  const itemsAdmin = [ // пункты меню в случае администратора
    {
      name: 'Администратор',
      link: ROUTE_CONSTANTS.ADMIN,
    },
    {
      name: 'Выход',
      link: ROUTE_CONSTANTS.SIGN_IN,
    }
  ];

  const itemsUser = [ // пункты меню в случае простого пользователя
    {
      name: 'Выход',
      link: ROUTE_CONSTANTS.SIGN_IN,
    }
  ];

  /** Проверка пользователя на права администратора, для рендеринга сообветствующего меню пользователя*/
  let items;

  if (user.isAdmin === true) {
    items = itemsAdmin;
  } else items = itemsUser;

  return (
    <header className="user-header">
      <NavLink className="user-header__link" to={ROUTE_CONSTANTS.SIGN_IN}>
        <img className="user-header__logo" src={logo} alt="user-header-logo" />
      </NavLink>
      <nav className='user-header__icons'>
        <NavLink className="user-header__link" to={'#'}>
          <img className="user-header__user-icon user-header__user-icon_chat" src={chatIcon} alt="chat-icon" />
        </NavLink>
        <NavLink className="user-header__link" to={'#'}>
          <img className="user-header__user-icon user-header__user-icon_bell" src={bellIcon} alt="bell-icon" />
          {
            isRead.length > 0 &&
            (<p className="user-header__notifications">{isRead.length}</p>)
          }
        </NavLink>
        <NavLink className="user-header__link" to={'#'}>
          <img onClick={handleOpen} className="user-header__user-icon user-header__user-icon_user" src={userIcon} alt="user-icon" />
          {
            isOpen && (<ul className="user-menu">
              {items.map((item, i) => (
                <li key={i}><NavLink to={item.link}>{item.name}</NavLink></li>
              ))}
            </ul>)
          }
        </NavLink>
      </nav>
    </header>
  )
}
