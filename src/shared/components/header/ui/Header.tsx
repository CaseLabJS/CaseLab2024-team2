import type { ReactElement } from "react";

import { ROUTE_CONSTANTS } from '@/app/providers/router/config/constants';
import { authStore } from '@/entities/auth/model/store';
import { devCheckIsAdmin } from "@/shared/utils/dev/dev-utils";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import styles from './header.module.css';
import logo from './images/logo.svg';

export const Header = (): ReactElement => {
  /**Пример данных о пользователе - должно приходить с backend (для разработки) */
  const user = { //инфо из стор, обсервебл header
    id: 1,
    userName: 'Сергей Орлов',
    email: 'orel-dev@inbox.com',
    isAdmin: true,
  }

  /**Пример уведомлений - должно приходить с backend (для разработки) */
  const notifications = [ // уведомления
    {
      id: 1,
      note: 'Уведомление',
      content: 'Все будет хорошо!',
      isRead: false,
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

  /**Функционал выпадающего меню пользователя: */
  const [isOpenMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = (): void => { setOpenMenu(!isOpenMenu); } // меню выпадает и исчезает по клику на иконку user
  const closeMenu = (): void => { // меню исчезает если открывают другое меню
    if (isOpenMenu === true) {
      handleOpenMenu();
    }
  }

  /**Функционал выпадающего меню уведомлений */
  const [isOpenNotes, setOpenNotes] = useState(false);
  const handleOpenNotes = (): void => {
    setOpenNotes(!isOpenNotes)
  }; // меню выпадает и исчезает по клику на иконку bell
  const closeNote = (): void => { // меню исчезает если открывают другое меню
    if (isOpenNotes === true) {
      handleOpenNotes();
    }
  }

  /**Функционал клика по уведомлениям */
  // положить данные в localStorage:
  const toLocalStorage = (data: { id: number; note: string; content: string; isRead: boolean; }[]): void => {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
  }

  //TODO сделать чтобы при клике по уведомлению появлялся текст уведомления и исчезал при повторном клике
  //TODO сделать чтобы после обновления страницы, статус прочитанных сообщений не обновлялся
  const localStorageKey: string = 'notifications';
  const read = [...notifications];
  toLocalStorage(read);

  const [localNotifications, setLocalNotifications] = useState(read);
  // Получение данных из localStorage
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setLocalNotifications(JSON.parse(localStorage.getItem(localStorageKey) || '[]'));
  }, [])

  //обновление localStorage и статуса прочтения уведомления
  const readEl = (id: number): void => {
    const noteIndex = localNotifications.findIndex(note => note.id === id);
    const updataNote = { ...localNotifications[noteIndex] } // получение копии нужного уведомления
    updataNote.isRead = true; // Обновление статуса уведомления
    setLocalNotifications((localNotifications) => {
      const modifiedData = [...localNotifications];
      modifiedData[noteIndex] = updataNote;
      toLocalStorage(modifiedData);
      return modifiedData;
    })
  }

  const isRead = localNotifications.filter((item) => item.isRead === false).map((notif) => notif.isRead); //создание массива непрочитанных уведомлений, для определения их количества

  /**Массив пунктов выпадающего меню пользователя: */
  const itemsAdmin = [ // пункты меню в случае администратора
    {
      name: 'Профиль',
      link: ROUTE_CONSTANTS.ADMIN.path,
    },
    {
      name: 'Admin menu',
      link: ROUTE_CONSTANTS.ADMIN.path,
    },
  ];

  const itemsUser = [ // пункты меню в случае простого пользователя
    {
      name: 'Профиль',
      link: ROUTE_CONSTANTS.SIGN_IN.path,
    }
  ];

  /** Проверка пользователя на права администратора, для рендеринга сообветствующего меню пользователя*/
  let menuForUser;

  if (devCheckIsAdmin()) {
    menuForUser = itemsAdmin;
  } else menuForUser = itemsUser;

  return (
    <header className={styles.header}>
      <div className={styles.userHeader}>
        <NavLink className={styles.userHeader__link} to={ROUTE_CONSTANTS.ROOT.path}>
          <img className={styles.userHeader__logo} src={logo} alt="userHeaderLogo" />
        </NavLink>
        <nav className={styles.userHeader__icons}>
          <div>
            <IconButton onClick={() => { handleOpenNotes(); closeMenu() }}>
              <NotificationsNoneIcon />
              {
                isRead.length > 0 &&
                (<p className={styles.userHeader__notifications}>{isRead.length}</p>)
              }
            </IconButton>
            {
              isOpenNotes && (<ul className={styles.userNotes}>
                {localNotifications.map((item) => (
                  <li onClick={(event) => {
                    event.stopPropagation();
                    readEl(Number(event.currentTarget.getAttribute('data-id')));
                  }} data-id={item.id} key={item.id} style={{ fontWeight: item.isRead === false ? 'bold' : 'normal' }} >{item.note}
                  </li>
                ))}
              </ul>)
            }
          </div>
          <div>
            <IconButton onClick={(e) => { if (e.target === e.currentTarget.firstChild) { handleOpenMenu(); closeNote(); console.log('click') } }} aria-label="account" size="large">
              <AccountCircleOutlinedIcon />
            </IconButton>
            {
              isOpenMenu && <div className={styles.userMenu}>
                <div className={styles.userMenu__user}>
                  <p className={styles.userMenu__user_name}>{user.userName}</p>
                  <p className={styles.userMenu__user_email}>{user.email}</p>
                </div>
                <ul>
                  {menuForUser.map((item, i) => (
                    <li key={i}><NavLink to={item.link}>{item.name}</NavLink></li>
                  ))}
                </ul>
                <button className={styles.userHeader__button_menu} onClick={() => { authStore.logout() }}>Sign out</button>
              </div>
            }
          </div>
        </nav>
      </div>
    </header>
  )
}
