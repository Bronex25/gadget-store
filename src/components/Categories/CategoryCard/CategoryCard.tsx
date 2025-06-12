import { NavLink } from 'react-router-dom';
import styles from './CategoryCard.module.scss';
import React from 'react';
import cn from 'classnames';

type Props = {
  name: string;
  models: number;
};

export const CategoryCard: React.FC<Props> = ({ name, models }) => {
  const nameToUse = name.toLowerCase();

  const getClassName = () => {
    switch (nameToUse) {
      case 'phones':
        return cn(styles.categoryPhones, styles.categoryLink);
      case 'tablets':
        return cn(styles.categoryTablets, styles.categoryLink);
      case 'accessories':
        return cn(styles.categoryAccessories, styles.categoryLink);
      default:
        return styles.categoryLink;
    }
  };

  return (
    <div className={styles.category}>
      <NavLink className={getClassName} to={`/${nameToUse}`}></NavLink>

      <div className={styles.categoryText}>
        <h4 className={styles.categoryTitle}>{name}</h4>

        <span className={styles.categoryModels}>{`${models} models`}</span>
      </div>
    </div>
  );
};
