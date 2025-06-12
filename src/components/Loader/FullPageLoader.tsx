import React from 'react';
import styles from './FullPageLoader.module.scss';

export const FullPageLoader: React.FC = () => {
  return (
    <div className={styles.loaderOverlay}>
      <div className={styles.loader}>
        <img
          src="/img/logo.png"
          alt="Gadget Store Logo"
          className={styles.logo}
        />
        <div className={styles.spinner}></div>
      </div>
    </div>
  );
};

export default FullPageLoader;
