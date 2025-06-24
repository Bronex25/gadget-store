import React from 'react';
import styles from './ShopCard.module.scss';
import typography from '../../styles/typography.module.scss';
import { useAppDispatch } from '../../app/hooks';
import {
  addToCard,
  deleteFromCart,
  reduceQuantity,
} from '../../features/productCardSlice';

type Props = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export const ShopCard: React.FC<Props> = ({
  id,
  name,
  price,
  image,
  quantity,
}) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteFromCart(id));
  };

  const handleIncrement = () => {
    dispatch(addToCard({ itemId: id, quantity: 1 }));
  };

  const handleDecrement = () => {
    dispatch(reduceQuantity(id));
  };

  return (
    <div className={styles.shopCard}>
      <div className={styles.containerWithImage}>
        <button className={styles.deleteButton} onClick={handleDelete}></button>
        <div className={styles.imageContainer}>
          <img src={image} alt="item image" className={styles.image} />
        </div>
        <p className={typography.bodyText}>{name}</p>
      </div>

      <div className={styles.containerWithPrice}>
        <div className={styles.quantityContainer}>
          <button
            className={styles.minus}
            disabled={quantity <= 1}
            onClick={handleDecrement}
          ></button>
          <p className={typography.bodyText}>{quantity}</p>
          <button className={styles.plus} onClick={handleIncrement}></button>
        </div>

        <h2 className={typography.heading2}>{`$${price}`}</h2>
      </div>
    </div>
  );
};
