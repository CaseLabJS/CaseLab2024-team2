import { authStore } from '@/entities/auth';
import Logout from '@/shared/components/logout/ui/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import WorkIcon from '@mui/icons-material/Work';
import { Link, ListItemIcon, ListItemText } from '@mui/material';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import * as React from 'react';

export default function Dashboard(): React.ReactElement {
  const itemsUser = [
    // пункты меню в случае простого пользователя
    {
      name: 'Профиль',
      link: `/profile`,
      icon: <AccountCircleIcon fontSize="small" />,
    },
  ];

  /**Функционал MUI */

  const [isOpen, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = (): void => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent): void => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
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

  if (authStore.isAdmin) {
    return <Logout />;
  } else
    return (
      <Stack direction="row" spacing={2} sx={{ display: 'flex', justifyContent: 'center', zIndex: '100' }}>
        <div>
          <Button
            ref={anchorRef}
            id="composition-button"
            aria-controls={isOpen ? 'composition-menu' : undefined}
            aria-expanded={isOpen ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <AccountCircleOutlinedIcon />
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
                  transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
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
                          <ListItemText>{authStore.displayName}</ListItemText>
                          <ListItemText>{authStore.email}</ListItemText>
                        </ListItemText>
                      </MenuItem>
                      <MenuList
                        autoFocusItem={isOpen}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDown}
                      >
                        {itemsUser.map((item, i) => (
                          <MenuItem key={i}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <Link href={item.link} underline="none">
                              {item.name}
                            </Link>
                          </MenuItem>
                        ))}
                        <MenuItem>
                          <Logout />
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
