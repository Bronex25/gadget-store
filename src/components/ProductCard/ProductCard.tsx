import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addToCard, toggleFavorites } from '../../features/productCardSlice';
import { Product } from '../../types/Product';
import styles from './ProductCard.module.scss';
import cn from 'classnames';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const favoriteItems = useAppSelector(
    state => state.productCard.favoritesItems,
  );
  const containItem = favoriteItems.find(item => item.id === product.id);

  const dispatch = useAppDispatch();

  const addCard = (item: Product) => {
    dispatch(addToCard(item));
  };

  return (
    <article className={styles.card}>
      <Link to={`/phones/${product.itemId}`} className={styles.cardLink}>
        <img src={product.image} alt="Product" className={styles.image} />

        <span className={styles.title}>{product.name}</span>
      </Link>

      <div className={styles.priceContainer}>
        <h3 className={styles.price}>
          {product.price ? `$${product.price}` : `$${product.fullPrice}`}
        </h3>

        {product.price && (
          <h3 className={styles.oldPrice}>{`$${product.fullPrice}`}</h3>
        )}
      </div>

      <div className={styles.specs}>
        <div className={styles.specsTitles}>
          <span className={styles.specsTitle}>Screen</span>
          <span className={styles.specsTitle}>Capacity</span>
          <span className={styles.specsTitle}>RAM</span>
        </div>

        <div className={styles.specsValues}>
          <span>{product.screen}</span>
          <span>{product.capacity}</span>
          <span>{product.ram}</span>
        </div>
      </div>

      <div className={styles.controls}>
        <button className={styles.addButton} onClick={() => addCard(product)}>
          Add to cart
        </button>
        <button
          className={cn(styles.favoriteButton, {
            [styles.favoriteButttonActive]: containItem,
          })}
          onClick={() => dispatch(toggleFavorites(product))}
        ></button>
      </div>
    </article>
  );
};
