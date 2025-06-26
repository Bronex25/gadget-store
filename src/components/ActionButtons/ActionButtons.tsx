import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addToCard,
  deleteFromCart,
  toggleFavorites,
} from '../../features/actionButtonsSlice';
import cn from 'classnames';
import styles from './ActionButtons.module.scss';

type Props = {
  productId: string;
};

export const ActionButtons: React.FC<Props> = React.memo(({ productId }) => {
  const { favoritesItems, cartItems } = useAppSelector(
    state => state.productCard,
  );

  const containFavoriteItem = favoritesItems.some(id => id === productId);

  const containCartItem = cartItems.some(item => item.itemId === productId);

  const dispatch = useAppDispatch();

  const toggleAddButton = () => {
    return containCartItem
      ? dispatch(deleteFromCart(productId))
      : dispatch(addToCard({ itemId: productId, quantity: 1 }));
  };

  const handleToggleFavorites = () => {
    dispatch(toggleFavorites(productId));
  };

  return (
    <div className={styles.actionButtons}>
      <button
        className={cn(styles.addButton, {
          [styles.addButtonActive]: containCartItem,
        })}
        onClick={toggleAddButton}
      >
        {containCartItem ? 'Selected' : 'Add to cart'}
      </button>
      <button
        className={cn(styles.favoriteButton, {
          [styles.favoriteButtonActive]: containFavoriteItem,
        })}
        onClick={handleToggleFavorites}
        aria-label="Toggle Favorite"
      ></button>
    </div>
  );
});
