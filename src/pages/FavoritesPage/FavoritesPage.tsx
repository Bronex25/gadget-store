import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { ProductCard } from '../../components/ProductCard';
import styles from '../ItemsPage/ItemsPage.module.scss';

export const FavoritesPage: React.FC = () => {
  const favoriteProductIds = useAppSelector(
    state => state.productCard.favoritesItems,
  );
  const products = useAppSelector(state => state.products.products);

  const favoriteProducts = products.filter(product =>
    favoriteProductIds.includes(product.itemId),
  );

  return (
    <div className={styles.mobilePage}>
      <div className={styles['route']}>
        <img
          src="public/img/home-icon.png"
          alt="home"
          className={styles['route__icon']}
        />
        <img
          src="/img/arrow-grey-right.png"
          alt="arrow"
          className={styles['route__icon']}
        />
        <span className={styles['route__text']}>Favorites</span>
      </div>

      <h1 className={styles['title']}>Favorites</h1>
      <span className={styles['models']}>{`${favoriteProductIds.length} models`}</span>

      <div className={styles['item-list']}>
        {favoriteProducts.map(item => (
          <ProductCard product={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};
