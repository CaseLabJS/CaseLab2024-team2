import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MailIcon from '@mui/icons-material/Mail';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Collapse from '@mui/material/Collapse';
import Grow from '@mui/material/Grow';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import * as React from 'react';

import styles from './notifications.module.css';

export default function NotificatoinsBadge(): React.ReactElement {

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
  // const [isOpenNotes, setOpenNotes] = React.useState(false);
  // const handleOpenNotes = (): void => {
  //   setOpenNotes(!isOpenNotes);
  // }; // меню выпадает и исчезает по клику на иконку bell
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

  const localStorageKey: string = 'notifications';
  const read = [...notifications];
  toLocalStorage(read);

  const [localNotifications, setLocalNotifications] = React.useState(read);
  // Получение данных из localStorage
  React.useEffect(() => {
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

  //**Функционал MUI */

  const [hasOpen, setOpenB] = React.useState(true);

  const handleClick = (): void => {
    setOpenB(!hasOpen);
  };

  const [isOpen, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = (): void => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent): void => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent): void {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(isOpen);
  React.useEffect(() => {
    if (prevOpen.current === true && isOpen === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = isOpen;
  }, [isOpen]);

  return (
    <Stack direction="row" spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
      <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={isOpen ? 'composition-menu' : undefined}
          aria-expanded={isOpen ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <Badge badgeContent={isRead.length} color="primary">
            <MailIcon color="action" />
          </Badge>
        </Button>
        <Popper
          open={isOpen}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <div>
                    <List
                      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                      component="nav"
                      aria-labelledby="nested-list-subheader"
                    >
                      {localNotifications.map((item) => (
                        <>
                          <ListItemButton
                            onClick={(event) => {
                              event.stopPropagation();
                              handleClick();
                              readEl(Number(event.currentTarget.getAttribute('data-id')));
                            }}
                            onKeyDown={handleListKeyDown}
                            data-id={item.id}
                            key={item.id}
                          >
                            {/* <ListItemIcon>
                            <InboxIcon />
                          </ListItemIcon> */}
                            <ListItemText primary={item.note}
                              className={(!item.isRead) && styles.notifications__note}
                            // style={{ fontWeight: item.isRead === false ? 'bold' : 'normal' }}
                            />
                            {hasOpen ? <ExpandLess /> : <ExpandMore />}
                          </ListItemButton>
                          <Collapse in={hasOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                              <ListItemButton sx={{ pl: 4 }}>
                                {/* <ListItemIcon>
                                <StarBorder />
                              </ListItemIcon> */}
                                <ListItemText primary={item.content} />
                              </ListItemButton>
                            </List>
                          </Collapse>
                        </>
                      )
                      )}
                    </List>
                  </div>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
}
