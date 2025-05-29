import { NavLink } from 'react-router-dom';
import styles from './CategoryCard.module.scss';
import React from 'react';

type Props = {
  name: string;
  image: string;
  models: number;
};

export const CategoryCard: React.FC<Props> = ({ name, image, models }) => {
  const nameToUse = name.toLowerCase();
  return (
    <div className={styles['category']}>
      <NavLink className={styles['category__link']} to={`/${nameToUse}`}>
        <img
          src={image}
          alt={`/${nameToUse}`}
          className={styles['category__image']}
        />
      </NavLink>

      <h3 className={styles['category__title']}>{name}</h3>

      <span className={styles['category__models']}>{`${models} models`}</span>
    </div>
  );
};
