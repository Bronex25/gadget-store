import React from 'react';
import styles from './ShopCard.module.scss';
import { bodyText, heading2 } from '../../styles/typography.module.scss';
import cn from 'classnames';
import { useAppDispatch } from '../../app/hooks';
import {
  addToCard,
  deleteFromCart,
  reduceQuantity,
} from '../../features/actionButtonsSlice';
import { Link } from 'react-router-dom';

type Props = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
};

export const ShopCard: React.FC<Props> = ({
  id,
  name,
  price,
  image,
  quantity,
  category,
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
      <Link to={`/${category}/${id}`} className={styles.containerWithImage}>
        <button className={styles.deleteButton} onClick={handleDelete}></button>
        <div className={styles.imageContainer}>
          <img src={image} alt="item image" className={styles.image} />
        </div>
        <p className={bodyText}>{name}</p>
      </Link>

      <div className={styles.containerWithPrice}>
        <div className={styles.quantityContainer}>
          <button
            className={styles.minus}
            disabled={quantity <= 1}
            onClick={handleDecrement}
          ></button>
          <p className={cn(bodyText, styles.quantity)}>{quantity}</p>
          <button className={styles.plus} onClick={handleIncrement}></button>
        </div>

        <h2 className={cn(heading2, styles.price)}>{`$${price}`}</h2>
      </div>
    </div>
  );
};
