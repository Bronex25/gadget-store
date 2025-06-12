import { NavLink } from 'react-router-dom';
import styles from './Slider.module.scss';
import React, { useEffect, useRef, useState } from 'react';

export const Slider: React.FC = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const totalSlides = 3;

  const handleNextSlide = () => {
    setSlideIndex(prevIndex => (prevIndex + 1) % totalSlides);
  };
  const handlePrevSlide = () => {
    setSlideIndex(prevIndex => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  const handleNavClick = (index: number) => {
    setSlideIndex(index);
  };

  const timerId = useRef(0);

  useEffect(() => {
    timerId.current = window.setTimeout(() => {
      handleNextSlide();
    }, 5000);

    return () => {
      clearInterval(timerId.current);
    };
  }, [slideIndex]);

  return (
    <section className={styles.container}>
      <div className={styles.slider}>
        <button
          className={styles.sliderButton}
          onClick={handlePrevSlide}
          type="button"
        >
          <img
            src="/img/slider-btn-left.png"
            alt="arrow"
            className={styles.sliderButtonIcon}
          />
        </button>

        <div className={styles.banner}>
          <div
            className={styles.sliderTracker}
            style={{ transform: `translateX(-${slideIndex * 100}%)` }}
          >
            <div className={styles.mainSlide}>
              <div className={styles.mainSlideLeft}>
                <div className={styles.mainSlideLeftContent}>
                  <h2 className={styles.mainSlideLeftTitle}>
                    Now available <br /> in our store!{' '}
                  </h2>
                  <span className={styles.mainSlideLeftText}>
                    Be the first!
                  </span>
                </div>

                <NavLink to={'/'} className={styles.mainSlideLeftButton}>
                  ORDER NOW
                </NavLink>
              </div>

              <div className={styles.mainSlideRight}>
                <div className={styles.mainSlideRightContent}>
                  <h2 className={styles.mainSlideRightTitle}>iPhone 14 Pro</h2>
                  <p className={styles.mainSlideRightText}>Pro. Beyond.</p>
                </div>
                <img
                  className={styles.mainSlideRightImage}
                  src="/img/slider/main.png"
                  alt="Slider Picture"
                />
              </div>
            </div>

            <img
              src="/img/banner-accessories.png"
              alt="Slider Image"
              className={styles.secondarySlide}
            />
            <img
              src="/img/banner-tablets.png"
              alt="Slider Image"
              className={styles.secondarySlide}
            />
          </div>
        </div>

        <button
          className={styles.sliderButton}
          onClick={handleNextSlide}
          type="button"
        >
          <img
            src="/img/slider-btn-right.png"
            alt="arrow"
            className={styles.sliderButtonIcon}
          />
        </button>
      </div>

      <div className={styles.nav}>
        {[0, 1, 2].map(i => (
          <button
            key={i}
            onClick={() => handleNavClick(i)}
            className={`${styles.navButton} ${slideIndex === i ? styles.navButtonActive : ''}`}
          />
        ))}
      </div>
    </section>
  );
};
