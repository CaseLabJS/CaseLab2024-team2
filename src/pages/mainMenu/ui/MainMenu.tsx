import { PlayArrow } from '@mui/icons-material';
import { Box, Grid, Icon, Paper, Typography } from '@mui/material';
import { useEffect, useState, type ReactElement } from 'react';
import { Link } from 'react-router-dom';

import ctrl from '../img/ctrl.svg';
import git from '../img/git.svg';
import int from '../img/int.svg';
import logo from '../img/Logo.svg';
import mainImage from '../img/mainimg.webp';
import sec from '../img/sec.svg';
import time from '../img/time.svg';

import styles from './mainMenu.module.css';

const GridExample = (): ReactElement => {
  const cells = [
    ['Управление документами ', ctrl],
    ['Отслеживание изменений', time],
    ['Интеграция', int],
    ['Безопасность данных', sec],
  ];

  return (
    <Grid container spacing={0} sx={{ marginBottom: '20px' }}>
      {cells.map((cell, index) => (
        <Grid
          item
          key={index}
          sx={{
            width: '100%',
            maxWidth: 448,
            height: 110,
            mt: '20px',
            mr: '30px',
            boxSizing: 'border-box',
          }}
        >
          <Paper elevation={0} sx={{ height: '100%', display: 'flex', alignItems: 'center', marginLeft: '56px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: 30 }}>
              <img src={cell[1]} alt={cell[0]} style={{ width: '82px', height: '82px' }} />
              <Typography
                variant="h4"
                sx={{
                  background: 'linear-gradient(160deg, rgba(0,86,179,1) 0%, rgba(60,60,60,1) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {cell[0]}
              </Typography>
            </div>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

const LoginButton = (): ReactElement => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Link
      to={'/signin'}
      className={styles.mainBlock__button}
      style={{
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
      }}
    >
      <Icon>
        <PlayArrow />
      </Icon>
      <span>{isLoggedIn ? 'Перейти в профиль' : 'Авторизоваться'}</span>
    </Link>
  );
};

const MainMenu = (): ReactElement => {
  return (
    <div className={styles.mainMenu}>
      <header className={styles.headerBlock}>
        <Box src={logo} component="img" alt="logo" sx={{ width: '66px', height: '66px', margin: '8px auto' }} />
      </header>
      <main className={styles.mainBlock}>
        <img src={mainImage} alt="mainImage" className={styles.mainBlock__img} />
        <Typography sx={{ mb: '10px' }} align="center" variant="h4" component="h1">
          Управляйте документами эффективно и безопасно
        </Typography>
        <Typography
          sx={{
            background: 'linear-gradient(178deg, rgba(0,86,179,1) 40%, rgba(178,176,176,1) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center',
            mb: '70px',
          }}
          align="center"
          variant="h5"
          component="h2"
        >
          Современная система документооборота для вашего бизнеса
        </Typography>
        <GridExample />
        <div className={styles.mainBlock__infoBlock}>
          <Typography
            variant="h5"
            component="p"
            color="White"
            fontWeight="light"
            textAlign="justify"
            sx={{
              textDecoration: 'underline dotted',
              textDecorationColor: '#989898',
              textDecorationThickness: '6%',
              textUnderlineOffset: '9.5%',
            }}
          >
            Наша система позволяет сэкономить время и повысить эффективность работы c документами. Мы предлагаем
            надежную защиту данных, интуитивно понятный интерфейс и быстрое подключение к существующим бизнес-процессам.
          </Typography>
        </div>
        <LoginButton />
      </main>
      <footer className={styles.footerBlock}>
        <Typography
          color="White"
          style={{ margin: 'auto', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}
        >
          <b>ГДО</b> | <b style={{ fontWeight: 'lighter' }}>ГРИНАТОМ ДОКУМЕНТООБОРОТ</b>
        </Typography>
        <Typography sx={{ margin: '6px 20px 6px auto' }} variant="body1">
          <a
            className={styles.linkToProject}
            href="https://github.com/CaseLabJS/CaseLab2024-team2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={git} alt="gitIcon" style={{ width: '31px', height: 'auto' }} />
            Наш проект
          </a>
        </Typography>
      </footer>
    </div>
  );
};

export default MainMenu;
