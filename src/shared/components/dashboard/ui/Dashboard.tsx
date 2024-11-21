import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { Link, ListItemIcon, ListItemText} from '@mui/material';
import DraftsIcon from '@mui/icons-material/Drafts';
import WorkIcon from '@mui/icons-material/Work';
import SendIcon from '@mui/icons-material/Send';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import {userContext} from '@/shared/contexts/userContext'
import { ROUTE_CONSTANTS } from '@/app/providers/router/config/constants';
import { authStore } from '@/entities/auth';

export default function Dashboard(): React.ReactElement {

  const {name, email} = React.useContext(userContext)

   /**Массив пунктов выпадающего меню пользователя: */
   const itemsAdmin = [
    // пункты меню в случае администратора
    {
      name: 'Профиль',
      link: ROUTE_CONSTANTS.ADMIN.path,
      icon: <AccountCircleIcon fontSize="small" />,
    },
    {
      name: 'Admin menu',
      link: ROUTE_CONSTANTS.ADMIN.path,
      icon: <ErrorOutlineIcon fontSize="small" />,
    },
  ];

  const itemsUser = [
    // пункты меню в случае простого пользователя
    {
      name: 'Профиль',
      link: ROUTE_CONSTANTS.USER.path,
      icon: <AccountCircleIcon fontSize="small" />,
    },
  ];

  /** Проверка пользователя на права администратора, для рендеринга сообветствующего меню пользователя*/
  let menuForUser;

  if (authStore.isAdminStatus) {
    menuForUser = itemsAdmin;
  } else menuForUser = itemsUser;

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent):void => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Stack direction="row" spacing={2} sx={{display: 'flex', justifyContent: 'center'}}>
      <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <AccountCircleOutlinedIcon/>
        </Button>
        <Popper
          open={open}
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
                    <MenuItem>
                      <ListItemIcon>
                        <WorkIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>
                        <ListItemText>{name}</ListItemText>
                        <ListItemText>{email}</ListItemText>
                      </ListItemText>
                    </MenuItem>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    {menuForUser.map((item) => (
                      <MenuItem>
                        <ListItemIcon>
                          {item.icon}
                        </ListItemIcon>
                        <Link href={item.link} underline="none">{item.name}</Link>
                      </MenuItem>

                    ))}
                      <MenuItem>
                        <ListItemIcon>
                          <ExitToAppIcon/>
                        </ListItemIcon>
                        <Link
                          component="button"
                          variant="body2"
                          underline="none"
                          onClick={() => {
                            authStore.logout();
                          }}
                        >
                          Sign out
                        </Link>
                      </MenuItem>
                  </MenuList>
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
