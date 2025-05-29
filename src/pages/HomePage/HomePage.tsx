import React from 'react';
import { ProductCard } from '../../components/ProductCard';
import { Slider } from '../../components/Slider/Slider';
import styles from './HomePage.module.scss';
import product from '../../../public/api/products.json';
import { Categories } from '../../components/Categories';

export const HomePage = () => {
  const phoneToShow = product.slice(0, 4);

  return (
    <div className={styles['home-page']}>
      <h1 className={styles['home-page__title']}>
        Welcome to Nice Gadgets store!
      </h1>

      <Slider />

      <section className={styles['home-page__new-models']}>
        <div className={styles['new-models__top']}>
          <h2 className={styles['new-models__title']}>Brand new models</h2>

          <div className={styles['new-models__controllers']}>
            <button className={styles['new-models__button']}>
              <img
                src="/img/slider-btn-left.png"
                alt="arrow"
                className={styles['new-models__icon']}
              />
            </button>
            <button className={styles['new-models__button']}>
              <img
                src="/img/slider-btn-right.png"
                alt="arrow"
                className={styles['new-models__icon']}
              />
            </button>
          </div>
        </div>

        <div className={styles['new-models__list']}>
          {phoneToShow.map(phone => (
            <ProductCard product={phone} key={phone.id} />
          ))}
        </div>
      </section>

      <Categories />

      <section className={styles['home-page__hot-prices']}>
        <div className={styles['hot-prices__top']}>
          <h2 className={styles['hot-prices__title']}>Hot prices</h2>

          <div className={styles['hot-prices__controllers']}>
            <button className={styles['hot-prices__button']}>
              <img
                src="/img/slider-btn-left.png"
                alt="arrow"
                className={styles['hot-prices__icon']}
              />
            </button>
            <button className={styles['hot-prices__button']}>
              <img
                src="/img/slider-btn-right.png"
                alt="arrow"
                className={styles['hot-prices__icon']}
              />
            </button>
          </div>
        </div>

        <div className={styles['hot-prices__list']}>
          {phoneToShow.map(phone => (
            <ProductCard product={phone} key={phone.id} />
          ))}
        </div>
      </section>
    </div>
  );
};
