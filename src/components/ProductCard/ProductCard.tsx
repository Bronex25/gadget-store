import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import styles from './ProductCard.module.scss';
import cn from 'classnames';
import typography from '../../styles/typography.module.scss';
import { ActionButtons } from '../ActionButtons';
import { Specs } from '../Specs';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <article className={styles.card}>
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.cardLink}
      >
        <img src={product.image} alt="Product" className={styles.image} />

        <span className={styles.title}>{product.name}</span>
      </Link>

      <div className={styles.priceContainer}>
        <h3 className={typography.heading3}>
          {product.price ? `$${product.price}` : `$${product.fullPrice}`}
        </h3>

        {product.price && (
          <h3
            className={cn(styles.oldPrice, typography.heading3)}
          >{`$${product.fullPrice}`}</h3>
        )}
      </div>

      <Specs
        specs={{
          Screen: product.screen,
          Capacity: product.capacity,
          RAM: product.ram,
        }}
      />

      <ActionButtons productId={product.itemId} />
    </article>
  );
};
