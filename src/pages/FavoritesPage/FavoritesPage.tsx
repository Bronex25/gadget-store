import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { ProductCard } from '../../components/ProductCard';
import styles from './FavoritesPage.module.scss';
import {
  bodyText,
  heading1,
  heading2,
} from '../../styles/typography.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import cn from 'classnames';

export const FavoritesPage: React.FC = () => {
  const favoriteProductIds = useAppSelector(
    state => state.productCard.favoritesItems,
  );
  const products = useAppSelector(state => state.products.products);

  const favoriteProducts = products.filter(product =>
    favoriteProductIds.includes(product.itemId),
  );

  return (
    <div className={styles.favoritesPage}>
      <Breadcrumbs />

      <div>
        <h1 className={heading1}>Favorites</h1>
        <span
          className={cn(bodyText, styles.items)}
        >{`${favoriteProductIds.length} models`}</span>
      </div>

      {favoriteProductIds.length === 0 ? (
        <h2 className={heading2}>No favorites yet</h2>
      ) : (
        <div className={styles.itemList}>
          {favoriteProducts.map(item => (
            <ProductCard product={item} key={item.id} />
          ))}
        </div>
      )}
    </div>
  );
};
