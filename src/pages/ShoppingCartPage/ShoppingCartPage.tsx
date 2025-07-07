import React from 'react';
import styles from './ShoppingCartPage.module.scss';
import typhography from '../../styles/typography.module.scss';
import { BackButton } from '../../components/BackButton';
import cn from 'classnames';
import { useAppSelector } from '../../app/hooks';
import { Product } from '../../types/Product';
import { ShopCard } from '../../components/ShopCard';
import { CartItem } from '../../features/actionButtonsSlice';

export const ShoppingCartPage: React.FC = () => {
  const cartItems: CartItem[] = useAppSelector(
    state => state.productCard.cartItems,
  );
  const products: Product[] = useAppSelector(state => state.products.products);
  // Filter products to find those that are in the cart
  // and map them to include the quantity from the cart
  const itemsInCart = cartItems
    .map(cartItem => {
      const product = products.find(
        product => product.itemId === cartItem.itemId,
      );
      if (!product) return null;
      return {
        ...product,
        quantity: cartItem.quantity,
      };
    })
    .filter(item => {
      return item !== null;
    });

  const totalPrice = itemsInCart.reduce((total, item) => {
    return (
      total +
      (item.price * item.quantity || item.fullPrice * item.quantity || 0)
    );
  }, 0);

  return (
    <main className={styles.shoppingCartPage}>
      <BackButton />

      <h1 className={typhography.heading1}>Cart</h1>
      {cartItems.length === 0 ? (
        <div className={styles.emptyCart}>
          <h2 className={typhography.heading2}>Cart is empty</h2>
          <img
            className={styles.emptyImg}
            src="./img/cart-is-empty.png"
            alt="Zero items"
          />
        </div>
      ) : (
        <div className={styles.contentContainer}>
          <ul className={styles.cartList}>
            {itemsInCart.map(item => (
              <li key={item.itemId}>
                <ShopCard
                  id={item.itemId}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  quantity={item.quantity}
                />
              </li>
            ))}
          </ul>

          <div className={styles.checkout}>
            <div className={styles.priceContainer}>
              <h2 className={typhography.heading2}>{`$${totalPrice}`}</h2>
              <p className={cn(typhography.bodyText, styles.itemsCount)}>
                {`Total for ${itemsInCart.length} items`}
              </p>
            </div>

            <button className={cn(typhography.buttonsText, styles.button)}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </main>
  );
};
