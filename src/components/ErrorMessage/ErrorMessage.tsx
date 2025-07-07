import React from 'react';
import styles from './ErrorMessage.module.scss';

export const ErrorMessage: React.FC = () => {
  return (
    <div className={styles.errorMessage}>
      <img src="./img/errorMessage.png" alt="" />
    </div>
  );
};
