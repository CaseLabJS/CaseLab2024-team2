import type { ReactElement } from "react";

import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { ROUTE_CONSTANTS } from '../../../../app/providers/router/config/constants';
import styles from './header.module.css';
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
  const handleOpenMenu = (): void => setOpenMenu(!isOpenMenu); // меню выпадает и исчезает по клику на иконку user
  const closeMenu = (): void => { // меню исчезает если открывают другое меню
    if (isOpenMenu === true) {
      handleOpenMenu();
    }
  }

  /**Функционал выпадающего меню уведомлений */
  const [isOpenNotes, setOpenNotes] = useState(false);
  const handleOpenNotes = (): void => setOpenNotes(!isOpenNotes); // меню выпадает и исчезает по клику на иконку bell
  const closeNote = (): void => { // меню исчезает если открывают другое меню
    if (isOpenNotes === true) {
      handleOpenNotes();
    }
  }

  /**Функционал клика по уведомлениям */
    // положить данные в localStorage:
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const toLocalStorage = (data: []) => {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
  }

  //TODO сделать чтобы при клике по уведомлению появлялся текст уведомления и исчезал при повторном клике
  //TODO сделать чтобы после обновления страницы, статус прочитанных сообщений не обновлялся
  //TODO сделать чтобы данные добавлялись в localStorage
  const localStorageKey: string = 'notifications';
  let read = [...notifications];
  toLocalStorage(read);
 
  const [localNotifications, setLocalNotifications] = useState(read);// ***
    // Получение данных из localStorage ***
    useEffect(() => {
      setLocalNotifications(JSON.parse(localStorage.getItem(localStorageKey) || '[]'));
    }, [])

  //обновление localStorage и статуса прочтения уведомления***
  const readEl = (id: number): void => {
    const noteIndex = localNotifications.findIndex(note => note.id === id);
    let updataNote = {...localNotifications[noteIndex]} // получение копии нужного уведомления
    updataNote.isRead = true; // Обновление статуса уведомления
    // const modifiedData: [] = data.map((item) => {
    //   if (item.id === id) {
    //     return { ...item, isRead: true };
    //   } return item;
    // }) as [];
    setLocalNotifications((localNotifications) => {
      const modifiedData = [...localNotifications];
      modifiedData[noteIndex] = updataNote;
      toLocalStorage(modifiedData);
      return modifiedData;
    })
  }

  const isRead = localNotifications.filter((item) => item.isRead === false).map((notif) => notif.isRead); //создание массива непрочитанных уведомлений, для определения их количества

  // const [showNoteContent, setShowNoteContent] = useState(false);
  // const handleshowNoteContent = (): void => setShowNoteContent(!showNoteContent); // Содержание уведомления при клике появляется и исчезает
  // const showContent = (note, id:number):void => {

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
          <img onClick={() => { handleOpenNotes(); closeMenu() }} className={`${styles.userHeader__userIcon} ${styles.userHeader__userIconBell}`} src={bellIcon} alt="bellIcon" />
          {
            isRead.length > 0 &&
            (<p className={styles.userHeader__notifications}>{isRead.length}</p>)
          }
          {
            isOpenNotes && (<ul className={styles.userNotes}>
              {localNotifications.map((item) => (
                <li onClick={(event) => {
                  readEl(Number(event.currentTarget.getAttribute('data-id'))); console.log(event.currentTarget.getAttribute('data-id'));
                }} data-id={item.id} key={item.id} style={{ fontWeight: item.isRead === false ? 'bold' : 'normal' }} >{item.note}
                  {/* {
                    showNoteContent && (<p>{item.content}</p>)
                  } */}
                </li>
              ))}
            </ul>)
          }
        </button>
        <button className={styles.userHeader__button}>
          <img onClick={() => { handleOpenMenu(); closeNote() }} className={`${styles.userHeader__userIcon} ${styles.userHeader__userIcon_user}`} src={userIcon} alt="userIcon" />
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
