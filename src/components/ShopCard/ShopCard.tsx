import React from 'react';
import styles from './ShopCard.module.scss';
import typography from '../../styles/typography.module.scss';

type Props = {
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export const ShopCard: React.FC<Props> = ({ name, price, image, quantity }) => {
  return (
    <div className={styles.shopCard}>
      <div className={styles.container}>
        <button className={styles.deleteButton}></button>
        <img src={image} alt="item image" />
        <p className={typography.bodyText}>{name}</p>
      </div>

      <div className={styles.container}>
        <div>
          <button className={styles.minus}></button>
          <p className={typography.bodyText}>{quantity}</p>
          <button className={styles.plus}></button>
        </div>

        <h2 className={typography.heading2}>{`$${price}`}</h2>
      </div>
    </div>
  );
};
