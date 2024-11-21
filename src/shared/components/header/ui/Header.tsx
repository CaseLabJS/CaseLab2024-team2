import type { ReactElement } from 'react';

import { ROUTE_CONSTANTS } from '@/app/providers/router/config/constants';
import { authStore } from '@/entities/auth/model/store/authStore';
import Dashboard from '@/shared/components/dashboard/ui/Dashboard';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { IconButton } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import logo from './images/logo.svg';

import styles from './header.module.css';

export const Header = observer((): ReactElement => {

  useEffect(() => {
    authStore.processAuthResponse().catch(() => alert('Ошибка'));
  })

  /**Пример уведомлений - должно приходить с backend (для разработки) */
  const notifications = [
    // уведомления
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

  /**Функционал выпадающего меню уведомлений */
  const [isOpenNotes, setOpenNotes] = useState(false);
  const handleOpenNotes = (): void => {
    setOpenNotes(!isOpenNotes);
  }; // меню выпадает и исчезает по клику на иконку bell
  // const closeNote = (): void => {
  //   // меню исчезает если открывают другое меню
  //   if (isOpenNotes === true) {
  //     handleOpenNotes();
  //   }
  // };

  /**Функционал клика по уведомлениям */
  // положить данные в localStorage:
  const toLocalStorage = (data: { id: number; note: string; content: string; isRead: boolean }[]): void => {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
  };

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
  }, []);

  //обновление localStorage и статуса прочтения уведомления
  const readEl = (id: number): void => {
    const noteIndex = localNotifications.findIndex((note) => note.id === id);
    const updataNote = { ...localNotifications[noteIndex] }; // получение копии нужного уведомления
    updataNote.isRead = true; // Обновление статуса уведомления
    setLocalNotifications((localNotifications) => {
      const modifiedData = [...localNotifications];
      modifiedData[noteIndex] = updataNote;
      toLocalStorage(modifiedData);
      return modifiedData;
    });
  };

  const isRead = localNotifications.filter((item) => item.isRead === false).map((notif) => notif.isRead); //создание массива непрочитанных уведомлений, для определения их количества

  // /**Массив пунктов выпадающего меню пользователя: */
  // const itemsAdmin = [
  //   // пункты меню в случае администратора
  //   {
  //     name: 'Профиль',
  //     link: ROUTE_CONSTANTS.ADMIN.path,
  //   },
  //   {
  //     name: 'Admin menu',
  //     link: ROUTE_CONSTANTS.ADMIN.path,
  //   },
  // ];

  // const itemsUser = [
  //   // пункты меню в случае простого пользователя
  //   {
  //     name: 'Профиль',
  //     link: ROUTE_CONSTANTS.USER.path,
  //   },
  // ];

  // /** Проверка пользователя на права администратора, для рендеринга сообветствующего меню пользователя*/
  // let menuForUser;

  // if (authStore.isAdminStatus) {
  //   menuForUser = itemsAdmin;
  // } else menuForUser = itemsUser;

  return (
    <header className={styles.header}>
      <div className={styles.userHeader}>
        <NavLink className={styles.userHeader__link} to={ROUTE_CONSTANTS.ROOT.path}>
          <img className={styles.userHeader__logo} src={logo} alt="userHeaderLogo" />
        </NavLink>
        <nav className={styles.userHeader__icons}>
          <div>
            <IconButton
              onClick={() => {
                handleOpenNotes();
                // closeNote();
              }}
            >
              <NotificationsNoneIcon />
              {isRead.length > 0 && <p className={styles.userHeader__notifications}>{isRead.length}</p>}
            </IconButton>
            {isOpenNotes && (
              <ul className={styles.userNotes}>
                {localNotifications.map((item) => (
                  <li
                    onClick={(event) => {
                      event.stopPropagation();
                      readEl(Number(event.currentTarget.getAttribute('data-id')));
                    }}
                    data-id={item.id}
                    key={item.id}
                    style={{ fontWeight: item.isRead === false ? 'bold' : 'normal' }}
                  >
                    {item.note}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Dashboard />
        </nav>
      </div>
    </header>
  );
}
);
