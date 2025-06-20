import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addToCard, toggleFavorites } from '../../features/productCardSlice';
import cn from 'classnames';
import styles from './ActionButtons.module.scss';

type Props = {
  productId: string;
};

export const ActionButtons: React.FC<Props> = React.memo(({ productId }) => {
  const favoriteItems = useAppSelector(
    state => state.productCard.favoritesItems,
  );

  const containItem = favoriteItems.find(id => id === productId);

  const dispatch = useAppDispatch();

  const addCard = () => {
    dispatch(addToCard(productId));
  };

  const handleToggleFavorites = () => {
    dispatch(toggleFavorites(productId));
  };

  return (
    <div className={styles.actionButtons}>
      <button className={styles.addButton} onClick={addCard}>
        Add to cart
      </button>
      <button
        className={cn(styles.favoriteButton, {
          [styles.favoriteButtonActive]: containItem,
        })}
        onClick={handleToggleFavorites}
      ></button>
    </div>
  );
});
