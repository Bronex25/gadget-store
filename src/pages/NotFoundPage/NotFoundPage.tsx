import React from 'react';
import styles from './NotFoundPage.module.scss';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <main className={styles.notFoundPage}>
      <div className={styles.content}>
        <h1 className={styles.title}>Oops! Page not found</h1>
        <p className={styles.subtitle}>
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>

        <Link to="/" className={styles.homeLink}>
          Go back home
        </Link>
      </div>
    </main>
  );
};
