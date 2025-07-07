import React, { useEffect, useRef, useState } from 'react';
import styles from './ItemSlider.module.scss';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

type Props = {
  productsToShow: Product[];
  title: string;
};

export const ItemSlider: React.FC<Props> = ({ productsToShow, title }) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const [isLeftDisabled, setIsLeftDisabled] = useState(true);
  const [isRightDisabled, setIsRightDisabled] = useState(false);

  useEffect(() => {
    const updateButtonState = () => {
      const slider = sliderRef.current;
      if (!slider) return;

      const { scrollLeft, scrollWidth, clientWidth } = slider;

      setIsLeftDisabled(scrollLeft <= 0);
      setIsRightDisabled(scrollLeft + clientWidth >= scrollWidth - 1); // small buffer
    };
    sliderRef.current?.addEventListener('scroll', updateButtonState);

    return () => {
      sliderRef.current?.removeEventListener('scroll', updateButtonState);
    };
  }, [productsToShow]);

  const scroll = (dir: 'left' | 'right') => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left:
          dir === 'left'
            ? -sliderRef.current.clientWidth
            : sliderRef.current.clientWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className={styles.itemSlider}>
      <div className={styles.topWrapper}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.controllers}>
          <button
            disabled={isLeftDisabled}
            className={styles.buttonLeft}
            onClick={() => scroll('left')}
          ></button>
          <button
            disabled={isRightDisabled}
            className={styles.buttonRight}
            onClick={() => scroll('right')}
          ></button>
        </div>
      </div>

      <div className={styles.itemsList} ref={sliderRef}>
        <div className={styles.slider}>
          {productsToShow.map((model: Product) => (
            <ProductCard product={model} key={model.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ItemSlider;
