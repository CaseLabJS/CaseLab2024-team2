import type { ReactElement } from "react";

import { useState } from "react";
import { NavLink } from "react-router-dom";

import styles from './header.module.css';
import { ROUTE_CONSTANTS } from '../../../../app/providers/router/config/constants';
import bellIcon from './images/bell.svg';
import logo from './images/logo.svg';
import chatIcon from './images/messenger.svg';
import userIcon from './images/user.svg';

export const Header = (): ReactElement => {

  /**Пример данных о пользователе - должно приходить с backend (для разработки) */
  const user = { //инфо из стор, обсервебл header
    id: 1,
    email: 'user@mail.ru',
    isAdmin: true,
  }

  /**Пример уведомлений - должно приходить с backend (для разработки) */
  const notifications = [ // уведомления
    {
      id: 1,
      note: 'Уведомление',
      content: 'Все будет хорошо!',
      isRead: true,
    },
    {
      id: 2,
      note: 'Голосование',
      content: 'Пройдите в кабинет №112',
      isRead: false,
    },
    {
      id: 3,
      note: 'Новый сотрудник',
      content: 'Теперь Иосиф Виссарионович с нами',
      isRead: false,
    },
    {
      id: 4,
      note: 'Анекдот',
      content: 'Не могу пройти мимо безобразия. Так и хочется принять участие!',
      isRead: false,
    },
  ];

  const isRead = notifications.filter((item) => item.isRead === false).map((notif) => notif.isRead); //создание массива непрочитанных уведомлений, для определения их количества

  /**Функционал выпадающего меню пользователя: */
  const [isOpenMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = (): void => setOpenMenu(!isOpenMenu); // меню выпадает и исчезает по клику на иконку user

  /**Функционал выпадающего меню уведомлений */
  const [isOpenNotes, setOpenNotes] = useState(false);
  const handleOpenNotes = (): void => setOpenNotes(!isOpenNotes); // меню выпадает и исчезает по клику на иконку bell

  /**Функционал клика по уведомлениям */
  //TODOсделать чтобы при клике по уведомлению появлялся текст уведомления, а само уведомление становилось причитанным, т.е. не жирным и изменялось количество непрочитанных сообщений у колокольчика
  // const noteIsRead = (note:any, event:any): ReactElement => {
  //   const notification = note.content;
  //   const tegP = <p>{notification}</p>;
  //   const noteEl = event.target.child(tegP);
  //   return (
  //     noteEl
  //   )
  // }

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
    <header className={styles.userHeader}>
      <NavLink className={styles.userHeader__link} to={ROUTE_CONSTANTS.SIGN_IN}>
        <img className={styles.userHeader__logo} src={logo} alt="userHeaderLogo" />
      </NavLink>
      <nav className={styles.userHeader__icons}>
        <button className={styles.userHeader__button}>
          <img className={`${styles.userHeader__userIcon} ${styles.userHeader__userIconChat}`} src={chatIcon} alt="chatIcon" />
        </button>
        <button className={styles.userHeader__button}>
          <img onClick={handleOpenNotes} className={`${styles.userHeader__userIcon} ${styles.userHeader__userIconBell}`} src={bellIcon} alt="bellIcon" />
          {
            isRead.length > 0 &&
            (<p className={styles.userHeader__notifications}>{isRead.length}</p>)
          }
          {
            isOpenNotes && (<ul className={styles.userNotes}>
              {notifications.map((item, i) => (
                <li key={i} style={{ fontWeight: item.isRead === false ? 'bold' : 'normal' }} >{item.note}</li>
              ))}
            </ul>)
          }
        </button>
        <button className={styles.userHeader__button}>
          <img onClick={handleOpenMenu} className={`${styles.userHeader__userIcon} ${styles.userHeader__userIcon_user}`} src={userIcon} alt="userIcon" />
          {
            isOpenMenu && (<ul className={styles.userMenu}>
              {items.map((item, i) => (
                <li key={i}><NavLink to={item.link}>{item.name}</NavLink></li>
              ))}
            </ul>)
          }
        </button>
      </nav>
    </header>
  )
}
