import type { ReactElement } from 'react';

import './footer.css';

export const Footer = (): ReactElement => {

  return (
    <footer className="user-footer">
      <nav className="user-footer__links">
        <a className="user-footer__link" href="#">Помощь</a>
        <a className="user-footer__link" href="#">Документация</a>
      </nav>
      <p className="user-footer__text">GREENATOM 2024</p>
    </footer>
  )
}
