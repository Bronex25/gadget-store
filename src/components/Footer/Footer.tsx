import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer className={styles['footer']}>
        <div className={styles['footer__logo']}>
          <img src="/img/logo.png" alt="logo" className={styles['footer__logo-image']} />
        </div>

        <div className={styles['footer__links']}>
          <a href="#" className={styles['footer__link']}>Github</a>
          <a href="#" className={styles['footer__link']}>Contacts</a>
          <a href="#" className={styles['footer__link']}>Rights</a>
        </div>

        <div className={styles['footer__button-container']}>
          <p className={styles['footer__button-name']}>Back to top</p>

          <button className={styles['footer__button']}>
            <img 
              src="/img/arrow-up.png" 
              alt="up" 
              className={styles['footer__button-image']} 
            />
          </button>
        </div>
    </footer>
  );
}