import React from 'react';
import styles from './ShoppingCartPage.module.scss';
import typhography from '../../styles/typography.module.scss';
import { BackButton } from '../../components/BackButton';
import cn from 'classnames';
import { useAppSelector } from '../../app/hooks';
import { Product } from '../../types/Product';
import { ShopCard } from '../../components/ShopCard';

export const ShoppingCartPage: React.FC = () => {
  const idsInCart: string[] = useAppSelector(
    state => state.productCard.cardItems,
  );
  const products: Product[] = useAppSelector(state => state.products.products);

  const itemsInCart = products.filter(product =>
    idsInCart.includes(product.itemId),
  );
  const totalPrice = itemsInCart.reduce((total, item) => {
    return total + (item.price || item.fullPrice);
  }, 0);

  return (
    <main className={styles.shoppingCartPage}>
      <BackButton />

      <h1 className={typhography.heading1}>Card</h1>
      <ul className={styles.cartList}>
        {itemsInCart.map(item => (
          <li key={item.itemId}>
            <ShopCard
              name={item.name}
              price={item.price}
              image={item.image}
              quantity={1}
            />
          </li>
        ))}
      </ul>

      <div className={styles.priceContainer}>
        <h2 className={typhography.heading2}>{`$${totalPrice}`}</h2>
        <p className={cn(typhography.bodyText, styles.itemsCount)}>
          {`Total for ${itemsInCart.length} items`}
        </p>
      </div>

      <button className={cn(typhography.buttonsText, styles.button)}>
        Checkout
      </button>
    </main>
  );
};
