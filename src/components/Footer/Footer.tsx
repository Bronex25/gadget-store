import styles from './Footer.module.scss';
import React from 'react';

export const Footer: React.FC = () => {
  const handleScrollTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <img src="./img/logo.svg" alt="logo" className={styles.logoImage} />
      </div>

      <div className={styles.linksWrapper}>
        <a href="https://github.com/Bronex25" className={styles.link}>
          Github
        </a>
        <a
          href="https://www.linkedin.com/in/oleksandr-plaksin-073262282/"
          className={styles.link}
        >
          Contacts
        </a>
        <a href="https://github.com/Bronex25" className={styles.link}>
          Rights
        </a>
      </div>

      <div className={styles.buttonContainer}>
        <p className={styles.buttonText}>Back to top</p>

        <button className={styles.button} onClick={handleScrollTop}></button>
      </div>
    </footer>
  );
};
