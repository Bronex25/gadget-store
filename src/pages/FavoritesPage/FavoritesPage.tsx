import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { ProductCard } from '../../components/ProductCard';
import styles from './FavoritesPage.module.scss';
import typography from '../../styles/typography.module.scss';
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
        <h1 className={typography.heading1}>Favorites</h1>
        <span
          className={cn(typography.bodyText, styles.items)}
        >{`${favoriteProductIds.length} models`}</span>
      </div>

      <div className={styles.itemList}>
        {favoriteProducts.map(item => (
          <ProductCard product={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};
