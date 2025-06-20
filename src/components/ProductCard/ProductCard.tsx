import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import styles from './ProductCard.module.scss';
import { ActionButtons } from '../ActionButtons';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <article className={styles.card}>
      <Link
        to={`${product.category}/${product.itemId}`}
        className={styles.cardLink}
      >
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
          <span>Screen</span>
          <span>Capacity</span>
          <span>RAM</span>
        </div>

        <div className={styles.specsValues}>
          <span className={styles.specsValue}>{product.screen}</span>
          <span className={styles.specsValue}>{product.capacity}</span>
          <span className={styles.specsValue}>{product.ram}</span>
        </div>
      </div>

      <ActionButtons productId={product.itemId} />
    </article>
  );
};
