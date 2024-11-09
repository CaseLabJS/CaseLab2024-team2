import type { ReactElement } from 'react';

import styles from './footer.module.css';

export const Footer = (): ReactElement => {

  return (
    <footer className={styles.userFooter}>
      <p className={styles.userFooter__text}>ГДО | гринатом документооборот</p>
    </footer>
  )
}
