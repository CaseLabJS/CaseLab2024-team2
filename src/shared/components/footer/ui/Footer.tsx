import type { ReactElement } from 'react';

import styles from './footer.module.css';

export const Footer = (): ReactElement => {

  return (
    <footer className={styles.footer}>
      <div className={styles.userFooter}>
        <p className={styles.userFooter__text}>ГДО | гринатом документооборот</p>
      </div>
    </footer>
  )
}
