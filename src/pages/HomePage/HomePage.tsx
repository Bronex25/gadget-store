import React, { useEffect, useMemo } from 'react';
import { Slider } from '../../components/Slider/Slider';
import styles from './HomePage.module.scss';
import { Categories } from '../../components/Categories';
import { useAppSelector } from '../../app/hooks';
import { ItemSlider } from '../../components/ItemSlider';
import { fetchProductDetails } from '../../utils/api';

export const HomePage = () => {
  const { products } = useAppSelector(state => state.products);

  const brandNewModels = useMemo(() => {
    return [...products].sort((a, b) => b.year - a.year).slice(0, 15);
  }, [products]);

  const hotPrices = useMemo(() => {
    return [...products]
      .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
      .slice(0, 15);
  }, [products]);

  useEffect(() => {
    fetchProductDetails('apple-iphone-11-128gb-black', 'phones').then(acces =>
      console.log(acces),
    );
  }, []);

  return (
    <div className={styles.homePage}>
      <h1 className={styles.homePageTitle}>Welcome to Nice Gadgets store!</h1>

      <Slider />

      <ItemSlider productsToShow={brandNewModels} title="Brand new models" />

      <Categories />

      <ItemSlider productsToShow={hotPrices} title="Hot prices" />
    </div>
  );
};
