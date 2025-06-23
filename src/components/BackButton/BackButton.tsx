import React from 'react';
import styles from './BackButton.module.scss';
import { useNavigate } from 'react-router-dom';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();
  const handleClickBack = () => navigate(-1);
  return (
    <button className={styles.backButton} onClick={handleClickBack}>
      Back
    </button>
  );
};
